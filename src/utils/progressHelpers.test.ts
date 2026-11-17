import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildStudiedTimeline,
  computeOverallProgressSummary,
  computeUnitProgress,
  formatStudyTimestamp,
  reconcileStudyHistory,
  recordTopicVisit,
  toggleCompletionInHistory,
} from './progressHelpers';
import { SYLLABUS_UNITS, ALL_TOPICS_FLAT } from '../data/syllabusIndex';

test('computeUnitProgress calculates per-unit totals, percentages, hours, and nextTopicId', () => {
  const unit1Topic1 = SYLLABUS_UNITS[0].topics[0].id;
  const unit1Topic2 = SYLLABUS_UNITS[0].topics[1].id;
  const completed = new Set([unit1Topic1, unit1Topic2]);

  const progress = computeUnitProgress(SYLLABUS_UNITS, completed);
  assert.equal(progress.length, 5);
  assert.equal(progress[0].completed, 2);
  assert.equal(progress[0].total, 5);
  assert.equal(progress[0].percentage, 40);
  assert.equal(progress[0].completedHours, 2.8); // (2/5) * 7h = 2.8
  assert.equal(progress[0].nextTopicId, SYLLABUS_UNITS[0].topics[2].id);
  assert.equal(progress[1].completed, 0);
  assert.equal(progress[1].nextTopicId, SYLLABUS_UNITS[1].topics[0].id);
});

test('reconcileStudyHistory migrates completedIds without timestamps cleanly', () => {
  const now = 1_700_000_000_000;
  const completed = new Set(['u1-t1', 'u1-t2']);
  const reconciled = reconcileStudyHistory({}, completed, now);

  assert.equal(reconciled['u1-t1'].status, 'completed');
  assert.equal(reconciled['u1-t1'].completedAt, now);
  assert.equal(reconciled['u1-t2'].status, 'completed');
  assert.ok(typeof reconciled['u1-t2'].completedAt === 'number');
});

test('recordTopicVisit preserves completed status while updating lastStudiedAt', () => {
  const t1 = 1_700_000_000_000;
  const t2 = 1_700_000_060_000;
  let history = toggleCompletionInHistory({}, 'u1-t1', true, t1);
  history = recordTopicVisit(history, 'u1-t1', t2);

  assert.equal(history['u1-t1'].status, 'completed');
  assert.equal(history['u1-t1'].completedAt, t1);
  assert.equal(history['u1-t1'].lastStudiedAt, t2);

  history = recordTopicVisit(history, 'u1-t2', t2);
  assert.equal(history['u1-t2'].status, 'studied');
  assert.equal(history['u1-t2'].completedAt, undefined);
});

test('buildStudiedTimeline sorts descending by activity timestamp and filters cleanly', () => {
  const t1 = 1_700_000_000_000;
  const t2 = 1_700_000_100_000;
  const t3 = 1_700_000_200_000;

  let history = recordTopicVisit({}, ALL_TOPICS_FLAT[0].id, t1);
  history = toggleCompletionInHistory(history, ALL_TOPICS_FLAT[1].id, true, t2);
  history = recordTopicVisit(history, ALL_TOPICS_FLAT[6].id, t3); // Unit 2

  const completed = new Set([ALL_TOPICS_FLAT[1].id]);
  const bookmarked = new Set([ALL_TOPICS_FLAT[0].id]);

  const allEntries = buildStudiedTimeline(ALL_TOPICS_FLAT, history, completed, bookmarked, 'all', 'all');
  assert.equal(allEntries.length, 3);
  assert.equal(allEntries[0].topic.id, ALL_TOPICS_FLAT[6].id);
  assert.equal(allEntries[1].topic.id, ALL_TOPICS_FLAT[1].id);
  assert.equal(allEntries[1].status, 'completed');

  const completedOnly = buildStudiedTimeline(ALL_TOPICS_FLAT, history, completed, bookmarked, 'completed', 'all');
  assert.equal(completedOnly.length, 1);
  assert.equal(completedOnly[0].topic.id, ALL_TOPICS_FLAT[1].id);

  const unit2Only = buildStudiedTimeline(ALL_TOPICS_FLAT, history, completed, bookmarked, 'all', 2);
  assert.equal(unit2Only.length, 1);
  assert.equal(unit2Only[0].topic.unitNumber, 2);

  const bookmarkedOnly = buildStudiedTimeline(ALL_TOPICS_FLAT, history, completed, bookmarked, 'bookmarked', 'all');
  assert.equal(bookmarkedOnly.length, 1);
  assert.equal(bookmarkedOnly[0].topic.id, ALL_TOPICS_FLAT[0].id);
});

test('computeOverallProgressSummary computes overall KPIs and nextTopic', () => {
  const completed = new Set(SYLLABUS_UNITS[0].topics.map((t) => t.id));
  const bookmarked = new Set([SYLLABUS_UNITS[1].topics[0].id]);
  const history = reconcileStudyHistory({}, completed, 1_700_000_000_000);

  const summary = computeOverallProgressSummary(
    SYLLABUS_UNITS,
    ALL_TOPICS_FLAT,
    completed,
    bookmarked,
    history
  );

  assert.equal(summary.totalTopics, 27);
  assert.equal(summary.completedTopics, 5);
  assert.equal(summary.percentage, 19);
  assert.equal(summary.completedUnits, 1);
  assert.equal(summary.totalUnits, 5);
  assert.equal(summary.bookmarkedCount, 1);
  assert.equal(summary.nextTopic?.id, SYLLABUS_UNITS[1].topics[0].id);
  assert.ok(formatStudyTimestamp(1_700_000_000_000).length > 0);
});

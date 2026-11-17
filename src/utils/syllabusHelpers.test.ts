import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildInvertedIndexAndSearch,
  calculateCssSpecificity,
  calculateMasteryStats,
  computeCssBoxModel,
  estimateTransferTimeMs,
  filterTopicsByQuery,
  formatTimerMMSS,
  parseAssistantMarkdownBlocks,
  parseInlineCodeSegments,
} from './syllabusHelpers';
import { ALL_TOPICS_FLAT } from '../data/syllabusIndex';
import { TOPIC_STUDY_GUIDES } from '../data/topicStudyGuides';
import type { FlatTopic } from '../types/syllabus';

test('calculateMasteryStats computes percentage accurately', () => {
  const ids = ['u1-t1', 'u1-t2', 'u1-t3', 'u1-t4'];
  const completed = new Set(['u1-t1', 'u1-t3']);
  assert.deepEqual(calculateMasteryStats(ids, completed), {
    completed: 2,
    total: 4,
    percentage: 50,
  });
  assert.deepEqual(calculateMasteryStats([], completed), {
    completed: 0,
    total: 0,
    percentage: 0,
  });
});

test('computeCssBoxModel handles content-box vs border-box correctly', () => {
  const contentBox = computeCssBoxModel({
    width: 200,
    height: 100,
    padding: 16,
    border: 4,
    margin: 20,
    boxSizing: 'content-box',
  });
  assert.equal(contentBox.contentWidth, 200);
  assert.equal(contentBox.renderedBoxWidth, 240);
  assert.equal(contentBox.totalOccupiedWidth, 280);

  const borderBox = computeCssBoxModel({
    width: 200,
    height: 100,
    padding: 16,
    border: 4,
    margin: 20,
    boxSizing: 'border-box',
  });
  assert.equal(borderBox.contentWidth, 160);
  assert.equal(borderBox.renderedBoxWidth, 200);
  assert.equal(borderBox.totalOccupiedWidth, 240);
});

test('calculateCssSpecificity weights IDs, classes, and elements properly', () => {
  const idSel = calculateCssSpecificity('#navbar .item a');
  assert.equal(idSel.ids, 1);
  assert.equal(idSel.classes, 1);
  assert.equal(idSel.elements, 1);
  assert.equal(idSel.totalWeight, 111);

  const inline = calculateCssSpecificity('', true);
  assert.equal(inline.totalWeight, 1000);
});

test('buildInvertedIndexAndSearch ranks matching documents highest', () => {
  const docs = [
    'HTTP and DNS protocols power the web.',
    'SAX XML parser streams events with low memory.',
    'DOM XML parser builds a full tree in memory.',
  ];
  const res = buildInvertedIndexAndSearch(docs, 'SAX memory');
  assert.deepEqual(res.index['sax'], [1]);
  assert.deepEqual(res.index['memory'], [1, 2]);
  assert.equal(res.scores[0].docIndex, 1);
});

test('estimateTransferTimeMs reflects lower RTT and higher 5G bandwidth', () => {
  const time4G = estimateTransferTimeMs(10, 50, 45);
  const time5G = estimateTransferTimeMs(10, 1000, 2);
  assert.ok(time5G < time4G);
});

test('filterTopicsByQuery filters by unit and text query', () => {
  const sample = [
    {
      id: 'u1-t1',
      code: '1.1',
      title: 'History of Internet',
      summary: 'ARPANET and TCP/IP',
      definition: 'Global network',
      unitNumber: 1,
      unitCode: 'UNIT 01',
      unitTitle: 'Internet Basics',
      keywords: ['ARPANET'],
      keyTakeaways: ['Packet switching'],
    },
    {
      id: 'u2-t6',
      code: '2.6',
      title: 'DOM and SAX XML Parsers',
      summary: 'Tree vs event parsing',
      definition: 'XML Processors',
      unitNumber: 2,
      unitCode: 'UNIT 02',
      unitTitle: 'HTML & XML',
      keywords: ['SAX', 'DOM'],
      keyTakeaways: ['Low memory'],
    },
  ] as unknown as FlatTopic[];

  assert.equal(filterTopicsByQuery(sample, 'sax').length, 1);
  assert.equal(filterTopicsByQuery(sample, '', 1).length, 1);
  assert.equal(filterTopicsByQuery(sample, 'sax', 1).length, 0);
});

test('parseInlineCodeSegments splits inline code and normalizes arrows', () => {
  const segs = parseInlineCodeSegments('Use `<style>` inside `<head>` -> clean CSS');
  assert.deepEqual(segs, [
    { type: 'text', value: 'Use ' },
    { type: 'code', value: '<style>' },
    { type: 'text', value: ' inside ' },
    { type: 'code', value: '<head>' },
    { type: 'text', value: ' \u2192 clean CSS' },
  ]);
});

test('formatTimerMMSS formats Pomodoro countdown seconds cleanly', () => {
  assert.equal(formatTimerMMSS(1500), '25:00');
  assert.equal(formatTimerMMSS(65), '01:05');
  assert.equal(formatTimerMMSS(-4), '00:00');
});

test('every topic in ALL_TOPICS_FLAT has a complete TOPIC_STUDY_GUIDES entry with diagram and sections', () => {
  assert.equal(ALL_TOPICS_FLAT.length, 27);
  for (const topic of ALL_TOPICS_FLAT) {
    const guide = TOPIC_STUDY_GUIDES[topic.id];
    assert.ok(guide, `Missing study guide for ${topic.id}`);
    assert.ok(guide.analogy.length > 20, `Analogy too short for ${topic.id}`);
    assert.ok(guide.structuredSections.length >= 2, `Need >=2 structured sections for ${topic.id}`);
    assert.ok(guide.diagram.nodes.length >= 3, `Need >=3 diagram nodes for ${topic.id}`);
    assert.ok(guide.diagram.edges.length >= 2, `Need >=2 diagram edges for ${topic.id}`);
  }
});

test('parseAssistantMarkdownBlocks parses headings, lists, paragraphs, and fenced code blocks', () => {
  const sample = `## Core Answer
HTTP is **stateless** and uses verbs.

- GET reads resources
- POST submits data

\`\`\`html
<h1>Hello CS35302</h1>
\`\`\``;
  const blocks = parseAssistantMarkdownBlocks(sample);
  assert.deepEqual(blocks, [
    { type: 'heading', text: 'Core Answer' },
    { type: 'paragraph', text: 'HTTP is **stateless** and uses verbs.' },
    { type: 'list-item', text: 'GET reads resources' },
    { type: 'list-item', text: 'POST submits data' },
    { type: 'code', language: 'html', code: '<h1>Hello CS35302</h1>' },
  ]);
});

import type { FlatTopic, Unit } from '../types/syllabus';

export type StudyActivityStatus = 'completed' | 'studied';

export interface StudyHistoryRecord {
  topicId: string;
  status: StudyActivityStatus;
  lastStudiedAt: number;
  completedAt?: number;
}

export interface UnitProgressItem {
  unitNumber: number;
  unitCode: string;
  title: string;
  hours: number;
  completed: number;
  total: number;
  percentage: number;
  completedHours: number;
  nextTopicId: string | null;
}

export interface OverallProgressSummary {
  totalTopics: number;
  completedTopics: number;
  percentage: number;
  completedHours: number;
  totalHours: number;
  completedUnits: number;
  totalUnits: number;
  bookmarkedCount: number;
  studiedCount: number;
  nextTopic: FlatTopic | null;
}

export interface TimelineEntry {
  topic: FlatTopic;
  status: StudyActivityStatus;
  timestamp: number;
  completedAt?: number;
  isBookmarked: boolean;
}

export type TimelineFilter = 'all' | 'completed' | 'studied' | 'bookmarked';

export function reconcileStudyHistory(
  existingHistory: Record<string, StudyHistoryRecord>,
  completedIds: Set<string>,
  now: number
): Record<string, StudyHistoryRecord> {
  const next: Record<string, StudyHistoryRecord> = {};

  for (const [id, rec] of Object.entries(existingHistory)) {
    if (!rec || typeof rec.topicId !== 'string') continue;
    if (completedIds.has(id)) {
      next[id] = {
        topicId: id,
        status: 'completed',
        lastStudiedAt: rec.lastStudiedAt || rec.completedAt || now,
        completedAt: rec.completedAt || rec.lastStudiedAt || now,
      };
    } else {
      next[id] = {
        topicId: id,
        status: 'studied',
        lastStudiedAt: rec.lastStudiedAt || now,
      };
    }
  }

  let offset = 0;
  for (const id of completedIds) {
    if (!next[id]) {
      const ts = now - offset * 1000;
      next[id] = {
        topicId: id,
        status: 'completed',
        lastStudiedAt: ts,
        completedAt: ts,
      };
      offset++;
    }
  }

  return next;
}

export function recordTopicVisit(
  history: Record<string, StudyHistoryRecord>,
  topicId: string,
  now: number
): Record<string, StudyHistoryRecord> {
  const prev = history[topicId];
  return {
    ...history,
    [topicId]: {
      topicId,
      status: prev?.status === 'completed' ? 'completed' : 'studied',
      lastStudiedAt: now,
      ...(prev?.completedAt ? { completedAt: prev.completedAt } : {}),
    },
  };
}

export function toggleCompletionInHistory(
  history: Record<string, StudyHistoryRecord>,
  topicId: string,
  isNowCompleted: boolean,
  now: number
): Record<string, StudyHistoryRecord> {
  const prev = history[topicId];
  if (isNowCompleted) {
    return {
      ...history,
      [topicId]: {
        topicId,
        status: 'completed',
        lastStudiedAt: now,
        completedAt: now,
      },
    };
  }
  return {
    ...history,
    [topicId]: {
      topicId,
      status: 'studied',
      lastStudiedAt: prev?.lastStudiedAt || now,
    },
  };
}

export function computeUnitProgress(units: Unit[], completedIds: Set<string>): UnitProgressItem[] {
  return units.map((unit) => {
    const total = unit.topics.length;
    let completed = 0;
    let nextTopicId: string | null = null;

    for (const topic of unit.topics) {
      if (completedIds.has(topic.id)) {
        completed++;
      } else if (!nextTopicId) {
        nextTopicId = topic.id;
      }
    }

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const completedHours =
      total > 0 ? Number(((completed / total) * unit.hours).toFixed(1)) : 0;

    return {
      unitNumber: unit.unitNumber,
      unitCode: unit.unitCode,
      title: unit.title,
      hours: unit.hours,
      completed,
      total,
      percentage,
      completedHours,
      nextTopicId,
    };
  });
}

export function computeOverallProgressSummary(
  units: Unit[],
  allTopics: FlatTopic[],
  completedIds: Set<string>,
  bookmarkedIds: Set<string>,
  history: Record<string, StudyHistoryRecord>
): OverallProgressSummary {
  const unitStats = computeUnitProgress(units, completedIds);
  const totalTopics = allTopics.length;
  let completedTopics = 0;
  let nextTopic: FlatTopic | null = null;

  for (const t of allTopics) {
    if (completedIds.has(t.id)) {
      completedTopics++;
    } else if (!nextTopic) {
      nextTopic = t;
    }
  }

  const totalHours = units.reduce((acc, u) => acc + u.hours, 0);
  const completedHours = Number(
    unitStats.reduce((acc, u) => acc + u.completedHours, 0).toFixed(1)
  );
  const completedUnits = unitStats.filter((u) => u.total > 0 && u.completed === u.total).length;
  const studiedIds = new Set<string>(Object.keys(history));
  for (const id of completedIds) studiedIds.add(id);

  return {
    totalTopics,
    completedTopics,
    percentage: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
    completedHours,
    totalHours,
    completedUnits,
    totalUnits: units.length,
    bookmarkedCount: bookmarkedIds.size,
    studiedCount: studiedIds.size,
    nextTopic,
  };
}

export function buildStudiedTimeline(
  allTopics: FlatTopic[],
  history: Record<string, StudyHistoryRecord>,
  completedIds: Set<string>,
  bookmarkedIds: Set<string>,
  filter: TimelineFilter = 'all',
  unitFilter: number | 'all' = 'all'
): TimelineEntry[] {
  const topicById = new Map<string, FlatTopic>(allTopics.map((t) => [t.id, t]));
  const entries: TimelineEntry[] = [];

  for (const [id, rec] of Object.entries(history)) {
    const topic = topicById.get(id);
    if (!topic) continue;
    if (unitFilter !== 'all' && topic.unitNumber !== unitFilter) continue;

    const isCompleted = completedIds.has(id) || rec.status === 'completed';
    const status: StudyActivityStatus = isCompleted ? 'completed' : 'studied';
    const isBookmarked = bookmarkedIds.has(id);

    if (filter === 'completed' && status !== 'completed') continue;
    if (filter === 'studied' && status !== 'studied') continue;
    if (filter === 'bookmarked' && !isBookmarked) continue;

    const timestamp =
      status === 'completed'
        ? rec.completedAt ?? rec.lastStudiedAt
        : rec.lastStudiedAt;

    entries.push({
      topic,
      status,
      timestamp,
      completedAt: rec.completedAt,
      isBookmarked,
    });
  }

  return entries.sort((a, b) => b.timestamp - a.timestamp);
}

export function formatStudyTimestamp(ts: number): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(ts));
  } catch {
    return '';
  }
}

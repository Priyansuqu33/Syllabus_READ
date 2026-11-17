import React, { useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Clock,
  Filter,
  RotateCcw,
} from 'lucide-react';
import type { FlatTopic, Unit } from '../types/syllabus';
import {
  buildStudiedTimeline,
  computeOverallProgressSummary,
  computeUnitProgress,
  formatStudyTimestamp,
  type StudyHistoryRecord,
  type TimelineFilter,
} from '../utils/progressHelpers';
import { CompletionRingChart, UNIT_RING_COLORS } from './CompletionRingChart';

interface CurriculumOverviewProps {
  units: Unit[];
  allTopics: FlatTopic[];
  completedIds: Set<string>;
  bookmarkedIds: Set<string>;
  studyHistory: Record<string, StudyHistoryRecord>;
  onSelectTopic: (topicId: string) => void;
  onToggleComplete: (topicId: string) => void;
}

const FILTER_OPTIONS: { id: TimelineFilter; label: string }[] = [
  { id: 'all', label: 'All Activity' },
  { id: 'completed', label: 'Completed' },
  { id: 'studied', label: 'In Progress' },
  { id: 'bookmarked', label: 'Saved' },
];

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  units,
  allTopics,
  completedIds,
  bookmarkedIds,
  studyHistory,
  onSelectTopic,
  onToggleComplete,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');

  const unitProgress = computeUnitProgress(units, completedIds);
  const summary = computeOverallProgressSummary(
    units,
    allTopics,
    completedIds,
    bookmarkedIds,
    studyHistory
  );
  const timelineEntries = buildStudiedTimeline(
    allTopics,
    studyHistory,
    completedIds,
    bookmarkedIds,
    timelineFilter,
    selectedUnit
  );

  const resumeTopic = summary.nextTopic || allTopics[0];
  const selectedUnitMeta =
    selectedUnit !== 'all'
      ? unitProgress.find((u) => u.unitNumber === selectedUnit) || null
      : null;

  return (
    <section
      aria-label="Curriculum Progress Overview"
      className="max-w-5xl w-full min-w-0 mx-auto px-4 sm:px-8 pt-8 pb-20 space-y-8"
    >
      {/* Editorial Overview Header */}
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div className="space-y-1.5 min-w-0">
          <div className="text-xs font-mono text-[var(--text-muted)]">
            CS35302 Web Technology · Student Progress Dashboard
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight m-0 text-balance">
            Curriculum Overview
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-[64ch] m-0 leading-relaxed">
            Track unit-by-unit mastery across all 27 syllabus topics and review your chronological study timeline.
          </p>
        </div>

        {resumeTopic && (
          <button
            type="button"
            onClick={() => onSelectTopic(resumeTopic.id)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>
              {summary.completedTopics === summary.totalTopics
                ? `Review ${resumeTopic.code}`
                : summary.completedTopics === 0
                ? `Start Topic ${resumeTopic.code}`
                : `Continue ${resumeTopic.code}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </header>

      {/* Single-Elevation 4-Column KPI Strip */}
      <div
        aria-label="Progress Metrics Summary"
        className="grid grid-cols-2 lg:grid-cols-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden"
      >
        <div className="p-4 sm:p-5 space-y-1 border-b lg:border-b-0 border-r border-[var(--border-hairline)]">
          <div className="text-xs text-[var(--text-muted)]">Topics Mastered</div>
          <div className="font-mono text-2xl font-semibold text-[var(--text-primary)] tabular-nums">
            {summary.completedTopics}
            <span className="text-sm font-normal text-[var(--text-muted)]">
              {' '}
              / {summary.totalTopics}
            </span>
          </div>
          <div className="text-xs font-mono text-[var(--accent-primary)] tabular-nums">
            {summary.percentage}% complete
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-1 border-b lg:border-b-0 lg:border-r border-[var(--border-hairline)]">
          <div className="text-xs text-[var(--text-muted)]">Syllabus Hours Covered</div>
          <div className="font-mono text-2xl font-semibold text-[var(--text-primary)] tabular-nums">
            {summary.completedHours}
            <span className="text-sm font-normal text-[var(--text-muted)]">
              {' '}
              / {summary.totalHours}h
            </span>
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            Credit-weighted estimate
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-1 border-r border-[var(--border-hairline)]">
          <div className="text-xs text-[var(--text-muted)]">Units Completed</div>
          <div className="font-mono text-2xl font-semibold text-[var(--text-primary)] tabular-nums">
            {summary.completedUnits}
            <span className="text-sm font-normal text-[var(--text-muted)]">
              {' '}
              / {summary.totalUnits}
            </span>
          </div>
          <div className="text-xs text-[var(--text-secondary)] tabular-nums">
            {summary.studiedCount} topics opened
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-1">
          <div className="text-xs text-[var(--text-muted)]">Saved for Revision</div>
          <div className="font-mono text-2xl font-semibold text-[var(--text-primary)] tabular-nums">
            {summary.bookmarkedCount}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            Bookmarked lessons
          </div>
        </div>
      </div>

      {/* Main Split: D3 Completion Ring + Unit Breakdown (Left) | Studied Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: D3 Completion Ring + Unit Breakdown */}
        <div className="lg:col-span-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
                Completion Ring
              </h2>
              <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                Proportional breakdown by syllabus unit
              </p>
            </div>
            {selectedUnit !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedUnit('all')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3" />
                All Units
              </button>
            )}
          </div>

          <CompletionRingChart
            unitProgress={unitProgress}
            overallPercentage={summary.percentage}
            completedTopics={summary.completedTopics}
            totalTopics={summary.totalTopics}
            selectedUnit={selectedUnit}
            onSelectUnit={setSelectedUnit}
          />

          {/* Unit-by-unit tabular breakdown (hairline separated, no nested cards) */}
          <div className="border-t border-[var(--border-hairline)] pt-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Unit Breakdown</span>
              <span className="font-mono tabular-nums">Progress</span>
            </div>

            <div className="divide-y divide-[var(--border-hairline)]">
              {unitProgress.map((unit, idx) => {
                const isSelected = selectedUnit === unit.unitNumber;
                const color = UNIT_RING_COLORS[idx % UNIT_RING_COLORS.length];
                return (
                  <div key={unit.unitNumber} className="py-2.5 first:pt-1 last:pb-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedUnit(isSelected ? 'all' : unit.unitNumber)
                        }
                        className={`flex items-center gap-2 text-left min-w-0 bg-transparent border-0 p-0 cursor-pointer ${
                          isSelected
                            ? 'text-[var(--accent-primary)] font-semibold'
                            : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="w-2.5 h-2.5 rounded-sm shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs sm:text-sm truncate">
                          <span className="font-mono text-[var(--text-muted)] mr-1.5">
                            U0{unit.unitNumber}
                          </span>
                          {unit.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs text-[var(--text-secondary)] tabular-nums">
                          {unit.completed}/{unit.total}
                        </span>
                        {unit.nextTopicId && (
                          <button
                            type="button"
                            onClick={() => onSelectTopic(unit.nextTopicId!)}
                            aria-label={`Open next topic in ${unit.unitCode}`}
                            className="text-[11px] font-medium text-[var(--accent-primary)] hover:underline bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap"
                          >
                            Study
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="h-1.5 w-full rounded bg-[var(--bg-muted)] overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${unit.percentage}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Chronological Timeline of Studied Topics */}
        <div className="lg:col-span-7 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
                Studied Topics Timeline
              </h2>
              <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                {selectedUnitMeta
                  ? `Filtered to ${selectedUnitMeta.unitCode}: ${selectedUnitMeta.title}`
                  : 'Most recently studied and completed CS35302 topics'}
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter timeline activity"
              className="flex flex-wrap items-center gap-1 p-1 rounded-md bg-[var(--bg-canvas)] border border-[var(--border-hairline)]"
            >
              {FILTER_OPTIONS.map((opt) => {
                const active = timelineFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTimelineFilter(opt.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[var(--bg-surface)] text-[var(--accent-primary)] font-semibold shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {timelineEntries.length === 0 ? (
            <div className="py-10 px-4 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-subtle)] text-[var(--accent-primary)]">
                {timelineFilter === 'all' && selectedUnit === 'all' ? (
                  <Clock className="w-5 h-5" />
                ) : (
                  <Filter className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="font-display text-base font-semibold text-[var(--text-primary)] m-0">
                  {timelineFilter === 'all' && selectedUnit === 'all'
                    ? 'No studied topics recorded yet'
                    : 'No matching timeline entries'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] m-0 leading-relaxed">
                  {timelineFilter === 'all' && selectedUnit === 'all'
                    ? 'Open any syllabus topic or mark a lesson complete to build your chronological study timeline.'
                    : 'Try switching the activity filter or clearing the active unit selection.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {(timelineFilter !== 'all' || selectedUnit !== 'all') ? (
                  <button
                    type="button"
                    onClick={() => {
                      setTimelineFilter('all');
                      setSelectedUnit('all');
                    }}
                    className="px-3.5 py-2 text-xs font-semibold rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] cursor-pointer"
                  >
                    Show All Activity
                  </button>
                ) : (
                  resumeTopic && (
                    <button
                      type="button"
                      onClick={() => onSelectTopic(resumeTopic.id)}
                      className="px-3.5 py-2 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
                    >
                      Open Topic {resumeTopic.code}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <ol
              data-testid="studied-topics-timeline"
              className="m-0 p-0 list-none space-y-0"
            >
              {timelineEntries.map((entry, idx) => {
                const isLast = idx === timelineEntries.length - 1;
                const isCompleted = entry.status === 'completed';
                return (
                  <li
                    key={entry.topic.id}
                    className="relative flex gap-3.5 pb-5 last:pb-0"
                  >
                    {/* Timeline vertical rail & node */}
                    <div className="flex flex-col items-center shrink-0 pt-0.5">
                      <span
                        aria-hidden="true"
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          isCompleted
                            ? 'bg-[var(--accent-sage)] border-[var(--accent-sage)] text-[var(--bg-surface)]'
                            : 'bg-[var(--bg-canvas)] border-[var(--accent-primary)] text-[var(--accent-primary)]'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                      </span>
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="w-px flex-1 bg-[var(--border-hairline)] mt-1.5"
                        />
                      )}
                    </div>

                    {/* Timeline entry content */}
                    <div className="flex-1 min-w-0 pb-4 border-b border-[var(--border-hairline)] last:border-b-0 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--text-muted)]">
                          <span
                            className={`font-semibold ${
                              isCompleted
                                ? 'text-[var(--accent-sage)]'
                                : 'text-[var(--accent-primary)]'
                            }`}
                          >
                            {isCompleted ? 'Completed' : 'In Progress'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">
                            {entry.topic.unitCode} · {entry.topic.code}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{entry.topic.readMinutes} min</span>
                          {entry.isBookmarked && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 text-[var(--accent-amber)] font-medium">
                                <Bookmark className="w-3 h-3 fill-current" />
                                Saved
                              </span>
                            </>
                          )}
                        </div>

                        <time
                          dateTime={new Date(entry.timestamp).toISOString()}
                          className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums shrink-0"
                        >
                          {formatStudyTimestamp(entry.timestamp)}
                        </time>
                      </div>

                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 space-y-0.5">
                          <button
                            type="button"
                            onClick={() => onSelectTopic(entry.topic.id)}
                            className="text-left font-display text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] bg-transparent border-0 p-0 cursor-pointer leading-snug"
                          >
                            {entry.topic.title}
                          </button>
                          <p className="text-xs text-[var(--text-secondary)] m-0 line-clamp-2 leading-relaxed">
                            {entry.topic.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onToggleComplete(entry.topic.id)}
                            aria-pressed={isCompleted}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors whitespace-nowrap cursor-pointer ${
                              isCompleted
                                ? 'border-[var(--accent-sage)] text-[var(--accent-sage)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-subtle)]'
                                : 'border-[var(--border-strong)] text-[var(--text-primary)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-subtle)]'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {isCompleted ? 'Completed' : 'Mark Done'}
                          </button>
                          <button
                            type="button"
                            onClick={() => onSelectTopic(entry.topic.id)}
                            className="px-2.5 py-1 text-xs font-semibold rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] whitespace-nowrap cursor-pointer"
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  Check,
  Sun,
  Moon,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
  Timer,
  LayoutDashboard,
} from 'lucide-react';
import type { Unit } from '../types/syllabus';
import { calculateMasteryStats, formatTimerMMSS } from '../utils/syllabusHelpers';

interface CurriculumSidebarProps {
  units: Unit[];
  activeTopicId: string;
  curriculumSubView: 'overview' | 'topic';
  onOpenOverview: () => void;
  onSelectTopic: (topicId: string) => void;
  completedIds: Set<string>;
  bookmarkedIds: Set<string>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  units,
  activeTopicId,
  curriculumSubView,
  onOpenOverview,
  onSelectTopic,
  completedIds,
  bookmarkedIds,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const [filterMode, setFilterMode] = useState<'all' | 'saved'>('all');

  // Study Focus Timer (Pomodoro)
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState<number>(FOCUS_SECONDS);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  const handleSwitchTimerMode = (mode: 'focus' | 'break') => {
    setTimerRunning(false);
    setTimerMode(mode);
    setSecondsLeft(mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(timerMode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS);
  };

  const allIds = units.flatMap((u) => u.topics.map((t) => t.id));
  const mastery = calculateMasteryStats(allIds, completedIds);
  const q = searchQuery.trim().toLowerCase();

  const toggleUnit = (unitNum: number) => {
    setExpandedUnits((prev) => ({ ...prev, [unitNum]: !prev[unitNum] }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Workspace Controls: Theme + Progress + Focus Timer + Search */}
      <div className="p-4 border-b border-[var(--border-hairline)] space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Study Progress
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to Midnight dark theme' : 'Switch to Study Paper light theme'}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] whitespace-nowrap cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            {theme === 'light' ? 'Midnight' : 'Paper'}
          </button>
        </div>

        <div>
          <div className="flex items-baseline justify-between text-xs mb-1.5">
            <span className="font-mono font-semibold text-[var(--text-primary)] tabular-nums">
              {mastery.completed} / {mastery.total} topics
            </span>
            <span className="font-mono text-[var(--accent-primary)] font-semibold tabular-nums">
              {mastery.percentage}% mastered
            </span>
          </div>
          <div className="h-1.5 w-full rounded bg-[var(--bg-muted)] overflow-hidden">
            <div
              className="h-full bg-[var(--accent-primary)] transition-all duration-300"
              style={{ width: `${mastery.percentage}%` }}
            />
          </div>
        </div>

        {/* Compact Focus Timer */}
        <div className="p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--text-secondary)]">
              <Timer className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Study Timer
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleSwitchTimerMode('focus')}
                className={`px-1.5 py-0.5 text-[10px] font-medium rounded cursor-pointer ${
                  timerMode === 'focus'
                    ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                25m
              </button>
              <button
                type="button"
                onClick={() => handleSwitchTimerMode('break')}
                className={`px-1.5 py-0.5 text-[10px] font-medium rounded cursor-pointer ${
                  timerMode === 'break'
                    ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                5m
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-base font-bold text-[var(--text-primary)] tabular-nums">
              {formatTimerMMSS(secondsLeft)}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={timerRunning ? 'Pause study timer' : 'Start study timer'}
                onClick={() => setTimerRunning((r) => !r)}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {timerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                type="button"
                aria-label="Reset study timer"
                onClick={handleResetTimer}
                className="p-1 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Search & Saved Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              aria-label="Filter syllabus topics"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 27 topics..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`py-1 text-xs font-medium rounded border cursor-pointer transition-colors ${
                filterMode === 'all'
                  ? 'border-[var(--accent-primary)] bg-[var(--bg-subtle)] text-[var(--accent-primary)] font-semibold'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]'
              }`}
            >
              All ({allIds.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('saved')}
              className={`py-1 text-xs font-medium rounded border cursor-pointer transition-colors ${
                filterMode === 'saved'
                  ? 'border-[var(--accent-primary)] bg-[var(--bg-subtle)] text-[var(--accent-primary)] font-semibold'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]'
              }`}
            >
              Saved ({bookmarkedIds.size})
            </button>
          </div>
        </div>
      </div>

      {/* Unit & Topic List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <button
          type="button"
          onClick={() => {
            onOpenOverview();
            onCloseMobile();
          }}
          className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded text-left text-xs transition-colors cursor-pointer ${
            curriculumSubView === 'overview'
              ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
              : 'bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] font-medium'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            <span>Overview</span>
          </span>
          <span
            className={`font-mono text-[11px] tabular-nums ${
              curriculumSubView === 'overview' ? 'opacity-90' : 'text-[var(--text-muted)]'
            }`}
          >
            {mastery.percentage}%
          </span>
        </button>

        {filterMode === 'saved' && bookmarkedIds.size === 0 ? (
          <div className="p-4 text-center text-xs text-[var(--text-muted)] leading-relaxed">
            No saved topics yet. Click <strong>Save</strong> inside any lesson to bookmark it for quick revision.
          </div>
        ) : (
          units.map((unit) => {
            const matchingTopics = unit.topics.filter((t) => {
              if (filterMode === 'saved' && !bookmarkedIds.has(t.id)) return false;
              if (!q) return true;
              const hay = `${t.code} ${t.title} ${t.summary} ${t.keywords.join(' ')}`.toLowerCase();
              return hay.includes(q);
            });

            if (matchingTopics.length === 0) return null;
            const isExpanded = q || filterMode === 'saved' ? true : !!expandedUnits[unit.unitNumber];

            return (
              <div key={unit.unitNumber} className="border-b border-[var(--border-hairline)] pb-2 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.unitNumber)}
                  className="w-full flex items-start justify-between gap-2 px-2 py-2 text-left rounded hover:bg-[var(--bg-subtle)] cursor-pointer"
                >
                  <div>
                    <div className="text-[11px] font-mono text-[var(--accent-warm)]">
                      {unit.unitCode} · {unit.hours}h
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-primary)] leading-snug mt-0.5">
                      {unit.title}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-1" />
                  )}
                </button>

                {isExpanded && (
                  <ul className="mt-1 space-y-0.5 pl-1 m-0 list-none">
                    {matchingTopics.map((topic) => {
                      const active = curriculumSubView === 'topic' && topic.id === activeTopicId;
                      const done = completedIds.has(topic.id);
                      const saved = bookmarkedIds.has(topic.id);
                      return (
                        <li key={topic.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onSelectTopic(topic.id);
                              onCloseMobile();
                            }}
                            className={`w-full flex items-start justify-between gap-2 px-2.5 py-2 rounded text-left text-xs transition-colors cursor-pointer ${
                              active
                                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <span className="leading-snug">
                              <span className={`font-mono mr-1.5 ${active ? 'opacity-85' : 'text-[var(--text-muted)]'}`}>
                                {topic.code}
                              </span>
                              {topic.title}
                            </span>
                            <span className="flex items-center gap-1 shrink-0 mt-0.5">
                              {saved && (
                                <Bookmark
                                  className={`w-3 h-3 ${
                                    active ? 'text-[var(--bg-surface)] fill-[var(--bg-surface)]' : 'text-[var(--accent-amber)] fill-[var(--accent-amber)]'
                                  }`}
                                />
                              )}
                              {done && (
                                <Check
                                  className={`w-3.5 h-3.5 ${
                                    active ? 'text-[var(--bg-surface)]' : 'text-[var(--accent-sage)]'
                                  }`}
                                />
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        aria-label="Course Curriculum Navigation"
        className="hidden lg:block w-80 shrink-0 border-r border-[var(--border-hairline)] bg-[var(--bg-surface)] h-[calc(100vh-4rem)] sticky top-16"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative w-80 max-w-[85vw] bg-[var(--bg-surface)] h-full border-r border-[var(--border-hairline)] z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

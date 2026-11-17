import { useEffect, useState } from 'react';
import { BookOpen, LayoutDashboard, Sparkles } from 'lucide-react';
import { SYLLABUS_UNITS, ALL_TOPICS_FLAT } from './data/syllabusIndex';
import { Header, type AppView } from './components/Header';
import { ReadingScrollBar } from './components/ReadingScrollBar';
import { CurriculumSidebar } from './components/CurriculumSidebar';
import { CurriculumOverview } from './components/CurriculumOverview';
import { TopicReader } from './components/TopicReader';
import { SimulationsHub } from './components/SimulationsHub';
import { HtmlTagsReference } from './components/HtmlTagsReference';
import { ExamPrepView } from './components/ExamPrepView';
import { CodePlayground } from './components/CodePlayground';
import { DoubtSolverDrawer } from './components/DoubtSolverDrawer';
import {
  reconcileStudyHistory,
  recordTopicVisit,
  toggleCompletionInHistory,
  type StudyHistoryRecord,
} from './utils/progressHelpers';

const COMPLETED_STORAGE_KEY = 'cs35302_completed_topics_v1';
const BOOKMARKS_STORAGE_KEY = 'cs35302_bookmarks_v1';
const STUDY_HISTORY_STORAGE_KEY = 'cs35302_study_history_v1';
const THEME_STORAGE_KEY = 'cs35302_theme_v1';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('curriculum');
  const [curriculumSubView, setCurriculumSubView] = useState<'overview' | 'topic'>('topic');
  const [activeTopicId, setActiveTopicId] = useState<string>(ALL_TOPICS_FLAT[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [doubtDrawerOpen, setDoubtDrawerOpen] = useState(false);
  const [doubtInitialPrompt, setDoubtInitialPrompt] = useState<string | null>(null);

  const [sandboxCode, setSandboxCode] = useState<string | undefined>(undefined);
  const [sandboxLabel, setSandboxLabel] = useState<string>('GFG-Style Interactive Try-It Sandbox');

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return new Set<string>(parsed);
      }
    } catch {
      // Ignore storage failures
    }
    return new Set<string>();
  });

  const [studyHistory, setStudyHistory] = useState<Record<string, StudyHistoryRecord>>(() => {
    let parsedHistory: Record<string, StudyHistoryRecord> = {};
    try {
      const rawHistory = localStorage.getItem(STUDY_HISTORY_STORAGE_KEY);
      if (rawHistory) {
        const parsed = JSON.parse(rawHistory);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          parsedHistory = parsed;
        }
      }
    } catch {
      // Ignore storage failures
    }

    let initialCompleted = new Set<string>();
    try {
      const rawComp = localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (rawComp) {
        const parsedComp = JSON.parse(rawComp);
        if (Array.isArray(parsedComp)) initialCompleted = new Set<string>(parsedComp);
      }
    } catch {
      // Ignore
    }

    return reconcileStudyHistory(parsedHistory, initialCompleted, Date.now());
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return new Set<string>(parsed);
      }
    } catch {
      // Ignore storage failures
    }
    return new Set<string>();
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      // Ignore storage failures
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const persistStudyHistory = (nextHistory: Record<string, StudyHistoryRecord>) => {
    try {
      localStorage.setItem(STUDY_HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
    } catch {
      // Ignore
    }
  };

  const toggleComplete = (topicId: string) => {
    const now = Date.now();
    const isNowCompleted = !completedIds.has(topicId);

    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      try {
        localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // Ignore
      }
      return next;
    });

    setStudyHistory((prev) => {
      const next = toggleCompletionInHistory(prev, topicId, isNowCompleted, now);
      persistStudyHistory(next);
      return next;
    });
  };

  const toggleBookmark = (topicId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const activeIndex = Math.max(
    0,
    ALL_TOPICS_FLAT.findIndex((t) => t.id === activeTopicId)
  );
  const activeTopic = ALL_TOPICS_FLAT[activeIndex] || ALL_TOPICS_FLAT[0];

  const handleOpenInSandbox = (code: string, label: string) => {
    setSandboxCode(code);
    setSandboxLabel(`Sandbox · ${label}`);
    setActiveView('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (id: string) => {
    setActiveTopicId(id);
    setCurriculumSubView('topic');
    setActiveView('curriculum');
    setStudyHistory((prev) => {
      const next = recordTopicVisit(prev, id, Date.now());
      persistStudyHistory(next);
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOverview = () => {
    setCurriculumSubView('overview');
    setActiveView('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          setMobileSidebarOpen(false);
        }}
        mobileSidebarOpen={mobileSidebarOpen}
        onToggleMobileSidebar={() => setMobileSidebarOpen((v) => !v)}
      />
      <ReadingScrollBar visible={activeView === 'curriculum' && curriculumSubView === 'topic'} />

      {activeView === 'curriculum' && (
        <div className="flex flex-1 max-w-[1440px] w-full mx-auto">
          <CurriculumSidebar
            units={SYLLABUS_UNITS}
            activeTopicId={activeTopic.id}
            curriculumSubView={curriculumSubView}
            onOpenOverview={handleOpenOverview}
            onSelectTopic={handleSelectTopic}
            completedIds={completedIds}
            bookmarkedIds={bookmarkedIds}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            isOpenMobile={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
          <main className="flex-1 min-w-0">
            {/* Compact Curriculum Sub-View Bar */}
            <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]/80 px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Curriculum workspace views"
                className="inline-flex items-center gap-1 p-1 rounded-md bg-[var(--bg-canvas)] border border-[var(--border-hairline)] min-w-0 max-w-full"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={curriculumSubView === 'overview'}
                  onClick={handleOpenOverview}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    curriculumSubView === 'overview'
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={curriculumSubView === 'topic'}
                  onClick={() => handleSelectTopic(activeTopic.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors min-w-0 max-w-[220px] sm:max-w-[340px] cursor-pointer ${
                    curriculumSubView === 'topic'
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    Lesson: {activeTopic.code} {activeTopic.title}
                  </span>
                </button>
              </div>
              <span className="hidden sm:inline text-xs font-mono text-[var(--text-muted)] tabular-nums shrink-0">
                {completedIds.size} / {ALL_TOPICS_FLAT.length} completed
              </span>
            </div>

            {curriculumSubView === 'overview' ? (
              <CurriculumOverview
                units={SYLLABUS_UNITS}
                allTopics={ALL_TOPICS_FLAT}
                completedIds={completedIds}
                bookmarkedIds={bookmarkedIds}
                studyHistory={studyHistory}
                onSelectTopic={handleSelectTopic}
                onToggleComplete={toggleComplete}
              />
            ) : (
              <TopicReader
                topic={activeTopic}
                isCompleted={completedIds.has(activeTopic.id)}
                isBookmarked={bookmarkedIds.has(activeTopic.id)}
                onToggleComplete={toggleComplete}
                onToggleBookmark={toggleBookmark}
                hasPrev={activeIndex > 0}
                hasNext={activeIndex < ALL_TOPICS_FLAT.length - 1}
                onPrev={() =>
                  activeIndex > 0 && handleSelectTopic(ALL_TOPICS_FLAT[activeIndex - 1].id)
                }
                onNext={() =>
                  activeIndex < ALL_TOPICS_FLAT.length - 1 &&
                  handleSelectTopic(ALL_TOPICS_FLAT[activeIndex + 1].id)
                }
                onOpenInSandbox={handleOpenInSandbox}
                onOpenDoubtSolver={(prompt) => {
                  if (prompt) setDoubtInitialPrompt(prompt);
                  setDoubtDrawerOpen(true);
                }}
              />
            )}
          </main>
        </div>
      )}

      {activeView === 'simulations' && (
        <main className="flex-1">
          <SimulationsHub />
        </main>
      )}

      {activeView === 'html-ref' && (
        <main className="flex-1">
          <HtmlTagsReference onOpenInSandbox={handleOpenInSandbox} />
        </main>
      )}

      {activeView === 'exam-guide' && (
        <main className="flex-1">
          <ExamPrepView onJumpToTopic={handleSelectTopic} />
        </main>
      )}

      {activeView === 'sandbox' && (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-5">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
            <div>
              <div className="text-xs font-mono text-[var(--accent-warm)]">
                CS35302 Live Execution Window
              </div>
              <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)] m-0">
                HTML, CSS &amp; JavaScript Try-It Editor
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('curriculum')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] cursor-pointer"
            >
              Back to Curriculum
            </button>
          </header>
          <CodePlayground initialCode={sandboxCode} title={sandboxLabel} />
        </main>
      )}

      {/* Floating Doubt Solver Launcher */}
      {!doubtDrawerOpen && (
        <button
          type="button"
          onClick={() => setDoubtDrawerOpen(true)}
          aria-label="Open Doubt Solver Assistant"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-surface)] hover:bg-[var(--accent-hover)] shadow-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Doubt Solver</span>
        </button>
      )}

      <DoubtSolverDrawer
        isOpen={doubtDrawerOpen}
        onClose={() => setDoubtDrawerOpen(false)}
        activeTopic={activeTopic}
        initialPrompt={doubtInitialPrompt}
        onConsumeInitialPrompt={() => setDoubtInitialPrompt(null)}
        onOpenInSandbox={handleOpenInSandbox}
      />
    </div>
  );
}

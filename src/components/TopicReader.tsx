import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Play,
  RotateCw,
  Bookmark,
  Lightbulb,
  BookOpen,
  Cpu,
  Sparkles,
} from 'lucide-react';
import type { FlatTopic } from '../types/syllabus';
import { parseInlineCodeSegments } from '../utils/syllabusHelpers';
import { TOPIC_STUDY_GUIDES } from '../data/topicStudyGuides';
import { TopicFlowDiagram } from './diagrams/TopicFlowDiagram';
import { SimulationSwitcher } from './simulations/SimulationSwitcher';
import { RevealSection } from './RevealSection';

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const segments = parseInlineCodeSegments(text);
  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.type === 'code') {
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 mx-0.5 rounded bg-[var(--bg-subtle)] font-mono text-[0.88em] text-[var(--accent-primary)] border border-[var(--border-hairline)]"
            >
              {seg.value}
            </code>
          );
        }
        const boldParts = seg.value.split(/(\*\*[^*]+\*\*)/g);
        return (
          <React.Fragment key={idx}>
            {boldParts.map((part, bIdx) =>
              part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
                <strong key={bIdx} className="font-semibold text-[var(--text-primary)]">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <React.Fragment key={bIdx}>{part}</React.Fragment>
              )
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

interface TopicReaderProps {
  topic: FlatTopic;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (topicId: string) => void;
  onToggleBookmark: (topicId: string) => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpenInSandbox: (code: string, label: string) => void;
  onOpenDoubtSolver: (prompt?: string) => void;
}

type ReaderTab = 'theory' | 'lab' | 'examples' | 'practice' | 'exam';

const SECTION_LINKS = [
  { id: 'sec-definition', label: 'Definition' },
  { id: 'sec-analogy', label: 'Analogy & Hook' },
  { id: 'sec-diagram', label: 'Flowchart' },
  { id: 'sec-deep-dive', label: 'Deep Dive' },
  { id: 'sec-walkthrough', label: 'Walkthrough' },
  { id: 'sec-check', label: 'Quick Check' },
];

export const TopicReader: React.FC<TopicReaderProps> = ({
  topic,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onOpenInSandbox,
  onOpenDoubtSolver,
}) => {
  const [activeTab, setActiveTab] = useState<ReaderTab>('theory');
  const [activeSection, setActiveSection] = useState<string>('sec-definition');
  const [copiedTier, setCopiedTier] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [previewTier, setPreviewTier] = useState<string | null>(null);

  const guide = TOPIC_STUDY_GUIDES[topic.id];

  useEffect(() => {
    setQuizAnswers({});
    setFlippedCards({});
    setShowHint(false);
    setShowSolution(false);
    setPreviewTier(null);
    setActiveSection('sec-definition');
  }, [topic.id]);

  // Scroll-spy for the "On This Page" quick-jump bar inside Overview & Theory
  useEffect(() => {
    if (activeTab !== 'theory') return;
    const observers: IntersectionObserver[] = [];

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-120px 0px -65% 0px',
      threshold: 0.05,
    });

    for (const sec of SECTION_LINKS) {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    }
    observers.push(observer);

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [activeTab, topic.id]);

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const copyCode = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedTier(key);
    setTimeout(() => setCopiedTier(null), 1600);
  };

  const firstRunnableCode =
    (topic.examples.basic.runnableInSandbox && topic.examples.basic.code) ||
    (topic.examples.intermediate.runnableInSandbox && topic.examples.intermediate.code) ||
    (topic.examples.advanced.runnableInSandbox && topic.examples.advanced.code) ||
    undefined;

  const tabs: { id: ReaderTab; label: string }[] = [
    { id: 'theory', label: 'Overview & Theory' },
    { id: 'lab', label: 'Interactive Lab' },
    { id: 'examples', label: 'Code Examples' },
    { id: 'practice', label: 'Quiz & Flashcards' },
    { id: 'exam', label: 'Exam Q&A' },
  ];

  const quickCheckQ = topic.quiz[0];
  const quickCheckPicked = quizAnswers[0];

  return (
    <article className="max-w-4xl w-full min-w-0 mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Editorial Topic Header (Unboxed, zero pill badges) */}
      <header className="space-y-3 border-b border-[var(--border-hairline)] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-[var(--text-muted)]">
            {topic.unitCode} · Topic {topic.code} · {topic.bloom} · {topic.readMinutes} min study
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDoubtSolver()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border border-[var(--accent-primary)] bg-[var(--bg-surface)] text-[var(--accent-primary)] hover:bg-[var(--bg-subtle)] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Doubt
            </button>
            <button
              type="button"
              onClick={() => onToggleBookmark(topic.id)}
              aria-pressed={isBookmarked}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-colors whitespace-nowrap cursor-pointer ${
                isBookmarked
                  ? 'border-[var(--accent-amber)] bg-[var(--bg-subtle)] text-[var(--accent-amber)]'
                  : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => onToggleComplete(topic.id)}
              aria-pressed={isCompleted}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-colors whitespace-nowrap cursor-pointer ${
                isCompleted
                  ? 'border-[var(--accent-sage)] bg-[var(--accent-sage)] text-[var(--bg-surface)]'
                  : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight m-0 text-balance">
          {topic.title}
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[72ch] m-0">
          {topic.summary}
        </p>

        <div className="text-xs text-[var(--text-muted)]">
          Key Concepts: {topic.keywords.join(' · ')}
        </div>
      </header>

      {/* Clean Underline Tab Strip */}
      <div
        role="tablist"
        aria-label="Topic study sections"
        className="flex items-center gap-1 border-b border-[var(--border-hairline)] overflow-x-auto"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & THEORY */}
      {activeTab === 'theory' && (
        <div className="space-y-8">
          {/* Sticky "On This Page" Section Spy Strip */}
          <nav
            aria-label="Lesson section navigation"
            className="sticky top-[67px] z-20 -mx-1 px-3 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 backdrop-blur-sm flex items-center gap-1.5 overflow-x-auto"
          >
            <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] pr-1.5 shrink-0">
              On This Page:
            </span>
            {SECTION_LINKS.map((sec) => {
              const isCur = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => jumpToSection(sec.id)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isCur
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* 1. Formal Definition (Always immediately visible above the fold) */}
          <section
            id="sec-definition"
            className="scroll-mt-32 p-5 sm:p-6 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mt-0 mb-1.5">
                Formal Definition
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--text-primary)] leading-relaxed max-w-[72ch] m-0">
                <FormattedText text={topic.definition} />
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[var(--border-hairline)]">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-warm)] mt-0 mb-1">
                  Core Purpose
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                  <FormattedText text={topic.purpose} />
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-warm)] mt-0 mb-1">
                  Why It Is Needed
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                  <FormattedText text={topic.whyNeeded} />
                </p>
              </div>
            </div>
          </section>

          {/* 2. Everyday Analogy & Quick Memory Hook */}
          {guide && (
            <RevealSection
              id="sec-analogy"
              
              className="scroll-mt-32 grid grid-cols-1 md:grid-cols-12 gap-4"
            >
              <div className="md:col-span-7 p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Intuition · {guide.analogyTitle}
                </div>
                <p className="text-sm sm:text-[15px] text-[var(--text-primary)] leading-[1.7] m-0">
                  <FormattedText text={guide.analogy} />
                </p>
              </div>
              <div className="md:col-span-5 p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] space-y-2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-amber)]">
                  <BookOpen className="w-3.5 h-3.5" />
                  Exam Memory Hook
                </div>
                <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--text-primary)] leading-relaxed m-0">
                  <FormattedText text={guide.memoryHook} />
                </p>
              </div>
            </RevealSection>
          )}

          {/* 3. Interactive Visual Flowchart / Architecture Diagram */}
          {guide && (
            <RevealSection id="sec-diagram"  className="scroll-mt-32 space-y-2">
              <TopicFlowDiagram diagram={guide.diagram} topicId={topic.id} />
            </RevealSection>
          )}

          {/* 4. Structured Concept Deep Dive + Detailed Theory */}
          <RevealSection id="sec-deep-dive"  className="scroll-mt-32 space-y-5">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] m-0">
              Guided Concept Breakdown
            </h2>

            {guide && (
              <div className="space-y-4">
                {guide.structuredSections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2.5"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs font-bold text-[var(--accent-primary)] tabular-nums">
                        0{idx + 1}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--text-primary)] m-0">
                        {sec.heading}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] max-w-[74ch] m-0">
                      <FormattedText text={sec.explanation} />
                    </p>
                    <div className="pt-2 border-t border-[var(--border-hairline)] text-xs sm:text-sm text-[var(--text-primary)]">
                      <strong className="text-[var(--accent-primary)]">Key Insight: </strong>
                      <FormattedText text={sec.keyInsight} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] space-y-3">
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)] m-0">
                Extended Syllabus Notes
              </h3>
              {topic.detailedTheory.map((para, idx) => (
                <p key={idx} className="text-sm text-[var(--text-secondary)] leading-[1.7] max-w-[74ch] m-0">
                  <FormattedText text={para} />
                </p>
              ))}
            </div>
          </RevealSection>

          {/* 5. Worked Step-by-Step Walkthrough + Mechanism Cards */}
          <RevealSection id="sec-walkthrough"  className="scroll-mt-32 space-y-5">
            {guide && (
              <div className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
                    Worked Walkthrough: {guide.workedWalkthrough.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('lab')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] hover:bg-[var(--accent-hover)] cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    Launch Interactive Lab
                  </button>
                </div>
                <ol className="space-y-2 pl-0 m-0 list-none">
                  {guide.workedWalkthrough.steps.map((stepStr, idx) => (
                    <li
                      key={idx}
                      className="px-3.5 py-2.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs sm:text-sm font-mono text-[var(--text-primary)] leading-relaxed"
                    >
                      <FormattedText text={stepStr} />
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
                Execution Sequence Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topic.mechanismSteps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-warm)] mb-1">
                        <span className="tabular-nums">Step 0{st.step}</span>
                        {st.artifact && <span>{st.artifact}</span>}
                      </div>
                      <h4 className="font-display text-base font-semibold text-[var(--text-primary)] m-0 mb-1">
                        {st.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                        {st.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* 6. Comparison Table */}
          {topic.comparisonTable && (
            <RevealSection  className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] m-0">
                {topic.comparisonTable.title}
              </h2>
              <div className="overflow-x-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)]">
                      {topic.comparisonTable.headers.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-hairline)]">
                    {topic.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[var(--bg-canvas)]/60">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-3 text-xs sm:text-sm tabular-nums ${
                              cIdx === 0 ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealSection>
          )}

          {/* 7. Key Takeaways & Real-World Engineering */}
          <RevealSection  className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mt-0 mb-2.5">
                Key Takeaways
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)] pl-4 m-0">
                {topic.keyTakeaways.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <FormattedText text={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)] mt-0 mb-2.5">
                Real-World Engineering Applications
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)] pl-4 m-0">
                {topic.realWorldExamples.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <FormattedText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          {/* 8. Mistakes & Best Practices */}
          <RevealSection
            
            className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-4"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
              Common Pitfalls &amp; Best Practices
            </h2>
            <div className="space-y-2.5">
              {topic.mistakes.map((m, idx) => (
                <div key={idx} className="p-3 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-sm">
                  <div className="text-[var(--accent-crimson)] font-semibold">
                    Pitfall: <FormattedText text={m.mistake} />
                  </div>
                  <div className="text-[var(--accent-sage)] mt-1">
                    Fix: <FormattedText text={m.fix} />
                  </div>
                </div>
              ))}
            </div>
            <ul className="space-y-1.5 text-sm text-[var(--text-secondary)] pl-4 m-0 pt-2 border-t border-[var(--border-hairline)]">
              {topic.bestPractices.map((bp, idx) => (
                <li key={idx}>
                  <FormattedText text={bp} />
                </li>
              ))}
            </ul>
          </RevealSection>

          {/* 9. Inline Check Your Understanding Micro-Quiz */}
          {quickCheckQ && (
            <RevealSection
              id="sec-check"
              
              className="scroll-mt-32 p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
                    Check Your Understanding
                  </div>
                  <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
                    {quickCheckQ.question}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('practice')}
                  className="px-3 py-1.5 text-xs font-semibold rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
                >
                  Open Full Quiz &amp; Flashcards
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickCheckQ.options.map((opt, oIdx) => {
                  const answered = quickCheckPicked !== undefined;
                  const isCorrect = oIdx === quickCheckQ.correctIndex;
                  const isSelected = quickCheckPicked === oIdx;
                  let cls =
                    'border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]';
                  if (answered) {
                    if (isCorrect) {
                      cls = 'border-[var(--accent-sage)] bg-[var(--accent-sage)] text-[var(--bg-surface)] font-semibold';
                    } else if (isSelected) {
                      cls = 'border-[var(--accent-crimson)] bg-[var(--accent-crimson)] text-[var(--bg-surface)]';
                    }
                  }
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, 0: oIdx }))}
                      className={`text-left px-3.5 py-2.5 text-xs sm:text-sm rounded border transition-colors cursor-pointer ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {quickCheckPicked !== undefined && (
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] m-0 pt-2 border-t border-[var(--border-hairline)]">
                  <strong>Explanation:</strong> {quickCheckQ.explanation}
                </p>
              )}
            </RevealSection>
          )}
        </div>
      )}

      {/* TAB 2: INTERACTIVE LAB */}
      {activeTab === 'lab' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-[var(--text-secondary)] m-0">
              {topic.simulationCaption}
            </p>
            {firstRunnableCode && (
              <button
                type="button"
                onClick={() => onOpenInSandbox(firstRunnableCode, `${topic.code} ${topic.title}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Open in Full Code Sandbox
              </button>
            )}
          </div>
          <SimulationSwitcher simulationId={topic.simulationId} fallbackCode={firstRunnableCode} />
        </div>
      )}

      {/* TAB 3: CODE EXAMPLES */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          {(['basic', 'intermediate', 'advanced'] as const).map((tierKey) => {
            const ex = topic.examples[tierKey];
            const isPreviewOpen = previewTier === tierKey;
            return (
              <section
                key={tierKey}
                className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[var(--accent-warm)] mr-2">
                      {tierKey}
                    </span>
                    <strong className="text-sm text-[var(--text-primary)]">{ex.title}</strong>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyCode(tierKey, ex.code)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] cursor-pointer"
                    >
                      {copiedTier === tierKey ? <Check className="w-3.5 h-3.5 text-[var(--accent-sage)]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedTier === tierKey ? 'Copied' : 'Copy'}
                    </button>
                    {ex.runnableInSandbox && (
                      <>
                        <button
                          type="button"
                          onClick={() => setPreviewTier(isPreviewOpen ? null : tierKey)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] cursor-pointer"
                        >
                          {isPreviewOpen ? 'Hide Output' : 'Run Inline'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenInSandbox(ex.code, ex.title)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          Try in Sandbox
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <pre className="p-4 bg-[#0F172A] text-[#E2E8F0] font-mono text-xs overflow-x-auto m-0 leading-relaxed">
                  {ex.code}
                </pre>
                {isPreviewOpen && ex.runnableInSandbox && (
                  <div className="border-t border-[var(--border-hairline)] bg-[#F6F8F7]">
                    <div className="px-4 py-1.5 text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
                      Inline Rendered Preview (Sandboxed)
                    </div>
                    <iframe
                      title={`${ex.title} Inline Preview`}
                      sandbox="allow-scripts"
                      srcDoc={ex.code}
                      className="w-full min-h-[190px] border-0 bg-[#FFFFFF]"
                    />
                  </div>
                )}
                <div className="p-4 space-y-1.5 text-sm border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
                  <div>
                    <strong className="text-xs uppercase tracking-wider text-[var(--accent-sage)]">
                      Expected Output:
                    </strong>{' '}
                    <span className="text-[var(--text-primary)]">{ex.expectedOutput}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] m-0">{ex.explanation}</p>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* TAB 4: QUIZ, FLASHCARDS & ASSIGNMENT */}
      {activeTab === 'practice' && (
        <div className="space-y-8">
          {/* Interactive Quiz */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] m-0">
              Self-Check Quiz
            </h2>
            {topic.quiz.map((q, qIdx) => {
              const picked = quizAnswers[qIdx];
              const answered = picked !== undefined;
              return (
                <div
                  key={qIdx}
                  className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3"
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)] m-0">
                    Q{qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctIndex;
                      const isSelected = picked === oIdx;
                      let cls =
                        'border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]';
                      if (answered) {
                        if (isCorrect) {
                          cls = 'border-[var(--accent-sage)] bg-[var(--accent-sage)] text-[var(--bg-surface)] font-semibold';
                        } else if (isSelected) {
                          cls = 'border-[var(--accent-crimson)] bg-[var(--accent-crimson)] text-[var(--bg-surface)]';
                        }
                      }
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                          className={`text-left px-3.5 py-2.5 text-xs sm:text-sm rounded border transition-colors cursor-pointer ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <p className="text-xs text-[var(--text-secondary)] m-0 pt-2 border-t border-[var(--border-hairline)]">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </section>

          {/* 3D Flip Flashcards */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] m-0">
              Active Recall Flashcards (Click to Flip)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topic.flashcards.map((card, cIdx) => {
                const flipped = !!flippedCards[cIdx];
                return (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => setFlippedCards((prev) => ({ ...prev, [cIdx]: !prev[cIdx] }))}
                    className="perspective-1000 h-40 w-full text-left bg-transparent border-0 p-0 cursor-pointer"
                  >
                    <div
                      className={`relative w-full h-full transform-style-3d ${
                        flipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      <div className="absolute inset-0 backface-hidden p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between">
                        <span className="text-[11px] font-mono text-[var(--accent-warm)]">
                          Prompt · Card {cIdx + 1}
                        </span>
                        <span className="font-display text-base font-semibold text-[var(--text-primary)]">
                          {card.front}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                          <RotateCw className="w-3 h-3" /> Flip for answer
                        </span>
                      </div>
                      <div className="absolute inset-0 backface-hidden rotate-y-180 p-5 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-surface)] flex flex-col justify-between">
                        <span className="text-[11px] font-mono opacity-80">Answer</span>
                        <span className="text-sm leading-relaxed">{card.back}</span>
                        <span className="text-[11px] opacity-75">Click to flip back</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Practical Lab Assignment */}
          <section className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0">
              Practical Assignment
            </h2>
            <p className="text-sm text-[var(--text-primary)] m-0">{topic.assignment.task}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="px-3 py-1.5 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] cursor-pointer"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                type="button"
                onClick={() => setShowSolution((v) => !v)}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                {showSolution ? 'Hide Solution' : 'Reveal Solution'}
              </button>
            </div>
            {showHint && (
              <p className="text-xs text-[var(--accent-warm)] bg-[var(--bg-canvas)] p-3 rounded border border-[var(--border-hairline)] m-0">
                Hint: {topic.assignment.hint}
              </p>
            )}
            {showSolution && (
              <pre className="text-xs font-mono bg-[#0F172A] text-[#E2E8F0] p-3.5 rounded overflow-x-auto m-0">
                {topic.assignment.solution}
              </pre>
            )}
          </section>
        </div>
      )}

      {/* TAB 5: UNIVERSITY EXAM Q&A */}
      {activeTab === 'exam' && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)] m-0">
            Structured 2-Mark (short precision) and 7-Mark (comprehensive analytical) university exam answers.
          </p>
          {topic.examQAs.map((qa, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2"
            >
              <div className="text-xs font-mono font-semibold text-[var(--accent-warm)]">
                {qa.marks} University Question
              </div>
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)] m-0">
                <FormattedText text={qa.question} />
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0 pt-1">
                <FormattedText text={qa.answer} />
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Prev / Next Topic Footer */}
      <footer className="flex items-center justify-between gap-3 pt-6 border-t border-[var(--border-hairline)]">
        <button
          type="button"
          disabled={!hasPrev}
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Topic
        </button>
        <button
          type="button"
          disabled={!hasNext}
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          Next Topic
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </article>
  );
};

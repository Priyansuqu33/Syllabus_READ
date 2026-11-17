import React, { useMemo, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { SYLLABUS_UNITS, ALL_TOPICS_FLAT } from '../data/syllabusIndex';
import { parseInlineCodeSegments } from '../utils/syllabusHelpers';

const InlineCodeText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {parseInlineCodeSegments(text).map((seg, i) =>
      seg.type === 'code' ? (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[var(--bg-subtle)] font-mono text-[0.88em] text-[var(--accent-primary)] border border-[var(--border-hairline)]"
        >
          {seg.value}
        </code>
      ) : (
        <React.Fragment key={i}>{seg.value}</React.Fragment>
      )
    )}
  </>
);

interface ExamPrepViewProps {
  onJumpToTopic: (topicId: string) => void;
}

export const ExamPrepView: React.FC<ExamPrepViewProps> = ({ onJumpToTopic }) => {
  const [unitFilter, setUnitFilter] = useState<number | 'all'>('all');
  const [marksFilter, setMarksFilter] = useState<'all' | '2M' | '4M' | '7M'>('all');
  const [query, setQuery] = useState('');

  const totalHours = SYLLABUS_UNITS.reduce((acc, u) => acc + u.hours, 0);

  const questions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list: {
      unitNumber: number;
      topicId: string;
      topicCode: string;
      topicTitle: string;
      marks: '2M' | '4M' | '7M';
      question: string;
      answer: string;
    }[] = [];

    for (const t of ALL_TOPICS_FLAT) {
      if (unitFilter !== 'all' && t.unitNumber !== unitFilter) continue;
      for (const qa of t.examQAs) {
        if (marksFilter !== 'all' && qa.marks !== marksFilter) continue;
        if (
          q &&
          !qa.question.toLowerCase().includes(q) &&
          !qa.answer.toLowerCase().includes(q) &&
          !t.title.toLowerCase().includes(q)
        ) {
          continue;
        }
        list.push({
          unitNumber: t.unitNumber,
          topicId: t.id,
          topicCode: t.code,
          topicTitle: t.title,
          marks: qa.marks,
          question: qa.question,
          answer: qa.answer,
        });
      }
    }
    return list;
  }, [unitFilter, marksFilter, query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <header className="space-y-2 border-b border-[var(--border-hairline)] pb-5">
        <div className="text-xs font-mono text-[var(--accent-warm)]">
          Quantum University · CS35302 Official Syllabus &amp; Question Bank ({totalHours} Lecture Hours)
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] m-0">
          Syllabus Blueprint &amp; Exam Revision Guide
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[70ch] m-0">
          Review the official 5-unit curriculum breakdown and drill concise 2-Mark and analytical 7-Mark examination answers.
        </p>
      </header>

      {/* Unit Hours & Official Syllabus Matrix */}
      <section className="overflow-x-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)]">
              <th scope="col" className="px-4 py-3 font-semibold">Unit</th>
              <th scope="col" className="px-4 py-3 font-semibold">Title &amp; Official Topics</th>
              <th scope="col" className="px-4 py-3 font-semibold text-right">Topics</th>
              <th scope="col" className="px-4 py-3 font-semibold text-right">Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-hairline)]">
            {SYLLABUS_UNITS.map((u) => (
              <tr key={u.unitNumber}>
                <td className="px-4 py-3 font-mono font-semibold text-[var(--accent-primary)] whitespace-nowrap align-top">
                  {u.unitCode}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-[var(--text-primary)]">{u.title}</div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 m-0 leading-relaxed">
                    {u.officialSyllabus}
                  </p>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums align-top">
                  {u.topics.length}
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums align-top">
                  {u.hours}h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Filterable Question Bank */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] m-0">
            University Exam Q&amp;A Bank ({questions.length})
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                aria-label="Search exam questions"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                className="pl-8 pr-3 py-1.5 text-xs rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
              />
            </div>
            <select
              aria-label="Filter exam questions by unit"
              value={unitFilter}
              onChange={(e) =>
                setUnitFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-2.5 py-1.5 text-xs rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            >
              <option value="all">All Units</option>
              {SYLLABUS_UNITS.map((u) => (
                <option key={u.unitNumber} value={u.unitNumber}>
                  {u.unitCode}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter by marks weight"
              value={marksFilter}
              onChange={(e) => setMarksFilter(e.target.value as 'all' | '2M' | '4M' | '7M')}
              className="px-2.5 py-1.5 text-xs rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            >
              <option value="all">All Marks</option>
              <option value="2M">2 Marks</option>
              <option value="7M">7 Marks</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((item, idx) => (
            <div
              key={`${item.topicId}-${idx}`}
              className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[var(--accent-warm)]">
                  Unit 0{item.unitNumber} · Topic {item.topicCode} · {item.marks}
                </span>
                <button
                  type="button"
                  onClick={() => onJumpToTopic(item.topicId)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)] hover:underline cursor-pointer"
                >
                  Open Lesson <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)] m-0">
                <InlineCodeText text={item.question} />
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                <InlineCodeText text={item.answer} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

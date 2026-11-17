import React, { useMemo, useState } from 'react';
import { Search, Play } from 'lucide-react';
import { HTML_TAGS_DATABASE } from '../data/htmlTags';
import type { HtmlTagEntry } from '../types/syllabus';

interface HtmlTagsReferenceProps {
  onOpenInSandbox: (code: string, label: string) => void;
}

export const HtmlTagsReference: React.FC<HtmlTagsReferenceProps> = ({ onOpenInSandbox }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<HtmlTagEntry>(HTML_TAGS_DATABASE[0]);

  const categories = useMemo(() => {
    const set = new Set(HTML_TAGS_DATABASE.map((t) => t.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return HTML_TAGS_DATABASE.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (!q) return true;
      return (
        item.tag.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [search, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <header className="space-y-2 border-b border-[var(--border-hairline)] pb-5">
        <div className="text-xs font-mono text-[var(--accent-warm)]">
          Unit 01 &amp; 02 Reference · {HTML_TAGS_DATABASE.length} Standard HTML5 Elements
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] m-0">
          HTML5 Elements &amp; Attributes Reference
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[70ch] m-0">
          Complete syntax, attributes, accessibility guidelines, and runnable examples for every essential HTML5 tag.
        </p>
      </header>

      {/* Search + Category Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            aria-label="Search HTML5 tags"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter tags (e.g., table, form, canvas, nav)..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
          />
        </div>
        <select
          aria-label="Filter by HTML category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 text-sm rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
          {filtered.length} tags shown
        </span>
      </div>

      {/* Master-Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 max-h-[620px] overflow-y-auto space-y-1.5 pr-1">
          {filtered.map((item) => {
            const active = item.tag === selectedTag.tag;
            return (
              <button
                key={item.tag}
                type="button"
                onClick={() => setSelectedTag(item)}
                className={`w-full text-left px-3.5 py-2.5 rounded border transition-colors cursor-pointer ${
                  active
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold">&lt;{item.tag}&gt;</span>
                  <span className={`text-[11px] ${active ? 'opacity-85' : 'text-[var(--text-muted)]'}`}>
                    {item.category}
                  </span>
                </div>
                <p className={`text-xs mt-1 m-0 line-clamp-1 ${active ? 'opacity-90' : 'text-[var(--text-secondary)]'}`}>
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <article className="lg:col-span-8 min-w-0 p-6 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
            <div className="min-w-0">
              <div className="text-xs font-mono text-[var(--accent-warm)]">{selectedTag.category}</div>
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] mt-1 mb-1">
                &lt;{selectedTag.tag}&gt;
              </h2>
              <code className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-2 py-1 rounded break-all">
                {selectedTag.syntax}
              </code>
            </div>
            <button
              type="button"
              onClick={() => onOpenInSandbox(selectedTag.advancedExample, `<${selectedTag.tag}> Example`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              Try in Sandbox
            </button>
          </div>

          <p className="text-sm sm:text-[15px] text-[var(--text-primary)] leading-relaxed m-0">
            {selectedTag.description}
          </p>

          {/* Attributes */}
          <div className="space-y-2">
            <h3 className="font-display text-base font-semibold text-[var(--text-primary)] m-0">
              Key Attributes
            </h3>
            <div className="overflow-x-auto rounded border border-[var(--border-hairline)]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)]">
                    <th scope="col" className="px-3 py-2 font-semibold">Attribute</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Value Type</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-hairline)]">
                  {selectedTag.attributes.map((attr) => (
                    <tr key={attr.name}>
                      <td className="px-3 py-2 font-mono font-semibold text-[var(--accent-primary)]">{attr.name}</td>
                      <td className="px-3 py-2 font-mono text-[var(--text-muted)]">{attr.type}</td>
                      <td className="px-3 py-2 text-[var(--text-secondary)]">{attr.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="text-xs font-semibold text-[var(--text-primary)]">Basic Usage</div>
              <pre className="p-3 rounded bg-[#0F172A] text-[#E2E8F0] font-mono text-xs overflow-x-auto m-0">
                {selectedTag.basicExample}
              </pre>
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="text-xs font-semibold text-[var(--text-primary)]">Styled / Interactive Pattern</div>
              <pre className="p-3 rounded bg-[#0F172A] text-[#E2E8F0] font-mono text-xs overflow-x-auto m-0">
                {selectedTag.advancedExample}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-hairline)] text-xs sm:text-sm">
            <div>
              <strong className="text-[var(--text-primary)]">Browser Behavior:</strong>
              <p className="text-[var(--text-secondary)] mt-1 m-0 leading-relaxed">
                {selectedTag.browserBehavior}
              </p>
            </div>
            <div>
              <strong className="text-[var(--accent-sage)]">Accessibility Notes:</strong>
              <p className="text-[var(--text-secondary)] mt-1 m-0 leading-relaxed">
                {selectedTag.accessibilityNotes}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

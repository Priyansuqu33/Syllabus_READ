import React, { useMemo, useState } from 'react';
import { buildInvertedIndexAndSearch } from '../../utils/syllabusHelpers';

const SAMPLE_CORPUS = [
  'HTTP and HTTPS stateless request protocols run over TCP ports 80 and 443.',
  'SMTP pushes outgoing email while IMAP synchronizes mailboxes across multiple devices.',
  'RDF models Semantic Web facts as Subject Predicate Object knowledge triples.',
  'Search engines build an inverted index and rank documents using TF IDF and PageRank.',
  'Web 4.0 integrates AI agents, WebGPU inference, and personalized adaptive interfaces.',
];

const RDF_TRIPLES = [
  { s: 'ex:CS35302', p: 'ex:coversProtocol', o: 'ex:HTTP' },
  { s: 'ex:CS35302', p: 'ex:offeredBy', o: 'ex:QuantumUniversity' },
  { s: 'ex:QuantumUniversity', p: 'schema:addressLocality', o: '"Roorkee"' },
  { s: 'ex:TimBernersLee', p: 'ex:proposed', o: 'ex:SemanticWeb' },
];

export const SemanticSearchSimulator: React.FC = () => {
  const [tab, setTab] = useState<'search' | 'rdf'>('search');
  const [query, setQuery] = useState<string>('inverted index rank');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const searchResult = useMemo(() => buildInvertedIndexAndSearch(SAMPLE_CORPUS, query), [query]);

  const filteredTriples =
    selectedSubject === 'all'
      ? RDF_TRIPLES
      : RDF_TRIPLES.filter((t) => t.s === selectedSubject);

  const maxScore = Math.max(0.01, ...searchResult.scores.map((s) => s.score));

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab('search')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
              tab === 'search'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            Inverted Index &amp; TF-IDF Ranker
          </button>
          <button
            type="button"
            onClick={() => setTab('rdf')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
              tab === 'rdf'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            Semantic Web RDF Triple Graph
          </button>
        </div>
        <span className="text-xs text-[var(--text-muted)]">Unit 4 &amp; 5 Engine Lab</span>
      </div>

      {tab === 'search' ? (
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="tfidf-q" className="text-xs font-semibold text-[var(--text-primary)]">
              Search Query:
            </label>
            <input
              id="tfidf-q"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: http, imap, rdf, index..."
              className="flex-1 min-w-[200px] px-3 py-1.5 text-sm rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
            />
          </div>

          <div className="space-y-2">
            {searchResult.scores.map((item) => {
              const barPct = Math.round((item.score / maxScore) * 100);
              return (
                <div
                  key={item.docIndex}
                  className="p-3 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-semibold text-[var(--accent-primary)]">
                      Doc #{item.docIndex}
                    </span>
                    <span className="font-mono tabular-nums text-[var(--accent-sage)]">
                      TF-IDF Score: {item.score.toFixed(4)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] m-0">
                    {SAMPLE_CORPUS[item.docIndex]}
                  </p>
                  <div className="h-1.5 w-full rounded bg-[var(--bg-muted)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent-warm)] transition-all"
                      style={{ width: `${item.score > 0 ? Math.max(8, barPct) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              Filter by Subject Entity
            </span>
            <select
              aria-label="Filter RDF subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
            >
              <option value="all">All Entities</option>
              <option value="ex:CS35302">ex:CS35302</option>
              <option value="ex:QuantumUniversity">ex:QuantumUniversity</option>
              <option value="ex:TimBernersLee">ex:TimBernersLee</option>
            </select>
          </div>

          <div className="space-y-2.5">
            {filteredTriples.map((tr, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 p-3 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] font-mono text-xs"
              >
                <span className="px-2 py-1 rounded bg-[var(--accent-primary)] text-[var(--bg-surface)]">
                  {tr.s}
                </span>
                <span className="text-[var(--text-muted)]">&mdash;[</span>
                <span className="text-[var(--accent-warm)] font-semibold">{tr.p}</span>
                <span className="text-[var(--text-muted)]">]&rarr;</span>
                <span className="px-2 py-1 rounded bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-strong)]">
                  {tr.o}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

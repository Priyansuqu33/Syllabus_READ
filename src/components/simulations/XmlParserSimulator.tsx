import React, { useMemo, useState } from 'react';
import { Play } from 'lucide-react';

const DEFAULT_XML = `<university>
  <course code="CS35302">
    <title>Web Technology</title>
    <credits>4</credits>
  </course>
</university>`;

interface SaxEvent {
  seq: number;
  callback: string;
  detail: string;
}

export const XmlParserSimulator: React.FC = () => {
  const [xmlInput, setXmlInput] = useState(DEFAULT_XML);
  const [mode, setMode] = useState<'dom' | 'sax'>('dom');
  const [saxLimit, setSaxLimit] = useState<number>(999);

  const parsed = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlInput, 'text/xml');
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return { valid: false, error: parserError.textContent || 'Malformed XML', tree: [] as string[], saxEvents: [] as SaxEvent[] };
    }

    const tree: string[] = [];
    const saxEvents: SaxEvent[] = [{ seq: 1, callback: 'startDocument()', detail: 'Initialize stream' }];
    let seq = 2;

    const walk = (node: Element, depth: number) => {
      const attrs = Array.from(node.attributes)
        .map((a) => `${a.name}="${a.value}"`)
        .join(' ');
      const label = `<${node.tagName}${attrs ? ' ' + attrs : ''}>`;
      tree.push(`${'  '.repeat(depth)}├─ ${label}`);
      saxEvents.push({ seq: seq++, callback: `startElement("${node.tagName}")`, detail: attrs || 'no attributes' });

      for (const child of Array.from(node.childNodes)) {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent?.trim();
          if (text) {
            tree.push(`${'  '.repeat(depth + 1)}└─ #text: "${text}"`);
            saxEvents.push({ seq: seq++, callback: 'characters()', detail: `"${text}"` });
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child as Element, depth + 1);
        }
      }
      saxEvents.push({ seq: seq++, callback: `endElement("${node.tagName}")`, detail: 'Close tag' });
    };

    if (doc.documentElement) walk(doc.documentElement, 0);
    saxEvents.push({ seq: seq++, callback: 'endDocument()', detail: 'Stream complete (0 tree retained)' });

    return { valid: true, error: '', tree, saxEvents };
  }, [xmlInput]);

  const byteSize = xmlInput.length;
  const domRamEstimateKB = Math.max(12, Math.round((byteSize * 6.5) / 1024 * 100));
  const saxRamEstimateKB = 4;

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <strong className="font-display text-sm text-[var(--text-primary)]">
          XML Parser Lab: DOM (Tree in RAM) vs SAX (Event Stream)
        </strong>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('dom')}
            className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer ${
              mode === 'dom'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            DOM Tree Mode
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('sax');
              setSaxLimit(1);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer ${
              mode === 'sax'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            SAX Stream Mode
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-3">
          <label htmlFor="xml-src" className="block text-xs font-semibold text-[var(--text-primary)]">
            Editable Well-Formed XML Document
          </label>
          <textarea
            id="xml-src"
            rows={7}
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            spellCheck={false}
            className="w-full font-mono text-xs p-3 rounded border border-[var(--border-strong)] bg-[#0F172A] text-[#E2E8F0]"
          />

          {/* SVG Memory Footprint Chart */}
          <div className="p-3 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
            <div className="text-xs font-semibold text-[var(--text-primary)] mb-2">
              Simulated Memory Scaling (for 100 MB Enterprise XML Feed)
            </div>
            <svg viewBox="0 0 360 72" className="w-full h-auto" role="img" aria-label="DOM vs SAX Memory Usage">
              <text x="0" y="20" fontSize="11" fill="var(--text-secondary)">DOM Tree (~5x file size)</text>
              <rect x="145" y="9" width="170" height="15" rx="3" fill="var(--accent-crimson)" />
              <text x="322" y="21" fontSize="10" fontWeight="700" fill="var(--text-primary)">~500 MB</text>

              <text x="0" y="52" fontSize="11" fill="var(--text-secondary)">SAX Stream (O(1) buffer)</text>
              <rect x="145" y="41" width="12" height="15" rx="3" fill="var(--accent-primary)" />
              <text x="164" y="53" fontSize="10" fontWeight="700" fill="var(--accent-sage)">
                ~{saxRamEstimateKB} MB (Constant · demo scaled {domRamEstimateKB} KB vs {saxRamEstimateKB} KB)
              </text>
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          {!parsed.valid ? (
            <div className="p-4 rounded border border-[var(--accent-crimson)] bg-[var(--bg-canvas)] text-xs text-[var(--accent-crimson)] font-mono">
              XML Well-Formedness Error: {parsed.error}
            </div>
          ) : mode === 'dom' ? (
            <div className="p-4 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              <div className="text-xs font-semibold text-[var(--text-primary)] mb-2">
                In-Memory DOM Node Hierarchy (Supports Random Access &amp; Mutations)
              </div>
              <pre className="font-mono text-xs text-[var(--text-secondary)] m-0 overflow-x-auto leading-relaxed">
                {parsed.tree.join('\n')}
              </pre>
            </div>
          ) : (
            <div className="p-4 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  SAX Forward-Only Event Callbacks
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSaxLimit((n) => Math.min(parsed.saxEvents.length, n + 1))}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    Next Event ({Math.min(saxLimit, parsed.saxEvents.length)}/{parsed.saxEvents.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaxLimit(parsed.saxEvents.length)}
                    className="px-2 py-1 text-[11px] rounded border border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
                  >
                    All
                  </button>
                </div>
              </div>
              <div className="space-y-1 max-h-[210px] overflow-y-auto font-mono text-xs">
                {parsed.saxEvents.slice(0, saxLimit).map((ev) => (
                  <div
                    key={ev.seq}
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)]"
                  >
                    <span className="text-[var(--accent-primary)] font-semibold">{ev.seq}. {ev.callback}</span>
                    <span className="text-[var(--text-muted)]">{ev.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

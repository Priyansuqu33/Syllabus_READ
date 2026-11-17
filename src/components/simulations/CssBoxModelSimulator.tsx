import React, { useState } from 'react';
import { computeCssBoxModel, calculateCssSpecificity } from '../../utils/syllabusHelpers';

export const CssBoxModelSimulator: React.FC = () => {
  const [width, setWidth] = useState(220);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(6);
  const [margin, setMargin] = useState(18);
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('border-box');

  const [selectorA, setSelectorA] = useState('#nav .menu > li.active a');
  const [selectorB, setSelectorB] = useState('header ul li a:hover');

  const dims = computeCssBoxModel({
    width,
    height: 90,
    padding,
    border,
    margin,
    boxSizing,
  });

  const specA = calculateCssSpecificity(selectorA);
  const specB = calculateCssSpecificity(selectorB);
  const winner =
    specA.totalWeight > specB.totalWeight
      ? 'Selector A wins'
      : specB.totalWeight > specA.totalWeight
      ? 'Selector B wins'
      : 'Equal specificity (later rule in cascade wins)';

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <strong className="font-display text-sm text-[var(--text-primary)]">
          CSS Box Model &amp; Specificity Calculator
        </strong>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setBoxSizing('content-box')}
            className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
              boxSizing === 'content-box'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            content-box
          </button>
          <button
            type="button"
            onClick={() => setBoxSizing('border-box')}
            className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
              boxSizing === 'border-box'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            border-box
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Controls */}
        <div className="space-y-3.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[var(--text-primary)]">Declared CSS Width</span>
              <span className="font-mono tabular-nums text-[var(--accent-warm)]">{width}px</span>
            </div>
            <input
              aria-label="Declared CSS width"
              type="range"
              min={140}
              max={300}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[var(--text-primary)]">Padding (all sides)</span>
              <span className="font-mono tabular-nums text-[var(--accent-warm)]">{padding}px</span>
            </div>
            <input
              aria-label="CSS padding"
              type="range"
              min={0}
              max={36}
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[var(--text-primary)]">Border Width</span>
              <span className="font-mono tabular-nums text-[var(--accent-warm)]">{border}px</span>
            </div>
            <input
              aria-label="CSS border width"
              type="range"
              min={0}
              max={16}
              value={border}
              onChange={(e) => setBorder(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[var(--text-primary)]">Margin (outer spacing)</span>
              <span className="font-mono tabular-nums text-[var(--accent-warm)]">{margin}px</span>
            </div>
            <input
              aria-label="CSS margin"
              type="range"
              min={0}
              max={32}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)]">
              <div className="text-[11px] text-[var(--text-muted)]">Content W</div>
              <div className="font-mono text-sm font-bold text-[var(--text-primary)] tabular-nums">
                {dims.contentWidth}px
              </div>
            </div>
            <div className="p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)]">
              <div className="text-[11px] text-[var(--text-muted)]">Rendered Box</div>
              <div className="font-mono text-sm font-bold text-[var(--accent-primary)] tabular-nums">
                {dims.renderedBoxWidth}px
              </div>
            </div>
            <div className="p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)]">
              <div className="text-[11px] text-[var(--text-muted)]">With Margin</div>
              <div className="font-mono text-sm font-bold text-[var(--accent-sage)] tabular-nums">
                {dims.totalOccupiedWidth}px
              </div>
            </div>
          </div>
        </div>

        {/* Live Nested Box Diagram */}
        <div className="flex flex-col items-center justify-center p-4 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] overflow-x-auto">
          <div
            style={{
              padding: `${margin}px`,
              backgroundColor: 'rgba(139, 76, 36, 0.14)',
              border: '1px dashed var(--accent-warm)',
            }}
            className="text-center transition-all"
          >
            <div className="text-[10px] font-mono text-[var(--accent-warm)] mb-1">
              margin ({margin}px)
            </div>
            <div
              style={{
                width: `${dims.renderedBoxWidth}px`,
                padding: `${padding}px`,
                borderWidth: `${border}px`,
                borderStyle: 'solid',
                borderColor: 'var(--accent-primary)',
                backgroundColor: 'rgba(45, 90, 67, 0.14)',
                boxSizing: 'border-box',
              }}
              className="transition-all"
            >
              <div className="text-[10px] font-mono text-[var(--accent-sage)] mb-1">
                padding ({padding}px) · border ({border}px)
              </div>
              <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] py-3 px-2 font-mono text-xs text-[var(--text-primary)] tabular-nums">
                Content: {dims.contentWidth} &times; {dims.contentHeight}px
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specificity Battle */}
      <div className="px-5 pb-5 pt-4 border-t border-[var(--border-hairline)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <strong className="text-xs text-[var(--text-primary)]">
            CSS Specificity Comparator (ID = 100 · Class/Pseudo = 10 · Element = 1)
          </strong>
          <span className="text-xs font-semibold text-[var(--accent-sage)]">{winner}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-1.5">
            <label htmlFor="sel-a" className="text-[11px] font-semibold text-[var(--text-muted)]">
              Selector A
            </label>
            <input
              id="sel-a"
              type="text"
              value={selectorA}
              onChange={(e) => setSelectorA(e.target.value)}
              className="w-full px-2.5 py-1 text-xs font-mono rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            />
            <div className="font-mono text-xs text-[var(--text-secondary)] tabular-nums">
              ({specA.ids}, {specA.classes}, {specA.elements}) = Score {specA.totalWeight}
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-1.5">
            <label htmlFor="sel-b" className="text-[11px] font-semibold text-[var(--text-muted)]">
              Selector B
            </label>
            <input
              id="sel-b"
              type="text"
              value={selectorB}
              onChange={(e) => setSelectorB(e.target.value)}
              className="w-full px-2.5 py-1 text-xs font-mono rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            />
            <div className="font-mono text-xs text-[var(--text-secondary)] tabular-nums">
              ({specB.ids}, {specB.classes}, {specB.elements}) = Score {specB.totalWeight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

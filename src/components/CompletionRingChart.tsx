import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { UnitProgressItem } from '../utils/progressHelpers';

export const UNIT_RING_COLORS = [
  'var(--accent-primary)',
  'var(--accent-warm)',
  'var(--accent-sage)',
  'var(--accent-amber)',
  'var(--accent-cyan)',
];

interface CompletionRingChartProps {
  unitProgress: UnitProgressItem[];
  overallPercentage: number;
  completedTopics: number;
  totalTopics: number;
  selectedUnit: number | 'all';
  onSelectUnit: (unitNumber: number | 'all') => void;
}

export const CompletionRingChart: React.FC<CompletionRingChartProps> = ({
  unitProgress,
  overallPercentage,
  completedTopics,
  totalTopics,
  selectedUnit,
  onSelectUnit,
}) => {
  const innerArcRef = useRef<SVGPathElement | null>(null);
  const prevFractionRef = useRef<number>(0);
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);

  const pieSlices = useMemo(() => {
    const pieGen = d3
      .pie<UnitProgressItem>()
      .value((d) => Math.max(1, d.total))
      .sort(null)
      .padAngle(0.035);
    return pieGen(unitProgress);
  }, [unitProgress]);

  const outerTrackArcGen = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<UnitProgressItem>>()
        .innerRadius(108)
        .outerRadius(132)
        .cornerRadius(5),
    []
  );

  const outerFillArcGen = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<UnitProgressItem>>()
        .innerRadius(108)
        .outerRadius(132)
        .cornerRadius(5),
    []
  );

  const innerTrackPath = useMemo(() => {
    const gen = d3.arc<unknown>().innerRadius(74).outerRadius(94);
    return gen({ startAngle: 0, endAngle: Math.PI * 2 } as unknown as d3.DefaultArcObject) || '';
  }, []);

  useEffect(() => {
    const el = innerArcRef.current;
    if (!el) return;

    const targetFraction =
      totalTopics > 0 ? Math.max(0, Math.min(1, completedTopics / totalTopics)) : 0;
    const startFraction = prevFractionRef.current;

    const arcGen = d3
      .arc<{ endAngle: number }>()
      .innerRadius(74)
      .outerRadius(94)
      .startAngle(0)
      .cornerRadius(6);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      d3.select(el).attr('d', arcGen({ endAngle: targetFraction * Math.PI * 2 }) || '');
      prevFractionRef.current = targetFraction;
      return;
    }

    const interp = d3.interpolateNumber(startFraction, targetFraction);
    d3.select(el)
      .interrupt()
      .transition()
      .duration(520)
      .ease(d3.easeCubicOut)
      .attrTween('d', () => (t: number) => {
        const frac = interp(t);
        return frac <= 0.001 ? '' : arcGen({ endAngle: frac * Math.PI * 2 }) || '';
      });

    prevFractionRef.current = targetFraction;
  }, [completedTopics, totalTopics]);

  const activeUnitNumber = hoveredUnit ?? (selectedUnit !== 'all' ? selectedUnit : null);
  const focusedUnit = activeUnitNumber
    ? unitProgress.find((u) => u.unitNumber === activeUnitNumber) || null
    : null;

  return (
    <div className="flex flex-col items-center">
      <svg
        data-testid="d3-completion-ring"
        data-percentage={overallPercentage}
        data-completed={completedTopics}
        viewBox="0 0 320 320"
        className="w-full max-w-[290px] aspect-square select-none overflow-visible"
        role="img"
        aria-label={`Course completion ring chart: ${overallPercentage}% overall (${completedTopics} of ${totalTopics} topics completed)`}
      >
        <g transform="translate(160, 160)">
          {/* Inner Overall Progress Track + Animated D3 Arc */}
          <path d={innerTrackPath} fill="var(--bg-muted)" />
          <path ref={innerArcRef} fill="var(--accent-primary)" />

          {/* Outer Unit-by-Unit Segmented Completion Ring */}
          {pieSlices.map((slice, idx) => {
            const unit = slice.data;
            const color = UNIT_RING_COLORS[idx % UNIT_RING_COLORS.length];
            const trackD = outerTrackArcGen(slice) || '';
            const span = Math.max(0, slice.endAngle - slice.startAngle);
            const ratio = unit.total > 0 ? unit.completed / unit.total : 0;
            const fillSlice = {
              ...slice,
              endAngle: slice.startAngle + span * ratio,
            };
            const fillD = ratio > 0 ? outerFillArcGen(fillSlice) || '' : '';
            const isHighlighted = activeUnitNumber === unit.unitNumber;
            const isDimmed = activeUnitNumber !== null && !isHighlighted;

            return (
              <g
                key={unit.unitNumber}
                role="button"
                tabIndex={0}
                aria-label={`${unit.unitCode}: ${unit.completed} of ${unit.total} topics completed (${unit.percentage}%). Click to filter timeline.`}
                aria-pressed={selectedUnit === unit.unitNumber}
                onMouseEnter={() => setHoveredUnit(unit.unitNumber)}
                onMouseLeave={() => setHoveredUnit(null)}
                onFocus={() => setHoveredUnit(unit.unitNumber)}
                onBlur={() => setHoveredUnit(null)}
                onClick={() =>
                  onSelectUnit(selectedUnit === unit.unitNumber ? 'all' : unit.unitNumber)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectUnit(selectedUnit === unit.unitNumber ? 'all' : unit.unitNumber);
                  }
                }}
                style={{
                  opacity: isDimmed ? 0.45 : 1,
                  transform: isHighlighted ? 'scale(1.03)' : 'scale(1)',
                  transformOrigin: '0px 0px',
                  transition: 'opacity 180ms ease, transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="cursor-pointer focus:outline-none"
              >
                <path d={trackD} fill="var(--bg-subtle)" stroke="var(--bg-surface)" strokeWidth={1.5} />
                {fillD && <path d={fillD} fill={color} />}
              </g>
            );
          })}

          {/* Center Numeric Readout */}
          <text
            x={0}
            y={-18}
            textAnchor="middle"
            fill="var(--text-muted)"
            className="font-mono text-[10px] uppercase tracking-wider"
          >
            {focusedUnit ? focusedUnit.unitCode : 'Course Mastery'}
          </text>
          <text
            x={0}
            y={14}
            textAnchor="middle"
            fill="var(--text-primary)"
            className="font-display text-4xl font-semibold tabular-nums"
          >
            {focusedUnit ? `${focusedUnit.percentage}%` : `${overallPercentage}%`}
          </text>
          <text
            x={0}
            y={36}
            textAnchor="middle"
            fill="var(--text-secondary)"
            className="font-mono text-xs tabular-nums"
          >
            {focusedUnit
              ? `${focusedUnit.completed} / ${focusedUnit.total} topics`
              : `${completedTopics} / ${totalTopics} topics`}
          </text>
        </g>
      </svg>

      <p className="text-[11px] text-[var(--text-muted)] text-center mt-2 mb-0">
        Outer arcs track Units 01–05 · Inner ring tracks overall mastery. Click an arc to filter.
      </p>
    </div>
  );
};

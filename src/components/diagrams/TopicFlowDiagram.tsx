import React, { useEffect, useMemo, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { TopicStudyGuide, DiagramNodeSpec } from '../../data/topicStudyGuides';

interface TopicFlowDiagramProps {
  diagram: TopicStudyGuide['diagram'];
  topicId: string;
}

const BOX_W = 186;
const BOX_H = 68;
const PAD_X = 22;
const PAD_Y = 34;
const GAP_X = 80;
const GAP_Y = 56;

function getNodeRect(node: DiagramNodeSpec) {
  const x = PAD_X + node.col * (BOX_W + GAP_X);
  const y = PAD_Y + node.row * (BOX_H + GAP_Y);
  return {
    x,
    y,
    cx: x + BOX_W / 2,
    cy: y + BOX_H / 2,
    col: node.col,
    row: node.row,
  };
}

function clampLabel(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 1).trimEnd() + '…';
}

export const TopicFlowDiagram: React.FC<TopicFlowDiagramProps> = ({ diagram, topicId }) => {
  const [selectedId, setSelectedId] = useState<string>(diagram.nodes[0]?.id || '');
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setSelectedId(diagram.nodes[0]?.id || '');
    setAutoPlay(false);
  }, [topicId, diagram]);

  useEffect(() => {
    if (!autoPlay || diagram.nodes.length <= 1) return;
    const timer = window.setInterval(() => {
      setSelectedId((prev) => {
        const idx = diagram.nodes.findIndex((n) => n.id === prev);
        const nextIdx = (idx + 1) % diagram.nodes.length;
        return diagram.nodes[nextIdx].id;
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [autoPlay, diagram.nodes]);

  const maxRow = useMemo(
    () => Math.max(0, ...diagram.nodes.map((n) => n.row)),
    [diagram.nodes]
  );

  const svgWidth = PAD_X * 2 + 3 * BOX_W + 2 * GAP_X; // 762
  const svgHeight = PAD_Y * 2 + (maxRow + 1) * BOX_H + maxRow * GAP_Y;

  const nodeMap = useMemo(() => {
    const map: Record<string, DiagramNodeSpec> = {};
    for (const n of diagram.nodes) {
      map[n.id] = n;
    }
    return map;
  }, [diagram.nodes]);

  const selectedNode = nodeMap[selectedId] || diagram.nodes[0];

  const computedEdges = useMemo(() => {
    return diagram.edges
      .map((edge, idx) => {
        const fromNode = nodeMap[edge.from];
        const toNode = nodeMap[edge.to];
        if (!fromNode || !toNode) return null;

        const a = getNodeRect(fromNode);
        const b = getNodeRect(toNode);
        const isHighlighted = edge.from === selectedId || edge.to === selectedId;
        const isSkipCol = a.row === b.row && Math.abs(b.col - a.col) > 1;

        let x1 = a.cx;
        let y1 = a.cy;
        let x2 = b.cx;
        let y2 = b.cy;

        if (isSkipCol) {
          x1 = a.cx;
          y1 = a.y;
          x2 = b.cx;
          y2 = b.y - 5;
        } else if (a.row === b.row) {
          if (b.col > a.col) {
            x1 = a.x + BOX_W;
            x2 = b.x - 5;
          } else {
            x1 = a.x;
            x2 = b.x + BOX_W + 5;
          }
        } else {
          if (b.row > a.row) {
            y1 = a.y + BOX_H;
            y2 = b.y - 5;
          } else {
            y1 = a.y;
            y2 = b.y + BOX_H + 5;
          }
        }

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        let pathD = '';
        let labelY = midY;

        if (isSkipCol) {
          const ctrlY = Math.max(8, a.y - 38);
          pathD = `M ${x1} ${y1} Q ${midX} ${ctrlY}, ${x2} ${y2}`;
          labelY = (y1 + ctrlY) / 2 - 2;
        } else if (a.row === b.row || a.col === b.col) {
          pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
          labelY = a.row === b.row ? midY - 14 : midY;
        } else {
          pathD = `M ${x1} ${y1} Q ${x1} ${midY}, ${midX} ${midY} T ${x2} ${y2}`;
        }

        const labelText = clampLabel(edge.label, 12);
        const labelWidth = Math.min(76, Math.max(46, labelText.length * 5.6 + 10));

        return {
          key: `${edge.from}-${edge.to}-${idx}`,
          isHighlighted,
          bidirectional: edge.bidirectional,
          pathD,
          midX,
          labelY,
          labelWidth,
          labelText,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [diagram.edges, nodeMap, selectedId]);

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <div className="min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-primary)] font-semibold">
            Interactive Architecture Diagram · {diagram.layout}
          </div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--text-primary)] m-0">
            {diagram.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              if (diagram.nodes[0]) setSelectedId(diagram.nodes[0].id);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            type="button"
            onClick={() => setAutoPlay((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] hover:bg-[var(--accent-hover)] cursor-pointer"
          >
            {autoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {autoPlay ? 'Pause Flow' : 'Auto-Step Flow'}
          </button>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="p-4 sm:p-5 space-y-4">
        <p className="text-xs sm:text-sm text-[var(--text-muted)] m-0">{diagram.caption}</p>

        <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-2 sm:p-3 overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full min-w-[560px] h-auto block"
            role="img"
            aria-label={diagram.title}
          >
            <defs>
              <marker
                id={`arrow-active-${topicId}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)" />
              </marker>
              <marker
                id={`arrow-idle-${topicId}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--border-strong)" />
              </marker>
            </defs>

            {/* Layer 1: Connector Lines */}
            {computedEdges.map((edge) => (
              <path
                key={`line-${edge.key}`}
                d={edge.pathD}
                fill="none"
                stroke={edge.isHighlighted ? 'var(--accent-primary)' : 'var(--border-strong)'}
                strokeWidth={edge.isHighlighted ? 2.4 : 1.6}
                className={edge.isHighlighted ? 'diagram-flow-line' : undefined}
                markerEnd={`url(#${edge.isHighlighted ? `arrow-active-${topicId}` : `arrow-idle-${topicId}`})`}
                markerStart={
                  edge.bidirectional
                    ? `url(#${edge.isHighlighted ? `arrow-active-${topicId}` : `arrow-idle-${topicId}`})`
                    : undefined
                }
              />
            ))}

            {/* Interactive Nodes */}
            {diagram.nodes.map((node) => {
              const { x, y, cx } = getNodeRect(node);
              const isSelected = node.id === selectedId;

              let fill = 'var(--bg-surface)';
              let stroke = 'var(--border-strong)';
              let titleColor = 'var(--text-primary)';
              let subColor = 'var(--text-muted)';

              if (isSelected) {
                fill = 'var(--accent-primary)';
                stroke = 'var(--accent-primary)';
                titleColor = 'var(--bg-surface)';
                subColor = 'var(--bg-subtle)';
              } else if (node.tone === 'secondary') {
                stroke = 'var(--accent-warm)';
              } else if (node.tone === 'accent') {
                stroke = 'var(--accent-sage)';
              }

              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${node.label}: ${node.sublabel}`}
                  onClick={() => {
                    setAutoPlay(false);
                    setSelectedId(node.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setAutoPlay(false);
                      setSelectedId(node.id);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={x}
                    y={y}
                    width={BOX_W}
                    height={BOX_H}
                    rx={8}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={cx}
                    y={y + 27}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={titleColor}
                  >
                    {clampLabel(node.label, 24)}
                  </text>
                  <text
                    x={cx}
                    y={y + 46}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill={subColor}
                  >
                    {clampLabel(node.sublabel, 27)}
                  </text>
                </g>
              );
            })}

            {/* Layer 3: Edge Label Badges */}
            {computedEdges.map((edge) => (
              <g key={`lbl-${edge.key}`} style={{ pointerEvents: 'none' }}>
                <rect
                  x={edge.midX - edge.labelWidth / 2}
                  y={edge.labelY - 9}
                  width={edge.labelWidth}
                  height={17}
                  rx={4}
                  fill="var(--bg-surface)"
                  stroke={edge.isHighlighted ? 'var(--accent-primary)' : 'var(--border-hairline)'}
                  strokeWidth={1}
                />
                <text
                  x={edge.midX}
                  y={edge.labelY + 3}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight={edge.isHighlighted ? '700' : '600'}
                  fill={edge.isHighlighted ? 'var(--accent-primary)' : 'var(--text-muted)'}
                >
                  {edge.labelText}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Accessible Quick Node Selector Tabs */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Diagram nodes">
          {diagram.nodes.map((node) => {
            const active = node.id === selectedId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  setAutoPlay(false);
                  setSelectedId(node.id);
                }}
                className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                  active
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {node.label}
              </button>
            );
          })}
        </div>

        {/* Selected Node Deep-Dive Inspector */}
        {selectedNode && (
          <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold text-[var(--accent-primary)]">
                {selectedNode.label} · {selectedNode.sublabel}
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed m-0">
                {selectedNode.detail}
              </p>
            </div>
            <div className="shrink-0 px-3 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--accent-warm)] self-start">
              {selectedNode.artifact}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

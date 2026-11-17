import type { FlatTopic, Unit } from '../types/syllabus';

export interface MasteryStats {
  completed: number;
  total: number;
  percentage: number;
}

export function flattenUnits(units: Unit[]): FlatTopic[] {
  const flat: FlatTopic[] = [];
  for (const u of units) {
    for (const t of u.topics) {
      flat.push({
        ...t,
        unitNumber: u.unitNumber,
        unitCode: u.unitCode,
        unitTitle: u.title,
      });
    }
  }
  return flat;
}

export function calculateMasteryStats(topicIds: string[], completedIds: Set<string>): MasteryStats {
  const total = topicIds.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0 };
  let completed = 0;
  for (const id of topicIds) {
    if (completedIds.has(id)) completed++;
  }
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
}

export function filterTopicsByQuery(topics: FlatTopic[], query: string, unitFilter: number | 'all' = 'all'): FlatTopic[] {
  const q = query.trim().toLowerCase();
  return topics.filter((t) => {
    if (unitFilter !== 'all' && t.unitNumber !== unitFilter) return false;
    if (!q) return true;
    const haystack = [
      t.code,
      t.title,
      t.summary,
      t.definition,
      t.unitTitle,
      ...t.keywords,
      ...t.keyTakeaways,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export interface BoxModelDimensions {
  contentWidth: number;
  contentHeight: number;
  renderedBoxWidth: number;
  renderedBoxHeight: number;
  totalOccupiedWidth: number;
  totalOccupiedHeight: number;
}

export function computeCssBoxModel(params: {
  width: number;
  height: number;
  padding: number;
  border: number;
  margin: number;
  boxSizing: 'content-box' | 'border-box';
}): BoxModelDimensions {
  const { width, height, padding, border, margin, boxSizing } = params;
  const safeWidth = Math.max(40, width);
  const safeHeight = Math.max(30, height);
  const pad2 = padding * 2;
  const border2 = border * 2;
  const margin2 = margin * 2;

  if (boxSizing === 'border-box') {
    const contentWidth = Math.max(0, safeWidth - pad2 - border2);
    const contentHeight = Math.max(0, safeHeight - pad2 - border2);
    return {
      contentWidth,
      contentHeight,
      renderedBoxWidth: safeWidth,
      renderedBoxHeight: safeHeight,
      totalOccupiedWidth: safeWidth + margin2,
      totalOccupiedHeight: safeHeight + margin2,
    };
  }

  const renderedBoxWidth = safeWidth + pad2 + border2;
  const renderedBoxHeight = safeHeight + pad2 + border2;
  return {
    contentWidth: safeWidth,
    contentHeight: safeHeight,
    renderedBoxWidth,
    renderedBoxHeight,
    totalOccupiedWidth: renderedBoxWidth + margin2,
    totalOccupiedHeight: renderedBoxHeight + margin2,
  };
}

export interface SpecificityScore {
  inline: number;
  ids: number;
  classes: number;
  elements: number;
  totalWeight: number;
}

export function calculateCssSpecificity(selector: string, isInline = false): SpecificityScore {
  if (isInline) {
    return { inline: 1, ids: 0, classes: 0, elements: 0, totalWeight: 1000 };
  }
  const cleaned = selector.replace(/::[\w-]+/g, ' __PE__ ').trim();
  const idMatches = cleaned.match(/#[\w-]+/g) || [];
  const classMatches = cleaned.match(/\.[\w-]+|\[[^\]]+\]|:(?!not\()[\w-]+/g) || [];
  const pseudoElemMatches = cleaned.match(/__PE__/g) || [];
  const withoutIdsAndClasses = cleaned
    .replace(/#[\w-]+/g, ' ')
    .replace(/\.[\w-]+/g, ' ')
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/:[\w-]+(\([^)]*\))?/g, ' ')
    .replace(/__PE__/g, ' ')
    .replace(/[>+~*]/g, ' ');
  const elementMatches = withoutIdsAndClasses
    .split(/\s+/)
    .map((s) => s.trim())
    .filter((s) => /^[a-zA-Z][a-zA-Z0-9-]*$/.test(s));

  const ids = idMatches.length;
  const classes = classMatches.length;
  const elements = elementMatches.length + pseudoElemMatches.length;

  return {
    inline: 0,
    ids,
    classes,
    elements,
    totalWeight: ids * 100 + classes * 10 + elements,
  };
}

export interface InvertedIndexResult {
  index: Record<string, number[]>;
  scores: { docIndex: number; score: number }[];
}

export function buildInvertedIndexAndSearch(docs: string[], query: string): InvertedIndexResult {
  const index: Record<string, Set<number>> = {};
  const tokenizedDocs = docs.map((d) =>
    d
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 1)
  );

  tokenizedDocs.forEach((words, docIdx) => {
    for (const w of words) {
      if (!index[w]) index[w] = new Set();
      index[w].add(docIdx);
    }
  });

  const plainIndex: Record<string, number[]> = {};
  for (const [term, docSet] of Object.entries(index)) {
    plainIndex[term] = Array.from(docSet).sort((a, b) => a - b);
  }

  const queryTerms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 1);

  const scores = docs.map((_, docIdx) => {
    const docWords = tokenizedDocs[docIdx];
    if (docWords.length === 0 || queryTerms.length === 0) {
      return { docIndex: docIdx, score: 0 };
    }
    let totalTfIdf = 0;
    for (const term of queryTerms) {
      const tf = docWords.filter((w) => w === term).length / docWords.length;
      const df = (plainIndex[term] || []).length;
      const idf = df > 0 ? Math.log(1 + docs.length / df) : 0;
      totalTfIdf += tf * idf;
    }
    return { docIndex: docIdx, score: Number(totalTfIdf.toFixed(4)) };
  });

  return {
    index: plainIndex,
    scores: scores.sort((a, b) => b.score - a.score),
  };
}

export function estimateTransferTimeMs(fileSizeMB: number, bandwidthMbps: number, rttMs: number): number {
  const safeBw = Math.max(0.1, bandwidthMbps);
  const bits = fileSizeMB * 8 * 1000 * 1000;
  const bps = safeBw * 1000 * 1000;
  const transferMs = (bits / bps) * 1000;
  return Math.round(rttMs + transferMs);
}

export interface TextSegment {
  type: 'text' | 'code';
  value: string;
}

export function parseInlineCodeSegments(input: string): TextSegment[] {
  const normalized = input.replace(/\s->\s/g, ' \u2192 ');
  const parts = normalized.split(/(`[^`]+`)/g);
  const segments: TextSegment[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      segments.push({ type: 'code', value: part.slice(1, -1) });
    } else {
      segments.push({ type: 'text', value: part });
    }
  }
  return segments;
}

export function formatTimerMMSS(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export type AssistantMarkdownBlock =
  | { type: 'code'; language: string; code: string }
  | { type: 'heading'; text: string }
  | { type: 'list-item'; text: string }
  | { type: 'paragraph'; text: string };

export function parseAssistantMarkdownBlocks(markdown: string): AssistantMarkdownBlock[] {
  const blocks: AssistantMarkdownBlock[] = [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim().toLowerCase() || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      blocks.push({ type: 'code', language, code: codeLines.join('\n') });
      continue;
    }

    if (/^#{1,4}\s+/.test(trimmed)) {
      blocks.push({ type: 'heading', text: trimmed.replace(/^#{1,4}\s+/, '') });
      i++;
      continue;
    }

    if (/^([-*]|\d+\.)\s+/.test(trimmed)) {
      blocks.push({ type: 'list-item', text: trimmed.replace(/^([-*]|\d+\.)\s+/, '') });
      i++;
      continue;
    }

    const paraLines: string[] = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !/^#{1,4}\s+/.test(lines[i].trim()) &&
      !/^([-*]|\d+\.)\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
  }

  return blocks;
}

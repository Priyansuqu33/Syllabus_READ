export type SimulationId =
  | 'http-lifecycle'
  | 'email-protocols'
  | 'dns-resolver'
  | 'css-box-model'
  | 'html-sandbox'
  | 'xml-parser'
  | 'soa-soap'
  | 'ajax-xhr'
  | 'semantic-search'
  | 'nextgen-5g-iot';

export interface CodeExampleTier {
  title: string;
  language: 'html' | 'xml' | 'javascript' | 'css' | 'text';
  runnableInSandbox: boolean;
  code: string;
  expectedOutput: string;
  explanation: string;
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface FlowStep {
  step: number;
  title: string;
  detail: string;
  artifact?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface ExamQA {
  marks: '2M' | '4M' | '7M';
  question: string;
  answer: string;
}

export interface MistakeItem {
  mistake: string;
  fix: string;
}

export interface Topic {
  id: string;
  code: string;
  title: string;
  bloom: string;
  readMinutes: number;
  keywords: string[];
  summary: string;
  definition: string;
  purpose: string;
  whyNeeded: string;
  detailedTheory: string[];
  mechanismSteps: FlowStep[];
  keyTakeaways: string[];
  realWorldExamples: string[];
  comparisonTable?: ComparisonTable;
  simulationId: SimulationId;
  simulationCaption: string;
  examples: {
    basic: CodeExampleTier;
    intermediate: CodeExampleTier;
    advanced: CodeExampleTier;
  };
  mistakes: MistakeItem[];
  bestPractices: string[];
  quiz: QuizQuestion[];
  flashcards: FlashcardItem[];
  assignment: {
    task: string;
    hint: string;
    solution: string;
  };
  examQAs: ExamQA[];
}

export interface Unit {
  unitNumber: number;
  unitCode: string;
  title: string;
  hours: number;
  officialSyllabus: string;
  topics: Topic[];
}

export interface FlatTopic extends Topic {
  unitNumber: number;
  unitCode: string;
  unitTitle: string;
}

export interface HtmlAttributeDoc {
  name: string;
  type: string;
  description: string;
}

export interface HtmlTagEntry {
  tag: string;
  category:
    | 'Document Structure'
    | 'Document Metadata'
    | 'Text & Headings'
    | 'Links & Media'
    | 'Containers & Layout'
    | 'Forms & Controls'
    | 'Tables & Lists'
    | 'Semantic Layout'
    | 'Graphics & Interactive';
  syntax: string;
  description: string;
  attributes: HtmlAttributeDoc[];
  basicExample: string;
  advancedExample: string;
  useCases: string[];
  browserBehavior: string;
  accessibilityNotes: string;
}

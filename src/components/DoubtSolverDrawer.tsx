import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Play,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { FlatTopic } from '../types/syllabus';
import {
  parseAssistantMarkdownBlocks,
  parseInlineCodeSegments,
} from '../utils/syllabusHelpers';

export type SolverMode = 'explain' | 'exam' | 'code';

export interface DoubtMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  mode?: SolverMode;
}

interface DoubtSolverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTopic?: FlatTopic;
  initialPrompt?: string | null;
  onConsumeInitialPrompt?: () => void;
  onOpenInSandbox: (code: string, label: string) => void;
}

const InlineRichText: React.FC<{ text: string }> = ({ text }) => {
  const segments = parseInlineCodeSegments(text);
  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.type === 'code') {
          return (
            <code
              key={idx}
              className="px-1 py-0.5 mx-0.5 rounded bg-[var(--bg-subtle)] font-mono text-[0.88em] text-[var(--accent-primary)] border border-[var(--border-hairline)]"
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

export const DoubtSolverDrawer: React.FC<DoubtSolverDrawerProps> = ({
  isOpen,
  onClose,
  activeTopic,
  initialPrompt,
  onConsumeInitialPrompt,
  onOpenInSandbox,
}) => {
  const [mode, setMode] = useState<SolverMode>('explain');
  const [useTopicContext, setUseTopicContext] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<DoubtMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const submitQuestion = async (questionText: string, chosenMode: SolverMode = mode) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    setErrorMsg(null);
    const userMsg: DoubtMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      mode: chosenMode,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          mode: chosenMode,
          topicCode: useTopicContext && activeTopic ? activeTopic.code : undefined,
          topicTitle: useTopicContext && activeTopic ? activeTopic.title : undefined,
          topicSummary: useTopicContext && activeTopic ? activeTopic.summary : undefined,
          history: historyPayload,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        answer?: string;
        error?: string;
      };

      if (!res.ok || !data.answer) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      const aiMsg: DoubtMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        text: data.answer,
        mode: chosenMode,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to reach the Doubt Solver assistant. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim()) {
      const promptToRun = initialPrompt;
      onConsumeInitialPrompt?.();
      void submitQuestion(promptToRun, mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  const copySnippet = (id: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  const quickPrompts = activeTopic
    ? [
        `Explain "${activeTopic.title}" in simple terms with an everyday analogy.`,
        `Write a 7-mark university exam answer for Topic ${activeTopic.code}: ${activeTopic.title}.`,
        `Show a clean code example or protocol trace for ${activeTopic.title}.`,
        `What is the most common mistake students make in ${activeTopic.title}?`,
      ]
    : [
        'Explain DNS recursive vs iterative resolution step by step.',
        'Compare DOM and SAX XML parsers for a 7-mark university answer.',
        'Show a minimal AJAX fetch example updating the DOM.',
      ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="CS35302 Gemini Doubt Solver Assistant"
        className="relative z-10 w-full max-w-lg h-full bg-[var(--bg-surface)] border-l border-[var(--border-hairline)] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <header className="px-4 sm:px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              <Sparkles className="w-3.5 h-3.5" />
              CS35302 Doubt Solver
            </div>
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] m-0 truncate">
              Ask Your Study Assistant
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setErrorMsg(null);
                }}
                aria-label="Clear doubt solver conversation"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Doubt Solver"
              className="p-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mode Selector & Active Topic Context */}
        <div className="px-4 sm:px-5 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-2.5">
          <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Answer format mode">
            {(
              [
                { id: 'explain', label: 'Intuition' },
                { id: 'exam', label: 'Exam Answer' },
                { id: 'code', label: 'Code & Debug' },
              ] as const
            ).map((tab) => {
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`py-1.5 px-2 text-xs font-medium rounded border transition-colors cursor-pointer ${
                    active
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-surface)] font-semibold'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTopic && (
            <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useTopicContext}
                onChange={(e) => setUseTopicContext(e.target.checked)}
                className="accent-[var(--accent-primary)] rounded"
              />
              <span className="truncate">
                Context: <strong className="text-[var(--text-primary)]">{activeTopic.code} {activeTopic.title}</strong>
              </span>
            </label>
          )}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-1.5">
                <div className="text-xs font-semibold text-[var(--text-primary)]">
                  Stuck on a concept, XML rule, or 7-mark answer?
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed m-0">
                  Ask any doubt in plain English, paste broken HTML/CSS/JS/XML, or pick a quick starter below.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Suggested Doubts
                </div>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => void submitQuestion(prompt, mode)}
                      className="w-full text-left px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              if (msg.role === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[88%] px-3.5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-surface)] text-xs sm:text-sm leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              const blocks = parseAssistantMarkdownBlocks(msg.text);
              return (
                <div
                  key={msg.id}
                  className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {blocks.map((block, bIdx) => {
                    if (block.type === 'code') {
                      const codeId = `${msg.id}-c-${bIdx}`;
                      const isHtml =
                        block.language === 'html' ||
                        block.code.includes('<') && block.code.includes('>');
                      return (
                        <div
                          key={bIdx}
                          className="rounded-md border border-[var(--border-strong)] overflow-hidden bg-[#0F172A]"
                        >
                          <div className="flex items-center justify-between px-3 py-1.5 bg-[#1E293B] text-[11px] font-mono text-[#94A3B8]">
                            <span>{block.language}</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => copySnippet(codeId, block.code)}
                                className="inline-flex items-center gap-1 text-[#E2E8F0] hover:text-white cursor-pointer bg-transparent border-0 p-0"
                              >
                                {copiedId === codeId ? (
                                  <Check className="w-3 h-3 text-[#4ADE80]" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                {copiedId === codeId ? 'Copied' : 'Copy'}
                              </button>
                              {isHtml && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onOpenInSandbox(
                                      block.code,
                                      activeTopic ? `${activeTopic.code} Doubt Snippet` : 'Doubt Solver Snippet'
                                    );
                                    onClose();
                                  }}
                                  className="inline-flex items-center gap-1 text-[#5EEAD4] hover:underline cursor-pointer bg-transparent border-0 p-0 font-semibold"
                                >
                                  <Play className="w-3 h-3" />
                                  Try in Sandbox
                                </button>
                              )}
                            </div>
                          </div>
                          <pre className="p-3 text-xs font-mono text-[#E2E8F0] overflow-x-auto m-0 leading-relaxed">
                            {block.code}
                          </pre>
                        </div>
                      );
                    }

                    if (block.type === 'heading') {
                      return (
                        <h4
                          key={bIdx}
                          className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)] m-0 pt-1"
                        >
                          <InlineRichText text={block.text} />
                        </h4>
                      );
                    }

                    if (block.type === 'list-item') {
                      return (
                        <div key={bIdx} className="flex items-start gap-2 pl-1">
                          <span className="text-[var(--accent-primary)] font-bold">•</span>
                          <span className="flex-1">
                            <InlineRichText text={block.text} />
                          </span>
                        </div>
                      );
                    }

                    return (
                      <p key={bIdx} className="m-0">
                        <InlineRichText text={block.text} />
                      </p>
                    );
                  })}
                </div>
              );
            })
          )}

          {isLoading && (
            <div className="p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
              <Loader2 className="w-4 h-4 text-[var(--accent-primary)] animate-spin shrink-0" />
              <span>Working out a clear explanation...</span>
            </div>
          )}

          {errorMsg && (
            <div
              role="alert"
              className="p-3.5 rounded-lg border border-[var(--accent-crimson)] bg-[var(--bg-canvas)] text-xs text-[var(--accent-crimson)] flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={listEndRef} />
        </div>

        {/* Input Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitQuestion(input, mode);
          }}
          className="p-3.5 sm:p-4 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              aria-label="Ask your Web Technology doubt"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void submitQuestion(input, mode);
                }
              }}
              placeholder="Ask any doubt (e.g., Why does CSS specificity pick #id over .class?)"
              className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send doubt"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-surface)] text-xs font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-45 cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </div>
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Enter to send · Shift+Enter for new line</span>
            <span>CS35302 Tutor</span>
          </div>
        </form>
      </aside>
    </div>
  );
};

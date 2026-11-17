import React, { useEffect, useMemo, useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal } from 'lucide-react';

export interface PlaygroundPreset {
  id: string;
  label: string;
  code: string;
}

export const DEFAULT_PLAYGROUND_PRESETS: PlaygroundPreset[] = [
  {
    id: 'html-card',
    label: 'HTML5 Semantic Card & JS',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: system-ui, sans-serif; background: #F6F8F7; color: #0F1C18; padding: 20px; margin: 0; }
    .card { background: #FFFFFF; border: 1px solid #DCE3E0; border-radius: 8px; padding: 18px; max-width: 460px; }
    button { background: #0F766E; color: #FFFFFF; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; }
    button:hover { background: #0B5C56; }
    .badge { font-family: monospace; color: #1D4ED8; font-size: 13px; }
  </style>
</head>
<body>
  <article class="card">
    <span class="badge">CS35302 · Live Sandbox</span>
    <h2 style="margin: 8px 0;">Interactive Try-It Window</h2>
    <p>Edit the HTML, CSS, or JavaScript on the left and click <strong>Run Code</strong>.</p>
    <button id="btn" type="button">Test DOM Event</button>
    <p id="out" style="color: #15803D; font-weight: 600; margin-top: 10px;"></p>
  </article>
  <script>
    let clicks = 0;
    document.getElementById('btn').addEventListener('click', () => {
      clicks++;
      const msg = 'DOM updated cleanly (' + clicks + ' clicks)';
      document.getElementById('out').textContent = msg;
      console.log(msg);
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'css-grid',
    label: 'CSS Grid & Flexbox Dashboard',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; background: #F6F8F7; color: #0F1C18; padding: 16px; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
    .tile { background: #FFFFFF; border: 1px solid #DCE3E0; padding: 14px; border-radius: 6px; }
    .num { font-size: 24px; font-weight: 700; color: #0F766E; }
  </style>
</head>
<body>
  <h3 style="margin-top:0;">Responsive CSS Grid</h3>
  <div class="grid">
    <div class="tile"><div class="num">80</div><div>HTTP Port</div></div>
    <div class="tile"><div class="num">443</div><div>HTTPS Port</div></div>
    <div class="tile"><div class="num">53</div><div>DNS Port</div></div>
    <div class="tile"><div class="num">587</div><div>SMTP Port</div></div>
  </div>
</body>
</html>`,
  },
  {
    id: 'xml-dom',
    label: 'XML DOMParser & Table Render',
    code: `<div style="font-family: system-ui; padding: 16px; color: #0F1C18;">
  <h3 style="margin-top:0;">XML DOMParser Demo</h3>
  <table border="1" cellpadding="8" style="border-collapse:collapse; border-color:#DCE3E0; width:100%;">
    <thead><tr style="background:#EDF2F0;"><th>Course</th><th>Credits</th></tr></thead>
    <tbody id="rows"></tbody>
  </table>
</div>
<script>
  const xml = '<syllabus><unit name="Protocols" credits="4"/><unit name="XML & DOM" credits="4"/><unit name="Web Services" credits="4"/></syllabus>';
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  const tbody = document.getElementById('rows');
  doc.querySelectorAll('unit').forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + u.getAttribute('name') + '</td><td>' + u.getAttribute('credits') + '</td>';
    tbody.appendChild(tr);
    console.log('Parsed XML node:', u.getAttribute('name'));
  });
</script>`,
  },
  {
    id: 'canvas-chart',
    label: 'HTML5 Canvas Bar Visualization',
    code: `<div style="font-family: system-ui; padding: 16px; color: #0F1C18;">
  <h3 style="margin-top:0;">Canvas 2D Latency Chart</h3>
  <canvas id="chart" width="360" height="170" style="background:#FFFFFF; border:1px solid #DCE3E0; border-radius:6px;"></canvas>
</div>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
  const data = [
    { label: '4G LTE', val: 140, color: '#B91C1C' },
    { label: 'Wi-Fi 6', val: 45, color: '#1D4ED8' },
    { label: '5G URLLC', val: 12, color: '#0F766E' }
  ];
  data.forEach((d, i) => {
    const y = 24 + i * 48;
    ctx.fillStyle = '#0F1C18';
    ctx.font = '12px sans-serif';
    ctx.fillText(d.label, 12, y + 18);
    ctx.fillStyle = d.color;
    ctx.fillRect(95, y, d.val * 1.4, 26);
    ctx.fillStyle = '#334740';
    ctx.fillText(d.val + ' ms', 105 + d.val * 1.4, y + 18);
  });
  console.log('Canvas chart rendered');
</script>`,
  },
];

interface CodePlaygroundProps {
  initialCode?: string;
  title?: string;
  compact?: boolean;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  title = 'Interactive Try-It Code Sandbox',
  compact = false,
}) => {
  const defaultCode = initialCode || DEFAULT_PLAYGROUND_PRESETS[0].code;
  const [sourceCode, setSourceCode] = useState<string>(defaultCode);
  const [executedCode, setExecutedCode] = useState<string>(defaultCode);
  const [logs, setLogs] = useState<{ type: string; text: string }[]>([]);
  const [copied, setCopied] = useState(false);
  const [runCounter, setRunCounter] = useState(0);

  useEffect(() => {
    if (initialCode) {
      setSourceCode(initialCode);
      setExecutedCode(initialCode);
      setLogs([]);
      setRunCounter((c) => c + 1);
    }
  }, [initialCode]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.__sandboxLog) {
        setLogs((prev) => [
          ...prev.slice(-19),
          { type: event.data.level || 'log', text: String(event.data.message) },
        ]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const wrappedSrcDoc = useMemo(() => {
    const consoleBridge = `<script>
      (function() {
        const send = (level, args) => {
          try {
            parent.postMessage({
              __sandboxLog: true,
              level,
              message: Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
            }, '*');
          } catch (e) {}
        };
        const origLog = console.log;
        console.log = function() { send('log', arguments); origLog.apply(console, arguments); };
        const origWarn = console.warn;
        console.warn = function() { send('warn', arguments); origWarn.apply(console, arguments); };
        const origErr = console.error;
        console.error = function() { send('error', arguments); origErr.apply(console, arguments); };
        window.onerror = function(msg, url, line) {
          send('error', ['Runtime Error (line ' + line + '): ' + msg]);
        };
      })();
    </script>`;

    if (/<head[^>]*>/i.test(executedCode)) {
      return executedCode.replace(/<head([^>]*)>/i, `<head$1>${consoleBridge}`);
    }
    return `<!DOCTYPE html><html><head><meta charset="UTF-8">${consoleBridge}</head><body style="margin:0;background:#F6F8F7;color:#0F1C18;">${executedCode}</body></html>`;
  }, [executedCode]);

  const handleRun = () => {
    setLogs([]);
    setExecutedCode(sourceCode);
    setRunCounter((c) => c + 1);
  };

  const handleReset = () => {
    setLogs([]);
    setSourceCode(defaultCode);
    setExecutedCode(defaultCode);
    setRunCounter((c) => c + 1);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = DEFAULT_PLAYGROUND_PRESETS.find((p) => p.id === e.target.value);
    if (found) {
      setLogs([]);
      setSourceCode(found.code);
      setExecutedCode(found.code);
      setRunCounter((c) => c + 1);
    }
  };

  return (
    <section
      aria-label="Live HTML CSS JS Code Sandbox"
      className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-base font-semibold text-[var(--text-primary)] m-0">
            {title}
          </h3>
          {!initialCode && (
            <select
              aria-label="Load sandbox template"
              onChange={handlePresetChange}
              defaultValue={DEFAULT_PLAYGROUND_PRESETS[0].id}
              className="text-xs px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none"
            >
              {DEFAULT_PLAYGROUND_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-sage)]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] hover:bg-[var(--accent-hover)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Run Code
          </button>
        </div>
      </div>

      {/* Split Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
        {/* Source Editor */}
        <div className="flex flex-col">
          <div className="px-3.5 py-2 text-xs font-medium text-[var(--text-muted)] border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center justify-between">
            <span>HTML / CSS / JS Source</span>
            <span className="font-mono tabular-nums">{sourceCode.split('\n').length} lines</span>
          </div>
          <textarea
            aria-label="Sandbox code editor"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            spellCheck={false}
            className={`w-full font-mono text-xs leading-relaxed p-4 bg-[#0F172A] text-[#E2E8F0] focus:outline-none resize-y ${
              compact ? 'min-h-[260px]' : 'min-h-[340px]'
            }`}
          />
        </div>

        {/* Live Output & Console */}
        <div className="flex flex-col bg-[#F6F8F7]">
          <div className="px-3.5 py-2 text-xs font-medium text-[var(--text-muted)] border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center justify-between">
            <span>Live Browser Output</span>
            <span className="font-mono">Sandboxed Frame</span>
          </div>
          <iframe
            key={runCounter}
            title="Live Code Output Preview"
            sandbox="allow-scripts"
            srcDoc={wrappedSrcDoc}
            className={`w-full border-0 bg-[#F6F8F7] ${compact ? 'min-h-[200px]' : 'min-h-[265px]'} flex-1`}
          />

          {/* Console Log Strip */}
          <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-2">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--text-secondary)] mb-1">
              <span className="inline-flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Console Output
              </span>
              {logs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLogs([])}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="font-mono text-xs max-h-20 overflow-y-auto space-y-0.5 text-[var(--text-primary)]">
              {logs.length === 0 ? (
                <p className="text-[var(--text-muted)] m-0">No console messages yet. Use console.log() to inspect values.</p>
              ) : (
                logs.map((entry, idx) => (
                  <div
                    key={idx}
                    className={
                      entry.type === 'error'
                        ? 'text-[var(--accent-crimson)]'
                        : entry.type === 'warn'
                        ? 'text-[var(--accent-warm)]'
                        : 'text-[var(--text-primary)]'
                    }
                  >
                    &rsaquo; {entry.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

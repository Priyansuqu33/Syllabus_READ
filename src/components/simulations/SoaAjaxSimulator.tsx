import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface SoaAjaxSimulatorProps {
  defaultTab?: 'soa' | 'ajax';
}

const SOA_STEPS = [
  {
    step: 1,
    op: 'PUBLISH (Provider -> Registry)',
    detail: 'PaymentService publishes PaymentGateway.wsdl & White/Yellow/Green pages to the UDDI Registry.',
  },
  {
    step: 2,
    op: 'FIND (Consumer -> Registry)',
    detail: 'UniversityPortal queries UDDI for "Payment Gateway" and retrieves the WSDL endpoint URL.',
  },
  {
    step: 3,
    op: 'BIND (Consumer -> Provider)',
    detail: 'UniversityPortal generates a client stub from WSDL and sends a SOAP XML Envelope via HTTP POST.',
  },
];

const XHR_STATES = [
  { code: 0, name: 'UNSENT', desc: 'new XMLHttpRequest() instantiated; open() not yet called.' },
  { code: 1, name: 'OPENED', desc: 'xhr.open("GET", "/api/grades", true) configured.' },
  { code: 2, name: 'HEADERS_RECEIVED', desc: 'Server received request and returned HTTP 200 headers.' },
  { code: 3, name: 'LOADING', desc: 'Downloading minimal 2.4 KB JSON delta chunk.' },
  { code: 4, name: 'DONE', desc: 'readyState === 4 && status === 200 -> Partial DOM patched!' },
];

export const SoaAjaxSimulator: React.FC<SoaAjaxSimulatorProps> = ({ defaultTab = 'soa' }) => {
  const [tab, setTab] = useState<'soa' | 'ajax'>(defaultTab);
  const [soaStep, setSoaStep] = useState<number>(0);
  const [soapMode, setSoapMode] = useState<'request' | 'fault'>('request');

  const [xhrState, setXhrState] = useState<number>(0);
  const [rollQuery, setRollQuery] = useState<string>('CS21045');

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab('soa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
              tab === 'soa'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            SOA Triangle &amp; SOAP Envelope
          </button>
          <button
            type="button"
            onClick={() => setTab('ajax')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
              tab === 'ajax'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            AJAX XHR Lifecycle &amp; Bandwidth
          </button>
        </div>
        <span className="text-xs text-[var(--text-muted)]">Unit 3 Interactive Lab</span>
      </div>

      {tab === 'soa' ? (
        <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                Service-Oriented Architecture Triangle
              </span>
              <button
                type="button"
                onClick={() => setSoaStep((s) => (s + 1) % SOA_STEPS.length)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                <Play className="w-3 h-3" />
                Step ({soaStep + 1}/3)
              </button>
            </div>

            <svg
              viewBox="0 0 360 190"
              className="w-full h-auto rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
              role="img"
              aria-label="SOA Publish Find Bind Triangle"
            >
              {/* Registry Top */}
              <rect x="115" y="14" width="130" height="40" rx="6" fill="var(--accent-primary)" />
              <text x="180" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg-surface)">
                UDDI Registry
              </text>

              {/* Consumer Bottom Left */}
              <rect x="18" y="132" width="120" height="40" rx="6" fill="var(--accent-warm)" />
              <text x="78" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg-surface)">
                Service Consumer
              </text>

              {/* Provider Bottom Right */}
              <rect x="222" y="132" width="120" height="40" rx="6" fill="var(--accent-sage)" />
              <text x="282" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg-surface)">
                Service Provider
              </text>

              {/* Edges */}
              <line
                x1="282"
                y1="132"
                x2="220"
                y2="56"
                stroke={soaStep === 0 ? 'var(--accent-primary)' : 'var(--border-strong)'}
                strokeWidth={soaStep === 0 ? 3 : 1.5}
              />
              <text x="268" y="92" fontSize="10" fontWeight="700" fill={soaStep === 0 ? 'var(--accent-primary)' : 'var(--text-muted)'}>
                1. Publish
              </text>

              <line
                x1="78"
                y1="132"
                x2="140"
                y2="56"
                stroke={soaStep === 1 ? 'var(--accent-warm)' : 'var(--border-strong)'}
                strokeWidth={soaStep === 1 ? 3 : 1.5}
              />
              <text x="58" y="92" fontSize="10" fontWeight="700" fill={soaStep === 1 ? 'var(--accent-warm)' : 'var(--text-muted)'}>
                2. Find
              </text>

              <line
                x1="138"
                y1="152"
                x2="222"
                y2="152"
                stroke={soaStep === 2 ? 'var(--accent-sage)' : 'var(--border-strong)'}
                strokeWidth={soaStep === 2 ? 3 : 1.5}
              />
              <text x="180" y="144" textAnchor="middle" fontSize="10" fontWeight="700" fill={soaStep === 2 ? 'var(--accent-sage)' : 'var(--text-muted)'}>
                3. Bind (SOAP)
              </text>
            </svg>

            <div className="p-3 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs">
              <strong className="text-[var(--text-primary)]">{SOA_STEPS[soaStep].op}: </strong>
              <span className="text-[var(--text-secondary)]">{SOA_STEPS[soaStep].detail}</span>
            </div>
          </div>

          {/* SOAP Envelope / Fault Inspector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                SOAP Message Inspector
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setSoapMode('request')}
                  className={`px-2.5 py-1 text-xs rounded cursor-pointer ${
                    soapMode === 'request'
                      ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  Valid Request
                </button>
                <button
                  type="button"
                  onClick={() => setSoapMode('fault')}
                  className={`px-2.5 py-1 text-xs rounded cursor-pointer ${
                    soapMode === 'fault'
                      ? 'bg-[var(--accent-crimson)] text-white'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  SOAP Fault
                </button>
              </div>
            </div>
            <pre className="p-3.5 rounded bg-[#0F172A] text-[#E2E8F0] font-mono text-xs overflow-x-auto m-0 leading-relaxed">
              {soapMode === 'request'
                ? `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <auth:Token>QU-SESSION-991</auth:Token>
  </soap:Header>
  <soap:Body>
    <GetStudentRecord>
      <Roll>${rollQuery}</Roll>
    </GetStudentRecord>
  </soap:Body>
</soap:Envelope>`
                : `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>Missing Roll Number</faultstring>
      <detail><err>ERR_400</err></detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`}
            </pre>
          </div>
        </div>
      ) : (
        <div className="p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="ajax-roll" className="text-xs font-semibold text-[var(--text-primary)]">
                Query Roll:
              </label>
              <input
                id="ajax-roll"
                type="text"
                value={rollQuery}
                onChange={(e) => setRollQuery(e.target.value)}
                className="px-2.5 py-1 text-xs font-mono rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setXhrState(0)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded border border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setXhrState((s) => (s + 1) % XHR_STATES.length)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Advance readyState ({xhrState}/4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {XHR_STATES.map((st) => (
              <button
                key={st.code}
                type="button"
                onClick={() => setXhrState(st.code)}
                className={`p-2.5 rounded border text-left cursor-pointer ${
                  st.code === xhrState
                    ? 'border-[var(--accent-primary)] bg-[var(--bg-subtle)]'
                    : st.code < xhrState
                    ? 'border-[var(--accent-sage)] bg-[var(--bg-surface)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] opacity-75'
                }`}
              >
                <div className="font-mono text-xs font-bold text-[var(--accent-warm)] tabular-nums">
                  State {st.code}
                </div>
                <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">
                  {st.name}
                </div>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-sm">
            <strong className="font-mono text-[var(--text-primary)]">
              readyState === {XHR_STATES[xhrState].code} ({XHR_STATES[xhrState].name}):
            </strong>{' '}
            <span className="text-[var(--text-secondary)]">{XHR_STATES[xhrState].desc}</span>
          </div>

          {/* SVG Bandwidth Chart */}
          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
            <div className="text-xs font-semibold text-[var(--text-primary)] mb-2">
              Wire Payload &amp; Latency Comparison per Interaction
            </div>
            <svg viewBox="0 0 420 68" className="w-full h-auto" role="img" aria-label="Full Page Reload vs AJAX Payload Chart">
              <text x="0" y="19" fontSize="11" fill="var(--text-secondary)">Full Page Reload (HTML+CSS+JS)</text>
              <rect x="195" y="8" width="180" height="14" rx="3" fill="var(--accent-crimson)" />
              <text x="382" y="19" fontSize="10" fontWeight="700" fill="var(--text-primary)">180 KB</text>

              <text x="0" y="49" fontSize="11" fill="var(--text-secondary)">AJAX Partial JSON Delta</text>
              <rect x="195" y="38" width="14" height="14" rx="3" fill="var(--accent-primary)" />
              <text x="216" y="49" fontSize="10" fontWeight="700" fill="var(--accent-sage)">2.4 KB (98.6% saved)</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

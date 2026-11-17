import React, { useState } from 'react';
import { ChevronRight, RotateCcw, Play } from 'lucide-react';

interface HttpDnsSimulatorProps {
  defaultTab?: 'http' | 'dns';
}

const HTTP_PIPELINE_STEPS = [
  {
    id: 1,
    stage: 'URL Parse',
    layer: 'Browser UI',
    detail: 'Splits https://quantumuniversity.edu.in/syllabus into scheme (HTTPS), host, and resource path.',
    packet: 'GET /syllabus HTTP/1.1',
  },
  {
    id: 2,
    stage: 'DNS Lookup',
    layer: 'UDP Port 53',
    detail: 'Resolves hostname to origin or edge server IP address via cache or DNS hierarchy.',
    packet: 'A Record -> 104.21.45.12',
  },
  {
    id: 3,
    stage: 'TCP 3-Way Handshake',
    layer: 'Transport (Port 443)',
    detail: 'Client and server synchronize sequence numbers: SYN -> SYN-ACK -> ACK.',
    packet: 'SYN / SYN-ACK / ACK',
  },
  {
    id: 4,
    stage: 'TLS 1.3 Handshake',
    layer: 'Security Layer',
    detail: 'Verifies X.509 server certificate and derives shared ephemeral encryption keys.',
    packet: 'TLS 1.3 Encrypted Channel',
  },
  {
    id: 5,
    stage: 'HTTP Exchange',
    layer: 'Application Layer',
    detail: 'Browser sends GET headers; Web Server processes route and streams HTML with status code.',
    packet: '200 OK · text/html; charset=UTF-8',
  },
  {
    id: 6,
    stage: 'DOM, CSSOM & Paint',
    layer: 'Blink / Gecko Engine',
    detail: 'Parses HTML into DOM, CSS into CSSOM, builds Render Tree, computes Layout, and paints pixels.',
    packet: 'First Contentful Paint (FCP)',
  },
];

const DNS_DOMAINS: Record<
  string,
  { tld: string; tldIp: string; authNs: string; finalIp: string; ttl: number }
> = {
  'quantumuniversity.edu.in': {
    tld: '.in Registry NS',
    tldIp: '199.19.53.1',
    authNs: 'ns1.quantumuniversity.edu.in',
    finalIp: '104.21.45.12',
    ttl: 300,
  },
  'developer.mozilla.org': {
    tld: '.org Public Registry',
    tldIp: '199.19.56.1',
    authNs: 'ns-102.awsdns.org',
    finalIp: '34.160.144.191',
    ttl: 600,
  },
  'api.github.com': {
    tld: '.com Verisign TLD',
    tldIp: '192.5.6.30',
    authNs: 'dns1.p08.nsone.net',
    finalIp: '140.82.121.6',
    ttl: 60,
  },
};

export const HttpDnsSimulator: React.FC<HttpDnsSimulatorProps> = ({ defaultTab = 'http' }) => {
  const [activeTab, setActiveTab] = useState<'http' | 'dns'>(defaultTab);
  const [httpStep, setHttpStep] = useState<number>(0);
  const [selectedEndpoint, setSelectedEndpoint] = useState<'ok' | 'created' | 'notfound'>('ok');

  const [domain, setDomain] = useState<string>('quantumuniversity.edu.in');
  const [dnsMode, setDnsMode] = useState<'recursive' | 'iterative'>('iterative');
  const [dnsStep, setDnsStep] = useState<number>(0);

  const endpointPayloads = {
    ok: {
      method: 'GET',
      path: '/api/unit/1',
      status: '200 OK',
      body: '{ "unit": 1, "title": "Core Protocols", "ports": [80, 443, 53] }',
    },
    created: {
      method: 'POST',
      path: '/api/bookmark',
      status: '201 Created',
      body: '{ "saved": true, "topicId": "u1-t3" }',
    },
    notfound: {
      method: 'GET',
      path: '/unknown-page',
      status: '404 Not Found',
      body: '{ "error": "Resource does not exist on origin server" }',
    },
  }[selectedEndpoint];

  const dnsInfo = DNS_DOMAINS[domain];
  const dnsHops =
    dnsMode === 'iterative'
      ? [
          { node: 'Browser & OS', action: `Checks local DNS cache for ${domain}. Cache Miss.` },
          { node: 'ISP Resolver', action: 'Receives recursive query from client; begins iterative lookups.' },
          { node: 'Root Server (.)', action: `Replies with referral to ${dnsInfo.tld} (${dnsInfo.tldIp}).` },
          { node: dnsInfo.tld, action: `Replies with referral to Authoritative NS (${dnsInfo.authNs}).` },
          { node: dnsInfo.authNs, action: `Returns final A Record: ${dnsInfo.finalIp} (TTL: ${dnsInfo.ttl}s).` },
        ]
      : [
          { node: 'Browser & OS', action: `Sends single recursive query for ${domain} to ISP Resolver.` },
          { node: 'ISP Resolver', action: 'Forwards recursive chain to Root Server and waits.' },
          { node: 'Root Server (.)', action: `Queries ${dnsInfo.tld} upstream on resolver’s behalf.` },
          { node: dnsInfo.tld, action: `Queries ${dnsInfo.authNs} upstream and returns IP.` },
          { node: 'Client Cached', action: `Receives ${dnsInfo.finalIp} and caches for TTL ${dnsInfo.ttl}s.` },
        ];

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('http')}
            className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap cursor-pointer ${
              activeTab === 'http'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            HTTP &amp; Render Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dns')}
            className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap cursor-pointer ${
              activeTab === 'dns'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            DNS Hierarchy Resolver
          </button>
        </div>
        <span className="text-xs text-[var(--text-muted)]">Interactive Protocol Simulator</span>
      </div>

      {activeTab === 'http' ? (
        <div className="p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[var(--text-secondary)] m-0">
              Step through the 6 phases from typing a URL to painting pixels on screen.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHttpStep(0)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded border border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setHttpStep((s) => (s + 1) % HTTP_PIPELINE_STEPS.length)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                Next Phase
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG Stage Progress */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {HTTP_PIPELINE_STEPS.map((item, idx) => {
              const active = idx === httpStep;
              const visited = idx < httpStep;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHttpStep(idx)}
                  className={`text-left p-2.5 rounded border transition-colors cursor-pointer ${
                    active
                      ? 'border-[var(--accent-primary)] bg-[var(--bg-subtle)]'
                      : visited
                      ? 'border-[var(--accent-sage)] bg-[var(--bg-surface)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] opacity-75'
                  }`}
                >
                  <div className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                    0{item.id}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                    {item.stage}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <strong className="text-sm text-[var(--text-primary)]">
                Phase {HTTP_PIPELINE_STEPS[httpStep].id}: {HTTP_PIPELINE_STEPS[httpStep].stage}
              </strong>
              <span className="font-mono text-xs text-[var(--accent-warm)]">
                {HTTP_PIPELINE_STEPS[httpStep].layer}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] m-0 mb-2">
              {HTTP_PIPELINE_STEPS[httpStep].detail}
            </p>
            <div className="font-mono text-xs px-3 py-2 rounded bg-[var(--bg-subtle)] text-[var(--text-primary)]">
              Wire Artifact: {HTTP_PIPELINE_STEPS[httpStep].packet}
            </div>
          </div>

          {/* HTTP Method & Status Tester */}
          <div className="pt-3 border-t border-[var(--border-hairline)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                Inspect HTTP Request / Status Code
              </span>
              <div className="flex gap-1.5">
                {(['ok', 'created', 'notfound'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedEndpoint(key)}
                    className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                      selectedEndpoint === key
                        ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {key === 'ok' ? 'GET 200' : key === 'created' ? 'POST 201' : 'GET 404'}
                  </button>
                ))}
              </div>
            </div>
            <div className="font-mono text-xs p-3 rounded bg-[#0F172A] text-[#E2E8F0] space-y-1">
              <div>
                &gt; {endpointPayloads.method} {endpointPayloads.path} HTTP/1.1
              </div>
              <div className="text-[#5EEAD4]">&lt; HTTP/1.1 {endpointPayloads.status}</div>
              <div className="text-[#94A3B8]">{endpointPayloads.body}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Select domain to resolve"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setDnsStep(0);
                }}
                className="text-xs px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
              >
                {Object.keys(DNS_DOMAINS).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                aria-label="Select DNS resolution mode"
                value={dnsMode}
                onChange={(e) => {
                  setDnsMode(e.target.value as 'recursive' | 'iterative');
                  setDnsStep(0);
                }}
                className="text-xs px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
              >
                <option value="iterative">Iterative Referrals (Standard)</option>
                <option value="recursive">Recursive Chain</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDnsStep(0)}
                className="px-2.5 py-1.5 text-xs rounded border border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setDnsStep((s) => (s + 1) % dnsHops.length)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                <Play className="w-3 h-3" />
                Next Hop ({dnsStep + 1}/{dnsHops.length})
              </button>
            </div>
          </div>

          {/* SVG Topology Diagram */}
          <svg
            viewBox="0 0 640 120"
            className="w-full h-auto rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
            role="img"
            aria-label="DNS Hierarchy Lookup Flow"
          >
            {dnsHops.map((hop, idx) => {
              const x = 18 + idx * 124;
              const isActive = idx === dnsStep;
              const isPast = idx < dnsStep;
              return (
                <g key={hop.node}>
                  {idx < dnsHops.length - 1 && (
                    <line
                      x1={x + 104}
                      y1={60}
                      x2={x + 124}
                      y2={60}
                      stroke={isPast ? 'var(--accent-primary)' : 'var(--border-strong)'}
                      strokeWidth="2"
                    />
                  )}
                  <rect
                    x={x}
                    y={26}
                    width="104"
                    height="68"
                    rx="6"
                    fill={isActive ? 'var(--accent-primary)' : isPast ? 'var(--bg-subtle)' : 'var(--bg-surface)'}
                    stroke={isActive ? 'var(--accent-primary)' : isPast ? 'var(--accent-sage)' : 'var(--border-strong)'}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x + 52}
                    y={52}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill={isActive ? 'var(--bg-surface)' : 'var(--text-primary)'}
                  >
                    Hop {idx + 1}
                  </text>
                  <text
                    x={x + 52}
                    y={72}
                    textAnchor="middle"
                    fontSize="9"
                    fill={isActive ? 'var(--bg-subtle)' : 'var(--text-secondary)'}
                  >
                    {hop.node.length > 15 ? hop.node.slice(0, 14) + '…' : hop.node}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-sm">
            <strong className="text-[var(--text-primary)]">{dnsHops[dnsStep].node}: </strong>
            <span className="text-[var(--text-secondary)]">{dnsHops[dnsStep].action}</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import type { SimulationId } from '../types/syllabus';
import { SimulationSwitcher } from './simulations/SimulationSwitcher';

const LAB_CATALOG: {
  id: SimulationId;
  unit: string;
  title: string;
  summary: string;
}[] = [
  {
    id: 'http-lifecycle',
    unit: 'Unit 01',
    title: 'HTTP Request & Critical Rendering Path',
    summary: 'Step from URL parse, DNS lookup, TCP/TLS handshake, and HTTP status inspector to DOM & Paint.',
  },
  {
    id: 'dns-resolver',
    unit: 'Unit 01',
    title: 'Hierarchical DNS Resolver (Recursive vs Iterative)',
    summary: 'Trace hops across Local Cache, ISP Resolver, Root (.), TLD, and Authoritative Nameservers.',
  },
  {
    id: 'email-protocols',
    unit: 'Unit 01',
    title: 'SMTP Push, POP3 vs IMAP Sync & MIME Base64',
    summary: 'Test single-device deletion (POP3) vs multi-device folder sync (IMAP) and encode MIME payloads.',
  },
  {
    id: 'css-box-model',
    unit: 'Unit 02',
    title: 'CSS Box Model & Specificity Calculator',
    summary: 'Adjust margin, border, padding, content-box vs border-box, and race CSS selector weights.',
  },
  {
    id: 'xml-parser',
    unit: 'Unit 02',
    title: 'XML DOM Tree vs SAX Streaming Parser',
    summary: 'Parse live XML into an in-memory DOM hierarchy or step through O(1)-RAM SAX callbacks.',
  },
  {
    id: 'soa-soap',
    unit: 'Unit 03',
    title: 'SOA Publish-Find-Bind Triangle & SOAP Envelopes',
    summary: 'Animate the UDDI/Provider/Consumer triangle and compare valid SOAP Requests vs Faults.',
  },
  {
    id: 'ajax-xhr',
    unit: 'Unit 03',
    title: 'AJAX readyState (0–4) & Bandwidth Savings',
    summary: 'Advance XHR readyState phases and compare 180 KB full reloads vs 2.4 KB JSON deltas.',
  },
  {
    id: 'semantic-search',
    unit: 'Unit 04',
    title: 'Inverted Index TF-IDF Ranker & RDF Triples',
    summary: 'Run real TF-IDF queries across a live inverted index and filter Subject–Predicate–Object triples.',
  },
  {
    id: 'nextgen-5g-iot',
    unit: 'Unit 05',
    title: '5G Benchmark, IoT Telemetry & IPFS Content CIDs',
    summary: 'Benchmark 4G vs 5G asset delivery, trigger IoT cooling actuators, and hash immutable IPFS CIDs.',
  },
];

export const SimulationsHub: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<SimulationId>('http-lifecycle');
  const activeMeta = LAB_CATALOG.find((l) => l.id === selectedLab) || LAB_CATALOG[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      <header className="space-y-2 border-b border-[var(--border-hairline)] pb-5">
        <div className="text-xs font-mono text-[var(--accent-warm)]">
          CS35302 Interactive Laboratory · 9 Live Protocol &amp; Architecture Simulators
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] m-0">
          Interactive Concept &amp; Protocol Simulations
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[70ch] m-0">
          Experiment directly with networking topologies, CSS geometry, XML parsers, search indexes, and 5G benchmarks.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-2">
          {LAB_CATALOG.map((lab) => {
            const active = lab.id === selectedLab;
            return (
              <button
                key={lab.id}
                type="button"
                onClick={() => setSelectedLab(lab.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-colors cursor-pointer ${
                  active
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <div className={`text-[11px] font-mono ${active ? 'opacity-80' : 'text-[var(--accent-warm)]'}`}>
                  {lab.unit}
                </div>
                <div className="text-sm font-semibold mt-0.5">{lab.title}</div>
                <p className={`text-xs mt-1 m-0 leading-relaxed ${active ? 'opacity-90' : 'text-[var(--text-secondary)]'}`}>
                  {lab.summary}
                </p>
              </button>
            );
          })}
        </aside>

        <main className="lg:col-span-8 space-y-3">
          <div className="text-xs font-mono text-[var(--text-muted)]">
            Active Simulation · {activeMeta.unit} · {activeMeta.title}
          </div>
          <SimulationSwitcher simulationId={selectedLab} />
        </main>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { estimateTransferTimeMs } from '../../utils/syllabusHelpers';
import { Activity } from 'lucide-react';

export const NextGen5GIoTSimulator: React.FC = () => {
  const [assetMb, setAssetMb] = useState<number>(45);
  const [iotThreshold, setIotThreshold] = useState<number>(28);
  const [tempC, setTempC] = useState<number>(25.4);
  const [cidInput, setCidInput] = useState<string>('Quantum-CS35302-Notes-v1');
  const [cidHex, setCidHex] = useState<string>('bafybeig4a9d82f7e1c30a82f');

  const ms4g = estimateTransferTimeMs(assetMb, 35, 50);
  const msWifi = estimateTransferTimeMs(assetMb, 180, 14);
  const ms5g = estimateTransferTimeMs(assetMb, 1000, 4);

  useEffect(() => {
    let active = true;
    async function computeHash() {
      try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(cidInput));
        const hex = Array.from(new Uint8Array(buf))
          .slice(0, 12)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        if (active) setCidHex('bafy' + hex);
      } catch {
        // Fallback for non-secure contexts
      }
    }
    computeHash();
    return () => {
      active = false;
    };
  }, [cidInput]);

  const sampleSensor = () => {
    const next = Number((22 + Math.random() * 11).toFixed(1));
    setTempC(next);
  };

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)] flex flex-wrap items-center justify-between gap-2">
        <strong className="font-display text-sm text-[var(--text-primary)]">
          5G Throughput Benchmark, IoT Telemetry &amp; IPFS CID Explorer
        </strong>
        <span className="text-xs text-[var(--text-muted)]">Unit 5 Interactive Lab</span>
      </div>

      <div className="p-5 space-y-6">
        {/* 5G vs 4G Transfer Benchmark */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="asset-mb" className="text-xs font-semibold text-[var(--text-primary)]">
              3D WebXR / PWA Bundle Size: <span className="font-mono text-[var(--accent-warm)] tabular-nums">{assetMb} MB</span>
            </label>
            <input
              id="asset-mb"
              type="range"
              min={5}
              max={150}
              value={assetMb}
              onChange={(e) => setAssetMb(Number(e.target.value))}
              className="w-52 accent-[var(--accent-primary)]"
            />
          </div>

          <div className="space-y-2">
            {[
              { label: '4G LTE (35 Mbps, 50ms RTT)', ms: ms4g, color: 'bg-[var(--accent-crimson)]' },
              { label: 'Wi-Fi 6 (180 Mbps, 14ms RTT)', ms: msWifi, color: 'bg-[var(--accent-warm)]' },
              { label: '5G eMBB/URLLC (1 Gbps, 4ms RTT)', ms: ms5g, color: 'bg-[var(--accent-sage)]' },
            ].map((row) => {
              const pct = Math.max(4, Math.min(100, Math.round((row.ms / ms4g) * 100)));
              return (
                <div key={row.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">{row.label}</span>
                    <span className="font-mono font-semibold tabular-nums text-[var(--text-primary)]">
                      {row.ms} ms ({(row.ms / 1000).toFixed(2)} s)
                    </span>
                  </div>
                  <div className="h-2 rounded bg-[var(--bg-muted)] overflow-hidden">
                    <div className={`h-full ${row.color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* IoT Telemetry + IPFS Content Hash */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-hairline)]">
          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[var(--accent-warm)]" />
                MQTT / WebSocket Sensor Node
              </span>
              <button
                type="button"
                onClick={sampleSensor}
                className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
              >
                Emit Packet
              </button>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Live Reading: <strong className="font-mono tabular-nums">{tempC} &deg;C</strong></span>
              <span className={tempC >= iotThreshold ? 'text-[var(--accent-crimson)] font-semibold' : 'text-[var(--accent-sage)] font-semibold'}>
                Fan Actuator: {tempC >= iotThreshold ? 'ON (Cooling)' : 'STANDBY'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="thresh-rng" className="text-[var(--text-muted)]">Trigger Threshold: {iotThreshold}&deg;C</label>
              <input
                id="thresh-rng"
                type="range"
                min={22}
                max={34}
                value={iotThreshold}
                onChange={(e) => setIotThreshold(Number(e.target.value))}
                className="w-28 accent-[var(--accent-primary)]"
              />
            </div>
          </div>

          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-2">
            <label htmlFor="cid-in" className="block text-xs font-semibold text-[var(--text-primary)]">
              IPFS Content Addressing (Modify Byte &rarr; New CID)
            </label>
            <input
              id="cid-in"
              type="text"
              value={cidInput}
              onChange={(e) => setCidInput(e.target.value)}
              className="w-full px-2.5 py-1 text-xs font-mono rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            />
            <div className="font-mono text-xs text-[var(--accent-sage)] break-all">
              ipfs://{cidHex}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

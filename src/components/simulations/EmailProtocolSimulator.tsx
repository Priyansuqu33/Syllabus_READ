import React, { useMemo, useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';

export const EmailProtocolSimulator: React.FC = () => {
  const [serverInbox, setServerInbox] = useState<string[]>([
    'Welcome to CS35302 Web Tech',
    'Lab Sheet 02: SMTP & MIME',
  ]);
  const [laptopInbox, setLaptopInbox] = useState<string[]>([]);
  const [phoneInbox, setPhoneInbox] = useState<string[]>([]);
  const [protocol, setProtocol] = useState<'imap' | 'pop3'>('imap');
  const [subject, setSubject] = useState<string>('Unit 1 Assignment PDF');
  const [mimeInput, setMimeInput] = useState<string>('Hello MIME Attachment!');
  const [lastLog, setLastLog] = useState<string>('Ready. Send an email via SMTP or sync a device.');

  const mimeBase64 = useMemo(() => {
    try {
      return btoa(unescape(encodeURIComponent(mimeInput)));
    } catch {
      return 'SGVsbG8h';
    }
  }, [mimeInput]);

  const sendSmtp = () => {
    const clean = subject.trim() || 'Untitled Message';
    setServerInbox((prev) => [clean, ...prev]);
    setLastLog(`SMTP (Port 587) pushed "${clean}" to Destination Mail Server.`);
  };

  const syncDevice = (device: 'laptop' | 'phone') => {
    if (serverInbox.length === 0) {
      setLastLog(
        protocol === 'pop3'
          ? `POP3 checked server: 0 messages remaining (already downloaded and deleted by another client!).`
          : `IMAP synced: server mailbox is empty.`
      );
      return;
    }

    if (protocol === 'pop3') {
      const downloaded = [...serverInbox];
      if (device === 'laptop') {
        setLaptopInbox((prev) => [...downloaded, ...prev]);
      } else {
        setPhoneInbox((prev) => [...downloaded, ...prev]);
      }
      setServerInbox([]);
      setLastLog(
        `POP3 (Port 110) downloaded ${downloaded.length} message(s) to ${device} and DELETED them from the server.`
      );
    } else {
      setLaptopInbox([...serverInbox]);
      setPhoneInbox([...serverInbox]);
      setLastLog(
        `IMAP (Port 143/993) synchronized all ${serverInbox.length} server message(s) across Laptop and Phone.`
      );
    }
  };

  const resetAll = () => {
    setServerInbox(['Welcome to CS35302 Web Tech', 'Lab Sheet 02: SMTP & MIME']);
    setLaptopInbox([]);
    setPhoneInbox([]);
    setLastLog('Mailboxes reset to initial state.');
  };

  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <strong className="font-display text-sm text-[var(--text-primary)]">
          SMTP Push vs POP3 &amp; IMAP Sync + MIME Base64 Lab
        </strong>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setProtocol('imap')}
            className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
              protocol === 'imap'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            Use IMAP (Sync)
          </button>
          <button
            type="button"
            onClick={() => setProtocol('pop3')}
            className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
              protocol === 'pop3'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-surface)]'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-hairline)]'
            }`}
          >
            Use POP3 (Download &amp; Delete)
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-2.5 py-1 text-xs rounded border border-[var(--border-strong)] text-[var(--text-secondary)] cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Step 1: SMTP Send */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            aria-label="New email subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-1.5 text-sm rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
          />
          <button
            type="button"
            onClick={sendSmtp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded bg-[var(--accent-primary)] text-[var(--bg-surface)] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Send via SMTP (Port 587)
          </button>
        </div>

        {/* Step 2: 3-Node Mail Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                Mail Server Storage
              </span>
              <span className="font-mono text-xs text-[var(--accent-warm)] tabular-nums">
                {serverInbox.length} msg
              </span>
            </div>
            <ul className="text-xs text-[var(--text-secondary)] space-y-1 m-0 pl-4 min-h-[60px]">
              {serverInbox.length === 0 ? (
                <li className="list-none text-[var(--text-muted)] italic">Server mailbox empty</li>
              ) : (
                serverInbox.map((m, i) => <li key={i}>{m}</li>)
              )}
            </ul>
          </div>

          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text-primary)]">Laptop Client</span>
              <button
                type="button"
                onClick={() => syncDevice('laptop')}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded bg-[var(--bg-subtle)] text-[var(--accent-primary)] border border-[var(--border-strong)] cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Sync ({protocol.toUpperCase()})
              </button>
            </div>
            <ul className="text-xs text-[var(--text-secondary)] space-y-1 m-0 pl-4 min-h-[60px]">
              {laptopInbox.length === 0 ? (
                <li className="list-none text-[var(--text-muted)] italic">Not synced yet</li>
              ) : (
                laptopInbox.map((m, i) => <li key={i}>{m}</li>)
              )}
            </ul>
          </div>

          <div className="p-3.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text-primary)]">Phone Client</span>
              <button
                type="button"
                onClick={() => syncDevice('phone')}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded bg-[var(--bg-subtle)] text-[var(--accent-primary)] border border-[var(--border-strong)] cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Sync ({protocol.toUpperCase()})
              </button>
            </div>
            <ul className="text-xs text-[var(--text-secondary)] space-y-1 m-0 pl-4 min-h-[60px]">
              {phoneInbox.length === 0 ? (
                <li className="list-none text-[var(--text-muted)] italic">Not synced yet</li>
              ) : (
                phoneInbox.map((m, i) => <li key={i}>{m}</li>)
              )}
            </ul>
          </div>
        </div>

        <div className="font-mono text-xs px-3 py-2 rounded bg-[var(--bg-subtle)] text-[var(--text-primary)]">
          Protocol Trace: {lastLog}
        </div>

        {/* MIME Base64 Encoder */}
        <div className="pt-3 border-t border-[var(--border-hairline)] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="mime-in" className="text-xs font-semibold text-[var(--text-primary)]">
              Live MIME Base64 Encoder (Non-ASCII &amp; Attachment Wire Encoding)
            </label>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              Content-Transfer-Encoding: base64
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              id="mime-in"
              type="text"
              value={mimeInput}
              onChange={(e) => setMimeInput(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
            />
            <div className="px-3 py-1.5 text-xs font-mono rounded bg-[#0F172A] text-[#5EEAD4] overflow-x-auto">
              {mimeBase64}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

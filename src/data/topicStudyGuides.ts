export interface DiagramNodeSpec {
  id: string;
  label: string;
  sublabel: string;
  detail: string;
  artifact: string;
  col: number; // 0..3 grid column or stage
  row: number; // 0..2 grid row
  tone?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface DiagramEdgeSpec {
  from: string;
  to: string;
  label: string;
  bidirectional?: boolean;
}

export interface TopicStudyGuide {
  topicId: string;
  analogyTitle: string;
  analogy: string;
  memoryHook: string;
  structuredSections: {
    heading: string;
    explanation: string;
    keyInsight: string;
  }[];
  workedWalkthrough: {
    title: string;
    steps: string[];
  };
  diagram: {
    title: string;
    caption: string;
    layout: 'flow' | 'tree' | 'triangle' | 'layers' | 'compare';
    nodes: DiagramNodeSpec[];
    edges: DiagramEdgeSpec[];
  };
}

export const TOPIC_STUDY_GUIDES: Record<string, TopicStudyGuide> = {
  'u1-t1': {
    topicId: 'u1-t1',
    analogyTitle: 'Highway Network vs Delivery Trucks',
    analogy:
      'Think of the Internet as the physical highway system (asphalt roads, intersections, traffic rules like TCP/IP), while the World Wide Web (WWW) is the postal and library service running on top of those highways using HTTP envelopes and HTML books.',
    memoryHook: 'Internet = Roads (TCP/IP, 1969/1983) · WWW = Hypertext Library on those roads (HTML + URL + HTTP, 1989)',
    structuredSections: [
      {
        heading: 'Why Packet Switching Replaced Telephone Circuits',
        explanation:
          'Traditional phone lines used Circuit Switching: an entire copper wire stayed locked exclusively between two callers even during silence. ARPANET introduced Packet Switching—chopping data into tiny numbered envelopes (packets) that independently hop across shared fiber links and reassemble at the destination even if one router fails.',
        keyInsight: 'Packet loss triggers selective retransmission via TCP sequence numbers rather than dropping the entire session.',
      },
      {
        heading: 'Tim Berners-Lee’s Three Web Pillars (CERN, 1989)',
        explanation:
          'To let scientists on incompatible computers share research, Berners-Lee invented three interlocking standards: URL/URI (a universal address to locate any document), HTTP (a stateless request-response verb protocol to fetch it), and HTML (a tag-based hypertext format to link documents together).',
        keyInsight: 'Decoupling document structure from operating system display allowed Windows, Mac, and Unix machines to read the exact same web.',
      },
      {
        heading: 'From Static Hypertext to W3C Open Standards',
        explanation:
          'NCSA Mosaic (1993) added inline images inside clickable pages, triggering explosive public adoption. In 1994, Berners-Lee founded the W3C at MIT so HTML, CSS, and accessibility rules stayed royalty-free rather than controlled by a single software vendor.',
        keyInsight: 'Open standards prevent vendor lock-in and guarantee long-term backward compatibility.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing One Click From Browser Address Bar to Pixels',
      steps: [
        '1. Parse URL: https://quantumuniversity.edu.in/cs35302 -> scheme=https, host=quantumuniversity.edu.in, path=/cs35302.',
        '2. Resolve Hostname: Browser queries DNS cache/resolver to map domain -> IPv4 104.21.45.12.',
        '3. Establish Reliable Pipe: TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK) opens Port 443, followed by TLS 1.3 key exchange.',
        '4. Fetch & Render: Browser sends HTTP GET; server returns 200 OK HTML; engine builds DOM + CSSOM -> Render Tree -> Screen Paint.',
      ],
    },
    diagram: {
      title: 'End-to-End URL Request & Rendering Flowchart',
      caption: 'Click any node in the architecture path to inspect the protocol, port, and data transformed at that stage.',
      layout: 'flow',
      nodes: [
        { id: 'url', label: '1. Browser URL', sublabel: 'User Navigation', detail: 'Parses scheme, domain, port, and resource path; checks HSTS preload list.', artifact: 'https://host/path', col: 0, row: 0, tone: 'primary' },
        { id: 'dns', label: '2. DNS Lookup', sublabel: 'UDP Port 53', detail: 'Translates human domain name into routable IPv4/IPv6 server address.', artifact: '104.21.45.12', col: 1, row: 0, tone: 'secondary' },
        { id: 'tcp', label: '3. TCP + TLS', sublabel: 'Port 443 Handshake', detail: 'SYN/SYN-ACK/ACK guarantees ordered delivery; TLS 1.3 encrypts wire bytes.', artifact: 'Encrypted Tunnel', col: 2, row: 0, tone: 'neutral' },
        { id: 'http', label: '4. HTTP Server', sublabel: 'GET / -> 200 OK', detail: 'Web server locates file or executes backend route and streams HTML bytes.', artifact: 'text/html Bytes', col: 2, row: 1, tone: 'accent' },
        { id: 'dom', label: '5. DOM + CSSOM', sublabel: 'Parser Engine', detail: 'Tokenizes HTML tags into DOM tree and CSS rules into CSSOM tree.', artifact: 'Render Tree', col: 1, row: 1, tone: 'secondary' },
        { id: 'paint', label: '6. Layout & Paint', sublabel: 'GPU Composite', detail: 'Calculates box coordinates and paints crisp pixels onto the viewport.', artifact: '60 FPS Viewport', col: 0, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'url', to: 'dns', label: 'Host Query' },
        { from: 'dns', to: 'tcp', label: 'Resolved IP' },
        { from: 'tcp', to: 'http', label: 'HTTP GET' },
        { from: 'http', to: 'dom', label: 'HTML Stream' },
        { from: 'dom', to: 'paint', label: 'Geometry' },
      ],
    },
  },
  'u1-t2': {
    topicId: 'u1-t2',
    analogyTitle: 'Architectural Blueprint of a Building',
    analogy:
      'Think of HTML as the steel beams and room walls of a house (defining what is a kitchen vs a bedroom), CSS as the interior paint and lighting, and JavaScript as the electrical switches and smart automation.',
    memoryHook: '<!DOCTYPE html> -> <html> -> <head> (Metadata) + <body> (Landmarks: header, nav, main, article, footer)',
    structuredSections: [
      {
        heading: 'Why <!DOCTYPE html> Matters Critically',
        explanation:
          'Browsers maintain a legacy "Quirks Mode" to avoid breaking poorly coded 1990s websites (which measured padding inside width inconsistently). Placing `<!DOCTYPE html>` on line 1 switches the browser into strict W3C Standards Mode.',
        keyInsight: 'Omitting DOCTYPE silently triggers Quirks Mode and breaks modern CSS Flexbox/Grid box sizing.',
      },
      {
        heading: 'Head (Machine Metadata) vs Body (Human Content)',
        explanation:
          'Everything inside `<head>` instructs the browser, search bots, and social cards (`<meta charset="UTF-8">`, viewport scaling, `<title>`, stylesheets). Everything inside `<body>` builds the visible DOM.',
        keyInsight: 'Always declare `<meta charset="UTF-8">` inside the first 1024 bytes so non-English scripts never garble.',
      },
      {
        heading: 'Semantic Landmarks vs Generic <div> Soup',
        explanation:
          'Replacing nested `<div>` blocks with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` gives screen readers instant keyboard jump-landmarks and tells search crawlers which text is primary content.',
        keyInsight: 'Zero visual cost, massive accessibility and SEO gains.',
      },
    ],
    workedWalkthrough: {
      title: 'How the Browser Turns Raw HTML Bytes Into a DOM Tree',
      steps: [
        '1. Bytes -> Characters: Decode incoming UTF-8 byte stream into Unicode characters.',
        '2. Tokenization: State machine recognizes start tags (`<main>`), attributes (`lang="en"`), text, and end tags.',
        '3. Tree Construction: Stack-based parser links parent-child relationships (`html -> body -> main -> h1`).',
        '4. Error Tolerance: Unlike strict XML, HTML5 auto-closes forgotten optional tags rather than crashing the page.',
      ],
    },
    diagram: {
      title: 'HTML5 Document Tree & Parsing Pipeline',
      caption: 'Explore how root metadata and semantic landmarks map into the browser DOM hierarchy.',
      layout: 'tree',
      nodes: [
        { id: 'doctype', label: '<!DOCTYPE html>', sublabel: 'Standards Mode Switch', detail: 'Enforces modern W3C box-model and layout rules.', artifact: 'Line 1 Prolog', col: 1, row: 0, tone: 'accent' },
        { id: 'html', label: '<html lang="en">', sublabel: 'Root DOM Node', detail: 'Wraps entire document; declares primary language for assistive tech.', artifact: 'documentElement', col: 1, row: 1, tone: 'primary' },
        { id: 'head', label: '<head>', sublabel: 'Machine Metadata', detail: 'Contains charset UTF-8, viewport meta, <title>, and CSS links.', artifact: 'Non-Visual', col: 0, row: 2, tone: 'secondary' },
        { id: 'body', label: '<body>', sublabel: 'Visible Landmarks', detail: 'Contains <header>, <nav>, <main>, <article>, and <footer>.', artifact: 'Renderable Tree', col: 2, row: 2, tone: 'primary' },
      ],
      edges: [
        { from: 'doctype', to: 'html', label: 'Activates Standards' },
        { from: 'html', to: 'head', label: 'Metadata Branch' },
        { from: 'html', to: 'body', label: 'Viewport Branch' },
      ],
    },
  },
  'u1-t3': {
    topicId: 'u1-t3',
    analogyTitle: 'Postal Service vs Multi-Device Cloud Sync',
    analogy:
      'SMTP is the outgoing mail truck dropping letters at the post office; MIME is the padded parcel box letting you mail photos/PDFs instead of plain postcards; POP3 brings all letters home and empties your P.O. Box; IMAP keeps master folders at the post office so your phone and laptop stay perfectly synced.',
    memoryHook: 'HTTP: 80/443 (Stateless Web) · SMTP: 25/587 (Send Push) · POP3: 110 (Pull & Delete) · IMAP: 143/993 (Multi-Device Sync)',
    structuredSections: [
      {
        heading: 'HTTP Statelessness, Methods & Status Families',
        explanation:
          'HTTP treats every request independently—the server remembers nothing between clicks unless sessions use Cookies or JWT Authorization headers. Idempotent methods like `GET` and `PUT` safely repeat; `POST` creates new records. Responses carry status codes: `2xx` Success, `3xx` Redirect, `4xx` Client Error, `5xx` Server Error.',
        keyInsight: 'HTTPS wraps HTTP inside TLS 1.3 so passwords and cookies cannot be sniffed on public Wi-Fi.',
      },
      {
        heading: 'Complete Email Delivery Chain (SMTP + DNS MX)',
        explanation:
          'Your email app (MUA) submits mail via SMTP Port 587 to your provider’s Mail Transfer Agent (MTA). Your MTA queries DNS for the recipient domain’s `MX` (Mail Exchange) record and relays the message over SMTP Port 25 to the destination server’s inbox.',
        keyInsight: 'SMTP is exclusively a PUSH protocol—it never downloads mail to your device.',
      },
      {
        heading: 'MIME Encoding + POP3 vs IMAP Retrieval',
        explanation:
          'Original SMTP only supported 7-bit ASCII text. MIME adds `Content-Type` (e.g., `multipart/mixed`) and `Base64` transfer encoding so PDFs, images, and Unicode survive intact. For reading mail, POP3 downloads to one device and removes server copies by default, while IMAP maintains folder flags (`Read`, `Starred`) across all devices.',
        keyInsight: 'Base64 expands binary attachment size by ~33% to make every byte safe 7-bit ASCII.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing Alice@qu.edu Sending a PDF to Bob@gmail.com',
      steps: [
        '1. MIME Wrap: Alice’s app encodes `notes.pdf` into Base64 inside a `multipart/mixed` body.',
        '2. Outgoing SMTP (Port 587): Authenticated client pushes message to `smtp.qu.edu`.',
        '3. DNS MX + Relay (Port 25): `smtp.qu.edu` looks up `MX` for `gmail.com` and pushes via TLS SMTP.',
        '4. IMAP Sync (Port 993): Bob reads it on his phone -> status changes to Read on his laptop instantly.',
      ],
    },
    diagram: {
      title: 'Email Transmission & Retrieval Architecture Flowchart',
      caption: 'Click any node to trace MIME encoding, SMTP push relay, DNS MX lookup, and IMAP vs POP3 retrieval.',
      layout: 'flow',
      nodes: [
        { id: 'mua', label: 'Sender MUA', sublabel: 'Compose + MIME', detail: 'Encodes Unicode & binary files using Base64 and multipart boundaries.', artifact: 'MIME Base64', col: 0, row: 0, tone: 'primary' },
        { id: 'mta1', label: 'Outgoing MTA', sublabel: 'SMTP Port 587', detail: 'Authenticates sender and queues message for domain routing.', artifact: 'STARTTLS Push', col: 1, row: 0, tone: 'secondary' },
        { id: 'mx', label: 'DNS MX Query', sublabel: 'Mail Exchange Lookup', detail: 'Finds priority mail server IP for recipient domain.', artifact: 'MX Record', col: 1, row: 1, tone: 'neutral' },
        { id: 'mta2', label: 'Recipient Server', sublabel: 'SMTP Port 25 -> MDA', detail: 'Accepts relay and stores message inside user mailbox.', artifact: 'Inbox Store', col: 2, row: 0, tone: 'accent' },
        { id: 'imap', label: 'IMAP (143/993)', sublabel: 'Multi-Device Sync', detail: 'Keeps master folders on server; syncs read/archive state everywhere.', artifact: 'Phone + Laptop', col: 2, row: 1, tone: 'primary' },
        { id: 'pop', label: 'POP3 (110/995)', sublabel: 'Single Client Pull', detail: 'Downloads messages locally and deletes server copy by default.', artifact: 'Offline Local', col: 0, row: 1, tone: 'neutral' },
      ],
      edges: [
        { from: 'mua', to: 'mta1', label: 'SMTP Push' },
        { from: 'mta1', to: 'mx', label: 'MX Lookup' },
        { from: 'mta1', to: 'mta2', label: 'Relay (25)' },
        { from: 'mta2', to: 'imap', label: 'Sync State' },
        { from: 'mta2', to: 'pop', label: 'Download' },
      ],
    },
  },
  'u1-t4': {
    topicId: 'u1-t4',
    analogyTitle: 'Global Phonebook Organized by Continent, Country & Street',
    analogy:
      'Instead of storing 4 billion website numbers on one giant fragile server, DNS works like asking a global receptionist (Root `.`), who points you to the Country office (`.in`), who points you to the University desk (`quantumuniversity.edu.in`), which hands you the exact room number (IP address).',
    memoryHook: 'Root (.) -> TLD (.com/.org/.in) -> Authoritative NS -> A (IPv4) / AAAA (IPv6) / CNAME / MX / TTL Cache',
    structuredSections: [
      {
        heading: 'Hierarchical Inverted Tree Namespace',
        explanation:
          'DNS reads right-to-left: in `portal.quantumuniversity.edu.in.`, the trailing invisible dot `.` is the Root Zone (13 logical clusters `A–M` replicated globally via Anycast), `.in` is the Top-Level Domain (TLD), `edu.in` is the second-level zone, and `portal` is the host subdomain.',
        keyInsight: 'Delegation means each organization controls its own subdomains without waiting on a central committee.',
      },
      {
        heading: 'Recursive vs Iterative Resolution Mechanics',
        explanation:
          'Your laptop sends ONE **Recursive** query to your ISP/1.1.1.1 resolver ("Do not reply until you have the final IP"). That resolver then executes multiple **Iterative** queries: asking Root (gets TLD referral), asking TLD (gets Authoritative NS referral), and asking Authoritative NS (gets exact IP).',
        keyInsight: 'Caching responses for TTL (Time-To-Live) seconds prevents Root servers from melting under global traffic.',
      },
      {
        heading: 'Essential DNS Record Types (Exam Must-Know)',
        explanation:
          '`A` maps hostname to 32-bit IPv4; `AAAA` maps to 128-bit IPv6; `CNAME` aliases `www.site.com` to `site.com`; `MX` directs email delivery with priority numbers; `TXT` stores SPF/DKIM anti-spam & domain verification tokens.',
        keyInsight: 'DNS primarily runs on fast connectionless UDP Port 53, switching to TCP Port 53 for large DNSSEC/zone transfers.',
      },
    ],
    workedWalkthrough: {
      title: 'Step-by-Step Resolution of api.github.com',
      steps: [
        '1. Browser/OS Cache Check -> Miss.',
        '2. Client -> ISP Resolver (Recursive Query): "What is api.github.com?"',
        '3. Resolver -> Root (.) -> Referral: "Ask .com TLD at 192.5.6.30."',
        '4. Resolver -> .com TLD -> Referral: "Ask ns1.github.com."',
        '5. Resolver -> Authoritative NS -> Answer: "140.82.121.6 (TTL 60s)." Cached and returned to browser!',
      ],
    },
    diagram: {
      title: 'Hierarchical DNS Tree & Iterative Query Path',
      caption: 'Trace how Recursive client requests trigger Iterative hops across Root, TLD, and Authoritative Nameservers.',
      layout: 'tree',
      nodes: [
        { id: 'client', label: 'Browser + OS', sublabel: 'Stub Resolver', detail: 'Checks browser & /etc/hosts cache; sends 1 Recursive query to ISP Resolver.', artifact: 'Cache Miss', col: 0, row: 1, tone: 'primary' },
        { id: 'resolver', label: 'ISP / 1.1.1.1', sublabel: 'Recursive Resolver', detail: 'Handles heavy lifting; performs iterative hops and caches result for TTL.', artifact: 'UDP Port 53', col: 1, row: 1, tone: 'secondary' },
        { id: 'root', label: 'Root Server (.)', sublabel: '13 Anycast Clusters', detail: 'Never knows site IPs; immediately refers resolver to the .com/.in/.org TLD.', artifact: 'TLD Referral', col: 2, row: 0, tone: 'neutral' },
        { id: 'tld', label: 'TLD Server', sublabel: '.in / .com / .org', detail: 'Maintains registry pointers to each domain’s Authoritative Nameserver.', artifact: 'NS Referral', col: 2, row: 1, tone: 'accent' },
        { id: 'auth', label: 'Authoritative NS', sublabel: 'Domain Zone Owner', detail: 'Holds ground-truth A, AAAA, CNAME, and MX records for the domain.', artifact: 'IP: 104.21.45.12', col: 2, row: 2, tone: 'primary' },
      ],
      edges: [
        { from: 'client', to: 'resolver', label: '1. Recursive' },
        { from: 'resolver', to: 'root', label: '2. Iterative' },
        { from: 'resolver', to: 'tld', label: '3. Iterative' },
        { from: 'resolver', to: 'auth', label: '4. Final A Record' },
      ],
    },
  },
  'u1-t5': {
    topicId: 'u1-t5',
    analogyTitle: 'Restaurant Kitchen (Web Server) & Dining Plate (Browser)',
    analogy:
      'A Web Server is the kitchen preparing and caching dishes (Nginx/Apache), while the Web Browser is the waiter + visualizer that parses the recipe (HTML/CSS), executes interactive magic (JS V8 Engine), and arranges everything neatly on your table (Render Tree & Paint).',
    memoryHook: 'Chrome = Blink + V8 · Firefox = Gecko + SpiderMonkey · Safari = WebKit + JavaScriptCore',
    structuredSections: [
      {
        heading: '7 Internal Subsystems of a Modern Browser',
        explanation:
          'Every browser separates: (1) User Interface (address bar/tabs), (2) Browser Engine (orchestrator), (3) Rendering Engine (Blink/Gecko/WebKit converting HTML+CSS to pixels), (4) Networking (HTTP/TLS/cache), (5) JavaScript Engine (V8/SpiderMonkey JIT compilation), (6) UI Backend (OS widgets), and (7) Data Persistence (`localStorage`, IndexedDB, Cookies).',
        keyInsight: 'Modern browsers run each tab in an isolated OS sandbox process so one crashed tab cannot bring down the browser.',
      },
      {
        heading: 'Web Server Architecture (Event-Driven vs Thread-Per-Connection)',
        explanation:
          'Apache HTTP historically spawned threads/processes per client, consuming higher RAM under 10,000+ concurrent connections (C10k problem). Nginx introduced an asynchronous event-loop serving tens of thousands of static assets & reverse-proxy routes with tiny memory overhead.',
        keyInsight: 'Reverse proxies terminate TLS, gzip/brotli compress responses, and load-balance backend app servers.',
      },
    ],
    workedWalkthrough: {
      title: 'Critical Rendering Path Inside Blink Rendering Engine',
      steps: [
        '1. Parse HTML -> build DOM tree; encountering `<link rel="stylesheet">` pauses first render until CSSOM finishes.',
        '2. Merge DOM + CSSOM -> construct Render Tree (skips `display: none` nodes).',
        '3. Layout (Reflow) -> compute exact x, y, width, height pixel geometry for viewport.',
        '4. Paint & Composite -> rasterize text/colors onto GPU layers cleanly.',
      ],
    },
    diagram: {
      title: 'Web Browser Internal Subsystems & Server Reverse-Proxy Architecture',
      caption: 'Click components to inspect how Browser Engines coordinate Networking, JS Execution, and Rendering.',
      layout: 'layers',
      nodes: [
        { id: 'ui', label: 'Browser UI', sublabel: 'Address Bar & Tabs', detail: 'User-facing controls isolated from untrusted webpage scripts.', artifact: 'Chrome / Tab', col: 0, row: 0, tone: 'neutral' },
        { id: 'engine', label: 'Browser Engine', sublabel: 'Sandbox Coordinator', detail: 'Marshals commands between UI, Networking, Storage, and Rendering.', artifact: 'IPC Sandbox', col: 1, row: 0, tone: 'primary' },
        { id: 'render', label: 'Rendering Engine', sublabel: 'Blink / Gecko / WebKit', detail: 'DOM + CSSOM -> Render Tree -> Layout -> Paint.', artifact: '60Hz Frame', col: 0, row: 1, tone: 'accent' },
        { id: 'js', label: 'JS JIT Engine', sublabel: 'V8 / SpiderMonkey', detail: 'Compiles JS bytecode into native machine code; manages Call Stack & Event Loop.', artifact: 'Heap + Stack', col: 1, row: 1, tone: 'secondary' },
        { id: 'net', label: 'Networking & Storage', sublabel: 'HTTP/3 + IndexedDB', detail: 'Manages TLS sockets, connection pools, Cookies, and offline Service Workers.', artifact: 'Port 443', col: 2, row: 0, tone: 'neutral' },
        { id: 'server', label: 'Web Server / Proxy', sublabel: 'Nginx / Apache / Node', detail: 'Serves static assets, terminates TLS, and load-balances dynamic API workers.', artifact: 'Reverse Proxy', col: 2, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'ui', to: 'engine', label: 'Navigate' },
        { from: 'engine', to: 'net', label: 'HTTP Fetch' },
        { from: 'net', to: 'server', label: 'TLS Socket', bidirectional: true },
        { from: 'engine', to: 'render', label: 'HTML/CSS Stream' },
        { from: 'render', to: 'js', label: 'DOM Mutations', bidirectional: true },
      ],
    },
  },
  'u2-t1': {
    topicId: 'u2-t1',
    analogyTitle: 'Inventory Ledger + Multi-Cell Spreadsheet Merge',
    analogy:
      'Think of `<ul>`/`<ol>` as bulleted vs numbered checklists, `<dl>` as a dictionary glossary, and `<table>` as a structured Excel ledger where `colspan` merges cells horizontally and `rowspan` merges vertically.',
    memoryHook: '<thead> + <tbody> + <tfoot> · th[scope="col|row"] · colspan (horizontal) · rowspan (vertical) · <img alt width height>',
    structuredSections: [
      {
        heading: 'Choosing the Right HTML List Type',
        explanation:
          'Use `<ul>` when sequence doesn’t affect meaning (features, nav links); `<ol>` when order is critical (protocol steps, recipes); `<dl>` (`<dt>` term + `<dd>` definition) for glossaries and key-value metadata.',
        keyInsight: 'Screen readers announce exact item counts ("list of 4 items") only when `<li>` sits properly inside `<ul>`/`<ol>`.',
      },
      {
        heading: 'Accessible Tables & Cell Spanning Geometry',
        explanation:
          'Wrap header rows in `<thead>` with `<th scope="col">` and data rows in `<tbody>`. Never use tables for page layout—use CSS Grid/Flexbox instead. When using `colspan="2"` or `rowspan="2"`, remember subsequent rows omit the occupied slots so columns align.',
        keyInsight: 'Replace legacy HTML `cellpadding`/`cellspacing` attributes with CSS `padding` and `border-collapse: collapse`.',
      },
      {
        heading: 'Zero Layout Shift (CLS) Images & Aspect Ratio',
        explanation:
          'Always specify `alt` (accessibility + fallback), `width` and `height` HTML attributes (reserves exact space before download completes so text doesn’t jump), and `loading="lazy"` on below-the-fold media.',
        keyInsight: 'Decorative images use empty `alt=""` so screen readers skip them politely.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing Cell Count Math in a `rowspan` + `colspan` Header',
      steps: [
        '1. Total table width = 3 columns.',
        '2. Row 1: `<th rowspan="2">Roll</th>` (occupies Col 1 in Row 1 & Row 2) + `<th colspan="2">Marks</th>` (occupies Cols 2–3 in Row 1).',
        '3. Row 2: Col 1 is ALREADY occupied by Row 1’s rowspan, so write ONLY TWO `<th>` tags (`Theory` and `Lab`)!',
        '4. Data rows inside `<tbody>` write 3 `<td>` cells normally.',
      ],
    },
    diagram: {
      title: 'HTML Table Spanning Geometry (rowspan & colspan)',
      caption: 'Click any table region to verify how header spanning reserves grid coordinates across rows.',
      layout: 'compare',
      nodes: [
        { id: 'r1c1', label: 'th[rowspan="2"]', sublabel: 'Roll No (Col 1, Rows 1-2)', detail: 'Spans vertically across both header rows, so Row 2 must skip Column 1.', artifact: 'rowspan="2"', col: 0, row: 0, tone: 'primary' },
        { id: 'r1c2', label: 'th[colspan="2"]', sublabel: 'Subject Marks (Cols 2-3)', detail: 'Spans horizontally across Theory and Lab sub-columns.', artifact: 'colspan="2"', col: 1, row: 0, tone: 'accent' },
        { id: 'r2c2', label: 'th: Theory', sublabel: 'Row 2, Col 2', detail: 'First cell in Row 2 markup because Col 1 was claimed above.', artifact: 'scope="col"', col: 1, row: 1, tone: 'secondary' },
        { id: 'r2c3', label: 'th: Lab', sublabel: 'Row 2, Col 3', detail: 'Aligns cleanly beneath the second half of Subject Marks.', artifact: 'scope="col"', col: 2, row: 1, tone: 'secondary' },
        { id: 'tbody', label: '<tbody> Data Rows', sublabel: '3x <td> per student', detail: 'Each body row supplies exact 3 data cells matching the 3-column grid.', artifact: 'tabular-nums', col: 0, row: 2, tone: 'neutral' },
      ],
      edges: [
        { from: 'r1c1', to: 'tbody', label: 'Col 1 Vertical Align' },
        { from: 'r1c2', to: 'r2c2', label: 'Splits Left' },
        { from: 'r1c2', to: 'r2c3', label: 'Splits Right' },
      ],
    },
  },
  'u2-t2': {
    topicId: 'u2-t2',
    analogyTitle: 'Postcard (GET) vs Sealed Envelope (POST)',
    analogy:
      'A `GET` form submission writes all your form fields right on the outside of a URL postcard (`?q=html&unit=2`) so anyone glancing at browser history sees it. A `POST` submission seals data inside the private HTTP request body envelope.',
    memoryHook: 'GET = Query String (Bookmarkable/Search) · POST = Request Body (Mutations/Files/Passwords) · <iframe sandbox title>',
    structuredSections: [
      {
        heading: 'GET vs POST & Multipart File Uploads',
        explanation:
          'Use `method="GET"` only for safe read-only queries/searches. Always use `method="POST"` for logins, registrations, and database edits. When uploading files (`<input type="file">`), you MUST set `enctype="multipart/form-data"` on `<form>`.',
        keyInsight: 'Every `<button>` inside a `<form>` defaults to `type="submit"`—explicitly write `type="button"` for non-submit buttons.',
      },
      {
        heading: 'HTML5 Native Constraint Validation',
        explanation:
          'Modern HTML5 eliminates boilerplate JS checks using semantic input types (`email`, `url`, `number`, `date`), `required`, `minlength`, `min`/`max`, and regex `pattern` attributes styled via `:valid` / `:invalid`.',
        keyInsight: 'Client validation improves UX immediately, but servers must always re-validate payloads against tampering.',
      },
      {
        heading: 'Why <frameset> Was Deprecated in Favor of <iframe>',
        explanation:
          'HTML4 `<frameset>` replaced `<body>` to split pages into rigid sub-documents, breaking the browser Back button, bookmarking, and screen readers. HTML5 removed `<frameset>` and kept `<iframe>` with strict `sandbox` tokens and mandatory `title` attributes.',
        keyInsight: 'Sandboxed `<iframe srcdoc="...">` powers modern browser code editors (including this app’s Code Sandbox!).',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing Form Submission & Validation Sequence',
      steps: [
        '1. User fills `<label>`-bound inputs and clicks `<button type="submit">`.',
        '2. Browser evaluates HTML5 constraints (`required`, `type="email"`, `pattern`); blocks & focuses first invalid control.',
        '3. On valid state, browser serializes `name=value` pairs into URL query (GET) or HTTP body (POST).',
        '4. JS `event.preventDefault()` intercepts submission in SPAs to dispatch asynchronous `fetch()` calls cleanly.',
      ],
    },
    diagram: {
      title: 'HTML Form Validation & GET vs POST Submission Pipeline',
      caption: 'Click stages to trace constraint checks and how GET URL encoding diverges from POST HTTP body encoding.',
      layout: 'flow',
      nodes: [
        { id: 'inputs', label: '<form> Controls', sublabel: 'label + input + name', detail: 'Every control needs a unique `name` attribute to be included in submission.', artifact: 'Fieldset / Label', col: 0, row: 0, tone: 'primary' },
        { id: 'check', label: 'HTML5 Validator', sublabel: 'required / pattern', detail: 'Browser checks constraints natively before firing `submit` event.', artifact: ':valid / :invalid', col: 1, row: 0, tone: 'secondary' },
        { id: 'get', label: 'GET Route', sublabel: 'URL ?k=v Query', detail: 'Appends encoded parameters to URL; ideal for search & filters (bookmarkable).', artifact: '?q=css&unit=2', col: 2, row: 0, tone: 'accent' },
        { id: 'post', label: 'POST Route', sublabel: 'HTTP Request Body', detail: 'Sends payload privately inside HTTP body; supports `multipart/form-data` files.', artifact: 'Encrypted Body', col: 2, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'inputs', to: 'check', label: 'Submit Click' },
        { from: 'check', to: 'get', label: 'method="GET"' },
        { from: 'check', to: 'post', label: 'method="POST"' },
      ],
    },
  },
  'u2-t3': {
    topicId: 'u2-t3',
    analogyTitle: 'Framed Photograph Inside a Shipping Box',
    analogy:
      'Think of every HTML element as a framed photograph in a shipping box: the **Content** is the photo itself, **Padding** is the matting inside the frame, **Border** is the wooden frame, and **Margin** is the empty air separating that frame from neighboring frames on the wall.',
    memoryHook: 'Specificity = (Inline 1000, #ID 100, .Class/:pseudo 10, tag 1) · Always prefer `box-sizing: border-box`!',
    structuredSections: [
      {
        heading: 'Three Stylesheet Attachment Methods & Precedence',
        explanation:
          '1) Inline (`style="..."`, weight 1000 — hard to maintain); 2) Internal (`<style>` inside `<head>`, single-page scope); 3) External (`<link rel="stylesheet" href="app.css">` — browser-cached, industry standard). Internal and External share equal origin priority and resolve by Specificity + last-loaded order.',
        keyInsight: 'External CSS files cache once across hundreds of pages, cutting repeat load times dramatically.',
      },
      {
        heading: 'Specificity Math Worked Out',
        explanation:
          'Count 4 buckets `(Inline, IDs, Classes/Attrs/Pseudo-classes, Elements/Pseudo-elements)`: `#nav .menu > li.active a:hover` has 1 ID (`#nav`), 3 Classes/Pseudo (`menu`, `active`, `:hover`), and 2 Elements (`li`, `a`) = `(0, 1, 3, 2)` or score `132`. Higher left-most bucket always wins regardless of how many tags sit on the right.',
        keyInsight: 'Ten class selectors `(0,0,10,0)` NEVER beat one ID selector `(0,1,0,0)`.',
      },
      {
        heading: 'content-box vs border-box Sizing',
        explanation:
          'Under default `content-box`, setting `width: 200px; padding: 20px; border: 5px` makes the actual rendered box `250px` wide (often breaking side-by-side layouts!). Under `box-sizing: border-box`, padding and border tuck INSIDE the declared `200px` total width.',
        keyInsight: 'Adding `*, *::before, *::after { box-sizing: border-box; }` at the top of CSS prevents layout overflow bugs.',
      },
    ],
    workedWalkthrough: {
      title: 'Step-by-Step Box Model Width Math',
      steps: [
        'Given CSS: `width: 240px; padding: 16px; border: 4px solid; margin: 12px;`',
        '1. Under `content-box`: Content = 240px; Rendered Box = 240 + 2(16) + 2(4) = 280px; Total Space = 280 + 2(12) = 304px.',
        '2. Under `border-box`: Rendered Box stays fixed at 240px; Content shrinks cleanly to 240 - 32 - 8 = 200px!',
      ],
    },
    diagram: {
      title: 'CSS Cascade Funnel & Concentric Box Model Layers',
      caption: 'Inspect how Cascade Specificity resolves style conflicts and how Content, Padding, Border, and Margin nest.',
      layout: 'layers',
      nodes: [
        { id: 'inline', label: '1. Inline Style', sublabel: 'Weight: 1000', detail: '`style="color:..."` directly on element; overrides external/internal selectors.', artifact: '(1, 0, 0, 0)', col: 0, row: 0, tone: 'accent' },
        { id: 'id', label: '2. #ID Selector', sublabel: 'Weight: 100', detail: 'Matches unique `#header` ID; dominates any number of classes or tags.', artifact: '(0, 1, 0, 0)', col: 1, row: 0, tone: 'primary' },
        { id: 'cls', label: '3. .Class / :hover', sublabel: 'Weight: 10', detail: 'Matches `.card`, `[type="text"]`, `:focus`, `:nth-child()`.', artifact: '(0, 0, 1, 0)', col: 2, row: 0, tone: 'secondary' },
        { id: 'tag', label: '4. Element / ::before', sublabel: 'Weight: 1', detail: 'Matches tag names (`p`, `h1`, `a`) and pseudo-elements (`::after`).', artifact: '(0, 0, 0, 1)', col: 2, row: 1, tone: 'neutral' },
        { id: 'box', label: 'Box Model Layers', sublabel: 'Content -> Pad -> Border -> Margin', detail: '`border-box` locks Rendered Box = Content + Padding + Border to declared `width`.', artifact: 'border-box', col: 0, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'inline', to: 'id', label: 'Higher Priority' },
        { from: 'id', to: 'cls', label: 'Beats' },
        { from: 'cls', to: 'tag', label: 'Beats' },
        { from: 'tag', to: 'box', label: 'Computed Geometry' },
      ],
    },
  },
  'u2-t4': {
    topicId: 'u2-t4',
    analogyTitle: 'Puppet Strings Controlled Live in Real Time',
    analogy:
      'Static HTML is a printed poster; Dynamic HTML (DHTML) connects JavaScript puppet strings to the live DOM tree so user clicks immediately update text, toggle CSS classes, and validate inputs without reprinting the page.',
    memoryHook: 'DHTML = HTML + CSS + DOM + JavaScript · Event Flow = Capture (Down) -> Target -> Bubble (Up)',
    structuredSections: [
      {
        heading: 'Four Pillars of Dynamic HTML (DHTML)',
        explanation:
          'DHTML is not a single language—it is the synergy of (1) HTML structure, (2) CSS visual styling, (3) the Document Object Model (DOM) API exposing every tag as a mutable JS object, and (4) JavaScript event listeners reacting instantaneously.',
        keyInsight: 'Changing `element.classList.toggle("open")` keeps visual styles in CSS while JS manages behavior cleanly.',
      },
      {
        heading: 'DOM Event Propagation: Capturing vs Bubbling & Event Delegation',
        explanation:
          'When you click a `<button>` inside a `<div>`, the event travels down from `window -> document -> div` (Capturing Phase), fires on the `<button>` (Target Phase), and bubbles back up `div -> document -> window` (Bubbling Phase). **Event Delegation** attaches ONE listener on a parent `<ul>` instead of 500 listeners on every `<li>`.',
        keyInsight: 'Check `event.target` inside a parent click listener for O(1) memory event delegation on large tables/lists.',
      },
      {
        heading: 'Preventing XSS & Layout Thrashing',
        explanation:
          'Always use `element.textContent` instead of `element.innerHTML` when inserting user-typed text to block Cross-Site Scripting (XSS) script injection. Defer heavy scripts using `<script defer>` in `<head>` so HTML parsing never pauses.',
        keyInsight: '`textContent` treats `<script>` literally as harmless text; `innerHTML` parses it as live HTML.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing a Click on `<button>` Inside `<ul id="menu">`',
      steps: [
        '1. Capture Phase: `window` -> `document` -> `<ul id="menu">` -> `<li>` -> `<button>` (listeners with `{ capture: true }` run here).',
        '2. Target Phase: Click handler on `<button>` executes (`event.target === button`).',
        '3. Bubble Phase: Event rises back up `<button>` -> `<li>` -> `<ul id="menu">`, where a delegated parent handler can inspect `event.target` unless `event.stopPropagation()` was called.',
      ],
    },
    diagram: {
      title: 'DOM Event Propagation Flowchart (Capture -> Target -> Bubble)',
      caption: 'Follow the signal downward during Capturing and upward during Bubbling across DOM ancestors.',
      layout: 'flow',
      nodes: [
        { id: 'win', label: '1. Window / Document', sublabel: 'Capture Entry', detail: 'Top-most root where browser begins downward Capture traversal.', artifact: 'capture: true', col: 0, row: 0, tone: 'neutral' },
        { id: 'parent', label: '2. Parent <ul id="list">', sublabel: 'Delegation Hub', detail: 'Ideal place to attach a single shared listener inspecting `e.target`.', artifact: 'Event Delegation', col: 1, row: 0, tone: 'secondary' },
        { id: 'target', label: '3. Target <button>', sublabel: 'Target Phase', detail: 'Actual clicked DOM element (`e.target`); fires target handlers.', artifact: 'e.target', col: 2, row: 0, tone: 'accent' },
        { id: 'bubble', label: '4. Bubble Back Up', sublabel: 'Default Listeners', detail: 'Bubbles back to `<ul>` and `document`; stopped only via `e.stopPropagation()`.', artifact: 'Bubbling Phase', col: 1, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'win', to: 'parent', label: 'Down (Capture)' },
        { from: 'parent', to: 'target', label: 'Reaches Target' },
        { from: 'target', to: 'bubble', label: 'Up (Bubble)' },
        { from: 'bubble', to: 'win', label: 'Reaches Root' },
      ],
    },
  },
  'u2-t5': {
    topicId: 'u2-t5',
    analogyTitle: 'Grammar Check (Well-Formed) vs Legal Contract Audit (Valid)',
    analogy:
      'Think of **Well-Formed XML** as checking spelling and punctuation (every quote closes, every tag matches `<book>...</book>`), while **Valid XML** is auditing that document against a strict blueprint (DTD or XSD) verifying `price` is truly a positive decimal number and `isbn` is mandatory.',
    memoryHook: 'Well-Formed = Syntax OK · Valid = Well-Formed + Matches DTD/XSD · XSD beats DTD via Data Types + XML Syntax + Namespaces',
    structuredSections: [
      {
        heading: 'Strict Rules for Well-Formed XML',
        explanation:
          'Unlike forgiving HTML5, XML rejects even tiny syntax errors: (1) Exactly one root element; (2) Every opening tag must close (`<br/>` self-closed); (3) Tags are case-sensitive (`<Book>` !== `<book>`); (4) Strictly nested (`<a><b></b></a>`); (5) Attribute values must be quoted.',
        keyInsight: 'A single unclosed tag makes an XML parser abort immediately rather than guessing.',
      },
      {
        heading: 'DTD (Legacy) vs XSD (XML Schema Definition)',
        explanation:
          'DTD uses non-XML EBNF notation (`<!ELEMENT book (title,price)>`) and only knows generic text (`#PCDATA`), ignoring whether `<price>` contains `"hello"` or `499.00`. XSD is written in valid XML itself, supports 40+ built-in types (`xs:integer`, `xs:decimal`, `xs:date`), enforces `minOccurs`/`maxOccurs`, and supports XML Namespaces (`xmlns:`).',
        keyInsight: 'Use XML Namespaces (`xmlns:bk="http://..."`) whenever merging two XML vocabularies that both use `<table>` or `<title>`.',
      },
    ],
    workedWalkthrough: {
      title: 'Validating `<book isbn="978"><price>450.50</price></book>` Against XSD',
      steps: [
        '1. Syntax Parser checks prolog, single root `<catalog>`, matching closing tags -> Well-Formed = PASS.',
        '2. XSD Validator checks `isbn` attribute `use="required"` -> PASS.',
        '3. XSD checks `<price>` against `type="xs:decimal"` -> `450.50` is valid decimal (whereas `"free"` would FAIL).',
      ],
    },
    diagram: {
      title: 'XML Validation Pipeline: Well-Formedness vs DTD/XSD Schema',
      caption: 'Trace why every Valid XML document must first pass Well-Formedness syntax checks before Schema validation.',
      layout: 'flow',
      nodes: [
        { id: 'raw', label: 'Raw XML File', sublabel: 'Prolog + Tags', detail: 'Begins with `<?xml version="1.0" encoding="UTF-8"?>` and single root tag.', artifact: '.xml Input', col: 0, row: 0, tone: 'neutral' },
        { id: 'wf', label: '1. Syntax Checker', sublabel: 'Well-Formedness', detail: 'Verifies single root, strict nesting, case-match, and quoted attributes.', artifact: 'Well-Formed?', col: 1, row: 0, tone: 'secondary' },
        { id: 'xsd', label: '2. DTD / XSD Engine', sublabel: 'Schema Rules', detail: 'XSD verifies element sequence, `minOccurs`, and `xs:decimal`/`xs:date` types.', artifact: 'Valid XML!', col: 2, row: 0, tone: 'primary' },
        { id: 'err', label: 'Fatal Abort', sublabel: 'Strict Rejection', detail: 'XML parsers stop immediately on any unclosed tag or schema mismatch.', artifact: 'Parser Error', col: 1, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'raw', to: 'wf', label: 'Tokenize' },
        { from: 'wf', to: 'xsd', label: 'Syntax OK' },
        { from: 'wf', to: 'err', label: 'Malformed Tag' },
        { from: 'xsd', to: 'err', label: 'Type Mismatch' },
      ],
    },
  },
  'u2-t6': {
    topicId: 'u2-t6',
    analogyTitle: 'Reading an Entire Book Into Memory (DOM) vs Reading Line-by-Line With a Bookmark (SAX)',
    analogy:
      'A **DOM Parser** photocopies the entire 1,000-page encyclopedia onto your desk so you can flip backward/forward and erase sentences (fast navigation, huge desk/RAM needed). A **SAX Parser** reads the book through a narrow keyhole line-by-line, shouting out events (`startElement`, `characters`, `endElement`)—needing almost zero desk RAM, even on a 5 GB XML dump.',
    memoryHook: 'DOM = Tree in RAM, Bidirectional, Read/Write · SAX = Forward Event Stream, O(1) RAM, Read-Only · XSLT = XPath XML->HTML',
    structuredSections: [
      {
        heading: 'DOM Parser (Tree-Based Model)',
        explanation:
          'Loads the complete XML file into RAM as a hierarchical tree of `Document`, `Element`, `Attr`, and `Text` nodes (~5x original file size in memory). Ideal for small/medium configs where random jumps or in-memory edits (`appendChild`, `removeChild`) are needed.',
        keyInsight: 'Loading a 1 GB XML file with DOM requires ~5 GB RAM and risks `OutOfMemoryError`.',
      },
      {
        heading: 'SAX Parser (Event-Driven Streaming)',
        explanation:
          'Scans top-to-bottom without storing nodes, firing lightweight callbacks: `startDocument()`, `startElement()`, `characters()`, `endElement()`, `endDocument()`. Memory stays constant `O(1)` regardless of file size, though you cannot jump backward or modify the XML directly.',
        keyInsight: 'Choose SAX (or StAX pull parsing) for large enterprise log/feed ingestion.',
      },
      {
        heading: 'Presenting XML With CSS & XSLT Transformations',
        explanation:
          'Plain XML has zero built-in browser layout. Link a stylesheet with `<?xml-stylesheet type="text/xsl" href="view.xsl"?>`. While CSS merely styles raw tags, **XSLT** uses **XPath** expressions (`/catalog/book/@isbn`) to sort, filter, and transform XML directly into semantic HTML tables.',
        keyInsight: 'XSLT decouples raw data feeds from HTML presentation templates cleanly.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing SAX Callbacks on `<book id="1">HTTP</book>`',
      steps: [
        '1. `startDocument()` -> initializes parser stream.',
        '2. `startElement("book", { id: "1" })` -> captures opening tag and attributes.',
        '3. `characters("HTTP")` -> delivers inner text buffer.',
        '4. `endElement("book")` -> finalizes element processing; node discarded from RAM immediately.',
      ],
    },
    diagram: {
      title: 'DOM Tree Parser vs SAX Event-Stream & XSLT Pipeline',
      caption: 'Compare in-memory DOM node retention against O(1) SAX sequential callbacks and XSLT output.',
      layout: 'compare',
      nodes: [
        { id: 'xml', label: 'XML Stream', sublabel: '100 MB Source File', detail: 'Same raw XML document fed to DOM, SAX, or XSLT processors.', artifact: 'data.xml', col: 0, row: 1, tone: 'neutral' },
        { id: 'dom', label: 'DOM Processor', sublabel: 'Full Tree in RAM (~500 MB)', detail: 'Bidirectional XPath/querySelector navigation + Read/Write node mutation.', artifact: 'Read / Write', col: 1, row: 0, tone: 'accent' },
        { id: 'sax', label: 'SAX Processor', sublabel: 'O(1) Constant RAM (~4 MB)', detail: 'Fires `startElement` -> `characters` -> `endElement` top-to-bottom.', artifact: 'Forward Read-Only', col: 1, row: 2, tone: 'primary' },
        { id: 'xslt', label: 'XSLT + XPath', sublabel: 'Transformation Engine', detail: 'Applies `<xsl:for-each select="...">` templates to emit styled HTML.', artifact: 'Rendered HTML', col: 2, row: 1, tone: 'secondary' },
      ],
      edges: [
        { from: 'xml', to: 'dom', label: 'Load Full Tree' },
        { from: 'xml', to: 'sax', label: 'Stream Events' },
        { from: 'dom', to: 'xslt', label: 'Transform via XPath' },
      ],
    },
  },
  'u3-t1': {
    topicId: 'u3-t1',
    analogyTitle: 'Ordering From Any Restaurant via a Universal Directory & Courier',
    analogy:
      'Think of SOA like a city directory: the Restaurant (**Service Provider**) lists its menu (**WSDL**) in the Yellow Pages (**UDDI Registry**). Your App (**Service Consumer**) looks up the restaurant address, then places orders directly using standardized sealed boxes (**SOAP/REST over HTTP**)—regardless of what kitchen equipment the restaurant uses internally.',
    memoryHook: 'SOA Triangle = Provider + Registry + Consumer · Operations = Publish -> Find -> Bind',
    structuredSections: [
      {
        heading: 'Three Actors & Three Operations in SOA',
        explanation:
          'Service-Oriented Architecture decouples software providers from consumers via three steps: (1) **Publish**: Provider registers endpoint and contract in Registry; (2) **Find**: Consumer queries Registry for matching capability; (3) **Bind**: Consumer connects directly to Provider at runtime.',
        keyInsight: 'Once bound, the Registry steps out of the data path so runtime traffic never bottlenecks on the directory.',
      },
      {
        heading: 'Loose Coupling & Platform Independence',
        explanation:
          'A Python mobile backend can cleanly invoke a Java banking service or .NET tax engine because both agree solely on an open text/XML/JSON contract over standard HTTP ports 80/443—passing safely through enterprise firewalls.',
        keyInsight: 'Clients depend on the interface contract, never the server’s internal language or database schema.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing Currency Conversion Between Python App & Java Bank Service',
      steps: [
        '1. Publish: Bank hosts `/fx-service` and publishes `fx.wsdl` in central registry.',
        '2. Find: E-commerce checkout app queries registry for "Currency Conversion" and downloads `fx.wsdl`.',
        '3. Bind: Checkout sends HTTP POST with `{ amount: 100, from: "USD", to: "INR" }` and receives `8345.00`.',
      ],
    },
    diagram: {
      title: 'Service-Oriented Architecture (SOA) Publish-Find-Bind Triangle',
      caption: 'Inspect the three distinct actors and the sequential order of Publish, Find, and Bind operations.',
      layout: 'triangle',
      nodes: [
        { id: 'reg', label: 'Service Registry (UDDI)', sublabel: 'Discovery Directory', detail: 'Catalogs published WSDL service contracts and business endpoints.', artifact: 'White/Yellow/Green', col: 1, row: 0, tone: 'primary' },
        { id: 'con', label: 'Service Consumer', sublabel: 'Client / Mobile / Web', detail: 'Searches registry for capability, generates proxy stub, and binds to provider.', artifact: 'Client Stub', col: 0, row: 1, tone: 'secondary' },
        { id: 'pro', label: 'Service Provider', sublabel: 'Java / .NET / Node Host', detail: 'Implements business logic and exposes SOAP/REST endpoint over HTTP.', artifact: 'WSDL + Endpoint', col: 2, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'pro', to: 'reg', label: '1. Publish (WSDL)' },
        { from: 'con', to: 'reg', label: '2. Find (Query)' },
        { from: 'con', to: 'pro', label: '3. Bind (HTTP/SOAP)', bidirectional: true },
      ],
    },
  },
  'u3-t2': {
    topicId: 'u3-t2',
    analogyTitle: 'Courier Envelope (SOAP) + Restaurant Menu (WSDL) + Phonebook (UDDI)',
    analogy:
      'Think of **SOAP** as the standardized courier envelope with an address label (`Header`) and parcel contents (`Body`); **WSDL** as the exact printed restaurant menu listing every dish name, ingredient type, and pickup counter URL; and **UDDI** as the Yellow Pages categorizing businesses.',
    memoryHook: 'SOAP = Envelope (Header? + Body + Fault?) · WSDL = types + message + portType + binding + service · UDDI = White/Yellow/Green',
    structuredSections: [
      {
        heading: 'Anatomy of a SOAP 1.1/1.2 XML Message',
        explanation:
          'Every SOAP payload is strictly wrapped in `<soap:Envelope>`. Inside sits an optional `<soap:Header>` for cross-cutting metadata (WS-Security signatures, API tokens, distributed transaction IDs) and a mandatory `<soap:Body>` containing the method call or response. Failures return `<soap:Fault>` inside Body with `faultcode` (`Client` vs `Server`) and `faultstring`.',
        keyInsight: 'Unlike REST (which puts auth in HTTP headers and errors in HTTP status codes), SOAP embeds both inside XML so they survive JMS/SMTP/MQ hops.',
      },
      {
        heading: 'WSDL 5-Part Contract Structure',
        explanation:
          'WSDL separates **Abstract** definitions from **Concrete** transport: `<types>` (XSD data structures), `<message>` (request/response parameter bundles), and `<portType>` (abstract operations like a Java interface) vs `<binding>` (protocol rules like SOAP over HTTP) and `<service>` (live `<soap:address location="https://..."/>`).',
        keyInsight: 'Automated tools (`wsimport`) read WSDL once to generate strongly typed client stubs with compile-time checking.',
      },
      {
        heading: 'UDDI Three Directory Views',
        explanation:
          'UDDI organizes services into **White Pages** (company name, address, phone), **Yellow Pages** (industry classification like Banking or Logistics), and **Green Pages** (technical WSDL pointers and invocation bindings).',
        keyInsight: 'While public global UDDI faded in favor of developer API portals, private enterprise registries (Kong/Apigee/Consul) continue the exact same role.',
      },
    ],
    workedWalkthrough: {
      title: 'Reading a WSDL Bottom-to-Top Before Sending SOAP',
      steps: [
        '1. Check `<service>` -> find endpoint URL `https://exam.qu.edu/gpa`.',
        '2. Check `<binding>` -> confirm SOAP Document/Literal over HTTP POST.',
        '3. Check `<portType>` -> locate `<operation name="GetStudentGPA">`.',
        '4. Check `<message>` & `<types>` -> format `<RollNumber>` as `xs:string` inside `<soap:Body>`.',
      ],
    },
    diagram: {
      title: 'SOAP Message Framing & 5-Layer WSDL Contract Stack',
      caption: 'Inspect how WSDL abstract types map down to concrete URLs and wrap inside SOAP Envelopes.',
      layout: 'layers',
      nodes: [
        { id: 'env', label: '<soap:Envelope>', sublabel: 'Root XML Namespace', detail: 'Mandatory outer root declaring SOAP 1.1 or 1.2 namespaces.', artifact: 'xmlns:soap', col: 0, row: 0, tone: 'primary' },
        { id: 'hdr', label: '<soap:Header>', sublabel: 'Optional Metadata', detail: 'Carries WS-Security tokens, routing, and transaction timestamps.', artifact: 'Auth / Trace', col: 1, row: 0, tone: 'neutral' },
        { id: 'bdy', label: '<soap:Body>', sublabel: 'Mandatory Payload / Fault', detail: 'Holds RPC input/output XML or `<soap:Fault>` (`faultcode`, `faultstring`).', artifact: 'RPC / Fault', col: 2, row: 0, tone: 'accent' },
        { id: 'abs', label: 'WSDL Abstract', sublabel: 'types + message + portType', detail: 'Defines XSD schemas, parameter bundles, and platform-neutral operations.', artifact: 'Interface', col: 0, row: 1, tone: 'secondary' },
        { id: 'con', label: 'WSDL Concrete', sublabel: 'binding + service', detail: 'Binds operations to SOAP/HTTP and publishes concrete endpoint URLs.', artifact: 'Endpoint URL', col: 1, row: 1, tone: 'primary' },
        { id: 'uddi', label: 'UDDI Directory', sublabel: 'White · Yellow · Green', detail: 'Business contact (White), industry taxonomy (Yellow), technical WSDL (Green).', artifact: 'Registry', col: 2, row: 1, tone: 'neutral' },
      ],
      edges: [
        { from: 'uddi', to: 'con', label: 'Points to WSDL' },
        { from: 'abs', to: 'con', label: 'Bound to Transport' },
        { from: 'con', to: 'env', label: 'Generates Wire Message' },
        { from: 'env', to: 'hdr', label: 'Contains' },
        { from: 'env', to: 'bdy', label: 'Contains' },
      ],
    },
  },
  'u3-t3': {
    topicId: 'u3-t3',
    analogyTitle: 'Architect Blueprint First (Top-Down) vs Build House Then Draw Floorplan (Bottom-Up)',
    analogy:
      'In **Top-Down (Contract-First)** development, architects finalize the exact WSDL blueprint first so frontend and backend teams build in parallel without mismatch. In **Bottom-Up (Code-First)**, you write the server class first and let tooling auto-generate the WSDL afterward.',
    memoryHook: 'Top-Down = WSDL First (Best Interoperability) · Bottom-Up = Code First (Fastest Prototype) · Stub Marshals <-> Skeleton Unmarshals',
    structuredSections: [
      {
        heading: 'How Client Stubs & Server Skeletons Hide Network Complexity',
        explanation:
          'When your client invokes `stub.getGrade(88)`, the generated **Client Stub** serializes `88` into XML/JSON (marshalling) and dispatches an HTTP POST. On the server container (Tomcat/Node), the **Server Skeleton** receives bytes, deserializes them back into native variables (unmarshalling), invokes your actual business class, and returns the result.',
        keyInsight: 'Developers write normal local method calls while stubs/skeletons automate XML/HTTP boilerplate.',
      },
      {
        heading: 'Packaging, Deployment & Smoke Verification',
        explanation:
          'Compiled classes and descriptors bundle into a WAR/JAR/container image deployed on an application server. Appending `?wsdl` (or `/openapi.json`) exposes the live contract for tools like Postman, SoapUI, and automated integration tests.',
        keyInsight: 'Always enable CORS headers, TLS termination, and `/health` probes before exposing services externally.',
      },
    ],
    workedWalkthrough: {
      title: '5-Step Top-Down Service Deployment Lifecycle',
      steps: [
        '1. Author `GradeService.wsdl` + XSD schemas defining exact input/output types.',
        '2. Run `wsimport` / codegen to emit server skeleton interface.',
        '3. Implement business logic class and deploy WAR/container onto server port.',
        '4. Verify `GET /GradeService?wsdl` returns HTTP 200 XML contract.',
        '5. Generate client stub from live WSDL and run automated test assertions.',
      ],
    },
    diagram: {
      title: 'Client Stub <-> Server Skeleton Marshalling & Deployment Flow',
      caption: 'Inspect how local method calls transform into network XML/JSON packets and execute on deployed servers.',
      layout: 'flow',
      nodes: [
        { id: 'app', label: 'Client App', sublabel: 'Calls stub.getGrade(88)', detail: 'Application code invokes a normal typed function without touching raw HTTP.', artifact: 'Local Call', col: 0, row: 0, tone: 'primary' },
        { id: 'stub', label: 'Client Stub', sublabel: 'Marshalling Proxy', detail: 'Generated from WSDL/OpenAPI; serializes parameters into XML/JSON payload.', artifact: 'Marshal Bytes', col: 1, row: 0, tone: 'secondary' },
        { id: 'wire', label: 'HTTPS Network', sublabel: 'POST /service', detail: 'Encrypted HTTP transport across firewalls and load balancers.', artifact: 'TLS + POST', col: 1, row: 1, tone: 'neutral' },
        { id: 'skel', label: 'Server Skeleton', sublabel: 'Tomcat / Express / Axis', detail: 'Validates payload, unmarshals types, and dispatches to server implementation.', artifact: 'Unmarshal', col: 2, row: 1, tone: 'accent' },
        { id: 'impl', label: 'Service Logic', sublabel: '@WebMethod Impl', detail: 'Executes business rules/DB query and returns `"A+"` back up the chain.', artifact: 'Return "A+"', col: 2, row: 0, tone: 'primary' },
      ],
      edges: [
        { from: 'app', to: 'stub', label: 'Invoke' },
        { from: 'stub', to: 'wire', label: 'Serialize' },
        { from: 'wire', to: 'skel', label: 'HTTP POST' },
        { from: 'skel', to: 'impl', label: 'Dispatch' },
      ],
    },
  },
  'u3-t4': {
    topicId: 'u3-t4',
    analogyTitle: 'Universal United Nations Translator Headset (ORB + IDL)',
    analogy:
      'Imagine a Java diplomat and a C++ diplomat speaking different languages across rooms: **OMG IDL** is their shared neutral phrasebook, the **ORB** is the interpreter network connecting both rooms, and **IIOP** is the fast binary intercom wire carrying their words.',
    memoryHook: 'OMG IDL (Interface) -> Client Stub -> Client ORB -> GIOP/IIOP (Binary TCP) -> Server ORB -> POA -> Skeleton -> Servant',
    structuredSections: [
      {
        heading: 'OMG IDL & Language-Independent Distributed Objects',
        explanation:
          'Unlike stateful Web Services, CORBA treats remote server instances as live objects referenced by an **IOR (Interoperable Object Reference)**. You write one `.idl` contract using directional parameters (`in`, `out`, `inout`), and the IDL compiler outputs C++ Skeletons and Java Stubs.',
        keyInsight: 'Binary GIOP/IIOP serialization is several times denser and faster than verbose XML inside trusted LANs.',
      },
      {
        heading: 'Why HTTP Web Services & gRPC Succeeded CORBA on the Open Web',
        explanation:
          'CORBA relied on custom TCP/IIOP ports blocked by corporate firewalls, heavy stateful object lifecycles, and complex vendor ORB setups. HTTP-based SOAP/REST sailed cleanly through Port 80/443, though modern **gRPC** revived CORBA’s IDL + binary speed using `.proto` files over HTTP/2!',
        keyInsight: 'CORBA = Stateful Binary LAN Middleware; Web Services = Stateless Text/HTTP Internet Integration.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing a Java Client Calling a C++ Bank Servant via CORBA',
      steps: [
        '1. Java client calls `accountStub.getBalance("A101")` using IOR obtained from CORBA Naming Service.',
        '2. Java Client Stub packs arguments and hands them to the Client ORB.',
        '3. Client ORB encodes a binary GIOP/IIOP TCP packet to the remote Server ORB.',
        '4. Server ORB + POA (Portable Object Adapter) wake the C++ Servant via Skeleton and return the float balance.',
      ],
    },
    diagram: {
      title: 'CORBA Distributed Object Request Broker Architecture',
      caption: 'Click any middleware layer from OMG IDL Stub through IIOP binary wire to the POA Servant.',
      layout: 'flow',
      nodes: [
        { id: 'cli', label: 'Client (Java)', sublabel: 'Invokes Local Ref', detail: 'Calls method on narrow-casted object stub using CORBA Naming Service.', artifact: 'IOR Reference', col: 0, row: 0, tone: 'primary' },
        { id: 'cstub', label: 'IDL Client Stub', sublabel: 'Compiled from .idl', detail: 'Marshals parameters into language-neutral CDR binary format.', artifact: 'CDR Binary', col: 1, row: 0, tone: 'secondary' },
        { id: 'corb', label: 'Client ORB', sublabel: 'GIOP / IIOP', detail: 'Locates target server and streams binary IIOP packet over TCP.', artifact: 'IIOP TCP', col: 2, row: 0, tone: 'neutral' },
        { id: 'sorb', label: 'Server ORB + POA', sublabel: 'Object Adapter', detail: 'Receives IIOP frame; Portable Object Adapter activates target servant.', artifact: 'POA Dispatch', col: 2, row: 1, tone: 'accent' },
        { id: 'sskel', label: 'IDL Skeleton', sublabel: 'C++ Server Proxy', detail: 'Unmarshals binary parameters and calls the actual C++ Servant method.', artifact: 'Servant Return', col: 0, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'cli', to: 'cstub', label: 'Method Call' },
        { from: 'cstub', to: 'corb', label: 'Marshal' },
        { from: 'corb', to: 'sorb', label: 'IIOP Wire', bidirectional: true },
        { from: 'sorb', to: 'sskel', label: 'POA Route' },
      ],
    },
  },
  'u3-t5': {
    topicId: 'u3-t5',
    analogyTitle: 'Replacing Only the Burnt Lightbulb Instead of Rebuilding the House',
    analogy:
      'Traditional synchronous forms act like demolishing and rebuilding the entire house just to replace one kitchen bulb (blank white flicker, lost scroll position, redownloading CSS/JS). **AJAX** sends a quiet runner in the background to fetch a 2 KB JSON bulb and swaps just that single element in place.',
    memoryHook: 'readyState: 0 UNSENT · 1 OPENED · 2 HEADERS · 3 LOADING · 4 DONE · Always check readyState===4 && status===200!',
    structuredSections: [
      {
        heading: 'How Asynchronous Execution Prevents UI Freezing',
        explanation:
          'When `xhr.open("GET", url, true)` runs (`async = true`), JavaScript hands the network call to the browser’s Networking thread and immediately returns control to the UI thread—so users keep typing and scrolling smoothly while data streams in the background.',
        keyInsight: 'Never pass `false` for async—synchronous XHR locks the browser tab until the network responds.',
      },
      {
        heading: 'The 5 `readyState` Milestones & Modern `fetch()`',
        explanation:
          'Classic XHR fires `onreadystatechange` across 5 stages: `0` (created), `1` (`open()` called), `2` (headers arrived), `3` (body downloading), `4` (complete). You MUST check BOTH `readyState === 4` AND `status === 200` (because 404/500 responses also reach state 4!). Modern apps wrap the exact same mechanism in Promise-based `fetch()` + `async/await`.',
        keyInsight: 'AJAX cuts wire payloads by 90–98% because shared headers, navbars, and stylesheets stay intact in RAM.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing Autocomplete Search Keystroke With AJAX',
      steps: [
        '1. Student types `"ht"` in search bar -> debounced JS fires `fetch("/api/topics?q=ht")`.',
        '2. UI thread stays 100% responsive; user types `"tp"` without stutter.',
        '3. Server returns tiny 600-byte JSON array `["HTTP", "HTTPS"]` instead of a 180 KB HTML page.',
        '4. Callback patches only `<ul id="results">` in <5 ms with zero page flicker.',
      ],
    },
    diagram: {
      title: 'Synchronous Reload Blocking vs Asynchronous AJAX XHR Timeline',
      caption: 'Click stages to see why AJAX eliminates UI freeze and cuts 98% of redundant HTML/CSS transfers.',
      layout: 'flow',
      nodes: [
        { id: 'ev', label: '1. User Event', sublabel: 'oninput / onclick', detail: 'JS calls `e.preventDefault()` so browser does not discard current DOM.', artifact: 'Non-Blocking', col: 0, row: 0, tone: 'primary' },
        { id: 'xhr', label: '2. XHR / fetch()', sublabel: 'readyState 0 -> 1', detail: 'Networking thread dispatches background HTTP request while UI stays smooth.', artifact: 'Async Thread', col: 1, row: 0, tone: 'secondary' },
        { id: 'srv', label: '3. Server JSON', sublabel: 'readyState 2 -> 3 -> 4', detail: 'Returns compact 2 KB JSON delta with HTTP `200 OK` instead of 180 KB HTML.', artifact: '98% Bandwidth Saved', col: 2, row: 0, tone: 'accent' },
        { id: 'dom', label: '4. Partial DOM Patch', sublabel: 'Update Target Node', detail: 'Callback updates only target list/card while preserving scroll & focus.', artifact: 'Zero Flicker', col: 1, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'ev', to: 'xhr', label: 'Dispatch Async' },
        { from: 'xhr', to: 'srv', label: 'Background GET/POST' },
        { from: 'srv', to: 'dom', label: 'readyState 4 / 200' },
      ],
    },
  },
  'u4-t1': {
    topicId: 'u4-t1',
    analogyTitle: 'Printed Newspaper (Web 1.0) vs Collaborative Town Square (Web 2.0)',
    analogy:
      'Web 1.0 was a glass museum display case—only the curator could edit the signs while visitors merely read. Web 2.0 handed every visitor a pen and whiteboard: writing **Blogs**, co-editing **Wikis**, and connecting profiles on **Social Networks**.',
    memoryHook: 'Web 1.0 = Read-Only Broadcast · Web 2.0 = Read-Write Participatory UGC (Blogs, Wikis, SNS, Folksonomy)',
    structuredSections: [
      {
        heading: 'Three Defining Pillars: Blogs, Wikis, and Social Networks',
        explanation:
          '**Blogs** democratized chronological publishing with comment conversations; **Wikis** (Wikipedia) pioneered collective multi-author knowledge bases protected by complete version revision histories; **Social Networking Sites** linked human identity graphs with algorithmic status streams and user-tagged **Folksonomies** (`#hashtags`).',
        keyInsight: 'Architecture of Participation: platforms grow more valuable as more users contribute, vote, and tag.',
      },
      {
        heading: 'Engineering Risks of User-Generated Content (UGC)',
        explanation:
          'Accepting HTML/text from millions of strangers introduces **Cross-Site Scripting (XSS)** and spam/misinformation risks. Web 2.0 backends must sanitize HTML inputs, escape outputs, and provide moderation/version-rollback controls.',
        keyInsight: 'Never trust raw UGC input—sanitize on the server and escape when rendering.',
      },
    ],
    workedWalkthrough: {
      title: 'How Wikipedia’s Wiki Revision Engine Works',
      steps: [
        '1. Contributor clicks "Edit" on an article and modifies a paragraph in browser.',
        '2. Server stores a new immutable revision delta with author IP/username and timestamp (never overwrites old history!).',
        '3. Community moderators inspect visual diff and click "Undo" in 1 click if vandalism occurs.',
      ],
    },
    diagram: {
      title: 'Web 1.0 One-Way Broadcast vs Web 2.0 Participatory Loop',
      caption: 'Compare static brochure publishing against the dynamic Read-Write user contribution loop.',
      layout: 'compare',
      nodes: [
        { id: 'w1', label: 'Web 1.0 Webmaster', sublabel: 'Static HTML + FTP', detail: 'Single owner uploads brochure pages; visitors only consume read-only text.', artifact: 'One-to-Many', col: 0, row: 0, tone: 'neutral' },
        { id: 'ugc', label: 'Web 2.0 Users', sublabel: 'Authors & Curators', detail: 'Publish blog posts, edit wiki revisions, upvote Q&As, and add #tags.', artifact: 'Read-Write UGC', col: 1, row: 0, tone: 'primary' },
        { id: 'cms', label: 'Dynamic CMS / DB', sublabel: 'Sanitize + Version', detail: 'Stores structured articles, revision diffs, and social graph edges safely.', artifact: 'XSS Sanitized', col: 2, row: 0, tone: 'secondary' },
        { id: 'feed', label: 'Live Social Feed', sublabel: 'Collective Intelligence', detail: 'Surfaces highest-voted answers and trending tags via AJAX & RSS.', artifact: 'Network Effect', col: 1, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'ugc', to: 'cms', label: 'Create / Edit' },
        { from: 'cms', to: 'feed', label: 'Publish & Rank' },
        { from: 'feed', to: 'ugc', label: 'Vote / Comment' },
      ],
    },
  },
  'u4-t2': {
    topicId: 'u4-t2',
    analogyTitle: 'Newspaper Wire Subscription (RSS) + Prefab Building Kit (Ruby on Rails)',
    analogy:
      'Think of **RSS** as a newspaper wire automatically dropping headlines into your mailbox so you never manually check 50 websites, **Ruby on Rails** as a standardized prefab toolkit that skips tedious configuration, and **Open APIs** as standardized power outlets letting apps plug into Maps or Payments.',
    memoryHook: 'Web 2.0 Tech Stack = AJAX (Speed) + RSS (Syndication XML) + Rails (CoC & DRY) + Open APIs (OAuth Mashups)',
    structuredSections: [
      {
        heading: 'RSS 2.0 Syndication Mechanics',
        explanation:
          'Instead of scraping messy HTML layouts, sites publish clean XML at `/feed.xml` (`<rss version="2.0"><channel><item><title>...`). Feed aggregators and podcast apps poll this lightweight XML automatically whenever new episodes or posts drop.',
        keyInsight: 'Every Apple/Spotify podcast globally still distributes audio files via RSS `<enclosure>` XML feeds!',
      },
      {
        heading: 'Ruby on Rails: CoC & DRY Design Philosophy',
        explanation:
          'Rails revolutionized web backends with **Convention over Configuration (CoC)**—putting `ArticlesController` in `app/controllers/` automatically wires routes and views without giant XML configs—and **Don’t Repeat Yourself (DRY)** via shared MVC filters and database migrations.',
        keyInsight: 'CoC and DRY directly inspired modern frameworks including Django, Laravel, Spring Boot, and Next.js.',
      },
      {
        heading: 'Open APIs & Delegated OAuth 2.0',
        explanation:
          'Open APIs let apps programmatically request Google Maps tiles, Stripe charges, or GitHub repos. **OAuth 2.0** allows users to grant scoped permission ("Read my calendar") via tokens without ever typing their Google password into third-party apps.',
        keyInsight: 'Never embed private Open API secret keys in client-side JS—proxy via server routes or scoped OAuth tokens.',
      },
    ],
    workedWalkthrough: {
      title: 'How One Rails Controller Serves Both Humans & Open API Consumers',
      steps: [
        '1. Request `GET /articles` arrives -> CoC routes directly to `ArticlesController#index`.',
        '2. `before_action` (DRY) verifies auth token once across all actions.',
        '3. HTML browsers receive rendered view; mobile/AJAX clients (`Accept: application/json`) receive clean JSON; aggregators read `/articles.rss`.',
      ],
    },
    diagram: {
      title: 'Web 2.0 Core Technology Stack Architecture',
      caption: 'Trace how Rails MVC powers HTML views, RSS XML feeds, and Open JSON APIs consumed by AJAX.',
      layout: 'flow',
      nodes: [
        { id: 'rails', label: 'Rails / MVC Core', sublabel: 'CoC & DRY Backend', detail: 'ActiveRecord ORM + Convention routing eliminates boilerplate config.', artifact: 'Model-View-Ctrl', col: 0, row: 1, tone: 'primary' },
        { id: 'rss', label: 'RSS 2.0 Feed', sublabel: '<channel><item>', detail: 'Emits standardized XML headlines for feed readers & podcast apps.', artifact: '/feed.xml', col: 1, row: 0, tone: 'neutral' },
        { id: 'api', label: 'Open JSON API', sublabel: 'REST + OAuth 2.0', detail: 'Exposes programmable JSON endpoints protected by scoped bearer tokens.', artifact: '/api/v1/posts', col: 1, row: 1, tone: 'secondary' },
        { id: 'ajax', label: 'AJAX Frontend', sublabel: 'fetch() + DOM', detail: 'Fetches incremental JSON updates asynchronously for instant UX.', artifact: 'Rich Web App', col: 2, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'rails', to: 'rss', label: 'Emits XML' },
        { from: 'rails', to: 'api', label: 'Exposes JSON' },
        { from: 'api', to: 'ajax', label: 'Consumes Async' },
      ],
    },
  },
  'u4-t3': {
    topicId: 'u4-t3',
    analogyTitle: 'Reading Words (Web 2.0) vs Understanding Relationships (Web 3.0 Semantic Web)',
    analogy:
      'A classic search engine seeing the word "Apple" doesn’t know if you mean the fruit, the record label, or the tech giant. The **Semantic Web (RDF)** links exact entity IDs in sentences of three parts: `(Subject) --[Predicate]--> (Object)`, letting computers reason about facts like a human librarian.',
    memoryHook: 'RDF Triple = (Subject, Predicate, Object) · OWL = Ontology Rules · SPARQL = Graph Query · Mashup = 2+ APIs Combined',
    structuredSections: [
      {
        heading: 'RDF Triples & Global URIs',
        explanation:
          'Resource Description Framework models all knowledge as directed labeled graph edges: `(ex:CS35302, ex:taughtAt, ex:QuantumUniversity)`. Because entities use globally unique HTTP URIs (and modern `JSON-LD` Schema.org tags), datasets from Wikipedia, libraries, and universities merge without naming collisions.',
        keyInsight: 'Think of RDF as a massive global graph database where every edge carries explicit meaning.',
      },
      {
        heading: 'OWL Ontologies & SPARQL Reasoning',
        explanation:
          '**RDFS / OWL (Web Ontology Language)** defines formal logic rules—e.g., `Professor subClassOf Faculty` and `locatedIn is Transitive`. If Roorkee is in Uttarakhand and Uttarakhand is in India, a reasoner infers Quantum University is in India automatically! **SPARQL** queries these triples like SQL queries tables.',
        keyInsight: 'Schema.org JSON-LD inside `<script type="application/ld+json">` powers Google Knowledge Panels and rich recipe/course cards.',
      },
      {
        heading: 'Widgets vs API Mashups',
        explanation:
          'A **Widget** is a portable mini-UI module embedded in another site (weather box, stock ticker). A **Mashup** synthesizes data from 2+ independent Open APIs into a brand-new composite experience (e.g., combining live Flight Radar positions + Weather API + Google Maps).',
        keyInsight: 'Mashups deliver exponential value by recombining existing open web services.',
      },
    ],
    workedWalkthrough: {
      title: 'Inferring New Facts via an RDF + OWL Graph',
      steps: [
        '1. Stored Fact 1: `(QuantumUniversity, locatedIn, Roorkee)`.',
        '2. Stored Fact 2: `(Roorkee, partOf, Uttarakhand)`.',
        '3. OWL Rule: `locatedIn` + `partOf` implies geographic containment.',
        '4. SPARQL Query `SELECT ?univ WHERE { ?univ inState Uttarakhand }` returns `QuantumUniversity` automatically!',
      ],
    },
    diagram: {
      title: 'Semantic Web Knowledge Graph & RDF Triple Architecture',
      caption: 'Click nodes to trace Subject-Predicate-Object triples, OWL inference rules, and Mashup composition.',
      layout: 'flow',
      nodes: [
        { id: 'subj', label: 'Subject URI', sublabel: 'ex:CS35302', detail: 'Globally unique identifier representing a Course, Person, or Place.', artifact: 'Entity Node', col: 0, row: 0, tone: 'primary' },
        { id: 'pred', label: 'Predicate URI', sublabel: 'ex:offeredBy', detail: 'Typed relationship edge governed by Schema.org or OWL Ontology rules.', artifact: 'Typed Edge', col: 1, row: 0, tone: 'accent' },
        { id: 'obj', label: 'Object / Literal', sublabel: 'ex:QuantumUniv', detail: 'Target entity URI or typed literal value ("4 Credits", "Roorkee").', artifact: 'Target / Value', col: 2, row: 0, tone: 'secondary' },
        { id: 'sparql', label: 'SPARQL / JSON-LD', sublabel: 'Query & Rich Cards', detail: 'Powers Google Knowledge Graph panels and cross-dataset semantic queries.', artifact: 'Rich SERP', col: 1, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'subj', to: 'pred', label: 'Has Relation' },
        { from: 'pred', to: 'obj', label: 'Points To' },
        { from: 'obj', to: 'sparql', label: 'Indexed for Query' },
      ],
    },
  },
  'u4-t4': {
    topicId: 'u4-t4',
    analogyTitle: 'Back-of-Book Index (Search Engine) vs Personal Librarian (Recommender)',
    analogy:
      'Instead of flipping through 10 billion book pages when you ask for "SOAP", a **Search Engine** flips straight to the back-of-book **Inverted Index** under `S -> SOAP -> [Pages 14, 88, 302]`. Meanwhile, a **Recommender System** acts like a librarian noticing you loved three distributed-systems books and suggesting a fourth.',
    memoryHook: 'Search = Crawl (robots.txt) -> Inverted Index -> Rank (TF-IDF + PageRank) · Recommenders = Content vs Collaborative vs Hybrid',
    structuredSections: [
      {
        heading: 'Search Engine 3-Stage Architecture',
        explanation:
          '1) **Crawling**: Spiders obey `robots.txt` and traverse hyperlinks into a frontier queue. 2) **Indexing**: Strip HTML, normalize lowercase, remove stop words (`the`, `is`), stem roots (`running -> run`), and populate an **Inverted Index** (`term -> [docIDs]`). 3) **Ranking**: Combine query relevance (**TF-IDF**: term frequency vs global rarity) with link authority (**PageRank**: votes from reputable linking sites).',
        keyInsight: 'Inverted Indexes reduce full-corpus search from `O(N pages)` down to instant `O(1)` dictionary lookups.',
      },
      {
        heading: 'Recommender Systems & The Cold-Start Problem',
        explanation:
          '**Content-Based Filtering** matches item metadata tags against your personal history (works for brand-new items, but creates narrow echo chambers). **Collaborative Filtering** builds a User-Item matrix to match peer taste ("Users similar to you rated X 5 stars"—great serendipity, fails on brand-new users/items = **Cold-Start Problem**). Modern platforms use **Hybrid** engines.',
        keyInsight: 'Ask onboarding topic preferences on signup + popularity defaults to overcome new-user Cold Start.',
      },
    ],
    workedWalkthrough: {
      title: 'Building an Inverted Index & Computing TF-IDF Intuition',
      steps: [
        '1. Corpus: D0 = `"http protocol web"`, D1 = `"soap xml protocol"`.',
        '2. Inverted Index: `http -> [0]`, `protocol -> [0, 1]`, `soap -> [1]`, `web -> [0]`, `xml -> [1]`.',
        '3. Query `"http"`: Rare word (`df=1`) gets higher IDF weight than `"protocol"` (`df=2`), ranking D0 #1 instantly!',
      ],
    },
    diagram: {
      title: 'Search Engine Pipeline (Crawl -> Inverted Index -> Rank)',
      caption: 'Click any pipeline phase from polite `robots.txt` crawling to TF-IDF/PageRank scoring.',
      layout: 'flow',
      nodes: [
        { id: 'crawl', label: '1. Web Crawler', sublabel: 'Spiders + robots.txt', detail: 'Fetches HTML pages respecting `Disallow` rules and XML sitemaps.', artifact: 'URL Frontier', col: 0, row: 0, tone: 'neutral' },
        { id: 'tok', label: '2. Text Analyzer', sublabel: 'Tokenize & Stem', detail: 'Strips HTML tags, removes stop words, and normalizes word roots.', artifact: 'Clean Tokens', col: 1, row: 0, tone: 'secondary' },
        { id: 'inv', label: '3. Inverted Index', sublabel: 'Word -> [DocIDs]', detail: 'Maps every term directly to sorted posting lists of documents.', artifact: 'http -> [0, 2]', col: 2, row: 0, tone: 'primary' },
        { id: 'rank', label: '4. Ranker & SERP', sublabel: 'TF-IDF + PageRank', detail: 'Scores relevance + inbound link authority in <50 milliseconds.', artifact: 'Top-N Results', col: 1, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'crawl', to: 'tok', label: 'Raw HTML' },
        { from: 'tok', to: 'inv', label: 'Build Postings' },
        { from: 'inv', to: 'rank', label: 'Query Match' },
      ],
    },
  },
  'u4-t5': {
    topicId: 'u4-t5',
    analogyTitle: 'Wax-Sealed Ledger (Blockchain) + Neighborhood Corner Store (Edge) + Reading Lamp (Dark Mode)',
    analogy:
      'Think of **Blockchain** as a tamper-evident ledger where changing one old line breaks every subsequent page’s seal; **Edge Computing** as putting mini-warehouses in 300 cities instead of shipping every package from one warehouse; and **Dark Mode** as dimming harsh glare at night.',
    memoryHook: 'Blockchain = SHA-256 Hash Integrity · Edge = Compute Near User (<20ms TTFB) · Dark Mode = prefers-color-scheme + >=4.5:1 Contrast',
    structuredSections: [
      {
        heading: 'When Blockchain Adds Genuine Value (and When It Doesn’t)',
        explanation:
          'Every block stores a SHA-256 hash of its own data PLUS the previous block’s hash. Altering 1 character breaks the entire chain downstream. Use it for multi-party trust, verifiable university transcripts, and tamper-proof audit logs—NOT ordinary single-company CRUD databases.',
        keyInsight: 'The SHA-256 "Avalanche Effect" flips ~50% of hash bits if even a single comma changes.',
      },
      {
        heading: 'Edge Computing vs Single-Origin Cloud Latency',
        explanation:
          'Even at the speed of light in fiber, a packet from Roorkee to Virginia takes ~200 ms round-trip. Edge Computing runs auth checks, A/B routing, and HTML streaming in V8 isolates at regional CDN Points of Presence (PoPs) just ~15–25 ms away.',
        keyInsight: 'Cutting Time to First Byte (TTFB) directly lifts SEO rankings and user engagement.',
      },
      {
        heading: 'Accessible Dark Mode Engineering',
        explanation:
          'Wire CSS custom properties under `@media (prefers-color-scheme: dark)` plus an explicit user toggle saved in `localStorage`. Never use pure `#000000` with `#FFFFFF` text—it causes glowing halation blur; use deep slate/charcoal surfaces (`#0B1215`) and soft off-white text (`#EDF4F2`).',
        keyInsight: 'OLED screens physically turn off dark pixels, reducing mobile battery drain.',
      },
    ],
    workedWalkthrough: {
      title: 'Why Changing 1 Rupee Breaks an Entire Hash Chain',
      steps: [
        '1. Block #1 (`Fee: 50000`) -> Hash = `a94f...`.',
        '2. Block #2 stores `PrevHash: a94f...` + its own transactions -> Hash = `7c12...`.',
        '3. Attacker alters Block #1 to `Fee: 500` -> Block #1 Hash becomes `f30e...`, immediately invalidating Block #2’s `PrevHash`!',
      ],
    },
    diagram: {
      title: 'Hash-Linked Blockchain Blocks & Global Edge PoP Proximity',
      caption: 'Explore cryptographic hash-chaining across blocks alongside regional Edge PoP latency savings.',
      layout: 'flow',
      nodes: [
        { id: 'b1', label: 'Block #1', sublabel: 'Data + SHA-256', detail: 'Computes deterministic 256-bit fingerprint from payload + nonce.', artifact: 'Hash: 0xA94F...', col: 0, row: 0, tone: 'primary' },
        { id: 'b2', label: 'Block #2', sublabel: 'PrevHash: 0xA94F...', detail: 'Embeds Block #1 hash; tampering #1 invalidates #2 and all later blocks.', artifact: 'Hash: 0x7C12...', col: 1, row: 0, tone: 'secondary' },
        { id: 'edge', label: 'Edge PoP (20ms)', sublabel: '300+ Global Cities', detail: 'Executes auth & cache close to the student instead of 200ms origin.', artifact: '< 20 ms TTFB', col: 2, row: 0, tone: 'accent' },
        { id: 'theme', label: 'CSS Token Switch', sublabel: 'prefers-color-scheme', detail: 'Swaps `:root` and `.dark` surface variables with WCAG >= 4.5:1 contrast.', artifact: 'Light / Dark', col: 1, row: 1, tone: 'neutral' },
      ],
      edges: [
        { from: 'b1', to: 'b2', label: 'Chained PrevHash' },
        { from: 'b2', to: 'edge', label: 'Served at Edge' },
        { from: 'edge', to: 'theme', label: 'Adaptive Render' },
      ],
    },
  },
  'u5-t1': {
    topicId: 'u5-t1',
    analogyTitle: 'Self-Service Library (Web 1-3) vs Proactive Research Assistant (Web 4.0)',
    analogy:
      'In Web 1.0–3.0 you manually search, click 10 tabs, and synthesize notes yourself. **Web 4.0 (Symbiotic Web)** embeds intelligent agents and local browser AI (WebGPU) that understand your context, retrieve verified sources, and adapt workflows proactively.',
    memoryHook: 'Web 1 (Docs) -> Web 2 (Social) -> Web 3 (Semantic Data) -> Web 4 (Symbiotic AI + WebGPU + Context)',
    structuredSections: [
      {
        heading: 'Four Generations of the Web Compared',
        explanation:
          'Web 1.0 connected static documents; Web 2.0 connected people via UGC & AJAX; Web 3.0 connected structured meaning via RDF/OWL; Web 4.0 integrates ambient AI reasoning, voice/multimodal interfaces, and real-world sensors into proactive workflows.',
        keyInsight: 'Retrieval-Augmented Generation (RAG) grounds AI synthesis in verified facts rather than hallucinated guesses.',
      },
      {
        heading: 'Client-Side Inference with WebGPU & Privacy Balance',
        explanation:
          'Modern browsers expose **WebGPU** and **WebAssembly**, running neural networks directly on the user’s GPU without uploading private files to remote servers. Meanwhile, ethical Web 4.0 design mitigates algorithmic filter bubbles and ensures transparent opt-out controls.',
        keyInsight: 'Progressive enhancement ensures features degrade cleanly when `navigator.gpu` is unavailable.',
      },
    ],
    workedWalkthrough: {
      title: 'Tracing a Grounded Web 4.0 Study Query',
      steps: [
        '1. Learner highlights a tricky protocol step and asks for an analogy.',
        '2. Semantic retriever fetches verified syllabus section (RAG grounding).',
        '3. Local WebGPU / Cloud model formats tailored quiz + analogy respecting learner mastery level.',
      ],
    },
    diagram: {
      title: 'Web 1.0 -> Web 4.0 Evolution & Context-Aware AI Pipeline',
      caption: 'Click across the four eras or inspect how WebGPU + RAG ground personalized responses.',
      layout: 'flow',
      nodes: [
        { id: 'w1', label: 'Web 1.0 (1991)', sublabel: 'Static Hypertext', detail: 'Read-only HTML documents linked over HTTP.', artifact: 'Connects Docs', col: 0, row: 0, tone: 'neutral' },
        { id: 'w2', label: 'Web 2.0 (2004)', sublabel: 'Social & AJAX', detail: 'Read-Write blogs, wikis, Open APIs, and dynamic SPAs.', artifact: 'Connects People', col: 1, row: 0, tone: 'secondary' },
        { id: 'w3', label: 'Web 3.0', sublabel: 'Semantic RDF', detail: 'Machine-readable RDF triples, OWL ontologies, and SPARQL.', artifact: 'Connects Data', col: 2, row: 0, tone: 'accent' },
        { id: 'w4', label: 'Web 4.0', sublabel: 'Symbiotic AI Web', detail: 'Proactive agents, WebGPU local ML, RAG grounding, and adaptive UX.', artifact: 'Connects Intelligence', col: 1, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'w1', to: 'w2', label: 'Interactive UGC' },
        { from: 'w2', to: 'w3', label: 'Semantic Meaning' },
        { from: 'w3', to: 'w4', label: 'AI Synthesis' },
      ],
    },
  },
  'u5-t2': {
    topicId: 'u5-t2',
    analogyTitle: 'Asking "Which House Has It?" (HTTP) vs Asking "Who Has Book ISBN-978?" (IPFS)',
    analogy:
      'HTTP URLs use **Location Addressing**: "Go to Server X, Room 4" (if Server X burns down, 404 Link Rot!). **IPFS** uses **Content Addressing**: every file gets a cryptographic fingerprint (**CID**), so any neighbor holding an exact matching copy can hand it to you—and your browser verifies not a single bit was altered!',
    memoryHook: 'HTTP = Location URL · IPFS = Content Hash (CID) via DHT · Smart Contracts = On-Chain Rules · DID = Self-Owned Identity',
    structuredSections: [
      {
        heading: 'IPFS Content Addressing & Merkle DAGs',
        explanation:
          'IPFS splits large files into 256 KB blocks, hashes each into a Merkle DAG, and derives a unique Content Identifier (`bafy...`). A Distributed Hash Table (`libp2p DHT`) tracks which peers pin that CID. Because the address IS the hash, tampering is mathematically impossible.',
        keyInsight: 'Popular content automatically caches across multiple peers instead of hammering one origin server.',
      },
      {
        heading: 'dApps, Smart Contracts & W3C Decentralized Identifiers (DIDs)',
        explanation:
          'A Decentralized Application (dApp) pairs a standard React/HTML frontend with **Smart Contracts** (deterministic code running on blockchains) and **DIDs** (user-controlled cryptographic keypairs replacing centralized OAuth silos).',
        keyInsight: 'Best practice: Store large files off-chain on IPFS and store only compact CID hashes on-chain to avoid huge gas fees.',
      },
    ],
    workedWalkthrough: {
      title: 'Fetching a Lecture PDF via IPFS vs HTTP',
      steps: [
        '1. Author hashes `notes.pdf` -> receives immutable `CID = ipfs://bafybeig4...`.',
        '2. Student requests `ipfs://bafybeig4...` -> DHT locates 3 nearby peers pinning those blocks.',
        '3. Browser downloads chunks in parallel and hashes them -> matches `bafybeig4...` = 100% authentic.',
      ],
    },
    diagram: {
      title: 'HTTP Location Addressing vs IPFS Content-Addressed P2P Flow',
      caption: 'Inspect how CID cryptographic hashing and DHT peer discovery eliminate single-server 404 failures.',
      layout: 'compare',
      nodes: [
        { id: 'http', label: 'HTTP Location URL', sublabel: 'https://srv.com/a.pdf', detail: 'Points to one specific server address; breaks (404) if server goes offline.', artifact: 'Single Origin', col: 0, row: 0, tone: 'neutral' },
        { id: 'hash', label: 'IPFS Merkle Hash', sublabel: 'ipfs://bafy...', detail: 'Computes cryptographic Content ID directly from file bytes.', artifact: 'Immutable CID', col: 1, row: 0, tone: 'primary' },
        { id: 'dht', label: 'libp2p DHT Peers', sublabel: 'Multi-Peer Fetch', detail: 'Discovers any peer holding matching CID chunks and verifies integrity locally.', artifact: 'Zero Tampering', col: 2, row: 0, tone: 'secondary' },
        { id: 'dapp', label: 'Smart Contract + DID', sublabel: 'Wallet Auth & Proof', detail: 'Anchors CID ownership on-chain without centralized password databases.', artifact: 'dApp State', col: 1, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'hash', to: 'dht', label: 'Locate Pinning Peers' },
        { from: 'dht', to: 'dapp', label: 'Verify On-Chain CID' },
      ],
    },
  },
  'u5-t3': {
    topicId: 'u5-t3',
    analogyTitle: 'Factory Sensors Speaking One Web Language (Web of Things)',
    analogy:
      'Think of raw IoT sensors as workers speaking dozens of local dialects (BLE, Zigbee, serial bytes). The **W3C Web of Things (WoT)** gives every sensor a universal JSON-LD passport (**Thing Description**) and connects them over **MQTT** + **WebSockets** so any browser can watch temperature charts live and flip a cooling fan.',
    memoryHook: 'Sensors -> MQTT Pub/Sub Broker -> WoT Gateway -> WebSocket (wss://) -> Live Browser Dashboard',
    structuredSections: [
      {
        heading: 'Why MQTT & WebSockets Beat HTTP Polling for IoT',
        explanation:
          'Polling an HTTP server every second wastes battery and repeats bulky HTTP headers. **MQTT** uses a tiny 2-byte header Pub/Sub broker (`lab/temp`) ideal for constrained microcontrollers (ESP32), while **WebSockets (`wss://`)** maintain a full-duplex pipe streaming live frames straight into browser charts.',
        keyInsight: 'Also throttle 100 Hz raw hardware streams down to 5 Hz UI batches so browser charts stay butter-smooth.',
      },
      {
        heading: 'W3C Thing Descriptions & Hardware Security',
        explanation:
          'A JSON-LD Thing Description advertises device **Properties** (`temperature`), **Actions** (`toggleFan`), and **Events** (`overheatAlert`) cleanly. Always enforce TLS (`wss://`, MQTTS) and unique per-device certificates.',
        keyInsight: 'Modern browsers can also talk directly to USB/BLE devices over HTTPS via Web Serial & Web Bluetooth APIs.',
      },
    ],
    workedWalkthrough: {
      title: 'Closed-Loop Smart Lab Cooling Automation',
      steps: [
        '1. ESP32 sensor samples `29.4°C` and publishes `{ temp: 29.4 }` to MQTT topic `lab/room2/temp`.',
        '2. Cloud WoT bridge pushes event frame over persistent `wss://` WebSocket to browser console.',
        '3. Rule (`temp > 28°C`) triggers WebSocket command back down to relay actuator: `Fan = ON`.',
      ],
    },
    diagram: {
      title: 'IoT & Web of Things (WoT) Bidirectional Telemetry Pipeline',
      caption: 'Trace real-time sensor readings flowing via MQTT & WebSockets to browser dashboards and back to actuators.',
      layout: 'flow',
      nodes: [
        { id: 'sen', label: 'Edge Sensor (ESP32)', sublabel: '29.4 °C Sample', detail: 'Reads physical temperature/humidity and encodes tiny JSON telemetry.', artifact: 'Hardware Node', col: 0, row: 0, tone: 'neutral' },
        { id: 'mqtt', label: 'MQTT Broker', sublabel: '2-Byte Pub/Sub', detail: 'Routes topic `lab/temp` reliably across thousands of low-power nodes.', artifact: 'MQTTS TLS', col: 1, row: 0, tone: 'secondary' },
        { id: 'ws', label: 'WoT WebSocket', sublabel: 'Full-Duplex wss://', detail: 'Streams real-time frames to browsers without HTTP polling overhead.', artifact: 'Thing Desc JSON-LD', col: 2, row: 0, tone: 'primary' },
        { id: 'act', label: 'Dashboard -> Actuator', sublabel: 'Auto-Fan ON', detail: 'Visualizes live chart and dispatches control command back to relay.', artifact: 'Closed Loop', col: 1, row: 1, tone: 'accent' },
      ],
      edges: [
        { from: 'sen', to: 'mqtt', label: 'Publish' },
        { from: 'mqtt', to: 'ws', label: 'Bridge Push' },
        { from: 'ws', to: 'act', label: 'Live UI', bidirectional: true },
      ],
    },
  },
  'u5-t4': {
    topicId: 'u5-t4',
    analogyTitle: 'Click-to-Enter Virtual Museum Without Installing an App',
    analogy:
      'Think of **VR (`immersive-vr`)** as stepping inside a fully digital 3D planetarium, while **AR (`immersive-ar`)** is placing a virtual 3D engine right onto your physical wooden desk through your phone camera. **WebXR** lets both happen instantly from a normal webpage URL!',
    memoryHook: 'WebXR API + WebGL/Three.js + .glb (glTF 3D) · 3DoF (Rotate) vs 6DoF (Rotate + Move) · Hit Testing = Ray onto Real Floor',
    structuredSections: [
      {
        heading: 'WebXR Session Lifecycle & Frame Timing',
        explanation:
          'First check `navigator.xr.isSessionSupported("immersive-ar")`. Inside a user click handler, call `requestSession()`. Critically, use `xrSession.requestAnimationFrame()`—NOT `window.requestAnimationFrame()`—so frames lock cleanly to 72–120 Hz headset displays without motion sickness.',
        keyInsight: 'Low frame rates or mismatched eye matrices cause immediate VR simulator nausea.',
      },
      {
        heading: '3DoF vs 6DoF Tracking, Hit Testing & glTF Assets',
        explanation:
          '**3DoF** tracks only head rotation (pitch, yaw, roll); **6DoF** adds full X/Y/Z spatial walking. In Mobile AR, **Hit Testing** casts rays from your camera to detect flat tables/floors for anchoring objects. Always ship models in binary **`.glb` (glTF)** compressed with Draco for fast web loads.',
        keyInsight: 'glTF maps vertex and PBR texture buffers almost directly to GPU memory.',
      },
    ],
    workedWalkthrough: {
      title: 'Progressive Enhancement for a 3D Campus Tour',
      steps: [
        '1. Desktop/Standard Mobile: Renders interactive Three.js `<canvas>` orbit preview inline.',
        '2. AR-Capable Phone: "View on Desk (AR)" launches `immersive-ar` Hit-Test placement.',
        '3. VR Headset: "Enter VR" switches seamlessly to stereoscopic 6DoF `immersive-vr`.',
      ],
    },
    diagram: {
      title: 'WebXR Device API & Three.js Rendering Pipeline',
      caption: 'Inspect the user-gesture check, 6DoF sensor pose acquisition, and stereoscopic/AR composite frame loop.',
      layout: 'flow',
      nodes: [
        { id: 'cap', label: '1. Capability Check', sublabel: 'navigator.xr', detail: 'Verifies `immersive-vr` or `immersive-ar` support and reveals launch button.', artifact: 'isSessionSupported', col: 0, row: 0, tone: 'neutral' },
        { id: 'ses', label: '2. XRSession Start', sublabel: 'User Click Gesture', detail: 'Requests camera/headset permissions cleanly upon explicit user tap.', artifact: 'requestSession()', col: 1, row: 0, tone: 'secondary' },
        { id: 'pose', label: '3. 6DoF Pose & Hit', sublabel: 'XRViewerPose', detail: 'Reads headset spatial transform + real-world plane hit-test anchors.', artifact: '72-120 Hz Loop', col: 2, row: 0, tone: 'accent' },
        { id: 'gpu', label: '4. WebGL / Three.js', sublabel: 'Render .glb Mesh', detail: 'Draws compressed glTF 3D scenes into eye buffers or camera feed.', artifact: 'Composite Frame', col: 1, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'cap', to: 'ses', label: 'User Tap' },
        { from: 'ses', to: 'pose', label: 'XR rAF Tick' },
        { from: 'pose', to: 'gpu', label: 'View Matrix' },
      ],
    },
  },
  'u5-t5': {
    topicId: 'u5-t5',
    analogyTitle: 'Chameleon UI Adapting to Environment + Robot QA Tester',
    analogy:
      'Responsive design only stretches to fit phone vs desktop screens. An **Adaptive Interface** is a smart chameleon: shrinking media on slow 2G connections (`saveData`), stopping dizzying animations (`prefers-reduced-motion`), and enlarging buttons on touchscreens (`pointer: coarse`). Meanwhile, **Web Automation** uses headless Chromium robots (Playwright) to test every button automatically before deployment.',
    memoryHook: 'Responsive = Screen Width · Adaptive = Network + Accessibility + Intent · Playwright = Auto-Waiting E2E Browser Automation',
    structuredSections: [
      {
        heading: 'CSS & Network Adaptive Signals',
        explanation:
          'Modern browsers expose rich environmental signals: `@media (prefers-reduced-motion: reduce)` prevents vestibular discomfort; `@media (pointer: coarse)` ensures >=44px touch targets; `navigator.connection.saveData` replaces heavy videos with crisp SVG summaries.',
        keyInsight: 'Designing for accessibility and low bandwidth creates faster, cleaner experiences for every user.',
      },
      {
        heading: 'Headless Web Automation & Ethical Standards',
        explanation:
          'Tools like **Playwright** and **Puppeteer** automate real browser engines in CI/CD pipelines—clicking forms, asserting DOM invariants, and catching layout regressions without brittle `sleep()` delays. For external automation, always favor official APIs and respect `robots.txt` + rate limits.',
        keyInsight: 'Condition-based auto-waiting (`await expect(el).toBeVisible()`) eliminates flaky UI tests.',
      },
    ],
    workedWalkthrough: {
      title: 'How Playwright Verifies Zero Regressions on Every Push',
      steps: [
        '1. CI launches headless Chromium against built app on port 3000.',
        '2. Script clicks Topic 2.3 -> toggles Complete -> reloads page -> asserts `1 / 27 topics` persists.',
        '3. Evaluates `scrollWidth <= clientWidth` at `390x844` mobile to guarantee zero horizontal clipping.',
      ],
    },
    diagram: {
      title: 'Adaptive Interface Context Loop & Playwright Automation Flow',
      caption: 'Explore how user/device context adapts UI rendering and how Playwright validates DOM invariants.',
      layout: 'compare',
      nodes: [
        { id: 'sig', label: 'Context Signals', sublabel: 'Motion / Touch / 2G', detail: 'Reads `prefers-reduced-motion`, `pointer: coarse`, and `saveData`.', artifact: 'Media Queries', col: 0, row: 0, tone: 'secondary' },
        { id: 'aui', label: 'Adaptive UI Rules', sublabel: 'Dynamic Ergonomics', detail: 'Disables parallax, boosts tap target >=44px, swaps heavy assets for SVG.', artifact: 'Accessible UX', col: 1, row: 0, tone: 'primary' },
        { id: 'pw', label: 'Playwright Runner', sublabel: 'Headless Chromium', detail: 'Drives clicks, fills forms, and inspects accessibility tree snapshots.', artifact: 'CI/CD Gate', col: 2, row: 0, tone: 'accent' },
      ],
      edges: [
        { from: 'sig', to: 'aui', label: 'Morph UI' },
        { from: 'aui', to: 'pw', label: 'Verify E2E' },
      ],
    },
  },
  'u5-t6': {
    topicId: 'u5-t6',
    analogyTitle: 'upgrading a Country Dirt Road to a Multi-Lane Bullet-Train Hub',
    analogy:
      '5G is not just "faster YouTube on phones." It brings three superhighways at once: **eMBB** (10 Gbps cargo speed for instant 3D/PWA loads), **URLLC** (1 ms bullet-train reflexes for live cloud WebXR & WebRTC), and **mMTC** (1 million sensor lanes per km² for Smart Cities).',
    memoryHook: '5G IMT-2020 = eMBB (Speed) + URLLC (~1ms Latency) + mMTC (1M IoT/km²) + MEC (Cell-Tower Edge Compute)',
    structuredSections: [
      {
        heading: 'The Three 5G Pillars & Their Web Impact',
        explanation:
          '**eMBB (Enhanced Mobile Broadband)**: Peak 10 Gbps speeds let heavy PWAs and 4K WebRTC streams hydrate instantaneously. **URLLC (Ultra-Reliable Low Latency, ~1 ms radio RTT)**: Unlocks collaborative whiteboards, multiplayer browser games, and edge-streamed WebXR. **mMTC**: Connects 1M sensors/km² directly into Web of Things dashboards.',
        keyInsight: '5G shifts mobile web apps from "offline-compromised lite versions" to full desktop-class real-time power.',
      },
      {
        heading: 'Multi-Access Edge Computing (MEC) + Progressive Enhancement',
        explanation:
          'MEC places GPU and compute blades directly inside 5G telecom cell towers, cutting distance to users to single-digit kilometers. Even so, engineers must retain Service Worker caching and adaptive bitrates because radio signals still drop inside basements and elevators.',
        keyInsight: 'Design for 5G capability while keeping 3G/offline resilience via Service Workers.',
      },
    ],
    workedWalkthrough: {
      title: 'Quantifying 4G vs 5G for a 50 MB 3D WebXR Scene',
      steps: [
        '1. Bits to transfer = `50 MB * 8 = 400 Megabits`.',
        '2. On 4G LTE (35 Mbps + 50ms RTT): `(400 / 35) * 1000 + 50 = ~11,479 ms` (11.5 seconds wait!).',
        '3. On 5G eMBB/URLLC (1000 Mbps + 4ms RTT): `(400 / 1000) * 1000 + 4 = 404 ms` (under half a second!).',
      ],
    },
    diagram: {
      title: '5G Three-Pillar Architecture & Multi-Access Edge Computing (MEC)',
      caption: 'Click any 5G pillar or MEC Edge node to see exact latency, density, and web technology breakthroughs.',
      layout: 'triangle',
      nodes: [
        { id: 'embb', label: 'eMBB (1-10 Gbps)', sublabel: 'Mobile Broadband', detail: 'Instant PWA loading, 4K/8K WebRTC video, and rich `.glb` 3D assets.', artifact: 'High Bandwidth', col: 0, row: 0, tone: 'primary' },
        { id: 'urllc', label: 'URLLC (~1 ms RTT)', sublabel: 'Ultra-Low Latency', detail: 'Real-time multiplayer WebSockets, WebRTC DataChannels, and cloud WebXR.', artifact: '1 ms Radio Link', col: 1, row: 0, tone: 'accent' },
        { id: 'mmtc', label: 'mMTC (1M / km²)', sublabel: 'Massive IoT Density', detail: 'Streams urban smart-grid, traffic, and wearable sensors into WoT dashboards.', artifact: '1M Nodes/km²', col: 2, row: 0, tone: 'secondary' },
        { id: 'mec', label: '5G MEC Edge Node', sublabel: 'Cell-Tower Compute', detail: 'Runs AI inference & cloud rendering at the cell tower with Service Worker backup.', artifact: 'Sub-10ms E2E', col: 1, row: 1, tone: 'primary' },
      ],
      edges: [
        { from: 'embb', to: 'mec', label: 'Gigabit Stream' },
        { from: 'urllc', to: 'mec', label: '1ms Sync' },
        { from: 'mmtc', to: 'mec', label: 'IoT Telemetry' },
      ],
    },
  },
};

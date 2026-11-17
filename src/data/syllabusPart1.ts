import type { Unit } from '../types/syllabus';

export const SYLLABUS_UNITS_PART_1: Unit[] = [
  {
    unitNumber: 1,
    unitCode: 'Unit 01',
    title: 'Internet, WWW, HTML Basics & Core Protocols',
    hours: 7,
    officialSyllabus:
      'History of the Internet, World Wide Web-HTML, protocols: HTTP, SMTP, POP3, MIME, IMAP, Domain Name Server, Web Browsers, Web Servers.',
    topics: [
      {
        id: 'u1-t1',
        code: '1.1',
        title: 'History of the Internet & World Wide Web (WWW)',
        bloom: 'L1 / L2 · Understand',
        readMinutes: 6,
        keywords: ['ARPANET', 'TCP/IP', 'Tim Berners-Lee', 'Packet Switching', 'W3C'],
        summary:
          'Evolution from ARPANET (1969) and TCP/IP standardization (1983) to Tim Berners-Lee’s creation of the World Wide Web (1989–1991) at CERN.',
        definition:
          'The Internet is a global physical network of interconnected computer networks using the TCP/IP protocol suite. The World Wide Web (WWW), invented by Sir Tim Berners-Lee at CERN in 1989, is an application-layer information space of hypertext documents accessed over the Internet via HTTP and URLs.',
        purpose:
          'To provide a fault-tolerant, decentralized packet-switched infrastructure (Internet) paired with a universal, platform-independent document linking system (WWW).',
        whyNeeded:
          'Before packet switching and open web standards, computer networks were isolated proprietary silos. Decoupling content from hardware allowed any machine globally to publish and retrieve knowledge.',
        detailedTheory: [
          'The foundation of modern digital networking began with ARPANET in 1969, funded by the US Department of Defense (DARPA). Unlike traditional circuit-switched telephone lines that dedicate an entire physical wire per call, ARPANET pioneered packet switching—breaking messages into small discrete packets routed independently across resilient paths.',
          'On January 1, 1983 ("Flag Day"), ARPANET officially adopted TCP/IP (designed by Vint Cerf and Bob Kahn) as its universal transport and internetworking suite, establishing the modern Internet.',
          'In 1989 at CERN, Sir Tim Berners-Lee proposed a hypertext system so physicists on incompatible machines could link research notes. Between 1989 and 1991, he unified three foundational pillars: HTML (document markup), URL/URI (universal addressing), and HTTP (stateless request-response transfer), alongside the first browser-editor (WorldWideWeb).',
          'In 1993, Marc Andreessen released NCSA Mosaic, the first popular graphical browser with inline images, sparking global adoption and leading to the founding of the World Wide Web Consortium (W3C) in 1994 to steward open, royalty-free web standards.',
        ],
        mechanismSteps: [
          { step: 1, title: 'URL Input & Parsing', detail: 'Browser parses scheme (https), host (quantumuniversity.edu.in), and resource path.', artifact: 'https://quantumuniversity.edu.in/' },
          { step: 2, title: 'DNS Name Resolution', detail: 'Local resolver queries DNS hierarchy to map hostname to an IPv4/IPv6 address.', artifact: '104.21.45.12' },
          { step: 3, title: 'TCP 3-Way Handshake', detail: 'Client and server synchronize sequence numbers via SYN, SYN-ACK, and ACK.', artifact: 'TCP Port 443' },
          { step: 4, title: 'TLS Encryption', detail: 'TLS 1.3 negotiates cipher suites and derives symmetric session keys.', artifact: 'TLS 1.3' },
          { step: 5, title: 'HTTP GET & Response', detail: 'Browser sends GET request; web server streams back HTML bytes with 200 OK.', artifact: '200 OK' },
          { step: 6, title: 'DOM & Paint', detail: 'Browser builds DOM + CSSOM trees, computes layout geometry, and paints pixels.', artifact: 'Render Tree' },
        ],
        keyTakeaways: [
          'Packet Switching vs Circuit Switching: Packets share bandwidth dynamically and route around broken links.',
          'Three Pillars of WWW: HTML (Structure), URL (Address), and HTTP (Transport).',
          'Internet vs WWW: The Internet is the highway infrastructure; the WWW is one vehicle/service running on top of it (alongside Email, FTP, and VoIP).',
          'W3C Governance: Ensures HTML, CSS, and accessibility standards remain open and vendor-neutral.',
        ],
        realWorldExamples: [
          'Global Content Delivery Networks (Cloudflare, Akamai) cache HTTP assets across 300+ edge cities connected by submarine fiber cables.',
          'RESTful cloud microservices rely directly on the stateless HTTP design introduced with the early Web.',
        ],
        comparisonTable: {
          title: 'Internet vs World Wide Web (WWW)',
          headers: ['Dimension', 'The Internet', 'World Wide Web (WWW)'],
          rows: [
            ['Nature', 'Hardware-based global network of networks', 'Software-based information space of linked pages'],
            ['Origin', 'ARPANET (1969), TCP/IP by Vint Cerf & Bob Kahn', 'CERN (1989), Sir Tim Berners-Lee'],
            ['Core Protocols', 'TCP/IP, UDP, ICMP, BGP', 'HTTP, HTTPS'],
            ['Components', 'Routers, switches, fiber cables, ISPs', 'HTML documents, browsers, web servers, URLs'],
          ],
        },
        simulationId: 'http-lifecycle',
        simulationCaption: 'Step through a live URL request from DNS lookup and TCP handshake to browser DOM rendering.',
        examples: {
          basic: {
            title: 'Hypertext Link Connecting Web Nodes',
            language: 'html',
            runnableInSandbox: true,
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hypertext Origin</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #faf6f0; color: #24160e; }
    a { color: #4a2c1d; font-weight: 600; }
  </style>
</head>
<body>
  <h2>Hypertext Navigation</h2>
  <p>Tim Berners-Lee linked decentralized research notes using anchor tags:</p>
  <a href="#details" onclick="document.getElementById('out').textContent='Navigated via Hypertext link!'">
    Inspect 1989 CERN Proposal Summary
  </a>
  <p id="out" style="margin-top:12px; color:#2d5a43;"></p>
</body>
</html>`,
            expectedOutput: 'Interactive link updates the status paragraph without leaving the document.',
            explanation: 'Demonstrates Ted Nelson and Tim Berners-Lee’s core hypertext concept—connecting documents and sections with anchor nodes.',
          },
          intermediate: {
            title: 'Inspecting an HTTP Fetch Round-Trip',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Client-Side HTTP Timing Inspector</h3>
  <button onclick="measureRequest()" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">
    Simulate HTTP GET Timing
  </button>
  <pre id="log" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:12px;"></pre>
</div>
<script>
  function measureRequest() {
    const start = performance.now();
    setTimeout(() => {
      const elapsed = (performance.now() - start).toFixed(1);
      document.getElementById('log').textContent =
        'Method: GET /index.html HTTP/1.1\\nStatus: 200 OK\\nRound-Trip Latency: ' + elapsed + ' ms';
    }, 45);
  }
</script>`,
            expectedOutput: 'Displays simulated HTTP/1.1 status 200 OK and measured round-trip time.',
            explanation: 'Uses the browser Performance API to measure request-response timing.',
          },
          advanced: {
            title: 'Minimal Node.js HTTP Web Server',
            language: 'javascript',
            runnableInSandbox: false,
            code: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'X-Course-Code': 'CS35302'
  });
  res.end('<h1>Quantum University Web Tech Server</h1><p>Served over TCP/IP socket.</p>');
});

server.listen(3000, () => {
  console.log('HTTP Server listening on http://localhost:3000');
});`,
            expectedOutput: 'HTTP Server listening on http://localhost:3000; browser renders H1 and paragraph.',
            explanation: 'Binds a raw TCP listener socket using Node’s built-in http module and writes RFC-compliant headers and HTML body.',
          },
        },
        mistakes: [
          { mistake: 'Treating the Internet and the World Wide Web as identical terms.', fix: 'Specify Internet when referring to TCP/IP infrastructure and WWW when referring to HTTP/HTML web services.' },
          { mistake: 'Omitting <meta charset="UTF-8"> in HTML documents, causing garbled symbols.', fix: 'Declare UTF-8 inside the first 1024 bytes of <head>.' },
        ],
        bestPractices: [
          'Always separate network infrastructure concepts (TCP/IP, routers) from application-layer concepts (HTTP, browsers).',
          'Standardize on UTF-8 character encoding across HTML, APIs, and databases.',
        ],
        quiz: [
          {
            question: 'In which year did ARPANET officially transition to the TCP/IP protocol suite?',
            options: ['1969', '1983', '1989', '1994'],
            correctIndex: 1,
            explanation: 'January 1, 1983 ("Flag Day") marked ARPANET’s official transition to TCP/IP.',
          },
          {
            question: 'Which of the following is NOT one of the three original pillars of the World Wide Web?',
            options: ['HTML', 'HTTP', 'URL / URI', 'CORBA'],
            correctIndex: 3,
            explanation: 'Tim Berners-Lee unified HTML, HTTP, and URL/URI. CORBA is an object middleware standard.',
          },
          {
            question: 'Why is packet switching superior to circuit switching for the Internet?',
            options: [
              'It reserves a physical copper wire for one user forever',
              'It breaks data into small packets that dynamically route around damaged links',
              'It disables error checking',
              'It only works over satellite links',
            ],
            correctIndex: 1,
            explanation: 'Packet switching shares network links efficiently and routes packets independently around failures.',
          },
        ],
        flashcards: [
          { front: 'Internet vs WWW?', back: 'Internet = global TCP/IP hardware network. WWW = hypertext document service running on top of it via HTTP.' },
          { front: '3 Pillars of the WWW?', back: '1) HTML (markup), 2) HTTP (transfer protocol), 3) URL (addressing).' },
          { front: 'Why was Mosaic (1993) historic?', back: 'First widely popular graphical web browser with inline images, driving mainstream Web adoption.' },
        ],
        assignment: {
          task: 'Write a short Node.js script using the built-in `dns` module to resolve `quantumuniversity.edu.in` and print its IPv4 address.',
          hint: 'Use `dns.lookup(hostname, callback)`.',
          solution: `const dns = require('dns');\ndns.lookup('quantumuniversity.edu.in', (err, address) => {\n  if (err) throw err;\n  console.log('Resolved IP:', address);\n});`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between the Internet and the World Wide Web (WWW).',
            answer: 'The Internet is the global physical network of interconnected computers and routers communicating via TCP/IP. The WWW is a software service operating on top of the Internet that lets users navigate hypertext documents via HTTP and web browsers.',
          },
          {
            marks: '7M',
            question: 'Trace the evolution of the Internet from ARPANET to the modern WWW and explain the request-response lifecycle when a user opens a URL.',
            answer: '1) Evolution: ARPANET (1969 packet switching) -> TCP/IP adoption (1983) -> Tim Berners-Lee’s WWW at CERN (1989: HTML, HTTP, URL) -> Mosaic (1993) & W3C (1994). 2) Lifecycle: Browser parses URL -> DNS resolves domain to IP -> TCP 3-way handshake -> TLS encryption -> HTTP GET request -> Server responds with 200 OK HTML -> Browser builds DOM/CSSOM, computes layout, and paints screen.',
          },
        ],
      },
      {
        id: 'u1-t2',
        code: '1.2',
        title: 'World Wide Web — HTML Fundamentals & Structure',
        bloom: 'L2 / L3 · Apply',
        readMinutes: 5,
        keywords: ['HTML5', 'DOCTYPE', 'Semantic Tags', 'DOM Tree', 'Void Elements'],
        summary:
          'Anatomy of an HTML5 document, DOCTYPE standards mode, head metadata, semantic landmarks, and block vs inline flow.',
        definition:
          'HTML (HyperText Markup Language) is the standard markup language for structuring web documents. HyperText links documents via <a> anchors, while Markup annotates text and media into a tree of elements parsed by the browser into the Document Object Model (DOM).',
        purpose:
          'To express clean document hierarchy, semantic meaning, and machine-readable metadata independently of visual CSS styling.',
        whyNeeded:
          'Without semantic structure, search crawlers cannot index page hierarchies and screen readers cannot announce landmarks to visually impaired users.',
        detailedTheory: [
          'Every modern HTML5 document begins with <!DOCTYPE html>. This directive forces browsers into Standards Mode rather than legacy Quirks Mode (which emulated 1990s box-model bugs).',
          'The root <html> element encloses two direct children: <head> (invisible metadata: <meta charset="UTF-8">, viewport scaling, <title>, and <link> stylesheets) and <body> (visible content).',
          'HTML5 introduced semantic landmark tags (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>) that communicate structural purpose instead of relying purely on generic <div> containers.',
          'Elements fall into block-level (start on new lines, span full width: <p>, <h1>, <section>), inline (flow within text: <span>, <a>, <strong>), and void elements (no closing tag or child content: <img>, <input>, <br>, <hr>, <meta>).',
        ],
        mechanismSteps: [
          { step: 1, title: 'Byte Decoding', detail: 'Browser converts raw TCP byte stream into UTF-8 characters.', artifact: 'UTF-8' },
          { step: 2, title: 'Tokenization', detail: 'State machine emits StartTag, Character, and EndTag tokens.', artifact: 'Tokens' },
          { step: 3, title: 'DOM Construction', detail: 'Stack-based tree builder links parent, child, and sibling nodes.', artifact: 'DOM Tree' },
          { step: 4, title: 'DOMContentLoaded', detail: 'Fires once HTML parsing finishes, enabling JavaScript DOM manipulation.', artifact: 'Event' },
        ],
        keyTakeaways: [
          'Always include <!DOCTYPE html> and <html lang="en"> at the top of every page.',
          'Use only one <main> landmark per document and maintain sequential headings (<h1> then <h2>, never skipping levels).',
          'Void elements (<img />, <input />, <meta />, <br />) never have closing tags.',
        ],
        realWorldExamples: [
          'News portals use <article>, <header>, and <time> so Google displays rich publication snippets.',
          'Accessible government and university portals rely on <nav> and <main> landmarks for keyboard skip-navigation.',
        ],
        comparisonTable: {
          title: 'Semantic HTML5 vs Non-Semantic Markup',
          headers: ['Aspect', 'Semantic Tags (<main>, <article>, <nav>)', 'Generic Tags (<div>, <span>)'],
          rows: [
            ['Accessibility', 'Screen readers expose jump landmarks automatically', 'Invisible to assistive landmark navigation'],
            ['SEO Value', 'Search crawlers distinguish primary content from sidebars', 'No structural signal beyond text'],
            ['Maintainability', 'Self-documenting template hierarchy', 'Requires class naming discipline to read'],
          ],
        },
        simulationId: 'html-sandbox',
        simulationCaption: 'Edit and run semantic HTML5 boilerplate live in the GeeksforGeeks-style code runner.',
        examples: {
          basic: {
            title: 'Semantic HTML5 Document Boilerplate',
            language: 'html',
            runnableInSandbox: true,
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CS35302 Semantic Page</title>
  <style>
    body { font-family: system-ui; margin: 0; padding: 20px; background: #faf6f0; color: #24160e; }
    header, footer { padding: 12px; background: #f2ebe1; border-radius: 6px; }
    main { margin: 16px 0; padding: 16px; border: 1px solid #ded2c3; border-radius: 6px; background: #fff; }
  </style>
</head>
<body>
  <header>
    <h1>Quantum University · CS35302</h1>
  </header>
  <main>
    <article>
      <h2>HTML5 Document Structure</h2>
      <p>Semantic landmarks improve accessibility and search engine clarity.</p>
    </article>
  </main>
  <footer>
    <small>Department of Computer Science &amp; Engineering</small>
  </footer>
</body>
</html>`,
            expectedOutput: 'Renders header, bordered main article card, and footer cleanly.',
            explanation: 'Combines <!DOCTYPE html>, semantic landmarks (<header>, <main>, <article>, <footer>), and clean hierarchy.',
          },
          intermediate: {
            title: 'Accessible Article Card with Aria Labeling',
            language: 'html',
            runnableInSandbox: true,
            code: `<article aria-labelledby="topic-heading" style="font-family: system-ui; padding: 18px; border: 1px solid #ded2c3; border-radius: 8px; background: #fffdf9; color: #24160e;">
  <p style="font-size: 12px; color: #7c6352; margin: 0 0 6px;">Unit 01 · Topic 1.2</p>
  <h3 id="topic-heading" style="margin: 0 0 8px;">Document Object Model (DOM)</h3>
  <p style="margin: 0 0 12px; line-height: 1.6;">Browsers convert HTML tokens into a live node tree manipulable by JavaScript.</p>
  <button type="button" onclick="this.textContent='Marked for Review'" style="padding: 8px 14px; background: #4a2c1d; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
    Bookmark Topic
  </button>
</article>`,
            expectedOutput: 'Displays an accessible card whose button updates state when clicked.',
            explanation: 'Links the <article> region to its heading using aria-labelledby and uses a native <button> element.',
          },
          advanced: {
            title: 'Client-Side DOM Cloning via <template>',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Dynamic Syllabus List via &lt;template&gt;</h3>
  <ul id="list" style="padding-left: 18px;"></ul>
</div>

<template id="row-tpl">
  <li style="margin-bottom: 6px;">
    <strong class="code"></strong> — <span class="name"></span>
  </li>
</template>

<script>
  const items = [
    { code: '1.1', name: 'History of Internet' },
    { code: '1.2', name: 'HTML Structure' },
    { code: '1.3', name: 'HTTP, SMTP, POP3, IMAP' }
  ];
  const tpl = document.getElementById('row-tpl');
  const list = document.getElementById('list');
  items.forEach(item => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('.code').textContent = item.code;
    node.querySelector('.name').textContent = item.name;
    list.appendChild(node);
  });
</script>`,
            expectedOutput: 'Renders three syllabus list items cloned safely from the inert <template> element.',
            explanation: 'Demonstrates inert HTML <template> nodes cloned into the live DOM without XSS risk.',
          },
        },
        mistakes: [
          { mistake: 'Omitting <!DOCTYPE html>, causing browsers to render in Quirks Mode.', fix: 'Always place <!DOCTYPE html> as line 1.' },
          { mistake: 'Using clickable <div> elements instead of <button> for interactive controls.', fix: 'Use native <button type="button"> for keyboard focus and screen-reader support.' },
        ],
        bestPractices: [
          'Keep heading levels strictly sequential (h1 -> h2 -> h3).',
          'Use <template> or document.createElement() when generating repetitive DOM nodes.',
        ],
        quiz: [
          {
            question: 'What happens if an HTML document omits <!DOCTYPE html>?',
            options: [
              'The browser refuses to open the file',
              'The browser enters Quirks Mode, breaking modern CSS layout calculations',
              'JavaScript is automatically disabled',
              'All images convert to grayscale',
            ],
            correctIndex: 1,
            explanation: 'Without <!DOCTYPE html>, browsers revert to legacy Quirks Mode for backward compatibility with 1990s pages.',
          },
          {
            question: 'Which of the following is an HTML void element (no closing tag)?',
            options: ['<section>', '<article>', '<img />', '<p>'],
            correctIndex: 2,
            explanation: '<img> cannot contain child nodes and has no closing tag.',
          },
          {
            question: 'Which landmark element should appear only once per document for the primary content?',
            options: ['<section>', '<main>', '<aside>', '<article>'],
            correctIndex: 1,
            explanation: 'Only one visible <main> landmark should exist per page to help assistive tech jump straight to core content.',
          },
        ],
        flashcards: [
          { front: 'Quirks Mode vs Standards Mode?', back: 'Standards Mode obeys W3C CSS/DOM specs (triggered by <!DOCTYPE html>); Quirks Mode emulates 1990s browser bugs.' },
          { front: 'Block vs Inline Element?', back: 'Block elements start on a new line and occupy full width (<p>, <div>); inline elements flow within text (<span>, <a>).' },
          { front: 'What is a Void Element?', back: 'An HTML element that holds no content and has no closing tag, such as <img>, <input>, <br>, <meta>.' },
        ],
        assignment: {
          task: 'Build a semantic academic profile page using only <header>, <nav>, <main>, <section>, <article>, and <footer> without any <div> wrappers.',
          hint: 'Use <nav> for links and <article> for each course card.',
          solution: `<header><h1>Student Profile</h1><nav><a href="#courses">Courses</a></nav></header>\n<main><section id="courses"><article><h2>CS35302 Web Tech</h2><p>5th Sem CSE</p></article></section></main>\n<footer><small>Quantum University</small></footer>`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is the purpose of <!DOCTYPE html> in an HTML5 document?',
            answer: 'It instructs the web browser’s rendering engine to parse and render the document in strict W3C Standards Mode rather than legacy Quirks Mode.',
          },
          {
            marks: '7M',
            question: 'Explain the complete structure of an HTML5 document with a diagram and discuss semantic elements and the DOM parsing pipeline.',
            answer: 'An HTML5 document starts with <!DOCTYPE html> followed by <html> containing <head> (charset, viewport, title, stylesheets) and <body> (visible semantic landmarks: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>). During parsing, the browser decodes UTF-8 bytes, tokenizes tags, and constructs the hierarchical DOM tree before combining with CSSOM into the Render Tree.',
          },
        ],
      },
      {
        id: 'u1-t3',
        code: '1.3',
        title: 'Core Protocols: HTTP, SMTP, POP3, MIME & IMAP',
        bloom: 'L2 / L4 · Analyze',
        readMinutes: 8,
        keywords: ['HTTP Port 80', 'SMTP Port 25/587', 'POP3 Port 110', 'IMAP Port 143', 'MIME Base64'],
        summary:
          'Application-layer protocols governing web transfer (HTTP/HTTPS) and electronic mail pushing, encoding, and multi-device retrieval (SMTP, MIME, POP3, IMAP).',
        definition:
          'Application-layer protocols define the standardized commands and packet formats over TCP/IP: HTTP transfers hypertext resources, SMTP pushes outgoing emails, POP3 and IMAP retrieve incoming emails from mail servers, and MIME encodes binary attachments and non-ASCII text.',
        purpose:
          'To guarantee universal interoperability so any browser or mail client can exchange structured text and multimedia across heterogeneous operating systems.',
        whyNeeded:
          'Original SMTP (RFC 822) only supported 7-bit US-ASCII text, and early email clients lacked multi-device synchronization. MIME and IMAP bridged those gaps.',
        detailedTheory: [
          'HTTP (HyperText Transfer Protocol, Port 80 / HTTPS 443): A stateless, text/binary request-response protocol. Key methods include GET (retrieve), POST (create/submit), PUT (replace), PATCH (partial update), and DELETE. Status families: 2xx Success (200 OK, 201 Created), 3xx Redirect (301, 304), 4xx Client Error (401, 404), 5xx Server Error (500, 503).',
          'SMTP (Simple Mail Transfer Protocol, Port 25 relay / Port 587 STARTTLS submission): A "push" protocol used to send outgoing mail from client (MUA) to Mail Transfer Agent (MTA) and relay between mail servers using commands like HELO/EHLO, MAIL FROM, RCPT TO, and DATA.',
          'POP3 (Post Office Protocol v3, Port 110 / 995 SSL): A "pull" protocol that connects, downloads messages to one local device, and deletes them from the server by default—unsuitable for syncing across phone and laptop.',
          'IMAP (Internet Message Access Protocol, Port 143 / 993 SSL): Keeps emails on the central server, supports server-side folders and partial header fetching, and synchronizes Read/Unread/Starred flags across multiple devices simultaneously.',
          'MIME (Multipurpose Internet Mail Extensions): Adds headers (MIME-Version, Content-Type: multipart/mixed, Content-Transfer-Encoding: base64) so binary files (PDFs, images, audio) travel safely across 7-bit ASCII email pipes and HTTP bodies.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Compose & MIME Encode', detail: 'Mail client encodes binary PDF attachment into Base64 ASCII with boundary delimiters.', artifact: 'MIME' },
          { step: 2, title: 'SMTP Submission', detail: 'Client pushes mail to outgoing MSA server on TCP Port 587 with TLS.', artifact: 'SMTP :587' },
          { step: 3, title: 'DNS MX Lookup', detail: 'Sending MTA queries recipient domain’s DNS MX record to locate destination mail server.', artifact: 'MX Record' },
          { step: 4, title: 'MTA-to-MTA Relay', detail: 'Sending server relays message to receiver mail server over Port 25.', artifact: 'SMTP :25' },
          { step: 5, title: 'Mailbox Storage', detail: 'Receiver server stores message in central Maildir storage.', artifact: 'Inbox' },
          { step: 6, title: 'IMAP Sync or POP3 Pull', detail: 'User’s laptop/phone fetches via IMAP (Port 993 sync) or POP3 (Port 995 download).', artifact: 'IMAP / POP3' },
        ],
        keyTakeaways: [
          'HTTP is stateless; state is layered on via Cookies, Sessions, or JWT Tokens.',
          'SMTP pushes outgoing mail; POP3 and IMAP pull/sync incoming mail.',
          'POP3 downloads & removes (single device); IMAP keeps mail on server (multi-device sync).',
          'MIME enables attachments and rich HTML emails via Content-Type and Base64 encoding.',
        ],
        realWorldExamples: [
          'Gmail and Outlook Web use IMAP/REST sync so marking an email read on Android immediately marks it read on your laptop.',
          'Transactional email APIs (SendGrid, AWS SES) relay millions of receipts per hour using authenticated SMTP + MIME.',
        ],
        comparisonTable: {
          title: 'Core Web & Email Protocols Comparison',
          headers: ['Protocol', 'Default Port (TLS)', 'Direction / Mode', 'Primary Role'],
          rows: [
            ['HTTP / HTTPS', '80 (443)', 'Client <-> Web Server', 'Stateless web document & API transfer'],
            ['SMTP', '25 / 587', 'Client -> MTA -> MTA', 'Push protocol for sending outgoing email'],
            ['POP3', '110 (995)', 'Mail Server -> Client', 'Downloads mail to one device; poor multi-device sync'],
            ['IMAP', '143 (993)', 'Mail Server <-> Client', 'Syncs folders & read state across multiple devices'],
            ['MIME', 'Header Spec', 'Extension to SMTP/HTTP', 'Encodes binary attachments & non-ASCII media'],
          ],
        },
        simulationId: 'email-protocols',
        simulationCaption: 'Interactive multi-device simulator: Watch how POP3 removes mail from server while IMAP syncs phone and laptop in real time, plus live MIME Base64 encoding.',
        examples: {
          basic: {
            title: 'Raw HTTP/1.1 Request & Response Exchange',
            language: 'text',
            runnableInSandbox: false,
            code: `# Client Request
GET /cs35302/syllabus.html HTTP/1.1
Host: quantumuniversity.edu.in
Accept: text/html

# Server Response
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 92

<!DOCTYPE html><html><body><h1>CS35302 Notes</h1></body></html>`,
            expectedOutput: 'Status 200 OK delivers 92 bytes of UTF-8 HTML.',
            explanation: 'Shows plain-text HTTP/1.1 framing: request line, headers separated by CRLF, blank line, and body.',
          },
          intermediate: {
            title: 'Raw SMTP Dialogue & MIME Boundary',
            language: 'text',
            runnableInSandbox: false,
            code: `S: 220 mail.quantum.edu.in ESMTP Ready
C: EHLO student.quantum.edu.in
S: 250 Hello student.quantum.edu.in
C: MAIL FROM:<student@quantum.edu.in>
S: 250 2.1.0 Ok
C: RCPT TO:<hod.cse@quantum.edu.in>
S: 250 2.1.5 Ok
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: Subject: Lab Submission
C: MIME-Version: 1.0
C: Content-Type: text/plain; charset="UTF-8"
C:
C: Attached is my CS35302 Unit 1 assignment.
C: .
S: 250 2.0.0 Ok: queued
C: QUIT`,
            expectedOutput: '250 2.0.0 Ok: queued',
            explanation: 'Illustrates exact RFC 5321 SMTP command handshake ending the DATA block with a single dot line.',
          },
          advanced: {
            title: 'Live MIME Base64 Encoder in JavaScript',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>MIME Base64 Encoder</h3>
  <input id="txt" value="CS35302 Web Technology Attachment" style="width: 100%; padding: 8px; border: 1px solid #c9b9a5; border-radius: 6px;">
  <button onclick="encodeMime()" style="margin-top: 8px; padding: 8px 14px; background: #4a2c1d; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
    Generate MIME Header
  </button>
  <pre id="mimeOut" style="background: #f2ebe1; padding: 12px; border-radius: 6px; margin-top: 10px; white-space: pre-wrap;"></pre>
</div>
<script>
  function encodeMime() {
    const val = document.getElementById('txt').value;
    const b64 = btoa(unescape(encodeURIComponent(val)));
    document.getElementById('mimeOut').textContent =
      'MIME-Version: 1.0\\nContent-Type: text/plain; charset="UTF-8"\\nContent-Transfer-Encoding: base64\\n\\n' + b64;
  }
  encodeMime();
</script>`,
            expectedOutput: 'Outputs valid MIME headers followed by the Base64-encoded payload.',
            explanation: 'Demonstrates how MIME transforms arbitrary UTF-8 or binary content into transport-safe Base64 ASCII.',
          },
        },
        mistakes: [
          { mistake: 'Confusing SMTP with an email retrieval protocol.', fix: 'SMTP only pushes/sends mail. Use IMAP or POP3 to fetch mail.' },
          { mistake: 'Choosing POP3 for multi-device setups.', fix: 'Use IMAP so folders and read/unread states stay synchronized across phone and laptop.' },
        ],
        bestPractices: [
          'Always use TLS-encrypted ports: HTTPS (443), SMTP STARTTLS (587), IMAPS (993), POP3S (995).',
          'Use MIME multipart/alternative so email clients can fall back from HTML to plain text gracefully.',
        ],
        quiz: [
          {
            question: 'Which protocol is exclusively used to push outgoing emails from client to mail server?',
            options: ['POP3', 'IMAP', 'SMTP', 'MIME'],
            correctIndex: 2,
            explanation: 'SMTP (Simple Mail Transfer Protocol) handles outbound email submission and server-to-server relay.',
          },
          {
            question: 'Why is IMAP preferred over POP3 when checking email on both a phone and a laptop?',
            options: [
              'IMAP encrypts attachments with PNG compression',
              'IMAP keeps messages on the server and syncs folders and read status across all devices',
              'POP3 only supports 10 emails per day',
              'IMAP runs over HTTP port 80',
            ],
            correctIndex: 1,
            explanation: 'IMAP maintains central server mailbox state across multiple devices, whereas POP3 downloads locally to one client.',
          },
          {
            question: 'What problem does MIME solve in email communication?',
            options: [
              'It replaces DNS lookups',
              'It allows non-ASCII characters and binary attachments (images, PDFs) to be transmitted over 7-bit ASCII SMTP',
              'It assigns IPv6 addresses to routers',
              'It renders CSS animations',
            ],
            correctIndex: 1,
            explanation: 'MIME extends 7-bit ASCII mail headers to carry multimedia attachments via Content-Type and Base64 encoding.',
          },
        ],
        flashcards: [
          { front: 'Default Ports: HTTP, SMTP, POP3, IMAP?', back: 'HTTP: 80 (443), SMTP: 25/587, POP3: 110 (995), IMAP: 143 (993).' },
          { front: 'POP3 vs IMAP?', back: 'POP3 downloads locally to 1 device; IMAP syncs server-side folders across multiple devices.' },
          { front: 'Role of MIME?', back: 'Encodes binary attachments (PDFs, images) and UTF-8 text into ASCII-safe Content-Type parts.' },
        ],
        assignment: {
          task: 'Draft a comparison table of HTTP, SMTP, POP3, and IMAP covering Full Form, Port Number, Mode (Push/Pull/Sync), and Primary Use Case.',
          hint: 'Remember TLS ports: 443, 587, 995, 993.',
          solution: 'HTTP (80/443, Pull, Web pages) · SMTP (25/587, Push, Send email) · POP3 (110/995, Pull, Single-device mail) · IMAP (143/993, Sync, Multi-device mail).',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is the role of MIME in email transmission?',
            answer: 'MIME (Multipurpose Internet Mail Extensions) extends original 7-bit ASCII email formatting to support non-ASCII characters and binary attachments (images, audio, PDFs) using Content-Type and Base64 Content-Transfer-Encoding headers.',
          },
          {
            marks: '7M',
            question: 'Compare SMTP, POP3, and IMAP protocols with an architecture diagram explaining how an email travels from sender to receiver across devices.',
            answer: 'Sender client MIME-encodes the message and pushes it via SMTP (Port 587) to the outgoing Mail Transfer Agent (MTA). The MTA queries DNS MX records and relays via SMTP (Port 25) to the recipient’s mail server. The recipient retrieves the message either via POP3 (Port 110/995, downloads locally to one device) or IMAP (Port 143/993, keeps messages on the server and synchronizes folders and read flags across phone and desktop).',
          },
        ],
      },
      {
        id: 'u1-t4',
        code: '1.4',
        title: 'Domain Name Server (DNS) — Hierarchy & Resolution',
        bloom: 'L2 / L3 · Understand',
        readMinutes: 6,
        keywords: ['Port 53', 'Root/TLD/Authoritative', 'Recursive vs Iterative', 'A / MX / CNAME', 'TTL'],
        summary:
          'Distributed hierarchical naming database translating domain names like quantumuniversity.edu.in into routable IP addresses via Recursive and Iterative lookups.',
        definition:
          'The Domain Name System (DNS) is a hierarchical, distributed database running primarily on UDP/TCP Port 53 that translates human-readable domain names into IPv4/IPv6 addresses and mail routing records.',
        purpose:
          'To decouple memorable domain identities from volatile numerical IP addresses and distribute lookup load globally without a single centralized bottleneck.',
        whyNeeded:
          'Humans cannot memorize 32-bit IPv4 or 128-bit IPv6 addresses, and cloud servers frequently swap IP addresses during scaling or failover.',
        detailedTheory: [
          'DNS organizes names into an inverted tree starting from the unnamed Root (.) at the top, followed by Top-Level Domains (gTLDs like .com, .org, .edu and ccTLDs like .in, .uk), Second-Level Domains (quantumuniversity), and Subdomains (portal, www).',
          'Four server roles cooperate during resolution: 1) Recursive Resolver (ISP or 1.1.1.1 / 8.8.8.8), 2) Root Nameservers (13 logical server clusters A–M), 3) TLD Nameservers (manage .com, .edu.in registries), and 4) Authoritative Nameservers (hold the actual zone file for a domain).',
          'Recursive vs Iterative Queries: In a Recursive Query, the client asks the Local Resolver for the final IP, and the resolver performs all downstream lookups on the client’s behalf. In an Iterative Query, Root and TLD servers do not chase the answer—they return a referral pointing to the next lower nameserver.',
          'Essential DNS Record Types: A (hostname -> IPv4), AAAA (hostname -> IPv6), CNAME (alias -> canonical domain), MX (mail exchange server + priority), NS (authoritative nameserver delegation), TXT (SPF/DKIM/domain verification), and PTR (reverse IP -> hostname).',
        ],
        mechanismSteps: [
          { step: 1, title: 'Cache Check', detail: 'Browser and OS hosts cache checked first; on miss, request goes to Recursive Resolver.', artifact: 'Local Miss' },
          { step: 2, title: 'Query Root Server (.)', detail: 'Resolver asks Root server; Root returns referral to the .in TLD nameserver.', artifact: 'Referral -> .in' },
          { step: 3, title: 'Query TLD Server', detail: 'Resolver asks .in TLD; TLD returns referral to domain’s Authoritative Nameserver.', artifact: 'Referral -> NS1' },
          { step: 4, title: 'Query Authoritative NS', detail: 'Authoritative NS looks up its zone file and returns the A record IP.', artifact: '104.21.45.12' },
          { step: 5, title: 'TTL Caching & Return', detail: 'Resolver caches IP for TTL seconds (e.g., 3600s) and hands IP to browser.', artifact: 'TTL 3600s' },
        ],
        keyTakeaways: [
          'DNS uses UDP Port 53 for fast standard queries and TCP Port 53 for zone transfers or payloads > 512 bytes.',
          'Root servers never know the website IP directly; they refer resolvers to TLD servers.',
          'Lower MX priority numbers have higher preference (e.g., Priority 10 is tried before Priority 20).',
          'TTL (Time To Live) controls how long resolvers cache an IP before re-querying.',
        ],
        realWorldExamples: [
          'Cloudflare Anycast (1.1.1.1) serves DNS lookups in under 12 ms by routing queries via BGP to the nearest regional edge server.',
          'Lowering DNS TTL to 60 seconds prior to a server migration prevents users from hitting stale server IPs.',
        ],
        comparisonTable: {
          title: 'Recursive vs Iterative DNS Queries',
          headers: ['Feature', 'Recursive Query', 'Iterative Query'],
          rows: [
            ['Who Does the Work?', 'The queried DNS Resolver chases down all referrals', 'The querying resolver follows each referral step-by-step'],
            ['Typical Path', 'Browser -> Local ISP / Public Resolver', 'Local Resolver -> Root -> TLD -> Authoritative NS'],
            ['Server Response', 'Final IP address or NXDOMAIN error', 'Either final answer or referral to another nameserver'],
          ],
        },
        simulationId: 'dns-resolver',
        simulationCaption: 'Interactive DNS Resolution Explorer: Enter any domain, toggle Recursive vs Iterative mode, and animate each hop from Root to Authoritative NS.',
        examples: {
          basic: {
            title: 'Inspecting DNS Lookups via nslookup',
            language: 'text',
            runnableInSandbox: false,
            code: `$ nslookup quantumuniversity.edu.in
Server:   1.1.1.1
Address:  1.1.1.1#53

Non-authoritative answer:
Name:     quantumuniversity.edu.in
Address:  104.21.45.12`,
            expectedOutput: 'Resolves hostname to IPv4 104.21.45.12 via resolver 1.1.1.1 on UDP port 53.',
            explanation: 'Non-authoritative indicates the answer came from the recursive resolver’s TTL cache rather than directly from the authoritative NS.',
          },
          intermediate: {
            title: 'BIND9 DNS Zone File Sample',
            language: 'text',
            runnableInSandbox: false,
            code: `$TTL 3600
@       IN  NS    ns1.quantumuniversity.edu.in.
@       IN  A     104.21.45.12
portal  IN  A     104.21.45.15
www     IN  CNAME quantumuniversity.edu.in.
@       IN  MX 10 mail.quantumuniversity.edu.in.`,
            expectedOutput: 'Defines authoritative NS, IPv4 A records, CNAME alias, and MX mail routing.',
            explanation: 'Standard zone file syntax mapping subdomains and mail servers with a 1-hour (3600s) cache TTL.',
          },
          advanced: {
            title: 'Multi-Record Async DNS Inspector (Node.js)',
            language: 'javascript',
            runnableInSandbox: false,
            code: `const dns = require('dns').promises;

async function inspectDomain(domain) {
  const [a, mx, txt] = await Promise.all([
    dns.resolve4(domain),
    dns.resolveMx(domain),
    dns.resolveTxt(domain)
  ]);
  console.log({ a, mx, txt });
}
inspectDomain('quantumuniversity.edu.in');`,
            expectedOutput: 'Concurrently prints A, MX, and TXT records for the target domain.',
            explanation: 'Uses Node’s promise-based DNS API with Promise.all for parallel lookup across record types.',
          },
        },
        mistakes: [
          { mistake: 'Placing a CNAME record on the root/apex domain (@).', fix: 'Use an A record or ALIAS/ANAME flattening; RFC rules forbid CNAME from co-existing with SOA/NS records at the apex.' },
          { mistake: 'Forgetting to lower TTL before a server IP migration.', fix: 'Lower TTL to 300s 24–48 hours before switching servers.' },
        ],
        bestPractices: [
          'Configure secondary redundant NS records across separate availability zones.',
          'Always pair SPF/DKIM TXT records with MX records to prevent email spoofing.',
        ],
        quiz: [
          {
            question: 'Which DNS record maps a domain name to an IPv4 address?',
            options: ['MX', 'CNAME', 'A', 'PTR'],
            correctIndex: 2,
            explanation: 'An A record maps a hostname to a 32-bit IPv4 address; AAAA maps to 128-bit IPv6.',
          },
          {
            question: 'What does a Root Nameserver return when queried for www.example.com?',
            options: [
              'The final website HTML',
              'A referral pointing to the .com Top-Level Domain (TLD) nameserver',
              'The user’s browser cookies',
              'A 404 Not Found error',
            ],
            correctIndex: 1,
            explanation: 'Root servers delegate authority by referring the resolver to the appropriate TLD nameserver.',
          },
          {
            question: 'Which transport port does standard DNS use?',
            options: ['TCP 80', 'UDP 53', 'TCP 25', 'UDP 110'],
            correctIndex: 1,
            explanation: 'Standard DNS queries use UDP Port 53 for minimal latency.',
          },
        ],
        flashcards: [
          { front: '4 DNS Server Types?', back: '1) Recursive Resolver, 2) Root Server (.), 3) TLD Server (.com/.in), 4) Authoritative Nameserver.' },
          { front: 'A vs AAAA vs CNAME?', back: 'A = IPv4, AAAA = IPv6, CNAME = Canonical hostname alias.' },
          { front: 'What is TTL in DNS?', back: 'Time To Live (in seconds) controlling how long resolvers cache a DNS record before refreshing.' },
        ],
        assignment: {
          task: 'Run `nslookup -type=mx` and `nslookup -type=txt` on a major domain and note how MX priority numbers and SPF TXT strings are formatted.',
          hint: 'Lower MX preference numbers indicate higher delivery priority.',
          solution: 'nslookup -type=mx gmail.com -> returns priority 5, 10, 20 mail exchangers.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'List any four DNS Resource Records and state their functions.',
            answer: 'A: Maps hostname to IPv4; AAAA: Maps hostname to IPv6; CNAME: Maps alias to canonical hostname; MX: Specifies mail exchange servers with priority.',
          },
          {
            marks: '7M',
            question: 'Explain the hierarchical architecture of DNS and differentiate between Recursive and Iterative queries with a labeled flow diagram.',
            answer: 'DNS is structured as Root (.) -> TLD (.com/.edu/.in) -> Authoritative Nameserver. In a Recursive query, the client instructs the local resolver to return the final IP directly. The local resolver then performs Iterative queries: asking Root (gets TLD referral) -> asking TLD (gets Authoritative NS referral) -> asking Authoritative NS (gets final A record IP), caches it for TTL seconds, and replies to the client.',
          },
        ],
      },
      {
        id: 'u1-t5',
        code: '1.5',
        title: 'Web Browsers & Web Servers Architecture',
        bloom: 'L2 / L3 · Analyze',
        readMinutes: 7,
        keywords: ['Rendering Engine', 'V8 Engine', 'Critical Rendering Path', 'Nginx vs Apache', 'Reverse Proxy'],
        summary:
          'Internal subsystems of modern Web Browsers (UI, Browser Engine, Blink/Gecko Rendering, V8 JS Engine) and concurrent Web Server models (Apache, Nginx, IIS).',
        definition:
          'A Web Browser is a client application that fetches, parses, executes, and paints HTML/CSS/JS documents. A Web Server is a server program listening on TCP ports 80/443 that serves static assets or proxies dynamic requests to backend application runtimes.',
        purpose:
          'To realize the client-server web model: Web servers reliably store, secure, and deliver resources at scale; browsers convert those raw bytes into accessible, interactive interfaces.',
        whyNeeded:
          'Without standardized rendering pipelines and concurrent server architectures, pages would render inconsistently across devices and servers would crash under simultaneous user traffic.',
        detailedTheory: [
          'A Web Browser comprises seven cooperating subsystems: 1) User Interface (address bar, tabs), 2) Browser Engine (marshals actions between UI and renderer), 3) Rendering Engine (Blink in Chrome/Edge, Gecko in Firefox, WebKit in Safari), 4) Networking (HTTP/TLS sockets), 5) JavaScript Engine (V8 in Chrome, SpiderMonkey in Firefox—JIT compiles JS), 6) UI Backend (OS widgets), and 7) Data Persistence (Cookies, localStorage, IndexedDB).',
          'Inside the Critical Rendering Path, HTML bytes tokenize into the DOM Tree while CSS bytes parse into the CSSOM Tree. The two merge into the Render Tree (omitting display: none nodes), followed by Layout/Reflow (geometry calculation), Paint (rasterizing pixels), and GPU Compositing.',
          'Web Servers use different concurrency models: Apache HTTP Server historically used process/thread-per-connection (Mpm Prefork/Worker), offering .htaccess flexibility at higher RAM cost; Nginx uses an asynchronous, non-blocking event loop capable of handling tens of thousands of simultaneous connections with tiny RAM usage.',
          'Modern architectures place Nginx as a Reverse Proxy in front of Node.js, Python, or Java servers to terminate TLS 1.3, compress assets (Gzip/Brotli), serve static files via zero-copy sendfile(), and balance load.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Socket Accept & TLS', detail: 'Nginx event worker accepts connection on Port 443 and terminates TLS.', artifact: 'TLS 443' },
          { step: 2, title: 'Route Match', detail: 'Static paths (/assets/*) served from disk; /api/* reverse-proxied upstream.', artifact: 'Proxy Pass' },
          { step: 3, title: 'DOM & CSSOM Parse', detail: 'Browser Rendering Engine constructs DOM and CSSOM trees concurrently.', artifact: 'Trees' },
          { step: 4, title: 'JS Execution', detail: 'V8 engine executes scripts that may read or mutate the DOM.', artifact: 'V8 JIT' },
          { step: 5, title: 'Render Tree & Layout', detail: 'Visible nodes merge into Render Tree and compute exact box coordinates.', artifact: 'Reflow' },
          { step: 6, title: 'Paint & Composite', detail: 'Browser rasterizes layers and composites pixels at 60+ fps.', artifact: '60 FPS' },
        ],
        keyTakeaways: [
          'Rendering Engines: Blink (Chrome/Edge), WebKit (Safari), Gecko (Firefox).',
          'Critical Rendering Path: HTML -> DOM + CSS -> CSSOM -> Render Tree -> Layout -> Paint -> Composite.',
          'Nginx uses event-driven non-blocking I/O; classic Apache uses thread/process-per-connection.',
          'Avoid layout thrashing (interleaving DOM reads and writes in loops) to keep browser animations smooth.',
        ],
        realWorldExamples: [
          'Netflix and GitHub terminate HTTPS traffic at Nginx/Envoy reverse proxies before routing to microservices.',
          'Electron desktop apps (VS Code, Discord) embed Chromium’s Blink rendering engine and V8 JavaScript runtime.',
        ],
        comparisonTable: {
          title: 'Apache HTTP Server vs Nginx Architecture',
          headers: ['Dimension', 'Apache HTTP Server', 'Nginx'],
          rows: [
            ['Concurrency Model', 'Process / Thread-driven (Prefork / Event)', 'Asynchronous, non-blocking event loop'],
            ['Static File Throughput', 'Moderate under very high concurrency', 'Extremely fast with minimal memory footprint'],
            ['Directory Config', 'Supports per-directory .htaccess overrides', 'Centralized config only (faster per request)'],
            ['Typical Role', 'Shared hosting, traditional LAMP stacks', 'Reverse proxy, load balancer, edge ingress'],
          ],
        },
        simulationId: 'http-lifecycle',
        simulationCaption: 'Simulate the Critical Rendering Path and inspect how DOM + CSSOM merge into Layout and Paint.',
        examples: {
          basic: {
            title: 'Browser Feature & Engine Telemetry Check',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Browser Environment Inspector</h3>
  <ul id="env" style="line-height: 1.8;"></ul>
</div>
<script>
  const facts = [
    'User Agent: ' + navigator.userAgent.slice(0, 65) + '...',
    'Online Status: ' + (navigator.onLine ? 'Connected' : 'Offline'),
    'Language: ' + navigator.language,
    'Hardware Concurrency: ' + (navigator.hardwareConcurrency || 'N/A') + ' logical cores'
  ];
  const ul = document.getElementById('env');
  facts.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    ul.appendChild(li);
  });
</script>`,
            expectedOutput: 'Lists current browser navigator properties dynamically.',
            explanation: 'Queries the browser’s navigator API exposed by the Browser Engine.',
          },
          intermediate: {
            title: 'Nginx Reverse Proxy & Static Cache Config',
            language: 'text',
            runnableInSandbox: false,
            code: `server {
    listen 443 ssl http2;
    server_name portal.quantumuniversity.edu.in;
    root /var/www/cs35302/dist;

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
            expectedOutput: 'Terminates HTTP/2 SSL, caches immutable assets for 30 days, and proxies /api/* to Node.',
            explanation: 'Production reverse-proxy pattern separating static asset delivery from dynamic API execution.',
          },
          advanced: {
            title: 'Preventing Layout Thrashing in the Browser',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <button onclick="batchUpdate()" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">
    Run Batched DOM Fragment Update
  </button>
  <div id="grid" style="display:flex; gap:6px; flex-wrap:wrap; margin-top:12px;"></div>
</div>
<script>
  function batchUpdate() {
    const frag = document.createDocumentFragment();
    for (let i = 1; i <= 12; i++) {
      const box = document.createElement('span');
      box.textContent = 'Node ' + i;
      box.style.cssText = 'padding:6px 10px; background:#f2ebe1; border:1px solid #c9b9a5; border-radius:4px; font-size:12px;';
      frag.appendChild(box);
    }
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    grid.appendChild(frag); // Single reflow & repaint!
  }
</script>`,
            expectedOutput: 'Inserts 12 nodes into the DOM triggering only a single browser Layout/Reflow.',
            explanation: 'DocumentFragment accumulates DOM nodes off-screen so the Rendering Engine calculates layout only once.',
          },
        },
        mistakes: [
          { mistake: 'Blocking HTML parsing with synchronous <script> tags inside <head>.', fix: 'Add `defer` (or `type="module"`) so scripts download in parallel and run after HTML parsing.' },
          { mistake: 'Running blocking CPU loops on a Node.js web server’s single event loop.', fix: 'Offload heavy CPU jobs to Worker Threads or background queues.' },
        ],
        bestPractices: [
          'Put <link rel="stylesheet"> in <head> and use `defer` on scripts for rapid First Contentful Paint.',
          'Animate only compositor properties (`transform`, `opacity`) to avoid expensive Layout recalculations.',
        ],
        quiz: [
          {
            question: 'Which browser subsystem parses HTML into the DOM and CSS into the CSSOM?',
            options: ['JavaScript Engine', 'Rendering Engine', 'Data Persistence', 'UI Backend'],
            correctIndex: 1,
            explanation: 'The Rendering Engine (Blink, Gecko, WebKit) builds the DOM, CSSOM, and Render Tree.',
          },
          {
            question: 'Which stage immediately follows Render Tree construction in the Critical Rendering Path?',
            options: ['DNS Lookup', 'Layout (Reflow)', 'TLS Handshake', 'SMTP Relay'],
            correctIndex: 1,
            explanation: 'After DOM and CSSOM combine into the Render Tree, the browser computes exact box geometry during Layout (Reflow).',
          },
          {
            question: 'What concurrency advantage does Nginx have over classic Apache Prefork?',
            options: [
              'Nginx spawns a new OS process per image',
              'Nginx uses an asynchronous, event-driven loop handling thousands of connections with tiny RAM',
              'Nginx disables HTTPS',
              'Nginx compiles HTML into C++',
            ],
            correctIndex: 1,
            explanation: 'Nginx’s event-driven non-blocking model scales to high concurrency without thread/process bloat.',
          },
        ],
        flashcards: [
          { front: 'Critical Rendering Path Steps?', back: 'HTML -> DOM + CSS -> CSSOM -> Render Tree -> Layout (Reflow) -> Paint -> Composite.' },
          { front: 'Chrome vs Firefox vs Safari Engines?', back: 'Chrome: Blink + V8; Firefox: Gecko + SpiderMonkey; Safari: WebKit + JavaScriptCore.' },
          { front: 'What is a Reverse Proxy?', back: 'A front-facing server (like Nginx) handling TLS, caching, and routing requests to internal backend apps.' },
        ],
        assignment: {
          task: 'Explain what happens when you add `display: none` vs `visibility: hidden` to an element in the Render Tree.',
          hint: 'Think about whether the node exists in the Render Tree and occupies layout geometry.',
          solution: '`display: none` omits the node from the Render Tree entirely (no layout space). `visibility: hidden` keeps the node in the Render Tree and Layout, taking space, but skips painting its pixels.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Name the rendering engines and JavaScript engines of Chrome, Firefox, and Safari.',
            answer: 'Chrome: Blink (Rendering) & V8 (JS); Firefox: Gecko (Rendering) & SpiderMonkey (JS); Safari: WebKit (Rendering) & JavaScriptCore (JS).',
          },
          {
            marks: '7M',
            question: 'Draw and explain the internal architecture of a modern Web Browser and describe how it interacts with a Web Server.',
            answer: 'A browser includes 7 components: UI, Browser Engine, Rendering Engine, Networking, JS Interpreter, UI Backend, and Data Persistence. On navigation, Networking fetches HTML/CSS over HTTP/TLS from a Web Server (e.g., Nginx/Apache). The Rendering Engine constructs DOM and CSSOM, merges them into the Render Tree, computes Layout, and paints pixels while the JS engine executes scripts.',
          },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    unitCode: 'Unit 02',
    title: 'HTML Elements, CSS, DHTML with JS & XML Processing',
    hours: 8,
    officialSyllabus:
      'List, Tables, Images, Forms, Frames, CSS, Dynamic HTML with Java Script, Document type definition, XML schemes, Object Models, Presenting XML, Using XML Processors: DOM and SAX.',
    topics: [
      {
        id: 'u2-t1',
        code: '2.1',
        title: 'HTML Lists, Tables, and Images',
        bloom: 'L3 · Apply',
        readMinutes: 6,
        keywords: ['<ul> <ol> <dl>', 'rowspan & colspan', '<thead> <tbody>', '<img srcset>', 'Lazy Loading'],
        summary:
          'Semantic lists (ordered, unordered, description), structured two-dimensional tables with rowspan/colspan, and responsive accessible images.',
        definition:
          'HTML provides dedicated structures for grouped items (Lists: <ul>, <ol>, <dl>), two-dimensional tabular datasets (Tables: <table>, <thead>, <tbody>, <tr>, <th>, <td>), and visual assets (<img>, <picture>).',
        purpose:
          'To present hierarchical enumerations, tabular data matrices, and resolution-adapted graphics accessibly across desktop and mobile viewports.',
        whyNeeded:
          'Screen readers require semantic table headers (<th scope="col">) and image alt descriptions, while browsers need intrinsic image dimensions to prevent layout shifts.',
        detailedTheory: [
          'HTML supports three list types: Unordered Lists (<ul> for bulleted items where sequence is irrelevant), Ordered Lists (<ol> with type="1|A|a|I|i" and start attributes for step-by-step sequences), and Description Lists (<dl> pairing <dt> terms with <dd> definitions—ideal for glossaries).',
          'Semantic Tables wrap header rows in <thead>, body rows in <tbody>, summary totals in <tfoot>, and titles in <caption>. Header cells use <th scope="col"> or <th scope="row">. Merging cells across columns uses colspan="n"; merging vertically across rows uses rowspan="n".',
          'Images use the void <img> tag with mandatory src and alt attributes. Setting width and height prevents Cumulative Layout Shift (CLS), loading="lazy" defers off-screen downloads, and <picture> / srcset delivers crisp WebP/AVIF assets per screen density.',
        ],
        mechanismSteps: [
          { step: 1, title: 'List Marker Generation', detail: 'Browser generates ::marker pseudo-elements for each <li> item.', artifact: '<li>' },
          { step: 2, title: 'Two-Pass Table Layout', detail: 'Renderer measures intrinsic column widths across cells before aligning rows.', artifact: 'Grid' },
          { step: 3, title: 'Aspect Ratio Reservation', detail: 'width/height on <img> reserve exact space before image bytes finish downloading.', artifact: 'Zero CLS' },
          { step: 4, title: 'Srcset Selection', detail: 'Browser selects optimal image resolution matching viewport DPI.', artifact: 'WebP' },
        ],
        keyTakeaways: [
          'Use <ul> for unordered items, <ol> for ordered steps, and <dl> (<dt>/<dd>) for term-definition pairs.',
          'colspan merges columns horizontally; rowspan merges rows vertically.',
          'Never use <table> for page layout—reserve tables strictly for tabular data.',
          'Always specify descriptive alt text on <img> (or alt="" for purely decorative graphics).',
        ],
        realWorldExamples: [
          'E-commerce comparison matrices use <th scope="col"> and <tbody> to keep specs readable by screen readers.',
          'Media-heavy blogs cut initial page bandwidth by 40%+ using loading="lazy" and <picture> WebP sources.',
        ],
        comparisonTable: {
          title: 'HTML List Types & Table Attributes',
          headers: ['Construct', 'Elements / Attributes', 'Best Use Case'],
          rows: [
            ['Unordered List', '<ul>, <li>', 'Navigation menus, feature bullets, unordered groups'],
            ['Ordered List', '<ol type="1|A|i">, start, <li>', 'Algorithms, ranked lists, step-by-step instructions'],
            ['Description List', '<dl>, <dt>, <dd>', 'Glossaries, protocol definitions, metadata pairs'],
            ['Table Cell Merge', 'colspan="N", rowspan="N"', 'Multi-level column headers, merged schedule blocks'],
          ],
        },
        simulationId: 'html-sandbox',
        simulationCaption: 'Run and modify a rowspan/colspan marksheet table and description list live in the GFG-style HTML sandbox.',
        examples: {
          basic: {
            title: 'Ordered, Unordered & Description Lists',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>CS35302 Protocol Glossary (&lt;dl&gt;)</h3>
  <dl>
    <dt><strong>HTTP</strong></dt>
    <dd>HyperText Transfer Protocol on TCP Port 80.</dd>
    <dt style="margin-top:8px;"><strong>IMAP</strong></dt>
    <dd>Multi-device email synchronization protocol on Port 143.</dd>
  </dl>
  <h3>Ordered Steps (&lt;ol&gt;)</h3>
  <ol type="I">
    <li>Resolve DNS</li>
    <li>TCP Handshake</li>
    <li>Fetch HTML</li>
  </ol>
</div>`,
            expectedOutput: 'Displays a glossary definition list and Roman-numeral ordered list.',
            explanation: 'Demonstrates <dl>/<dt>/<dd> semantics alongside <ol type="I">.',
          },
          intermediate: {
            title: 'Student Marksheet Table (rowspan & colspan)',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <table style="width:100%; border-collapse: collapse; text-align:left;">
    <caption style="font-weight:700; margin-bottom:8px;">B.Tech CSE 5th Sem Marksheet</caption>
    <thead style="background:#f2ebe1;">
      <tr>
        <th scope="col" rowspan="2" style="border:1px solid #c9b9a5; padding:8px;">Roll No</th>
        <th scope="col" colspan="2" style="border:1px solid #c9b9a5; padding:8px;">CS35302 Web Tech</th>
      </tr>
      <tr>
        <th scope="col" style="border:1px solid #c9b9a5; padding:8px;">Theory (70)</th>
        <th scope="col" style="border:1px solid #c9b9a5; padding:8px;">Lab (30)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #c9b9a5; padding:8px;">23030007</td>
        <td style="border:1px solid #c9b9a5; padding:8px;">64</td>
        <td style="border:1px solid #c9b9a5; padding:8px;">28</td>
      </tr>
    </tbody>
  </table>
</div>`,
            expectedOutput: 'Renders a two-tier header table with Roll No spanning 2 rows and CS35302 spanning 2 columns.',
            explanation: 'Uses semantic <caption>, <thead>, <tbody>, rowspan="2", and colspan="2" with clean CSS border-collapse.',
          },
          advanced: {
            title: 'Responsive SVG + Figure with Caption',
            language: 'html',
            runnableInSandbox: true,
            code: `<figure style="font-family: system-ui; padding: 16px; background: #fffdf9; border: 1px solid #ded2c3; border-radius: 8px; max-width: 420px;">
  <svg viewBox="0 0 320 110" width="100%" role="img" aria-label="Client to Server Diagram">
    <rect x="10" y="25" width="90" height="55" rx="8" fill="#4a2c1d" />
    <text x="55" y="57" fill="#faf6f0" font-size="13" text-anchor="middle">Browser</text>
    <line x1="105" y1="52" x2="210" y2="52" stroke="#8b4c24" stroke-width="2" stroke-dasharray="4 3" />
    <rect x="215" y="25" width="95" height="55" rx="8" fill="#2d5a43" />
    <text x="262" y="57" fill="#faf6f0" font-size="13" text-anchor="middle">Server</text>
  </svg>
  <figcaption style="font-size: 12px; color: #7c6352; margin-top: 8px;">
    Fig 2.1 — Resolution-independent inline vector graphic inside &lt;figure&gt;.
  </figcaption>
</figure>`,
            expectedOutput: 'Renders a crisp scalable SVG diagram paired with a semantic <figcaption>.',
            explanation: 'Pairs <figure> and <figcaption> for accessible visual diagrams without external image failures.',
          },
        },
        mistakes: [
          { mistake: 'Using HTML tables purely to lay out multi-column websites.', fix: 'Use CSS Grid or Flexbox for layouts; reserve <table> for tabular data.' },
          { mistake: 'Leaving out the alt attribute on <img> elements.', fix: 'Always provide concise descriptive alt text for screen readers and fallback states.' },
        ],
        bestPractices: [
          'Wrap wide tables in an `overflow-x: auto` container so mobile viewports never break horizontally.',
          'Always include `width` and `height` on images to eliminate layout shift.',
        ],
        quiz: [
          {
            question: 'Which HTML element defines a term inside a description list (<dl>)?',
            options: ['<dd>', '<dt>', '<li>', '<th >'],
            correctIndex: 1,
            explanation: '<dt> defines the description term and <dd> provides its definition.',
          },
          {
            question: 'Which attribute merges a table cell across 3 horizontal columns?',
            options: ['rowspan="3"', 'colspan="3"', 'merge="3"', 'cols="3"'],
            correctIndex: 1,
            explanation: 'colspan="3" expands a cell horizontally across three columns.',
          },
          {
            question: 'What does `loading="lazy"` on an <img> tag accomplish?',
            options: [
              'Applies a blur filter',
              'Defers fetching off-screen images until the user scrolls near them',
              'Converts PNGs to GIFs',
              'Removes the alt text',
            ],
            correctIndex: 1,
            explanation: 'Lazy loading saves bandwidth and speeds up initial page load by deferring off-screen image downloads.',
          },
        ],
        flashcards: [
          { front: 'cellpadding vs cellspacing?', back: 'cellpadding = inner space between cell text & border; cellspacing = outer gap between adjacent cells (use CSS border-spacing).' },
          { front: 'Purpose of <th scope="col">?', back: 'Explicitly binds a table header cell to all data cells in its column for screen readers.' },
          { front: '3 Parts of a Description List?', back: '<dl> (container), <dt> (term), <dd> (description).' },
        ],
        assignment: {
          task: 'Create an HTML timetable table for Monday & Tuesday featuring a Lunch cell spanning both days vertically (`rowspan="2"`) and a 2-hour Lab block spanning two periods horizontally (`colspan="2"`).',
          hint: 'Place the Lunch <td> only in the Monday <tr> row with rowspan="2".',
          solution: `<table border="1"><tr><th>Day</th><th>P1</th><th>Lunch</th><th>P2</th><th>P3</th></tr><tr><td>Mon</td><td>WT</td><td rowspan="2">LUNCH</td><td colspan="2">Web Tech Lab</td></tr><tr><td>Tue</td><td>OS</td><td>DBMS</td><td>CN</td></tr></table>`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between cellpadding and cellspacing in HTML tables.',
            answer: 'cellpadding controls the inner space between cell content and its border (modern CSS: `padding` on `td/th`). cellspacing controls the outer gap between adjacent cells (modern CSS: `border-spacing` on `table`).',
          },
          {
            marks: '7M',
            question: 'Write an HTML program to build a structured marksheet table demonstrating rowspan, colspan, semantic thead/tbody, and an ordered list of instructions.',
            answer: 'Use `<table>` with `<caption>`, `<thead>` containing `<th rowspan="2">` for Roll No and `<th colspan="2">` for Subject Marks (Theory + Lab), `<tbody>` for student records, and an `<ol>` list below detailing grading rules.',
          },
        ],
      },
      {
        id: 'u2-t2',
        code: '2.2',
        title: 'HTML Forms & Frames (Inputs, Controls & Iframes)',
        bloom: 'L3 / L6 · Create',
        readMinutes: 7,
        keywords: ['GET vs POST', 'enctype', 'Constraint Validation', '<fieldset>', 'Sandboxed <iframe>'],
        summary:
          'Interactive data collection via HTML forms (GET/POST, controls, native validation) and isolated nested browsing contexts using sandboxed <iframe> elements.',
        definition:
          'HTML Forms (<form>) collect structured user input and submit payloads via HTTP GET or POST. Frames (legacy <frameset> and modern HTML5 <iframe>) embed independent documents inside a host viewport.',
        purpose:
          'Forms enable bidirectional user workflows (logins, registrations, file uploads); iframes safely isolate third-party embeds like maps, videos, and payment terminals.',
        whyNeeded:
          'Without <form> controls and native validation, users could not send structured credentials or files to servers; without iframe sandboxing, embedded third-party widgets could hijack parent cookies.',
        detailedTheory: [
          'The <form> element uses `action` (target URL), `method` ("GET" appends parameters to the URL query string for bookmarkable searches; "POST" sends data inside the HTTP request body for passwords and mutations), and `enctype` ("multipart/form-data" is mandatory for <input type="file"> uploads).',
          'Modern HTML5 inputs provide native keyboards and constraint validation without JavaScript: type="email|number|password|date|radio|checkbox|file|range", plus attributes `required`, `minlength`, `maxlength`, `min`, `max`, and `pattern` regex.',
          'Group related controls inside <fieldset> with a <legend>, and always pair every input with `<label for="id">` so clicking the label focuses the input and screen readers announce it.',
          'Legacy HTML4 <frameset>/<frame> broke the browser Back button and URL bookmarking and was removed in HTML5. Modern HTML5 uses <iframe> with a mandatory `title` attribute and `sandbox` flags (e.g., `allow-scripts allow-forms`) to restrict untrusted embeds.',
        ],
        mechanismSteps: [
          { step: 1, title: 'User Input & Focus', detail: 'User interacts with labeled controls; mobile OS displays type-specific keyboard.', artifact: 'Input' },
          { step: 2, title: 'Constraint Validation', detail: 'On submit, browser checks required, type, and pattern constraints.', artifact: 'checkValidity()' },
          { step: 3, title: 'Payload Serialization', detail: 'Controls with `name` attributes serialize into FormData or URL query string.', artifact: 'FormData' },
          { step: 4, title: 'HTTP Dispatch / Iframe Messaging', detail: 'Data posts to action URL, or sandboxed iframes communicate securely via postMessage.', artifact: 'POST' },
        ],
        keyTakeaways: [
          'Use GET for idempotent search queries; use POST for passwords, logins, and state mutations.',
          'enctype="multipart/form-data" is required whenever a form uploads files.',
          'Always pair <label for="x"> with <input id="x">—never rely solely on placeholder text.',
          'HTML5 replaced <frameset> with sandboxed <iframe> elements requiring a descriptive `title`.',
        ],
        realWorldExamples: [
          'Stripe and Razorpay embed credit-card fields inside cross-origin sandboxed iframes so merchant servers stay PCI-DSS compliant.',
          'University admission portals use multi-fieldset forms with accept=".pdf" file constraints.',
        ],
        comparisonTable: {
          title: 'HTTP Form Method: GET vs POST',
          headers: ['Criterion', 'method="GET"', 'method="POST"'],
          rows: [
            ['Data Location', 'Appended to URL query string (?q=dns)', 'Transmitted inside HTTP request body'],
            ['Security', 'Visible in address bar & server logs (never use for passwords)', 'Hidden from URL bar (encrypted under HTTPS)'],
            ['Payload Limit', 'Constrained by browser URL length (~2048 chars)', 'No practical size limit; supports binary file uploads'],
            ['Bookmarkable', 'Yes (ideal for search/filters)', 'No'],
          ],
        },
        simulationId: 'html-sandbox',
        simulationCaption: 'Test HTML5 constraint validation, fieldsets, and live form serialization directly in the interactive code sandbox.',
        examples: {
          basic: {
            title: 'Accessible Login Form with Native Validation',
            language: 'html',
            runnableInSandbox: true,
            code: `<form onsubmit="event.preventDefault(); document.getElementById('msg').textContent='Validated & Submitted!';" style="font-family: system-ui; padding: 16px; max-width: 340px; color: #24160e;">
  <fieldset style="border: 1px solid #c9b9a5; border-radius: 8px; padding: 14px;">
    <legend style="font-weight: 700; padding: 0 6px;">Student Portal Login</legend>
    <label for="email" style="display:block; font-size:13px; margin-bottom:4px;">University Email</label>
    <input id="email" type="email" required placeholder="name@quantumuniversity.edu.in" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #c9b9a5; border-radius:6px; box-sizing:border-box;">
    <label for="pwd" style="display:block; font-size:13px; margin-bottom:4px;">Password (min 6 chars)</label>
    <input id="pwd" type="password" required minlength="6" style="width:100%; padding:8px; margin-bottom:12px; border:1px solid #c9b9a5; border-radius:6px; box-sizing:border-box;">
    <button type="submit" style="padding:8px 16px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">Sign In</button>
  </fieldset>
  <p id="msg" style="color:#2d5a43; font-size:13px; margin-top:8px;"></p>
</form>`,
            expectedOutput: 'Browser enforces valid email and 6-character minimum before printing "Validated & Submitted!".',
            explanation: 'Combines semantic <fieldset>/<legend>, explicit <label for>, and native HTML5 validation.',
          },
          intermediate: {
            title: 'Full Registration Form with Select, Radio & File Input',
            language: 'html',
            runnableInSandbox: true,
            code: `<form onsubmit="event.preventDefault(); alert('Registration Captured!');" enctype="multipart/form-data" style="font-family: system-ui; padding: 16px; max-width: 380px; color: #24160e;">
  <label for="branch" style="display:block; font-size:13px; font-weight:600;">Branch</label>
  <select id="branch" name="branch" style="width:100%; padding:8px; margin:4px 0 12px; border:1px solid #c9b9a5; border-radius:6px;">
    <option value="CSE">B.Tech CSE</option>
    <option value="AIML">B.Tech AI &amp; ML</option>
  </select>

  <div style="margin-bottom:12px; font-size:13px;">
    <strong>Elective Track:</strong><br>
    <label><input type="radio" name="track" value="web" checked> Web Architecture</label>
    <label style="margin-left:12px;"><input type="radio" name="track" value="cloud"> Cloud</label>
  </div>

  <label for="doc" style="display:block; font-size:13px; font-weight:600;">Resume (PDF)</label>
  <input id="doc" type="file" accept="application/pdf" style="margin:6px 0 14px; font-size:12px;"><br>

  <button type="submit" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px;">Submit</button>
  <button type="reset" style="padding:8px 14px; background:#f2ebe1; color:#24160e; border:1px solid #c9b9a5; border-radius:6px; margin-left:6px;">Reset</button>
</form>`,
            expectedOutput: 'Renders dropdown, radio group, PDF-filtered file input, and Submit/Reset controls.',
            explanation: 'Demonstrates multipart/form-data configuration and multi-control layout.',
          },
          advanced: {
            title: 'Sandboxed Inline Iframe with srcdoc Isolation',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Sandboxed &lt;iframe&gt; Preview</h3>
  <iframe
    title="Isolated Course Notice"
    sandbox="allow-scripts"
    srcdoc="<body style='font-family:system-ui;background:#f2ebe1;color:#24160e;padding:12px;'><strong>Isolated Widget</strong><p>Running safely inside sandboxed browsing context.</p></body>"
    style="width:100%; height:110px; border:1px solid #c9b9a5; border-radius:8px;">
  </iframe>
</div>`,
            expectedOutput: 'Renders an isolated sub-document inside a bordered iframe.',
            explanation: 'Uses `sandbox="allow-scripts"` without `allow-same-origin` so the embedded frame cannot read parent cookies or DOM.',
          },
        },
        mistakes: [
          { mistake: 'Using method="GET" for login or password forms.', fix: 'Always use method="POST" over HTTPS so credentials stay out of URLs and browser history.' },
          { mistake: 'Using <button> without type="button" for non-submit toolbar buttons inside a <form>.', fix: 'Specify type="button" explicitly, since buttons inside forms default to type="submit".' },
        ],
        bestPractices: [
          'Always attach a descriptive `title` attribute to every <iframe> for screen readers.',
          'Validate data on both the client (UX) and server (security).',
        ],
        quiz: [
          {
            question: 'Which `enctype` is mandatory on a `<form>` that includes an `<input type="file">`?',
            options: ['text/plain', 'application/json', 'multipart/form-data', 'application/x-www-form-urlencoded'],
            correctIndex: 2,
            explanation: 'multipart/form-data splits the body into boundary-delimited parts capable of carrying raw binary file bytes.',
          },
          {
            question: 'Why did HTML5 deprecate `<frameset>` and `<frame>`?',
            options: [
              'They blocked CSS backgrounds',
              'They broke browser Back buttons, URL bookmarking, and screen-reader accessibility',
              'They only supported PNG images',
              'They required XML Schema',
            ],
            correctIndex: 1,
            explanation: 'Framesets kept the top-level URL static while sub-frames navigated, breaking bookmarks and history.',
          },
          {
            question: 'What does the `sandbox` attribute do on an `<iframe>`?',
            options: [
              'Applies warm sepia colors',
              'Restricts scripts, popups, and parent DOM access to protect against XSS and clickjacking',
              'Enables offline storage',
              'Doubles download speed',
            ],
            correctIndex: 1,
            explanation: 'Sandboxing applies least-privilege security constraints to embedded documents.',
          },
        ],
        flashcards: [
          { front: 'GET vs POST?', back: 'GET appends data to URL (bookmarkable, visible, size-limited). POST places data in HTTP body (secure, supports file uploads).' },
          { front: 'Classic Frameset vs HTML5 Iframe?', back: 'Frameset replaced <body> and broke bookmarking; <iframe> sits inside <body> with security sandboxing.' },
          { front: 'Why pair <label for> with <input id>?', back: 'Improves screen-reader accessibility and enlarges the clickable hit area to include the label text.' },
        ],
        assignment: {
          task: 'Write an HTML5 form requesting a 10-digit Roll Number using regex `pattern="[0-9]{10}"`, a branch dropdown, and a sandboxed iframe below.',
          hint: 'Add `title="10 digits required"` on the patterned input for clear browser hints.',
          solution: `<form method="POST"><label for="r">Roll No:</label><input id="r" type="text" pattern="[0-9]{10}" required><select name="b"><option>CSE</option></select><button type="submit">Save</button></form>`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between GET and POST methods in HTML forms.',
            answer: 'GET appends form parameters to the URL query string (visible, length-limited, ideal for searches). POST sends parameters inside the HTTP request body (not exposed in URLs, supports large payloads and file uploads).',
          },
          {
            marks: '7M',
            question: 'Design an HTML5 Student Registration Form with text, email, password, radio, checkbox, dropdown, file upload, and reset/submit buttons. Also explain frames vs iframes.',
            answer: 'Include `<form method="POST" enctype="multipart/form-data">` grouped in `<fieldset><legend>...</legend>` with `<label for>` bindings and HTML5 `required`/`minlength` attributes. Contrast deprecated `<frameset>` (which replaced `<body>` and broke Back-button history) with modern `<iframe sandbox="..." title="...">` embedded inside `<body>`.',
          },
        ],
      },
      {
        id: 'u2-t3',
        code: '2.3',
        title: 'Cascading Style Sheets (CSS) — Types, Selectors & Box Model',
        bloom: 'L2 / L3 · Apply',
        readMinutes: 7,
        keywords: ['Inline/Internal/External', 'Specificity', 'CSS Box Model', 'border-box', 'Flexbox & Grid'],
        summary:
          'Separating presentation from HTML via Inline, Internal, and External CSS; calculating selector specificity; and mastering the Content-Padding-Border-Margin Box Model.',
        definition:
          'CSS (Cascading Style Sheets) is a declarative styling language governing typography, color, spacing, layout, and responsive adaptation of HTML or XML documents.',
        purpose:
          'To enforce separation of concerns: HTML provides semantic structure while centralized stylesheets manage visual presentation across entire applications.',
        whyNeeded:
          'Inline HTML attributes (<font>, bgcolor) duplicated styling across hundreds of pages and made responsive mobile layouts impossible.',
        detailedTheory: [
          'Three CSS Attachment Methods: 1) Inline (`style="..."` attribute—highest specificity, hard to maintain), 2) Internal (`<style>` inside `<head>`—scoped to one page), and 3) External (`<link rel="stylesheet" href="app.css">`—industry standard, browser-cached across pages).',
          'Specificity Hierarchy resolves conflicting rules: Inline Style (1,0,0,0 = 1000) > ID Selector `#id` (0,1,0,0 = 100) > Class `.card`, Attribute `[type="text"]`, Pseudo-class `:hover` (0,0,1,0 = 10) > Element `p`, Pseudo-element `::before` (0,0,0,1 = 1) > Universal `*` (0). Equal specificity resolves by source order (last rule wins).',
          'The CSS Box Model wraps every element in four concentric rectangles from inside out: Content (width × height) -> Padding (inner breathing room inside border) -> Border (edge line) -> Margin (outer transparent spacing clearing neighbors).',
          'Under default `box-sizing: content-box`, padding and border ADD onto declared `width`—frequently breaking column layouts. Setting `box-sizing: border-box` locks the rendered width to the declared `width`, absorbing padding and border inward.',
        ],
        mechanismSteps: [
          { step: 1, title: 'CSSOM Construction', detail: 'CSS parser converts rule declarations into the CSSOM tree.', artifact: 'CSSOM' },
          { step: 2, title: 'Cascade & Specificity', detail: 'Browser ranks matching selectors by specificity tuple (Inline, ID, Class, Element).', artifact: '(0,1,1,0)' },
          { step: 3, title: 'Box Model Geometry', detail: 'Computes content, padding, border, and margin dimensions using box-sizing rule.', artifact: 'border-box' },
          { step: 4, title: 'Flex / Grid Alignment', detail: 'Distributes boxes along 1D (Flexbox) or 2D (Grid) tracks.', artifact: 'Layout' },
        ],
        keyTakeaways: [
          'External CSS is preferred for caching and multi-page consistency.',
          'Specificity order: Inline (1000) > ID (100) > Class/Attribute/Pseudo-class (10) > Element (1).',
          'Box Model layers (inner -> outer): Content -> Padding -> Border -> Margin.',
          'Always reset `*, *::before, *::after { box-sizing: border-box; }` for predictable responsive widths.',
        ],
        realWorldExamples: [
          'Design systems define warm cream and espresso color tokens once in `:root` CSS Custom Properties for effortless dark/light mode switching.',
          'CSS Grid `repeat(auto-fit, minmax(260px, 1fr))` creates responsive card grids without writing repetitive breakpoints.',
        ],
        comparisonTable: {
          title: 'box-sizing: content-box vs border-box (Declared width: 200px, padding: 20px, border: 5px)',
          headers: ['Metric', 'content-box (Legacy Default)', 'border-box (Modern Standard)'],
          rows: [
            ['Content Area Width', '200 px', '150 px (200 - 40 pad - 10 border)'],
            ['Rendered Border-Edge Width', '250 px (200 + 40 + 10)', '200 px (exact declared width)'],
            ['Layout Predictability', 'Often overflows 100% containers', 'Fits reliably inside percentage/grid tracks'],
          ],
        },
        simulationId: 'css-box-model',
        simulationCaption: 'Interactive CSS Box Model & Specificity Lab: Drag sliders for width, padding, border, margin, toggle content-box vs border-box, and test live selector weights.',
        examples: {
          basic: {
            title: 'CSS Box Model: content-box vs border-box',
            language: 'html',
            runnableInSandbox: true,
            code: `<style>
  body { font-family: system-ui; padding: 16px; background: #faf6f0; color: #24160e; }
  .box { width: 240px; padding: 20px; border: 4px solid #4a2c1d; margin-bottom: 14px; background: #f2ebe1; }
  .content { box-sizing: content-box; }
  .border { box-sizing: border-box; background: #e9dfd1; }
</style>
<div class="box content">content-box (Rendered: 288px wide)</div>
<div class="box border">border-box (Rendered: 240px wide)</div>`,
            expectedOutput: 'Shows the content-box overflowing wider than the border-box despite identical 240px CSS width.',
            explanation: 'Visually proves why `box-sizing: border-box` is essential for aligned layouts.',
          },
          intermediate: {
            title: 'Specificity Resolution & Pseudo-Classes',
            language: 'html',
            runnableInSandbox: true,
            code: `<style>
  body { font-family: system-ui; padding: 16px; color: #24160e; }
  p { color: #7c6352; }               /* Weight: 1 */
  .highlight { color: #8b4c24; }      /* Weight: 10 */
  #special { color: #2d5a43; font-weight: 700; } /* Weight: 100 */
  .btn { padding: 8px 14px; background: #4a2c1d; color: #fff; border: none; border-radius: 6px; transition: transform 0.15s; }
  .btn:hover { transform: translateY(-2px); background: #351e13; }
</style>
<p id="special" class="highlight">ID (#special = 100) overrides Class (.highlight = 10) and Element (p = 1).</p>
<button class="btn">Hover Me (:hover = 10)</button>`,
            expectedOutput: 'Text renders in sage green (#2d5a43) because ID selector has weight 100.',
            explanation: 'Demonstrates specificity weighting and smooth compositor-only `:hover` transitions.',
          },
          advanced: {
            title: 'Responsive CSS Grid with Custom Variables',
            language: 'html',
            runnableInSandbox: true,
            code: `<style>
  :root { --surface: #fffdf9; --ink: #24160e; --border: #ded2c3; }
  body { font-family: system-ui; background: #faf6f0; padding: 16px; color: var(--ink); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .tile { background: var(--surface); border: 1px solid var(--border); padding: 14px; border-radius: 8px; }
</style>
<div class="grid">
  <div class="tile"><strong>01.</strong> Selectors</div>
  <div class="tile"><strong>02.</strong> Box Model</div>
  <div class="tile"><strong>03.</strong> Flexbox / Grid</div>
</div>`,
            expectedOutput: 'Renders an automatically wrapping responsive 3-column grid using CSS Custom Properties.',
            explanation: 'Uses `repeat(auto-fit, minmax(150px, 1fr))` and CSS design tokens.',
          },
        },
        mistakes: [
          { mistake: 'Overusing `!important` to fix selector clashes.', fix: 'Keep selector specificity flat using clean class names rather than `!important` overrides.' },
          { mistake: 'Forgetting `box-sizing: border-box`, causing 100% width inputs with padding to overflow.', fix: 'Apply `box-sizing: border-box` globally.' },
        ],
        bestPractices: [
          'Use CSS Custom Properties (`:root { --accent: #4a2c1d; }`) for maintainable theming.',
          'Prefer Flexbox for 1D toolbars/navbars and CSS Grid for 2D page layouts.',
        ],
        quiz: [
          {
            question: 'In the CSS Box Model, which layer sits directly between Padding and Margin?',
            options: ['Content', 'Border', 'Viewport', 'Baseline'],
            correctIndex: 1,
            explanation: 'From inner to outer: Content -> Padding -> Border -> Margin.',
          },
          {
            question: 'Which CSS selector carries the highest specificity weight?',
            options: ['.nav .item a (21)', '#header (100)', 'div > ul > li (3)', 'p.lead (11)'],
            correctIndex: 1,
            explanation: 'An ID selector (#header) scores 100, outweighing classes (10) and elements (1).',
          },
          {
            question: 'What does `box-sizing: border-box` change?',
            options: [
              'Turns margins into borders',
              'Includes padding and border inside the element’s declared width and height',
              'Hides overflow automatically',
              'Forces inline display',
            ],
            correctIndex: 1,
            explanation: 'border-box guarantees the rendered box matches declared width/height regardless of padding and border thickness.',
          },
        ],
        flashcards: [
          { front: '4 Box Model Layers?', back: 'Content -> Padding -> Border -> Margin.' },
          { front: 'Specificity Tuple?', back: '(Inline [1000], IDs [100], Classes/Attr/Pseudo-class [10], Elements/Pseudo-elements [1]).' },
          { front: 'display: none vs visibility: hidden?', back: 'display: none removes the element from layout; visibility: hidden hides pixels while preserving layout space.' },
        ],
        assignment: {
          task: 'Calculate the total rendered border-edge width of a div with `width: 300px; padding: 24px; border: 3px solid;` under `content-box` vs `border-box`.',
          hint: 'Padding and border apply to both left and right sides (×2).',
          solution: 'content-box: 300 + (24×2) + (3×2) = 354px. border-box: exactly 300px.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'State the order of precedence among Inline, Internal, and External CSS.',
            answer: 'Inline CSS has the highest priority (specificity 1000). Internal and External CSS share equal origin weight and resolve by selector specificity and source order (whichever rule is loaded later wins).',
          },
          {
            marks: '7M',
            question: 'Explain the CSS Box Model with a labeled diagram and discuss CSS selectors and specificity calculation with examples.',
            answer: 'Every element is a nested box: Content -> Padding -> Border -> Margin. Explain content-box vs border-box math. Detail Element (1), Class/Pseudo-class (10), ID (100), and Inline (1000) specificity with a worked calculation such as `#nav .link:hover` = 100 + 10 + 10 = 120.',
          },
        ],
      },
      {
        id: 'u2-t4',
        code: '2.4',
        title: 'Dynamic HTML (DHTML) with JavaScript & DOM',
        bloom: 'L3 / L6 · Create',
        readMinutes: 7,
        keywords: ['HTML + CSS + DOM + JS', 'Event Bubbling', 'Event Delegation', 'Form Validation', 'classList'],
        summary:
          'Integrating HTML, CSS, DOM APIs, and JavaScript event handling to validate forms, toggle classes, and update interfaces dynamically without reloads.',
        definition:
          'DHTML (Dynamic HTML) is the synergistic combination of HTML (structure), CSS (presentation), the Document Object Model (DOM programmable tree), and JavaScript (logic and event listeners) to update page content and styles dynamically in the browser.',
        purpose:
          'To deliver instantaneous client-side interactivity, live filtering, animations, and form validation without waiting for round-trip server reloads.',
        whyNeeded:
          'Static HTML pages forced a full page flash on every user action. Client-side DOM scripting gives web pages immediate desktop-grade responsiveness.',
        detailedTheory: [
          'The 4 Pillars of DHTML are HTML, CSS, the DOM (which exposes every node via `document.getElementById`, `querySelector`, `querySelectorAll`), and JavaScript.',
          'DOM Mutation APIs let scripts update text safely (`textContent`), toggle styles cleanly (`element.classList.toggle("active")`), and build nodes via `document.createElement` + `DocumentFragment`.',
          'Event Propagation flows in two phases: Capturing (window down to target) and Bubbling (target back up to window). Calling `event.preventDefault()` stops native actions (like form page reload), while `event.stopPropagation()` halts bubbling.',
          'Event Delegation attaches a single listener to a parent container (e.g., `<ul>`) and inspects `event.target.closest(...)`—saving memory and automatically supporting dynamically added child elements.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Event Capture & Target', detail: 'User clicks button; event travels down DOM tree to target node.', artifact: 'PointerEvent' },
          { step: 2, title: 'Event Bubbling', detail: 'Event bubbles upward, triggering parent delegated listeners.', artifact: 'Bubble' },
          { step: 3, title: 'Validation / Logic', detail: 'JavaScript handler validates input rules or computes state.', artifact: 'Handler' },
          { step: 4, title: 'DOM / CSS Mutation', detail: 'Script toggles classList or updates textContent cleanly.', artifact: 'Repaint' },
        ],
        keyTakeaways: [
          '4 Components of DHTML: HTML + CSS + DOM + JavaScript.',
          'Prefer `textContent` over `innerHTML` for user-supplied strings to prevent XSS.',
          'Use Event Delegation on parent containers instead of attaching listeners in loops.',
          'Use `classList.toggle()` rather than inline `.style` spaghetti to keep styling maintainable.',
        ],
        realWorldExamples: [
          'Live syllabus search filters hide/show topic items instantaneously on every `input` keystroke.',
          'Client-side form validation highlights invalid email or password lengths before network submission.',
        ],
        comparisonTable: {
          title: 'DOM Content & Propagation Methods',
          headers: ['API / Method', 'Behavior', 'Security / Performance Note'],
          rows: [
            ['element.textContent', 'Sets plain text without HTML parsing', 'XSS-safe and fast'],
            ['element.innerHTML', 'Parses string as HTML markup', 'Unsafe for untrusted input unless sanitized'],
            ['event.preventDefault()', 'Cancels default browser behavior (e.g. form reload)', 'Does not stop event bubbling'],
            ['event.stopPropagation()', 'Stops event from bubbling to parent nodes', 'Use sparingly so global shortcuts still work'],
          ],
        },
        simulationId: 'html-sandbox',
        simulationCaption: 'Run interactive DHTML form validation and Event Delegation demos live inside the GFG-style sandbox.',
        examples: {
          basic: {
            title: 'DHTML Client-Side Form Validation',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; max-width: 340px; color: #24160e;">
  <h3>Live Registration Check</h3>
  <input id="email" placeholder="Enter email..." style="width:100%; padding:8px; margin-bottom:8px; border:1px solid #c9b9a5; border-radius:6px; box-sizing:border-box;">
  <input id="phone" placeholder="10-digit mobile..." style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #c9b9a5; border-radius:6px; box-sizing:border-box;">
  <button onclick="validate()" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">Validate</button>
  <p id="status" style="margin-top:10px; font-weight:600; font-size:13px;"></p>
</div>
<script>
  function validate() {
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const status = document.getElementById('status');
    if (!email.includes('@') || !/^[0-9]{10}$/.test(phone)) {
      status.textContent = 'Invalid: Need valid email (@) and 10-digit phone.';
      status.style.color = '#8f2d2d';
      return false;
    }
    status.textContent = 'Valid Registration Details!';
    status.style.color = '#2d5a43';
    return true;
  }
</script>`,
            expectedOutput: 'Displays green confirmation for valid email + 10-digit phone, or red error otherwise.',
            explanation: 'Classic university exam DHTML validation updating DOM text and style dynamically.',
          },
          intermediate: {
            title: 'Event Delegation Checklist',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Click Any Topic (Single Parent Listener)</h3>
  <ul id="deck" style="list-style:none; padding:0; display:grid; gap:6px; max-width:280px;">
    <li style="padding:8px 12px; background:#f2ebe1; border-radius:6px; cursor:pointer;">2.1 Tables &amp; Lists</li>
    <li style="padding:8px 12px; background:#f2ebe1; border-radius:6px; cursor:pointer;">2.3 CSS Box Model</li>
    <li style="padding:8px 12px; background:#f2ebe1; border-radius:6px; cursor:pointer;">2.4 DHTML Events</li>
  </ul>
</div>
<script>
  document.getElementById('deck').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const done = li.dataset.done === '1';
    li.dataset.done = done ? '0' : '1';
    li.style.textDecoration = done ? 'none' : 'line-through';
    li.style.opacity = done ? '1' : '0.6';
  });
</script>`,
            expectedOutput: 'Toggles strike-through state on any clicked list item via one parent listener.',
            explanation: 'Uses `e.target.closest("li")` to handle clicks efficiently without per-item listeners.',
          },
          advanced: {
            title: 'Live DOM Filter Without Page Reload',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <input id="q" placeholder="Filter topics..." style="width:100%; max-width:260px; padding:8px; border:1px solid #c9b9a5; border-radius:6px; margin-bottom:10px;">
  <ul id="items" style="padding-left:18px;">
    <li>HTTP Protocol</li><li>SMTP &amp; MIME</li><li>XML Schema XSD</li><li>DOM &amp; SAX</li>
  </ul>
</div>
<script>
  document.getElementById('q').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('#items li').forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  });
</script>`,
            expectedOutput: 'Immediately filters the list as characters are typed.',
            explanation: 'Reacts synchronously to `input` events with zero network overhead.',
          },
        },
        mistakes: [
          { mistake: 'Using `innerHTML` with user-entered text.', fix: 'Use `textContent` to eliminate Cross-Site Scripting (XSS) injection.' },
          { mistake: 'Attaching hundreds of click listeners inside a loop.', fix: 'Attach one delegated listener on the shared parent container.' },
        ],
        bestPractices: [
          'Always call `event.preventDefault()` on SPA form submit handlers.',
          'Keep DOM reads and writes separated to avoid layout thrashing.',
        ],
        quiz: [
          {
            question: 'Which four technologies make up Dynamic HTML (DHTML)?',
            options: [
              'HTML + CSS + DOM + JavaScript',
              'XML + DTD + XSD + XSLT',
              'HTTP + SMTP + POP3 + IMAP',
              'SOAP + WSDL + UDDI + CORBA',
            ],
            correctIndex: 0,
            explanation: 'DHTML combines HTML structure, CSS styling, DOM programmatic tree access, and JavaScript.',
          },
          {
            question: 'In which phase does a DOM event travel from the target element back up to `window`?',
            options: ['Capturing Phase', 'Bubbling Phase', 'Parsing Phase', 'Compilation Phase'],
            correctIndex: 1,
            explanation: 'Event Bubbling propagates events upward from the target through ancestor nodes to document and window.',
          },
          {
            question: 'Why is `textContent` preferred over `innerHTML` for displaying user input?',
            options: [
              'It styles text bold automatically',
              'It prevents Cross-Site Scripting (XSS) by treating strings strictly as plain text',
              'It runs on the server',
              'It compresses whitespace',
            ],
            correctIndex: 1,
            explanation: '`textContent` never parses HTML tags or `<script>` payloads.',
          },
        ],
        flashcards: [
          { front: '4 Pillars of DHTML?', back: 'HTML + CSS + Document Object Model (DOM) + JavaScript.' },
          { front: 'What is Event Delegation?', back: 'Attaching one event listener to a parent container and inspecting `event.target` via bubbling.' },
          { front: 'preventDefault() vs stopPropagation()?', back: 'preventDefault stops native browser action (submit/link); stopPropagation stops bubbling to parent nodes.' },
        ],
        assignment: {
          task: 'Write a DHTML validation function verifying non-empty name, email containing `@`, and password of at least 8 characters.',
          hint: 'Return `false` when validation fails and update a status `<p>` element.',
          solution: `function checkForm() { const n = nameEl.value.trim(), e = emailEl.value, p = passEl.value; if (!n || !e.includes('@') || p.length < 8) { msg.textContent = 'Invalid input'; return false; } return true; }`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is Event Bubbling in the DOM?',
            answer: 'Event Bubbling is the default DOM propagation phase where an event triggered on a child element propagates upward through its parent, body, document, and window.',
          },
          {
            marks: '7M',
            question: 'Explain Dynamic HTML (DHTML) and its four components. Write a JavaScript + HTML program to validate a registration form dynamically.',
            answer: 'DHTML unites HTML, CSS, DOM, and JavaScript to modify content and styling live. Provide the registration form with `<input>` fields for name, email, phone, and password, and a JS `validateForm()` handler checking constraints and toggling error/success DOM classes.',
          },
        ],
      },
      {
        id: 'u2-t5',
        code: '2.5',
        title: 'XML Basics, Document Type Definition (DTD) & XML Schemas (XSD)',
        bloom: 'L3 / L4 · Analyze',
        readMinutes: 8,
        keywords: ['Well-Formed vs Valid', 'DTD #PCDATA', 'XML Schema XSD', 'Namespaces', 'Quantifiers ? * +'],
        summary:
          'Self-describing XML syntax rules, distinguishing Well-Formed vs Valid documents, and enforcing schemas via DTD and strongly-typed XML Schema (XSD).',
        definition:
          'XML (eXtensible Markup Language) is a platform-independent markup language for storing and transporting self-describing structured data. A DTD or XML Schema (XSD) acts as a formal contract defining legal elements, attributes, nesting order, and data types.',
        purpose:
          'To let disparate enterprise systems (Java, .NET, Python, banks) exchange strictly validated structured data regardless of OS or hardware.',
        whyNeeded:
          'HTML describes how content looks; XML describes what data means. Without validation schemas (DTD/XSD), receiving servers could crash on missing fields or wrong types.',
        detailedTheory: [
          'Well-Formed vs Valid XML: An XML document is Well-Formed if it obeys core syntax—exactly one root element, properly nested and closed tags, case-sensitive tag matching, quoted attributes, and escaped entities (&lt;, &gt;, &amp;). It is Valid only if it is well-formed AND conforms to a DTD or XSD schema.',
          'Document Type Definition (DTD): Legacy grammar using non-XML syntax (`<!ELEMENT>`, `<!ATTLIST>`, `<!ENTITY>`). Uses `#PCDATA` (parsed character data) and cardinality symbols: `?` (0 or 1), `*` (0 or more), `+` (1 or more). Major limits: no XML syntax, no namespaces, and no numeric/date types.',
          'XML Schema Definition (XSD): W3C standard written in pure XML (`<xs:schema>`). Supports namespaces (`xmlns:xs`), 44+ built-in types (`xs:string`, `xs:integer`, `xs:decimal`, `xs:date`, `xs:boolean`), complex types (`<xs:sequence>`), and custom restrictions (`minInclusive`, `maxLength`, regex `pattern`).',
        ],
        mechanismSteps: [
          { step: 1, title: 'Prolog & Root Check', detail: 'Parser verifies single root element and matching case-sensitive end tags.', artifact: 'Well-Formed' },
          { step: 2, title: 'Schema Binding', detail: 'Locates internal/external DTD or XSD schema definition.', artifact: 'XSD / DTD' },
          { step: 3, title: 'Structural Verification', detail: 'Checks element sequence, cardinality (minOccurs/maxOccurs), and required attributes.', artifact: 'Structure OK' },
          { step: 4, title: 'Datatype Validation', detail: 'XSD validator verifies integers, dates, and regex facets.', artifact: 'Valid XML' },
        ],
        keyTakeaways: [
          'Every Valid XML document is Well-Formed, but Well-Formed XML is not automatically Valid.',
          'DTD quantifiers: `?` (0 or 1), `*` (0+), `+` (1+), `,` (sequence), `|` (choice).',
          'XSD outperforms DTD by using XML syntax, namespaces, and strict data typing.',
          'Use `<![CDATA[ ... ]]>` to embed literal code/symbols without XML parser interpretation.',
        ],
        realWorldExamples: [
          'Global banking networks (ISO 20022 / SWIFT) validate financial wire messages against strict XSD schemas.',
          'SOAP Web Services (WSDL) rely directly on XSD types to validate method arguments across languages.',
        ],
        comparisonTable: {
          title: 'DTD vs XML Schema (XSD)',
          headers: ['Feature', 'DTD (Document Type Definition)', 'XML Schema (XSD)'],
          rows: [
            ['Syntax', 'Non-XML SGML-derived syntax (<!ELEMENT>)', 'Pure XML syntax (<xs:element>)'],
            ['Data Types', 'Text only (#PCDATA / CDATA)', '44+ typed primitives (integer, decimal, date, boolean)'],
            ['Namespace Support', 'None', 'Full XML Namespace support'],
            ['Extensibility', 'Limited', 'Supports inheritance, restrictions, and facets'],
          ],
        },
        simulationId: 'xml-parser',
        simulationCaption: 'Inspect how XML documents are validated and parsed into hierarchical trees vs event streams.',
        examples: {
          basic: {
            title: 'Well-Formed XML Student Record',
            language: 'xml',
            runnableInSandbox: false,
            code: `<?xml version="1.0" encoding="UTF-8"?>
<university name="Quantum University">
  <student roll="23030007" sem="5">
    <name>Ananya Verma</name>
    <branch>CSE</branch>
    <course code="CS35302">Web Technology</course>
  </student>
</university>`,
            expectedOutput: 'Well-formed XML document with single <university> root and quoted attributes.',
            explanation: 'Demonstrates XML prolog, single root container, nested elements, and attributes.',
          },
          intermediate: {
            title: 'XML Validated with Internal DTD',
            language: 'xml',
            runnableInSandbox: false,
            code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE catalog [
  <!ELEMENT catalog (book+)>
  <!ELEMENT book (title, author, price)>
  <!ATTLIST book isbn ID #REQUIRED>
  <!ELEMENT title (#PCDATA)>
  <!ELEMENT author (#PCDATA)>
  <!ELEMENT price (#PCDATA)>
]>
<catalog>
  <book isbn="B101">
    <title>Web Technologies</title>
    <author>Uttam K. Roy</author>
    <price>550</price>
  </book>
</catalog>`,
            expectedOutput: 'Valid XML conforming to DTD (+ requires 1 or more <book> elements).',
            explanation: 'Uses `<!ELEMENT>` sequences and `#REQUIRED` ID attributes.',
          },
          advanced: {
            title: 'Strongly-Typed XML Schema (XSD)',
            language: 'xml',
            runnableInSandbox: false,
            code: `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="student">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="name" type="xs:string"/>
        <xs:element name="semester">
          <xs:simpleType>
            <xs:restriction base="xs:integer">
              <xs:minInclusive value="1"/>
              <xs:maxInclusive value="8"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="roll" type="xs:positiveInteger" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`,
            expectedOutput: 'Validates semester strictly as an integer between 1 and 8.',
            explanation: 'Demonstrates XSD `<xs:complexType>`, `<xs:sequence>`, and numeric range restrictions.',
          },
        },
        mistakes: [
          { mistake: 'Including two root elements side by side in an XML file.', fix: 'Wrap all sibling nodes inside a single root container.' },
          { mistake: 'Mismatched tag casing like `<Student>...</student>`.', fix: 'XML is strictly case-sensitive; opening and closing tags must match identically.' },
        ],
        bestPractices: [
          'Use XSD over DTD whenever numeric ranges, dates, or namespaces are needed.',
          'Escape reserved characters (`&amp;`, `&lt;`, `&gt;`) inside text nodes.',
        ],
        quiz: [
          {
            question: 'What differentiates a Valid XML document from a Well-Formed XML document?',
            options: [
              'Valid XML uses lowercase tags only',
              'Valid XML is well-formed AND conforms strictly to a DTD or XSD schema',
              'Well-formed XML cannot have attributes',
              'Valid XML skips the XML prolog',
            ],
            correctIndex: 1,
            explanation: 'Well-formed checks syntax; Valid checks structural and datatype compliance against a DTD or XSD.',
          },
          {
            question: 'In a DTD declaration, what does the `+` quantifier indicate in `<!ELEMENT catalog (book+)>`?',
            options: ['Zero or one book', 'Zero or more books', 'One or more books', 'Exactly two books'],
            correctIndex: 2,
            explanation: '`+` requires at least 1 occurrence; `*` allows 0 or more; `?` allows 0 or 1.',
          },
          {
            question: 'Why is XSD preferred over DTD in modern enterprise integrations?',
            options: [
              'XSD supports rich datatypes, XML syntax, and namespaces',
              'DTD requires Java 17',
              'XSD removes closing tags',
              'XSD only runs in CSS',
            ],
            correctIndex: 0,
            explanation: 'XSD is written in XML and provides built-in primitives like xs:integer, xs:date, and regex constraints.',
          },
        ],
        flashcards: [
          { front: 'Well-Formed vs Valid XML?', back: 'Well-Formed = obeys XML syntax rules. Valid = Well-Formed + passes DTD or XSD schema.' },
          { front: 'DTD Cardinality Symbols?', back: '? (0 or 1), * (0 or more), + (1 or more).' },
          { front: 'What is #PCDATA?', back: 'Parsed Character Data—text inside an XML element that the parser checks for entity references and nested tags.' },
        ],
        assignment: {
          task: 'Write an XSD snippet for a `<course>` element having `title` (xs:string), `credits` (integer 1–6), and required attribute `code`.',
          hint: 'Use `<xs:restriction base="xs:integer">` with minInclusive/maxInclusive.',
          solution: `<xs:element name="course"><xs:complexType><xs:sequence><xs:element name="title" type="xs:string"/><xs:element name="credits"><xs:simpleType><xs:restriction base="xs:integer"><xs:minInclusive value="1"/><xs:maxInclusive value="6"/></xs:restriction></xs:simpleType></xs:element></xs:sequence><xs:attribute name="code" type="xs:string" use="required"/></xs:complexType></xs:element>`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between Well-Formed and Valid XML documents.',
            answer: 'A Well-Formed XML document follows basic syntactic rules (single root, closed nested tags, case-sensitivity). A Valid XML document is Well-Formed AND strictly satisfies all structural and datatype rules defined in an associated DTD or XSD.',
          },
          {
            marks: '7M',
            question: 'Compare DTD and XML Schema (XSD). Create an XML file for 2 books along with its DTD and equivalent XSD.',
            answer: 'Contrast syntax, data typing, and namespaces in a table. Then write `<catalog><book isbn="..."><title>...</title><author>...</author><price>...</price></book></catalog>` validated by `<!ELEMENT catalog (book+)>` and `<xs:schema>` with `xs:string` and `xs:decimal`.',
          },
        ],
      },
      {
        id: 'u2-t6',
        code: '2.6',
        title: 'XML Object Models, Presenting XML & DOM vs SAX Processors',
        bloom: 'L4 / L5 · Evaluate',
        readMinutes: 7,
        keywords: ['XML DOM', 'XSLT & XPath', 'DOM Parser (Tree)', 'SAX Parser (Event)', 'Memory Trade-off'],
        summary:
          'Styling and transforming XML with CSS/XSLT and comparing tree-based in-memory DOM parsers against stream-based event-driven SAX processors.',
        definition:
          'Presenting XML attaches stylesheets (CSS or XSLT transformations) to turn raw XML data into visual HTML. XML Processors (Parsers) read XML programmatically via either the DOM (Document Object Model—in-memory node tree) or SAX (Simple API for XML—sequential event callbacks).',
        purpose:
          'To bridge raw XML data storage with human-readable UI output (XSLT/CSS) and efficient server-side extraction or mutation (DOM/SAX).',
        whyNeeded:
          'XML has no visual presentation tags of its own, and loading multi-gigabyte XML feeds into RAM with DOM crashes servers—making streaming SAX parsers essential.',
        detailedTheory: [
          'Presenting XML: Attaching CSS via `<?xml-stylesheet type="text/css" href="style.css"?>` styles XML nodes directly, while XSLT (`<xsl:stylesheet>`) uses XPath expressions (`/syllabus/unit`) and templates (`<xsl:for-each>`, `<xsl:value-of>`) to transform XML into complete HTML tables or alternate XML formats.',
          'DOM Parser (Tree-Based): Reads the entire XML document into heap RAM as an interactive tree of Element, Attr, and Text objects. Ideal for small-to-medium files when you need bidirectional traversal or in-place insertion/deletion. Drawback: memory consumption scales 3x–5x the raw file size.',
          'SAX Parser (Event-Driven): Reads XML linearly top-to-bottom as a byte stream, firing callback methods (`startDocument`, `startElement`, `characters`, `endElement`) without storing a tree in memory. Ideal for huge feeds (>100 MB) and fast extraction. Drawback: forward-only and read-only.',
        ],
        mechanismSteps: [
          { step: 1, title: 'XML Stream Input', detail: 'Parser opens XML file or network stream.', artifact: 'XML Bytes' },
          { step: 2, title: 'DOM Path (Heap Tree)', detail: 'Loads entire file into memory nodes; enables random read/write access.', artifact: 'O(N) RAM' },
          { step: 3, title: 'SAX Path (Callbacks)', detail: 'Emits startElement / characters / endElement events and discards tokens immediately.', artifact: 'O(1) RAM' },
          { step: 4, title: 'XSLT Presentation', detail: 'Matches XPath patterns and outputs formatted HTML DOM.', artifact: 'HTML View' },
        ],
        keyTakeaways: [
          'DOM = Tree-based, high RAM, bidirectional, read/write.',
          'SAX = Event-based, O(1) constant RAM, forward-only, read-only.',
          'XSLT relies on XPath queries to select and transform XML nodes into HTML.',
          'Use DOM for small config/document edits; use SAX for huge log/data streams.',
        ],
        realWorldExamples: [
          'Enterprise ingestion pipelines parse 2 GB XML product catalogs via SAX/StAX so memory stays flat under 20 MB.',
          'Regulatory financial filings transform XML reports into clean printable HTML via XSLT stylesheets.',
        ],
        comparisonTable: {
          title: 'DOM Parser vs SAX Parser (High-Frequency Exam Table)',
          headers: ['Criterion', 'DOM Parser', 'SAX Parser'],
          rows: [
            ['Architecture', 'Tree-based (loads full XML into RAM)', 'Event-driven (serial stream callbacks)'],
            ['Memory Footprint', 'High — proportional to XML file size', 'Very Low — constant O(1) memory'],
            ['Traversal', 'Bidirectional (parent, child, sibling jumps)', 'Forward-only (top to bottom)'],
            ['Modification', 'Read & Write (insert, update, delete nodes)', 'Read-Only (cannot alter XML in place)'],
            ['Best Use Case', 'Small/medium XML requiring editing', 'Huge XML files (100 MB+) & fast streaming reads'],
          ],
        },
        simulationId: 'xml-parser',
        simulationCaption: 'Interactive DOM vs SAX Simulator: Run both parsers on sample XML and watch live RAM consumption, tree nodes, and callback events side-by-side.',
        examples: {
          basic: {
            title: 'Browser DOMParser Live XML Extraction',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Live Browser DOMParser Demo</h3>
  <button onclick="parseXml()" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">
    Parse XML Tree
  </button>
  <ul id="out" style="margin-top:12px;"></ul>
</div>
<script>
  function parseXml() {
    const raw = '<syllabus><topic code="2.5">DTD &amp; XSD</topic><topic code="2.6">DOM &amp; SAX</topic></syllabus>';
    const doc = new DOMParser().parseFromString(raw, 'text/xml');
    const ul = document.getElementById('out');
    ul.innerHTML = '';
    doc.querySelectorAll('topic').forEach(node => {
      const li = document.createElement('li');
      li.textContent = node.getAttribute('code') + ' — ' + node.textContent;
      ul.appendChild(li);
    });
  }
</script>`,
            expectedOutput: 'Parses XML string into an in-memory XMLDocument and lists extracted topic codes and names.',
            explanation: 'Uses native browser `DOMParser` to query XML attributes and text nodes.',
          },
          intermediate: {
            title: 'XSLT Stylesheet Transforming XML to HTML Table',
            language: 'xml',
            runnableInSandbox: false,
            code: `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <h2>CS35302 Units</h2>
        <table border="1">
          <tr><th>Unit</th><th>Title</th></tr>
          <xsl:for-each select="syllabus/unit">
            <tr>
              <td><xsl:value-of select="@number"/></td>
              <td><xsl:value-of select="title"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`,
            expectedOutput: 'Transforms XML `<unit>` elements into an HTML table row per unit.',
            explanation: 'Uses XPath `syllabus/unit` inside `<xsl:for-each>` and `@number` attribute projection.',
          },
          advanced: {
            title: 'Event-Driven SAX Streaming Logic (JavaScript Simulation)',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>SAX Event Stream Simulator</h3>
  <button onclick="runSax()" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">
    Stream SAX Events
  </button>
  <pre id="saxLog" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  function runSax() {
    const events = [
      'startDocument()',
      'startElement("unit", { id: "2" })',
      'characters("HTML, CSS & XML")',
      'endElement("unit")',
      'endDocument()'
    ];
    document.getElementById('saxLog').textContent = events.join('\\n');
  }
</script>`,
            expectedOutput: 'Logs sequential SAX ContentHandler callback invocations.',
            explanation: 'Illustrates the linear callback stream executed by a SAX parser with constant memory.',
          },
        },
        mistakes: [
          { mistake: 'Loading a 500 MB XML export with DOM, causing OutOfMemoryError.', fix: 'Switch to a SAX or StAX streaming parser for large XML files.' },
          { mistake: 'Assuming SAX `characters()` always delivers an entire element’s text in one call.', fix: 'Accumulate characters in a string buffer until `endElement()` fires.' },
        ],
        bestPractices: [
          'Use XSLT when declarative XML-to-HTML or XML-to-XML restructuring is needed.',
          'Validate untrusted XML inputs with external-entity resolution disabled (prevents XXE attacks).',
        ],
        quiz: [
          {
            question: 'Which XML parser loads the entire XML file into memory as a navigable node tree?',
            options: ['SAX Parser', 'DOM Parser', 'Regex Parser', 'CSSOM Parser'],
            correctIndex: 1,
            explanation: 'DOM constructs a complete tree of nodes in RAM, allowing random access and editing.',
          },
          {
            question: 'Why does a SAX parser consume minimal memory compared to DOM?',
            options: [
              'It compresses XML into ZIP archives',
              'It processes XML linearly as a stream of events without building an in-memory tree',
              'It ignores attributes',
              'It deletes the file while reading',
            ],
            correctIndex: 1,
            explanation: 'SAX fires callbacks as tokens pass through the stream and discards them immediately.',
          },
          {
            question: 'Which path language does XSLT use to select nodes inside an XML document?',
            options: ['SQL', 'XPath', 'GraphQL', 'SPARQL'],
            correctIndex: 1,
            explanation: 'XSLT uses XPath expressions like `catalog/book/@isbn` to locate nodes.',
          },
        ],
        flashcards: [
          { front: 'DOM vs SAX Memory & Editing?', back: 'DOM: High memory, Read/Write. SAX: Constant low memory, Read-Only.' },
          { front: '3 Key SAX Callbacks?', back: 'startElement(), characters(), endElement().' },
          { front: 'What is XSLT?', back: 'eXtensible Stylesheet Language Transformations—converts XML into HTML or another XML structure using XPath.' },
        ],
        assignment: {
          task: 'Use `DOMParser` in JavaScript to parse `<items><item>DOM</item><item>SAX</item></items>` and render them inside an HTML `<ul>`.',
          hint: 'Use `doc.querySelectorAll("item")` and append `<li>` nodes.',
          solution: `const doc = new DOMParser().parseFromString('<items><item>DOM</item><item>SAX</item></items>', 'text/xml');\ndoc.querySelectorAll('item').forEach(x => console.log(x.textContent));`,
        },
        examQAs: [
          {
            marks: '2M',
            question: 'How do you link a CSS or XSLT stylesheet to an XML document?',
            answer: 'By adding the XML processing instruction at the top after the prolog: `<?xml-stylesheet type="text/xsl" href="style.xsl"?>` (or `type="text/css"`).',
          },
          {
            marks: '7M',
            question: 'Explain DOM and SAX XML processors with architecture diagrams and compare their memory usage, traversal, and modification capabilities.',
            answer: 'DOM parses the entire XML into an in-memory node tree (high RAM, bidirectional traversal, supports insert/update/delete). SAX streams XML top-to-bottom firing `startDocument`, `startElement`, `characters`, and `endElement` events (constant O(1) RAM, forward-only, read-only). Conclude with a 5-row comparison table and guidance on choosing each.',
          },
        ],
      },
    ],
  },
];

import type { HtmlTagEntry } from '../types/syllabus';

export const HTML_TAGS_DATABASE: HtmlTagEntry[] = [
  {
    tag: 'html',
    category: 'Document Structure',
    syntax: '<html lang="en">...</html>',
    description: 'Root element of an HTML5 document wrapping both <head> and <body>.',
    attributes: [
      { name: 'lang', type: 'BCP 47 code', description: 'Declares primary document language (e.g., "en", "hi") for screen readers and search engines.' },
      { name: 'dir', type: '"ltr" | "rtl"', description: 'Sets text directionality for international layouts.' },
    ],
    basicExample: `<!DOCTYPE html>
<html lang="en">
<head><title>Root Example</title></head>
<body><p>Hello Web Technology</p></body>
</html>`,
    advancedExample: `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head><meta charset="UTF-8"><title>Accessible Root</title></head>
<body><main><h1>CS35302 Portal</h1></main></body>
</html>`,
    useCases: ['Required top-level container on every HTML5 page', 'Targets global dark-mode classes or font-size scaling'],
    browserBehavior: 'Follows <!DOCTYPE html> to trigger Standards Mode instead of Quirks Mode.',
    accessibilityNotes: 'Setting lang="en" is mandatory under WCAG 2.1 SC 3.1.1 so screen readers load the right voice profile.',
  },
  {
    tag: 'head',
    category: 'Document Metadata',
    syntax: '<head>...</head>',
    description: 'Contains machine-readable document metadata, title, character set, stylesheets, and scripts not painted directly in the viewport.',
    attributes: [{ name: 'Global Attributes', type: 'Standard', description: 'Supports standard global attributes; typically takes none.' }],
    basicExample: `<head>
  <meta charset="UTF-8">
  <title>Syllabus Notes</title>
</head>`,
    advancedExample: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CS35302 Reference</title>
  <link rel="stylesheet" href="styles.css">
</head>`,
    useCases: ['Hosting <meta>, <title>, <link>, and <style>', 'Embedding Schema.org JSON-LD metadata'],
    browserBehavior: 'Parsed before <body>; render-blocking <link rel="stylesheet"> delays First Paint until CSSOM completes.',
    accessibilityNotes: 'Must include <title> so assistive tools announce the active tab cleanly.',
  },
  {
    tag: 'title',
    category: 'Document Metadata',
    syntax: '<title>Page Title</title>',
    description: 'Defines the plain-text title displayed in browser tabs, bookmarks, and search results.',
    attributes: [{ name: 'Global Attributes', type: 'Text only', description: 'Cannot contain nested HTML tags.' }],
    basicExample: `<title>Unit 1: Core Protocols — CS35302</title>`,
    advancedExample: `<title>HTTP vs SMTP vs IMAP · Interactive Web Technology Guide</title>`,
    useCases: ['Browser tab identification', 'Search Engine Results Page (SERP) clickable headline'],
    browserBehavior: 'Sets document.title; plain text only (HTML markup inside <title> renders literally).',
    accessibilityNotes: 'First item announced by screen readers when switching browser tabs or opening links.',
  },
  {
    tag: 'meta',
    category: 'Document Metadata',
    syntax: '<meta name="..." content="..." />',
    description: 'Void element supplying character encoding, viewport scaling, SEO descriptions, and OpenGraph tags.',
    attributes: [
      { name: 'charset', type: 'Encoding', description: 'Always set to "UTF-8" as the first element inside <head>.' },
      { name: 'name / content', type: 'Key / Value', description: 'Metadata pair such as viewport or description.' },
    ],
    basicExample: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    advancedExample: `<meta name="description" content="CS35302 interactive syllabus guide.">
<meta property="og:title" content="Web Technology Portal">`,
    useCases: ['Mobile responsive viewport sizing', 'UTF-8 emoji and multilingual glyph rendering', 'SEO & social cards'],
    browserBehavior: 'Self-closing void tag inside <head>. Without viewport meta, mobile browsers zoom out to ~980px.',
    accessibilityNotes: 'Never use user-scalable=no in viewport meta; it blocks low-vision pinch zooming.',
  },
  {
    tag: 'body',
    category: 'Document Structure',
    syntax: '<body>...</body>',
    description: 'Encloses all visible content, interactive controls, text, images, and scripts rendered in the browser viewport.',
    attributes: [{ name: 'class / id', type: 'Global', description: 'Sets global font, background, and theme tokens.' }],
    basicExample: `<body>
  <h1>Welcome to Unit 2</h1>
  <p>Document body content renders here.</p>
</body>`,
    advancedExample: `<body style="margin:0; font-family: system-ui; background:#F6F8F7; color:#24160E; padding:24px;">
  <header><strong>Course Header</strong></header>
  <main><p>Clean editorial spacing.</p></main>
</body>`,
    useCases: ['Main visual container of the HTML document', 'Root target for CSS custom property inheritance'],
    browserBehavior: 'Browsers apply an 8px default margin to <body> unless reset via CSS.',
    accessibilityNotes: 'Organize child elements using semantic landmarks (<header>, <main>, <footer>) rather than raw divs.',
  },
  {
    tag: 'h1-h6',
    category: 'Text & Headings',
    syntax: '<h1>Top Heading</h1> ... <h6>Minor Heading</h6>',
    description: 'Six levels of hierarchical section headings where <h1> is the primary document title and <h6> is the lowest sub-level.',
    attributes: [{ name: 'id / class', type: 'Global', description: 'Enables deep-linking (#section) and styling.' }],
    basicExample: `<h1>CS35302 Web Technology</h1>
<h2>Unit 1: Core Protocols</h2>
<h3>1.3 HTTP &amp; Email</h3>`,
    advancedExample: `<article style="font-family: Georgia, serif; color:#24160E;">
  <h1 style="margin-bottom:4px;">Hierarchical Typography</h1>
  <h2 style="font-size:1.1rem; color:#1D4ED8;">Subordinate Section Title</h2>
  <p>Never skip heading levels (e.g., h1 straight to h4) purely for font size.</p>
</article>`,
    useCases: ['Structuring document outlines', 'Enabling Table of Contents and screen-reader jump navigation'],
    browserBehavior: 'Block-level elements with descending default font sizes and bold weight.',
    accessibilityNotes: 'Use one main <h1> per page and do not skip heading levels; screen-reader users jump by heading hierarchy.',
  },
  {
    tag: 'p',
    category: 'Text & Headings',
    syntax: '<p>Paragraph text...</p>',
    description: 'Represents a logical paragraph of prose content.',
    attributes: [{ name: 'class / style', type: 'Global', description: 'Controls measure (max-width: 68ch) and line-height.' }],
    basicExample: `<p>HTTP is a stateless request-response protocol operating over TCP.</p>
<p>Each request contains headers and an optional message body.</p>`,
    advancedExample: `<p style="max-width:65ch; line-height:1.65; color:#24160E;">
  Optimal editorial readability maintains <strong>60–75 characters</strong> per line with generous vertical breathing room.
</p>`,
    useCases: ['Body copy, definitions, and article prose', 'Separating thematic thoughts semantically'],
    browserBehavior: 'Block-level element with top and bottom margins; collapses consecutive whitespace into single spaces.',
    accessibilityNotes: 'Never use empty <p></p> tags or repeated <br> tags for spacing; use CSS margins instead.',
  },
  {
    tag: 'a',
    category: 'Links & Media',
    syntax: '<a href="url">Anchor Text</a>',
    description: 'Creates a hyperlink to web pages, files, email addresses (`mailto:`), or same-page fragment anchors (`#id`).',
    attributes: [
      { name: 'href', type: 'URI', description: 'Destination URL, relative path, or #fragment.' },
      { name: 'target', type: '"_self" | "_blank"', description: 'Controls browsing context; pair _blank with rel="noopener noreferrer".' },
      { name: 'download', type: 'Filename', description: 'Prompts the browser to save the linked resource instead of navigating.' },
    ],
    basicExample: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Documentation
</a>`,
    advancedExample: `<div style="font-family:system-ui; padding:12px;">
  <a href="#unit2" style="color:#0F766E; font-weight:600; text-decoration:underline;">Jump to Unit 2 Summary</a>
  <p id="unit2" style="margin-top:24px; padding:10px; background:#F2EBE1;">Anchored Section Reached!</p>
</div>`,
    useCases: ['Navigation menus', 'In-page table of contents anchors', 'mailto: and tel: action links'],
    browserBehavior: 'Inline element with focus ring and pointer cursor only when href is present.',
    accessibilityNotes: 'Use descriptive link text ("Download CS35302 Syllabus") instead of vague "Click here".',
  },
  {
    tag: 'img',
    category: 'Links & Media',
    syntax: '<img src="path.jpg" alt="Description" width="300" height="200" />',
    description: 'Void element that embeds a raster or vector image into the document.',
    attributes: [
      { name: 'src', type: 'URL', description: 'Source path of the image asset.' },
      { name: 'alt', type: 'String', description: 'Mandatory concise alternative text for screen readers and broken images.' },
      { name: 'loading', type: '"lazy" | "eager"', description: 'Defers off-screen image fetching until near viewport.' },
    ],
    basicExample: `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='60'%3E%3Crect width='180' height='60' rx='8' fill='%234A2C1D'/%3E%3Ctext x='90' y='35' fill='%23FAF6F0' text-anchor='middle' font-family='sans-serif' font-size='14'%3EWeb Tech%3C/text%3E%3C/svg%3E" alt="Web Tech Graphic" width="180" height="60" />`,
    advancedExample: `<figure style="margin:0; font-family:system-ui;">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='80'%3E%3Crect width='240' height='80' rx='8' fill='%238B4C24'/%3E%3Ctext x='120' y='45' fill='%23FAF6F0' text-anchor='middle' font-family='sans-serif'%3EDiagram Asset%3C/text%3E%3C/svg%3E" alt="Sample diagram placeholder" width="240" height="80" loading="lazy" />
  <figcaption style="font-size:12px; color:#533B2C; margin-top:4px;">Explicit width &amp; height prevent Cumulative Layout Shift (CLS).</figcaption>
</figure>`,
    useCases: ['Diagrams, photos, and UI graphics', 'Responsive images with <picture> and srcset'],
    browserBehavior: 'Inline-replaced element; declaring width and height reserves aspect-ratio space before download completes.',
    accessibilityNotes: 'Always provide alt; use alt="" for purely decorative images so screen readers skip them.',
  },
  {
    tag: 'div',
    category: 'Containers & Layout',
    syntax: '<div class="card">...</div>',
    description: 'Generic block-level container used solely as a styling or layout hook when no semantic HTML5 landmark applies.',
    attributes: [{ name: 'class / id / style', type: 'Global', description: 'Applies CSS Grid, Flexbox, padding, and borders.' }],
    basicExample: `<div style="padding:16px; background:#F2EBE1; border:1px solid #DCE3E0; border-radius:8px;">
  Generic Block Container
</div>`,
    advancedExample: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-family:system-ui;">
  <div style="padding:12px; background:#FFFDF9; border:1px solid #DCE3E0; border-radius:6px;">Column A</div>
  <div style="padding:12px; background:#FFFDF9; border:1px solid #DCE3E0; border-radius:6px;">Column B</div>
</div>`,
    useCases: ['Flexbox and CSS Grid layout wrappers', 'Grouping non-semantic visual widgets'],
    browserBehavior: 'Block element spanning 100% of parent width by default.',
    accessibilityNotes: 'Prefer <header>, <nav>, <main>, <section>, or <article> over <div> whenever content has structural meaning.',
  },
  {
    tag: 'span',
    category: 'Containers & Layout',
    syntax: '<span class="highlight">text</span>',
    description: 'Generic inline container for styling or scripting a slice of text inside a paragraph without causing a line break.',
    attributes: [{ name: 'class / style', type: 'Global', description: 'Targets color, font weight, or JS updates.' }],
    basicExample: `<p>HTTP status <span style="color:#15803D; font-weight:700;">200 OK</span> indicates success.</p>`,
    advancedExample: `<p style="font-family:system-ui;">
  Active Protocol: <span id="proto" style="font-family:monospace; background:#E9DFD1; padding:2px 6px; border-radius:4px;">HTTPS/2</span>
</p>`,
    useCases: ['Highlighting inline code or status words', 'Dynamically updating a numeric value inside prose'],
    browserBehavior: 'Inline element; ignores width/height properties unless styled inline-block.',
    accessibilityNotes: 'Never turn a <span> into a fake clickable button; use <button> for keyboard/screen-reader support.',
  },
  {
    tag: 'form',
    category: 'Forms & Controls',
    syntax: '<form action="/submit" method="POST">...</form>',
    description: 'Collects structured user input controls and submits validated data to a server or JavaScript handler.',
    attributes: [
      { name: 'action', type: 'URL', description: 'Server endpoint receiving the form submission.' },
      { name: 'method', type: '"GET" | "POST"', description: 'HTTP verb used; use POST for mutations/credentials.' },
    ],
    basicExample: `<form onsubmit="event.preventDefault(); document.getElementById('msg').textContent='Form submitted safely!';">
  <label>Name: <input type="text" required /></label>
  <button type="submit">Submit</button>
  <p id="msg"></p>
</form>`,
    advancedExample: `<form onsubmit="event.preventDefault(); document.getElementById('res').textContent='Saved ' + this.email.value;" style="display:grid; gap:10px; max-width:300px; font-family:system-ui;">
  <label>Student Email <input name="email" type="email" required style="width:100%; padding:6px; border:1px solid #C9B9A5;" /></label>
  <button type="submit" style="padding:8px; background:#0F766E; color:#fff; border:none; border-radius:4px; cursor:pointer;">Register</button>
  <div id="res" style="color:#15803D; font-size:13px;"></div>
</form>`,
    useCases: ['Login & registration workflows', 'Search bars and feedback surveys'],
    browserBehavior: 'Submitting triggers HTML5 constraint validation before firing the submit event.',
    accessibilityNotes: 'Associate every form control with a <label> and group related checkboxes inside <fieldset>/<legend>.',
  },
  {
    tag: 'input',
    category: 'Forms & Controls',
    syntax: '<input type="email" name="email" required />',
    description: 'Versatile interactive void control supporting text, email, password, number, date, range, checkbox, and radio inputs.',
    attributes: [
      { name: 'type', type: 'InputType', description: 'Controls native validation and mobile keyboard layout (email, tel, number, date).' },
      { name: 'required / pattern', type: 'Validation', description: 'Enforces client-side non-empty and regex checks.' },
    ],
    basicExample: `<label>Marks (0-100): <input type="number" min="0" max="100" value="85" /></label>`,
    advancedExample: `<div style="font-family:system-ui;">
  <label for="rng">Padding: <span id="val">16</span>px</label><br/>
  <input id="rng" type="range" min="0" max="40" value="16" oninput="document.getElementById('val').textContent=this.value" />
</div>`,
    useCases: ['Text fields, numeric sliders, radio buttons, checkboxes, and file pickers'],
    browserBehavior: 'Void element with built-in pseudo-classes like :valid, :invalid, and :focus.',
    accessibilityNotes: 'Never rely solely on placeholder text as a label; always pair with a visible <label for="...">.',
  },
  {
    tag: 'textarea',
    category: 'Forms & Controls',
    syntax: '<textarea rows="4" cols="40"></textarea>',
    description: 'Multi-line plain-text editing control for comments, addresses, or code snippets.',
    attributes: [
      { name: 'rows / cols', type: 'Integer', description: 'Sets initial visible lines and column width.' },
      { name: 'maxlength', type: 'Integer', description: 'Limits total characters permitted.' },
    ],
    basicExample: `<textarea rows="3" cols="36" placeholder="Write your exam answer summary..."></textarea>`,
    advancedExample: `<div style="font-family:system-ui;">
  <textarea id="ta" rows="3" maxlength="120" oninput="document.getElementById('cnt').textContent=this.value.length+'/120'" style="width:100%; padding:8px; border:1px solid #C9B9A5;"></textarea>
  <small id="cnt">0/120</small>
</div>`,
    useCases: ['Feedback boxes, support tickets, bio editors, live code sandboxes'],
    browserBehavior: 'Allows resizing by default (controllable via CSS resize: vertical | none).',
    accessibilityNotes: 'Pair with a descriptive <label> and announce remaining character limits politely if enforced.',
  },
  {
    tag: 'button',
    category: 'Forms & Controls',
    syntax: '<button type="button">Action</button>',
    description: 'Native clickable button element supporting Enter/Space keyboard activation and rich child content.',
    attributes: [
      { name: 'type', type: '"button" | "submit" | "reset"', description: 'Always specify type="button" when outside or non-submitting inside a <form>.' },
      { name: 'disabled', type: 'Boolean', description: 'Prevents interaction and dims control.' },
    ],
    basicExample: `<button type="button" onclick="this.textContent='Clicked!'">Click Me</button>`,
    advancedExample: `<button type="button" onclick="this.nextElementSibling.textContent='Simulated GET /api -> 200 OK'" style="padding:8px 16px; background:#0F766E; color:#F6F8F7; border:none; border-radius:6px; cursor:pointer;">Run Request</button>
<p style="font-family:monospace;"></p>`,
    useCases: ['Form submission', 'Opening dialogs, toggling tabs, running sandbox actions'],
    browserBehavior: 'Inside a <form>, omitted type defaults to "submit"—a frequent source of accidental page reloads.',
    accessibilityNotes: 'Prefer native <button> over clickable <div>; native buttons automatically handle focus and keyboard triggers.',
  },
  {
    tag: 'select',
    category: 'Forms & Controls',
    syntax: '<select name="unit"><option value="1">Unit 1</option></select>',
    description: 'Creates a native dropdown menu (or multi-select listbox) containing <option> choices.',
    attributes: [
      { name: 'name', type: 'String', description: 'Form submission key.' },
      { name: 'multiple', type: 'Boolean', description: 'Allows selecting multiple options simultaneously.' },
    ],
    basicExample: `<label>Protocol:
  <select onchange="document.getElementById('pOut').textContent='Selected: '+this.value">
    <option value="HTTP">HTTP (Port 80)</option>
    <option value="HTTPS">HTTPS (Port 443)</option>
    <option value="SMTP">SMTP (Port 25/587)</option>
  </select>
</label>
<p id="pOut"></p>`,
    advancedExample: `<select aria-label="Choose Syllabus Unit" style="padding:6px 10px; border:1px solid #C9B9A5; border-radius:6px;">
  <optgroup label="Core Foundations">
    <option value="u1">Unit 1: Protocols &amp; DNS</option>
    <option value="u2">Unit 2: HTML, CSS &amp; XML</option>
  </optgroup>
  <optgroup label="Distributed &amp; Modern">
    <option value="u3">Unit 3: SOA, SOAP &amp; AJAX</option>
  </optgroup>
</select>`,
    useCases: ['Country/state pickers, protocol selectors, filter dropdowns'],
    browserBehavior: 'Renders native OS dropdown controls, ensuring reliable mobile touch wheels.',
    accessibilityNotes: 'Always associate with a <label> or aria-label and use <optgroup> for long categorized lists.',
  },
  {
    tag: 'option',
    category: 'Forms & Controls',
    syntax: '<option value="val">Label</option>',
    description: 'Defines an individual selectable item inside <select>, <optgroup>, or <datalist>.',
    attributes: [
      { name: 'value', type: 'String', description: 'Submitted payload value (falls back to text content if omitted).' },
      { name: 'selected / disabled', type: 'Boolean', description: 'Marks initial selection or disables an unavailable choice.' },
    ],
    basicExample: `<select>
  <option value="" disabled selected>Choose parser...</option>
  <option value="dom">DOM Parser (Tree)</option>
  <option value="sax">SAX Parser (Stream)</option>
</select>`,
    advancedExample: `<input list="browsers" placeholder="Type browser engine..." />
<datalist id="browsers">
  <option value="Blink (Chrome/Edge)">
  <option value="Gecko (Firefox)">
  <option value="WebKit (Safari)">
</datalist>`,
    useCases: ['Items inside dropdown menus', 'Autocomplete suggestions via <datalist>'],
    browserBehavior: 'Text content displays to the user while the value attribute is transmitted on submit.',
    accessibilityNotes: 'Keep option labels concise and avoid disabling options without explanation.',
  },
  {
    tag: 'table',
    category: 'Tables & Lists',
    syntax: '<table><thead><tr><th>Col</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>',
    description: 'Displays structured two-dimensional tabular data using rows (<tr>), header cells (<th>), and data cells (<td>).',
    attributes: [
      { name: 'scope (on th)', type: '"col" | "row"', description: 'Tells screen readers whether a header applies to a column or row.' },
      { name: 'colspan / rowspan', type: 'Integer', description: 'Spans a cell across multiple columns or rows.' },
    ],
    basicExample: `<table border="1" cellpadding="6" style="border-collapse:collapse; font-family:system-ui;">
  <thead><tr><th>Protocol</th><th>Port</th></tr></thead>
  <tbody><tr><td>HTTP</td><td>80</td></tr><tr><td>HTTPS</td><td>443</td></tr></tbody>
</table>`,
    advancedExample: `<table style="width:100%; border-collapse:collapse; font-family:system-ui;">
  <caption style="font-weight:700; margin-bottom:6px; text-align:left;">Email Protocol Matrix</caption>
  <thead><tr style="background:#F2EBE1;"><th scope="col" style="padding:8px; border:1px solid #DCE3E0;">Protocol</th><th scope="col" style="padding:8px; border:1px solid #DCE3E0;">Direction</th></tr></thead>
  <tbody><tr><td style="padding:8px; border:1px solid #DCE3E0;">SMTP</td><td style="padding:8px; border:1px solid #DCE3E0;">Push (Send)</td></tr></tbody>
</table>`,
    useCases: ['Protocol port matrices, timetables, grade sheets, financial tables'],
    browserBehavior: 'Use border-collapse: collapse in CSS to merge adjacent cell borders cleanly.',
    accessibilityNotes: 'Always include <thead>, <caption>, and <th scope="col|row">. Never use tables for visual page layout.',
  },
  {
    tag: 'ul',
    category: 'Tables & Lists',
    syntax: '<ul><li>Item</li></ul>',
    description: 'Represents an unordered bulleted list where item sequence does not change meaning.',
    attributes: [{ name: 'class / style', type: 'Global', description: 'Controls list-style-type (disc, circle, none).' }],
    basicExample: `<ul>
  <li>HTML — Structure</li>
  <li>CSS — Presentation</li>
  <li>JavaScript — Behavior</li>
</ul>`,
    advancedExample: `<ul style="list-style:none; padding:0; display:flex; gap:12px; font-family:system-ui;">
  <li><a href="#u1">Unit 1</a></li>
  <li><a href="#u2">Unit 2</a></li>
  <li><a href="#u3">Unit 3</a></li>
</ul>`,
    useCases: ['Feature summaries, navigation link lists, keyword bullet points'],
    browserBehavior: 'Block element with left padding and disc bullets by default.',
    accessibilityNotes: 'Direct children of <ul> must be <li> elements; screen readers announce exact item count ("list of 3 items").',
  },
  {
    tag: 'ol',
    category: 'Tables & Lists',
    syntax: '<ol><li>Step 1</li></ol>',
    description: 'Represents an ordered numbered list where sequence matters (steps, algorithms, rankings).',
    attributes: [
      { name: 'type', type: '"1" | "A" | "a" | "I" | "i"', description: 'Selects numbering style.' },
      { name: 'start / reversed', type: 'Number / Bool', description: 'Customizes starting index or countdown order.' },
    ],
    basicExample: `<ol>
  <li>DNS Lookup</li>
  <li>TCP 3-Way Handshake</li>
  <li>HTTP GET Request</li>
</ol>`,
    advancedExample: `<ol type="I" start="3" style="font-family:system-ui; line-height:1.7;">
  <li>UDDI Registry Lookup</li>
  <li>WSDL Contract Inspection</li>
  <li>SOAP Envelope Binding</li>
</ol>`,
    useCases: ['Protocol handshakes, cooking recipes, top-10 rankings, setup instructions'],
    browserBehavior: 'Auto-increments counters cleanly even if items are added or reordered in DOM.',
    accessibilityNotes: 'Communicates strict sequential order to assistive technology.',
  },
  {
    tag: 'li',
    category: 'Tables & Lists',
    syntax: '<li>List Item</li>',
    description: 'Represents an individual item inside a parent <ul>, <ol>, or <menu>.',
    attributes: [{ name: 'value (inside ol)', type: 'Integer', description: 'Overrides the ordinal number of a specific item.' }],
    basicExample: `<ul>
  <li>First takeaway</li>
  <li>Nested list:
    <ol><li>Sub-step A</li><li>Sub-step B</li></ol>
  </li>
</ul>`,
    advancedExample: `<ol style="font-family:system-ui;">
  <li value="200">HTTP OK</li>
  <li value="404">HTTP Not Found</li>
</ol>`,
    useCases: ['Individual bullet points, menu items, breadcrumb steps'],
    browserBehavior: 'Uses display: list-item with a ::marker pseudo-element.',
    accessibilityNotes: 'Always wrap <li> elements inside <ul> or <ol>; never leave orphan <li> tags.',
  },
  {
    tag: 'nav',
    category: 'Semantic Layout',
    syntax: '<nav aria-label="Primary">...</nav>',
    description: 'Semantic landmark section containing primary navigation links, breadcrumbs, or table of contents.',
    attributes: [{ name: 'aria-label', type: 'String', description: 'Distinguishes multiple <nav> landmarks (e.g., "Primary" vs "Breadcrumb").' }],
    basicExample: `<nav aria-label="Main Menu">
  <a href="#home">Home</a> | <a href="#syllabus">Syllabus</a> | <a href="#labs">Labs</a>
</nav>`,
    advancedExample: `<nav aria-label="Unit Links" style="display:flex; gap:16px; padding:10px 14px; background:#F2EBE1; border-radius:6px; font-family:system-ui;">
  <a href="#u1" style="color:#0F766E; font-weight:600; text-decoration:none;">Unit 1</a>
  <a href="#u2" style="color:#0F766E; font-weight:600; text-decoration:none;">Unit 2</a>
  <a href="#u3" style="color:#0F766E; font-weight:600; text-decoration:none;">Unit 3</a>
</nav>`,
    useCases: ['Top header navigation bars, sidebar curriculum trees, pagination controls'],
    browserBehavior: 'Block-level container with identical rendering to <div> but rich semantic meaning.',
    accessibilityNotes: 'Reserve <nav> for major navigation blocks so screen-reader landmark menus stay uncluttered.',
  },
  {
    tag: 'header',
    category: 'Semantic Layout',
    syntax: '<header>...</header>',
    description: 'Introductory content for the page or a specific <article>/<section> (brand logo, title, byline, nav).',
    attributes: [{ name: 'class / id', type: 'Global', description: 'Standard global styling attributes.' }],
    basicExample: `<header>
  <h1>Quantum University CS35302</h1>
  <p>Web Technology Interactive Study Guide</p>
</header>`,
    advancedExample: `<header style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid #DCE3E0; font-family:system-ui;">
  <strong>CS35302 Studio</strong>
  <nav><a href="#docs">Docs</a> · <a href="#quiz">Quiz</a></nav>
</header>`,
    useCases: ['Site masthead banners', 'Article title + author metadata header'],
    browserBehavior: 'Block element; acts as a "banner" landmark only when a direct child of <body>.',
    accessibilityNotes: 'Do not nest a <header> inside another <header> or <footer>.',
  },
  {
    tag: 'footer',
    category: 'Semantic Layout',
    syntax: '<footer>...</footer>',
    description: 'Closing metadata region for its nearest ancestor section or page (copyright, syllabus references, back-to-top links).',
    attributes: [{ name: 'class / id', type: 'Global', description: 'Standard styling hooks.' }],
    basicExample: `<footer>
  <p>&copy; 2025 CS35302 Web Technology Reference</p>
</footer>`,
    advancedExample: `<footer style="margin-top:24px; padding:16px; border-top:1px solid #DCE3E0; font-size:13px; color:#533B2C; font-family:system-ui;">
  <p style="margin:0;">Quantum University B.Tech CSE · Units 1–5 Complete Guide</p>
</footer>`,
    useCases: ['Site-wide footers', 'Article author citations and revision timestamps'],
    browserBehavior: 'Block element acting as "contentinfo" landmark when direct child of <body>.',
    accessibilityNotes: 'Keep footer links keyboard-focusable with clear contrast.',
  },
  {
    tag: 'section',
    category: 'Semantic Layout',
    syntax: '<section aria-labelledby="sec-id">...</section>',
    description: 'Groups thematically related content together, almost always beginning with a heading (<h2>–<h6>).',
    attributes: [{ name: 'aria-labelledby', type: 'ID ref', description: 'Links the section landmark to its heading ID.' }],
    basicExample: `<section>
  <h2>Core Mechanisms</h2>
  <p>Step-by-step execution pipeline...</p>
</section>`,
    advancedExample: `<section aria-labelledby="u1-heading" style="padding:16px; border:1px solid #DCE3E0; border-radius:8px; font-family:system-ui;">
  <h2 id="u1-heading" style="margin-top:0;">Unit 1: DNS Hierarchy</h2>
  <p>Root -> TLD -> Authoritative Nameserver.</p>
</section>`,
    useCases: ['Chapters of a study guide', 'Distinct landing page thematic bands'],
    browserBehavior: 'Block element; treated as a generic region landmark when labeled.',
    accessibilityNotes: 'If a block lacks a heading and is only for visual styling, use <div> instead of <section>.',
  },
  {
    tag: 'article',
    category: 'Semantic Layout',
    syntax: '<article>...</article>',
    description: 'Self-contained, independently distributable composition (blog post, syllabus topic card, forum comment, RSS item).',
    attributes: [{ name: 'class / id', type: 'Global', description: 'Standard styling hooks.' }],
    basicExample: `<article>
  <h2>What is SOAP?</h2>
  <p>SOAP is an XML-based messaging protocol using Envelope, Header, and Body.</p>
</article>`,
    advancedExample: `<article style="max-width:60ch; padding:18px; background:#FFFDF9; border:1px solid #DCE3E0; border-radius:8px; font-family:Georgia, serif;">
  <h2 style="margin-top:0;">DNS Recursive vs Iterative Lookup</h2>
  <p>An independent study unit suitable for RSS syndication or standalone printing.</p>
</article>`,
    useCases: ['Blog entries, news stories, standalone topic lessons, social feed cards'],
    browserBehavior: 'Block container; can contain nested <header>, <section>, and <footer> elements.',
    accessibilityNotes: 'Screen readers treat <article> as a distinct navigable composition.',
  },
  {
    tag: 'aside',
    category: 'Semantic Layout',
    syntax: '<aside>...</aside>',
    description: 'Tangentially related content separate from the main flow—sidebars, glossary callouts, or related links.',
    attributes: [{ name: 'aria-label', type: 'String', description: 'Describes the complementary region.' }],
    basicExample: `<aside style="padding:12px; background:#F2EBE1; border-radius:6px;">
  <strong>Exam Tip:</strong> Always draw the SOA triangle in 7-mark answers.
</aside>`,
    advancedExample: `<div style="display:grid; grid-template-columns:2fr 1fr; gap:16px; font-family:system-ui;">
  <main><p>Main lesson explanation on HTTP/2 multiplexing.</p></main>
  <aside aria-label="Glossary" style="padding:12px; background:#F2EBE1; border-radius:6px;">
    <strong>Key Term</strong><br/><small>Port 443 = HTTPS</small>
  </aside>
</div>`,
    useCases: ['Curriculum sidebars, pull quotes, exam hint boxes, related reading'],
    browserBehavior: 'Block element mapping to the "complementary" ARIA landmark role.',
    accessibilityNotes: 'Do not place essential core instructions inside <aside> if users might skip complementary panels.',
  },
  {
    tag: 'audio',
    category: 'Links & Media',
    syntax: '<audio controls src="clip.mp3"></audio>',
    description: 'Native HTML5 multimedia element for embedding sound streams, podcasts, or pronunciation clips without plugins.',
    attributes: [
      { name: 'controls', type: 'Boolean', description: 'Displays native play/pause, scrubber, and volume UI.' },
      { name: 'preload', type: '"none" | "metadata" | "auto"', description: 'Optimizes bandwidth before playback starts.' },
    ],
    basicExample: `<audio controls>
  <source src="lecture.mp3" type="audio/mpeg" />
  Your browser does not support HTML5 audio.
</audio>`,
    advancedExample: `<figure style="margin:0; font-family:system-ui;">
  <figcaption style="font-size:13px; margin-bottom:6px;">Lecture Audio Placeholder (Native Controls):</figcaption>
  <audio controls preload="none" style="width:100%;"></audio>
</figure>`,
    useCases: ['Podcast players, language pronunciation drills, lecture recordings'],
    browserBehavior: 'Browsers block unmuted autoplay until user interaction.',
    accessibilityNotes: 'Provide text transcripts alongside spoken audio for deaf and hard-of-hearing learners.',
  },
  {
    tag: 'video',
    category: 'Links & Media',
    syntax: '<video controls width="400"><source src="demo.mp4" type="video/mp4" /></video>',
    description: 'Native HTML5 video player supporting MP4/WebM streams, poster thumbnails, and WebVTT caption tracks.',
    attributes: [
      { name: 'controls / muted / playsinline', type: 'Boolean', description: 'Controls playback chrome and mobile inline rendering.' },
      { name: 'poster', type: 'URL', description: 'Preview image displayed before playback begins.' },
    ],
    basicExample: `<video controls width="320" poster="thumb.jpg">
  <source src="lab-demo.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
</video>`,
    advancedExample: `<div style="font-family:system-ui; padding:12px; background:#F2EBE1; border-radius:8px;">
  <video controls width="300" style="border-radius:6px; background:#24160E;"></video>
  <p style="font-size:12px; margin:6px 0 0;">Include <code>&lt;track kind="captions"&gt;</code> for WebVTT accessibility.</p>
</div>`,
    useCases: ['Course video lectures, background hero loops, WebRTC live video streams'],
    browserBehavior: 'Autoplay only works reliably when `muted` and `playsinline` are both set.',
    accessibilityNotes: 'Always provide synchronized WebVTT captions (<track kind="captions">) for spoken content.',
  },
  {
    tag: 'canvas',
    category: 'Graphics & Interactive',
    syntax: '<canvas id="c" width="300" height="150"></canvas>',
    description: 'Resolution-dependent bitmap drawing surface controlled via JavaScript 2D Context or WebGL/WebGPU 3D shaders.',
    attributes: [
      { name: 'width', type: 'Integer', description: 'Internal bitmap coordinate width in pixels (default 300).' },
      { name: 'height', type: 'Integer', description: 'Internal bitmap coordinate height in pixels (default 150).' },
    ],
    basicExample: `<canvas id="demo" width="240" height="100" style="border:1px solid #C9B9A5;"></canvas>
<script>
  const ctx = document.getElementById('demo').getContext('2d');
  ctx.fillStyle = '#0F766E';
  ctx.fillRect(20, 20, 90, 55);
  ctx.fillStyle = '#1D4ED8';
  ctx.beginPath(); ctx.arc(170, 48, 28, 0, Math.PI * 2); ctx.fill();
</script>`,
    advancedExample: `<canvas id="wave" width="280" height="110" style="background:#F6F8F7; border:1px solid #DCE3E0; border-radius:6px;"></canvas>
<script>
  const c = document.getElementById('wave').getContext('2d');
  c.strokeStyle = '#0F766E'; c.lineWidth = 2.5; c.beginPath();
  for (let x = 0; x <= 280; x += 4) {
    const y = 55 + Math.sin(x * 0.06) * 28;
    x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
  }
  c.stroke();
</script>`,
    useCases: ['2D physics games, real-time audio waveforms, Three.js WebGL/WebXR scenes'],
    browserBehavior: 'Set resolution via HTML attributes rather than CSS alone to avoid blurry pixel stretching.',
    accessibilityNotes: 'Pixels inside <canvas> are invisible to screen readers; include fallback DOM text inside <canvas>...</canvas>.',
  },
  {
    tag: 'svg',
    category: 'Graphics & Interactive',
    syntax: '<svg viewBox="0 0 100 100" width="100" height="100">...</svg>',
    description: 'XML-based Scalable Vector Graphics container rendering crisp shapes, icons, and interactive diagrams at any zoom level.',
    attributes: [
      { name: 'viewBox', type: 'x y w h', description: 'Defines internal coordinate system for responsive scaling.' },
      { name: 'xmlns', type: 'URI', description: 'http://www.w3.org/2000/svg for standalone SVG files.' },
    ],
    basicExample: `<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="38" fill="#0F766E" />
  <text x="50" y="55" fill="#F6F8F7" text-anchor="middle" font-size="14" font-family="sans-serif">SVG</text>
</svg>`,
    advancedExample: `<svg viewBox="0 0 260 70" width="260" height="70" role="img" aria-label="Client to Server Flow">
  <rect x="6" y="14" width="76" height="40" rx="6" fill="#0F766E" />
  <text x="44" y="38" fill="#F6F8F7" font-size="12" text-anchor="middle" font-family="sans-serif">Browser</text>
  <line x1="84" y1="34" x2="170" y2="34" stroke="#1D4ED8" stroke-width="2.5" />
  <rect x="172" y="14" width="80" height="40" rx="6" fill="#15803D" />
  <text x="212" y="38" fill="#F6F8F7" font-size="12" text-anchor="middle" font-family="sans-serif">Server</text>
</svg>`,
    useCases: ['UI icons, corporate logos, architectural flowcharts, interactive bar/line charts'],
    browserBehavior: 'Each child shape (<rect>, <path>, <circle>) lives in the DOM and can receive CSS styling and click handlers.',
    accessibilityNotes: 'Include <title> inside <svg> or set role="img" with aria-label for non-decorative diagrams.',
  },
  {
    tag: 'iframe',
    category: 'Links & Media',
    syntax: '<iframe src="..." title="Embedded Frame" sandbox="allow-scripts"></iframe>',
    description: 'Embeds an independent nested HTML browsing context safely inside the parent page.',
    attributes: [
      { name: 'title', type: 'String', description: 'Mandatory descriptive title for screen readers.' },
      { name: 'sandbox', type: 'Tokens', description: 'Restricts embedded scripts, popups, and same-origin cookie access.' },
      { name: 'srcdoc', type: 'HTML String', description: 'Renders inline HTML code directly inside a sandboxed preview (used in code playgrounds!).' },
    ],
    basicExample: `<iframe title="Inline Preview" sandbox="" srcdoc="<p style='font-family:sans-serif;color:#24160E;'>Isolated Sandbox Frame</p>" width="280" height="70"></iframe>`,
    advancedExample: `<iframe title="Interactive Mini Card" sandbox="allow-scripts" srcdoc="<button onclick='this.textContent=&quot;Ran Safely!&quot;'>Test Script</button>" style="width:100%; height:70px; border:1px solid #DCE3E0; border-radius:6px;"></iframe>`,
    useCases: ['Live code sandboxes (GFG / CodePen)', 'Payment gateways, maps, and isolated third-party embeds'],
    browserBehavior: 'Runs in an isolated browsing context governed by the Same-Origin Policy and sandbox restrictions.',
    accessibilityNotes: 'Always set a meaningful title attribute so screen-reader users know what the nested frame holds.',
  },
  {
    tag: 'details',
    category: 'Graphics & Interactive',
    syntax: '<details><summary>Heading</summary><p>Revealed content</p></details>',
    description: 'Native HTML5 disclosure accordion widget that expands and collapses content with zero JavaScript.',
    attributes: [{ name: 'open', type: 'Boolean', description: 'Present when the disclosure panel is currently expanded.' }],
    basicExample: `<details>
  <summary>What is POP3 vs IMAP?</summary>
  <p>POP3 downloads mail to one device; IMAP syncs folders across all devices.</p>
</details>`,
    advancedExample: `<details open style="padding:12px; background:#F2EBE1; border:1px solid #DCE3E0; border-radius:6px; font-family:system-ui;">
  <summary style="font-weight:700; cursor:pointer;">2-Mark Exam Answer: Define WSDL</summary>
  <p style="margin:8px 0 0;">XML contract defining web service types, messages, portTypes, bindings, and endpoint URLs.</p>
</details>`,
    useCases: ['FAQ accordions, revealable assignment hints, syllabus topic drawers'],
    browserBehavior: 'Fires a native "toggle" event whenever the user opens or closes it.',
    accessibilityNotes: 'Keyboard Enter/Space toggling and ARIA expanded/collapsed announcements work natively out of the box.',
  },
  {
    tag: 'summary',
    category: 'Graphics & Interactive',
    syntax: '<summary>Click to expand</summary>',
    description: 'Clickable disclosure heading acting as the first child and visible toggle label of a <details> widget.',
    attributes: [{ name: 'Global Attributes', type: 'Standard', description: 'Supports class, style, and id.' }],
    basicExample: `<details>
  <summary>View Hint</summary>
  <p>Check CSS box-sizing: border-box.</p>
</details>`,
    advancedExample: `<details style="font-family:system-ui;">
  <summary style="cursor:pointer; font-weight:600; color:#0F766E;">Inspect Solution Snippet</summary>
  <pre style="background:#F2EBE1; padding:8px; border-radius:4px;">box-sizing: border-box;</pre>
</details>`,
    useCases: ['Accordion headers inside <details> elements'],
    browserBehavior: 'Displays a small disclosure triangle marker (::marker) automatically.',
    accessibilityNotes: 'Acts as the interactive button-like focus target for the entire <details> disclosure.',
  },
];

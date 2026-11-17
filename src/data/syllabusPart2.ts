import type { Unit } from '../types/syllabus';

export const SYLLABUS_UNITS_PART_2: Unit[] = [
  {
    unitNumber: 3,
    unitCode: 'Unit 03',
    title: 'Web Services (UDDI, SOAP, WSDL), CORBA & AJAX',
    hours: 7,
    officialSyllabus:
      'Introduction to Web Services, UDDI, SOAP, WSDL, Web Service Architecture, Developing and deploying web services, Ajax: Improving web page performance using Ajax, Programming in Ajax, CORBA.',
    topics: [
      {
        id: 'u3-t1',
        code: '3.1',
        title: 'Introduction to Web Services & Web Service Architecture',
        bloom: 'L2 / L3 · Understand',
        readMinutes: 6,
        keywords: ['SOA', 'Publish-Find-Bind', 'Interoperability', 'SOAP vs REST', 'Loose Coupling'],
        summary:
          'Platform-independent, interoperable machine-to-machine communication over a network using Service-Oriented Architecture (Publish–Find–Bind).',
        definition:
          'A Web Service is a standardized software module accessible over a network (typically HTTP/HTTPS) that enables heterogeneous applications—written in different languages on different operating systems—to exchange structured data (XML or JSON) seamlessly.',
        purpose:
          'To decouple software capabilities into reusable, discoverable network services so an application written in Python or JavaScript can invoke logic hosted on Java or .NET enterprise servers.',
        whyNeeded:
          'Prior to open Web Services, distributed integration relied on proprietary binary protocols or tightly coupled RPC mechanisms that failed across corporate firewalls and incompatible platforms.',
        detailedTheory: [
          'Service-Oriented Architecture (SOA) defines three primary roles: the Service Provider (builds and hosts the service), the Service Registry (catalogs available services, traditionally via UDDI), and the Service Consumer/Requestor (discovers and invokes the service).',
          'Interactions follow the Publish–Find–Bind triangle: (1) The Provider publishes a machine-readable contract (WSDL) to the Registry; (2) The Consumer queries the Registry to find an appropriate endpoint; (3) The Consumer binds to the Provider directly over HTTP using SOAP XML or REST JSON payloads.',
          'Core characteristics include loose coupling (clients depend only on the contract, not internal implementation), statelessness, network transparency, and firewall friendliness via standard HTTP ports 80 and 443.',
          'Modern systems complement classic WS-* SOAP services (favored in banking, telecom, and enterprise ERP due to WS-Security and ACID transactions) with lightweight RESTful APIs and GraphQL.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Publish Contract', detail: 'Service Provider registers its endpoint and WSDL service description in a central registry.', artifact: 'Publish (WSDL)' },
          { step: 2, title: 'Find Service', detail: 'Service Consumer queries the registry by business category or interface signature.', artifact: 'Find (UDDI)' },
          { step: 3, title: 'Retrieve Binding Details', detail: 'Registry returns the provider URL, protocol binding, and XML message schema.', artifact: 'Endpoint URI' },
          { step: 4, title: 'Bind & Invoke', detail: 'Consumer serializes parameters into a SOAP/REST payload and sends an HTTP POST.', artifact: 'SOAP Request' },
          { step: 5, title: 'Execute & Return', detail: 'Provider deserializes payload, executes business logic, and returns structured XML/JSON.', artifact: '200 OK Payload' },
        ],
        keyTakeaways: [
          'Three SOA Roles: Service Provider, Service Registry, Service Requestor.',
          'Three SOA Operations: Publish (Provider -> Registry), Find (Requestor -> Registry), Bind (Requestor -> Provider).',
          'Interoperability comes from open wire formats (XML/JSON) over ubiquitous HTTP.',
          'SOAP is protocol/contract-driven; REST is resource/HTTP-verb-driven.',
        ],
        realWorldExamples: [
          'UPI and inter-bank NEFT/RTGS gateways exchanging digitally signed XML messages between heterogeneous banking cores.',
          'Airline reservation aggregators querying multiple carrier inventory services in real time.',
        ],
        comparisonTable: {
          title: 'SOAP Web Services vs RESTful Web Services',
          headers: ['Criterion', 'SOAP Web Services', 'RESTful Web Services'],
          rows: [
            ['Nature', 'Strict XML messaging protocol (W3C)', 'Architectural style using standard HTTP'],
            ['Data Format', 'XML only (Envelope, Header, Body)', 'JSON, XML, plain text, HTML'],
            ['Contract', 'Mandatory WSDL document', 'Optional OpenAPI / Swagger spec'],
            ['Security & ACID', 'Built-in WS-Security & WS-AtomicTransaction', 'Relies on HTTPS/TLS and OAuth2/JWT'],
          ],
        },
        simulationId: 'soa-soap',
        simulationCaption: 'Step through the SOA Publish–Find–Bind triangle and inspect live SOAP envelopes.',
        examples: {
          basic: {
            title: 'Interactive SOA Service Contract Tester',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>SOA Publish-Find-Bind Simulator</h3>
  <button onclick="runSoa()" style="padding:8px 14px; background:#4a2c1d; color:#fff; border:none; border-radius:6px; cursor:pointer;">
    Execute SOA Flow
  </button>
  <pre id="trace" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  function runSoa() {
    const steps = [
      '1. PUBLISH: PaymentProvider registered CurrencyConverter.wsdl in Registry',
      '2. FIND: CheckoutApp queried Registry -> Found https://api.bank.example/fx',
      '3. BIND: CheckoutApp sent SOAP POST { amount: 100, from: "USD", to: "INR" }',
      '4. RESPONSE: 200 OK -> ConvertedAmount: 8345.00 INR'
    ];
    document.getElementById('trace').textContent = steps.join('\\n');
  }
</script>`,
            expectedOutput: 'Displays the four sequential SOA interaction stages.',
            explanation: 'Illustrates the decoupling between service registry discovery and direct runtime invocation.',
          },
          intermediate: {
            title: 'JSON vs XML Web Service Payload Comparison',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Payload Size Comparator (SOAP XML vs REST JSON)</h3>
  <pre id="out" style="background:#f2ebe1; padding:12px; border-radius:6px; font-size:12px;"></pre>
</div>
<script>
  const soap = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetPrice><Item>Book</Item><Price>499</Price></GetPrice></soap:Body></soap:Envelope>';
  const rest = JSON.stringify({ item: 'Book', price: 499 });
  document.getElementById('out').textContent =
    'SOAP XML Bytes: ' + soap.length + '\\nREST JSON Bytes: ' + rest.length +
    '\\nReduction: ' + Math.round((1 - rest.length / soap.length) * 100) + '% smaller wire payload';
</script>`,
            expectedOutput: 'Calculates exact byte overhead of a SOAP envelope versus a compact REST JSON object.',
            explanation: 'Highlights why mobile and browser clients favor REST/JSON while enterprise systems accept SOAP verbosity for strict schema enforcement.',
          },
          advanced: {
            title: 'Resilient Web Service Client with Timeout & Retry',
            language: 'javascript',
            runnableInSandbox: false,
            code: `async function callServiceWithRetry(url, payload, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}`,
            expectedOutput: 'Safely invokes remote service endpoints with bounded latency and automatic retry.',
            explanation: 'Production web service consumers must guard against network hangs using AbortController timeouts and exponential backoff.',
          },
        },
        mistakes: [
          { mistake: 'Confusing a Web Service with a human-facing Website.', fix: 'Websites return HTML for browser rendering; Web Services return machine-readable XML/JSON for programmatic consumption.' },
          { mistake: 'Tightly coupling client code to internal database IDs of a service.', fix: 'Expose stable domain DTO contracts in the WSDL or OpenAPI schema.' },
        ],
        bestPractices: [
          'Version your service contracts (e.g., `/v1/`, `/v2/`) so existing consumers never break on upgrades.',
          'Keep web service operations stateless to allow horizontal load balancing.',
        ],
        quiz: [
          {
            question: 'Which three operations form the Web Service Architecture (SOA) triangle?',
            options: ['Create, Read, Delete', 'Publish, Find, Bind', 'Request, Render, Paint', 'Compile, Link, Execute'],
            correctIndex: 1,
            explanation: 'Providers Publish to the Registry, Consumers Find via the Registry, and Consumers Bind directly to the Provider.',
          },
          {
            question: 'Which protocol allows SOAP messages to pass through standard corporate firewalls?',
            options: ['FTP', 'HTTP / HTTPS', 'Telnet', 'ICMP'],
            correctIndex: 1,
            explanation: 'Transporting SOAP XML over HTTP/HTTPS ports 80/443 avoids blocked custom RPC ports.',
          },
        ],
        flashcards: [
          { front: 'Three Roles in SOA?', back: 'Service Provider, Service Registry (Broker), and Service Consumer (Requestor).' },
          { front: 'Why are Web Services platform-independent?', back: 'They communicate over open HTTP using text-based XML or JSON rather than language-specific binary formats.' },
        ],
        assignment: {
          task: 'Draw and label the Publish–Find–Bind architecture for a University Exam Result Web Service consumed by a Mobile App and an Admin Portal.',
          hint: 'Show WSDL flowing from Provider to UDDI Registry, and SOAP/REST flowing between Mobile App and Provider.',
          solution: 'Provider (University Exam Engine) -> Publish WSDL -> Registry -> Find Endpoint -> Mobile App & Admin Portal -> Bind via HTTPS POST.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Define a Web Service and list any two key benefits.',
            answer: 'A Web Service is a self-contained, platform-independent software component exposed over a network using open standards (HTTP, XML/JSON, WSDL, SOAP). Benefits: (1) Cross-platform interoperability, (2) Loose coupling and code reusability across heterogeneous systems.',
          },
          {
            marks: '7M',
            question: 'Explain Web Service Architecture (SOA) with a neat diagram detailing Publish, Find, and Bind operations.',
            answer: 'Detail the three actors (Service Provider, Service Registry, Service Requestor), the Publish–Find–Bind triangle, the XML/HTTP protocol stack, and contrast SOAP contract-first services with RESTful architectures.',
          },
        ],
      },
      {
        id: 'u3-t2',
        code: '3.2',
        title: 'UDDI, SOAP, and WSDL (Core Web Service Stack)',
        bloom: 'L3 / L4 · Analyze',
        readMinutes: 7,
        keywords: ['SOAP Envelope', 'SOAP Fault', 'WSDL 1.1', 'portType', 'UDDI White/Yellow/Green Pages'],
        summary:
          'Deep dive into the classic XML Web Service triad: SOAP for message framing, WSDL for contract description, and UDDI for service discovery.',
        definition:
          'SOAP (Simple Object Access Protocol) defines the XML messaging envelope; WSDL (Web Services Description Language) specifies an XML interface contract of operations, types, and endpoints; UDDI (Universal Description, Discovery, and Integration) acts as an enterprise directory of services.',
        purpose:
          'To establish a complete, unambiguous, machine-checkable protocol stack covering messaging (SOAP), contract specification (WSDL), and directory discovery (UDDI).',
        whyNeeded:
          'Without WSDL, clients would have to guess method names and parameter types; without SOAP headers, security tokens and transaction IDs could not travel uniformly with payloads.',
        detailedTheory: [
          'A SOAP message is an XML document containing four elements: a mandatory `<soap:Envelope>` root identifying namespaces, an optional `<soap:Header>` carrying metadata (authentication, routing, timestamps), a mandatory `<soap:Body>` carrying the RPC call or response, and an optional `<soap:Fault>` nested inside Body when errors occur (`faultcode`, `faultstring`, `detail`).',
          'A WSDL document separates abstract interface definitions from concrete network bindings using five key elements: `<types>` (XSD data types), `<message>` (input/output parameter structures), `<portType>` (abstract operations, equivalent to a Java interface), `<binding>` (protocol/encoding such as SOAP over HTTP), and `<service>` (actual URL `<port>` endpoints).',
          'UDDI organizes service listings like a business directory into three logical views: White Pages (company name, contact info), Yellow Pages (industry classification codes like NAICS/UNSPSC), and Green Pages (technical WSDL pointers and invocation parameters).',
        ],
        mechanismSteps: [
          { step: 1, title: 'WSDL <types> & <message>', detail: 'Define strict XSD schema types and abstract request/response messages.', artifact: 'xsd:decimal' },
          { step: 2, title: 'WSDL <portType>', detail: 'Group operations (e.g., getBalance) into an abstract interface.', artifact: '<portType>' },
          { step: 3, title: 'WSDL <binding> & <service>', detail: 'Bind abstract operations to SOAP/HTTP and specify the concrete URL.', artifact: 'soap:address' },
          { step: 4, title: 'UDDI Lookup', detail: 'Consumer locates the WSDL URL via White/Yellow/Green pages.', artifact: 'tModelKey' },
          { step: 5, title: 'SOAP Exchange', detail: 'Envelope with Header + Body travels via HTTP POST; errors return <soap:Fault>.', artifact: '<soap:Envelope>' },
        ],
        keyTakeaways: [
          'SOAP Envelope = Mandatory Envelope + Optional Header + Mandatory Body (+ Optional Fault inside Body).',
          'WSDL 5 Elements: types, message, portType (abstract), binding, service (concrete).',
          'UDDI 3 Pages: White (Who), Yellow (Category), Green (Technical how-to).',
        ],
        realWorldExamples: [
          'Enterprise ERP suites (SAP, Oracle) exposing WSDL contracts consumed by corporate payroll and tax filing portals.',
          'Payment processor settlement APIs verifying SOAP WS-Security digital signatures in `<soap:Header>`.',
        ],
        comparisonTable: {
          title: 'Core XML Web Service Triad',
          headers: ['Standard', 'Primary Role', 'Analogy', 'Key Elements'],
          rows: [
            ['SOAP', 'Message Transport & Framing', 'Sealed Courier Envelope', 'Envelope, Header, Body, Fault'],
            ['WSDL', 'Interface & Endpoint Contract', 'Restaurant Menu + Address', 'types, message, portType, binding, service'],
            ['UDDI', 'Service Directory Registry', 'Phonebook / Business Registry', 'White, Yellow, Green Pages'],
          ],
        },
        simulationId: 'soa-soap',
        simulationCaption: 'Inspect SOAP Request/Fault XML envelopes, WSDL structural layers, and UDDI directory pages.',
        examples: {
          basic: {
            title: 'Valid SOAP 1.1 Request Envelope',
            language: 'xml',
            runnableInSandbox: false,
            code: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <auth:ApiKey xmlns:auth="http://example.org/auth">QU-2025-KEY</auth:ApiKey>
  </soap:Header>
  <soap:Body>
    <m:GetStudentGPA xmlns:m="http://quantumuniversity.edu.in/exam">
      <m:RollNumber>CS21045</m:RollNumber>
    </m:GetStudentGPA>
  </soap:Body>
</soap:Envelope>`,
            expectedOutput: 'Transmits RollNumber CS21045 with an authentication header over HTTP POST.',
            explanation: 'Demonstrates separation of cross-cutting authentication metadata in Header from business payload in Body.',
          },
          intermediate: {
            title: 'SOAP Fault Error Response',
            language: 'xml',
            runnableInSandbox: false,
            code: `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>Invalid RollNumber format supplied.</faultstring>
      <detail>
        <errorCode>ERR_400_INVALID_ID</errorCode>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
            expectedOutput: 'Standardized error payload returned inside <soap:Body> when validation fails.',
            explanation: 'Standard SOAP fault codes (`Client`, `Server`, `VersionMismatch`, `MustUnderstand`) allow automated error handling.',
          },
          advanced: {
            title: 'Interactive SOAP Envelope Builder in Browser',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Live SOAP Envelope Generator</h3>
  <input id="city" value="Dehradun" style="padding:6px; border:1px solid #c9b9a5; border-radius:4px;" />
  <button onclick="build()" style="padding:7px 12px; background:#4a2c1d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Generate SOAP</button>
  <pre id="xml" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  function build() {
    const c = document.getElementById('city').value || 'Roorkee';
    document.getElementById('xml').textContent =
\`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetWeather xmlns="http://weather.example/">
      <City>\${c}</City>
    </GetWeather>
  </soap:Body>
</soap:Envelope>\`;
  }
  build();
</script>`,
            expectedOutput: 'Dynamically constructs and displays a well-formed SOAP XML request envelope.',
            explanation: 'Shows how client proxies serialize simple method arguments into XML SOAP envelopes.',
          },
        },
        mistakes: [
          { mistake: 'Placing <soap:Fault> outside <soap:Body>.', fix: 'In SOAP 1.1/1.2, <soap:Fault> must always be a direct child of <soap:Body>.' },
          { mistake: 'Mixing up WSDL <portType> and <binding>.', fix: '<portType> defines abstract operations; <binding> specifies the concrete protocol (SOAP/HTTP) and encoding.' },
        ],
        bestPractices: [
          'Use Document/Literal wrapped style in WSDL rather than RPC/Encoded for strict XSD schema validation.',
          'Validate SOAP Body contents against the WSDL embedded `<types>` XSD before processing.',
        ],
        quiz: [
          {
            question: 'Which WSDL element acts like an abstract programming interface listing operations?',
            options: ['<service>', '<portType>', '<binding>', '<types>'],
            correctIndex: 1,
            explanation: '<portType> defines the abstract operations and their input/output messages independent of transport.',
          },
          {
            question: 'Which section of UDDI stores technical binding information and WSDL URLs?',
            options: ['White Pages', 'Yellow Pages', 'Green Pages', 'Blue Pages'],
            correctIndex: 2,
            explanation: 'White = contact details, Yellow = business category, Green = technical interfaces and WSDL references.',
          },
        ],
        flashcards: [
          { front: '4 Elements of a SOAP Message?', back: 'Envelope (required), Header (optional), Body (required), Fault (optional, inside Body).' },
          { front: 'UDDI White vs Yellow vs Green Pages?', back: 'White = Business contact info; Yellow = Industry classification; Green = Technical WSDL & binding specs.' },
        ],
        assignment: {
          task: 'Write a minimal WSDL snippet defining a `CalculateTax` operation taking `income` (decimal) and returning `tax` (decimal).',
          hint: 'Include `<types>`, two `<message>` elements, one `<portType>`, and a `<binding>`.',
          solution: 'Define `TaxRequest` and `TaxResponse` messages in `<portType name="TaxPortType"><operation name="CalculateTax">...</operation></portType>`.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What are White, Yellow, and Green pages in UDDI?',
            answer: 'White Pages store business name, address, and contact info; Yellow Pages categorize services by industry/taxonomy; Green Pages provide technical WSDL descriptions and binding endpoints.',
          },
          {
            marks: '7M',
            question: 'Explain the structure of a SOAP message and WSDL document with XML examples.',
            answer: 'Draw the SOAP Envelope diagram (Envelope -> Header + Body -> Fault) with a sample request/fault XML, then explain the 5 WSDL sections (`types`, `message`, `portType`, `binding`, `service`) with sample XML bindings.',
          },
        ],
      },
      {
        id: 'u3-t3',
        code: '3.3',
        title: 'Developing and Deploying Web Services',
        bloom: 'L3 · Apply',
        readMinutes: 6,
        keywords: ['Top-Down Contract-First', 'Bottom-Up Code-First', 'Client Stub', 'Server Skeleton', 'JAX-WS'],
        summary:
          'End-to-end engineering lifecycle of implementing, generating stubs/skeletons, packaging, deploying on a runtime container, and testing a Web Service.',
        definition:
          'Developing and deploying a Web Service is the workflow of exposing business logic as a network endpoint using either Code-First (Bottom-Up) or Contract-First (Top-Down) tooling, packaging it into a deployable artifact (such as a WAR/JAR), and publishing its WSDL/OpenAPI descriptor on an application server.',
        purpose:
          'To translate local programming methods into resilient, network-callable endpoints complete with automatic serialization, stub generation, and health verification.',
        whyNeeded:
          'Writing raw XML/HTTP parsing sockets for every operation is error-prone; runtime frameworks (JAX-WS, Express, FastAPI, .NET WCF) automate marshalling and endpoint routing.',
        detailedTheory: [
          'Two primary development methodologies exist: Bottom-Up (Code-First), where a developer writes a Java/C#/Node class with annotations like `@WebService` and tooling auto-generates the WSDL; and Top-Down (Contract-First), where architects author the XSD/WSDL first and generate server skeletons (`wsimport`) to guarantee cross-team compatibility.',
          'During deployment, the compiled service and descriptor are packaged and mounted onto a servlet container or web runtime (Apache Tomcat, Axis2, Node.js/Express, or Cloud Run) bound to an HTTP listener port.',
          'Once live, clients download the published `?wsdl` or OpenAPI spec to generate a local Client Proxy (Stub). Calling a method on the stub transparently marshals arguments into XML/JSON, sends the HTTP request, and unmarshals the server response.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Choose Methodology', detail: 'Select Contract-First (WSDL/OpenAPI -> Code) or Code-First (Code -> WSDL).', artifact: 'Approach' },
          { step: 2, title: 'Implement Service Logic', detail: 'Write endpoint class/handlers and annotate exposed operations.', artifact: '@WebMethod' },
          { step: 3, title: 'Package & Deploy', detail: 'Bundle service into a WAR/container image and start runtime server.', artifact: 'Tomcat / Node' },
          { step: 4, title: 'Verify Descriptor', detail: 'Fetch live `?wsdl` or `/openapi.json` endpoint to verify contract publication.', artifact: 'HTTP 200 WSDL' },
          { step: 5, title: 'Generate Stub & Test', detail: 'Generate client proxy stub and validate requests with SoapUI, curl, or Postman.', artifact: 'Integration Test' },
        ],
        keyTakeaways: [
          'Bottom-Up (Code-First): Fast prototyping; risks contract drift when code refactors.',
          'Top-Down (Contract-First): Strict interoperability and backward compatibility.',
          'Stub (Client-side proxy) & Skeleton (Server-side dispatcher) hide raw network serialization.',
        ],
        realWorldExamples: [
          'Publishing a university fee-verification microservice inside a Docker container behind an API Gateway.',
          'Generating TypeScript client SDKs automatically from an OpenAPI/WSDL contract during CI/CD.',
        ],
        comparisonTable: {
          title: 'Top-Down (Contract-First) vs Bottom-Up (Code-First)',
          headers: ['Aspect', 'Top-Down (Contract-First)', 'Bottom-Up (Code-First)'],
          rows: [
            ['Starting Point', 'XSD Schema + WSDL / OpenAPI file', 'Application class / annotated methods'],
            ['Interoperability', 'Highest (strictly platform-neutral types)', 'Medium (may leak language-specific types)'],
            ['Development Speed', 'Slower initial setup', 'Very fast for rapid prototypes'],
            ['Contract Stability', 'High — breaking changes caught early', 'Prone to accidental breaking changes'],
          ],
        },
        simulationId: 'soa-soap',
        simulationCaption: 'Simulate deploying a service contract and binding a client stub request.',
        examples: {
          basic: {
            title: 'Java JAX-WS Code-First Endpoint',
            language: 'javascript',
            runnableInSandbox: false,
            code: `// Java JAX-WS Example (Code-First)
import jakarta.jws.WebService;
import jakarta.jws.WebMethod;

@WebService
public class GradeService {
  @WebMethod
  public String getGrade(int marks) {
    if (marks >= 85) return "A+";
    if (marks >= 70) return "A";
    return marks >= 40 ? "Pass" : "Fail";
  }
}`,
            expectedOutput: 'Exposes `getGrade` as a SOAP operation and auto-serves `?wsdl` upon deployment.',
            explanation: 'Annotations instruct the container to generate the WSDL `<portType>` and SOAP bindings automatically.',
          },
          intermediate: {
            title: 'Node.js Express Web Service Endpoint',
            language: 'javascript',
            runnableInSandbox: false,
            code: `const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/grade', (req, res) => {
  const { marks } = req.body;
  const grade = marks >= 85 ? 'A+' : marks >= 40 ? 'Pass' : 'Fail';
  res.json({ marks, grade, verifiedAt: new Date().toISOString() });
});

app.listen(3000);`,
            expectedOutput: 'Serves JSON responses for POST `/api/grade` on port 3000.',
            explanation: 'Shows lightweight modern service deployment without heavy XML boilerplate.',
          },
          advanced: {
            title: 'Interactive Client Stub & Server Skeleton Simulator',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Client Stub -> Network -> Server Skeleton Demo</h3>
  <label>Marks: <input id="m" type="number" value="88" style="width:64px; padding:4px;" /></label>
  <button onclick="invokeStub()" style="padding:6px 12px; background:#4a2c1d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Call Client Stub</button>
  <pre id="out" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  function serverSkeleton(xmlPayload) {
    const match = xmlPayload.match(/<marks>(\\d+)<\\/marks>/);
    const marks = match ? Number(match[1]) : 0;
    const grade = marks >= 85 ? 'A+' : marks >= 40 ? 'Pass' : 'Fail';
    return '<result>' + grade + '</result>';
  }
  function invokeStub() {
    const val = document.getElementById('m').value;
    const wireReq = '<getGrade><marks>' + val + '</marks></getGrade>';
    const wireRes = serverSkeleton(wireReq);
    document.getElementById('out').textContent =
      'Client Stub Marshalled -> ' + wireReq + '\\nServer Skeleton Returned -> ' + wireRes;
  }
</script>`,
            expectedOutput: 'Demonstrates transparent marshalling by the client stub and unmarshalling by the server skeleton.',
            explanation: 'Makes the hidden RPC proxy layer concrete right inside the browser.',
          },
        },
        mistakes: [
          { mistake: 'Deploying a service without CORS headers when consumed directly by browser JS.', fix: 'Configure `Access-Control-Allow-Origin` explicitly on the web service gateway.' },
          { mistake: 'Changing method signatures in Code-First services without notifying clients.', fix: 'Regenerate client stubs or maintain versioned endpoints.' },
        ],
        bestPractices: [
          'Expose a `/health` readiness endpoint alongside the business service for load-balancer checks.',
          'Validate all incoming payloads against XSD or JSON Schema at the service boundary.',
        ],
        quiz: [
          {
            question: 'In Top-Down Web Service development, what is created first?',
            options: ['The database table', 'The WSDL/XSD contract', 'The client HTML page', 'The compiled JAR file'],
            correctIndex: 1,
            explanation: 'Top-Down (Contract-First) starts with authoring the WSDL/XSD contract before generating code skeletons.',
          },
        ],
        flashcards: [
          { front: 'Client Stub vs Server Skeleton?', back: 'Stub marshals client calls onto the network; Skeleton unmarshals network packets and invokes server logic.' },
          { front: 'What does appending `?wsdl` to a SOAP endpoint URL do?', back: 'Returns the live XML WSDL contract so clients can inspect or generate stubs.' },
        ],
        assignment: {
          task: 'Outline the 5 deployment checklist steps to move a local SOAP/REST service into production.',
          hint: 'Include contract validation, HTTPS TLS termination, CORS/auth, health checks, and smoke testing.',
          solution: '1. Freeze WSDL/OpenAPI contract; 2. Enable HTTPS + auth middleware; 3. Configure env vars & timeouts; 4. Deploy container & verify /health; 5. Run automated client stub integration tests.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between Top-Down and Bottom-Up Web Service development.',
            answer: 'Top-Down (Contract-First) begins by writing the WSDL/XSD contract and generating server code skeletons from it, ensuring high interoperability. Bottom-Up (Code-First) starts by writing annotated server methods and auto-generating the WSDL.',
          },
          {
            marks: '7M',
            question: 'Explain the complete lifecycle of developing, packaging, deploying, and consuming a Web Service.',
            answer: 'Discuss contract design vs code-first implementation, role of Client Stub and Server Skeleton in marshalling, packaging (WAR/container), deployment on an application server, WSDL publication, and testing via client proxies.',
          },
        ],
      },
      {
        id: 'u3-t4',
        code: '3.4',
        title: 'CORBA (Common Object Request Broker Architecture)',
        bloom: 'L2 / L4 · Analyze',
        readMinutes: 7,
        keywords: ['OMG', 'IDL', 'ORB', 'GIOP / IIOP', 'Distributed Objects'],
        summary:
          'OMG’s language-neutral distributed object architecture using IDL interfaces, an Object Request Broker (ORB), and IIOP binary wire transport.',
        definition:
          'CORBA (Common Object Request Broker Architecture), standardized by the Object Management Group (OMG), is a middleware specification allowing software objects written in different languages and running on separate machines to invoke methods on one another transparently via an Object Request Broker (ORB).',
        purpose:
          'To enable fine-grained Remote Procedure Calls on distributed stateful objects across C++, Java, Ada, and COBOL systems within enterprise or telecom networks.',
        whyNeeded:
          'In the 1990s, organizations ran mission-critical logic on heterogeneous mainframes and Unix workstations; CORBA provided a unified binary middleware bus before XML Web Services existed.',
        detailedTheory: [
          'Every CORBA object exposes a strictly typed contract written in OMG IDL (Interface Definition Language). An IDL compiler translates that single contract into language-specific Client Stubs (e.g., Java) and Server Skeletons (e.g., C++).',
          'At runtime, the Client invokes the local Stub, which passes parameters to the ORB (Object Request Broker). The ORB locates the target object via its IOR (Interoperable Object Reference) and transmits the binary invocation using GIOP (General Inter-ORB Protocol) mapped over TCP/IP as IIOP (Internet Inter-ORB Protocol).',
          'On the server side, the Portable Object Adapter (POA) activates the servant object if needed, routes the request through the Server Skeleton, and returns the binary response.',
          'While ultra-fast due to binary marshalling, CORBA struggled across public Internet firewalls (unlike HTTP-based SOAP/REST) and carried heavy complexity, leading Web Services and gRPC to succeed it for web-scale architectures.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Define OMG IDL', detail: 'Author language-neutral interface with attributes and method signatures.', artifact: 'Bank.idl' },
          { step: 2, title: 'Compile Stub & Skeleton', detail: 'Run IDL compiler to emit client stub and server skeleton source files.', artifact: 'idl2java / idl2cpp' },
          { step: 3, title: 'Client Calls Stub', detail: 'Client invokes method on local proxy object as if it were in local RAM.', artifact: 'Local Call' },
          { step: 4, title: 'ORB & IIOP Transport', detail: 'Client ORB serializes binary GIOP message over TCP/IP (IIOP) to Server ORB.', artifact: 'IIOP TCP' },
          { step: 5, title: 'POA & Servant Execution', detail: 'Server POA dispatches via Skeleton to the actual Servant object and returns result.', artifact: 'Servant Return' },
        ],
        keyTakeaways: [
          'IDL decouples interface definition from C++/Java/Python implementation.',
          'ORB acts as the middleware software bus routing remote object calls.',
          'IIOP = GIOP over TCP/IP, providing fast binary marshalling.',
          'CORBA is stateful & binary (great on LAN/telecom); Web Services are stateless & HTTP/text-based (great across Internet firewalls).',
        ],
        realWorldExamples: [
          'Telecom network management switches and legacy banking settlement backbones.',
          'Modern conceptual descendant: gRPC (using `.proto` IDL + binary HTTP/2 framing).',
        ],
        comparisonTable: {
          title: 'CORBA vs XML Web Services (SOAP)',
          headers: ['Feature', 'CORBA', 'Web Services (SOAP/WSDL)'],
          rows: [
            ['Standards Body', 'OMG (Object Management Group)', 'W3C / OASIS'],
            ['Interface Language', 'OMG IDL', 'WSDL (XML)'],
            ['Wire Protocol', 'Binary GIOP / IIOP over TCP', 'Text XML over HTTP / HTTPS'],
            ['Firewall Traversal', 'Difficult (requires custom IIOP ports)', 'Seamless (uses HTTP ports 80/443)'],
            ['State Model', 'Stateful distributed objects', 'Primarily stateless services'],
          ],
        },
        simulationId: 'soa-soap',
        simulationCaption: 'Compare CORBA IDL + ORB binary architecture against HTTP/XML Web Services.',
        examples: {
          basic: {
            title: 'OMG IDL Interface Specification',
            language: 'text',
            runnableInSandbox: false,
            code: `module University {
  interface ResultLookup {
    readonly attribute string semester;
    float getCGPA(in string rollNumber);
  };
};`,
            expectedOutput: 'Compiles into C++ Skeletons and Java Stubs via an IDL compiler.',
            explanation: 'IDL specifies only method signatures and directional qualifiers (`in`, `out`, `inout`) with zero implementation code.',
          },
          intermediate: {
            title: 'Conceptual CORBA vs Web Service Latency Estimator',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Binary IIOP vs Text XML Payload Estimator</h3>
  <pre id="out" style="background:#f2ebe1; padding:12px; border-radius:6px; font-size:12px;"></pre>
</div>
<script>
  const corbaBinaryBytes = 28; // Compact binary struct + IOR header
  const soapXmlBytes = 340;    // XML tags + namespaces
  document.getElementById('out').textContent =
    'CORBA IIOP Binary Payload: ' + corbaBinaryBytes + ' bytes\\n' +
    'SOAP XML Text Payload: ' + soapXmlBytes + ' bytes\\n' +
    'Bandwidth Efficiency: CORBA is ' + (soapXmlBytes / corbaBinaryBytes).toFixed(1) + 'x denser on trusted LANs.';
</script>`,
            expectedOutput: 'Demonstrates why binary IIOP outperformed verbose XML inside closed intranets.',
            explanation: 'Illustrates the performance-vs-interoperability tradeoff in distributed middleware.',
          },
          advanced: {
            title: 'Pseudo-Java CORBA Client ORB Initialization',
            language: 'javascript',
            runnableInSandbox: false,
            code: `// Conceptual Java CORBA Client Flow
ORB orb = ORB.init(args, null);
org.omg.CORBA.Object objRef = orb.resolve_initial_references("NameService");
NamingContextExt ncRef = NamingContextExtHelper.narrow(objRef);
ResultLookup service = ResultLookupHelper.narrow(ncRef.resolve_str("ResultLookup"));
float cgpa = service.getCGPA("CS21045");`,
            expectedOutput: 'Resolves remote object reference via CORBA Naming Service and invokes `getCGPA`.',
            explanation: 'Shows how `Helper.narrow()` casts a generic CORBA reference into a strongly typed client stub.',
          },
        },
        mistakes: [
          { mistake: 'Assuming CORBA only works with C++.', fix: 'OMG IDL maps to Java, C++, Python, Ada, and COBOL; client and server can use completely different languages.' },
          { mistake: 'Confusing IIOP with HTTP.', fix: 'IIOP is CORBA’s binary protocol directly over TCP/IP, whereas HTTP is an ASCII/binary application protocol.' },
        ],
        bestPractices: [
          'Use CORBA/binary RPC for trusted low-latency LANs; prefer HTTP/REST/gRPC across public firewalls.',
        ],
        quiz: [
          {
            question: 'Which language is used to define language-independent interfaces in CORBA?',
            options: ['WSDL', 'OMG IDL', 'JSON Schema', 'SQL'],
            correctIndex: 1,
            explanation: 'CORBA uses OMG Interface Definition Language (IDL) to generate stubs and skeletons.',
          },
          {
            question: 'What protocol carries CORBA messages over TCP/IP networks?',
            options: ['SMTP', 'IIOP', 'POP3', 'XSLT'],
            correctIndex: 1,
            explanation: 'IIOP (Internet Inter-ORB Protocol) maps GIOP messages onto TCP/IP.',
          },
        ],
        flashcards: [
          { front: 'Full form of CORBA & ORB?', back: 'Common Object Request Broker Architecture; Object Request Broker.' },
          { front: 'Role of POA in CORBA?', back: 'Portable Object Adapter—manages servant lifecycle and dispatches ORB requests to server objects.' },
        ],
        assignment: {
          task: 'Write a 5-point comparison explaining why Web Services largely replaced CORBA for Internet-scale integrations.',
          hint: 'Focus on HTTP firewall traversal, loose coupling, open text/JSON readability, and lower licensing complexity.',
          solution: '1. Firewall-friendly HTTP ports 80/443; 2. Text-based XML/JSON debugging; 3. Stateless scalability; 4. Vendor-neutral open tooling; 5. Lighter developer learning curve.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is the role of IDL and ORB in CORBA?',
            answer: 'IDL (Interface Definition Language) defines a language-neutral contract compiled into client stubs and server skeletons. The ORB (Object Request Broker) is the middleware bus that locates remote objects and transparently routes method calls across the network.',
          },
          {
            marks: '7M',
            question: 'Draw and explain CORBA architecture (Stub, ORB, IIOP, POA, Skeleton) and compare CORBA with Web Services.',
            answer: 'Diagram client -> IDL Stub -> Client ORB -> GIOP/IIOP -> Server ORB -> POA -> IDL Skeleton -> Servant, explain each component, and provide a structured 5-row comparison table against SOAP Web Services.',
          },
        ],
      },
      {
        id: 'u3-t5',
        code: '3.5',
        title: 'AJAX: Improving Performance & Programming in AJAX',
        bloom: 'L3 / L6 · Create',
        readMinutes: 7,
        keywords: ['XMLHttpRequest', 'readyState 0-4', 'Asynchronous', 'fetch()', 'Partial DOM Update'],
        summary:
          'How AJAX eliminates full-page reloads using background asynchronous HTTP requests (`XMLHttpRequest` / `fetch`) and partial DOM updates.',
        definition:
          'AJAX (Asynchronous JavaScript and XML) is a client-side web development technique combining JavaScript, the `XMLHttpRequest` (or modern `fetch`) API, HTML/CSS, and JSON/XML payloads to exchange data with a server asynchronously and update specific parts of a page without reloading.',
        purpose:
          'To deliver responsive, desktop-like user interactions, dramatically reduce bandwidth waste, and preserve client scroll/form state during server communication.',
        whyNeeded:
          'Classic synchronous form submissions force the browser to freeze, discard the current DOM, re-download shared headers/CSS/JS, and flash a blank screen on every click.',
        detailedTheory: [
          'In traditional synchronous HTTP, clicking a button blocks UI interaction until the server sends back an entire new HTML document. AJAX introduces an asynchronous JavaScript engine in the browser that dispatches background requests while the user continues scrolling or typing.',
          'The classic `XMLHttpRequest` (XHR) object progresses through five `readyState` values: `0` (UNSENT — created), `1` (OPENED — `open()` called), `2` (HEADERS_RECEIVED — response headers arrived), `3` (LOADING — downloading body chunks), and `4` (DONE — operation complete). Combined with `xhr.status === 200`, the `onreadystatechange` callback updates only the target DOM node.',
          'Although the "X" in AJAX stands for XML, modern applications almost universally transmit JSON (`JSON.parse()`) via the Promise-based `fetch()` API for cleaner async/await control flow and smaller payload sizes.',
        ],
        mechanismSteps: [
          { step: 1, title: 'User Event Fires', detail: 'User types in a search box or clicks Submit; JS prevents default page reload.', artifact: 'oninput / onclick' },
          { step: 2, title: 'Create & Open XHR', detail: 'Instantiate `XMLHttpRequest` (`readyState: 0`) and configure `open()` (`readyState: 1`).', artifact: 'readyState 0 -> 1' },
          { step: 3, title: 'Send Async Request', detail: 'Browser sends background HTTP request while UI stays completely responsive.', artifact: 'HTTP GET/POST' },
          { step: 4, title: 'Receive Stream & Done', detail: 'Headers arrive (`2`), body streams (`3`), and request finishes (`4`, `status: 200`).', artifact: 'readyState 4 / 200' },
          { step: 5, title: 'Partial DOM Patch', detail: 'Callback parses JSON/XML and updates only the target element on screen.', artifact: 'el.innerHTML' },
        ],
        keyTakeaways: [
          'AJAX is a technique combining JS + Async HTTP + DOM + JSON/XML, not a single programming language.',
          'Remember `readyState === 4 && status === 200` for valid completion.',
          'Bandwidth drops dramatically because shared CSS/JS/Nav bars are never re-downloaded.',
          'Modern replacement for XHR: Promise-based `fetch()` with `async/await`.',
        ],
        realWorldExamples: [
          'Google Search autocomplete updating suggestions on every keystroke.',
          'Gmail archiving emails or social feeds loading comments without refreshing the tab.',
        ],
        comparisonTable: {
          title: 'Synchronous Full-Page Reload vs Asynchronous AJAX',
          headers: ['Dimension', 'Traditional Synchronous Request', 'Asynchronous AJAX'],
          rows: [
            ['UI Thread', 'Freezes while waiting for full HTML', 'Non-blocking; user keeps interacting'],
            ['Payload Size', 'Full HTML + re-parsed CSS/assets (~100+ KB)', 'Minimal JSON/XML delta (~1–5 KB)'],
            ['DOM Update', 'Destroys and rebuilds entire document', 'Patches only target DOM subtree'],
            ['User Experience', 'White screen flicker, lost scroll position', 'Instant, fluid, app-like transitions'],
          ],
        },
        simulationId: 'ajax-xhr',
        simulationCaption: 'Watch XHR readyState 0–4 transitions live and compare AJAX vs Full-Reload bandwidth & latency.',
        examples: {
          basic: {
            title: 'Classic XMLHttpRequest (XHR) Lifecycle',
            language: 'javascript',
            runnableInSandbox: false,
            code: `const xhr = new XMLHttpRequest(); // readyState = 0
xhr.open('GET', '/api/students?q=Aarav', true); // readyState = 1 (async = true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    document.getElementById('results').textContent = data.name;
  }
};
xhr.send();`,
            expectedOutput: 'Updates `#results` asynchronously once `readyState` reaches 4 with HTTP 200.',
            explanation: 'Demonstrates every exam-essential property of `XMLHttpRequest`.',
          },
          intermediate: {
            title: 'Modern `fetch()` with `async/await`',
            language: 'javascript',
            runnableInSandbox: false,
            code: `async function loadProfile(id) {
  try {
    const response = await fetch('/api/profile/' + id);
    if (!response.ok) throw new Error('Status ' + response.status);
    const profile = await response.json();
    document.getElementById('name').textContent = profile.fullName;
  } catch (err) {
    console.error('AJAX failed:', err);
  }
}`,
            expectedOutput: 'Cleanly fetches JSON and patches the DOM without callback nesting.',
            explanation: 'Modern browsers replace verbose `onreadystatechange` handlers with Promise-based `fetch()`.',
          },
          advanced: {
            title: 'Interactive Live Search AJAX Simulator',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>AJAX Live Search (Zero Page Reload)</h3>
  <input id="q" oninput="ajaxSearch(this.value)" placeholder="Type protocol (http, soap, dns)..." style="width:100%; padding:8px; border:1px solid #c9b9a5; border-radius:6px;" />
  <div id="status" style="font-size:12px; color:#7c6352; margin-top:6px;">readyState: 0 (UNSENT)</div>
  <ul id="list" style="margin-top:8px;"></ul>
</div>
<script>
  const db = ['HTTP Stateless Protocol', 'SMTP Mail Push', 'IMAP Multi-Device Sync', 'DNS Hierarchy', 'SOAP XML Envelope', 'AJAX XMLHttpRequest'];
  function ajaxSearch(query) {
    const st = document.getElementById('status');
    st.textContent = 'readyState: 1 (OPENED) -> 3 (LOADING)...';
    setTimeout(() => {
      const hits = db.filter(item => item.toLowerCase().includes(query.toLowerCase()));
      document.getElementById('list').innerHTML = hits.map(h => '<li>' + h + '</li>').join('') || '<li>No matches</li>';
      st.textContent = 'readyState: 4 (DONE) · HTTP 200 OK · Patched DOM only';
    }, 120);
  }
</script>`,
            expectedOutput: 'Filters protocols asynchronously on keystroke while preserving input focus and page state.',
            explanation: 'Simulates real-time asynchronous UI updates and readyState transitions directly in the sandbox.',
          },
        },
        mistakes: [
          { mistake: 'Checking only `xhr.readyState === 4` without verifying `xhr.status === 200`.', fix: '404 and 500 error responses also reach `readyState 4`; always check `status >= 200 && status < 300`.' },
          { mistake: 'Passing `false` as the third argument to `xhr.open()` (synchronous XHR).', fix: 'Always pass `true` (or use `fetch()`) because synchronous XHR freezes the browser tab.' },
        ],
        bestPractices: [
          'Debounce keystroke-triggered AJAX search calls (e.g., 250 ms) to avoid flooding the server.',
          'Always show a subtle loading state and handle network failures gracefully.',
        ],
        quiz: [
          {
            question: 'Which `XMLHttpRequest.readyState` value indicates the response has completely finished downloading?',
            options: ['1 (OPENED)', '2 (HEADERS_RECEIVED)', '3 (LOADING)', '4 (DONE)'],
            correctIndex: 3,
            explanation: '`readyState === 4` means the entire HTTP response has arrived.',
          },
          {
            question: 'How does AJAX improve web page performance?',
            options: [
              'By compressing CSS into PNG images',
              'By transmitting small JSON/XML deltas and updating only part of the DOM without full page reloads',
              'By disabling TCP handshakes',
              'By storing the whole Internet in cookies',
            ],
            correctIndex: 1,
            explanation: 'Partial updates avoid re-downloading shared layout assets and eliminate full-document re-parsing.',
          },
        ],
        flashcards: [
          { front: '5 XHR readyState Values (0–4)?', back: '0: UNSENT, 1: OPENED, 2: HEADERS_RECEIVED, 3: LOADING, 4: DONE.' },
          { front: 'Why is JSON preferred over XML in modern AJAX?', back: 'JSON is ~40–60% smaller on the wire and parses natively into JS objects via `JSON.parse()`.' },
        ],
        assignment: {
          task: 'Write an `XMLHttpRequest` snippet to POST `{ username: "rohan" }` to `/api/check-user` and display "Available" or "Taken".',
          hint: 'Use `xhr.open("POST", ...)`, `xhr.setRequestHeader("Content-Type", "application/json")`, and `xhr.send(JSON.stringify(...))`.',
          solution: 'Configure POST, set JSON header, inspect `readyState === 4 && status === 200`, parse `JSON.parse(xhr.responseText).available`.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'List the five `readyState` values of the `XMLHttpRequest` object.',
            answer: '0 = UNSENT, 1 = OPENED, 2 = HEADERS_RECEIVED, 3 = LOADING, 4 = DONE.',
          },
          {
            marks: '7M',
            question: 'Explain how AJAX improves web performance compared to traditional synchronous models, and write a complete AJAX program using `XMLHttpRequest`.',
            answer: 'Compare synchronous full-reload vs asynchronous partial DOM update (bandwidth, latency, UX), draw the XHR lifecycle flow, and provide a working HTML + JS `XMLHttpRequest` snippet checking `readyState === 4 && status === 200`.',
          },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    unitCode: 'Unit 04',
    title: 'Web 2.0, Web 3.0 (Semantic Web), Information Systems & Modern Trends',
    hours: 7,
    officialSyllabus:
      'Web 2.0: Interactive and Social Web (Blogs, Wikis, Social Networking Sites, Technologies Behind Web 2.0: AJAX, RSS, Ruby on Rails, Open APIs), Web 3.0: Semantic Web, Widgets, Mashups, and RDF, Web-Based Information Systems, Search Engines, Recommender Systems, Benefits of Blockchain, Edge Computing, and Dark Mode in Web Development.',
    topics: [
      {
        id: 'u4-t1',
        code: '4.1',
        title: 'Web 2.0: Interactive & Social Web (Blogs, Wikis, Social Networks)',
        bloom: 'L2 · Understand',
        readMinutes: 6,
        keywords: ['Read-Write Web', 'User-Generated Content', 'Blogs', 'Wikis', 'Social Networking Sites'],
        summary:
          'Transition from static Read-Only Web 1.0 brochures to the participatory Read-Write Web 2.0 driven by User-Generated Content (UGC) and collective intelligence.',
        definition:
          'Web 2.0 (popularized by Tim O’Reilly in 2004) refers to websites and platforms that emphasize user-generated content, participatory culture, interoperability, and rich browser-based interactivity—turning passive readers into active authors and curators.',
        purpose:
          'To democratize publishing and collaboration so anyone without HTML coding skills can author articles, co-edit encyclopedias, and connect globally.',
        whyNeeded:
          'Web 1.0 required manual FTP uploads of static HTML files by webmasters, limiting publishing to a tiny technical minority and offering zero two-way community interaction.',
        detailedTheory: [
          'Three iconic Web 2.0 pillars reshaped online culture: (1) Blogs (reverse-chronological personal/editorial journals with comment threads and trackbacks); (2) Wikis (collaborative hypertext databases like Wikipedia where communities co-author, revert via version history, and peer-review knowledge); and (3) Social Networking Sites (profile-centric graphs enabling status feeds, tagging/folksonomies, and viral sharing).',
          'Underpinning Web 2.0 is the "Architecture of Participation"—network effects where every additional user improves the value of the platform for everyone else (e.g., Stack Overflow Q&A votes, GitHub repositories, YouTube uploads).',
        ],
        mechanismSteps: [
          { step: 1, title: 'User Authors Content', detail: 'User writes a post, edits a wiki article, or uploads media via a WYSIWYG browser editor.', artifact: 'Rich Text / Markdown' },
          { step: 2, title: 'Database Persistence', detail: 'Application server stores structured content, revision history, and author metadata.', artifact: 'CMS / DB Record' },
          { step: 3, title: 'Social Graph & Tagging', detail: 'Community tags topics (folksonomy), upvotes, comments, and shares.', artifact: 'Network Effect' },
          { step: 4, title: 'Dynamic Feed Render', detail: 'Subscribers view personalized updates seamlessly via AJAX and RSS feeds.', artifact: 'Live Stream' },
        ],
        keyTakeaways: [
          'Web 1.0 = Static Read-Only; Web 2.0 = Participatory Read-Write (User-Generated Content).',
          'Blogs = Chronological publishing; Wikis = Collective versioned editing; SNS = Social graph interaction.',
          'Folksonomy = User-driven tagging (#hashtags) vs rigid top-down taxonomy.',
        ],
        realWorldExamples: [
          'Wikipedia (collaborative wiki with full edit revision logs).',
          'GitHub, Stack Overflow, WordPress, and LinkedIn.',
        ],
        comparisonTable: {
          title: 'Web 1.0 vs Web 2.0 Characteristics',
          headers: ['Dimension', 'Web 1.0 (1991–2003)', 'Web 2.0 (2004–Present)'],
          rows: [
            ['Interaction Mode', 'Read-Only (Static consumption)', 'Read-Write (Participatory creation)'],
            ['Content Creator', 'Site Owner / Webmaster only', 'End Users (UGC, Blogs, Wikis)'],
            ['Information Flow', 'One-to-Many Broadcast', 'Many-to-Many Dialogue'],
            ['Core Tech', 'Static HTML, Tables, CGI', 'AJAX, Dynamic CMS, REST APIs, RSS'],
          ],
        },
        simulationId: 'ajax-xhr',
        simulationCaption: 'Explore Web 2.0 interactive updates and inspect how AJAX powers modern participatory feeds.',
        examples: {
          basic: {
            title: 'Interactive Web 2.0 Wiki Revision & Comment Sandbox',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Mini Collaborative Wiki Note</h3>
  <textarea id="editor" rows="3" style="width:100%; padding:8px; border:1px solid #c9b9a5; border-radius:6px;">Web 2.0 enables collaborative Read-Write editing.</textarea>
  <button onclick="saveRev()" style="margin-top:8px; padding:6px 12px; background:#4a2c1d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Save Revision</button>
  <ul id="history" style="margin-top:10px; font-size:13px;"></ul>
</div>
<script>
  let rev = 0;
  function saveRev() {
    rev++;
    const txt = document.getElementById('editor').value;
    const li = document.createElement('li');
    li.textContent = 'Rev #' + rev + ': ' + txt;
    document.getElementById('history').prepend(li);
  }
</script>`,
            expectedOutput: 'Records incremental versioned edits directly in the page history log.',
            explanation: 'Illustrates the collaborative revision tracking fundamental to Web 2.0 wikis.',
          },
          intermediate: {
            title: 'Client-Side Folksonomy Tag Filter',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <button onclick="filterTag('all')">All</button>
  <button onclick="filterTag('wiki')">#wiki</button>
  <button onclick="filterTag('blog')">#blog</button>
  <ul id="posts" style="margin-top:10px;"></ul>
</div>
<script>
  const posts = [
    { title: 'Wikipedia Model', tag: 'wiki' },
    { title: 'Personal Tech Journal', tag: 'blog' },
    { title: 'Open Docs Collaboration', tag: 'wiki' }
  ];
  function filterTag(t) {
    const shown = t === 'all' ? posts : posts.filter(p => p.tag === t);
    document.getElementById('posts').innerHTML = shown.map(p => '<li>' + p.title + ' (#' + p.tag + ')</li>').join('');
  }
  filterTag('all');
</script>`,
            expectedOutput: 'Filters user-generated entries dynamically by user-assigned hashtags.',
            explanation: 'Demonstrates Web 2.0 folksonomy tagging and dynamic client filtering.',
          },
          advanced: {
            title: 'Markdown Blog Post Previewer',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <input id="title" value="Why Web 2.0 Changed Publishing" style="width:100%; padding:6px; margin-bottom:8px;" />
  <div id="preview" style="padding:12px; background:#f2ebe1; border-radius:6px;"></div>
</div>
<script>
  const inp = document.getElementById('title');
  const render = () => { document.getElementById('preview').innerHTML = '<h4 style="margin:0">' + inp.value + '</h4><small>Published live via Web 2.0 CMS</small>'; };
  inp.oninput = render; render();
</script>`,
            expectedOutput: 'Live preview updates instantly as the author types.',
            explanation: 'Shows real-time browser feedback loops characteristic of Web 2.0 editors.',
          },
        },
        mistakes: [
          { mistake: 'Treating Web 2.0 as a software upgrade or new internet protocol.', fix: 'Web 2.0 is a design and social shift built on existing HTTP/HTML/JS standards.' },
        ],
        bestPractices: [
          'Always sanitize User-Generated Content (UGC) before rendering to prevent Cross-Site Scripting (XSS).',
        ],
        quiz: [
          {
            question: 'Which Web 2.0 platform model emphasizes collaborative multi-author editing with full version history?',
            options: ['Static Brochure', 'Wiki', 'FTP Directory', 'DNS Zone'],
            correctIndex: 1,
            explanation: 'Wikis (like Wikipedia) allow distributed contributors to create, edit, and revert content collaboratively.',
          },
        ],
        flashcards: [
          { front: 'Core shift from Web 1.0 to Web 2.0?', back: 'From passive Read-Only consumption to participatory Read-Write User-Generated Content.' },
          { front: 'What is Folksonomy?', back: 'Collaborative, user-generated categorization using freeform tags (#hashtags) rather than fixed hierarchies.' },
        ],
        assignment: {
          task: 'Compare Blogs, Wikis, and Social Networking Sites across authorship, editability, and primary communication pattern.',
          hint: 'Create a 3-column table comparing WordPress, Wikipedia, and LinkedIn.',
          solution: 'Blogs: Single/editorial author, chronological posts + comments. Wikis: Collective authorship, versioned articles. SNS: Profile graph, short status streams & viral sharing.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between Web 1.0 and Web 2.0.',
            answer: 'Web 1.0 (1990s) was a static, Read-Only web where site owners published brochure pages. Web 2.0 is a participatory Read-Write web powered by User-Generated Content (Blogs, Wikis, Social Networks) and rich interactive AJAX interfaces.',
          },
          {
            marks: '7M',
            question: 'Explain Web 2.0 and discuss Blogs, Wikis, and Social Networking Sites with their architecture of participation.',
            answer: 'Define Web 2.0, contrast with Web 1.0, detail Blogs (chronological UGC + comments), Wikis (collaborative knowledge base + revision history), and SNS (social graph + feeds), and explain network effects and moderation/XSS challenges.',
          },
        ],
      },
      {
        id: 'u4-t2',
        code: '4.2',
        title: 'Technologies Behind Web 2.0: AJAX, RSS, Ruby on Rails & Open APIs',
        bloom: 'L2 / L3 · Analyze',
        readMinutes: 6,
        keywords: ['RSS 2.0 XML', 'Ruby on Rails', 'CoC & DRY', 'Open APIs', 'OAuth 2.0'],
        summary:
          'Core technical stack powering Web 2.0: asynchronous AJAX interfaces, RSS XML content syndication, Ruby on Rails (CoC & DRY), and Open Web APIs.',
        definition:
          'The Web 2.0 technology stack unifies asynchronous client updates (AJAX), standardized XML syndication feeds (RSS/Atom), rapid MVC server frameworks (exemplified by Ruby on Rails), and programmable HTTP endpoints (Open APIs) for cross-platform mashups.',
        purpose:
          'To dramatically accelerate web application development while enabling seamless machine-readable content sharing across websites.',
        whyNeeded:
          'Before MVC frameworks and Open APIs, every web form required verbose boilerplate code and websites trapped user data inside isolated HTML pages.',
        detailedTheory: [
          'RSS (Really Simple Syndication) publishes frequently updated headlines and blog summaries in a lightweight XML schema (`<rss><channel><item>`), allowing feed readers and aggregators to poll new content automatically without scraping HTML.',
          'Ruby on Rails (released in 2004) popularized two enduring web engineering philosophies: Convention over Configuration (CoC—sensible file/naming defaults eliminate XML config bloat) and Don’t Repeat Yourself (DRY—single source of truth across MVC models, views, and controllers).',
          'Open APIs (backed by REST/JSON and delegated OAuth authorization) allowed platforms like Google Maps, Twitter, and Stripe to expose capabilities programmatically, sparking an ecosystem of third-party apps and mashups.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Server MVC & CoC', detail: 'Rails/MVC framework routes HTTP requests cleanly using convention-based controllers and ORMs.', artifact: 'MVC Router' },
          { step: 2, title: 'Syndicate via RSS', detail: 'New articles emit standardized `<rss version="2.0">` XML feeds.', artifact: '/feed.xml' },
          { step: 3, title: 'Expose Open APIs', detail: 'Third-party apps consume JSON endpoints authenticated by API keys or OAuth tokens.', artifact: 'GET /api/v1/posts' },
          { step: 4, title: 'Asynchronous UI', detail: 'AJAX fetches incremental JSON deltas to refresh client views cleanly.', artifact: 'fetch() + DOM' },
        ],
        keyTakeaways: [
          'RSS = XML syndication (`<channel>` containing `<item>` entries).',
          'Ruby on Rails pillars: MVC + CoC (Convention over Configuration) + DRY (Don’t Repeat Yourself).',
          'Open APIs turn standalone sites into programmable platforms.',
        ],
        realWorldExamples: [
          'Podcast distribution globally relies on RSS 2.0 `<enclosure>` feeds.',
          'Shopify, GitHub, and Airbnb built foundational web platforms on Ruby on Rails.',
        ],
        comparisonTable: {
          title: 'Four Core Technologies of Web 2.0',
          headers: ['Technology', 'Layer', 'Core Problem Solved'],
          rows: [
            ['AJAX', 'Client / Browser', 'Eliminates full-page reloads via async requests'],
            ['RSS / Atom', 'Syndication XML', 'Auto-publishes updates to feed aggregators & podcast apps'],
            ['Ruby on Rails', 'Server MVC Framework', 'Rapid backend construction via CoC and DRY'],
            ['Open APIs', 'Ecosystem Integration', 'Lets external apps embed maps, payments, and social logins'],
          ],
        },
        simulationId: 'ajax-xhr',
        simulationCaption: 'Inspect how Open APIs and AJAX feeds deliver lightweight incremental updates.',
        examples: {
          basic: {
            title: 'Standard RSS 2.0 XML Syndication Feed',
            language: 'xml',
            runnableInSandbox: false,
            code: `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>CS35302 Course Updates</title>
    <link>https://quantumuniversity.edu.in/cs35302</link>
    <description>Latest lecture notes and lab sheets</description>
    <item>
      <title>Unit 4: Web 2.0 &amp; Open APIs</title>
      <link>https://quantumuniversity.edu.in/cs35302/unit4</link>
      <pubDate>Mon, 10 Mar 2025 09:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`,
            expectedOutput: 'Parsed by any RSS reader or podcast client to list new announcements.',
            explanation: 'Shows the concise `<channel>` and `<item>` structure of RSS 2.0.',
          },
          intermediate: {
            title: 'Live Browser RSS Feed Parser',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>RSS 2.0 XML Feed Reader</h3>
  <button onclick="parseFeed()" style="padding:7px 12px; background:#4a2c1d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Parse RSS Feed</button>
  <ul id="items" style="margin-top:10px;"></ul>
</div>
<script>
  const rssXml = '<rss version="2.0"><channel><item><title>AJAX Basics</title></item><item><title>Open APIs Guide</title></item></channel></rss>';
  function parseFeed() {
    const doc = new DOMParser().parseFromString(rssXml, 'text/xml');
    const titles = Array.from(doc.querySelectorAll('item title')).map(n => '<li>' + n.textContent + '</li>');
    document.getElementById('items').innerHTML = titles.join('');
  }
</script>`,
            expectedOutput: 'Parses raw RSS XML in the browser and renders a clickable headline list.',
            explanation: 'Combines Unit 2 XML DOM parsing with Unit 4 RSS syndication.',
          },
          advanced: {
            title: 'Ruby on Rails MVC Controller Pattern (CoC & DRY)',
            language: 'javascript',
            runnableInSandbox: false,
            code: `# Ruby on Rails ArticlesController
class ArticlesController < ApplicationController
  before_action :find_article, only: [:show, :edit] # DRY

  def index
    @articles = Article.order(created_at: :desc)
    respond_to do |format|
      format.html # Renders views/articles/index.html.erb (CoC)
      format.json { render json: @articles } # Open API
    end
  end
end`,
            expectedOutput: 'Serves both HTML views and JSON API payloads from one convention-driven controller.',
            explanation: 'Illustrates `before_action` (DRY) and implicit view path resolution (CoC).',
          },
        },
        mistakes: [
          { mistake: 'Hardcoding secret API keys inside public client-side Open API requests.', fix: 'Proxy sensitive keys through a backend `/api/*` route and use OAuth tokens for user consent.' },
        ],
        bestPractices: [
          'Return consistent HTTP status codes and JSON error objects in Open APIs.',
        ],
        quiz: [
          {
            question: 'What do "CoC" and "DRY" stand for in Ruby on Rails?',
            options: [
              'Code over Compile & Data Retrieval Yield',
              'Convention over Configuration & Don’t Repeat Yourself',
              'Client on Cloud & Dynamic Rendering YAML',
              'Cache on Cookie & Direct Routing Yield',
            ],
            correctIndex: 1,
            explanation: 'CoC eliminates boilerplate config files; DRY avoids duplicating logic across codebases.',
          },
        ],
        flashcards: [
          { front: 'Full form & purpose of RSS?', back: 'Really Simple Syndication — an XML format for publishing chronological feeds consumed by aggregators.' },
          { front: 'What is Convention over Configuration?', back: 'Framework pattern where standardized naming/folder defaults remove manual XML/routing configuration.' },
        ],
        assignment: {
          task: 'Write a valid RSS 2.0 XML snippet with two `<item>` entries for a campus tech blog.',
          hint: 'Wrap `<channel>` inside `<rss version="2.0">` and give each item `<title>`, `<link>`, and `<description>`.',
          solution: 'Provide `<rss version="2.0"><channel>...<item>...</item><item>...</item></channel></rss>`.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Explain the purpose of RSS and write its core XML tags.',
            answer: 'RSS (Really Simple Syndication) distributes frequently updated site headlines in XML so readers/aggregators fetch updates automatically. Core tags: `<rss>`, `<channel>`, `<title>`, `<link>`, `<description>`, `<item>`.',
          },
          {
            marks: '7M',
            question: 'Discuss the four core technologies behind Web 2.0: AJAX, RSS, Ruby on Rails, and Open APIs.',
            answer: 'Explain each technology’s architecture, concrete problem solved, and real-world synergy (e.g., Rails MVC serving Open JSON APIs + RSS XML consumed by AJAX frontends).',
          },
        ],
      },
      {
        id: 'u4-t3',
        code: '4.3',
        title: 'Web 3.0: Semantic Web, Widgets, Mashups & RDF',
        bloom: 'L3 / L4 · Analyze',
        readMinutes: 7,
        keywords: ['Semantic Web', 'RDF Triples', 'OWL Ontology', 'SPARQL', 'Mashups & Widgets'],
        summary:
          'Machine-understandable data on the Semantic Web using RDF (Subject–Predicate–Object triples), Ontologies (OWL), Widgets, and API Mashups.',
        definition:
          'The Semantic Web (Tim Berners-Lee’s Web 3.0 vision) extends the Web from a network of human-readable documents into a global knowledge graph of machine-understandable data modeled with RDF triples, RDFS/OWL ontologies, and queried via SPARQL.',
        purpose:
          'To enable software agents and search engines to reason about the meaning (semantics) of entities—knowing that "Roorkee" is a City inside "Uttarakhand"—rather than merely matching raw text strings.',
        whyNeeded:
          'HTML describes how text looks or sits in headings, not what real-world entities it represents. Semantic graphs allow disparate datasets to merge automatically without brittle screen-scraping.',
        detailedTheory: [
          'The foundational unit of the Semantic Web is the RDF (Resource Description Framework) Triple: `(Subject, Predicate, Object)`. For example: `(QuantumUniversity, locatedIn, Roorkee)`. Both Subjects and Predicates use globally unique URIs so concepts never collide across databases.',
          'Ontologies built with RDFS and OWL (Web Ontology Language) define formal rules and hierarchies—such as "Every Professor is an Employee" or "hasParent is transitive"—allowing reasoners to infer new facts automatically. SPARQL serves as the SQL-like query language for RDF graphs.',
          'Practical Web 3.0 composition also popularized Widgets (portable, embeddable mini-apps like weather tickers or currency converters) and Mashups (composite web apps blending 2+ Open APIs, such as combining real-estate listings with Google Maps pins and crime-rate overlays).',
        ],
        mechanismSteps: [
          { step: 1, title: 'Assign Entity URIs', detail: 'Give every real-world concept a unique HTTP URI identifier.', artifact: 'ex:QuantumUniv' },
          { step: 2, title: 'Model RDF Triples', detail: 'Express relationships as Subject -> Predicate -> Object directed edges.', artifact: '(S, P, O)' },
          { step: 3, title: 'Apply OWL Ontology', detail: 'Define class hierarchies and inference rules across vocabularies.', artifact: 'rdfs:subClassOf' },
          { step: 4, title: 'Query via SPARQL / Mashup', detail: 'Retrieve structured facts or blend multiple APIs into interactive widgets/mashups.', artifact: 'SELECT ?city WHERE' },
        ],
        keyTakeaways: [
          'RDF Triple = Subject (Entity) + Predicate (Relationship) + Object (Value or Entity).',
          'OWL defines shared meaning/inference rules; SPARQL queries RDF graphs.',
          'Widget = self-contained embeddable UI module; Mashup = integration of multiple data/API sources.',
        ],
        realWorldExamples: [
          'Google Knowledge Graph panels (Schema.org JSON-LD embedded inside HTML pages).',
          'Wikidata powering cross-language factual queries across Wikipedia.',
        ],
        comparisonTable: {
          title: 'Widgets vs Mashups vs RDF Semantic Web',
          headers: ['Concept', 'Primary Function', 'Example'],
          rows: [
            ['Widget', 'Portable, self-contained mini UI embedded on pages', 'Live currency converter or weather card'],
            ['Mashup', 'Combines data/APIs from 2+ sources into one new app', 'Flight tracker plotting live aircraft API over Maps'],
            ['RDF / OWL', 'Machine-readable knowledge graph of typed entities', 'Schema.org JSON-LD describing a Course or Recipe'],
          ],
        },
        simulationId: 'semantic-search',
        simulationCaption: 'Build and inspect a live RDF Subject–Predicate–Object knowledge graph and Schema.org triples.',
        examples: {
          basic: {
            title: 'JSON-LD Schema.org Semantic Web Markup',
            language: 'html',
            runnableInSandbox: true,
            code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "CS35302 Web Technology",
  "provider": {
    "@type": "CollegeOrUniversity",
    "name": "Quantum University, Roorkee"
  }
}
</script>
<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Semantic JSON-LD Embedded</h3>
  <p>Search bots read the hidden <code>application/ld+json</code> graph to understand this Course entity.</p>
</div>`,
            expectedOutput: 'Renders visible summary while exposing structured semantic metadata to search crawlers.',
            explanation: 'JSON-LD is today’s most widely deployed serialization of RDF linked data.',
          },
          intermediate: {
            title: 'RDF/XML Triple Serialization',
            language: 'xml',
            runnableInSandbox: false,
            code: `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:ex="http://example.org/edu#">
  <rdf:Description rdf:about="http://example.org/course/CS35302">
    <ex:title>Web Technology</ex:title>
    <ex:credits>4</ex:credits>
    <ex:taughtAt rdf:resource="http://example.org/org/QuantumUniversity"/>
  </rdf:Description>
</rdf:RDF>`,
            expectedOutput: 'Encodes three machine-readable RDF triples in XML format.',
            explanation: 'Demonstrates Subject (`rdf:about`), Predicate (`ex:taughtAt`), and Object (`rdf:resource`).',
          },
          advanced: {
            title: 'Interactive RDF Triple Query Engine',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Mini RDF Knowledge Graph Explorer</h3>
  <select id="subj" onchange="query()">
    <option value="CS35302">CS35302</option>
    <option value="TimBernersLee">TimBernersLee</option>
  </select>
  <pre id="graph" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  const triples = [
    ['CS35302', 'hasTitle', 'Web Technology'],
    ['CS35302', 'coversProtocol', 'HTTP/SOAP/RDF'],
    ['TimBernersLee', 'invented', 'WorldWideWeb'],
    ['TimBernersLee', 'proposed', 'SemanticWeb']
  ];
  function query() {
    const s = document.getElementById('subj').value;
    const matches = triples.filter(t => t[0] === s).map(t => \`(\${t[0]}) --[\${t[1]}]--> (\${t[2]})\`);
    document.getElementById('graph').textContent = matches.join('\\n');
  }
  query();
</script>`,
            expectedOutput: 'Filters Subject–Predicate–Object triples dynamically for the selected entity.',
            explanation: 'Visualizes how SPARQL graph pattern matching extracts entity relationships.',
          },
        },
        mistakes: [
          { mistake: 'Confusing Tim Berners-Lee’s Semantic Web (Web 3.0) with crypto-only Web3.', fix: 'In academic Web Technology curricula, Web 3.0 primarily denotes the Semantic Web (RDF, OWL, SPARQL), while DWeb/Blockchain is covered in Unit 5.' },
        ],
        bestPractices: [
          'Embed Schema.org JSON-LD inside `<head>` on public web pages so search engines generate rich knowledge cards.',
        ],
        quiz: [
          {
            question: 'What are the three components of an RDF statement?',
            options: ['Header, Body, Footer', 'Subject, Predicate, Object', 'Class, Method, Variable', 'Client, Proxy, Server'],
            correctIndex: 1,
            explanation: 'Every RDF fact is a directed triple: Subject -> Predicate -> Object.',
          },
        ],
        flashcards: [
          { front: 'Semantic Web Core Stack (RDF, OWL, SPARQL)?', back: 'RDF models data as triples; OWL defines ontologies/rules; SPARQL queries the RDF graph.' },
          { front: 'Widget vs Mashup?', back: 'Widget is a standalone embeddable mini-app; Mashup combines 2+ APIs/data feeds into a unified application.' },
        ],
        assignment: {
          task: 'Model 4 facts about a Student and a University using `(Subject, Predicate, Object)` RDF triples.',
          hint: 'Example: `(Student:Aarav, enrolledIn, Course:CS35302)`.',
          solution: '1. (Aarav, rdf:type, Student); 2. (Aarav, enrolledIn, CS35302); 3. (CS35302, offeredBy, QuantumUniversity); 4. (QuantumUniversity, locatedIn, Roorkee).',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is RDF? Give an example of an RDF triple.',
            answer: 'RDF (Resource Description Framework) is a W3C model for representing machine-understandable Semantic Web data as Subject–Predicate–Object triples. Example: Subject = `CS35302`, Predicate = `hasTitle`, Object = `"Web Technology"`.',
          },
          {
            marks: '7M',
            question: 'Explain Web 3.0 (Semantic Web) architecture including RDF, Ontologies (OWL), Widgets, and Mashups.',
            answer: 'Explain the shift from keyword matching to semantic meaning, diagram the RDF Triple model and Semantic Web layer cake (URI -> XML -> RDF -> RDFS/OWL -> SPARQL), and contrast Widgets with multi-API Mashups.',
          },
        ],
      },
      {
        id: 'u4-t4',
        code: '4.4',
        title: 'Web-Based Information Systems, Search Engines & Recommender Systems',
        bloom: 'L3 / L4 · Analyze',
        readMinutes: 7,
        keywords: ['WBIS', 'Inverted Index', 'TF-IDF & PageRank', 'Collaborative Filtering', 'Content-Based Filtering'],
        summary:
          'Architecture of Web-Based Information Systems (WBIS), how Search Engines crawl, index, and rank pages, and how Recommender Systems personalize discovery.',
        definition:
          'A Web-Based Information System (WBIS) delivers enterprise data management over web protocols. Search Engines discover, invert-index, and rank documents for explicit user queries, whereas Recommender Systems proactively predict relevant items using user preferences and behavioral patterns.',
        purpose:
          'To solve information overload on the Web—enabling users both to pull exact answers (Search) and discover tailored content effortlessly (Recommendations).',
        whyNeeded:
          'With billions of web pages and millions of products, brute-force sequential scanning or manual browsing is impossible.',
        detailedTheory: [
          'Search Engines execute a continuous 3-stage pipeline: (1) Crawling — spiders follow hyperlinks (`<a href>`) respecting `robots.txt` and sitemaps; (2) Indexing — tokenizing text, removing stop words, stemming, and building an Inverted Index (`term -> [docIDs]`); and (3) Querying & Ranking — scoring candidates using TF-IDF relevance plus link-authority algorithms like Google’s PageRank.',
          'Recommender Systems take two primary approaches plus a Hybrid blend: Content-Based Filtering recommends items matching attributes of items the user previously liked (e.g., recommending Sci-Fi films because you watched Interstellar); Collaborative Filtering leverages the "wisdom of the crowd" ("users who bought X also bought Y"), though it suffers from the Cold-Start problem for brand-new users or items.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Web Crawling', detail: 'Spiders fetch HTML pages, check `robots.txt`, and enqueue discovered outbound links.', artifact: 'Frontier Queue' },
          { step: 2, title: 'Inverted Indexing', detail: 'Tokenize words and map each term to a sorted list of document IDs.', artifact: 'term -> [1, 4, 9]' },
          { step: 3, title: 'TF-IDF & PageRank', detail: 'Score documents by term rarity/frequency and inbound link authority.', artifact: 'Ranked SERP' },
          { step: 4, title: 'Recommender Matrix', detail: 'Compute similarity across user-item ratings (Collaborative) or item tags (Content-Based).', artifact: 'Top-N Picks' },
        ],
        keyTakeaways: [
          'Search Pipeline: Crawl -> Inverted Index -> Rank (TF-IDF + PageRank).',
          'Inverted Index maps `Word -> Documents` (opposite of `Document -> Words`) for sub-millisecond search.',
          'Collaborative Filtering = User/Crowd similarity; Content-Based = Item feature similarity; Hybrid fixes Cold-Start.',
        ],
        realWorldExamples: [
          'Google Search combining inverted indexes, PageRank, and semantic embeddings.',
          'Netflix & Spotify combining collaborative user clusters with audio/genre metadata.',
        ],
        comparisonTable: {
          title: 'Content-Based vs Collaborative Filtering Recommenders',
          headers: ['Criterion', 'Content-Based Filtering', 'Collaborative Filtering'],
          rows: [
            ['Data Used', 'Item attributes (tags, genre, author)', 'User-item interaction matrix (clicks, ratings)'],
            ['New User Cold-Start', 'Cannot personalize until 1st interaction', 'Cannot match until history accumulates'],
            ['New Item Cold-Start', 'Works immediately (reads item tags)', 'Fails until enough users rate the new item'],
            ['Serendipity', 'Low (stays inside narrow niche)', 'High (discovers cross-genre gems via peers)'],
          ],
        },
        simulationId: 'semantic-search',
        simulationCaption: 'Test a live Inverted Index + TF-IDF ranking simulator over sample course documents.',
        examples: {
          basic: {
            title: 'Robots Exclusion Protocol (`robots.txt`)',
            language: 'text',
            runnableInSandbox: false,
            code: `User-agent: *
Disallow: /admin/
Disallow: /private-grades/
Allow: /syllabus/
Sitemap: https://quantumuniversity.edu.in/sitemap.xml`,
            expectedOutput: 'Instructs polite search crawlers to skip private folders and prioritize the XML sitemap.',
            explanation: 'First file checked by search engine spiders before crawling a domain.',
          },
          intermediate: {
            title: 'Interactive Inverted Index Search Engine',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Mini Inverted Index Search</h3>
  <input id="q" value="http" oninput="search()" style="padding:6px; border:1px solid #c9b9a5; border-radius:4px;" />
  <pre id="res" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  const docs = [
    'Doc 0: HTTP is a stateless web protocol',
    'Doc 1: DNS resolves domain names to IP',
    'Doc 2: AJAX sends async HTTP requests'
  ];
  const inv = { http: [0, 2], dns: [1], ajax: [2], protocol: [0] };
  function search() {
    const term = document.getElementById('q').value.trim().toLowerCase();
    const ids = inv[term] || [];
    document.getElementById('res').textContent =
      'Inverted Index[' + term + '] -> [' + ids.join(', ') + ']\\n' +
      (ids.map(i => docs[i]).join('\\n') || 'No matching docs');
  }
  search();
</script>`,
            expectedOutput: 'Looks up matching document IDs in O(1) dictionary time using an inverted index.',
            explanation: 'Demonstrates the fundamental data structure behind every full-text search engine.',
          },
          advanced: {
            title: 'Simple Jaccard Content-Based Recommender',
            language: 'javascript',
            runnableInSandbox: false,
            code: `function similarity(tagsA, tagsB) {
  const setA = new Set(tagsA);
  const intersection = tagsB.filter(t => setA.has(t)).length;
  const union = new Set([...tagsA, ...tagsB]).size;
  return Number((intersection / union).toFixed(2));
}
// Compare user profile ['web', 'http', 'xml'] with candidate course ['web', 'http', 'soap']
console.log(similarity(['web', 'http', 'xml'], ['web', 'http', 'soap'])); // 0.50`,
            expectedOutput: 'Computes `0.50` overlap score to rank recommended courses.',
            explanation: 'Shows exact set-similarity math driving Content-Based Filtering.',
          },
        },
        mistakes: [
          { mistake: 'Assuming `robots.txt` enforces security or password protection.', fix: '`robots.txt` is advisory only; malicious scrapers ignore it. Always enforce real server-side authentication.' },
        ],
        bestPractices: [
          'Combine Content-Based and Collaborative Filtering in a Hybrid Recommender to mitigate the Cold-Start problem.',
        ],
        quiz: [
          {
            question: 'Which data structure maps every indexed word directly to the list of documents containing it?',
            options: ['Circular Queue', 'Inverted Index', 'Binary Heap', 'Adjacency Matrix'],
            correctIndex: 1,
            explanation: 'An Inverted Index maps `term -> [doc1, doc2, ...]` for instant keyword retrieval.',
          },
          {
            question: 'What is the "Cold-Start Problem" in Recommender Systems?',
            options: [
              'Server RAM freezing at boot time',
              'Inability to generate accurate recommendations for brand-new users or unrated items lacking interaction history',
              'Slow TCP handshakes',
              'Missing CSS stylesheets',
            ],
            correctIndex: 1,
            explanation: 'Without prior clicks or ratings, Collaborative Filtering lacks behavioral overlap.',
          },
        ],
        flashcards: [
          { front: '3 Stages of a Search Engine?', back: '1. Crawling (discovering pages), 2. Indexing (Inverted Index), 3. Ranking (TF-IDF & PageRank).' },
          { front: 'PageRank Intuition?', back: 'A page is important if many other important pages link to it (weighted link popularity).' },
        ],
        assignment: {
          task: 'Construct the Inverted Index table for 3 short sentences: D0="web technology course", D1="http web protocol", D2="soap xml protocol".',
          hint: 'List each unique word alphabetically with sorted `[DocIDs]`.',
          solution: 'course:[0], http:[1], protocol:[1,2], soap:[2], technology:[0], web:[0,1], xml:[2].',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is an Inverted Index in Search Engines?',
            answer: 'An Inverted Index is a hash-map or B-tree dictionary mapping each unique word (term) to a posting list of document IDs (and positions) where that word appears, enabling instant keyword lookups.',
          },
          {
            marks: '7M',
            question: 'Explain the architecture of a Search Engine (Crawling, Indexing, Ranking) and compare Content-Based vs Collaborative Recommender Systems.',
            answer: 'Diagram the Crawler -> Indexer (Inverted Index) -> Query/Ranker (TF-IDF + PageRank) pipeline, then contrast Content-Based, Collaborative, and Hybrid Recommender Systems including the Cold-Start tradeoff.',
          },
        ],
      },
      {
        id: 'u4-t5',
        code: '4.5',
        title: 'Benefits of Blockchain, Edge Computing & Dark Mode in Web Development',
        bloom: 'L2 / L3 · Apply',
        readMinutes: 6,
        keywords: ['Blockchain Immutability', 'Edge Computing CDN', 'Dark Mode CSS', 'prefers-color-scheme', 'WCAG Contrast'],
        summary:
          'Three transformative engineering trends in modern web architecture: tamper-evident Blockchain trust, ultra-low-latency Edge Computing, and accessible Dark Mode UI.',
        definition:
          'Modern web engineering pairs decentralized cryptographic ledgers (Blockchain), geographically distributed compute close to users (Edge Computing), and adaptive visual themes (`prefers-color-scheme` Dark Mode) to optimize trust, speed, and accessibility.',
        purpose:
          'To eliminate single points of failure/trust (Blockchain), minimize speed-of-light network latency (Edge), and reduce eye strain & OLED battery drain (Dark Mode).',
        whyNeeded:
          'Centralized databases can be silently altered, distant single-region servers add 200+ ms latency for global users, and harsh white screens cause visual fatigue in low-light environments.',
        detailedTheory: [
          'Blockchain benefits web apps needing verifiable provenance without a central referee: tamper-evident audit trails via SHA-256 hash chaining, smart-contract automation, and cryptographic user ownership of credentials (Verifiable Diplomas, supply chain tracking).',
          'Edge Computing moves server logic (authentication checks, A/B testing, HTML streaming, API caching) out of a single cloud region into 300+ global edge PoPs (Points of Presence) within ~20 ms of end users, cutting Time to First Byte (TTFB) dramatically.',
          'Dark Mode uses CSS custom properties and the `@media (prefers-color-scheme: dark)` query to adapt surfaces to dark charcoal/espresso tones. Benefits include lower OLED pixel power draw, reduced glare at night, and improved readability for light-sensitive users—provided WCAG contrast (>= 4.5:1) is respected and pure `#000000` + `#FFFFFF` halation is avoided.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Cryptographic Trust (Blockchain)', detail: 'Link records via previous-block hashes so tampering invalidates downstream blocks.', artifact: 'SHA-256 Chain' },
          { step: 2, title: 'Geo-Distributed Edge PoP', detail: 'Anycast DNS routes user HTTP requests to the closest regional edge node.', artifact: '< 20 ms TTFB' },
          { step: 3, title: 'Adaptive CSS Tokens', detail: 'Browser evaluates `prefers-color-scheme` or user toggle to swap semantic CSS variables.', artifact: ':root / .dark' },
        ],
        keyTakeaways: [
          'Blockchain = Immutability, transparency, decentralized consensus (not needed for regular CRUD!).',
          'Edge Computing = Code & cache executing close to users -> lower TTFB & higher availability.',
          'Dark Mode = OLED energy savings + reduced glare, using soft dark surfaces (not pure #000) and WCAG >= 4.5:1 contrast.',
        ],
        realWorldExamples: [
          'University degree verification QR codes anchored on public ledger hashes.',
          'Cloudflare Workers & Vercel Edge Middleware personalizing headers before hitting origin DBs.',
        ],
        comparisonTable: {
          title: 'Modern Web Engineering Pillars',
          headers: ['Pillar', 'Primary Benefit', 'Key Technical Mechanism'],
          rows: [
            ['Blockchain', 'Tamper-evident trust & auditability', 'Hash-linked blocks + digital signatures'],
            ['Edge Computing', 'Sub-30 ms TTFB & resilience', 'Anycast routing + V8 isolates at CDN PoPs'],
            ['Dark Mode', 'Eye comfort & OLED battery life', 'CSS Variables + `prefers-color-scheme`'],
          ],
        },
        simulationId: 'nextgen-5g-iot',
        simulationCaption: 'Compare central-origin vs Edge PoP latency and inspect cryptographic hashing.',
        examples: {
          basic: {
            title: 'CSS `prefers-color-scheme` & Token Dark Mode',
            language: 'css',
            runnableInSandbox: false,
            code: `:root {
  --bg: #faf6f0;
  --ink: #24160e;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #16100c;
    --ink: #f5efe6;
  }
}
body { background: var(--bg); color: var(--ink); }`,
            expectedOutput: 'Automatically adapts site colors to the visitor’s OS theme preference.',
            explanation: 'Using semantic CSS variables prevents duplicating color overrides across every component.',
          },
          intermediate: {
            title: 'Live Theme Toggle & Contrast Preview',
            language: 'html',
            runnableInSandbox: true,
            code: `<div id="card" style="font-family: system-ui; padding: 18px; border-radius: 8px; background: #faf6f0; color: #24160e; border: 1px solid #ded2c3; transition: all 0.2s;">
  <h3 style="margin-top:0;">Adaptive Theme Card</h3>
  <p>Avoid pure #000000 black with #FFFFFF text; soft espresso/cream reduces halation.</p>
  <button onclick="toggle()" style="padding:7px 12px; background:#8b4c24; color:#fff; border:none; border-radius:4px; cursor:pointer;">Toggle Roast Theme</button>
</div>
<script>
  let dark = false;
  function toggle() {
    dark = !dark;
    const c = document.getElementById('card');
    c.style.background = dark ? '#1f1712' : '#faf6f0';
    c.style.color = dark ? '#f5efe6' : '#24160e';
  }
</script>`,
            expectedOutput: 'Smoothly switches between warm cream and deep espresso tokens.',
            explanation: 'Demonstrates accessible contrast without harsh stark-black eye strain.',
          },
          advanced: {
            title: 'SHA-256 Block Hash Integrity Demo (Web Crypto API)',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Tamper-Evident Block Hasher</h3>
  <input id="data" value="Degree: B.Tech CS -> Roll: CS21045" oninput="hashIt()" style="width:100%; padding:6px; border:1px solid #c9b9a5; border-radius:4px;" />
  <pre id="digest" style="background:#f2ebe1; padding:10px; border-radius:6px; margin-top:8px; font-size:11px; word-break:break-all;"></pre>
</div>
<script>
  async function hashIt() {
    const txt = document.getElementById('data').value;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt));
    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('digest').textContent = 'SHA-256: ' + hex;
  }
  hashIt();
</script>`,
            expectedOutput: 'Changing a single character completely alters the 64-character SHA-256 block fingerprint.',
            explanation: 'Illustrates the avalanche effect that makes Blockchain tampering immediately detectable.',
          },
        },
        mistakes: [
          { mistake: 'Using pure `#000000` background with `#FFFFFF` text for Dark Mode.', fix: 'Pure black/white contrast causes text "halation" (glowing blur) for astigmatic readers; use dark neutral tones (`#16100C` / `#F5EFE6`).' },
        ],
        bestPractices: [
          'Persist explicit theme toggles in `localStorage` while defaulting to OS `prefers-color-scheme`.',
          'Offload read-heavy static pages and auth verification to Edge PoPs.',
        ],
        quiz: [
          {
            question: 'Which CSS media feature automatically detects whether a user’s operating system is in Dark Mode?',
            options: ['prefers-reduced-motion', 'prefers-color-scheme', 'color-gamut', 'inverted-colors'],
            correctIndex: 1,
            explanation: '`@media (prefers-color-scheme: dark)` detects OS-level dark appearance preferences.',
          },
        ],
        flashcards: [
          { front: 'How does Edge Computing reduce TTFB?', back: 'By executing compute and caching at CDN PoPs geographically near the user instead of a distant origin server.' },
          { front: 'Why avoid pure #000000 in Dark Mode UI?', back: 'Extreme contrast causes visual halation; deep charcoal/espresso surfaces maintain comfort and WCAG contrast.' },
        ],
        assignment: {
          task: 'Write a CSS `:root` and `.dark` token pair defining surface, primary text, and accent colors meeting WCAG AA contrast.',
          hint: 'Use off-white cream for light mode and deep brown/charcoal for dark mode.',
          solution: ':root { --bg:#FAF6F0; --fg:#24160E; } .dark { --bg:#16100C; --fg:#F5EFE6; }',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'State two benefits each of Edge Computing and Dark Mode in web development.',
            answer: 'Edge Computing: (1) Lower Time to First Byte (TTFB) via proximity, (2) Reduced origin server load & higher resilience. Dark Mode: (1) Reduced eye strain in low light, (2) Lower OLED battery consumption.',
          },
          {
            marks: '7M',
            question: 'Explain the benefits and architectural role of Blockchain, Edge Computing, and Dark Mode in modern web applications.',
            answer: 'Cover Blockchain (immutability, cryptographic verification, smart contracts), Edge Computing (CDN PoPs vs centralized cloud latency), and Dark Mode (CSS custom properties, `prefers-color-scheme`, WCAG contrast, OLED savings).',
          },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    unitCode: 'Unit 05',
    title: 'Web 4.0, Decentralized Web (DWeb), IoT, AR/VR & 5G Impact',
    hours: 7,
    officialSyllabus:
      'Web 4.0: AI-Powered Web and Personalized Content, Decentralized Web (DWeb) and Blockchain Integration, Internet of Things (IoT) in Web Development, Augmented Reality (AR) and Virtual Reality (VR) in Web, Smart Web, Adaptive Interfaces, Web Automation, Impact of 5G on Web Technologies.',
    topics: [
      {
        id: 'u5-t1',
        code: '5.1',
        title: 'Web 4.0: AI-Powered Web and Personalized Content',
        bloom: 'L2 / L4 · Analyze',
        readMinutes: 6,
        keywords: ['Symbiotic Web', 'Intelligent Agents', 'Personalization', 'NLP', 'WebGPU'],
        summary:
          'The Symbiotic/Intelligent Web (Web 4.0) where machine-learning agents, natural language interfaces, and real-time context deliver proactive, hyper-personalized experiences.',
        definition:
          'Web 4.0 (often termed the Symbiotic or Ubiquitous Intelligent Web) represents the evolution where web applications embed AI reasoning, conversational interfaces, and predictive personalization—acting as proactive digital collaborators rather than passive pages.',
        purpose:
          'To bridge human intent and complex web workflows through contextual synthesis, multimodal interaction (voice, vision, text), and client/cloud inference.',
        whyNeeded:
          'As digital information grows exponentially, users need intelligent synthesis and tailored workflows instead of manually navigating dozens of nested menus and search tabs.',
        detailedTheory: [
          'Tracing the arc: Web 1.0 connected documents (Read-Only); Web 2.0 connected people (Social Read-Write); Web 3.0 connected structured data (Semantic Graphs); Web 4.0 connects intelligence and physical context seamlessly.',
          'Key architectural pillars include Retrieval-Augmented Generation (RAG) grounding answers in verified databases, Edge/In-Browser ML via WebGPU and ONNX Runtime Web (protecting user privacy locally), and contextual personalization pipelines balancing utility against algorithmic filter bubbles and GDPR privacy rules.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Capture Explicit & Implicit Intent', detail: 'Combine user query, locale, device context, and session history.', artifact: 'Context Vector' },
          { step: 2, title: 'Semantic Retrieval', detail: 'Fetch verified domain records via vector similarity or structured query.', artifact: 'Grounded Context' },
          { step: 3, title: 'AI Inference (Cloud / WebGPU)', detail: 'Model synthesizes personalized guidance or tailored layout ordering.', artifact: 'Inference Output' },
          { step: 4, title: 'Human-in-the-Loop Feedback', detail: 'User refines or overrides output, updating personalization weights safely.', artifact: 'Feedback Loop' },
        ],
        keyTakeaways: [
          'Web 1 -> Docs; Web 2 -> Social; Web 3 -> Semantic Data; Web 4 -> Symbiotic AI Intelligence.',
          'WebGPU enables hardware-accelerated ML inference directly inside the browser.',
          'Ethical imperative: Explainability, privacy consent, and avoiding echo-chamber filter bubbles.',
        ],
        realWorldExamples: [
          'Browser-native WebGPU language/vision models running offline without server round-trips.',
          'Adaptive e-learning portals pacing problem difficulty dynamically to student mastery.',
        ],
        comparisonTable: {
          title: 'Evolution from Web 1.0 to Web 4.0',
          headers: ['Era', 'Nickname', 'Primary Focus', 'Core Mechanism'],
          rows: [
            ['Web 1.0', 'Static Web', 'Information Publishing', 'HTML + HTTP + Hyperlinks'],
            ['Web 2.0', 'Social Web', 'Participation & UGC', 'AJAX + REST + CMS + Social Graphs'],
            ['Web 3.0', 'Semantic Web', 'Machine-Understandable Data', 'RDF + OWL + SPARQL + Linked Data'],
            ['Web 4.0', 'Symbiotic / AI Web', 'Proactive Intelligence & Context', 'AI Agents + WebGPU + IoT Integration'],
          ],
        },
        simulationId: 'semantic-search',
        simulationCaption: 'Explore Web 1.0–4.0 evolution and test semantic ranking behavior.',
        examples: {
          basic: {
            title: 'Context-Aware Adaptive Greeting & Content Priority',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Personalization Rule Engine</h3>
  <select id="role" onchange="personalize()">
    <option value="exam">Exam Revision Mode</option>
    <option value="lab">Practical Lab Mode</option>
  </select>
  <div id="feed" style="margin-top:10px; padding:10px; background:#f2ebe1; border-radius:6px;"></div>
</div>
<script>
  function personalize() {
    const r = document.getElementById('role').value;
    document.getElementById('feed').textContent =
      r === 'exam'
        ? 'Prioritized: 7-Mark Long Q&As, Protocol Comparison Tables, Flashcards.'
        : 'Prioritized: Live HTML5 Sandbox, AJAX XHR Lab, CSS Box Model Sliders.';
  }
  personalize();
</script>`,
            expectedOutput: 'Reorders study highlights dynamically based on learner intent.',
            explanation: 'Demonstrates transparent intent-driven personalization without opaque tracking.',
          },
          intermediate: {
            title: 'Checking Browser WebGPU Readiness',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Client-Side AI Hardware Capability Check</h3>
  <p id="gpu"></p>
</div>
<script>
  const el = document.getElementById('gpu');
  el.textContent = 'navigator.gpu ' + ('gpu' in navigator ? 'is supported (ready for local WebGPU ML inference).' : 'is unavailable in this headless/sandbox context; falls back to WebAssembly/Cloud.');
</script>`,
            expectedOutput: 'Detects `navigator.gpu` support cleanly with graceful fallback messaging.',
            explanation: 'Shows progressive enhancement for browser-local AI execution.',
          },
          advanced: {
            title: 'Client-Side Cosine Preference Scorer',
            language: 'javascript',
            runnableInSandbox: false,
            code: `function rankTopics(userVec, topicVecs) {
  return topicVecs
    .map(t => ({
      title: t.title,
      score: t.vec.reduce((sum, v, i) => sum + v * userVec[i], 0),
    }))
    .sort((a, b) => b.score - a.score);
}`,
            expectedOutput: 'Ranks topics by dot-product alignment with the user’s focus vector.',
            explanation: 'Core vector-similarity math powering personalized feeds.',
          },
        },
        mistakes: [
          { mistake: 'Personalizing UI silently without user control or transparency.', fix: 'Provide clear reset controls and explain why items are recommended.' },
        ],
        bestPractices: [
          'Run lightweight inference on-device via WebAssembly/WebGPU when privacy matters.',
        ],
        quiz: [
          {
            question: 'Which browser API unlocks hardware-accelerated GPU compute for local AI models in Web 4.0?',
            options: ['WebSQL', 'WebGPU', 'FTP API', 'XMLHttpRequest'],
            correctIndex: 1,
            explanation: 'WebGPU exposes modern GPU compute shaders directly to browser JavaScript/Wasm.',
          },
        ],
        flashcards: [
          { front: 'How is Web 4.0 characterized?', back: 'As the Symbiotic/Intelligent Web—AI-driven, context-aware, proactive, and deeply integrated with real-time agents.' },
          { front: 'What is a "Filter Bubble"?', back: 'When over-personalization hides diverse viewpoints by feeding users only what matches prior clicks.' },
        ],
        assignment: {
          task: 'Design a 4-row evolution table contrasting Web 1.0, Web 2.0, Web 3.0, and Web 4.0 across interaction model, architecture, and examples.',
          hint: 'Static -> Social -> Semantic -> Symbiotic AI.',
          solution: 'Map Web 1.0 (Brochures), Web 2.0 (Wikis/AJAX), Web 3.0 (RDF/Semantic), Web 4.0 (AI Agents/Ambient Web).',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Define Web 4.0 and mention two risks of hyper-personalization.',
            answer: 'Web 4.0 is the Symbiotic, AI-powered Web delivering intelligent, context-aware interactions. Risks: (1) Algorithmic filter bubbles narrowing exposure, (2) User privacy/profiling concerns.',
          },
          {
            marks: '7M',
            question: 'Trace the evolution from Web 1.0 to Web 4.0 and explain how AI and personalization transform modern web architectures.',
            answer: 'Present the 4-era comparison table, explain Web 4.0 characteristics (NLP, predictive UX, WebGPU client inference, contextual agents), and discuss ethical safeguards (GDPR consent, transparency, fallback modes).',
          },
        ],
      },
      {
        id: 'u5-t2',
        code: '5.2',
        title: 'Decentralized Web (DWeb) and Blockchain Integration',
        bloom: 'L3 / L4 · Analyze',
        readMinutes: 7,
        keywords: ['IPFS', 'Content Addressing CID', 'Smart Contracts', 'dApps', 'DID'],
        summary:
          'Replacing centralized single-origin hosting with peer-to-peer content-addressed storage (IPFS), Smart Contracts, Decentralized Identifiers (DIDs), and dApps.',
        definition:
          'The Decentralized Web (DWeb) shifts web infrastructure away from centralized corporate servers toward peer-to-peer networks using cryptographic Content Addressing (such as IPFS), self-executing Smart Contracts, and user-owned Decentralized Identifiers (DIDs).',
        purpose:
          'To eliminate single points of failure, link rot, and censorship while returning cryptographic identity and data ownership to users.',
        whyNeeded:
          'Traditional HTTP relies on Location Addressing (`https://server.com/file.pdf`): if that single server goes offline or alters the file silently, every link breaks or serves tampered data.',
        detailedTheory: [
          'HTTP uses Location Addressing (where a file lives). IPFS (InterPlanetary File System) uses Content Addressing (what the file IS): hashing a file generates a unique cryptographic Content Identifier (`CID`, e.g., `Qm...` or `bafy...`). Any peer hosting a block with that matching hash can serve it, and the browser verifies integrity automatically.',
          'Decentralized Applications (dApps) pair frontend interfaces (HTML/JS/React) with backend Smart Contracts—deterministic programs deployed on blockchains like Ethereum that execute identically across validator nodes without a central admin.',
          'W3C Decentralized Identifiers (DIDs) and Verifiable Credentials allow students or citizens to sign in with cryptographic wallets (`Sign-In with Ethereum` / DID auth) instead of surrendering passwords to centralized identity silos.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Chunk & Hash Asset', detail: 'Split file into blocks and compute cryptographic Merkle DAG hash.', artifact: 'CID: bafybei...' },
          { step: 2, title: 'DHT Peer Discovery', detail: 'Query Distributed Hash Table across peers to find nodes pinning that CID.', artifact: 'libp2p DHT' },
          { step: 3, title: 'Verify & Render', detail: 'Client verifies received bytes match the CID hash before displaying.', artifact: 'Zero Tampering' },
          { step: 4, title: 'Smart Contract State', detail: 'dApp signs transactions via user wallet to update on-chain state.', artifact: 'Signed Tx' },
        ],
        keyTakeaways: [
          'HTTP = Location Addressing (URL -> Server IP); IPFS = Content Addressing (CID hash -> Any Peer).',
          'Smart Contracts execute deterministic backend rules on-chain.',
          'Tradeoff: High censorship resistance & integrity vs slower finality, gas fees, and harder key recovery.',
        ],
        realWorldExamples: [
          'ENS (`vitalik.eth`) mapping human names to IPFS content hashes.',
          'Tamper-proof academic transcript verification anchored via Merkle roots.',
        ],
        comparisonTable: {
          title: 'Centralized Web (HTTP) vs Decentralized Web (DWeb / IPFS)',
          headers: ['Feature', 'Traditional HTTP Web', 'Decentralized Web (DWeb)'],
          rows: [
            ['Addressing', 'Location-Based (Domain + Path)', 'Content-Based (Cryptographic CID Hash)'],
            ['Storage', 'Central cloud servers / single origin', 'Distributed P2P nodes (IPFS, Filecoin)'],
            ['Authentication', 'Centralized DB / OAuth providers', 'User-controlled keys & W3C DIDs'],
            ['Link Integrity', '404 Link Rot if server shuts down', 'Persists as long as any peer pins the CID'],
          ],
        },
        simulationId: 'nextgen-5g-iot',
        simulationCaption: 'Test live IPFS Content-Addressing CID hash generation vs HTTP URL location links.',
        examples: {
          basic: {
            title: 'Content-Addressing CID Simulator in Browser',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>IPFS Content Addressing vs HTTP Location</h3>
  <input id="content" value="CS35302 Lecture Notes v1" oninput="makeCid()" style="width:100%; padding:6px; border:1px solid #c9b9a5; border-radius:4px;" />
  <pre id="cid" style="background:#f2ebe1; padding:10px; border-radius:6px; margin-top:8px; font-size:12px;"></pre>
</div>
<script>
  async function makeCid() {
    const val = document.getElementById('content').value;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(val));
    const hex = Array.from(new Uint8Array(buf)).slice(0, 14).map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('cid').textContent =
      'HTTP (Mutable Location): https://cdn.example.com/notes.txt\\n' +
      'IPFS (Immutable CID):    ipfs://bafy' + hex;
  }
  makeCid();
</script>`,
            expectedOutput: 'Produces a deterministic content hash that changes whenever the file content changes.',
            explanation: 'Demonstrates why IPFS links guarantee exact byte integrity regardless of which peer serves them.',
          },
          intermediate: {
            title: 'Conceptual Solidity Smart Contract',
            language: 'javascript',
            runnableInSandbox: false,
            code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CourseRegistry {
  mapping(address => bool) public completed;

  function markComplete() external {
    completed[msg.sender] = true;
  }
}`,
            expectedOutput: 'Records immutable completion state keyed by the caller’s cryptographic address.',
            explanation: 'Shows minimal deterministic on-chain state transitions in a dApp backend.',
          },
          advanced: {
            title: 'Wallet Provider Detection (`window.ethereum`)',
            language: 'javascript',
            runnableInSandbox: false,
            code: `async function connectDidWallet() {
  if (!window.ethereum) {
    return { connected: false, reason: 'No EIP-1193 wallet extension found' };
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return { connected: true, address: accounts[0] };
}`,
            expectedOutput: 'Requests public address consent without exposing private keys to the web app.',
            explanation: 'Standard non-custodial authentication flow for DWeb applications.',
          },
        },
        mistakes: [
          { mistake: 'Storing large videos or private PII directly inside a public blockchain.', fix: 'Store encrypted files off-chain on IPFS/cloud and anchor only their compact CID hashes on-chain.' },
        ],
        bestPractices: [
          'Use hybrid architectures: off-chain indexing/caching for instant UX + on-chain proofs only where trustlessness is required.',
        ],
        quiz: [
          {
            question: 'How does IPFS locate a file on the Decentralized Web?',
            options: [
              'By server IP address only',
              'By Content Identifier (CID), a cryptographic hash of the file’s contents',
              'By DNS MX records',
              'By cookies stored in localStorage',
            ],
            correctIndex: 1,
            explanation: 'IPFS uses content-based addressing via CIDs so any peer holding the matching bytes can serve and verify the file.',
          },
        ],
        flashcards: [
          { front: 'Location Addressing vs Content Addressing?', back: 'Location (HTTP) asks WHERE a file is; Content (IPFS CID) asks WHAT the file hash is.' },
          { front: 'What is a Smart Contract?', back: 'Self-executing deterministic code deployed on a blockchain ledger that enforces rules without intermediaries.' },
        ],
        assignment: {
          task: 'Compare Centralized OAuth2 authentication vs Decentralized DID/Wallet authentication across 3 criteria: privacy, key recovery, and server dependency.',
          hint: 'Consider what happens if a user loses a seed phrase vs forgets an email password.',
          solution: 'OAuth2: Easy password reset, relies on Google/Meta servers. DID Wallet: Zero central dependency & high privacy, but losing seed keys risks permanent lockout without social recovery.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'What is Content Addressing in IPFS, and why does it prevent link rot?',
            answer: 'Content Addressing identifies files by a cryptographic hash of their contents (CID) rather than a single server URL. As long as any peer node pins the file, any node can verify and serve it reliably.',
          },
          {
            marks: '7M',
            question: 'Explain the architecture of the Decentralized Web (DWeb) covering IPFS, Smart Contracts, DIDs, and tradeoffs against centralized web hosting.',
            answer: 'Compare HTTP location addressing vs IPFS CID Merkle DAGs, explain dApp + Smart Contract execution, describe W3C DID authentication, and evaluate scalability, key-management, and cost tradeoffs.',
          },
        ],
      },
      {
        id: 'u5-t3',
        code: '5.3',
        title: 'Internet of Things (IoT) in Web Development (Web of Things)',
        bloom: 'L3 · Apply',
        readMinutes: 6,
        keywords: ['Web of Things (WoT)', 'MQTT over WebSockets', 'WebSockets', 'Telemetry', 'Thing Description'],
        summary:
          'Connecting physical sensors, wearables, and smart appliances to browser dashboards using WebSockets, MQTT over WebSockets, and W3C Web of Things.',
        definition:
          'The Web of Things (WoT) is the W3C architectural layer on top of the Internet of Things (IoT) that exposes physical sensors and actuators as standard HTTP/WebSocket web resources described by machine-readable JSON-LD Thing Descriptions.',
        purpose:
          'To let standard web browsers and cloud APIs monitor real-time sensor telemetry and trigger physical actuators without proprietary vendor mobile apps.',
        whyNeeded:
          'Early IoT devices spoke fragmented, incompatible protocols (Zigbee, BLE, raw TCP, proprietary binary), trapping smart homes and industrial sensors in closed silos.',
        detailedTheory: [
          'IoT web architectures combine lightweight constrained protocols at the hardware edge with real-time browser transports. Devices commonly publish tiny telemetry packets via MQTT (Publish/Subscribe broker model over TCP or WebSockets) or CoAP (UDP equivalent of REST).',
          'To stream live temperature, power, or GPS updates to a web dashboard without polling overhead, servers push frames over full-duplex WebSockets (`wss://`) or Server-Sent Events (SSE).',
          'Modern browsers also offer Web Bluetooth and Web Serial APIs to pair directly with nearby microcontrollers (Arduino/ESP32) over HTTPS.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Sensor Sampling', detail: 'Microcontroller (ESP32) reads temperature/humidity telemetry.', artifact: '24.6°C / 58%' },
          { step: 2, title: 'Publish via MQTT', detail: 'Device publishes compact JSON payload to topic `lab/sensor1/temp`.', artifact: 'MQTT Broker' },
          { step: 3, title: 'Stream via WebSocket', detail: 'Gateway forwards topic events over persistent `wss://` socket to browser.', artifact: 'WS Frame' },
          { step: 4, title: 'Dashboard & Actuation', detail: 'Web UI updates chart live and sends control command back (`fan: ON`).', artifact: 'Bidirectional' },
        ],
        keyTakeaways: [
          'IoT = Hardware + Network connectivity; WoT = Standardized Web layer (HTTP/WS/JSON-LD) on top of IoT.',
          'MQTT = Lightweight Pub/Sub protocol ideal for battery/bandwidth-constrained sensors.',
          'WebSockets provide full-duplex bidirectional streaming for live dashboards.',
        ],
        realWorldExamples: [
          'Smart campus energy grids displaying live solar & HVAC telemetry in browser consoles.',
          'Hospital ICU monitors streaming patient vitals via secure WebSockets.',
        ],
        comparisonTable: {
          title: 'HTTP Polling vs Server-Sent Events vs WebSockets vs MQTT',
          headers: ['Protocol', 'Direction', 'Overhead', 'Best IoT Web Use Case'],
          rows: [
            ['HTTP Polling', 'Client Pull', 'High (repeated headers)', 'Rarely changing device settings'],
            ['SSE', 'Server -> Client Push', 'Low', 'One-way live sensor alert feeds'],
            ['WebSockets', 'Full-Duplex Bidirectional', 'Very Low (2-byte frame)', 'Interactive real-time dashboards & controls'],
            ['MQTT', 'Pub/Sub via Broker', 'Ultra-Low (2-byte header)', 'Thousands of battery-powered edge sensors'],
          ],
        },
        simulationId: 'nextgen-5g-iot',
        simulationCaption: 'Interact with a live IoT MQTT/WebSocket sensor telemetry stream and threshold actuator.',
        examples: {
          basic: {
            title: 'W3C Web of Things Thing Description (JSON-LD)',
            language: 'javascript',
            runnableInSandbox: false,
            code: `{
  "@context": "https://www.w3.org/2022/wot/td/v1.1",
  "title": "SmartLabThermostat",
  "properties": {
    "temperature": { "type": "number", "unit": "celsius", "observable": true }
  },
  "actions": {
    "toggleFan": { "input": { "type": "boolean" } }
  }
}`,
            expectedOutput: 'Allows any WoT-compliant web client to auto-discover properties and actions.',
            explanation: 'Standardizes how physical hardware describes itself to web applications.',
          },
          intermediate: {
            title: 'Live IoT Sensor Telemetry & Auto-Fan Simulator',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>IoT Telemetry Stream (Simulated WebSocket)</h3>
  <button onclick="tick()" style="padding:7px 12px; background:#4a2c1d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Receive Sensor Packet</button>
  <div id="dash" style="margin-top:10px; padding:12px; background:#f2ebe1; border-radius:6px; font-family:monospace;"></div>
</div>
<script>
  function tick() {
    const temp = (22 + Math.random() * 10).toFixed(1);
    const fan = temp > 27 ? 'ON (Auto-Cooling)' : 'STANDBY';
    document.getElementById('dash').textContent =
      'Topic: lab/room2/temp | Payload: ' + temp + ' °C | Actuator Fan: ' + fan;
  }
  tick();
</script>`,
            expectedOutput: 'Simulates incoming JSON telemetry and triggers automatic cooling logic above 27°C.',
            explanation: 'Illustrates closed-loop sensor-to-web-to-actuator control.',
          },
          advanced: {
            title: 'Browser WebSocket Client with Reconnect',
            language: 'javascript',
            runnableInSandbox: false,
            code: `function connectTelemetry(url, onReading) {
  const ws = new WebSocket(url);
  ws.onmessage = (evt) => onReading(JSON.parse(evt.data));
  ws.onclose = () => setTimeout(() => connectTelemetry(url, onReading), 2000);
  return ws;
}`,
            expectedOutput: 'Maintains a resilient persistent telemetry socket with 2-second reconnect backoff.',
            explanation: 'Production IoT dashboards must recover automatically from transient Wi-Fi drops.',
          },
        },
        mistakes: [
          { mistake: 'Using unencrypted `ws://` or default passwords on IoT devices.', fix: 'Always enforce TLS (`wss://` / MQTTS) and per-device client certificates.' },
        ],
        bestPractices: [
          'Throttle or batch high-frequency sensor updates (e.g., 100 Hz vibration -> 5 Hz UI average) before painting DOM charts.',
        ],
        quiz: [
          {
            question: 'Which lightweight Publish/Subscribe protocol is specifically designed for low-bandwidth IoT sensors?',
            options: ['SMTP', 'MQTT', 'SOAP', 'XSLT'],
            correctIndex: 1,
            explanation: 'MQTT uses a minimal 2-byte fixed header and pub/sub broker ideal for constrained IoT nodes.',
          },
        ],
        flashcards: [
          { front: 'Difference between IoT and WoT?', back: 'IoT connects physical devices to networks; Web of Things (WoT) exposes them via standard HTTP/WebSocket/JSON-LD APIs.' },
          { front: 'Why WebSockets over HTTP Polling for IoT?', back: 'WebSockets keep a single low-overhead bidirectional connection open, avoiding repeated HTTP header round-trips.' },
        ],
        assignment: {
          task: 'Design a JSON telemetry schema and WebSocket event flow for a Smart Campus Parking Lot with 50 ultrasonic bay sensors.',
          hint: 'Include `bayId`, `occupied` boolean, `timestamp`, and `mqttTopic`.',
          solution: 'Sensors publish `{ bayId: "B12", occupied: true, ts: 1710000000 }` over MQTT -> Cloud Bridge -> WebSocket push to Campus Map UI.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Define the Web of Things (WoT) and name two real-time protocols used in IoT web apps.',
            answer: 'The Web of Things (WoT) integrates physical IoT devices into the Web using standard HTTP, WebSockets, and JSON-LD Thing Descriptions. Two key real-time protocols: MQTT (Pub/Sub) and WebSockets (full-duplex browser streaming).',
          },
          {
            marks: '7M',
            question: 'Explain IoT integration in Web Development covering MQTT, WebSockets, W3C WoT architecture, and security best practices.',
            answer: 'Diagram Sensor -> Gateway/MQTT Broker -> Cloud Server -> WebSocket -> Browser Dashboard, compare HTTP polling vs SSE vs WebSockets vs MQTT, describe Thing Descriptions, and highlight TLS encryption and rate-limiting.',
          },
        ],
      },
      {
        id: 'u5-t4',
        code: '5.4',
        title: 'Augmented Reality (AR) and Virtual Reality (VR) in Web (WebXR)',
        bloom: 'L2 / L3 · Apply',
        readMinutes: 6,
        keywords: ['WebXR Device API', 'WebGL / Three.js', '6DoF', 'Hit Testing', 'glTF'],
        summary:
          'Delivering zero-install immersive Virtual Reality and Augmented Reality experiences directly inside web browsers using WebXR, WebGL/Three.js, and glTF.',
        definition:
          'WebXR (Web eXtended Reality) is a W3C JavaScript API that provides unified access to VR headsets and AR mobile cameras/sensors inside the browser, rendering 3D scenes via WebGL/WebGPU frameworks like Three.js.',
        purpose:
          'To eliminate multi-gigabyte app-store downloads so users can click a URL and immediately inspect 3D products in AR or explore virtual labs in VR.',
        whyNeeded:
          'Native AR/VR apps fragment across iOS, Android, and headset stores, creating high friction for education, retail, and architectural previews.',
        detailedTheory: [
          'Virtual Reality (VR) replaces the user’s physical view with a stereoscopic 3D world (`immersive-vr`), tracking 3DoF (orientation) or 6DoF (position + orientation). Augmented Reality (AR) composites digital 3D models onto the live camera feed (`immersive-ar`) using Hit Testing to anchor objects onto physical desks or floors.',
          'Under the hood, WebXR synchronizes frame timing (`xrSession.requestAnimationFrame`) with headset refresh rates (72–120 Hz) to prevent motion sickness, while Three.js or Babylon.js renders lightweight compressed `.glb` / `.glTF` 3D assets.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Feature Check', detail: 'Query `navigator.xr.isSessionSupported("immersive-ar" | "immersive-vr")`.', artifact: 'Capability Check' },
          { step: 2, title: 'User Gesture Start', detail: 'User clicks "Enter XR" button to satisfy browser security policy.', artifact: 'requestSession()' },
          { step: 3, title: '6DoF Pose & Frame Loop', detail: 'Obtain viewer head/hand pose matrices inside the XR animation loop.', artifact: 'XRViewerPose' },
          { step: 4, title: 'WebGL Render & Composite', detail: 'Three.js draws left/right eye views (VR) or camera-anchored mesh (AR).', artifact: '72–120 FPS' },
        ],
        keyTakeaways: [
          'WebXR = Unified browser API replacing deprecated WebVR.',
          'glTF / GLB = "JPEG of 3D" for fast web download and GPU upload.',
          '3DoF tracks rotation only; 6DoF tracks rotation + spatial movement (X/Y/Z).',
        ],
        realWorldExamples: [
          'E-commerce "View in Your Room" furniture placement directly from mobile Chrome/Safari.',
          'Virtual chemistry and anatomy labs running in college browsers.',
        ],
        comparisonTable: {
          title: 'WebVR vs WebAR via WebXR',
          headers: ['Mode', 'Session Type', 'Reality Blend', 'Typical Hardware'],
          rows: [
            ['Virtual Reality (VR)', 'immersive-vr', '100% synthetic virtual scene', 'Meta Quest, Vision, Cardboard'],
            ['Augmented Reality (AR)', 'immersive-ar', '3D overlays anchored onto live camera view', 'ARCore/ARKit phones, AR glasses'],
            ['Inline 3D Preview', 'inline', 'Interactive 3D canvas embedded inside webpage', 'Any desktop/mobile browser'],
          ],
        },
        simulationId: 'nextgen-5g-iot',
        simulationCaption: 'Inspect WebXR capability detection, 3D projection, and 5G streaming latency for XR.',
        examples: {
          basic: {
            title: 'Interactive 2D/3D Isometric Perspective Canvas',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>Interactive Rotating 3D Wireframe Cube (Canvas Projection)</h3>
  <canvas id="c" width="260" height="170" style="background:#f2ebe1; border:1px solid #ded2c3; border-radius:6px;"></canvas>
</div>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  const pts = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  let a = 0;
  setInterval(() => {
    a += 0.04;
    ctx.clearRect(0, 0, 260, 170);
    const proj = pts.map(([x, y, z]) => {
      const rx = x * Math.cos(a) - z * Math.sin(a);
      const rz = x * Math.sin(a) + z * Math.cos(a) + 3.6;
      return [130 + (rx / rz) * 140, 85 + (y / rz) * 140];
    });
    ctx.strokeStyle = '#4a2c1d'; ctx.lineWidth = 2;
    edges.forEach(([i, j]) => {
      ctx.beginPath(); ctx.moveTo(...proj[i]); ctx.lineTo(...proj[j]); ctx.stroke();
    });
  }, 33);
</script>`,
            expectedOutput: 'Renders a smooth rotating 3D cube using perspective projection math.',
            explanation: 'Demonstrates the foundational 3D-to-2D projection pipeline before WebGL shaders.',
          },
          intermediate: {
            title: 'WebXR Session Support Check',
            language: 'javascript',
            runnableInSandbox: false,
            code: `async function initXR(btn) {
  if (!navigator.xr) return;
  const vrOk = await navigator.xr.isSessionSupported('immersive-vr');
  if (vrOk) {
    btn.disabled = false;
    btn.onclick = async () => {
      const session = await navigator.xr.requestSession('immersive-vr');
      // Attach WebGLRenderer and start XR frame loop
    };
  }
}`,
            expectedOutput: 'Enables the "Enter VR" button only on capable browsers and awaits a user click.',
            explanation: 'Browsers block `requestSession()` unless triggered directly by a user gesture.',
          },
          advanced: {
            title: 'Three.js WebXR Boilerplate',
            language: 'javascript',
            runnableInSandbox: false,
            code: `renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
renderer.setAnimationLoop(() => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
});`,
            expectedOutput: 'Switches automatically from standard `requestAnimationFrame` to headset-synced `XRSession` frames.',
            explanation: 'Three.js abstracts stereoscopic cameras and pose tracking into `renderer.xr`.',
          },
        },
        mistakes: [
          { mistake: 'Using `window.requestAnimationFrame` instead of `xrSession.requestAnimationFrame` inside VR.', fix: 'Headsets run at 72–120 Hz independently of monitor refresh; always use `xrSession.requestAnimationFrame`.' },
        ],
        bestPractices: [
          'Compress 3D models into binary `.glb` with Draco geometry compression so mobile users load scenes under 2 seconds.',
        ],
        quiz: [
          {
            question: 'Which 3D file format is the standard "JPEG of 3D" for WebXR applications?',
            options: ['.psd', '.glTF / .glb', '.docx', '.bmp'],
            correctIndex: 1,
            explanation: 'glTF/GLB maps directly to GPU vertex/texture buffers with minimal parsing overhead.',
          },
        ],
        flashcards: [
          { front: '3DoF vs 6DoF tracking?', back: '3DoF tracks head rotation (pitch, yaw, roll); 6DoF adds spatial translation (X, Y, Z).' },
          { front: 'What is Hit Testing in WebAR?', back: 'Casting a virtual ray from the camera against real-world planes (floors/tables) to place 3D objects accurately.' },
        ],
        assignment: {
          task: 'Design a progressive enhancement flow for a University Campus Tour webpage supporting Desktop 3D, Mobile AR, and VR Headsets.',
          hint: 'Check `navigator.xr` -> fall back to inline Three.js orbit controls -> fall back to static campus photos.',
          solution: 'Tier 1: `immersive-vr` headset tour; Tier 2: `immersive-ar` tabletop 3D campus map; Tier 3: Interactive WebGL canvas.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Differentiate between AR and VR in web development and name the W3C API powering them.',
            answer: 'VR (`immersive-vr`) immerses the user in a fully synthetic 3D world, whereas AR (`immersive-ar`) overlays 3D objects onto the real camera view. Both are powered by the W3C WebXR Device API.',
          },
          {
            marks: '7M',
            question: 'Explain WebXR architecture for Browser AR/VR, covering session lifecycle, 6DoF, Hit Testing, glTF assets, and performance optimization.',
            answer: 'Detail WebXR Device API + WebGL/Three.js integration, `isSessionSupported` -> `requestSession` -> `XRSession.requestAnimationFrame`, 3DoF vs 6DoF tracking, AR hit testing, and `.glb` compression.',
          },
        ],
      },
      {
        id: 'u5-t5',
        code: '5.5',
        title: 'Smart Web, Adaptive Interfaces, and Web Automation',
        bloom: 'L3 / L4 · Analyze',
        readMinutes: 6,
        keywords: ['Adaptive UI', 'Progressive Enhancement', 'CSS Media Features', 'Playwright / Puppeteer', 'CI/CD'],
        summary:
          'Context-aware Smart Web platforms, Adaptive User Interfaces responding to user/device constraints, and headless Web Automation.',
        definition:
          'Smart Web systems combine responsive sensors, device/accessibility preferences, and behavioral telemetry to render Adaptive User Interfaces (AUIs) that morph dynamically, while Web Automation uses headless browsers (Playwright, Puppeteer, Selenium) for end-to-end testing, synthetic monitoring, and workflow automation.',
        purpose:
          'To ensure interfaces stay fast and accessible across vastly different screens, network speeds, and human abilities while automating repetitive QA and operational checks.',
        whyNeeded:
          'One rigid desktop layout breaks on low-bandwidth mobile devices or causes discomfort for motion-sensitive users; manual browser testing cannot scale across daily deployments.',
        detailedTheory: [
          'Adaptive User Interfaces go beyond screen-width `@media (min-width)` breakpoints. Modern CSS and Web APIs adapt to motion sensitivity (`prefers-reduced-motion`), contrast needs (`prefers-contrast`), slow networks (`navigator.connection.saveData`), and coarse touch pointers (`pointer: coarse`).',
          'Web Automation drives real Chromium/Firefox/WebKit engines programmatically. In CI/CD pipelines, Playwright/Cypress scripts verify login flows, visual regressions, and accessibility rules before code ships. Responsible automation respects `robots.txt`, rate limits, and official APIs.',
        ],
        mechanismSteps: [
          { step: 1, title: 'Sense Environment', detail: 'Read CSS preference queries, network `saveData`, and viewport input type.', artifact: 'Context Signals' },
          { step: 2, title: 'Adapt UI Density & Motion', detail: 'Simplify animations, enlarge touch targets, or defer heavy media.', artifact: 'Adaptive UI' },
          { step: 3, title: 'Automated Browser Test', detail: 'Headless Playwright launches page, clicks flows, and asserts DOM invariants.', artifact: 'CI/CD Gate' },
        ],
        keyTakeaways: [
          'Responsive UI adapts to screen size; Adaptive UI adapts to user abilities, motion/theme prefs, and network speed.',
          'Playwright & Puppeteer automate real browsers reliably for E2E QA.',
          'Always prefer official APIs over brittle HTML scraping for data integration.',
        ],
        realWorldExamples: [
          'E-commerce checkout disabling heavy background videos automatically when `saveData` is enabled.',
          'GitHub Actions running Playwright browser tests on every pull request.',
        ],
        comparisonTable: {
          title: 'Responsive Design vs Adaptive User Interfaces',
          headers: ['Trait', 'Responsive Web Design', 'Adaptive Interface (Smart Web)'],
          rows: [
            ['Primary Signal', 'Viewport width & orientation', 'Network speed, motion/contrast prefs, role, context'],
            ['Implementation', 'Fluid CSS Grid & Flexbox', 'Progressive enhancement, preference media queries, dynamic state'],
            ['Accessibility', 'Reflows columns cleanly', 'Disables vestibular triggers, boosts contrast, simplifies tasks'],
          ],
        },
        simulationId: 'nextgen-5g-iot',
        simulationCaption: 'Simulate network-aware and accessibility-aware adaptive UI rules.',
        examples: {
          basic: {
            title: 'CSS Accessibility & Preference Adaptation',
            language: 'css',
            runnableInSandbox: false,
            code: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
@media (pointer: coarse) {
  button, a { min-height: 44px; min-width: 44px; }
}`,
            expectedOutput: 'Neutralizes motion animations for vestibular-sensitive users and enlarges touch targets.',
            explanation: 'Zero-JavaScript adaptive ergonomics baked into modern CSS.',
          },
          intermediate: {
            title: 'Interactive Adaptive UI Mode Simulator',
            language: 'html',
            runnableInSandbox: true,
            code: `<div id="box" style="font-family: system-ui; padding: 16px; background:#faf6f0; color:#24160e; border:1px solid #ded2c3; border-radius:8px;">
  <h3>Adaptive UI Context Simulator</h3>
  <label><input type="checkbox" id="saveData" onchange="adapt()" /> Slow 2G / Data Saver</label>
  <label style="margin-left:12px;"><input type="checkbox" id="touch" onchange="adapt()" /> Coarse Touch Screen</label>
  <div id="ui" style="margin-top:12px;"></div>
</div>
<script>
  function adapt() {
    const lite = document.getElementById('saveData').checked;
    const touch = document.getElementById('touch').checked;
    const pad = touch ? '14px 20px' : '6px 12px';
    document.getElementById('ui').innerHTML =
      '<p>' + (lite ? 'Data-Saver Active: High-res hero image replaced with lightweight SVG summary.' : 'Full Broadband Mode: Rich media previews enabled.') + '</p>' +
      '<button style="padding:' + pad + '; background:#4a2c1d; color:#fff; border:none; border-radius:4px;">Primary Action</button>';
  }
  adapt();
</script>`,
            expectedOutput: 'Adapts button hit-target size and media payload dynamically to context toggles.',
            explanation: 'Illustrates practical Adaptive UI engineering.',
          },
          advanced: {
            title: 'Playwright End-to-End Web Automation Script',
            language: 'javascript',
            runnableInSandbox: false,
            code: `import { test, expect } from '@playwright/test';

test('student marks topic complete and persists across reload', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: /Mark Complete/i }).click();
  await page.reload();
  await expect(page.getByText(/Completed/i)).toBeVisible();
});`,
            expectedOutput: 'Verifies real browser UI state and `localStorage` persistence automatically in CI.',
            explanation: 'Modern Playwright auto-waits for elements, preventing flaky `sleep()` timers.',
          },
        },
        mistakes: [
          { mistake: 'Using hardcoded `sleep(5000)` pauses in Web Automation scripts.', fix: 'Use condition-based auto-waiting assertions (`await expect(locator).toBeVisible()`).' },
        ],
        bestPractices: [
          'Respect `@media (prefers-reduced-motion: reduce)` across all transitions and 3D animations.',
        ],
        quiz: [
          {
            question: 'Which CSS media query detects touch-screen devices requiring larger tap targets?',
            options: ['(hover: hover)', '(pointer: coarse)', '(orientation: landscape)', '(color: 8)'],
            correctIndex: 1,
            explanation: '`pointer: coarse` identifies finger/touch inputs rather than fine mouse cursors.',
          },
        ],
        flashcards: [
          { front: 'Adaptive UI vs Responsive UI?', back: 'Responsive adapts layout to viewport size; Adaptive tailors UI to user prefs, accessibility, network speed, and intent.' },
          { front: 'Top 2 ethical rules for Web Automation?', back: '1. Prefer official APIs over scraping; 2. Respect robots.txt and rate limits.' },
        ],
        assignment: {
          task: 'Write a 4-step Playwright automation plan to verify a login form, search filter, and dark-mode toggle.',
          hint: 'Navigate -> Fill & Click -> Assert DOM -> Reload & Verify persistence.',
          solution: '1. `goto("/")`; 2. Toggle Dark Mode & assert `.dark` class; 3. Type search query & verify filtered count; 4. `reload()` & confirm state persists.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'How does an Adaptive User Interface differ from a standard Responsive Design?',
            answer: 'Responsive Design mainly adjusts layout grids to viewport width, whereas an Adaptive UI dynamically modifies interaction density, media weight, contrast, and motion using user context, network speed (`saveData`), and accessibility media queries.',
          },
          {
            marks: '7M',
            question: 'Explain Smart Web, Adaptive Interfaces, and Web Automation (tools, use cases, and ethical considerations).',
            answer: 'Define Smart Web signals, CSS/JS adaptive patterns (`prefers-reduced-motion`, `pointer: coarse`, `saveData`), and Web Automation using Playwright/Selenium for E2E QA vs RPA while highlighting ethical scraping rules.',
          },
        ],
      },
      {
        id: 'u5-t6',
        code: '5.6',
        title: 'Impact of 5G on Web Technologies',
        bloom: 'L2 / L4 · Evaluate',
        readMinutes: 6,
        keywords: ['eMBB', 'URLLC (<1 ms)', 'mMTC', 'Edge Cloud', 'WebRTC & PWAs'],
        summary:
          'How 5G’s three pillars (eMBB, URLLC, mMTC) transform mobile web performance, real-time WebRTC collaboration, PWAs, WebXR streaming, and Edge Cloud architectures.',
        definition:
          '5G (Fifth-Generation Cellular Networking) is not merely faster mobile broadband; it introduces three distinct service classes—Enhanced Mobile Broadband (eMBB), Ultra-Reliable Low-Latency Communications (URLLC), and Massive Machine-Type Communications (mMTC)—that fundamentally reshape what web browsers can stream and compute.',
        purpose:
          'To deliver gigabit mobile throughput, sub-millisecond radio-link latency, and million-device-per-km² IoT density so mobile web apps match wired fiber responsiveness.',
        whyNeeded:
          '4G LTE (~50 ms latency, ~35 Mbps real-world throughput) bottlenecked live multiplayer web games, browser-streamed 3D WebXR worlds, and high-density urban IoT telemetry.',
        detailedTheory: [
          'The International Telecommunication Union (ITU IMT-2020) defines three transformative 5G capabilities: (1) eMBB (peak speeds up to 10–20 Gbps) — enables instant loading of Progressive Web Apps (PWAs), 4K/8K WebRTC video, and rich `.glb` 3D assets; (2) URLLC (~1 ms air-interface latency) — unlocks real-time collaborative whiteboards, cloud-rendered WebXR, and tele-operation via WebRTC DataChannels; and (3) mMTC (up to 1,000,000 devices/km²) — floods Web of Things dashboards with dense smart-city sensor telemetry.',
          'Architecturally, 5G pairs with Multi-Access Edge Computing (MEC) inside telecom towers: heavy AI or 3D rendering executes at the cell-site edge rather than traveling thousands of kilometers to a distant cloud region.',
          'Nevertheless, web engineers must still practice Progressive Enhancement—using adaptive streaming (HLS/DASH) and Service Worker offline caching—for users stepping into elevators, rural zones, or congested spectrum.',
        ],
        mechanismSteps: [
          { step: 1, title: 'eMBB High Throughput', detail: 'Delivers multi-gigabit downloads for instant PWA hydration and 4K/8K WebRTC media.', artifact: '1–10 Gbps' },
          { step: 2, title: 'URLLC Low Latency', detail: 'Cuts radio RTT toward ~1–10 ms for real-time WebSocket & WebRTC interaction.', artifact: '~1 ms Air RTT' },
          { step: 3, title: 'mMTC Sensor Density', detail: 'Connects 1M IoT nodes/km² streaming telemetry into Web of Things hubs.', artifact: '1M devices/km²' },
          { step: 4, title: 'MEC Edge Offload', detail: 'Executes cloud rendering and AI inference directly inside nearby 5G edge nodes.', artifact: 'Edge Cloud' },
        ],
        keyTakeaways: [
          '3 Pillars of 5G: eMBB (Speed), URLLC (1 ms Latency), mMTC (1M IoT/km²).',
          'Web Impact: Browser-streamed WebXR, ultra-low-latency WebRTC collaboration, instant PWA loads, massive IoT dashboards.',
          'Progressive Enhancement remains mandatory: never abandon caching or adaptive bitrates.',
        ],
        realWorldExamples: [
          'Multi-user 3D CAD and WebXR collaboration streamed from Edge GPUs over 5G URLLC.',
          'Autonomous campus shuttles and traffic grids feeding real-time mMTC telemetry to web consoles.',
        ],
        comparisonTable: {
          title: '4G LTE vs 5G Impact on Web Delivery',
          headers: ['Metric / Web Impact', '4G LTE', '5G (IMT-2020)'],
          rows: [
            ['Typical Throughput', '20–50 Mbps', '500 Mbps – 10 Gbps (eMBB)'],
            ['Air-Interface Latency', '30–60 ms', '~1 ms (URLLC)'],
            ['IoT Density', '~100,000 devices / km²', '1,000,000 devices / km² (mMTC)'],
            ['Web Capabilities', '2D SPAs, standard HD video', 'Cloud-streamed WebXR, 4K WebRTC, Dense WoT'],
          ],
        },
        simulationId: 'nextgen-5g-iot',
        simulationCaption: 'Benchmark 4G LTE vs 5G eMBB/URLLC download & RTT latency across real web assets.',
        examples: {
          basic: {
            title: '4G vs 5G Asset Transfer Calculator',
            language: 'html',
            runnableInSandbox: true,
            code: `<div style="font-family: system-ui; padding: 16px; color: #24160e;">
  <h3>5G vs 4G Web Asset Transfer Simulator</h3>
  <label>3D WebXR / Video Asset Size (MB): <input id="mb" type="number" value="50" style="width:70px; padding:4px;" /></label>
  <button onclick="calc()" style="padding:6px 12px; background:#4a2c1d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Compare</button>
  <pre id="out" style="background:#f2ebe1; padding:12px; border-radius:6px; margin-top:10px; font-size:12px;"></pre>
</div>
<script>
  function calc() {
    const mb = Number(document.getElementById('mb').value) || 50;
    const ms4g = Math.round(50 + ((mb * 8) / 35) * 1000);
    const ms5g = Math.round(4 + ((mb * 8) / 1000) * 1000);
    document.getElementById('out').textContent =
      '4G LTE (35 Mbps, 50ms RTT): ' + ms4g + ' ms (' + (ms4g / 1000).toFixed(2) + ' s)\\n' +
      '5G eMBB (1000 Mbps, 4ms RTT): ' + ms5g + ' ms (' + (ms5g / 1000).toFixed(2) + ' s)';
  }
  calc();
</script>`,
            expectedOutput: 'Demonstrates 5G downloading a 50 MB 3D WebXR scene in ~0.4 seconds vs ~11.5 seconds on 4G.',
            explanation: 'Shows quantitatively why heavy WebXR and instant PWA hydration become viable over 5G.',
          },
          intermediate: {
            title: 'Network-Aware Adaptive Quality Hook',
            language: 'javascript',
            runnableInSandbox: false,
            code: `function selectAssetQuality() {
  const conn = navigator.connection;
  if (!conn) return 'standard';
  if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === '3g') {
    return 'lite-fallback';
  }
  return conn.downlink >= 20 ? 'ultra-hd-webxr' : 'standard';
}`,
            expectedOutput: 'Serves ultra-HD WebXR assets on high-downlink connections while protecting slow users.',
            explanation: 'Progressive enhancement using the Network Information API.',
          },
          advanced: {
            title: 'Service Worker Offline Cache Fallback',
            language: 'javascript',
            runnableInSandbox: false,
            code: `self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});`,
            expectedOutput: 'Ensures PWAs stay instant even when a 5G signal drops inside tunnels or basements.',
            explanation: 'Combines 5G instant hydration with offline-first resilience.',
          },
        },
        mistakes: [
          { mistake: 'Shipping bloated 20 MB unoptimized JS bundles assuming everyone has 5G.', fix: '5G coverage varies; always code-split, compress, and cache via Service Workers.' },
        ],
        bestPractices: [
          'Pair 5G speed with Edge MEC caching and Progressive Enhancement so every user gets fast first paint.',
        ],
        quiz: [
          {
            question: 'Which 5G pillar focuses on sub-millisecond latency for real-time collaborative apps and remote control?',
            options: ['eMBB', 'URLLC', 'mMTC', 'SMTP'],
            correctIndex: 1,
            explanation: 'URLLC (Ultra-Reliable Low-Latency Communications) targets ~1 ms air-interface latency.',
          },
          {
            question: 'Which 5G pillar supports up to 1 million IoT sensors per square kilometer?',
            options: ['eMBB', 'URLLC', 'mMTC', 'HTTP/3'],
            correctIndex: 2,
            explanation: 'mMTC (Massive Machine-Type Communications) scales dense urban IoT deployments.',
          },
        ],
        flashcards: [
          { front: 'Expand the 3 5G Pillars?', back: 'eMBB (Enhanced Mobile Broadband), URLLC (Ultra-Reliable Low-Latency), mMTC (Massive Machine-Type Communications).' },
          { front: 'What is MEC in 5G?', back: 'Multi-Access Edge Computing—running compute/AI inside telecom edge nodes close to users.' },
        ],
        assignment: {
          task: 'Evaluate how 5G impacts four web domains: PWAs, WebRTC Video/Collaboration, WebXR, and IoT Web Dashboards.',
          hint: 'Map each domain to eMBB, URLLC, or mMTC.',
          solution: 'PWAs -> instant hydration via eMBB; WebRTC -> zero-lag sync via URLLC; WebXR -> cloud-rendered scenes via eMBB+URLLC+MEC; IoT -> dense telemetry via mMTC.',
        },
        examQAs: [
          {
            marks: '2M',
            question: 'Name the three service pillars of 5G and state one web impact for each.',
            answer: '(1) eMBB (high speed -> instant PWAs & 4K WebRTC); (2) URLLC (~1 ms latency -> real-time cloud WebXR & multiplayer apps); (3) mMTC (1M devices/km² -> massive IoT Web of Things dashboards).',
          },
          {
            marks: '7M',
            question: 'Evaluate the impact of 5G and Multi-Access Edge Computing (MEC) on modern Web Technologies.',
            answer: 'Contrast 4G vs 5G metrics, explain eMBB, URLLC, and mMTC in detail, show how MEC reduces round-trip distance for WebXR/AI/WebRTC, and conclude why progressive enhancement and Service Worker caching remain essential.',
          },
        ],
      },
    ],
  },
];

import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

type SolverMode = 'explain' | 'exam' | 'code';

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface DoubtRequestBody {
  question?: string;
  topicCode?: string;
  topicTitle?: string;
  topicSummary?: string;
  mode?: SolverMode;
  history?: ChatTurn[];
}

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildSystemInstruction(body: DoubtRequestBody): string {
  const mode: SolverMode = body.mode === 'exam' || body.mode === 'code' ? body.mode : 'explain';

  const modeGuidance =
    mode === 'exam'
      ? [
          'Format the response as a high-scoring university exam answer (suitable for 2-mark precision or 7-mark analytical questions).',
          'Use concise numbered sections: Definition, Core Mechanism / Architecture, Key Differences or Diagram Notes, and Exam Key Points.',
        ].join(' ')
      : mode === 'code'
      ? [
          'Focus on practical code implementation and debugging.',
          'Provide a clean, minimal runnable snippet in a fenced code block (```html, ```css, ```javascript, or ```xml), explain what each part does, and highlight the most common student bug to avoid.',
        ].join(' ')
      : [
          'Explain the concept in clear, approachable student-friendly language.',
          'Start with a direct 1-2 sentence answer, give an intuitive everyday analogy, walk through how it works step by step, and end with one memorable takeaway.',
        ].join(' ');

  const topicBlock = body.topicTitle
    ? `Active Lesson Context: Topic ${body.topicCode ?? ''} — "${body.topicTitle}". Summary: ${body.topicSummary ?? ''}`
    : 'General CS35302 Web Technology Syllabus Context (Units 1–5: Internet/WWW/Protocols/DNS, HTML5/CSS/DHTML/XML, Web Services SOAP/WSDL/UDDI/CORBA/AJAX, Web 2.0/3.0/Semantic Web/Search/Edge/Dark Mode, Web 4.0/DWeb/IoT/WebXR/5G).';

  return [
    'You are the CS35302 Web Technology Doubt Solver Assistant for Quantum University B.Tech CSE students.',
    topicBlock,
    modeGuidance,
    'Keep explanations accurate, structured, and concise (around 150–280 words unless a full code example or 7-mark answer needs a little more). Do not invent fake URLs or unrelated topics.',
  ].join('\n\n');
}

async function generateWithRetry(
  ai: GoogleGenAI,
  contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>,
  systemInstruction: string
) {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction,
        },
      });
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const isTransient = msg.includes('503') || msg.includes('500') || msg.includes('ECONNRESET');
      if (!isTransient || attempt === 1) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, 450));
    }
  }
  throw lastErr;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, model: 'gemini-4-hydrogen' });
  });

  app.post('/api/doubt-solver', async (req: Request, res: Response) => {
    const body = (req.body || {}) as DoubtRequestBody;
    const question = typeof body.question === 'string' ? body.question.trim() : '';

    if (!question) {
      res.status(400).json({ error: 'Please enter a question or doubt to solve.' });
      return;
    }

    if (question.length > 2000) {
      res.status(400).json({ error: 'Question is too long. Please keep it under 2000 characters.' });
      return;
    }

    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Gemini API key is not configured on the server. Please check GEMINI_API_KEY in the Settings > Secrets panel.',
      });
      return;
    }

    try {
      const safeHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> =
        Array.isArray(body.history)
          ? body.history
              .slice(-8)
              .filter(
                (item): item is ChatTurn =>
                  Boolean(item) &&
                  (item.role === 'user' || item.role === 'model') &&
                  typeof item.text === 'string' &&
                  item.text.trim().length > 0
              )
              .map((item) => ({
                role: item.role,
                parts: [{ text: item.text.trim() }],
              }))
          : [];

      const contents = [
        ...safeHistory,
        {
          role: 'user' as const,
          parts: [{ text: question }],
        },
      ];

      const systemInstruction = buildSystemInstruction(body);
      const response = await generateWithRetry(ai, contents, systemInstruction);
      const answer = response.text?.trim();

      if (!answer) {
        res.status(502).json({
          error: 'The assistant returned an empty response. Please rephrase your question and try again.',
        });
        return;
      }

      res.json({ answer, model: 'gemini-4-hydrogen' });
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : 'Unexpected server error';
      let status = 500;
      let userMessage = `Could not generate an answer right now: ${rawMessage}`;

      if (rawMessage.includes('403') || rawMessage.includes('PERMISSION_DENIED') || rawMessage.includes('API_KEY_INVALID')) {
        status = 403;
        userMessage =
          'Gemini API key could not be verified. Please check your key in the Settings > Secrets panel.';
      } else if (rawMessage.includes('429') || rawMessage.includes('RESOURCE_EXHAUSTED')) {
        status = 429;
        userMessage = 'Rate limit reached momentarily. Please wait a few seconds and try again.';
      } else if (rawMessage.includes('404') || rawMessage.includes('NOT_FOUND')) {
        status = 404;
        userMessage = 'Configured Gemini model was not found. Please verify model availability.';
      }

      res.status(status).json({ error: userMessage });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CS35302 Web Technology Studio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

import "server-only";

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
// "-latest" is an alias Google keeps pointed at the current recommended
// flash model — pinning a dated version (e.g. gemini-2.0-flash) instead
// means a hard 404 the day Google retires that specific version, like what
// happened here. Deployers who want a pinned version can still set
// GEMINI_MODEL themselves.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

/** True if the deployer set a shared server-side key, used when a request brings none of its own. */
export const hasServerDefaultKey = Boolean(GROQ_API_KEY || GEMINI_API_KEY);

interface RequestKeys {
  groq?: string;
  gemini?: string;
}

/**
 * Thrown when a provider answers 429 (free-tier request/token limit hit).
 * Kept distinct from a generic failure so routes can tell the user "you're
 * rate-limited, try later or add the other provider's key" instead of the
 * misleading "check your API key" message a bad-key error gets.
 */
export class AiRateLimitError extends Error {
  provider: "groq" | "gemini";
  constructor(provider: "groq" | "gemini") {
    super(`${provider} rate limited (429)`);
    this.name = "AiRateLimitError";
    this.provider = provider;
  }
}

/**
 * Any non-429 error response from a provider. Carries the provider's own
 * error message (bad key, decommissioned model, malformed request, outage)
 * so the API routes can show the user something more useful than a blanket
 * "check your key" — which is actively misleading when the key is fine and
 * something else (e.g. a retired model id) is the real cause.
 */
export class AiProviderError extends Error {
  provider: "groq" | "gemini";
  status: number;
  detail: string;
  constructor(provider: "groq" | "gemini", status: number, rawBody: string) {
    const detail = extractErrorDetail(rawBody);
    super(`${provider} ${status}: ${detail}`);
    this.name = "AiProviderError";
    this.provider = provider;
    this.status = status;
    this.detail = detail;
  }
}

function extractErrorDetail(rawBody: string): string {
  try {
    const parsed = JSON.parse(rawBody);
    const msg = parsed?.error?.message ?? parsed?.error ?? parsed?.message;
    if (typeof msg === "string" && msg.trim()) return msg.trim().slice(0, 300);
  } catch {
    // Not JSON — fall through to the raw text.
  }
  return rawBody.trim().slice(0, 300) || "nggak ada detail dari provider.";
}

/**
 * fetch() with one retry, only for the failure modes that are genuinely
 * transient (a dropped connection, a provider's 5xx). A 4xx (bad key,
 * bad request, retired model) means the exact same request would fail
 * again immediately, so those return on the first try — retrying would
 * just double the latency of an error the user needs to see anyway.
 */
async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  try {
    const res = await fetch(url, init);
    if (res.status < 500) return res;
    await new Promise((r) => setTimeout(r, 400));
    return await fetch(url, init);
  } catch (err) {
    await new Promise((r) => setTimeout(r, 400));
    try {
      return await fetch(url, init);
    } catch {
      throw err;
    }
  }
}

async function callGroq(apiKey: string, systemPrompt: string, userPrompt: string) {
  const res = await fetchWithRetry("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });
  if (res.status === 429) throw new AiRateLimitError("groq");
  if (!res.ok) throw new AiProviderError("groq", res.status, await res.text());
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Groq: respons kosong.");
  return text as string;
}

async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
    }),
  });
  if (res.status === 429) throw new AiRateLimitError("gemini");
  if (!res.ok) throw new AiProviderError("gemini", res.status, await res.text());
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Gemini: respons kosong.");
  return text as string;
}

/**
 * BYOK: each user pastes their own Groq/Gemini key in Profile, sent along
 * with the request and never stored server-side. `keys` (per-request) wins
 * over the deployer's own GROQ_API_KEY/GEMINI_API_KEY env vars, which only
 * serve as a fallback default. Groq is tried first — generous free tier and
 * low latency, a good fit for an inline feature — falling back to Gemini
 * when Groq's key is missing or the call errors (rate limit, outage), so
 * one provider hiccup doesn't take the feature down.
 */
/** Short one-line summary of a thrown error, for combining Groq + Gemini failures into one message. */
function briefError(err: unknown): string {
  if (err instanceof AiRateLimitError) return "kena limit gratis (429)";
  if (err instanceof AiProviderError) return `${err.status} — ${err.detail}`;
  return err instanceof Error ? err.message : String(err);
}

export async function generateText(systemPrompt: string, userPrompt: string, keys: RequestKeys = {}) {
  const groqKey = keys.groq || GROQ_API_KEY;
  const geminiKey = keys.gemini || GEMINI_API_KEY;
  let groqError: unknown;

  if (groqKey) {
    try {
      return await callGroq(groqKey, systemPrompt, userPrompt);
    } catch (err) {
      groqError = err;
      console.error("[ai] Groq failed, falling back to Gemini:", err instanceof Error ? err.message : err);
    }
  }
  if (geminiKey) {
    try {
      return await callGemini(geminiKey, systemPrompt, userPrompt);
    } catch (geminiErr) {
      // Both configured and both failed — surface Groq's reason too, since
      // otherwise it's silently swallowed and it looks like Gemini is the
      // only provider that was ever tried.
      if (groqError) throw new Error(`Groq gagal (${briefError(groqError)}), Gemini juga gagal (${briefError(geminiErr)}).`);
      throw geminiErr;
    }
  }
  // Distinguish "nothing configured" from "the only configured provider
  // errored" — the latter shouldn't be reported as if no key was set.
  if (groqError) throw groqError instanceof Error ? groqError : new Error(String(groqError));
  throw new Error("Nggak ada AI provider yang dikonfigurasi.");
}

/** User-facing copy for AiRateLimitError, shared across the API routes that call generateText/generateChatReply. */
export function rateLimitMessage(err: AiRateLimitError) {
  const name = err.provider === "groq" ? "Groq" : "Gemini";
  return `Kena limit gratis ${name} buat sekarang. Tunggu beberapa saat, atau isi key provider satunya juga di Profil biar otomatis ganti kalau salah satu lagi limit.`;
}

/** User-facing copy for AiProviderError — includes the provider's own error text plus a guess at what to do about it. */
export function providerErrorMessage(err: AiProviderError) {
  const name = err.provider === "groq" ? "Groq" : "Gemini";
  const guidance =
    err.status === 401 || err.status === 403
      ? "Kemungkinan key-nya salah kepaste, kepotong, atau udah di-revoke — cek lagi di Profil."
      : err.status === 400
        ? "Kemungkinan ada yang berubah di sisi provider (misal model yang dipakai app ini udah nggak didukung lagi)."
        : err.status >= 500
          ? "Server providernya lagi bermasalah, coba lagi beberapa saat lagi."
          : "";
  return `${name} nolak request (${err.status}): ${err.detail}${guidance ? " — " + guidance : ""}`;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

async function callGroqChat(apiKey: string, systemPrompt: string, turns: ChatTurn[]) {
  const res = await fetchWithRetry("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...turns],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });
  if (res.status === 429) throw new AiRateLimitError("groq");
  if (!res.ok) throw new AiProviderError("groq", res.status, await res.text());
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Groq: respons kosong.");
  return text as string;
}

async function callGeminiChat(apiKey: string, systemPrompt: string, turns: ChatTurn[]) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: turns.map((t) => ({
        role: t.role === "assistant" ? "model" : "user",
        parts: [{ text: t.content }],
      })),
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
    }),
  });
  if (res.status === 429) throw new AiRateLimitError("gemini");
  if (!res.ok) throw new AiProviderError("gemini", res.status, await res.text());
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Gemini: respons kosong.");
  return text as string;
}

/**
 * Multi-turn variant of generateText for the chat companion — same BYOK/
 * fallback rules, but carries conversation history instead of one prompt.
 */
export async function generateChatReply(systemPrompt: string, turns: ChatTurn[], keys: RequestKeys = {}) {
  const groqKey = keys.groq || GROQ_API_KEY;
  const geminiKey = keys.gemini || GEMINI_API_KEY;
  let groqError: unknown;

  if (groqKey) {
    try {
      return await callGroqChat(groqKey, systemPrompt, turns);
    } catch (err) {
      groqError = err;
      console.error("[ai] Groq chat failed, falling back to Gemini:", err instanceof Error ? err.message : err);
    }
  }
  if (geminiKey) {
    try {
      return await callGeminiChat(geminiKey, systemPrompt, turns);
    } catch (geminiErr) {
      if (groqError) throw new Error(`Groq gagal (${briefError(groqError)}), Gemini juga gagal (${briefError(geminiErr)}).`);
      throw geminiErr;
    }
  }
  if (groqError) throw groqError instanceof Error ? groqError : new Error(String(groqError));
  throw new Error("Nggak ada AI provider yang dikonfigurasi.");
}

import "server-only";

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

/** True if the deployer set a shared server-side key, used when a request brings none of its own. */
export const hasServerDefaultKey = Boolean(GROQ_API_KEY || GEMINI_API_KEY);

interface RequestKeys {
  groq?: string;
  gemini?: string;
}

async function callGroq(apiKey: string, systemPrompt: string, userPrompt: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Groq: respons kosong.");
  return text as string;
}

async function callGemini(apiKey: string, systemPrompt: string, userPrompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
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
export async function generateText(systemPrompt: string, userPrompt: string, keys: RequestKeys = {}) {
  const groqKey = keys.groq || GROQ_API_KEY;
  const geminiKey = keys.gemini || GEMINI_API_KEY;

  if (groqKey) {
    try {
      return await callGroq(groqKey, systemPrompt, userPrompt);
    } catch (err) {
      console.error("[ai] Groq failed, falling back to Gemini:", err instanceof Error ? err.message : err);
    }
  }
  if (geminiKey) {
    return await callGemini(geminiKey, systemPrompt, userPrompt);
  }
  throw new Error("Nggak ada AI provider yang dikonfigurasi.");
}

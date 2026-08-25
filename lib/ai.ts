import "server-only";

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export const aiConfigured = Boolean(GROQ_API_KEY || GEMINI_API_KEY);

async function callGroq(systemPrompt: string, userPrompt: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
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

async function callGemini(systemPrompt: string, userPrompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
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
 * Groq first — generous free tier and low latency, good fit for an
 * inline/real-time feature. Falls back to Gemini when Groq isn't
 * configured or errors out (rate limit, outage), so one provider hiccup
 * doesn't take the feature down.
 */
export async function generateText(systemPrompt: string, userPrompt: string) {
  if (GROQ_API_KEY) {
    try {
      return await callGroq(systemPrompt, userPrompt);
    } catch (err) {
      console.error("[ai] Groq failed, falling back to Gemini:", err instanceof Error ? err.message : err);
    }
  }
  if (GEMINI_API_KEY) {
    return await callGemini(systemPrompt, userPrompt);
  }
  throw new Error("Nggak ada AI provider yang dikonfigurasi.");
}

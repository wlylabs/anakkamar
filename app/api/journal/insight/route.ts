import { NextResponse } from "next/server";

import { AiRateLimitError, generateText, hasServerDefaultKey, rateLimitMessage } from "@/lib/ai";

const CONTENT_MAX_LENGTH = 2000;
const KEY_MAX_LENGTH = 200;

const SYSTEM_PROMPT =
  "Lo adalah teman refleksi yang hangat dan suportif di Anak Kamar, app self-development buat anak " +
  "muda Indonesia (16-30 tahun). User baru nulis journal entry. Kasih respons singkat (2-3 kalimat), " +
  "bahasa Indonesia santai kayak ngobrol sama temen (bukan formal, bukan bahasa corporate), yang " +
  "validasi perasaan mereka dan kasih satu insight atau pertanyaan reflektif ringan. Jangan menggurui, " +
  "jangan kasih saran generik kayak 'tetap semangat ya'.";

function readKey(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, KEY_MAX_LENGTH) : undefined;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  // BYOK: each user's own key rides along with the request (from their
  // browser's localStorage, set in Profile) — never persisted here.
  const groq = readKey(body.groqApiKey);
  const gemini = readKey(body.geminiApiKey);

  if (!groq && !gemini && !hasServerDefaultKey) {
    return NextResponse.json(
      { error: "AI belum diaktifin. Masukin API key Groq/Gemini lo di halaman Profil." },
      { status: 503 },
    );
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim().slice(0, CONTENT_MAX_LENGTH) : "";
  const content = typeof body.content === "string" ? body.content.trim().slice(0, CONTENT_MAX_LENGTH) : "";
  if (!content) {
    return NextResponse.json({ error: "Isi journal kosong." }, { status: 400 });
  }

  try {
    const insight = await generateText(SYSTEM_PROMPT, `Prompt hari ini: "${prompt}"\n\nTulisan user:\n${content}`, {
      groq,
      gemini,
    });
    return NextResponse.json({ insight });
  } catch (err) {
    if (err instanceof AiRateLimitError) {
      return NextResponse.json({ error: rateLimitMessage(err) }, { status: 429 });
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error("[journal/insight] failed:", message);
    return NextResponse.json({ error: "Gagal bikin insight. Cek lagi API key lo di Profil." }, { status: 502 });
  }
}

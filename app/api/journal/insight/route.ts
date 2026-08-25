import { NextResponse } from "next/server";

import { aiConfigured, generateText } from "@/lib/ai";

const CONTENT_MAX_LENGTH = 2000;

const SYSTEM_PROMPT =
  "Lo adalah teman refleksi yang hangat dan suportif di Anak Kamar, app self-development buat anak " +
  "muda Indonesia (16-30 tahun). User baru nulis journal entry. Kasih respons singkat (2-3 kalimat), " +
  "bahasa Indonesia santai kayak ngobrol sama temen (bukan formal, bukan bahasa corporate), yang " +
  "validasi perasaan mereka dan kasih satu insight atau pertanyaan reflektif ringan. Jangan menggurui, " +
  "jangan kasih saran generik kayak 'tetap semangat ya'.";

export async function POST(request: Request) {
  if (!aiConfigured) {
    return NextResponse.json({ error: "AI belum dikonfigurasi." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const prompt = typeof body.prompt === "string" ? body.prompt.trim().slice(0, CONTENT_MAX_LENGTH) : "";
  const content = typeof body.content === "string" ? body.content.trim().slice(0, CONTENT_MAX_LENGTH) : "";
  if (!content) {
    return NextResponse.json({ error: "Isi journal kosong." }, { status: 400 });
  }

  try {
    const insight = await generateText(SYSTEM_PROMPT, `Prompt hari ini: "${prompt}"\n\nTulisan user:\n${content}`);
    return NextResponse.json({ insight });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[journal/insight] failed:", message);
    return NextResponse.json({ error: "Gagal bikin insight." }, { status: 502 });
  }
}

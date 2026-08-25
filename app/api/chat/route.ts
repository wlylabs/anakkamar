import { NextResponse } from "next/server";

import {
  AiProviderError,
  AiRateLimitError,
  generateChatReply,
  hasServerDefaultKey,
  providerErrorMessage,
  rateLimitMessage,
  type ChatTurn,
} from "@/lib/ai";

const CONTENT_MAX_LENGTH = 4000;
const KEY_MAX_LENGTH = 200;
const MAX_TURNS = 20;

const SYSTEM_PROMPT =
  "Lo adalah 'Teman Ngobrol', companion AI di Anak Kamar — app self-development buat anak muda " +
  "Indonesia (16-30 tahun) yang fokus ke goal, habit, dan journal kecil-kecilan. Ngobrol santai " +
  "pakai Bahasa Indonesia kayak temen deket, bukan formal atau bahasa corporate. Gaya lo condong " +
  "ke motivational interviewing: lebih banyak nanya balik dan bantu user nemuin jawabannya sendiri, " +
  "daripada langsung ceramah atau kasih daftar saran generik. Kalau user cerita soal goal/habit yang " +
  "macet, bantu mereka mecah jadi langkah sekecil mungkin (bukan target besar) dan validasi dulu " +
  "sebelum ngasih ide. Jawaban singkat aja (2-5 kalimat), kecuali user emang minta penjelasan " +
  "panjang. Jangan pernah ngaku sebagai psikolog/psikiater atau bilang bisa gantiin terapi. Kalau " +
  "user nunjukkin tanda krisis — putus asa berat, menyakiti diri, atau pikiran buat mengakhiri hidup " +
  "— berhenti kasih saran self-development, validasi perasaan mereka dengan hangat, dan dorong " +
  "mereka buat segera hubungi bantuan profesional: Layanan Sehat Jiwa Kemenkes RI di 119 ext 8, atau " +
  "Into The Light Indonesia. Jangan coba nangani situasi krisis sendirian.";

function readKey(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, KEY_MAX_LENGTH) : undefined;
}

function readTurns(value: unknown): ChatTurn[] | null {
  if (!Array.isArray(value)) return null;
  const turns: ChatTurn[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const role = (item as Record<string, unknown>).role;
    const content = (item as Record<string, unknown>).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    const trimmed = content.trim().slice(0, CONTENT_MAX_LENGTH);
    if (trimmed) turns.push({ role, content: trimmed });
  }
  if (turns.length === 0 || turns[turns.length - 1]?.role !== "user") return null;
  return turns.slice(-MAX_TURNS);
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

  const turns = readTurns(body.messages);
  if (!turns) {
    return NextResponse.json({ error: "Pesan nggak valid." }, { status: 400 });
  }

  try {
    const reply = await generateChatReply(SYSTEM_PROMPT, turns, { groq, gemini });
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof AiRateLimitError) {
      return NextResponse.json({ error: rateLimitMessage(err) }, { status: 429 });
    }
    if (err instanceof AiProviderError) {
      console.error("[chat] provider error:", err.message);
      return NextResponse.json({ error: providerErrorMessage(err) }, { status: 502 });
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error("[chat] failed:", message);
    return NextResponse.json({ error: `Gagal dapet balesan. ${message}` }, { status: 502 });
  }
}

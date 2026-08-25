import { NextResponse } from "next/server";

import { generateText, hasServerDefaultKey } from "@/lib/ai";
import type { WeeklySnapshot } from "@/lib/stats";

const KEY_MAX_LENGTH = 200;

const SYSTEM_PROMPT =
  "Lo adalah teman yang hangat dan suportif di Anak Kamar, app self-development buat anak muda " +
  "Indonesia (16-30 tahun). User mau lihat refleksi mingguan berdasarkan angka aktivitas mereka " +
  "(bukan tulisan journal — lo nggak akan pernah dikasih isi journal mereka, cuma angka). Kasih " +
  "respons singkat (3-4 kalimat), bahasa Indonesia santai kayak ngobrol sama temen (bukan formal, " +
  "bukan bahasa corporate). Soroti satu pola paling menonjol dari angkanya (positif atau yang bisa " +
  "diperbaiki), jangan cuma ngulang semua angka jadi kalimat. Jangan menggurui, jangan kasih saran " +
  "generik kayak 'tetap semangat ya', dan jangan ngarang detail yang nggak ada di angkanya. Kalau " +
  "angkanya nunjukkin minggu yang sepi, tetep validasi tanpa nge-guilt-trip.";

function readKey(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, KEY_MAX_LENGTH) : undefined;
}

function readSnapshot(body: Record<string, unknown>): WeeklySnapshot | null {
  const s = body.snapshot;
  if (!s || typeof s !== "object") return null;
  const fields: (keyof WeeklySnapshot)[] = [
    "activeDaysThisWeek",
    "currentStreak",
    "longestHabitStreak",
    "activeHabitsCount",
    "habitChecksThisWeek",
    "activeChallengesCount",
    "challengeChecksThisWeek",
    "activeProjectsCount",
    "completedProjectsCount",
    "journalEntriesThisWeek",
  ];
  const out = {} as WeeklySnapshot;
  for (const key of fields) {
    const value = (s as Record<string, unknown>)[key];
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    out[key] = Math.max(0, Math.round(value));
  }
  return out;
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

  const snapshot = readSnapshot(body);
  if (!snapshot) {
    return NextResponse.json({ error: "Data progress nggak valid." }, { status: 400 });
  }

  const userPrompt = `Angka aktivitas user minggu ini:
- Hari aktif minggu ini: ${snapshot.activeDaysThisWeek}/7
- Streak berjalan sekarang: ${snapshot.currentStreak} hari
- Streak habit terpanjang (sepanjang waktu): ${snapshot.longestHabitStreak} hari
- Habit aktif: ${snapshot.activeHabitsCount}, dicentang minggu ini: ${snapshot.habitChecksThisWeek}x
- Challenge lagi jalan: ${snapshot.activeChallengesCount}, dicentang minggu ini: ${snapshot.challengeChecksThisWeek}x
- Project lagi jalan: ${snapshot.activeProjectsCount}, project selesai (total): ${snapshot.completedProjectsCount}
- Journal entry minggu ini: ${snapshot.journalEntriesThisWeek}`;

  try {
    const insight = await generateText(SYSTEM_PROMPT, userPrompt, { groq, gemini });
    return NextResponse.json({ insight });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[insights/weekly] failed:", message);
    return NextResponse.json({ error: "Gagal bikin refleksi. Cek lagi API key lo di Profil." }, { status: 502 });
  }
}

"use client";

import { Check, ExternalLink, Eye, EyeOff, Gauge, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { useAiKeys } from "@/lib/ai-keys";

const PROVIDERS = [
  {
    id: "groq" as const,
    name: "Groq",
    tutorialUrl: "https://console.groq.com/keys",
    limitsUrl: "https://console.groq.com/docs/rate-limits",
    steps: [
      "Buka console.groq.com/keys, sign in atau daftar (gratis, bisa pakai Google).",
      "Klik \"Create API Key\", kasih nama bebas, lalu Submit.",
      "Copy key yang muncul (cuma ditampilin sekali) dan paste di bawah ini.",
    ],
  },
  {
    id: "gemini" as const,
    name: "Gemini",
    tutorialUrl: "https://aistudio.google.com/apikey",
    limitsUrl: "https://ai.google.dev/gemini-api/docs/rate-limits",
    steps: [
      "Buka aistudio.google.com/apikey, sign in pakai akun Google.",
      "Klik \"Create API key\" → pilih atau bikin project.",
      "Copy key yang muncul dan paste di bawah ini.",
    ],
  },
];

export function AiSettings() {
  const { keys, hydrated, save } = useAiKeys();
  const [draft, setDraft] = useState({ groq: "", gemini: "" });
  const [reveal, setReveal] = useState({ groq: false, gemini: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setDraft(keys);
  }, [hydrated, keys]);

  if (!hydrated) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    save({ groq: draft.groq.trim(), gemini: draft.gemini.trim() });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const active = Boolean(keys.groq || keys.gemini);

  return (
    <div>
      <div className="flex items-center gap-2">
        <KeyRound className="size-4 text-accent" aria-hidden />
        <h2 className="font-bold tracking-tight">Refleksi AI di Journal</h2>
      </div>
      <p className="mt-1 max-w-prose text-sm leading-relaxed text-ink-muted">
        Opsional. Masukin API key lo sendiri (gratis) buat ngaktifin respons refleksi singkat abis
        nulis journal. Key cuma kesimpen di browser ini — nggak pernah kami simpan, dan nggak ikut
        kebawa kalau lo ekspor backup data.
      </p>

      <form onSubmit={handleSave} className="mt-4 space-y-4">
        {PROVIDERS.map((p) => (
          <div key={p.id}>
            <div className="flex items-center justify-between">
              <Label htmlFor={`ai-key-${p.id}`}>{p.name} API key</Label>
              <a
                href={p.tutorialUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-2 flex items-center gap-1 text-xs font-semibold text-ink-subtle hover:text-ink"
              >
                Cara bikin
                <ExternalLink className="size-3" aria-hidden />
              </a>
            </div>
            <div className="relative">
              <Input
                id={`ai-key-${p.id}`}
                type={reveal[p.id] ? "text" : "password"}
                autoComplete="off"
                spellCheck={false}
                placeholder={p.id === "groq" ? "gsk_..." : "AIza..."}
                value={draft[p.id]}
                onChange={(e) => setDraft((d) => ({ ...d, [p.id]: e.target.value }))}
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setReveal((r) => ({ ...r, [p.id]: !r[p.id] }))}
                aria-label={reveal[p.id] ? "Sembunyiin key" : "Tampilin key"}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink-subtle"
              >
                {reveal[p.id] ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
              </button>
            </div>
            <ol className="mt-2 list-decimal space-y-0.5 pl-4 text-xs leading-relaxed text-ink-subtle">
              {p.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <a
              href={p.limitsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-ink-subtle hover:text-ink"
            >
              Lihat batas gratis (rate limit) {p.name} terbaru
              <ExternalLink className="size-3" aria-hidden />
            </a>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <Button type="submit" variant="accent" size="sm">
            Simpan key
          </Button>
          {saved ? (
            <span className="flex items-center gap-1 text-sm font-medium text-positive">
              <Check className="size-3.5" aria-hidden />
              Tersimpan
            </span>
          ) : active ? (
            <span className="text-xs text-ink-subtle">Refleksi AI aktif.</span>
          ) : (
            <span className="text-xs text-ink-subtle">Belum aktif — isi salah satu key di atas.</span>
          )}
        </div>
      </form>

      <div className="mt-4 rounded-[var(--radius)] border-2 border-line-soft bg-canvas-alt p-3.5">
        <p className="flex items-center gap-1.5 text-xs font-bold text-ink-subtle">
          <Gauge className="size-3.5" aria-hidden />
          Soal batas pemakaian
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-subtle">
          Groq dan Gemini sama-sama punya batas gratis (jumlah request per menit/hari) yang bisa
          berubah kapan aja dan beda-beda tergantung model — jadi angkanya nggak kami cantumin di
          sini, cek link di atas buat yang paling akurat. Kalau kena limit, app bakal kasih tau
          langsung. Groq dicoba duluan, terus otomatis pindah ke Gemini kalau lagi limit atau
          error — jadi isi <span className="font-semibold text-ink">kedua key</span> biar makin
          kecil kemungkinan mentok bareng.
        </p>
      </div>
    </div>
  );
}

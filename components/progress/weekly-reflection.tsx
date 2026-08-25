"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAiKeys } from "@/lib/ai-keys";
import type { WeeklySnapshot } from "@/lib/stats";
import { addDays, todayStr } from "@/lib/utils";

/** Cached per calendar week so opening Progress again doesn't burn another AI call. */
const STORAGE_KEY = "anak-kamar-weekly-reflection";

function mondayOfThisWeek() {
  const today = todayStr();
  const dow = new Date(today + "T00:00:00").getDay(); // 0 (Min) - 6 (Sab)
  return addDays(today, dow === 0 ? -6 : -(dow - 1));
}

interface Cached {
  weekStart: string;
  text: string;
}

function readCache(): Cached | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Cached>;
    return typeof parsed.weekStart === "string" && typeof parsed.text === "string"
      ? (parsed as Cached)
      : null;
  } catch {
    return null;
  }
}

function writeCache(entry: Cached) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // Storage full/blocked — refleksi just won't survive a reload.
  }
}

export function WeeklyReflection({ snapshot }: { snapshot: WeeklySnapshot }) {
  const { keys: aiKeys, hydrated: aiKeysHydrated, active: aiActive } = useAiKeys();
  const [cached, setCached] = useState<Cached | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const weekStart = mondayOfThisWeek();

  useEffect(() => {
    setCached(readCache());
  }, []);

  if (!aiKeysHydrated) return null;

  const current = cached?.weekStart === weekStart ? cached : null;

  const generate = async () => {
    setStatus("loading");
    setErrorText(null);
    try {
      const res = await fetch("/api/insights/weekly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snapshot, groqApiKey: aiKeys.groq, geminiApiKey: aiKeys.gemini }),
      });
      const data = (await res.json().catch(() => ({}))) as { insight?: string; error?: string };
      if (res.ok && data.insight) {
        const entry = { weekStart, text: data.insight };
        writeCache(entry);
        setCached(entry);
        setStatus("idle");
      } else {
        setErrorText(data.error ?? null);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!aiActive) {
    return (
      <Link
        href="/profile"
        className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-ink-subtle hover:text-ink"
      >
        <Sparkles className="size-3.5" aria-hidden />
        Aktifin refleksi mingguan AI, di Profil →
      </Link>
    );
  }

  return (
    <div className="mt-8">
      <p className="text-label mb-3 text-ink-subtle">Refleksi mingguan AI</p>
      <Card className="border-2 border-line bg-accent-soft">
        {current ? (
          <p className="text-sm leading-relaxed">{current.text}</p>
        ) : (
          <p className="text-sm leading-relaxed text-ink-muted">
            Lihat pola dari aktivitas minggu ini — angka doang, journal lo tetep private.
          </p>
        )}
        {status === "error" ? (
          <p className="mt-2 text-xs font-semibold text-critical">{errorText ?? "Gagal bikin refleksi. Coba lagi."}</p>
        ) : null}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-3"
          onClick={() => void generate()}
          disabled={status === "loading"}
        >
          <Sparkles className="size-3.5" aria-hidden />
          {status === "loading" ? "Lagi mikir..." : current ? "Buat ulang" : "Bikin refleksi minggu ini"}
        </Button>
      </Card>
    </div>
  );
}

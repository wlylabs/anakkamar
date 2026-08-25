"use client";

import { BookHeart, Lock, Shuffle, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { JournalIllustration } from "@/components/illustrations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Textarea } from "@/components/ui/field";
import { useAiKeys } from "@/lib/ai-keys";
import { JOURNAL_PROMPTS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { formatDateID } from "@/lib/utils";

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

type Insight = { status: "loading" } | { status: "done"; text: string };

export default function JournalPage() {
  const { state, hydrated, addJournalEntry, deleteJournalEntry } = useApp();
  const { keys: aiKeys, hydrated: aiKeysHydrated } = useAiKeys();
  const [promptIndex, setPromptIndex] = useState(() => dayOfYear() % JOURNAL_PROMPTS.length);
  const [content, setContent] = useState("");
  const [insight, setInsight] = useState<Insight | null>(null);
  // Guards against out-of-order responses: if two entries are submitted in
  // quick succession, an earlier (slower) fetch resolving after a later one
  // must not clobber the insight card with a mismatched reflection.
  const insightRequestId = useRef(0);

  const prompt = useMemo(() => JOURNAL_PROMPTS[promptIndex]!, [promptIndex]);

  if (!hydrated || !aiKeysHydrated) return null;

  const aiActive = Boolean(aiKeys.groq || aiKeys.gemini);

  const fetchInsight = async (promptText: string, contentText: string) => {
    const requestId = ++insightRequestId.current;
    setInsight({ status: "loading" });
    try {
      const res = await fetch("/api/journal/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          content: contentText,
          groqApiKey: aiKeys.groq,
          geminiApiKey: aiKeys.gemini,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { insight?: string };
      if (requestId !== insightRequestId.current) return;
      // Best-effort — the entry's already saved locally, so a missing/failed
      // insight (bad key, rate-limited, offline) just skips the card.
      setInsight(res.ok && data.insight ? { status: "done", text: data.insight } : null);
    } catch {
      if (requestId !== insightRequestId.current) return;
      setInsight(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedContent = content.trim();
    if (!submittedContent) return;
    addJournalEntry(prompt, submittedContent);
    setContent("");
    setPromptIndex((dayOfYear() + 1) % JOURNAL_PROMPTS.length);
    if (aiActive) void fetchInsight(prompt, submittedContent);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 md:px-8">
      <h1 className="text-display flex items-center gap-2.5 text-3xl">
        <BookHeart className="size-7 text-accent" aria-hidden />
        Journal
      </h1>
      <p className="mt-1 flex items-center gap-1.5 text-ink-muted">
        <Lock className="size-3.5" aria-hidden />
        Cuma lo yang bisa lihat ini.
      </p>

      <Card className="mt-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-lg font-semibold leading-snug">&ldquo;{prompt}&rdquo;</p>
          <button
            type="button"
            onClick={() => setPromptIndex((i) => (i + 1) % JOURNAL_PROMPTS.length)}
            className="press flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] border-2 border-line-soft text-ink-subtle"
            aria-label="Ganti prompt"
          >
            <Shuffle className="size-4" aria-hidden />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <Textarea
            rows={5}
            placeholder="Tulis apa aja yang ada di kepala lo..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit" variant="accent" className="mt-3 w-full" disabled={!content.trim()}>
            Simpan
          </Button>
        </form>
      </Card>

      {insight ? (
        <Card className="mt-4 border-2 border-line bg-accent-soft">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-subtle">
            <Sparkles className="size-3.5" aria-hidden />
            Refleksi
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">
            {insight.status === "loading" ? "Lagi mikir..." : insight.text}
          </p>
        </Card>
      ) : !aiActive ? (
        <Link
          href="/profile"
          className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-ink-subtle hover:text-ink"
        >
          <Sparkles className="size-3.5" aria-hidden />
          Aktifin refleksi AI abis nulis journal, di Profil →
        </Link>
      ) : null}

      <div className="mt-8">
        {state.journalEntries.length === 0 ? (
          <EmptyState
            icon={<JournalIllustration className="h-28 w-36" />}
            title="Belum ada catatan"
            description="Tulisan pertama lo bakal muncul di sini."
          />
        ) : (
          <div className="space-y-4">
            {state.journalEntries.map((entry) => (
              <Card key={entry.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold text-ink-subtle">{formatDateID(entry.date)}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Hapus catatan ini? Nggak bisa dibalikin.")) deleteJournalEntry(entry.id);
                    }}
                    className="press flex size-7 shrink-0 items-center justify-center rounded-[var(--radius)] text-ink-subtle hover:text-critical"
                    aria-label="Hapus catatan"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                  </button>
                </div>
                <p className="mt-1.5 text-sm italic text-ink-muted">&ldquo;{entry.prompt}&rdquo;</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{entry.content}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Lock, NotebookPen, Shuffle, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { JournalIllustration } from "@/components/illustrations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Textarea } from "@/components/ui/field";
import { JOURNAL_PROMPTS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { MOOD_OPTIONS, type MoodValue } from "@/lib/types";
import { cn, formatDateID } from "@/lib/utils";

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export default function JournalPage() {
  const { state, hydrated, addJournalEntry, deleteJournalEntry } = useApp();
  const [promptIndex, setPromptIndex] = useState(() => dayOfYear() % JOURNAL_PROMPTS.length);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<MoodValue | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const prompt = useMemo(() => JOURNAL_PROMPTS[promptIndex]!, [promptIndex]);

  if (!hydrated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedContent = content.trim();
    if (!submittedContent) return;
    addJournalEntry(prompt, submittedContent, mood ?? undefined);
    setContent("");
    setMood(null);
    setPromptIndex((dayOfYear() + 1) % JOURNAL_PROMPTS.length);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 md:px-8">
      <h1 className="text-display flex items-center gap-2.5 text-3xl">
        <NotebookPen className="size-7 text-accent" aria-hidden />
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
          <p className="text-label mb-2 text-ink-subtle">Perasaan lo sekarang gimana? (opsional)</p>
          <div className="flex gap-1.5">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood((cur) => (cur === m.value ? null : m.value))}
                aria-pressed={mood === m.value}
                aria-label={m.label}
                title={m.label}
                className={cn(
                  "press flex size-10 items-center justify-center rounded-[var(--radius)] border-2 text-lg",
                  mood === m.value ? "border-line bg-accent-soft" : "border-line-soft bg-surface",
                )}
              >
                {m.emoji}
              </button>
            ))}
          </div>
          <Textarea
            rows={5}
            placeholder="Tulis apa aja yang ada di kepala lo..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-3"
          />
          <Button type="submit" variant="accent" className="mt-3 w-full" disabled={!content.trim()}>
            Simpan
          </Button>
        </form>
      </Card>

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
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-subtle">
                    {entry.mood ? <span aria-hidden>{MOOD_OPTIONS.find((m) => m.value === entry.mood)?.emoji}</span> : null}
                    {formatDateID(entry.date)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(entry.id)}
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

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus catatan ini?"
        description="Nggak bisa dibalikin."
        onConfirm={() => {
          if (deleteTarget) deleteJournalEntry(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

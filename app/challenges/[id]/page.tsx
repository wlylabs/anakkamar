"use client";

import { ArrowLeft, Check, LogOut } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { CATEGORY_COLOR } from "@/lib/category";
import { CHALLENGES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { addDays, cn, formatDateID, todayStr } from "@/lib/utils";

export default function ChallengeDetailPage() {
  const params = useParams<{ id: string }>();
  const { state, hydrated, joinChallenge, toggleChallengeDay, leaveChallenge } = useApp();

  if (!hydrated) return null;

  const template = CHALLENGES.find((c) => c.id === params.id);
  if (!template) {
    return (
      <div className="mx-auto max-w-xl px-5 pt-16 text-center">
        <p className="text-lg font-bold">Challenge nggak ketemu.</p>
        <Link href="/challenges" className="mt-3 inline-block text-sm font-semibold text-ink-muted hover:text-ink">
          Balik ke daftar challenge
        </Link>
      </div>
    );
  }

  const joined = state.joinedChallenges.find((c) => c.challengeId === template.id && c.status === "berjalan");
  const today = todayStr();
  const progressPct = joined ? Math.round((joined.checkedDates.length / template.durationDays) * 100) : 0;

  const days = joined
    ? Array.from({ length: template.durationDays }, (_, i) => addDays(joined.startDate, i))
    : [];

  return (
    <div className="mx-auto max-w-2xl px-5 pb-16 pt-8 md:px-8">
      <Link
        href="/challenges"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Balik
      </Link>

      <CategoryBadge category={template.category} />
      <h1 className="text-display mt-3 text-3xl">{template.title}</h1>
      <p className="mt-1.5 italic text-ink-subtle">{template.tagline}</p>
      <p className="mt-3 leading-relaxed text-ink-muted">{template.description}</p>
      <p className="mt-2 text-sm font-semibold text-ink-subtle">{template.durationDays} hari</p>

      {!joined ? (
        <Button variant="accent" size="lg" className="mt-6 w-full" onClick={() => joinChallenge(template.id)}>
          Join challenge
        </Button>
      ) : (
        <>
          <Card className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-label text-ink-subtle">Progress lo</p>
              <p className="text-lg font-bold">
                {joined.checkedDates.length}/{template.durationDays}
              </p>
            </div>
            <ProgressBar value={progressPct} color={CATEGORY_COLOR[template.category]} className="mt-2" />
          </Card>

          <div className="mt-6">
            <p className="text-label mb-3 text-ink-subtle">Tandai hari</p>
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, i) => {
                const checked = joined.checkedDates.includes(date);
                const isFuture = date > today;
                return (
                  <button
                    key={date}
                    type="button"
                    disabled={isFuture}
                    onClick={() => toggleChallengeDay(joined.id, date)}
                    className={cn(
                      "press flex aspect-square flex-col items-center justify-center rounded-[var(--radius)] border-2 border-line text-xs font-bold disabled:opacity-30",
                      checked ? "bg-positive text-accent-ink" : "bg-surface",
                    )}
                    title={formatDateID(date)}
                  >
                    {checked ? <Check className="size-4" aria-hidden /> : i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => leaveChallenge(joined.id)}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-critical"
          >
            <LogOut className="size-4" aria-hidden />
            Berhenti dari challenge ini
          </button>
        </>
      )}
    </div>
  );
}

"use client";

import { Flame } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { CATEGORY_COLOR } from "@/lib/category";
import { CHALLENGES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export default function ChallengesPage() {
  const { state, hydrated } = useApp();
  if (!hydrated) return null;

  const joinedActiveIds = new Set(
    state.joinedChallenges.filter((c) => c.status === "berjalan").map((c) => c.challengeId),
  );

  return (
    <div className="mx-auto max-w-5xl px-5 pt-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-display flex items-center gap-2.5 text-3xl">
          <Flame className="size-7 text-accent" aria-hidden />
          Challenge
        </h1>
        <p className="mt-1 text-ink-muted">Tantangan singkat buat mulai gerak, bukan buat sempurna.</p>
      </div>

      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHALLENGES.map((c, i) => {
          const joined = state.joinedChallenges.find(
            (jc) => jc.challengeId === c.id && jc.status === "berjalan",
          );
          const progressPct = joined ? Math.round((joined.checkedDates.length / c.durationDays) * 100) : 0;

          return (
            <Link
              key={c.id}
              href={`/challenges/${c.id}`}
              className="paper block p-5"
              style={{ "--stagger-index": i } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-2">
                <CategoryBadge category={c.category} />
                {joinedActiveIds.has(c.id) ? (
                  <span className="text-label rounded-full bg-positive-soft px-2 py-1 text-positive">
                    Diikuti
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-bold tracking-tight">{c.title}</p>
              <p className="mt-1 text-sm italic text-ink-subtle">{c.tagline}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{c.description}</p>
              {joined ? (
                <div className="mt-4">
                  <ProgressBar value={progressPct} color={CATEGORY_COLOR[c.category]} size="sm" />
                  <p className="mt-1.5 text-xs text-ink-subtle">
                    {joined.checkedDates.length}/{c.durationDays} hari
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-xs font-semibold text-ink-subtle">{c.durationDays} hari</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

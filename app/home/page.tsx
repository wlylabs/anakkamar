"use client";

import { BookHeart, Check, Flame, ListChecks, Plus, Sprout } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { CATEGORY_COLOR } from "@/lib/category";
import { CHALLENGES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { activityStreak, challengeTitle, todayCompletion, weeklyActivity } from "@/lib/stats";
import { PROJECT_STATUS_LABEL } from "@/lib/types";
import { formatDateID } from "@/lib/utils";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 10) return "Pagi";
  if (hour < 15) return "Siang";
  if (hour < 18) return "Sore";
  return "Malam";
}

export default function HomePage() {
  const { state, hydrated, toggleHabitDate, isHabitDoneOn, toggleChallengeDay } = useApp();

  if (!hydrated) return null;

  const { profile } = state;
  const currentGoal =
    state.projects.find((p) => p.status === "berjalan") ??
    state.projects.find((p) => p.status === "belum-mulai") ??
    null;
  const activeChallenges = state.joinedChallenges.filter((c) => c.status === "berjalan").slice(0, 3);
  const activeHabits = state.habits.filter((h) => !h.archived).slice(0, 5);
  const recentJournal = state.journalEntries[0];
  const week = weeklyActivity(state);
  const streak = activityStreak(state);
  const completion = todayCompletion(state);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-8 md:px-8">
      <div className="mb-8">
        <p className="text-label text-ink-subtle">
          {greeting()}
          {profile.name ? `, ${profile.name}` : ""}
        </p>
        <h1 className="text-display mt-1.5 text-3xl md:text-4xl">
          Hari ini nggak harus produktif banget.
        </h1>
        <p className="mt-1 text-ink-muted">Cukup maju sedikit.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <p className="text-label text-ink-subtle">Progress hari ini</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-display text-4xl">{completion.pct}%</p>
            {streak > 0 ? (
              <span className="mb-1 inline-flex items-center gap-1 rounded-full border-2 border-line bg-accent-soft px-2.5 py-1 text-xs font-bold">
                <Flame className="size-3.5" aria-hidden />
                {streak} hari
              </span>
            ) : null}
          </div>
          <ProgressBar value={completion.pct} className="mt-3" />
          <p className="mt-2.5 text-xs text-ink-subtle">
            {completion.totalItems === 0
              ? "Belum ada habit atau challenge aktif."
              : `${completion.doneItems} dari ${completion.totalItems} kelar hari ini.`}
          </p>
        </Card>

        <Card className="md:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-label text-ink-subtle">Current goal</p>
            <Link href="/projects" className="text-xs font-semibold text-ink-muted hover:text-ink">
              Lihat semua
            </Link>
          </div>
          {currentGoal ? (
            <Link href={`/projects/${currentGoal.id}`} className="mt-3 block">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold tracking-tight">{currentGoal.name}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{PROJECT_STATUS_LABEL[currentGoal.status]}</p>
                </div>
                <CategoryBadge category={currentGoal.category} />
              </div>
              <ProgressBar
                value={currentGoal.progress}
                color={CATEGORY_COLOR[currentGoal.category]}
                className="mt-3"
              />
            </Link>
          ) : (
            <div className="mt-3 flex flex-col items-start gap-3">
              <p className="text-sm text-ink-muted">Belum ada project jalan. Mulai satu yuk.</p>
              <LinkButton href="/projects/new" size="sm" variant="accent">
                <Plus className="size-4" aria-hidden />
                Bikin project
              </LinkButton>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-label flex items-center gap-1.5 text-ink-subtle">
              <Flame className="size-3.5" aria-hidden /> Challenge aktif
            </p>
            <Link href="/challenges" className="text-xs font-semibold text-ink-muted hover:text-ink">
              Explore
            </Link>
          </div>
          {activeChallenges.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Belum ikutan challenge apa pun.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {activeChallenges.map((c) => {
                const template = CHALLENGES.find((t) => t.id === c.challengeId);
                const doneToday = c.checkedDates.includes(today);
                return (
                  <li key={c.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{challengeTitle(c.challengeId)}</p>
                      <p className="text-xs text-ink-subtle">
                        {c.checkedDates.length}/{template?.durationDays ?? "?"} hari
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleChallengeDay(c.id)}
                      className={`press flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-line ${
                        doneToday ? "bg-positive text-accent-ink" : "bg-surface"
                      }`}
                      aria-pressed={doneToday}
                      aria-label="Tandai hari ini"
                    >
                      <Check className="size-4" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="text-label flex items-center gap-1.5 text-ink-subtle">
              <Sprout className="size-3.5" aria-hidden /> Habit hari ini
            </p>
            <Link href="/habits" className="text-xs font-semibold text-ink-muted hover:text-ink">
              Kelola
            </Link>
          </div>
          {activeHabits.length === 0 ? (
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm text-ink-muted">Belum ada habit.</p>
              <LinkButton href="/habits" size="sm" variant="secondary">
                <Plus className="size-4" aria-hidden />
                Tambah
              </LinkButton>
            </div>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {activeHabits.map((h) => {
                const done = isHabitDoneOn(h.id, today);
                return (
                  <li key={h.id} className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-medium ${done ? "text-ink-subtle line-through" : ""}`}>
                      {h.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleHabitDate(h.id)}
                      className={`press flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] border-2 border-line ${
                        done ? "bg-positive text-accent-ink" : "bg-surface"
                      }`}
                      aria-pressed={done}
                      aria-label={`Tandai ${h.name}`}
                    >
                      <Check className="size-4" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-label flex items-center gap-1.5 text-ink-subtle">
              <BookHeart className="size-3.5" aria-hidden /> Recent journal
            </p>
            <Link href="/journal" className="text-xs font-semibold text-ink-muted hover:text-ink">
              Tulis
            </Link>
          </div>
          {recentJournal ? (
            <div className="mt-3">
              <p className="text-xs text-ink-subtle">{formatDateID(recentJournal.date)}</p>
              <p className="mt-1 text-sm italic text-ink-muted">&ldquo;{recentJournal.prompt}&rdquo;</p>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed">{recentJournal.content}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">Belum ada catatan. Tulis refleksi pertama lo.</p>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="text-label flex items-center gap-1.5 text-ink-subtle">
              <ListChecks className="size-3.5" aria-hidden /> Progress mingguan
            </p>
            <Link href="/progress" className="text-xs font-semibold text-ink-muted hover:text-ink">
              Detail
            </Link>
          </div>
          <div className="mt-4 flex items-end justify-between gap-1.5">
            {week.map((d) => {
              const label = new Date(d.date + "T00:00:00").toLocaleDateString("id-ID", { weekday: "narrow" });
              return (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="h-9 w-full rounded-[var(--radius)] border-2 border-line"
                    style={{ backgroundColor: d.active ? "var(--positive)" : "var(--canvas-alt)" }}
                  />
                  <span className="text-[10px] font-medium text-ink-subtle">{label}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

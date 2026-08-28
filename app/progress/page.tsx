"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { PageSkeleton } from "@/components/ui/skeleton";
import {
  activityStreak,
  challengeStats,
  longestHabitStreak,
  monthlyActivity,
  moodTrend,
  projectStats,
  weeklyActivity,
} from "@/lib/stats";
import { useApp } from "@/lib/store";
import { MOOD_OPTIONS } from "@/lib/types";
import { formatDayID } from "@/lib/utils";

function StatTile({ value, label }: { value: number | string; label: string }) {
  return (
    <Card className="p-4 text-center">
      <p className="text-display text-3xl">{value}</p>
      <p className="text-label mt-1.5 text-ink-subtle">{label}</p>
    </Card>
  );
}

export default function ProgressPage() {
  const { state, hydrated } = useApp();
  if (!hydrated) return <PageSkeleton className="max-w-3xl" grid="three" cards={6} />;

  const projects = projectStats(state);
  const challenges = challengeStats(state);
  const streak = activityStreak(state);
  const habitStreak = longestHabitStreak(state);
  const week = weeklyActivity(state);
  const month = monthlyActivity(state);
  const activeDaysTotal = new Set(state.activeDates).size;
  const mood = moodTrend(state);
  const moodLoggedCount = mood.filter((d) => d.mood !== null).length;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-8 md:px-8">
      <Link href="/home" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden />
        Balik
      </Link>

      <h1 className="text-display text-3xl">Progress lo</h1>
      <p className="mt-1 max-w-md text-ink-muted">
        Ini bukan buat ngukur seberapa produktif lo. Ini cuma nunjukin: progress kecil tetap
        berarti.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile value={projects.total} label="Total project" />
        <StatTile value={projects.selesai} label="Project selesai" />
        <StatTile value={challenges.selesai} label="Challenge selesai" />
        <StatTile value={habitStreak} label="Habit streak terpanjang" />
        <StatTile value={activeDaysTotal} label="Hari aktif" />
        <StatTile value={streak} label="Streak sekarang" />
      </div>

      <div className="mt-8">
        <p className="text-label mb-3 text-ink-subtle">Progress mingguan</p>
        <Card>
          <div className="flex items-end justify-between gap-1.5">
            {week.map((d) => {
              const label = new Date(d.date + "T00:00:00").toLocaleDateString("id-ID", {
                weekday: "short",
              });
              return (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    title={`${formatDayID(d.date)} — ${d.active ? "aktif" : "kosong"}`}
                    className="h-12 w-full rounded-[var(--radius)] border-2 border-line"
                    style={{ backgroundColor: d.active ? "var(--positive)" : "var(--canvas-alt)" }}
                  />
                  <span className="text-[10px] font-medium text-ink-subtle">{label}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <p className="text-label mb-3 text-ink-subtle">Progress bulanan (30 hari)</p>
        <Card>
          <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
            {month.map((d) => (
              <div
                key={d.date}
                title={`${formatDayID(d.date)} — ${d.active ? "aktif" : "kosong"}`}
                className="aspect-square rounded-[3px] border border-line-soft"
                style={{ backgroundColor: d.active ? "var(--positive)" : "var(--canvas-alt)" }}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <p className="text-label mb-3 text-ink-subtle">Mood 14 hari terakhir</p>
        {moodLoggedCount === 0 ? (
          <Card>
            <p className="text-sm text-ink-muted">
              Belum ada mood tercatat. Isi perasaan lo pas nulis journal buat mulai lihat polanya.
            </p>
          </Card>
        ) : (
          <Card>
            <div className="flex items-end justify-between gap-1">
              {mood.map((d) => (
                <div
                  key={d.date}
                  title={`${formatDayID(d.date)} — ${
                    d.mood ? (MOOD_OPTIONS.find((m) => m.value === d.mood)?.label ?? "") : "nggak dicatat"
                  }`}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <div className="relative flex h-11 w-full items-end overflow-hidden rounded-[var(--radius)] border-2 border-line-soft">
                    {d.mood ? (
                      <>
                        <div
                          className="w-full rounded-[3px]"
                          style={{ height: `${(d.mood / 5) * 100}%`, backgroundColor: "var(--accent-soft)" }}
                        />
                        <span className="absolute inset-x-0 bottom-0.5 text-center text-xs leading-none">
                          {MOOD_OPTIONS.find((m) => m.value === d.mood)?.emoji}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
              Naruh perasaan jadi kata-kata (affect labeling) terbukti bisa bantu ngeredam intensitasnya —
              riset Lieberman dkk. (2007). Ini bukan alat diagnosis, cuma buat lo lihat pola sendiri.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

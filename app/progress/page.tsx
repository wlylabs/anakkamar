"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import {
  activityStreak,
  challengeStats,
  longestHabitStreak,
  monthlyActivity,
  projectStats,
  weeklyActivity,
} from "@/lib/stats";
import { useApp } from "@/lib/store";

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
  if (!hydrated) return null;

  const projects = projectStats(state);
  const challenges = challengeStats(state);
  const streak = activityStreak(state);
  const habitStreak = longestHabitStreak(state);
  const week = weeklyActivity(state);
  const month = monthlyActivity(state);
  const activeDaysTotal = new Set(state.activeDates).size;

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
                weekday: "narrow",
              });
              return (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
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
                title={d.date}
                className="aspect-square rounded-[3px] border border-line-soft"
                style={{ backgroundColor: d.active ? "var(--positive)" : "var(--canvas-alt)" }}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

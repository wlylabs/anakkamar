"use client";

import { AlertTriangle, ArrowLeft, BookOpen, Check, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // This component instance is reused across client-side navigations between
  // /challenges/[id] routes, so a day picked on one challenge must not leak
  // into another challenge's (possibly shorter) day grid.
  useEffect(() => {
    setSelectedDay(null);
  }, [params.id]);

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

  const pastOrTodayCount = days.filter((d) => d <= today).length;
  const currentDayIndex = Math.max(0, Math.min(pastOrTodayCount - 1, template.durationDays - 1));
  const activeDayIndex = selectedDay ?? currentDayIndex;
  const activeDay = template.days[activeDayIndex];
  const activeDate = days[activeDayIndex];
  const activeChecked = activeDate ? joined?.checkedDates.includes(activeDate) : false;
  const previewDay = template.days[0];

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

      <div className="mt-4 rounded-[var(--radius)] border-2 border-line-soft bg-canvas-alt px-4 py-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
          <BookOpen className="size-3.5" aria-hidden />
          Dasar kurikulum
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-subtle">{template.basis}</p>
      </div>

      {template.disclaimer ? (
        <div className="mt-3 rounded-[var(--radius)] border-2 border-line bg-caution-soft px-4 py-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <AlertTriangle className="size-3.5" aria-hidden />
            Penting
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{template.disclaimer}</p>
        </div>
      ) : null}

      {!joined ? (
        <>
          <button
            type="button"
            onClick={() => setPreviewOpen((v) => !v)}
            className="press mt-5 flex w-full items-center justify-between rounded-[var(--radius)] border-2 border-line-soft bg-surface px-4 py-3 text-sm font-semibold"
          >
            Preview hari pertama
            {previewOpen ? (
              <ChevronUp className="size-4 shrink-0" aria-hidden />
            ) : (
              <ChevronDown className="size-4 shrink-0" aria-hidden />
            )}
          </button>
          {previewOpen && previewDay ? (
            <Card className="mt-2 animate-fade">
              <p className="text-label text-ink-subtle">Hari 1 — {previewDay.title}</p>
              <p className="mt-2 text-sm leading-relaxed">{previewDay.lesson}</p>
              <div className="mt-3 rounded-[var(--radius)] border-2 border-line-soft bg-accent-soft px-3.5 py-3">
                <p className="text-label text-ink-subtle">Latihan hari ini</p>
                <p className="mt-1 text-sm font-medium leading-relaxed">{previewDay.action}</p>
              </div>
            </Card>
          ) : null}

          <Button variant="accent" size="lg" className="mt-6 w-full" onClick={() => joinChallenge(template.id)}>
            Join challenge
          </Button>
        </>
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
            <p className="text-label mb-3 text-ink-subtle">Pilih hari</p>
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, i) => {
                const checked = joined.checkedDates.includes(date);
                const isFuture = date > today;
                const isSelected = i === activeDayIndex;
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDay(i)}
                    className={cn(
                      "press flex aspect-square flex-col items-center justify-center rounded-[var(--radius)] border-2 text-xs font-bold",
                      checked ? "border-line bg-positive text-accent-ink" : "border-line bg-surface",
                      isSelected ? "outline outline-2 outline-offset-1 outline-ink" : "",
                      isFuture && !checked ? "opacity-40" : "",
                    )}
                    title={formatDateID(date)}
                  >
                    {checked ? <Check className="size-4 animate-pop" aria-hidden /> : i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {activeDay ? (
            <Card className="mt-4 border-2 border-line bg-accent-soft">
              <p className="text-label text-ink-subtle">
                Hari {activeDayIndex + 1} dari {template.durationDays}
                {activeDate ? ` — ${formatDateID(activeDate)}` : ""}
              </p>
              <p className="mt-1 text-lg font-bold leading-snug">{activeDay.title}</p>
              <p className="mt-2 text-sm leading-relaxed">{activeDay.lesson}</p>
              <div className="mt-3 rounded-[var(--radius)] border-2 border-line bg-surface px-3.5 py-3">
                <p className="text-label text-ink-subtle">Latihan hari ini</p>
                <p className="mt-1 text-sm font-medium leading-relaxed">{activeDay.action}</p>
              </div>
              {activeDate && activeDate <= today ? (
                <Button
                  variant={activeChecked ? "secondary" : "accent"}
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => toggleChallengeDay(joined.id, activeDate)}
                >
                  {activeChecked ? "Batalin tanda kelar" : "Tandai kelar"}
                </Button>
              ) : (
                <p className="mt-4 text-center text-xs text-ink-subtle">
                  Belum waktunya — kebuka {activeDate ? formatDateID(activeDate) : ""}
                </p>
              )}
            </Card>
          ) : null}

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

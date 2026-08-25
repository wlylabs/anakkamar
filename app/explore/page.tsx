"use client";

import { Compass, Flame, Lightbulb, ListChecks, MessageCircleQuestion, Sprout } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { FREE_HABIT_LIMIT } from "@/lib/premium";
import { usePremium } from "@/lib/premium-context";
import { useApp } from "@/lib/store";
import {
  CHALLENGES,
  EXPLORE_ACTIVITIES,
  HABIT_IDEAS,
  JOURNAL_PROMPTS,
  PROJECT_IDEAS,
  SKILL_IDEAS,
} from "@/lib/mock-data";

function SectionHeader({
  icon: Icon,
  title,
  href,
  linkLabel,
}: {
  icon: typeof Compass;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-ink-subtle" aria-hidden />
        <p className="text-label text-ink-subtle">{title}</p>
      </div>
      {href ? (
        <Link href={href} className="text-xs font-semibold text-ink-muted hover:text-ink">
          {linkLabel ?? "Lihat semua"}
        </Link>
      ) : null}
    </div>
  );
}

export default function ExplorePage() {
  const { state, createHabit } = useApp();
  const { isPlus } = usePremium();
  const habitAtLimit = !isPlus && state.habits.filter((h) => !h.archived).length >= FREE_HABIT_LIMIT;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-8 md:px-8">
      <h1 className="text-display flex items-center gap-2.5 text-3xl">
        <Compass className="size-7 text-accent" aria-hidden />
        Explore
      </h1>
      <p className="mt-1 text-ink-muted">Bosen? Coba salah satu dari sini.</p>

      <section className="mt-8">
        <SectionHeader icon={Lightbulb} title="Bosen? Coba project ini" />
        <div className="stagger grid gap-3 sm:grid-cols-2">
          {EXPLORE_ACTIVITIES.map((a, i) => (
            <div
              key={a.title}
              className="paper p-4"
              style={{
                "--stagger-index": i,
                transform: i % 2 === 0 ? "rotate(-0.6deg)" : "rotate(0.6deg)",
              } as React.CSSProperties}
            >
              <p className="font-semibold leading-snug">{a.title}</p>
              <p className="mt-1.5 text-sm text-ink-muted">{a.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader icon={Flame} title="Challenge populer" href="/challenges" />
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CHALLENGES.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              href={`/challenges/${c.id}`}
              className="paper w-64 shrink-0 p-4"
            >
              <CategoryBadge category={c.category} />
              <p className="mt-2.5 font-bold leading-snug">{c.title}</p>
              <p className="mt-1 text-xs text-ink-subtle">{c.durationDays} hari</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader icon={ListChecks} title="Ide project" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_IDEAS.map((idea) => (
            <LinkButton
              key={idea.title}
              href={`/projects/new?name=${encodeURIComponent(idea.title)}&category=${idea.category}&days=${idea.durationDays}`}
              variant="secondary"
              size="md"
              className="h-auto flex-col items-start justify-start gap-1 py-3 text-left"
            >
              <span className="font-semibold">{idea.title}</span>
              <span className="text-xs font-normal text-ink-subtle">{idea.durationDays} hari</span>
            </LinkButton>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader icon={Sprout} title="Habit ideas" />
        <div className="flex flex-wrap gap-2">
          {habitAtLimit ? (
            <LinkButton href="/plus" variant="secondary" size="sm">
              Habit gratis penuh — lihat Plus
            </LinkButton>
          ) : (
            HABIT_IDEAS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => createHabit(h)}
                className="text-label press rounded-full border-2 border-line bg-surface px-3 py-1.5"
              >
                + {h}
              </button>
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader icon={Lightbulb} title="Skill yang bisa dipelajari" />
        <div className="flex flex-wrap gap-2">
          {SKILL_IDEAS.map((s) => (
            <LinkButton
              key={s}
              href={`/projects/new?name=${encodeURIComponent("Belajar " + s)}&category=skill&days=30`}
              variant="secondary"
              size="sm"
            >
              {s}
            </LinkButton>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader icon={MessageCircleQuestion} title="Prompt journal" />
        <div className="space-y-2">
          {JOURNAL_PROMPTS.slice(0, 4).map((p) => (
            <div key={p} className="rounded-[var(--radius)] border-2 border-line-soft bg-surface px-4 py-3 text-sm italic text-ink-muted">
              &ldquo;{p}&rdquo;
            </div>
          ))}
        </div>
        <LinkButton href="/journal" variant="ghost" size="sm" className="mt-3">
          Tulis journal
        </LinkButton>
      </section>
    </div>
  );
}

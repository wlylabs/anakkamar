"use client";

import { Archive, Check, Flame, Plus, Sprout, X } from "lucide-react";
import { useState } from "react";

import { LimitBanner } from "@/components/plus/limit-banner";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/field";
import { HABIT_IDEAS } from "@/lib/mock-data";
import { FREE_HABIT_LIMIT } from "@/lib/premium";
import { usePremium } from "@/lib/premium-context";
import { useApp } from "@/lib/store";
import { addDays, cn, todayStr } from "@/lib/utils";

const WINDOW_DAYS = 14;

export default function HabitsPage() {
  const { state, hydrated, createHabit, toggleHabitDate, isHabitDoneOn, habitStreak, archiveHabit } =
    useApp();
  const { isPlus } = usePremium();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  if (!hydrated) return null;

  const activeHabits = state.habits.filter((h) => !h.archived);
  const atLimit = !isPlus && activeHabits.length >= FREE_HABIT_LIMIT;
  const today = todayStr();
  const days = Array.from({ length: WINDOW_DAYS }, (_, i) => addDays(today, -(WINDOW_DAYS - 1 - i)));

  const handleAdd = (habitName: string) => {
    if (!habitName.trim() || atLimit) return;
    createHabit(habitName.trim());
    setName("");
    setShowForm(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 pt-8 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-display flex items-center gap-2.5 text-3xl">
            <Sprout className="size-7 text-positive" aria-hidden />
            Habit
          </h1>
          <p className="mt-1 text-ink-muted">Kebiasaan kecil, diulang tiap hari.</p>
        </div>
        {atLimit ? (
          <LinkButton href="/plus" size="sm" variant="accent" className="shrink-0">
            <Plus className="size-4" aria-hidden />
            Habit baru
          </LinkButton>
        ) : (
          <Button size="sm" variant="accent" onClick={() => setShowForm((v) => !v)} className="shrink-0">
            {showForm ? <X className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            {showForm ? "Batal" : "Habit baru"}
          </Button>
        )}
      </div>

      {atLimit ? (
        <LimitBanner used={activeHabits.length} limit={FREE_HABIT_LIMIT} itemLabel="habit" />
      ) : null}

      {showForm && !atLimit ? (
        <Card className="mb-6 animate-fade">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd(name);
            }}
            className="flex gap-2"
          >
            <Input
              autoFocus
              placeholder="Misalnya: baca 10 menit"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Tambah
            </Button>
          </form>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {HABIT_IDEAS.slice(0, 6).map((idea) => (
              <button
                key={idea}
                type="button"
                onClick={() => handleAdd(idea)}
                className="text-label press rounded-full border-2 border-line-soft bg-canvas-alt px-2.5 py-1 text-ink-muted"
              >
                {idea}
              </button>
            ))}
          </div>
        </Card>
      ) : null}

      {activeHabits.length === 0 && !showForm ? (
        <EmptyState
          icon={<Sprout className="size-8" aria-hidden />}
          title="Belum ada habit"
          description="Mulai dari satu kebiasaan kecil aja. Nggak perlu langsung banyak."
          action={
            <Button variant="accent" onClick={() => setShowForm(true)}>
              <Plus className="size-4" aria-hidden />
              Bikin habit pertama
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {activeHabits.map((h) => {
            const streak = habitStreak(h.id);
            return (
              <Card key={h.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold tracking-tight">{h.name}</p>
                  <div className="flex items-center gap-2">
                    {streak > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full border-2 border-line bg-accent-soft px-2 py-0.5 text-xs font-bold">
                        <Flame className="size-3.5" aria-hidden />
                        {streak}
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => archiveHabit(h.id)}
                      className="press flex size-8 items-center justify-center rounded-[var(--radius)] border-2 border-line-soft text-ink-subtle"
                      aria-label={`Arsipkan ${h.name}`}
                    >
                      <Archive className="size-3.5" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-[repeat(14,minmax(0,1fr))]">
                  {days.map((date) => {
                    const done = isHabitDoneOn(h.id, date);
                    const isToday = date === today;
                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => toggleHabitDate(h.id, date)}
                        className={cn(
                          "press flex aspect-square items-center justify-center rounded-[4px] border-2",
                          done ? "border-line bg-positive text-accent-ink" : "border-line-soft bg-canvas-alt",
                          isToday && !done && "border-line",
                        )}
                        aria-pressed={done}
                        aria-label={date}
                      >
                        {done ? <Check className="size-3 animate-pop" aria-hidden /> : null}
                      </button>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

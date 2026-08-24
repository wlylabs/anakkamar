import { CHALLENGES } from "./mock-data";
import { computeStreak } from "./store";
import type { AppState } from "./types";
import { addDays, todayStr } from "./utils";

export function activityStreak(state: AppState) {
  return computeStreak(state.activeDates);
}

export function weeklyActivity(state: AppState) {
  const set = new Set(state.activeDates);
  const days: { date: string; active: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = addDays(todayStr(), -i);
    days.push({ date, active: set.has(date) });
  }
  return days;
}

export function monthlyActivity(state: AppState) {
  const set = new Set(state.activeDates);
  const days: { date: string; active: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = addDays(todayStr(), -i);
    days.push({ date, active: set.has(date) });
  }
  return days;
}

export function projectStats(state: AppState) {
  const total = state.projects.length;
  const selesai = state.projects.filter((p) => p.status === "selesai").length;
  const berjalan = state.projects.filter((p) => p.status === "berjalan").length;
  return { total, selesai, berjalan };
}

export function challengeStats(state: AppState) {
  const total = state.joinedChallenges.length;
  const selesai = state.joinedChallenges.filter((c) => c.status === "selesai").length;
  const berjalan = state.joinedChallenges.filter((c) => c.status === "berjalan").length;
  return { total, selesai, berjalan };
}

export function longestHabitStreak(state: AppState) {
  let best = 0;
  for (const h of state.habits) {
    const dates = state.habitLogs.filter((l) => l.habitId === h.id).map((l) => l.date);
    best = Math.max(best, computeStreak(dates));
  }
  return best;
}

export function challengeTitle(challengeId: string) {
  return CHALLENGES.find((c) => c.id === challengeId)?.title ?? "Challenge";
}

export function todayCompletion(state: AppState) {
  const activeHabits = state.habits.filter((h) => !h.archived);
  const today = todayStr();
  const doneToday = activeHabits.filter((h) =>
    state.habitLogs.some((l) => l.habitId === h.id && l.date === today),
  ).length;

  const activeChallenges = state.joinedChallenges.filter((c) => c.status === "berjalan");
  const challengesCheckedToday = activeChallenges.filter((c) => c.checkedDates.includes(today)).length;

  const totalItems = activeHabits.length + activeChallenges.length;
  const doneItems = doneToday + challengesCheckedToday;
  const pct = totalItems === 0 ? 0 : Math.round((doneItems / totalItems) * 100);

  return { totalItems, doneItems, pct, doneToday, activeHabitsCount: activeHabits.length };
}

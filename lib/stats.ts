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

/**
 * Plain numbers only — no habit/project/journal names or journal content —
 * so it's safe to send to a third-party AI provider under BYOK for the
 * weekly reflection. See app/api/insights/weekly/route.ts.
 */
export interface WeeklySnapshot {
  activeDaysThisWeek: number;
  currentStreak: number;
  longestHabitStreak: number;
  activeHabitsCount: number;
  habitChecksThisWeek: number;
  activeChallengesCount: number;
  challengeChecksThisWeek: number;
  activeProjectsCount: number;
  completedProjectsCount: number;
  journalEntriesThisWeek: number;
}

export function weeklySnapshot(state: AppState): WeeklySnapshot {
  const since = addDays(todayStr(), -6);
  const inThisWeek = (date: string) => date >= since && date <= todayStr();

  const activeHabits = state.habits.filter((h) => !h.archived);
  const activeHabitIds = new Set(activeHabits.map((h) => h.id));
  const habitChecksThisWeek = state.habitLogs.filter(
    (l) => inThisWeek(l.date) && activeHabitIds.has(l.habitId),
  ).length;

  const activeChallenges = state.joinedChallenges.filter((c) => c.status === "berjalan");
  const challengeChecksThisWeek = activeChallenges.reduce(
    (sum, c) => sum + c.checkedDates.filter(inThisWeek).length,
    0,
  );

  const journalEntriesThisWeek = state.journalEntries.filter((j) => inThisWeek(j.date)).length;

  return {
    activeDaysThisWeek: weeklyActivity(state).filter((d) => d.active).length,
    currentStreak: activityStreak(state),
    longestHabitStreak: longestHabitStreak(state),
    activeHabitsCount: activeHabits.length,
    habitChecksThisWeek,
    activeChallengesCount: activeChallenges.length,
    challengeChecksThisWeek,
    activeProjectsCount: state.projects.filter((p) => p.status === "berjalan").length,
    completedProjectsCount: state.projects.filter((p) => p.status === "selesai").length,
    journalEntriesThisWeek,
  };
}

/**
 * Latest mood per calendar day over the last N days (most recent entry wins
 * when someone journals more than once in a day). `null` for days with no
 * entry — plotted as a gap, not a zero.
 */
export function moodTrend(state: AppState, days = 14) {
  const byDate = new Map<string, number>();
  for (const entry of state.journalEntries) {
    if (!entry.mood) continue;
    if (!byDate.has(entry.date)) byDate.set(entry.date, entry.mood);
  }
  const out: { date: string; mood: number | null }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(todayStr(), -i);
    out.push({ date, mood: byDate.get(date) ?? null });
  }
  return out;
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

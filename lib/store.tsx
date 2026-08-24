"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { ACHIEVEMENTS, CHALLENGES } from "./mock-data";
import type {
  AppState,
  FocusArea,
  Habit,
  JoinedChallenge,
  JournalEntry,
  Milestone,
  Profile,
  Project,
  ProjectStatus,
} from "./types";
import { addDays, todayStr, uid } from "./utils";

const STORAGE_KEY = "anak-kamar:v1";

function emptyProfile(): Profile {
  return {
    name: "",
    username: "",
    bio: "",
    focusArea: "lainnya",
    smallChange: "",
    onboardedAt: null,
  };
}

function initialState(): AppState {
  return {
    version: 1,
    onboarded: false,
    profile: emptyProfile(),
    projects: [],
    joinedChallenges: [],
    habits: [],
    habitLogs: [],
    journalEntries: [],
    activeDates: [],
    unlockedAchievements: [],
  };
}

function loadState(): AppState {
  if (typeof window === "undefined") return initialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...initialState(), ...parsed, profile: { ...emptyProfile(), ...parsed.profile } };
  } catch {
    return initialState();
  }
}

function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  let streak = 0;
  let cursor = todayStr();
  if (!set.has(cursor)) {
    cursor = addDays(cursor, -1);
    if (!set.has(cursor)) return 0;
  }
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function computeAchievements(state: AppState): string[] {
  const unlocked = new Set(state.unlockedAchievements);

  if (state.projects.some((p) => p.status === "selesai")) unlocked.add("first-step");
  if (state.projects.filter((p) => p.status === "selesai").length >= 5) unlocked.add("room-to-grow");
  if (state.joinedChallenges.some((c) => c.status === "selesai")) unlocked.add("maker");

  const sorted = [...new Set(state.activeDates)].sort();
  let longestStreak = 0;
  let run = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || addDays(sorted[i - 1]!, 1) === sorted[i]) {
      run += 1;
    } else {
      run = 1;
    }
    longestStreak = Math.max(longestStreak, run);
  }
  if (longestStreak >= 7) unlocked.add("seven-days");

  if (sorted.length >= 2) {
    for (let i = 1; i < sorted.length; i++) {
      const gap = Math.round(
        (new Date(sorted[i]! + "T00:00:00").getTime() - new Date(sorted[i - 1]! + "T00:00:00").getTime()) /
          86_400_000,
      );
      if (gap >= 4) {
        unlocked.add("comeback");
        break;
      }
    }
  }

  return [...unlocked];
}

interface Ctx {
  state: AppState;
  hydrated: boolean;
  markActive: () => void;
  completeOnboarding: (input: { focusArea: FocusArea; smallChange: string; name: string }) => void;
  createProject: (input: {
    name: string;
    description: string;
    category: FocusArea;
    target: string;
    durationDays: number;
    milestoneTitles: string[];
  }) => string;
  updateProject: (id: string, patch: Partial<Project>) => void;
  setProjectStatus: (id: string, status: ProjectStatus) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  deleteProject: (id: string) => void;
  joinChallenge: (challengeId: string) => void;
  toggleChallengeDay: (joinedId: string, date?: string) => void;
  leaveChallenge: (joinedId: string) => void;
  createHabit: (name: string, note?: string) => void;
  toggleHabitDate: (habitId: string, date?: string) => void;
  archiveHabit: (id: string) => void;
  addJournalEntry: (prompt: string, content: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  isHabitDoneOn: (habitId: string, date: string) => boolean;
  habitStreak: (habitId: string) => number;
}

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const loadedOnce = useRef(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!loadedOnce.current) {
      loadedOnce.current = true;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const markActive = useCallback(() => {
    setState((s) => {
      const today = todayStr();
      if (s.activeDates.includes(today)) return s;
      const next = { ...s, activeDates: [...s.activeDates, today] };
      return { ...next, unlockedAchievements: computeAchievements(next) };
    });
  }, []);

  const withActiveAndAchievements = useCallback((updater: (s: AppState) => AppState) => {
    setState((s) => {
      const today = todayStr();
      const touched = updater(s);
      const withActive = touched.activeDates.includes(today)
        ? touched
        : { ...touched, activeDates: [...touched.activeDates, today] };
      return { ...withActive, unlockedAchievements: computeAchievements(withActive) };
    });
  }, []);

  const completeOnboarding: Ctx["completeOnboarding"] = useCallback(
    ({ focusArea, smallChange, name }) => {
      withActiveAndAchievements((s) => ({
        ...s,
        onboarded: true,
        profile: {
          ...s.profile,
          name: name.trim() || "Anak Kamar",
          username: s.profile.username || (name.trim() ? name.trim().toLowerCase().replace(/\s+/g, "") : "anakkamar"),
          focusArea,
          smallChange,
          onboardedAt: new Date().toISOString(),
        },
      }));
    },
    [withActiveAndAchievements],
  );

  const createProject: Ctx["createProject"] = useCallback(
    ({ name, description, category, target, durationDays, milestoneTitles }) => {
      const id = uid("proj");
      const start = todayStr();
      const project: Project = {
        id,
        name,
        description,
        category,
        target,
        durationDays,
        startDate: start,
        deadline: addDays(start, durationDays),
        progress: 0,
        milestones: milestoneTitles
          .filter((t) => t.trim())
          .map((t) => ({ id: uid("ms"), title: t.trim(), done: false }) satisfies Milestone),
        status: "belum-mulai",
        createdAt: new Date().toISOString(),
      };
      withActiveAndAchievements((s) => ({ ...s, projects: [project, ...s.projects] }));
      return id;
    },
    [withActiveAndAchievements],
  );

  const updateProject: Ctx["updateProject"] = useCallback(
    (id, patch) => {
      withActiveAndAchievements((s) => ({
        ...s,
        projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      }));
    },
    [withActiveAndAchievements],
  );

  const setProjectStatus: Ctx["setProjectStatus"] = useCallback(
    (id, status) => {
      withActiveAndAchievements((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p.id === id ? { ...p, status, progress: status === "selesai" ? 100 : p.progress } : p,
        ),
      }));
    },
    [withActiveAndAchievements],
  );

  const toggleMilestone: Ctx["toggleMilestone"] = useCallback(
    (projectId, milestoneId) => {
      withActiveAndAchievements((s) => ({
        ...s,
        projects: s.projects.map((p) => {
          if (p.id !== projectId) return p;
          const milestones = p.milestones.map((m) =>
            m.id === milestoneId ? { ...m, done: !m.done } : m,
          );
          const doneCount = milestones.filter((m) => m.done).length;
          const progress = milestones.length
            ? Math.round((doneCount / milestones.length) * 100)
            : p.progress;
          const status: ProjectStatus =
            progress === 100 ? "selesai" : progress > 0 ? "berjalan" : p.status;
          return { ...p, milestones, progress, status };
        }),
      }));
    },
    [withActiveAndAchievements],
  );

  const deleteProject: Ctx["deleteProject"] = useCallback((id) => {
    setState((s) => ({ ...s, projects: s.projects.filter((p) => p.id !== id) }));
  }, []);

  const joinChallenge: Ctx["joinChallenge"] = useCallback(
    (challengeId) => {
      withActiveAndAchievements((s) => {
        if (s.joinedChallenges.some((c) => c.challengeId === challengeId && c.status === "berjalan")) {
          return s;
        }
        const joined: JoinedChallenge = {
          id: uid("chal"),
          challengeId,
          joinedAt: new Date().toISOString(),
          startDate: todayStr(),
          checkedDates: [],
          status: "berjalan",
        };
        return { ...s, joinedChallenges: [joined, ...s.joinedChallenges] };
      });
    },
    [withActiveAndAchievements],
  );

  const toggleChallengeDay: Ctx["toggleChallengeDay"] = useCallback(
    (joinedId, date) => {
      const d = date ?? todayStr();
      withActiveAndAchievements((s) => ({
        ...s,
        joinedChallenges: s.joinedChallenges.map((c) => {
          if (c.id !== joinedId) return c;
          const has = c.checkedDates.includes(d);
          const checkedDates = has ? c.checkedDates.filter((x) => x !== d) : [...c.checkedDates, d];
          const durationDays = CHALLENGES.find((t) => t.id === c.challengeId)?.durationDays ?? Infinity;
          const status = checkedDates.length >= durationDays ? "selesai" : c.status;
          return { ...c, checkedDates, status };
        }),
      }));
    },
    [withActiveAndAchievements],
  );

  const leaveChallenge: Ctx["leaveChallenge"] = useCallback((joinedId) => {
    setState((s) => ({
      ...s,
      joinedChallenges: s.joinedChallenges.map((c) =>
        c.id === joinedId ? { ...c, status: "berhenti" } : c,
      ),
    }));
  }, []);

  const createHabit: Ctx["createHabit"] = useCallback(
    (name, note) => {
      withActiveAndAchievements((s) => ({
        ...s,
        habits: [
          { id: uid("habit"), name, note, createdAt: new Date().toISOString(), archived: false },
          ...s.habits,
        ],
      }));
    },
    [withActiveAndAchievements],
  );

  const toggleHabitDate: Ctx["toggleHabitDate"] = useCallback(
    (habitId, date) => {
      const d = date ?? todayStr();
      withActiveAndAchievements((s) => {
        const exists = s.habitLogs.some((l) => l.habitId === habitId && l.date === d);
        const habitLogs = exists
          ? s.habitLogs.filter((l) => !(l.habitId === habitId && l.date === d))
          : [...s.habitLogs, { habitId, date: d }];
        return { ...s, habitLogs };
      });
    },
    [withActiveAndAchievements],
  );

  const archiveHabit: Ctx["archiveHabit"] = useCallback((id) => {
    setState((s) => ({
      ...s,
      habits: s.habits.map((h) => (h.id === id ? { ...h, archived: true } : h)),
    }));
  }, []);

  const addJournalEntry: Ctx["addJournalEntry"] = useCallback(
    (prompt, content) => {
      withActiveAndAchievements((s) => ({
        ...s,
        journalEntries: [
          { id: uid("journal"), prompt, content, date: todayStr(), createdAt: new Date().toISOString() },
          ...s.journalEntries,
        ],
      }));
    },
    [withActiveAndAchievements],
  );

  const updateProfile: Ctx["updateProfile"] = useCallback((patch) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const isHabitDoneOn = useCallback(
    (habitId: string, date: string) =>
      state.habitLogs.some((l) => l.habitId === habitId && l.date === date),
    [state.habitLogs],
  );

  const habitStreak = useCallback(
    (habitId: string) => computeStreak(state.habitLogs.filter((l) => l.habitId === habitId).map((l) => l.date)),
    [state.habitLogs],
  );

  const value = useMemo<Ctx>(
    () => ({
      state,
      hydrated,
      markActive,
      completeOnboarding,
      createProject,
      updateProject,
      setProjectStatus,
      toggleMilestone,
      deleteProject,
      joinChallenge,
      toggleChallengeDay,
      leaveChallenge,
      createHabit,
      toggleHabitDate,
      archiveHabit,
      addJournalEntry,
      updateProfile,
      isHabitDoneOn,
      habitStreak,
    }),
    [
      state,
      hydrated,
      markActive,
      completeOnboarding,
      createProject,
      updateProject,
      setProjectStatus,
      toggleMilestone,
      deleteProject,
      joinChallenge,
      toggleChallengeDay,
      leaveChallenge,
      createHabit,
      toggleHabitDate,
      archiveHabit,
      addJournalEntry,
      updateProfile,
      isHabitDoneOn,
      habitStreak,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useApp() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useApp must be used within StoreProvider");
  return ctx;
}

export { ACHIEVEMENTS };
export { computeStreak };

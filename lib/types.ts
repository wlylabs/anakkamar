export type FocusArea =
  | "skill"
  | "kesehatan"
  | "keuangan"
  | "mental"
  | "produktivitas"
  | "kreativitas"
  | "relasi"
  | "lainnya";

export const FOCUS_AREAS: { id: FocusArea; label: string }[] = [
  { id: "skill", label: "Skill" },
  { id: "kesehatan", label: "Kesehatan" },
  { id: "keuangan", label: "Keuangan" },
  { id: "mental", label: "Mental" },
  { id: "produktivitas", label: "Produktivitas" },
  { id: "kreativitas", label: "Kreativitas" },
  { id: "relasi", label: "Relasi" },
  { id: "lainnya", label: "Lainnya" },
];

export type ProjectStatus = "belum-mulai" | "berjalan" | "selesai" | "berhenti-sementara";

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  "belum-mulai": "Belum mulai",
  berjalan: "Berjalan",
  selesai: "Selesai",
  "berhenti-sementara": "Berhenti sementara",
};

export interface Milestone {
  id: string;
  title: string;
  done: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: FocusArea;
  target: string;
  durationDays: number;
  startDate: string;
  deadline: string;
  progress: number;
  milestones: Milestone[];
  status: ProjectStatus;
  createdAt: string;
}

export interface ChallengeDay {
  /** 1-indexed, matches position in the day grid. */
  day: number;
  title: string;
  /** The actual material for the day — grounded in a named, real framework/source, not filler. */
  lesson: string;
  /** Today's concrete micro-practice, small enough to finish in one sitting. */
  action: string;
}

export interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  category: FocusArea;
  tagline: string;
  /** One-line note on what framework/research this challenge's curriculum draws from. */
  basis: string;
  /** Shown once, up front, for challenges touching mental health/wellbeing. */
  disclaimer?: string;
  /** Length must equal durationDays. */
  days: ChallengeDay[];
}

export interface JoinedChallenge {
  id: string;
  challengeId: string;
  joinedAt: string;
  startDate: string;
  checkedDates: string[];
  status: "berjalan" | "selesai" | "berhenti";
}

export interface Habit {
  id: string;
  name: string;
  note?: string;
  createdAt: string;
  archived: boolean;
}

export interface HabitLog {
  habitId: string;
  date: string;
}

/**
 * 1-5 self-report affect scale. Simplified from PANAS (Watson, Clark &
 * Tellegen, 1988) down to a single valence dimension — precise enough for a
 * daily check-in, light enough not to feel like a clinical instrument.
 */
export type MoodValue = 1 | 2 | 3 | 4 | 5;

export const MOOD_OPTIONS: { value: MoodValue; emoji: string; label: string }[] = [
  { value: 1, emoji: "😞", label: "Berat" },
  { value: 2, emoji: "😕", label: "Kurang enak" },
  { value: 3, emoji: "😐", label: "Biasa aja" },
  { value: 4, emoji: "🙂", label: "Enak" },
  { value: 5, emoji: "😄", label: "Semangat" },
];

export interface JournalEntry {
  id: string;
  prompt: string;
  content: string;
  /** Optional — affect labeling (Lieberman et al., 2007) shows naming a feeling in words can itself lower its intensity. */
  mood?: MoodValue;
  date: string;
  createdAt: string;
}

export interface Profile {
  name: string;
  username: string;
  bio: string;
  focusArea: FocusArea;
  smallChange: string;
  onboardedAt: string | null;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
}

export interface AppState {
  version: 1;
  onboarded: boolean;
  profile: Profile;
  projects: Project[];
  joinedChallenges: JoinedChallenge[];
  habits: Habit[];
  habitLogs: HabitLog[];
  journalEntries: JournalEntry[];
  activeDates: string[];
  unlockedAchievements: string[];
}

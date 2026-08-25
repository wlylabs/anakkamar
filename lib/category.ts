import { Brain, HeartPulse, Palette, Sparkles, Users, Wallet, Wrench, Zap, type LucideIcon } from "lucide-react";

import type { FocusArea } from "./types";

export const CATEGORY_COLOR: Record<FocusArea, string> = {
  skill: "var(--info)",
  kesehatan: "var(--positive)",
  keuangan: "var(--caution)",
  mental: "var(--mental)",
  produktivitas: "var(--accent)",
  kreativitas: "var(--kreativitas)",
  relasi: "var(--relasi)",
  lainnya: "var(--ink-subtle)",
};

export const CATEGORY_SOFT: Record<FocusArea, string> = {
  skill: "var(--info-soft)",
  kesehatan: "var(--positive-soft)",
  keuangan: "var(--caution-soft)",
  mental: "var(--mental-soft)",
  produktivitas: "var(--accent-soft)",
  kreativitas: "var(--kreativitas-soft)",
  relasi: "var(--relasi-soft)",
  lainnya: "var(--canvas-alt)",
};

export const CATEGORY_ICON: Record<FocusArea, LucideIcon> = {
  skill: Wrench,
  kesehatan: HeartPulse,
  keuangan: Wallet,
  mental: Brain,
  produktivitas: Zap,
  kreativitas: Palette,
  relasi: Users,
  lainnya: Sparkles,
};

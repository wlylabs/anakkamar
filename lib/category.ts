import type { FocusArea } from "./types";

export const CATEGORY_COLOR: Record<FocusArea, string> = {
  skill: "var(--info)",
  kesehatan: "var(--positive)",
  keuangan: "var(--caution)",
  mental: "#8a5cd0",
  produktivitas: "var(--accent)",
  kreativitas: "#c2469a",
  relasi: "#2f9e9e",
  lainnya: "var(--ink-subtle)",
};

export const CATEGORY_SOFT: Record<FocusArea, string> = {
  skill: "var(--info-soft)",
  kesehatan: "var(--positive-soft)",
  keuangan: "var(--caution-soft)",
  mental: "#eee6fb",
  produktivitas: "var(--accent-soft)",
  kreativitas: "#fbe3f2",
  relasi: "#e0f4f4",
  lainnya: "var(--canvas-alt)",
};

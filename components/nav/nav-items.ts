import { BookHeart, Compass, Flame, Home, ListChecks, Sprout, UserRound } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/projects", label: "Projek", icon: ListChecks },
  { href: "/challenges", label: "Challenge", icon: Flame },
  { href: "/habits", label: "Habit", icon: Sprout },
  { href: "/journal", label: "Jurnal", icon: BookHeart },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/profile", label: "Profil", icon: UserRound },
] as const;

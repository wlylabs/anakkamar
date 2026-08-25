import { BookHeart, Home, ListChecks, MessageCircle, Sprout, UserRound } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/projects", label: "Projek", icon: ListChecks },
  { href: "/habits", label: "Habit", icon: Sprout },
  { href: "/journal", label: "Jurnal", icon: BookHeart },
  { href: "/chat", label: "Ngobrol", icon: MessageCircle },
  { href: "/profile", label: "Profil", icon: UserRound },
] as const;

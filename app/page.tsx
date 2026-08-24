import { ArrowRight, BookHeart, Flame, ListChecks, Sprout } from "lucide-react";

import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const PILLARS = [
  {
    icon: ListChecks,
    title: "Project",
    desc: "Bikin goal pribadi lo — belajar skill, olahraga lagi, atau bikin karya. Dipecah jadi langkah kecil.",
  },
  {
    icon: Flame,
    title: "Challenge",
    desc: "Ikutan tantangan singkat kayak 7 hari beresin kamar atau 14 hari no doomscrolling.",
  },
  {
    icon: Sprout,
    title: "Habit",
    desc: "Bangun kebiasaan kecil tiap hari. Streak-nya kelihatan, tanpa harus sempurna.",
  },
  {
    icon: BookHeart,
    title: "Journal",
    desc: "Ruang privat buat mikir ulang hari lo — apa yang jalan, apa yang belum.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5 font-bold tracking-tight">
          <Logo className="size-7" />
          <span>Anak Kamar</span>
        </div>
        <LinkButton href="/onboarding" variant="secondary" size="sm" className="hidden sm:inline-flex">
          Masuk
        </LinkButton>
      </header>

      <section className="relative overflow-hidden px-6 pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="text-label mb-6 inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-surface px-3 py-1.5">
            Buat anak muda Indonesia yang pengen mulai
          </span>
          <h1 className="text-display animate-in-up text-[2.75rem] sm:text-6xl md:text-7xl">
            Mulainya dari{" "}
            <span className="relative inline-block text-accent">
              kamar.
              <svg
                className="absolute -bottom-1 left-0 w-full text-accent"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 9C40 3 160 3 198 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="animate-in-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Ruang kecil untuk mulai melakukan sesuatu yang lebih besar.
          </p>
          <div className="animate-in-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/onboarding" variant="accent" size="lg" className="w-full sm:w-auto">
              Mulai Project Gue
              <ArrowRight className="size-4" aria-hidden />
            </LinkButton>
          </div>
          <p className="animate-in-up mt-4 text-sm text-ink-subtle">
            Belum selesai, bukan berarti gagal. Coba lagi besok.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Kenapa &ldquo;anak kamar&rdquo;?</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
          Karena banyak hal besar mulainya dari ruang kecil — kamar lo sendiri. Nggak perlu langsung
          jadi orang paling produktif sedunia. Project Anak Kamar bantu lo gerak dikit-dikit: bikin
          goal yang masuk akal, jalanin langkah kecil, dan liat progress itu beneran ada — biarpun
          nggak tiap hari mulus.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="paper p-5" style={{ "--stagger-index": i } as React.CSSProperties}>
              <div className="mb-4 grid size-11 place-items-center rounded-[var(--radius)] border-2 border-line bg-accent-soft text-ink">
                <p.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-bold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="paper mx-auto max-w-3xl p-8 text-center md:p-12">
          <h2 className="text-display text-3xl md:text-4xl">Hari ini nggak harus produktif banget.</h2>
          <p className="mt-3 text-lg text-ink-muted">Cukup maju sedikit.</p>
          <LinkButton href="/onboarding" variant="primary" size="lg" className="mt-7">
            Mulai Project Gue
          </LinkButton>
        </div>
      </section>

      <footer className="border-t-2 border-line px-6 py-8 text-center text-sm text-ink-subtle">
        Project Anak Kamar — Lo udah sejauh ini.
      </footer>
    </div>
  );
}

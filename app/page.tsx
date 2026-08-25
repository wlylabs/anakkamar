import { ArrowRight, Flame, ListChecks, NotebookPen, Sparkles, Sprout } from "lucide-react";

import { Reveal } from "@/components/reveal";
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
    icon: NotebookPen,
    title: "Journal",
    desc: "Ruang privat buat mikir ulang hari lo — apa yang jalan, apa yang belum.",
  },
];

const TICKER = [
  "Belum selesai, bukan berarti gagal.",
  "Coba lagi besok.",
  "Lo udah sejauh ini.",
  "Progress kecil tetap berarti.",
  "Mulai dikit, lanjut dikit.",
  "Nggak harus sempurna.",
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

        <div
          className="animate-float pointer-events-none absolute left-[8%] top-[18%] hidden rotate-[-8deg] rounded-[var(--radius)] border-2 border-line bg-positive-soft p-2.5 shadow-pop-sm sm:block"
          style={{ "--float-rotate": "-8deg" } as React.CSSProperties}
          aria-hidden
        >
          <Flame className="size-5 text-positive" />
        </div>
        <div
          className="animate-float-delayed pointer-events-none absolute right-[10%] top-[28%] hidden rotate-[6deg] rounded-[var(--radius)] border-2 border-line bg-info-soft p-2.5 shadow-pop-sm sm:block"
          style={{ "--float-rotate": "6deg" } as React.CSSProperties}
          aria-hidden
        >
          <Sprout className="size-5 text-info" />
        </div>
        <div
          className="animate-float pointer-events-none absolute bottom-[8%] left-[14%] hidden rotate-[10deg] rounded-[var(--radius)] border-2 border-line bg-accent-soft p-2.5 shadow-pop-sm md:block"
          style={{ "--float-rotate": "10deg", animationDelay: "0.6s" } as React.CSSProperties}
          aria-hidden
        >
          <Sparkles className="size-5 text-accent" />
        </div>

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
            <LinkButton href="/onboarding" variant="accent" size="lg" className="group w-full sm:w-auto">
              Mulai Project Gue
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </LinkButton>
          </div>
          <p className="animate-in-up mt-4 text-sm text-ink-subtle">
            Belum selesai, bukan berarti gagal. Coba lagi besok.
          </p>
        </div>
      </section>

      <div className="overflow-hidden border-y-2 border-line bg-ink py-3">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="text-label flex items-center gap-8 text-canvas">
              {t}
              <span className="text-accent" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <Reveal>
        <section className="mx-auto max-w-3xl px-6 pb-16 pt-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Kenapa &ldquo;anak kamar&rdquo;?</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Karena banyak hal besar mulainya dari ruang kecil — kamar lo sendiri. Nggak perlu langsung
            jadi orang paling produktif sedunia. Project Anak Kamar bantu lo gerak dikit-dikit: bikin
            goal yang masuk akal, jalanin langkah kecil, dan liat progress itu beneran ada — biarpun
            nggak tiap hari mulus.
          </p>
        </section>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="paper hover-lift h-full p-5">
                <div className="mb-4 grid size-11 place-items-center rounded-[var(--radius)] border-2 border-line bg-accent-soft text-ink">
                  <p.icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-bold tracking-tight">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="px-6 pb-24">
          <div className="paper mx-auto max-w-3xl p-8 text-center md:p-12">
            <h2 className="text-display text-3xl md:text-4xl">Hari ini nggak harus produktif banget.</h2>
            <p className="mt-3 text-lg text-ink-muted">Cukup maju sedikit.</p>
            <LinkButton href="/onboarding" variant="primary" size="lg" className="group mt-7">
              Mulai Project Gue
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </LinkButton>
          </div>
        </section>
      </Reveal>

      <footer className="border-t-2 border-line px-6 py-8 text-center text-sm text-ink-subtle">
        Project Anak Kamar — Lo udah sejauh ini.
      </footer>
    </div>
  );
}

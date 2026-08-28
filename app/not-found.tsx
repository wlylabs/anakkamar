import { Compass } from "lucide-react";

import { LinkButton } from "@/components/ui/button";

export const metadata = { title: "Halaman nggak ketemu" };

/**
 * Without this, a bad URL falls through to Next's default 404 — plain
 * Times/Helvetica on white, no canvas, no ink borders — which reads like a
 * different site entirely. Same shape as app/offline/page.tsx so the two
 * "something's off" screens feel like siblings.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="grid size-16 place-items-center rounded-full border-2 border-line bg-surface shadow-pop-sm">
        <Compass className="size-7 text-accent" aria-hidden />
      </div>
      <p className="text-label text-ink-subtle">404</p>
      <h1 className="text-display text-3xl">Halaman ini nggak ada</h1>
      <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
        Mungkin link-nya salah ketik, atau halamannya udah pindah. Progress lo aman kok.
      </p>
      <LinkButton href="/home" variant="accent" className="mt-2">
        Balik ke home
      </LinkButton>
    </div>
  );
}

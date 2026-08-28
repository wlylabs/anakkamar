import { cn } from "@/lib/utils";

/** One blocked-out bar. Filled with line-soft rather than canvas-alt: the
 *  latter is close enough to the canvas that bars outside a card all but
 *  vanish. No border — this stands in for text, not for a card. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-skeleton rounded-[var(--radius)] bg-line-soft", className)} />;
}

const GRID: Record<"single" | "two" | "three", string> = {
  single: "grid gap-4",
  two: "grid gap-4 sm:grid-cols-2",
  three: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * Stand-in shown while the localStorage-backed store hydrates.
 *
 * Every page used to `return null` until `hydrated`, so a cold load or a hard
 * refresh painted an empty canvas and then snapped the entire page in at once.
 * Blocking out the shapes the real page is about to use — label, heading,
 * subtitle, then a few cards — keeps the frame still through that swap.
 *
 * Cards here are drawn with a soft border and no shadow on purpose: the hard
 * offset shadow is what makes real content look stuck to the page, and a
 * placeholder shouldn't claim that yet.
 */
export function PageSkeleton({
  className,
  cards = 3,
  grid = "single",
}: {
  /** Container overrides — match the real page's max-width. */
  className?: string;
  cards?: number;
  grid?: "single" | "two" | "three";
}) {
  return (
    <div role="status" aria-label="Memuat" className={cn("mx-auto px-5 pt-8 md:px-8", className)}>
      <div className="mb-8">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="mt-3 h-9 w-2/3 max-w-sm" />
        <Skeleton className="mt-2.5 h-4 w-40 rounded-full" />
      </div>
      <div className={GRID[grid]}>
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="rounded-[var(--radius)] border-2 border-line-soft bg-surface p-5">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="mt-4 h-5 w-3/4" />
            <Skeleton className="mt-3 h-3 w-full rounded-full" />
            <Skeleton className="mt-2 h-3 w-1/2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

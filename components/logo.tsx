/**
 * A sprout in a room — matches "ruang kecil untuk mulai berkembang" and
 * reuses the same leaf/bud grammar as HabitsIllustration/JournalIllustration
 * in components/illustrations.tsx. Colors are fixed CSS vars (not
 * currentColor) so the mark reads the same regardless of surrounding text
 * color, while still following the light/dark palette automatically.
 *
 * Kept to rounded rects + a circle so scripts/generate-icons.mjs can
 * rasterize it via signed distance fields — see the note there.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="6" fill="var(--ink)" />
      <rect x="15" y="17" width="2" height="8" rx="1" fill="var(--canvas)" />
      <g transform="translate(12.5 16) rotate(-35)">
        <rect x="-5" y="-3" width="10" height="6" rx="3" fill="var(--positive)" />
      </g>
      <g transform="translate(19.5 16) rotate(35)">
        <rect x="-5" y="-3" width="10" height="6" rx="3" fill="var(--accent)" />
      </g>
      <circle cx="16" cy="9.5" r="3" fill="var(--caution)" />
    </svg>
  );
}

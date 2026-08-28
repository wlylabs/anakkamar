/**
 * The "S" stamp mark: a blocky Sejengkal monogram cut out of an ink square,
 * with an accent card peeking out behind it using the same offset-card
 * technique (see --shadow-pop in app/globals.css) that's already the app's
 * signature move on every paper/card element.
 *
 * The 32-unit geometry below is the source of truth for the whole icon set —
 * app/icon.svg, public/icon.svg, the scaled public/icon-maskable.svg, and
 * GLYPH_SHAPES in scripts/generate-icons.mjs all mirror these rects. Change
 * one, change them all, then re-run `npm run icons`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="6" y="6" width="24" height="24" rx="5" fill="var(--accent)" />
      <rect x="2" y="2" width="24" height="24" rx="5" fill="var(--ink)" />
      <rect x="7" y="6.5" width="15" height="3.2" rx="1" fill="var(--canvas)" />
      <rect x="7" y="6.5" width="3.2" height="9.6" rx="1" fill="var(--canvas)" />
      <rect x="7" y="12.9" width="15" height="3.2" rx="1" fill="var(--canvas)" />
      <rect x="18.8" y="12.9" width="3.2" height="9.6" rx="1" fill="var(--canvas)" />
      <rect x="7" y="19.3" width="15" height="3.2" rx="1" fill="var(--canvas)" />
    </svg>
  );
}

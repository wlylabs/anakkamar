/**
 * The original "AK" monogram, kept intact for brand recognition, with an
 * accent card peeking out behind it using the same offset-card technique
 * (see --shadow-pop in app/globals.css) that's already the app's signature
 * move on every paper/card element.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="6" y="6" width="24" height="24" rx="5" fill="var(--accent)" />
      <rect x="2" y="2" width="24" height="24" rx="5" fill="var(--ink)" />
      <rect x="8" y="8" width="6" height="14" rx="1" fill="var(--canvas)" />
      <rect x="17" y="8" width="5" height="5" rx="1" fill="var(--canvas)" />
      <rect x="17" y="16" width="5" height="6" rx="1" fill="var(--canvas)" />
    </svg>
  );
}

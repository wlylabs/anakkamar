export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="4" fill="currentColor" />
      <rect x="9" y="9" width="6" height="14" rx="1" fill="var(--canvas)" />
      <rect x="18" y="9" width="5" height="5" rx="1" fill="var(--canvas)" />
      <rect x="18" y="17" width="5" height="6" rx="1" fill="var(--canvas)" />
    </svg>
  );
}

/**
 * Hand-drawn to match the Logo mark's own grammar — rounded-rect blocks,
 * thick ink strokes, warm flat fills — rather than pulling in an external
 * illustration set. unDraw/Humaaans-style flat-corporate art doesn't sit
 * well next to hard offset shadows and no gradients.
 */

function Sticker({
  x,
  y,
  rotate,
  fill,
  children,
}: {
  x: number;
  y: number;
  rotate: number;
  fill: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x={-14} y={-14} width={28} height={28} rx={6} fill={fill} stroke="var(--ink)" strokeWidth={2.5} />
      {children}
    </g>
  );
}

export function ProjectsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden>
      <g transform="translate(48 10) rotate(-3)">
        <rect x={0} y={8} width={64} height={82} rx={8} fill="var(--surface)" stroke="var(--ink)" strokeWidth={3} />
        <rect x={20} y={0} width={24} height={14} rx={4} fill="var(--accent)" stroke="var(--ink)" strokeWidth={2.5} />
        <rect x={12} y={30} width={11} height={11} rx={2.5} fill="var(--positive)" stroke="var(--ink)" strokeWidth={2.5} />
        <path d="M14.5 35.5l2 2.5 4-5" stroke="var(--canvas)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={30} y1={35} x2={52} y2={35} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        <rect x={12} y={50} width={11} height={11} rx={2.5} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
        <line x1={30} y1={55} x2={52} y2={55} stroke="var(--line-soft)" strokeWidth={3} strokeLinecap="round" />
        <rect x={12} y={70} width={11} height={11} rx={2.5} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
        <line x1={30} y1={75} x2={46} y2={75} stroke="var(--line-soft)" strokeWidth={3} strokeLinecap="round" />
      </g>
      <Sticker x={130} y={30} rotate={12} fill="var(--info-soft)">
        <line x1={-6} y1={0} x2={6} y2={0} stroke="var(--info)" strokeWidth={3} strokeLinecap="round" />
        <line x1={0} y1={-6} x2={0} y2={6} stroke="var(--info)" strokeWidth={3} strokeLinecap="round" />
      </Sticker>
      <circle cx={26} cy={95} r={4} fill="var(--accent-soft)" stroke="var(--ink)" strokeWidth={2} />
    </svg>
  );
}

export function HabitsIllustration({ className }: { className?: string }) {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7];
  const filled = new Set([0, 1, 2, 5]);
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden>
      <g transform="translate(28 24) rotate(-2)">
        {cells.map((i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const isFilled = filled.has(i);
          return (
            <rect
              key={i}
              x={col * 26}
              y={row * 26}
              width={20}
              height={20}
              rx={5}
              fill={isFilled ? "var(--positive)" : "var(--surface)"}
              stroke="var(--ink)"
              strokeWidth={2.5}
            />
          );
        })}
      </g>
      <g transform="translate(46 32)">
        <path
          d="M0 26C0 14 8 8 8 0C8 8 16 14 16 26"
          fill="var(--accent)"
          stroke="var(--ink)"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <line x1={8} y1={26} x2={8} y2={34} stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <Sticker x={132} y={26} rotate={-10} fill="var(--accent-soft)">
        <path d="M-5 1l3 3 6-6" stroke="var(--accent)" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Sticker>
      <circle cx={22} cy={96} r={4} fill="var(--info-soft)" stroke="var(--ink)" strokeWidth={2} />
    </svg>
  );
}

export function JournalIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden>
      <g transform="translate(38 14) rotate(-4)">
        <rect x={0} y={0} width={72} height={92} rx={8} fill="var(--surface)" stroke="var(--ink)" strokeWidth={3} />
        <line x1={0} y1={16} x2={72} y2={16} stroke="var(--ink)" strokeWidth={2.5} />
        <circle cx={12} cy={8} r={2.5} fill="var(--canvas)" stroke="var(--ink)" strokeWidth={2} />
        <circle cx={24} cy={8} r={2.5} fill="var(--canvas)" stroke="var(--ink)" strokeWidth={2} />
        <circle cx={36} cy={8} r={2.5} fill="var(--canvas)" stroke="var(--ink)" strokeWidth={2} />
        <line x1={12} y1={32} x2={60} y2={32} stroke="var(--line-soft)" strokeWidth={3} strokeLinecap="round" />
        <line x1={12} y1={44} x2={52} y2={44} stroke="var(--line-soft)" strokeWidth={3} strokeLinecap="round" />
        <line x1={12} y1={56} x2={56} y2={56} stroke="var(--line-soft)" strokeWidth={3} strokeLinecap="round" />
      </g>
      <g transform="translate(112 66) rotate(35)">
        <rect x={-4} y={-22} width={8} height={30} rx={2} fill="var(--accent)" stroke="var(--ink)" strokeWidth={2.5} />
        <path d="M-4 8L0 20L4 8Z" fill="var(--ink)" />
      </g>
      <Sticker x={30} y={98} rotate={-8} fill="var(--positive-soft)">
        <path
          d="M0-6L1.5-1.5 6 0 1.5 1.5 0 6 -1.5 1.5 -6 0 -1.5-1.5Z"
          fill="var(--positive)"
        />
      </Sticker>
      <circle cx={132} cy={94} r={4} fill="var(--info-soft)" stroke="var(--ink)" strokeWidth={2} />
    </svg>
  );
}

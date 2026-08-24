import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  color = "var(--accent)",
  size = "md",
}: {
  value: number;
  className?: string;
  color?: string;
  size?: "sm" | "md";
}) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-full border-2 border-line bg-canvas-alt",
        size === "sm" ? "h-2.5" : "h-4",
        className,
      )}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

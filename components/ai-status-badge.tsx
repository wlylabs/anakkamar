import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Small "is AI actually connected" indicator, shared by every AI-powered
 * surface (chat, journal, weekly reflection, profile settings). Exists
 * because "active" used to be invisible — the only feedback was the feature
 * silently working or silently showing an empty state — which made a
 * working server-default key indistinguishable from a broken one.
 */
export function AiStatusBadge({
  active,
  source,
  checking,
  className,
}: {
  active: boolean;
  source: "personal" | "server" | null;
  checking: boolean;
  className?: string;
}) {
  if (checking) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold text-ink-subtle", className)}>
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
        Ngecek koneksi AI...
      </span>
    );
  }

  if (!active) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold text-ink-subtle", className)}>
        <span className="size-2 rounded-full bg-ink-subtle/40" aria-hidden />
        AI belum terhubung
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold text-positive", className)}>
      <span className="size-2 rounded-full bg-positive" aria-hidden />
      {source === "personal" ? "AI terhubung — pakai key kamu" : "AI terhubung — key default app"}
    </span>
  );
}

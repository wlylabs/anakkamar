import { Sparkles } from "lucide-react";

import { LinkButton } from "@/components/ui/button";

export function LimitBanner({ used, limit, itemLabel }: { used: number; limit: number; itemLabel: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border-2 border-line bg-accent-soft px-4 py-3">
      <p className="flex items-center gap-2 text-sm font-medium">
        <Sparkles className="size-4 shrink-0" aria-hidden />
        {used}/{limit} {itemLabel} gratis kepake. Upgrade buat unlimited.
      </p>
      <LinkButton href="/plus" size="sm" variant="primary" className="shrink-0">
        Lihat Plus
      </LinkButton>
    </div>
  );
}

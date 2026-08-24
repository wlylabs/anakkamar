import type { HTMLAttributes } from "react";

import { CATEGORY_COLOR, CATEGORY_SOFT } from "@/lib/category";
import { FOCUS_AREAS, type FocusArea } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center rounded-full border-2 border-line px-2.5 py-1",
        className,
      )}
      {...props}
    />
  );
}

export function CategoryBadge({ category, className }: { category: FocusArea; className?: string }) {
  const label = FOCUS_AREAS.find((f) => f.id === category)?.label ?? category;
  return (
    <span
      className={cn(
        "text-label inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1",
        className,
      )}
      style={{
        borderColor: CATEGORY_COLOR[category],
        backgroundColor: CATEGORY_SOFT[category],
        color: CATEGORY_COLOR[category],
      }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR[category] }} />
      {label}
    </span>
  );
}

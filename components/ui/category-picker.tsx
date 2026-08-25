"use client";

import type { CSSProperties } from "react";

import { CATEGORY_COLOR, CATEGORY_SOFT } from "@/lib/category";
import { FOCUS_AREAS, type FocusArea } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryPicker({
  value,
  onChange,
  className,
}: {
  value: FocusArea | null;
  onChange: (area: FocusArea) => void;
  className?: string;
}) {
  return (
    <div className={cn("stagger grid grid-cols-2 gap-3", className)} role="radiogroup">
      {FOCUS_AREAS.map((area, i) => {
        const active = value === area.id;
        return (
          <button
            key={area.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(area.id)}
            style={
              {
                "--stagger-index": i,
                borderColor: active ? CATEGORY_COLOR[area.id] : undefined,
                backgroundColor: active ? CATEGORY_SOFT[area.id] : undefined,
              } as CSSProperties
            }
            className={cn(
              "press rounded-[var(--radius)] border-2 border-line bg-surface px-4 py-4 text-left text-sm font-semibold tracking-tight",
              active && "shadow-pop-sm",
            )}
          >
            {area.label}
          </button>
        );
      })}
    </div>
  );
}

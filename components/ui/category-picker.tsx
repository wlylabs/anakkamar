"use client";

import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import { CATEGORY_COLOR, CATEGORY_ICON, CATEGORY_SOFT } from "@/lib/category";
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
        const Icon = CATEGORY_ICON[area.id];
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
              "press flex items-center gap-2.5 rounded-[var(--radius)] border-2 border-line bg-surface px-3.5 py-3.5 text-left font-semibold tracking-tight",
              active && "shadow-pop-sm",
            )}
          >
            <Icon
              className="size-5 shrink-0"
              style={{ color: active ? CATEGORY_COLOR[area.id] : "var(--ink-subtle)" }}
              aria-hidden
            />
            <span className="flex-1 text-sm leading-tight">{area.label}</span>
            {active ? <Check className="size-4 shrink-0" aria-hidden /> : null}
          </button>
        );
      })}
    </div>
  );
}

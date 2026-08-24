import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("paper p-5", className)} {...props} />;
}

export function CardFlat({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-[var(--radius)] border-2 border-line-soft bg-surface p-5", className)}
      {...props}
    />
  );
}

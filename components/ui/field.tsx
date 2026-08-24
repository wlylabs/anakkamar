import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-label block mb-2 text-ink-muted", className)} {...props} />;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-[var(--radius)] border-2 border-line bg-surface px-3.5 text-[0.9375rem] placeholder:text-ink-subtle focus-visible:outline-offset-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-[var(--radius)] border-2 border-line bg-surface px-3.5 py-3 text-[0.9375rem] leading-relaxed placeholder:text-ink-subtle focus-visible:outline-offset-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export function FieldError({ children }: { children?: string | null }) {
  if (!children) return null;
  return <p className="mt-1.5 text-sm font-medium text-critical">{children}</p>;
}

import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-canvas border-2 border-line shadow-pop",
  accent: "bg-accent text-accent-ink border-2 border-line shadow-pop",
  secondary: "bg-surface text-ink border-2 border-line shadow-pop-sm",
  ghost: "bg-transparent text-ink border-2 border-transparent hover:border-line-soft",
  danger: "bg-critical text-accent-ink border-2 border-line shadow-pop-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5 rounded-[var(--radius)]",
  md: "h-11 px-4 text-[0.9375rem] gap-2 rounded-[var(--radius)]",
  lg: "h-14 px-6 text-base gap-2.5 rounded-[var(--radius)]",
  icon: "size-10 rounded-[var(--radius)]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "press inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold tracking-tight disabled:pointer-events-none disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  return <button ref={ref} className={buttonClasses(variant, size, className)} {...props} />;
});

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { className, variant = "primary", size = "md", href, ...props },
  ref,
) {
  return <Link ref={ref} href={href} className={buttonClasses(variant, size, className)} {...props} />;
});

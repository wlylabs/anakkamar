"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "./nav-items";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="pt-safe sticky top-0 z-30 hidden border-b-2 border-line bg-canvas/95 backdrop-blur md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/home" className="flex items-center gap-2.5 font-bold tracking-tight">
          <Logo className="size-7" />
          <span>Sejengkal</span>
        </Link>
        <nav aria-label="Navigasi utama" className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "press rounded-[var(--radius)] px-3 py-2 text-sm font-semibold tracking-tight",
                  active ? "bg-ink text-canvas" : "text-ink-muted hover:bg-canvas-alt hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { InstallBanner } from "@/components/pwa/install-prompt";
import { useApp } from "@/lib/store";
import { BottomNav } from "./bottom-nav";
import { TopNav } from "./top-nav";

const BARE_ROUTES = new Set(["/", "/onboarding"]);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, hydrated } = useApp();
  const isBare = BARE_ROUTES.has(pathname ?? "/");

  useEffect(() => {
    if (!hydrated) return;
    if (!state.onboarded && !isBare) {
      router.replace("/onboarding");
    } else if (state.onboarded && pathname === "/onboarding") {
      router.replace("/home");
    }
  }, [hydrated, state.onboarded, isBare, pathname, router]);

  const showNav = hydrated && !isBare && state.onboarded;

  return (
    <>
      {showNav ? (
        <TopNav />
      ) : isBare ? null : (
        /* Whether the nav is *shown* needs the hydrated store, but how much
           room it takes doesn't — the route alone settles that. Holding the
           header's height (and the bottom-nav gutter on <main> below) means
           the page doesn't jump down the instant hydration finishes. */
        <div className="pt-safe hidden h-16 border-b-2 border-line bg-canvas md:block" aria-hidden />
      )}
      <main id="main" className={isBare ? "" : "pb-24 md:pb-12"}>
        <div key={pathname} className="animate-page-in">
          {children}
        </div>
      </main>
      {showNav ? <BottomNav /> : null}
      {showNav ? <InstallBanner /> : null}
    </>
  );
}

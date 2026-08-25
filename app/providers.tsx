"use client";

import { AppShell } from "@/components/nav/app-shell";
import { PremiumProvider } from "@/lib/premium-context";
import { StoreProvider } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PremiumProvider>
      <StoreProvider>
        <AppShell>{children}</AppShell>
      </StoreProvider>
    </PremiumProvider>
  );
}

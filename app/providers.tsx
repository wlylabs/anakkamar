"use client";

import { AppShell } from "@/components/nav/app-shell";
import { PremiumProvider } from "@/lib/premium-context";
import { StoreProvider } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <PremiumProvider>
        <AppShell>{children}</AppShell>
      </PremiumProvider>
    </StoreProvider>
  );
}

"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getSupabaseBrowserClient } from "./supabase/client";
import { supabaseConfigured } from "./supabase/env";

interface PremiumCtx {
  configured: boolean;
  loading: boolean;
  user: User | null;
  isPlus: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<PremiumCtx | null>(null);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(supabaseConfigured);
  const [session, setSession] = useState<Session | null>(null);
  const [isPlus, setIsPlus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const supabase = getSupabaseBrowserClient();

  // Admin bypass lives server-side (ADMIN_EMAIL never reaches the client),
  // so status is whatever this route says — not a direct profiles read.
  const loadStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/premium/status");
      const body = (await res.json()) as { isPlus?: boolean; isAdmin?: boolean };
      setIsPlus(Boolean(body.isPlus));
      setIsAdmin(Boolean(body.isAdmin));
    } catch {
      setIsPlus(false);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    void supabase.auth.getSession().then((result: { data: { session: Session | null } }) => {
      setSession(result.data.session);
      if (result.data.session) void loadStatus();
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, next: Session | null) => {
      setSession(next);
      if (next) void loadStatus();
      else {
        setIsPlus(false);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadStatus]);

  const signInWithEmail = useCallback(
    async (email: string) => {
      if (!supabase) return { error: "Belum dikonfigurasi." };
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      return { error: error?.message ?? null };
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
  }, [supabase]);

  const refresh = useCallback(async () => {
    if (session) await loadStatus();
  }, [session, loadStatus]);

  const value = useMemo<PremiumCtx>(
    () => ({
      configured: supabaseConfigured,
      loading,
      user: session?.user ?? null,
      isPlus,
      isAdmin,
      signInWithEmail,
      signOut,
      refresh,
    }),
    [loading, session, isPlus, isAdmin, signInWithEmail, signOut, refresh],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePremium() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePremium must be used within PremiumProvider");
  return ctx;
}

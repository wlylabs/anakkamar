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
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<PremiumCtx | null>(null);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(supabaseConfigured);
  const [session, setSession] = useState<Session | null>(null);
  const [isPlus, setIsPlus] = useState(false);

  const supabase = getSupabaseBrowserClient();

  const loadProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return;
      const { data } = await supabase.from("profiles").select("is_plus").eq("id", userId).maybeSingle();
      setIsPlus(Boolean(data?.is_plus));
    },
    [supabase],
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    void supabase.auth.getSession().then((result: { data: { session: Session | null } }) => {
      setSession(result.data.session);
      if (result.data.session) void loadProfile(result.data.session.user.id);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, next: Session | null) => {
      setSession(next);
      if (next) void loadProfile(next.user.id);
      else setIsPlus(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadProfile]);

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
    if (session) await loadProfile(session.user.id);
  }, [session, loadProfile]);

  const value = useMemo<PremiumCtx>(
    () => ({
      configured: supabaseConfigured,
      loading,
      user: session?.user ?? null,
      isPlus,
      signInWithEmail,
      signOut,
      refresh,
    }),
    [loading, session, isPlus, signInWithEmail, signOut, refresh],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePremium() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePremium must be used within PremiumProvider");
  return ctx;
}

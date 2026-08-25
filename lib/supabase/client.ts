"use client";

import { createBrowserClient } from "@supabase/ssr";

import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseConfigured } from "./env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

/** Returns null when Supabase env vars aren't set yet — callers must handle that. */
export function getSupabaseBrowserClient() {
  if (!supabaseConfigured) return null;
  browserClient ??= createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return browserClient;
}

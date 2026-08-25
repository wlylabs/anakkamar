import "server-only";

import { createClient } from "@supabase/supabase-js";

import { SUPABASE_URL, supabaseConfigured } from "./env";

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Bypasses Row Level Security — only for trusted server code that has no
 * user session to act as, like the Midtrans webhook. Never import this from
 * a Client Component.
 */
export function getSupabaseAdminClient() {
  if (!supabaseConfigured || !SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

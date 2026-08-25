import { NextResponse } from "next/server";

import { hasServerDefaultKey } from "@/lib/ai";

/**
 * Lets the client know whether the deployer configured a shared server-side
 * default key (GROQ_API_KEY/GEMINI_API_KEY), without exposing the keys
 * themselves — `lib/ai.ts` is `server-only` and can't be imported client-side.
 * Without this, pages had no way to tell "no AI configured at all" apart
 * from "user just hasn't pasted their own key yet", so the chat/journal/
 * weekly-reflection UI stayed locked even when a server default was set.
 */
export async function GET() {
  return NextResponse.json({ hasServerDefaultKey });
}

import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Single source of truth for "does this session have Plus" — the admin
 * bypass lives here, server-side, so ADMIN_EMAIL never has to reach the
 * client for the client to know its own status.
 */
export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ isPlus: false, isAdmin: false });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ isPlus: false, isAdmin: false });
    }

    if (isAdminEmail(user.email)) {
      return NextResponse.json({ isPlus: true, isAdmin: true });
    }

    const { data } = await supabase.from("profiles").select("is_plus").eq("id", user.id).maybeSingle();
    return NextResponse.json({ isPlus: Boolean(data?.is_plus), isAdmin: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[premium/status] unhandled error:", message);
    return NextResponse.json({ isPlus: false, isAdmin: false });
  }
}

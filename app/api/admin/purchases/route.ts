import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!isAdminEmail(user?.email)) {
      return NextResponse.json({ error: "Bukan admin." }, { status: 403 });
    }

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
    }

    const { data: purchases, error } = await admin
      .from("purchases")
      .select("order_id, user_id, amount, status, method, note, created_at")
      .eq("method", "dana_manual")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const userIds = [...new Set((purchases ?? []).map((p) => p.user_id))];
    const { data: profiles } = userIds.length
      ? await admin.from("profiles").select("id, email").in("id", userIds)
      : { data: [] as { id: string; email: string | null }[] };
    const emailByUserId = new Map((profiles ?? []).map((p) => [p.id, p.email]));

    const withEmail = (purchases ?? []).map((p) => ({ ...p, email: emailByUserId.get(p.user_id) ?? null }));

    return NextResponse.json({ purchases: withEmail });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin/purchases] unhandled error:", message);
    return NextResponse.json({ error: `Server: ${message}` }, { status: 500 });
  }
}

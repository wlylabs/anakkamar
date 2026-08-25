import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
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

    const body = await request.json().catch(() => ({}));
    const orderId = typeof body.orderId === "string" ? body.orderId : null;
    const action = body.action === "approve" || body.action === "reject" ? body.action : null;
    if (!orderId || !action) {
      return NextResponse.json({ error: "orderId dan action wajib diisi." }, { status: 400 });
    }

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
    }

    const status = action === "approve" ? "settlement" : "failed";

    const { data: purchase, error: updateError } = await admin
      .from("purchases")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("order_id", orderId)
      .eq("method", "dana_manual")
      .select("user_id")
      .maybeSingle();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    if (!purchase) {
      return NextResponse.json({ error: "Transaksi manual nggak ketemu." }, { status: 404 });
    }

    if (action === "approve") {
      await admin
        .from("profiles")
        .update({ is_plus: true, plus_since: new Date().toISOString() })
        .eq("id", purchase.user_id);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[admin/purchases/confirm] unhandled error:", message);
    return NextResponse.json({ error: `Server: ${message}` }, { status: 500 });
  }
}

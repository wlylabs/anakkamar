import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const orderId = new URL(request.url).searchParams.get("order_id");
    if (!orderId) {
      return NextResponse.json({ error: "order_id wajib diisi." }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Lo harus masuk dulu." }, { status: 401 });
    }

    // RLS ("purchases: read own") already scopes this to the caller's rows,
    // but filtering by user_id too keeps the query itself explicit.
    const { data, error } = await supabase
      .from("purchases")
      .select("status")
      .eq("order_id", orderId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "Transaksi nggak ketemu." }, { status: 404 });
    }

    return NextResponse.json({ status: data.status as string });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[checkout/status] unhandled error:", message);
    return NextResponse.json({ error: `Server: ${message}` }, { status: 500 });
  }
}

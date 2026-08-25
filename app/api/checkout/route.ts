import { NextResponse } from "next/server";

import { getSnapClient, midtransConfigured } from "@/lib/midtrans";
import { PLUS_PRICE_IDR, PLUS_PRODUCT_NAME } from "@/lib/premium";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
    }
    if (!midtransConfigured) {
      return NextResponse.json({ error: "Midtrans belum dikonfigurasi." }, { status: 503 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Lo harus masuk dulu." }, { status: 401 });
    }

    const orderId = `plus-${user.id.slice(0, 8)}-${Date.now()}`;

    const { error: insertError } = await supabase
      .from("purchases")
      .insert({ order_id: orderId, user_id: user.id, amount: PLUS_PRICE_IDR, status: "pending" });
    if (insertError) {
      console.error("[checkout] purchases insert failed:", insertError.message);
      return NextResponse.json({ error: `DB: ${insertError.message}` }, { status: 500 });
    }

    const snap = getSnapClient();
    if (!snap) {
      return NextResponse.json({ error: "Midtrans belum dikonfigurasi." }, { status: 503 });
    }

    try {
      const transaction = await snap.createTransaction({
        transaction_details: { order_id: orderId, gross_amount: PLUS_PRICE_IDR },
        customer_details: { email: user.email },
        item_details: [{ id: "plus-lifetime", price: PLUS_PRICE_IDR, quantity: 1, name: PLUS_PRODUCT_NAME }],
      });
      return NextResponse.json({ token: transaction.token });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[checkout] Midtrans createTransaction failed:", message);
      return NextResponse.json({ error: `Midtrans: ${message}` }, { status: 502 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[checkout] unhandled error:", message);
    return NextResponse.json({ error: `Server: ${message}` }, { status: 500 });
  }
}

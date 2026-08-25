import { NextResponse } from "next/server";

import { getCoreApiClient, midtransConfigured } from "@/lib/midtrans";
import { PLUS_PRICE_IDR, PLUS_PRODUCT_NAME } from "@/lib/premium";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const EXPIRY_MINUTES = 15;
type Method = "qris" | "gopay";

function isMethod(value: unknown): value is Method {
  return value === "qris" || value === "gopay";
}

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
    }
    if (!midtransConfigured) {
      return NextResponse.json({ error: "Midtrans belum dikonfigurasi." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const method = isMethod(body.method) ? body.method : null;
    if (!method) {
      return NextResponse.json({ error: "Metode pembayaran nggak valid." }, { status: 400 });
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

    const coreApi = getCoreApiClient();
    if (!coreApi) {
      return NextResponse.json({ error: "Midtrans belum dikonfigurasi." }, { status: 503 });
    }

    try {
      const charge = await coreApi.charge({
        payment_type: method,
        transaction_details: { order_id: orderId, gross_amount: PLUS_PRICE_IDR },
        customer_details: { email: user.email },
        item_details: [{ id: "plus-lifetime", price: PLUS_PRICE_IDR, quantity: 1, name: PLUS_PRODUCT_NAME }],
        custom_expiry: { expiry_duration: EXPIRY_MINUTES, unit: "minute" },
      });

      const qrAction = charge.actions?.find((a) => a.name === "generate-qr-code");
      const deeplinkAction = charge.actions?.find((a) => a.name === "deeplink-redirect");

      if (!qrAction) {
        console.error("[checkout] no QR action in Midtrans response:", JSON.stringify(charge));
        return NextResponse.json({ error: "Midtrans nggak ngasih kode QR." }, { status: 502 });
      }

      return NextResponse.json({
        orderId,
        qrImageUrl: qrAction.url,
        deeplinkUrl: deeplinkAction?.url ?? null,
        expiresInSeconds: EXPIRY_MINUTES * 60,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[checkout] Midtrans charge failed:", message);
      return NextResponse.json({ error: `Midtrans: ${message}` }, { status: 502 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[checkout] unhandled error:", message);
    return NextResponse.json({ error: `Server: ${message}` }, { status: 500 });
  }
}

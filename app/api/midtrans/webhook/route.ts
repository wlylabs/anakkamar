import { NextResponse } from "next/server";

import { verifyMidtransSignature } from "@/lib/midtrans";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

interface MidtransNotification {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
}

function mapStatus(transactionStatus: string): "settlement" | "expired" | "failed" | "pending" {
  if (transactionStatus === "capture" || transactionStatus === "settlement") return "settlement";
  if (transactionStatus === "expire") return "expired";
  if (transactionStatus === "deny" || transactionStatus === "cancel") return "failed";
  return "pending";
}

export async function POST(request: Request) {
  const body = (await request.json()) as MidtransNotification;

  const valid = verifyMidtransSignature({
    orderId: body.order_id,
    statusCode: body.status_code,
    grossAmount: body.gross_amount,
    signatureKey: body.signature_key,
  });
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
  }

  const status = mapStatus(body.transaction_status);

  const { data: purchase } = await admin
    .from("purchases")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("order_id", body.order_id)
    .select("user_id")
    .maybeSingle();

  if (purchase && status === "settlement") {
    await admin
      .from("profiles")
      .update({ is_plus: true, plus_since: new Date().toISOString() })
      .eq("id", purchase.user_id);
  }

  return NextResponse.json({ received: true });
}

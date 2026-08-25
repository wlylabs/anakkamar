import "server-only";

import crypto from "node:crypto";

import { Snap } from "midtrans-client";

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY ?? "";
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";

export const midtransConfigured = Boolean(SERVER_KEY);

export function getSnapClient() {
  if (!midtransConfigured) return null;
  return new Snap({ isProduction: IS_PRODUCTION, serverKey: SERVER_KEY });
}

/**
 * Midtrans signs each webhook payload with
 * sha512(order_id + status_code + gross_amount + server_key). Recomputing
 * and comparing it is how we know the notification actually came from
 * Midtrans and wasn't forged by a POST to our webhook URL.
 */
export function verifyMidtransSignature(params: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}) {
  if (!SERVER_KEY) return false;
  const expected = crypto
    .createHash("sha512")
    .update(params.orderId + params.statusCode + params.grossAmount + SERVER_KEY)
    .digest("hex");
  return expected === params.signatureKey;
}

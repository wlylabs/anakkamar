"use client";

import Script from "next/script";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { usePremium } from "@/lib/premium-context";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

const SNAP_SRC =
  process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

export function SnapCheckoutButton() {
  const { refresh } = usePremium();
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "processing">("idle");
  const [error, setError] = useState<string | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

  const handleClick = async () => {
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const body = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !body.token) {
        setError(body.error ?? "Gagal mulai pembayaran.");
        setStatus("idle");
        return;
      }
      setStatus("processing");
      window.snap?.pay(body.token, {
        onSuccess: () => void refresh(),
        onPending: () => void refresh(),
        onError: () => setError("Pembayaran gagal. Coba lagi."),
        onClose: () => setStatus("idle"),
      });
    } catch {
      setError("Gagal konek ke server.");
      setStatus("idle");
    }
  };

  if (!clientKey) {
    return <p className="text-sm text-ink-subtle">Pembayaran belum dikonfigurasi.</p>;
  }

  return (
    <div>
      <Script src={SNAP_SRC} data-client-key={clientKey} strategy="afterInteractive" onReady={() => setScriptReady(true)} />
      <Button
        variant="accent"
        size="lg"
        className="w-full"
        disabled={!scriptReady || status !== "idle"}
        onClick={handleClick}
      >
        {status === "idle" ? "Upgrade sekarang" : "Memproses..."}
      </Button>
      {error ? <p className="mt-2 text-sm font-medium text-critical">{error}</p> : null}
    </div>
  );
}

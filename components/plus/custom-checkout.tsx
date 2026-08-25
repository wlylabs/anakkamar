"use client";

import { Check, CheckCircle2, Copy, ExternalLink, QrCode, RefreshCw, Smartphone, Wallet, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/field";
import { usePremium } from "@/lib/premium-context";
import { DANA_NUMBER, formatIDR, PLUS_PRICE_IDR } from "@/lib/premium";
import { cn } from "@/lib/utils";

type Method = "qris" | "gopay" | "dana_manual";
type Phase = "pick" | "manual-form" | "loading" | "waiting" | "success" | "expired" | "rejected" | "error";

interface ChargeInfo {
  orderId: string;
  method: Method;
  qrImageUrl: string | null;
  deeplinkUrl: string | null;
  expiresInSeconds: number | null;
}

const METHODS: { id: Method; label: string; icon: typeof QrCode; hint: string }[] = [
  { id: "qris", label: "QRIS", icon: QrCode, hint: "Scan pakai e-wallet atau m-banking apa aja" },
  { id: "gopay", label: "GoPay", icon: Smartphone, hint: "Bayar langsung dari aplikasi Gojek" },
  { id: "dana_manual", label: "Transfer DANA", icon: Wallet, hint: "Diverifikasi manual, agak lebih lama" },
];

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CustomCheckout() {
  const { refresh } = usePremium();
  const [phase, setPhase] = useState<Phase>("pick");
  const [charge, setCharge] = useState<ChargeInfo | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);

  const stopTimers = useCallback(() => {
    if (pollRef.current) window.clearInterval(pollRef.current);
    if (countdownRef.current) window.clearInterval(countdownRef.current);
    pollRef.current = null;
    countdownRef.current = null;
  }, []);

  useEffect(() => stopTimers, [stopTimers]);

  const startPolling = useCallback(
    (orderId: string) => {
      pollRef.current = window.setInterval(async () => {
        try {
          const res = await fetch(`/api/checkout/status?order_id=${encodeURIComponent(orderId)}`);
          const body = (await res.json()) as { status?: string };
          if (body.status === "settlement") {
            stopTimers();
            setPhase("success");
            void refresh();
          } else if (body.status === "failed") {
            stopTimers();
            setPhase("rejected");
          } else if (body.status === "expired") {
            stopTimers();
            setPhase("expired");
          }
        } catch {
          // Transient poll failure — keep trying until the countdown runs out.
        }
      }, 4000);
    },
    [refresh, stopTimers],
  );

  const submitCheckout = async (method: Method, body: Record<string, unknown> = {}) => {
    setPhase("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, ...body }),
      });
      const result = (await res.json()) as {
        orderId?: string;
        qrImageUrl?: string;
        deeplinkUrl?: string | null;
        expiresInSeconds?: number;
        manual?: boolean;
        error?: string;
      };
      if (!res.ok || !result.orderId) {
        setErrorMsg(result.error ?? "Gagal mulai pembayaran.");
        setPhase("error");
        return;
      }

      const info: ChargeInfo = {
        orderId: result.orderId,
        method,
        qrImageUrl: result.qrImageUrl ?? null,
        deeplinkUrl: result.deeplinkUrl ?? null,
        expiresInSeconds: result.expiresInSeconds ?? null,
      };
      setCharge(info);
      setPhase("waiting");

      if (info.expiresInSeconds) {
        setSecondsLeft(info.expiresInSeconds);
        countdownRef.current = window.setInterval(() => {
          setSecondsLeft((s) => {
            if (s <= 1) {
              stopTimers();
              setPhase("expired");
              return 0;
            }
            return s - 1;
          });
        }, 1000);
      }
      startPolling(info.orderId);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Gagal konek ke server: ${message}`);
      setPhase("error");
    }
  };

  const reset = () => {
    stopTimers();
    setCharge(null);
    setErrorMsg(null);
    setNote("");
    setPhase("pick");
  };

  const copyDana = async () => {
    try {
      await navigator.clipboard.writeText(DANA_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — the number is still visible to copy by hand.
    }
  };

  if (phase === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <div className="grid size-14 place-items-center rounded-full border-2 border-line bg-positive-soft text-positive">
          <CheckCircle2 className="size-7 animate-pop" aria-hidden />
        </div>
        <p className="text-lg font-bold">Pembayaran berhasil!</p>
        <p className="text-sm text-ink-muted">Anak Kamar Plus lo udah aktif. Makasih udah dukung.</p>
      </div>
    );
  }

  if (phase === "manual-form") {
    return (
      <div>
        <div className="rounded-[var(--radius)] border-2 border-line bg-canvas-alt p-4">
          <p className="text-label text-ink-subtle">Transfer ke nomor DANA</p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <p className="text-xl font-bold tracking-tight">{DANA_NUMBER}</p>
            <button
              type="button"
              onClick={() => void copyDana()}
              className="press flex items-center gap-1 rounded-[var(--radius)] border-2 border-line bg-surface px-2.5 py-1.5 text-xs font-semibold"
            >
              {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
              {copied ? "Kesalin" : "Salin"}
            </button>
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Jumlah: <span className="font-semibold text-ink">{formatIDR(PLUS_PRICE_IDR)}</span> — pastiin
            nominalnya pas biar gampang dicocokin.
          </p>
        </div>

        <div className="mt-4">
          <Textarea
            rows={2}
            placeholder="Catatan (opsional) — misalnya nama pengirim kalau beda"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="mt-3 flex gap-2">
          <Button variant="secondary" size="sm" onClick={reset}>
            Batal
          </Button>
          <Button
            variant="accent"
            size="sm"
            className="flex-1"
            onClick={() => void submitCheckout("dana_manual", { note })}
          >
            Saya sudah transfer
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "waiting" && charge) {
    if (charge.method === "dana_manual") {
      return (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="grid size-12 place-items-center rounded-full border-2 border-line bg-accent-soft">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
          </div>
          <p className="text-sm font-semibold">Nunggu verifikasi.</p>
          <p className="max-w-xs text-sm text-ink-muted">
            Transfer lo lagi dicek manual. Halaman ini otomatis update begitu udah di-approve —
            nggak perlu refresh.
          </p>
          <button type="button" onClick={reset} className="text-xs font-semibold text-ink-subtle">
            Batal
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        {charge.qrImageUrl ? (
          <div className="rounded-[var(--radius)] border-2 border-line bg-white p-3">
            <Image
              src={charge.qrImageUrl}
              alt="Kode QR pembayaran"
              width={220}
              height={220}
              unoptimized
              className="size-[220px]"
            />
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold">Scan buat bayar {formatIDR(PLUS_PRICE_IDR)}</p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-ink-subtle">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
            Nunggu pembayaran — kadaluarsa dalam {formatCountdown(secondsLeft)}
          </p>
        </div>
        {charge.deeplinkUrl ? (
          <a
            href={charge.deeplinkUrl}
            target="_blank"
            rel="noreferrer"
            className="press inline-flex items-center gap-1.5 rounded-[var(--radius)] border-2 border-line bg-surface px-4 py-2.5 text-sm font-semibold"
          >
            Buka aplikasi Gojek
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        ) : null}
        <button type="button" onClick={reset} className="text-xs font-semibold text-ink-subtle">
          Batal, pilih metode lain
        </button>
      </div>
    );
  }

  if (phase === "expired" || phase === "rejected") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <p className="text-sm font-semibold text-critical">
          {phase === "expired" ? "Waktu pembayaran habis." : "Transfer lo belum bisa diverifikasi."}
        </p>
        <Button variant="secondary" size="sm" onClick={reset}>
          <RefreshCw className="size-3.5" aria-hidden />
          Coba lagi
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            disabled={phase === "loading"}
            onClick={() => (m.id === "dana_manual" ? setPhase("manual-form") : void submitCheckout(m.id))}
            className={cn(
              "press flex flex-col items-center gap-1.5 rounded-[var(--radius)] border-2 border-line bg-surface p-3 text-center disabled:opacity-50",
            )}
          >
            <m.icon className="size-5" aria-hidden />
            <span className="text-xs font-bold">{m.label}</span>
          </button>
        ))}
      </div>
      {phase === "loading" ? <p className="mt-3 text-center text-sm text-ink-muted">Nyiapin...</p> : null}
      {phase === "error" && errorMsg ? (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-critical">
          <X className="size-3.5 shrink-0" aria-hidden />
          {errorMsg}
        </p>
      ) : null}
    </div>
  );
}

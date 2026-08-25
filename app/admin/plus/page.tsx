"use client";

import { Check, ShieldAlert, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatIDR } from "@/lib/premium";
import { formatDateID } from "@/lib/utils";

interface ManualPurchase {
  order_id: string;
  user_id: string;
  amount: number;
  status: string;
  note: string | null;
  created_at: string;
  email: string | null;
}

export default function AdminPlusPage() {
  const [purchases, setPurchases] = useState<ManualPurchase[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/purchases");
      const body = (await res.json()) as { purchases?: ManualPurchase[]; error?: string };
      if (!res.ok) {
        setError(body.error ?? "Gagal muat data.");
        return;
      }
      setPurchases(body.purchases ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const act = async (orderId: string, action: "approve" | "reject") => {
    setBusyOrderId(orderId);
    try {
      const res = await fetch("/api/admin/purchases/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action }),
      });
      if (res.ok) {
        setPurchases((prev) => prev?.filter((p) => p.order_id !== orderId) ?? null);
      } else {
        const body = (await res.json()) as { error?: string };
        setError(body.error ?? "Gagal update.");
      }
    } finally {
      setBusyOrderId(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pb-16 pt-8 md:px-8">
      <h1 className="text-display flex items-center gap-2.5 text-3xl">
        <ShieldAlert className="size-7 text-accent" aria-hidden />
        Verifikasi transfer manual
      </h1>
      <p className="mt-1 text-ink-muted">Approve setelah lo cek mutasi DANA masuk.</p>

      {error ? (
        <div className="mt-6 rounded-[var(--radius)] border-2 border-line bg-canvas-alt px-4 py-3 text-sm font-medium text-critical">
          {error}
        </div>
      ) : null}

      {purchases === null && !error ? <p className="mt-6 text-sm text-ink-muted">Muat data...</p> : null}

      {purchases && purchases.length === 0 ? (
        <p className="mt-6 text-sm text-ink-muted">Nggak ada transfer manual yang nunggu verifikasi.</p>
      ) : null}

      <div className="mt-6 space-y-3">
        {purchases?.map((p) => {
          const busy = busyOrderId === p.order_id;
          return (
            <Card key={p.order_id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold">{p.email ?? p.user_id}</p>
                  <p className="text-xs text-ink-subtle">
                    {formatDateID(p.created_at.slice(0, 10))} · {p.order_id}
                  </p>
                </div>
                <p className="shrink-0 font-bold">{formatIDR(p.amount)}</p>
              </div>
              {p.note ? <p className="mt-2 text-sm italic text-ink-muted">&ldquo;{p.note}&rdquo;</p> : null}
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="accent"
                  disabled={busy}
                  onClick={() => void act(p.order_id, "approve")}
                >
                  <Check className="size-3.5" aria-hidden />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={busy}
                  onClick={() => void act(p.order_id, "reject")}
                >
                  <X className="size-3.5" aria-hidden />
                  Tolak
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

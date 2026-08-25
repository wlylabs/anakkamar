"use client";

import { Check, Mail, Sparkles } from "lucide-react";
import { useState } from "react";

import { SnapCheckoutButton } from "@/components/plus/snap-checkout-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/field";
import { usePremium } from "@/lib/premium-context";
import { formatIDR, PLUS_PRICE_IDR } from "@/lib/premium";

const BENEFITS = [
  "Project & habit unlimited (gratis dibatasi 3)",
  "Tema warna tambahan",
  "Statistik lanjutan & riwayat streak",
  "Dukung Anak Kamar terus berkembang",
];

function SignInForm() {
  const { signInWithEmail } = usePremium();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    const { error: err } = await signInWithEmail(email.trim());
    setLoading(false);
    if (err) setError(err);
    else setSent(true);
  };

  if (sent) {
    return (
      <p className="text-sm leading-relaxed text-ink-muted">
        Link masuk udah dikirim ke <span className="font-semibold text-ink">{email}</span>. Cek
        inbox (atau folder spam) lo.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="email">Masuk dulu buat upgrade</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@kamu.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error ? <p className="text-sm font-medium text-critical">{error}</p> : null}
      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        <Mail className="size-4" aria-hidden />
        Kirim link masuk
      </Button>
    </form>
  );
}

export default function PlusPage() {
  const { configured, loading, user, isPlus } = usePremium();

  return (
    <div className="mx-auto max-w-xl px-5 pb-16 pt-8 md:px-8">
      <h1 className="text-display flex items-center gap-2.5 text-3xl">
        <Sparkles className="size-7 text-accent" aria-hidden />
        Anak Kamar Plus
      </h1>
      <p className="mt-1 text-ink-muted">Sekali bayar, lunas selamanya. Nggak ada langganan.</p>

      <Card className="mt-6">
        <p className="text-display text-4xl">{formatIDR(PLUS_PRICE_IDR)}</p>
        <p className="mt-1 text-sm text-ink-subtle">sekali bayar</p>

        <ul className="mt-5 space-y-2.5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          {!configured ? (
            <p className="text-sm text-ink-subtle">
              Pembayaran belum aktif — konfigurasi lagi disiapin.
            </p>
          ) : loading ? null : isPlus ? (
            <p className="rounded-[var(--radius)] border-2 border-line bg-positive-soft px-4 py-3 text-sm font-semibold text-positive">
              Lo udah punya Anak Kamar Plus. Makasih udah dukung!
            </p>
          ) : user ? (
            <SnapCheckoutButton />
          ) : (
            <SignInForm />
          )}
        </div>
      </Card>
    </div>
  );
}

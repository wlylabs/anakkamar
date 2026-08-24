"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { CATEGORY_COLOR, CATEGORY_SOFT } from "@/lib/category";
import { useApp } from "@/lib/store";
import { FOCUS_AREAS, type FocusArea } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, hydrated, state } = useApp();
  const [step, setStep] = useState<0 | 1>(0);
  const [focusArea, setFocusArea] = useState<FocusArea | null>(null);
  const [smallChange, setSmallChange] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (hydrated && state.onboarded) router.replace("/home");
  }, [hydrated, state.onboarded, router]);

  if (hydrated && state.onboarded) return null;

  const handleSubmit = () => {
    if (!focusArea || !smallChange.trim()) return;
    completeOnboarding({ focusArea, smallChange: smallChange.trim(), name: name.trim() });
    router.replace("/home");
  };

  return (
    <div className="flex min-h-dvh flex-col px-6 py-8">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        <div className="mb-8 flex items-center gap-2.5 font-bold tracking-tight">
          <Logo className="size-7" />
          <span>Anak Kamar</span>
        </div>

        <div className="mb-8 flex gap-2">
          <div className={cn("h-1.5 flex-1 rounded-full", step >= 0 ? "bg-accent" : "bg-canvas-alt")} />
          <div className={cn("h-1.5 flex-1 rounded-full", step >= 1 ? "bg-accent" : "bg-canvas-alt")} />
        </div>

        {step === 0 ? (
          <div className="animate-fade flex-1">
            <h1 className="text-display text-3xl md:text-4xl">
              Sekarang lo lagi pengen berkembang di bagian mana?
            </h1>
            <p className="mt-3 text-ink-muted">Pilih satu yang paling kerasa sekarang.</p>

            <div className="stagger mt-8 grid grid-cols-2 gap-3">
              {FOCUS_AREAS.map((area, i) => {
                const active = focusArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setFocusArea(area.id)}
                    style={
                      {
                        "--stagger-index": i,
                        borderColor: active ? CATEGORY_COLOR[area.id] : undefined,
                        backgroundColor: active ? CATEGORY_SOFT[area.id] : undefined,
                      } as React.CSSProperties
                    }
                    className={cn(
                      "press flex items-center justify-between rounded-[var(--radius)] border-2 border-line bg-surface px-4 py-4 text-left font-semibold tracking-tight",
                      active && "shadow-pop-sm",
                    )}
                  >
                    {area.label}
                    {active ? <Check className="size-4 shrink-0" aria-hidden /> : null}
                  </button>
                );
              })}
            </div>

            <Button
              size="lg"
              className="mt-8 w-full"
              disabled={!focusArea}
              onClick={() => setStep(1)}
            >
              Lanjut
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        ) : (
          <div className="animate-fade flex-1">
            <h1 className="text-display text-3xl md:text-4xl">
              Apa satu hal kecil yang pengen lo ubah?
            </h1>
            <p className="mt-3 text-ink-muted">
              Nggak usah muluk-muluk. Satu hal kecil aja dulu — itu udah cukup buat mulai.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <Label htmlFor="small-change">Hal kecil itu</Label>
                <Textarea
                  id="small-change"
                  rows={3}
                  placeholder="Misalnya: mulai tidur nggak kemaleman, atau nyicil belajar desain..."
                  value={smallChange}
                  onChange={(e) => setSmallChange(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="name">Panggil lo siapa? (opsional)</Label>
                <Input
                  id="name"
                  placeholder="Nama panggilan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="secondary" size="lg" onClick={() => setStep(0)}>
                <ArrowLeft className="size-4" aria-hidden />
              </Button>
              <Button
                variant="accent"
                size="lg"
                className="flex-1"
                disabled={!smallChange.trim()}
                onClick={handleSubmit}
              >
                Bikin ruang gue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

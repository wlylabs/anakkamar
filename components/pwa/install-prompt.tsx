"use client";

import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useInstall } from "@/lib/pwa/install";

export function InstallBanner() {
  const { platform, dismissed, install, dismiss } = useInstall();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (platform !== "prompt" || dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 2000);
    return () => window.clearTimeout(timer);
  }, [platform, dismissed]);

  if (!visible || platform !== "prompt" || dismissed) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 md:bottom-6">
      <div className="animate-in-up paper pointer-events-auto flex w-full max-w-md items-center gap-3 p-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-[var(--radius)] bg-ink text-canvas">
          <Logo className="size-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Install Anak Kamar</p>
          <p className="truncate text-xs text-ink-subtle">Buka kayak app, tetep jalan offline.</p>
        </div>
        <Button size="sm" variant="accent" onClick={() => void install()}>
          Install
        </Button>
        <Button size="icon" variant="ghost" onClick={dismiss} aria-label="Tutup">
          <X className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

export function InstallSection() {
  const { platform, install } = useInstall();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-bold tracking-tight">Install ke home screen</h2>
          <p className="mt-1 max-w-prose text-sm leading-relaxed text-ink-muted">
            Biar Anak Kamar kebuka kayak aplikasi beneran, dan progress lo tetep kesimpen walau
            koneksi lagi jelek.
          </p>
        </div>
        {platform === "prompt" ? (
          <Button variant="secondary" size="sm" onClick={() => void install()}>
            <Download className="size-3.5" aria-hidden />
            Install
          </Button>
        ) : null}
      </div>

      {platform === "installed" ? (
        <p className="mt-4 text-sm text-ink-muted">Udah keinstall di device ini.</p>
      ) : null}

      {platform === "manual" ? (
        <p className="mt-4 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          Di iPhone/iPad, tap
          <Share className="size-3.5" aria-hidden />
          <span className="font-medium text-ink">Share</span>
          lalu
          <span className="font-medium text-ink">Add to Home Screen</span>.
        </p>
      ) : null}

      {platform === "unavailable" ? (
        <p className="mt-4 text-sm text-ink-muted">
          Browser lo bakal nawarin opsi install sendiri kalau udah waktunya.
        </p>
      ) : null}
    </div>
  );
}

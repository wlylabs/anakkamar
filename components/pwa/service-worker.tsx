"use client";

import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function ServiceWorker() {
  const [waiting, setWaiting] = useState<globalThis.ServiceWorker | null>(null);
  const reloading = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const track = (worker: globalThis.ServiceWorker | null) => {
      if (!worker) return;
      const check = () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          setWaiting(worker);
        }
      };
      check();
      worker.addEventListener("statechange", check);
    };

    const onControllerChange = () => {
      if (reloading.current) return;
      reloading.current = true;
      window.location.reload();
    };

    void navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        track(reg.waiting);
        reg.addEventListener("updatefound", () => track(reg.installing));
      })
      .catch(() => {});

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    return () => navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
  }, []);

  const applyUpdate = useCallback(() => {
    if (!waiting) return;
    waiting.postMessage({ type: "SKIP_WAITING" });
    setWaiting(null);
  }, [waiting]);

  if (!waiting) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 md:bottom-6"
    >
      <div className="animate-in-up paper pointer-events-auto flex items-center gap-3 rounded-full py-2 pl-4 pr-2">
        <p className="text-sm text-ink-muted">Ada versi baru.</p>
        <Button size="sm" variant="secondary" onClick={applyUpdate}>
          <RefreshCw className="size-3.5" aria-hidden />
          Muat ulang
        </Button>
      </div>
    </div>
  );
}

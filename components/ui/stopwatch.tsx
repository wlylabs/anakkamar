"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "./button";

function formatElapsed(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/**
 * Plain start/pause/reset stopwatch — a session-timing aid for "berapa lama
 * gue ngerjain ini", not a tracked metric. Elapsed time lives in this
 * component only and resets on unmount; nothing is persisted, since it's a
 * tool for right now rather than data the app reports back later.
 */
export function Stopwatch({ className }: { className?: string }) {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsedMs((prev) => prev + (Date.now() - (startedAtRef.current ?? Date.now())));
      startedAtRef.current = Date.now();
    }, 250);
    return () => window.clearInterval(id);
  }, [running]);

  const toggle = () => {
    if (running) {
      setRunning(false);
      startedAtRef.current = null;
    } else {
      startedAtRef.current = Date.now();
      setRunning(true);
    }
  };

  const reset = () => {
    setRunning(false);
    startedAtRef.current = null;
    setElapsedMs(0);
  };

  return (
    <div className={className}>
      <p className="text-display text-center text-4xl tabular-nums">{formatElapsed(elapsedMs)}</p>
      <div className="mt-3 flex justify-center gap-2">
        <Button type="button" variant={running ? "secondary" : "accent"} size="sm" onClick={toggle}>
          {running ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          {running ? "Jeda" : elapsedMs > 0 ? "Lanjut" : "Mulai"}
        </Button>
        {elapsedMs > 0 && !running ? (
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="size-3.5" aria-hidden />
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}

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
 *
 * Displayed time is always recomputed from absolute timestamps (baseMs +
 * now - startedAt) rather than accumulated per-tick, so a slow, throttled,
 * or irregular interval (backgrounded tab, devtools open, etc.) still shows
 * the correct number the moment it does render — the interval only forces
 * a re-render, it never drives the math.
 */
export function Stopwatch({ className }: { className?: string }) {
  const [running, setRunning] = useState(false);
  const [baseMs, setBaseMs] = useState(0);
  const [, forceRender] = useState(0);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => forceRender((n) => n + 1), 250);
    return () => window.clearInterval(id);
  }, [running]);

  const elapsedMs = running && startedAtRef.current !== null ? baseMs + (Date.now() - startedAtRef.current) : baseMs;

  const toggle = () => {
    if (running) {
      setBaseMs(elapsedMs);
      startedAtRef.current = null;
      setRunning(false);
    } else {
      startedAtRef.current = Date.now();
      setRunning(true);
    }
  };

  const reset = () => {
    setRunning(false);
    startedAtRef.current = null;
    setBaseMs(0);
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

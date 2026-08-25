"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Kept separate from lib/store.tsx's AppState on purpose — that state gets
 * exported as a shareable backup JSON (see components/data-backup.tsx), and
 * API keys should never end up in a file a user might hand to someone else.
 */
const STORAGE_KEY = "anak-kamar-ai-keys";

export interface AiKeys {
  groq: string;
  gemini: string;
}

const EMPTY: AiKeys = { groq: "", gemini: "" };

function read(): AiKeys {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<AiKeys>;
    return {
      groq: typeof parsed.groq === "string" ? parsed.groq : "",
      gemini: typeof parsed.gemini === "string" ? parsed.gemini : "",
    };
  } catch {
    return EMPTY;
  }
}

export function useAiKeys() {
  const [keys, setKeys] = useState<AiKeys>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  // Whether the deployer set a shared GROQ_API_KEY/GEMINI_API_KEY server-side.
  // `lib/ai.ts` is `server-only`, so the only way to know this client-side is
  // to ask the API — without it, `active` below would stay false for anyone
  // who hasn't pasted their own key, even when a server default works fine.
  const [serverDefaultActive, setServerDefaultActive] = useState(false);

  useEffect(() => {
    setKeys(read());
    setHydrated(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ai/status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { hasServerDefaultKey?: boolean } | null) => {
        if (!cancelled && data?.hasServerDefaultKey) setServerDefaultActive(true);
      })
      .catch(() => {
        // Offline/blocked — falls back to requiring the user's own key.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = useCallback((next: AiKeys) => {
    setKeys(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage full/blocked (private mode) — key just won't survive a reload.
    }
  }, []);

  const active = Boolean(keys.groq || keys.gemini || serverDefaultActive);

  return { keys, hydrated, save, active };
}

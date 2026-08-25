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

  useEffect(() => {
    setKeys(read());
    setHydrated(true);
  }, []);

  const save = useCallback((next: AiKeys) => {
    setKeys(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage full/blocked (private mode) — key just won't survive a reload.
    }
  }, []);

  return { keys, hydrated, save };
}

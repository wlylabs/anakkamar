"use client";

import { useCallback, useEffect, useState } from "react";

import { uid } from "./utils";

/**
 * Kept separate from lib/store.tsx's AppState — same reasoning as
 * lib/ai-keys.ts: this is device-local scratch history, not something that
 * should ride along in a shared data-backup export.
 */
const STORAGE_KEY = "anak-kamar:chat";
const MAX_STORED_MESSAGES = 60;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

function read(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessage =>
        m && typeof m === "object" && typeof m.id === "string" && typeof m.content === "string" &&
        (m.role === "user" || m.role === "assistant"),
    );
  } catch {
    return [];
  }
}

function write(messages: ChatMessage[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
  } catch {
    // Storage full/blocked (private mode) — history just won't survive a reload.
  }
}

export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMessages(read());
    setHydrated(true);
  }, []);

  const addMessage = useCallback((role: ChatMessage["role"], content: string) => {
    const message: ChatMessage = { id: uid("msg"), role, content, createdAt: new Date().toISOString() };
    setMessages((prev) => {
      const next = [...prev, message];
      write(next);
      return next;
    });
    return message;
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
    write([]);
  }, []);

  return { messages, hydrated, addMessage, clear };
}

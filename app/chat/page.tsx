"use client";

import { MessageCircle, Send, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { AiStatusBadge } from "@/components/ai-status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Textarea } from "@/components/ui/field";
import { useAiKeys } from "@/lib/ai-keys";
import { useChatHistory, type ChatMessage } from "@/lib/chat-store";
import { cn } from "@/lib/utils";

const STARTERS = [
  "Bantu gue mecah goal jadi langkah kecil",
  "Gue lagi stuck sama satu habit",
  "Random check-in aja hari ini",
];

export default function ChatPage() {
  const {
    keys: aiKeys,
    hydrated: aiKeysHydrated,
    active: aiActive,
    source: aiSource,
    checkingServer: aiChecking,
  } = useAiKeys();
  const { messages, hydrated: chatHydrated, addMessage, clear } = useChatHistory();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, sending]);

  if (!aiKeysHydrated || !chatHydrated) return null;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setError(null);
    const history = [...messages, addMessage("user", trimmed)];
    setDraft("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
          groqApiKey: aiKeys.groq,
          geminiApiKey: aiKeys.gemini,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (res.ok && data.reply) {
        addMessage("assistant", data.reply);
      } else {
        setError(data.error ?? "Gagal dapet balesan.");
      }
    } catch {
      setError("Gagal konek. Cek koneksi internet lo.");
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-5 pt-8 md:px-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-display flex items-center gap-2.5 text-3xl">
              <MessageCircle className="size-7 text-accent" aria-hidden />
              Ngobrol
            </h1>
            <p className="mt-1 text-ink-muted">Teman ngobrol AI buat mikirin langkah kecil lo.</p>
            <AiStatusBadge active={aiActive} source={aiSource} checking={aiChecking} className="mt-2" />
          </div>
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Hapus semua riwayat obrolan ini? Nggak bisa dibalikin.")) clear();
              }}
              className="press mt-1 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] border-2 border-line-soft text-ink-subtle hover:text-critical"
              aria-label="Hapus riwayat obrolan"
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>

        {!aiActive ? (
          <div className="mt-6 flex flex-col items-center justify-center">
            <EmptyState
              icon={<MessageCircle className="size-10" aria-hidden />}
              title="Belum ada AI aktif"
              description="Masukin API key Groq/Gemini lo sendiri (gratis) di Profil buat mulai ngobrol."
              action={
                <Link href="/profile" className="press inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <Sparkles className="size-3.5" aria-hidden />
                  Aktifin di Profil
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-4 pb-28">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-4 py-6">
                <p className="text-sm leading-relaxed text-ink-muted">
                  Ini bukan pengganti psikolog/psikiater — cuma teman buat mikir bareng. Mulai dari salah
                  satu ini, atau tulis sendiri di bawah:
                </p>
                <div className="flex flex-col gap-2">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="press rounded-[var(--radius)] border-2 border-line-soft bg-surface px-4 py-3 text-left text-sm font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <ChatBubble key={m.id} message={m} />
                ))}
                {sending ? (
                  <div className="flex justify-start">
                    <div className="rounded-[var(--radius)] border-2 border-line-soft bg-surface px-4 py-2.5 text-sm text-ink-subtle">
                      Lagi mikir...
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {aiActive
        ? createPortal(
            <div className="fixed inset-x-0 bottom-[calc(58px_+_env(safe-area-inset-bottom))] z-20 border-t-2 border-line bg-canvas md:bottom-0">
              <div className="mx-auto max-w-2xl px-5 py-3 md:px-8">
                {error ? <p className="mb-2 text-sm font-medium text-critical">{error}</p> : null}
                <form onSubmit={handleSubmit} className="flex items-end gap-2">
                  <Textarea
                    rows={1}
                    placeholder="Tulis pesan..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send(draft);
                      }
                    }}
                    className="max-h-32 min-h-12 resize-none py-3"
                  />
                  <Button
                    type="submit"
                    variant="accent"
                    size="icon"
                    disabled={!draft.trim() || sending}
                    aria-label="Kirim"
                  >
                    <Send className="size-4" aria-hidden />
                  </Button>
                </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <Card
        className={cn(
          "max-w-[85%] whitespace-pre-wrap p-3.5 text-sm leading-relaxed",
          isUser ? "bg-accent-soft" : "bg-surface",
        )}
      >
        {message.content}
      </Card>
    </div>
  );
}

"use client";

import { Download, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePremium } from "@/lib/premium-context";
import { useApp } from "@/lib/store";
import type { AppState } from "@/lib/types";

function isAppStateShape(value: unknown): value is Partial<AppState> {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.projects) && Array.isArray(v.habits) && Array.isArray(v.journalEntries);
}

export function DataBackup() {
  const { state, replaceState } = useApp();
  const { user } = usePremium();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [imported, setImported] = useState(false);
  const [pendingImport, setPendingImport] = useState<Partial<AppState> | null>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sejengkal-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    setError(null);
    setImported(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!isAppStateShape(parsed)) {
        setError("File ini bukan backup Sejengkal yang valid.");
        return;
      }
      setPendingImport(parsed);
    } catch {
      setError("Gagal baca file itu. Pastiin ini file backup .json dari Sejengkal.");
    }
  };

  const confirmImport = () => {
    if (!pendingImport) return;
    replaceState({
      version: 1,
      onboarded: true,
      profile: { ...state.profile, ...pendingImport.profile },
      projects: pendingImport.projects ?? [],
      joinedChallenges: pendingImport.joinedChallenges ?? [],
      habits: pendingImport.habits ?? [],
      habitLogs: pendingImport.habitLogs ?? [],
      journalEntries: pendingImport.journalEntries ?? [],
      activeDates: pendingImport.activeDates ?? [],
      unlockedAchievements: pendingImport.unlockedAchievements ?? [],
    });
    setPendingImport(null);
    setImported(true);
  };

  return (
    <div>
      <h2 className="font-bold tracking-tight">Backup data</h2>
      <p className="mt-1 max-w-prose text-sm leading-relaxed text-ink-muted">
        {user
          ? "Data lo (project, habit, journal) udah ke-sync ke akun, jadi tetap ada meski logout terus login lagi atau ganti device. Ekspor sesekali kalau mau punya salinan sendiri."
          : "Lo belum login, jadi data lo (project, habit, journal) cuma tersimpan di device ini. Login biar data lo ke-sync ke akun dan nggak ilang, atau ekspor sesekali biar nggak ilang kalau ganti HP atau browser-nya di-reset."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="press flex items-center gap-1.5 rounded-[var(--radius)] border-2 border-line bg-surface px-3.5 py-2 text-sm font-semibold shadow-pop-sm"
        >
          <Download className="size-4" aria-hidden />
          Ekspor data
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          className="press flex items-center gap-1.5 rounded-[var(--radius)] border-2 border-line-soft bg-surface px-3.5 py-2 text-sm font-semibold"
        >
          <Upload className="size-4" aria-hidden />
          Impor data
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => void handleFileChange(e)}
        />
      </div>
      {imported ? <p className="mt-2 text-sm font-medium text-positive">Data berhasil diimpor.</p> : null}
      {error ? <p className="mt-2 text-sm font-medium text-critical">{error}</p> : null}

      <ConfirmDialog
        open={pendingImport !== null}
        title="Timpa data yang ada sekarang?"
        description="Impor data ini bakal nimpa semua data yang ada sekarang di device ini (project, habit, journal, dll). Nggak bisa dibalikin."
        confirmLabel="Timpa"
        onConfirm={confirmImport}
        onCancel={() => setPendingImport(null)}
      />
    </div>
  );
}

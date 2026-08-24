"use client";

import { Award, Lock, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { InstallSection } from "@/components/pwa/install-prompt";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/field";
import { ACHIEVEMENTS } from "@/lib/mock-data";
import { activityStreak, challengeStats, projectStats } from "@/lib/stats";
import { useApp } from "@/lib/store";
import { FOCUS_AREAS } from "@/lib/types";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AK";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function ProfilePage() {
  const { state, hydrated, updateProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  if (!hydrated) return null;

  const { profile } = state;
  const projects = projectStats(state);
  const challenges = challengeStats(state);
  const streak = activityStreak(state);
  const focusLabel = FOCUS_AREAS.find((f) => f.id === profile.focusArea)?.label ?? "Lainnya";

  const startEdit = () => {
    setName(profile.name);
    setUsername(profile.username);
    setBio(profile.bio);
    setEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: name.trim(), username: username.trim(), bio: bio.trim() });
    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pb-16 pt-8 md:px-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-line bg-accent text-xl font-bold text-accent-ink">
            {initials(profile.name)}
          </div>
          <div>
            <h1 className="text-display text-2xl">{profile.name || "Anak Kamar"}</h1>
            <p className="text-sm text-ink-subtle">@{profile.username || "anakkamar"}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={startEdit} aria-label="Edit profil">
          <Pencil className="size-4" aria-hidden />
        </Button>
      </div>

      {editing ? (
        <Card className="mt-5 animate-fade">
          <form onSubmit={save} className="space-y-4">
            <div>
              <Label htmlFor="p-name">Nama</Label>
              <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="p-username">Username</Label>
              <Input id="p-username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="p-bio">Bio singkat</Label>
              <Textarea id="p-bio" rows={2} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="accent" className="flex-1">
                Simpan
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditing(false)}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {profile.bio || `Lagi fokus di bagian ${focusLabel.toLowerCase()}.`}
        </p>
      )}

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="text-display text-2xl">{projects.selesai}</p>
          <p className="text-label mt-1 text-ink-subtle">Project selesai</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-display text-2xl">{challenges.selesai}</p>
          <p className="text-label mt-1 text-ink-subtle">Challenge selesai</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-display text-2xl">{streak}</p>
          <p className="text-label mt-1 text-ink-subtle">Streak hari</p>
        </Card>
      </div>

      <Link href="/progress" className="mt-3 block text-center text-sm font-semibold text-ink-muted hover:text-ink">
        Lihat progress lengkap →
      </Link>

      <div className="mt-8">
        <p className="text-label mb-3 flex items-center gap-1.5 text-ink-subtle">
          <Award className="size-3.5" aria-hidden />
          Achievement
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = state.unlockedAchievements.includes(a.id);
            return (
              <div
                key={a.id}
                className={cn(
                  "rounded-[var(--radius)] border-2 border-line p-3.5 text-center",
                  unlocked ? "bg-accent-soft" : "bg-canvas-alt opacity-60",
                )}
              >
                {!unlocked ? <Lock className="mx-auto mb-1.5 size-4 text-ink-subtle" aria-hidden /> : null}
                <p className="text-sm font-bold">{a.title}</p>
                <p className="mt-1 text-xs leading-snug text-ink-muted">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {state.projects.length > 0 ? (
        <div className="mt-8">
          <p className="text-label mb-3 text-ink-subtle">Project</p>
          <div className="space-y-2">
            {state.projects.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="flex items-center justify-between rounded-[var(--radius)] border-2 border-line-soft bg-surface px-4 py-3 text-sm font-medium"
              >
                {p.name}
                <span className="text-ink-subtle">{p.progress}%</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <Card className="mt-8">
        <InstallSection />
      </Card>
    </div>
  );
}

"use client";

import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Button, LinkButton } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/field";
import { CATEGORY_COLOR } from "@/lib/category";
import { FREE_PROJECT_LIMIT } from "@/lib/premium";
import { usePremium } from "@/lib/premium-context";
import { useApp } from "@/lib/store";
import { FOCUS_AREAS, type FocusArea } from "@/lib/types";
import { cn } from "@/lib/utils";

const DURATIONS = [7, 14, 30];

function NewProjectForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { createProject, state, hydrated } = useApp();
  const { isPlus } = usePremium();

  const [name, setName] = useState(params.get("name") ?? "");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<FocusArea>(
    (params.get("category") as FocusArea) || "lainnya",
  );
  const [target, setTarget] = useState(params.get("target") ?? "");
  const [durationDays, setDurationDays] = useState<number>(Number(params.get("days")) || 30);
  const [milestones, setMilestones] = useState<string[]>(() => {
    const fromParams = params.get("milestones");
    return fromParams ? fromParams.split("|") : ["", ""];
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama project nggak boleh kosong.");
      return;
    }
    const id = createProject({
      name: name.trim(),
      description: description.trim(),
      category,
      target: target.trim() || "Selesai dalam waktu yang ditentukan",
      durationDays,
      milestoneTitles: milestones,
    });
    router.push(`/projects/${id}`);
  };

  if (hydrated && !isPlus && state.projects.length >= FREE_PROJECT_LIMIT) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-16 pt-8 md:px-8 text-center">
        <p className="text-lg font-bold">Project gratis lo udah penuh ({FREE_PROJECT_LIMIT}/{FREE_PROJECT_LIMIT}).</p>
        <p className="mt-2 text-sm text-ink-muted">Upgrade ke Plus buat bikin project unlimited.</p>
        <LinkButton href="/plus" variant="accent" size="lg" className="mt-6">
          Lihat Anak Kamar Plus
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 pb-16 pt-8 md:px-8">
      <Link href="/projects" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden />
        Balik
      </Link>
      <h1 className="text-display text-3xl">Bikin project baru</h1>
      <p className="mt-1 text-ink-muted">Pecah goal lo jadi sesuatu yang bisa mulai dikerjain hari ini.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Label htmlFor="name">Nama project</Label>
          <Input
            id="name"
            placeholder="Misalnya: Belajar Photoshop"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FieldError>{error}</FieldError>
        </div>

        <div>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Ceritain dikit tentang project ini..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label>Kategori</Label>
          <div className="flex flex-wrap gap-2">
            {FOCUS_AREAS.map((area) => {
              const active = category === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setCategory(area.id)}
                  style={{ borderColor: active ? CATEGORY_COLOR[area.id] : undefined }}
                  className={cn(
                    "text-label press rounded-full border-2 border-line px-3 py-1.5",
                    active ? "bg-ink text-canvas" : "bg-surface",
                  )}
                >
                  {area.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="target">Target</Label>
          <Input
            id="target"
            placeholder="Misalnya: Bisa bikin poster sendiri"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        <div>
          <Label>Durasi</Label>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDurationDays(d)}
                className={cn(
                  "press flex-1 rounded-[var(--radius)] border-2 border-line py-2.5 text-sm font-semibold",
                  durationDays === d ? "bg-ink text-canvas" : "bg-surface",
                )}
              >
                {d} hari
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Milestones (opsional)</Label>
          {params.get("milestones") ? (
            <p className="mb-2 text-xs text-ink-subtle">
              Langkah ini udah kita siapin buat mulai. Edit atau tambah bebas sesuai kebutuhan lo.
            </p>
          ) : null}
          <div className="space-y-2">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder={`Langkah ${i + 1}`}
                  value={m}
                  onChange={(e) => {
                    const next = [...milestones];
                    next[i] = e.target.value;
                    setMilestones(next);
                  }}
                />
                {milestones.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => setMilestones(milestones.filter((_, idx) => idx !== i))}
                    className="press flex size-12 shrink-0 items-center justify-center rounded-[var(--radius)] border-2 border-line bg-surface"
                    aria-label="Hapus milestone"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMilestones([...milestones, ""])}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink"
          >
            <Plus className="size-4" aria-hidden />
            Tambah langkah
          </button>
        </div>

        <Button type="submit" variant="accent" size="lg" className="w-full">
          Mulai project
        </Button>
      </form>
    </div>
  );
}

export default function NewProjectPage() {
  return (
    <Suspense fallback={null}>
      <NewProjectForm />
    </Suspense>
  );
}

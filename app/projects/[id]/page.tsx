"use client";

import { ArrowLeft, Check, Lightbulb, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { CategoryBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { CATEGORY_COLOR } from "@/lib/category";
import { CATEGORY_TIPS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { PROJECT_STATUS_LABEL, type ProjectStatus } from "@/lib/types";
import { cn, formatDateID } from "@/lib/utils";

const STATUS_OPTIONS: ProjectStatus[] = ["belum-mulai", "berjalan", "berhenti-sementara", "selesai"];

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { state, hydrated, toggleMilestone, setProjectStatus, deleteProject } = useApp();

  if (!hydrated) return null;

  const project = state.projects.find((p) => p.id === params.id);
  if (!project) {
    return (
      <div className="mx-auto max-w-xl px-5 pt-16 text-center">
        <p className="text-lg font-bold">Project nggak ketemu.</p>
        <Link href="/projects" className="mt-3 inline-block text-sm font-semibold text-ink-muted hover:text-ink">
          Balik ke daftar project
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (!window.confirm(`Hapus project "${project.name}"? Ini nggak bisa dibatalin.`)) return;
    deleteProject(project.id);
    router.push("/projects");
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pb-16 pt-8 md:px-8">
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Balik
      </Link>

      <div className="flex items-start justify-between gap-3">
        <div>
          <CategoryBadge category={project.category} />
          <h1 className="text-display mt-3 text-3xl">{project.name}</h1>
        </div>
      </div>

      {project.description ? (
        <p className="mt-3 leading-relaxed text-ink-muted">{project.description}</p>
      ) : null}

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-label text-ink-subtle">Progress</p>
          <p className="text-lg font-bold">{project.progress}%</p>
        </div>
        <ProgressBar value={project.progress} color={CATEGORY_COLOR[project.category]} className="mt-2" />
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-ink-subtle">Target</p>
            <p className="mt-0.5 font-medium">{project.target}</p>
          </div>
          <div>
            <p className="text-ink-subtle">Deadline</p>
            <p className="mt-0.5 font-medium">{formatDateID(project.deadline)}</p>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <p className="text-label mb-2 text-ink-subtle">Status</p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setProjectStatus(project.id, s)}
              className={cn(
                "press rounded-full border-2 border-line px-3 py-1.5 text-sm font-semibold",
                project.status === s ? "bg-ink text-canvas" : "bg-surface",
              )}
            >
              {PROJECT_STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {project.milestones.length > 0 ? (
        <div className="mt-6">
          <p className="text-label mb-2 text-ink-subtle">Milestones</p>
          <Card className="divide-y-2 divide-line-soft p-0">
            {project.milestones.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMilestone(project.id, m.id)}
                className="press flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-[var(--radius)] border-2 border-line",
                    m.done ? "bg-positive text-accent-ink" : "bg-surface",
                  )}
                >
                  {m.done ? <Check className="size-3.5 animate-pop" aria-hidden /> : null}
                </span>
                <span className={cn("text-sm font-medium", m.done && "text-ink-subtle line-through")}>
                  {m.title}
                </span>
              </button>
            ))}
          </Card>
        </div>
      ) : null}

      <div className="mt-6">
        <p className="text-label mb-2 flex items-center gap-1.5 text-ink-subtle">
          <Lightbulb className="size-3.5" aria-hidden />
          Tips buat project ini
        </p>
        <Card className="space-y-2.5">
          {CATEGORY_TIPS[project.category].map((tip) => (
            <p key={tip} className="text-sm leading-relaxed text-ink-muted">
              {tip}
            </p>
          ))}
        </Card>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-critical"
      >
        <Trash2 className="size-4" aria-hidden />
        Hapus project
      </button>
    </div>
  );
}

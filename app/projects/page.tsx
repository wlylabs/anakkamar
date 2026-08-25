"use client";

import { ListChecks, Plus } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LimitBanner } from "@/components/plus/limit-banner";
import { ProgressBar } from "@/components/ui/progress";
import { CATEGORY_COLOR } from "@/lib/category";
import { FREE_PROJECT_LIMIT } from "@/lib/premium";
import { usePremium } from "@/lib/premium-context";
import { useApp } from "@/lib/store";
import { PROJECT_STATUS_LABEL, type ProjectStatus } from "@/lib/types";
import { formatDateID } from "@/lib/utils";

const ORDER: ProjectStatus[] = ["berjalan", "belum-mulai", "berhenti-sementara", "selesai"];

export default function ProjectsPage() {
  const { state, hydrated } = useApp();
  const { isPlus } = usePremium();
  if (!hydrated) return null;

  const atLimit = !isPlus && state.projects.length >= FREE_PROJECT_LIMIT;

  const groups = ORDER.map((status) => ({
    status,
    items: state.projects.filter((p) => p.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-8 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-display text-3xl">Project gue</h1>
          <p className="mt-1 text-ink-muted">Goal-goal kecil yang lagi lo kejar.</p>
        </div>
        <LinkButton
          href={atLimit ? "/plus" : "/projects/new"}
          size="sm"
          variant="accent"
          className="shrink-0"
        >
          <Plus className="size-4" aria-hidden />
          Project baru
        </LinkButton>
      </div>

      {atLimit ? (
        <LimitBanner used={state.projects.length} limit={FREE_PROJECT_LIMIT} itemLabel="project" />
      ) : null}

      {state.projects.length === 0 ? (
        <EmptyState
          icon={<ListChecks className="size-8" aria-hidden />}
          title="Belum ada project"
          description="Mulai dari satu hal kecil yang pengen lo capai — belajar skill baru, olahraga lagi, atau bikin karya."
          action={
            <LinkButton href="/projects/new" variant="accent" size="md">
              <Plus className="size-4" aria-hidden />
              Bikin project pertama
            </LinkButton>
          }
        />
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.status}>
              <p className="text-label mb-3 text-ink-subtle">
                {PROJECT_STATUS_LABEL[group.status]} ({group.items.length})
              </p>
              <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="paper block p-5"
                    style={{ "--stagger-index": i } as React.CSSProperties}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold tracking-tight">{p.name}</p>
                      <CategoryBadge category={p.category} />
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{p.description}</p>
                    <ProgressBar value={p.progress} color={CATEGORY_COLOR[p.category]} className="mt-4" size="sm" />
                    <div className="mt-2 flex items-center justify-between text-xs text-ink-subtle">
                      <span>{p.progress}% jalan</span>
                      <span>Target {formatDateID(p.deadline)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

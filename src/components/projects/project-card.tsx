import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

import type { Project } from "@/data/projects";
import StatusBadge from "@/components/ui/status-badge";
import CategoryIcon, { categoryLabel } from "@/components/ui/category-icon";
import TechLogos from "@/components/ui/tech-logos";
import { cn } from "@/lib/utils";

export default function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  // Compact projects have no case study, so the whole card points at the live
  // store instead of a page that would have nothing on it.
  const goesExternal = Boolean(project.compact && project.liveUrl);
  const href = goesExternal ? project.liveUrl! : `/projects/${project.slug}`;
  const overlay = "before:absolute before:inset-0 before:content-['']";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl",
        className
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-elevated">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // No screenshot yet — a themed placeholder rather than a broken image
          <div className="absolute inset-0 grid place-items-center bg-grid">
            <CategoryIcon
              category={project.category}
              className="h-10 w-10 opacity-40 transition-opacity duration-300 group-hover:opacity-80"
            />
          </div>
        )}

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/85 px-2.5 py-1 text-[11px] font-medium text-muted backdrop-blur-sm">
          <CategoryIcon category={project.category} className="h-3.5 w-3.5" />
          {categoryLabel[project.category]}
        </span>

        {project.status && (
          <StatusBadge
            status={project.status}
            className="absolute right-3 top-3"
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug tracking-tight">
            {goesExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={overlay}
              >
                {project.title}
              </a>
            ) : (
              <Link href={href} className={overlay}>
                {project.title}
              </Link>
            )}
          </h3>
          {goesExternal ? (
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-colors duration-300 group-hover:text-accent" />
          ) : (
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          )}
        </div>

        {project.client && (
          <p className="mt-1 text-xs text-accent">{project.client}</p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <TechLogos
          stack={project.stack}
          className="mt-5 text-muted transition-colors duration-300 group-hover:text-fg-soft"
        />

        {/* Footer links. A compact card is already a link to the live site, so
            it only needs a visual cue, not a second competing link. */}
        {goesExternal ? (
          <p className="mt-auto pt-6 text-xs font-medium text-muted">
            Visit live store
          </p>
        ) : (
          (project.liveUrl || project.codeUrl) && (
            <div className="relative z-10 mt-auto flex items-center gap-4 pt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live site
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              )}
            </div>
          )
        )}
      </div>
    </article>
  );
}

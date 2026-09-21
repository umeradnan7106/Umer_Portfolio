import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Check,
} from "lucide-react";

import {
  caseStudyProjects,
  categoryMeta,
  getProject,
  type Project,
} from "@/data/projects";
import CategoryIcon from "@/components/ui/category-icon";
import { getImageDimensions } from "@/lib/image-dimensions";
import Reveal from "@/components/ui/reveal";
import StatusBadge from "@/components/ui/status-badge";
import ButtonLink from "@/components/ui/button";
import Cta from "@/components/sections/cta";

const statusLabels: Record<NonNullable<Project["status"]>, string> = {
  completed: "Completed",
  "launching-soon": "Launching Soon",
  "in-progress": "In Progress",
};

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudyProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.compact) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.compact) notFound();

  // Neighbours within the same category, so "next" stays relevant
  const siblings = caseStudyProjects.filter(
    (p) => p.category === project.category
  );
  const index = siblings.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index < siblings.length - 1 ? siblings[index + 1] : null;

  const meta = [
    project.client && { label: "Client", value: project.client },
    project.role && { label: "Role", value: project.role },
    project.timeline && { label: "Timeline", value: project.timeline },
    { label: "Category", value: categoryMeta[project.category].label },
    project.status && {
      label: "Status",
      value: statusLabels[project.status],
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>

          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
                <CategoryIcon category={project.category} className="h-3.5 w-3.5 text-accent" />
                {categoryMeta[project.category].label}
              </span>
              {project.status && <StatusBadge status={project.status} />}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
              {project.summary}
            </p>

            {(project.liveUrl || project.codeUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <ButtonLink href={project.liveUrl} external>
                    <ExternalLink className="h-4 w-4" />
                    {/* A private app has no site of its own — the link goes to
                        the storefront page where it actually runs. */}
                    {project.category === "app"
                      ? "See it running live"
                      : "Visit live site"}
                  </ButtonLink>
                )}
                {project.codeUrl && (
                  <ButtonLink
                    href={project.codeUrl}
                    variant="secondary"
                    external
                  >
                    <Github className="h-4 w-4" />
                    View source
                  </ButtonLink>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        {/* ---------- Meta + stack ---------- */}
        <Reveal className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label} className="bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Tech stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ---------- Results ---------- */}
        {project.results && project.results.length > 0 && (
          <Reveal className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-accent/25 bg-line sm:grid-cols-3">
            {project.results.map((result) => (
              <div
                key={result.label}
                className="bg-accent-soft p-6 text-center"
              >
                <p className="text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                  {result.value}
                </p>
                <p className="mt-1.5 text-xs text-muted sm:text-sm">
                  {result.label}
                </p>
              </div>
            ))}
          </Reveal>
        )}

        {/* ---------- Narrative ---------- */}
        <div className="mt-16 space-y-14">
          {project.overview && (
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                {project.overview}
              </p>
            </Reveal>
          )}

          {(project.problem || project.solution) && (
            <Reveal className="grid gap-6 md:grid-cols-2">
              {project.problem && (
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="text-base font-semibold tracking-tight">
                    The problem
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                  <h2 className="text-base font-semibold tracking-tight">
                    The solution
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.solution}
                  </p>
                </div>
              )}
            </Reveal>
          )}

          {project.features && project.features.length > 0 && (
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight">
                What I built
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-fg-soft"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight">
                Challenges &amp; decisions
              </h2>
              <div className="mt-5 space-y-4">
                {project.challenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="rounded-2xl border border-line bg-surface p-6"
                  >
                    <h3 className="text-sm font-semibold">{challenge.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {challenge.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight">Screens</h2>

              {/* Masonry columns, because app screenshots arrive in whatever
                  shape the screen was — portrait panels, wide banners. Each
                  one renders at its real ratio instead of being cropped into
                  a fixed box. */}
              <div className="mt-5 gap-5 sm:columns-2 [&>figure]:mb-5 [&>figure]:break-inside-avoid">
                {project.gallery.map((shot) => {
                  const size = getImageDimensions(shot.src);

                  return (
                    <figure key={shot.src}>
                      <div className="overflow-hidden rounded-xl border border-line bg-elevated">
                        {size ? (
                          <Image
                            src={shot.src}
                            alt={shot.caption ?? `${project.title} screenshot`}
                            width={size.width}
                            height={size.height}
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="h-auto w-full"
                          />
                        ) : (
                          // Dimensions unreadable — fall back to a fixed box
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={shot.src}
                              alt={
                                shot.caption ?? `${project.title} screenshot`
                              }
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                      {shot.caption && (
                        <figcaption className="mt-2 text-xs text-muted">
                          {shot.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>

        {/* ---------- Prev / next ---------- */}
        {(prev || next) && (
          <nav className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </span>
                <p className="mt-2 text-sm font-medium transition-colors group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group rounded-2xl border border-line bg-surface p-5 text-right transition-colors hover:border-accent/40 sm:col-start-2"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <p className="mt-2 text-sm font-medium transition-colors group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </article>

      <Cta />
    </>
  );
}

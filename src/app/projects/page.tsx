import type { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";
import Reveal from "@/components/ui/reveal";
import CategoryIcon from "@/components/ui/category-icon";
import ProjectGallery from "@/components/projects/project-gallery";
import Cta from "@/components/sections/cta";
import {
  categoryMeta,
  projects,
  type ProjectCategory,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Shopify apps and storefronts, company full stack projects, and self-driven test builds — with a case study for each.",
  alternates: { canonical: "/projects" },
};

const order: ProjectCategory[] = ["app", "shopify", "fullstack", "test"];

const countIn = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category).length;

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work I've shipped"
        description="Grouped into the Shopify work and full stack projects I build at my company, and the test projects I build for myself. Every project opens into a full case study."
      />

      {/* Category overview */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {order.filter(countIn).map((key, index) => {
            const count = countIn(key);

            return (
              <Reveal
                key={key}
                delay={index * 0.08}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-elevated text-accent">
                    <CategoryIcon category={key} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-5 text-base font-semibold tracking-tight">
                  {categoryMeta[key].label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {categoryMeta[key].blurb}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Filterable grid */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <ProjectGallery />
      </section>

      <Cta />
    </>
  );
}

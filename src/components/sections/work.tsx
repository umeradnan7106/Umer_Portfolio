import { ArrowRight } from "lucide-react";

import { featuredProjects, projects } from "@/data/projects";
import ProjectCard from "@/components/projects/project-card";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import ButtonLink from "@/components/ui/button";

/**
 * Home page work section — featured projects only. The full, filterable
 * collection lives on /projects so the home page stays short.
 */
export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Selected work"
        title="Custom Shopify apps, stores and full stack products"
        description="A few projects I am happy to be judged on. Each one opens into a full case study."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <ButtonLink href="/projects" variant="secondary">
          Browse all {projects.length} projects
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </section>
  );
}

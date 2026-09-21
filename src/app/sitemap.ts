import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { caseStudyProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/about", "/services", "/projects", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const projectRoutes = caseStudyProjects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}

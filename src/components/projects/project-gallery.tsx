"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  categories,
  categoryMeta,
  projects as allProjects,
  sortForDisplay,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import ProjectCard from "./project-card";
import { cn } from "@/lib/utils";

type CategoryId = (typeof categories)[number]["id"];

const isCategoryId = (value: string | null): value is CategoryId =>
  categories.some((c) => c.id === value);

export default function ProjectGallery({
  projects = allProjects,
  /** Hide the tab bar when the list is already filtered by the caller */
  showFilter = true,
}: {
  projects?: Project[];
  showFilter?: boolean;
}) {
  // Starts at "all" so the server renders every card — good for crawlers and
  // for anyone whose JS hasn't run yet. A ?category= deep link is applied
  // after mount instead of via useSearchParams, which would force this whole
  // subtree to be client-rendered only.
  const [active, setActive] = useState<CategoryId>("all");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (isCategoryId(param)) setActive(param);
  }, []);

  const selectCategory = (id: CategoryId) => {
    setActive(id);
    // Keep the URL shareable without triggering a navigation
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(null, "", url);
  };

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const c of categories) {
      if (c.id === "all") continue;
      map[c.id] = projects.filter((p) => p.category === c.id).length;
    }
    return map;
  }, [projects]);

  // An empty tab reads as an unfinished portfolio, so categories with nothing
  // in them are hidden until they have a project.
  const visibleCategories = useMemo(
    () => categories.filter((c) => c.id === "all" || (counts[c.id] ?? 0) > 0),
    [counts]
  );

  const visible = useMemo(
    () =>
      sortForDisplay(
        active === "all"
          ? projects
          : projects.filter((p) => p.category === active)
      ),
    [active, projects]
  );

  const blurb =
    active !== "all" ? categoryMeta[active as ProjectCategory]?.blurb : null;

  return (
    <div>
      {showFilter && (
        <>
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-2"
          >
            {visibleCategories.map((category) => {
              const selected = active === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200",
                    selected
                      ? "border-accent bg-accent text-accent-contrast"
                      : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg"
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-px font-mono text-[10px]",
                      selected
                        ? "bg-black/15 text-accent-contrast"
                        : "bg-elevated text-muted"
                    )}
                  >
                    {counts[category.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {blurb && (
              <motion.p
                key={active}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-muted"
              >
                {blurb}
              </motion.p>
            )}
          </AnimatePresence>
        </>
      )}

      <motion.div
        layout
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showFilter ? "mt-10" : "mt-0"
        )}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}

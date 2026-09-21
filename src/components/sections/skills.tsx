import { Layout, Server, Database, Wrench, Plug } from "lucide-react";

import { skillGroups, type SkillGroup } from "@/data/skills";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { ShopifyLogo } from "@/components/ui/category-icon";

const icons: Record<SkillGroup["icon"], React.ElementType> = {
  layout: Layout,
  server: Server,
  shopify: ShopifyLogo,
  database: Database,
  wrench: Wrench,
  plug: Plug,
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Tech stack"
        title="What I build with"
        description="The tools I reach for day to day, grouped by where they sit in the stack."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon];

          return (
            <Reveal
              key={group.title}
              delay={index * 0.06}
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-elevated text-accent transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">
                  {group.title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs text-muted transition-colors group-hover:text-fg-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

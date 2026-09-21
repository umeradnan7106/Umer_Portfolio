import { Building2 } from "lucide-react";

import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Roles, responsibilities and the technology I shipped with."
        />

        <ol className="relative mx-auto mt-14 max-w-3xl">
          {/* Timeline rail */}
          <span
            className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-[19px]"
            aria-hidden
          />

          {experience.map((role, index) => (
            <Reveal
              as="li"
              key={`${role.company}-${role.start}`}
              delay={index * 0.08}
              className="relative pl-12 pb-12 last:pb-0 md:pl-16"
            >
              {/* Node */}
              <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg text-accent md:h-10 md:w-10">
                <Building2 className="h-4 w-4" />
              </span>

              <div className="rounded-2xl border border-line bg-bg p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {role.position}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{role.company}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-mono text-xs text-muted">
                      {role.start} — {role.end}
                    </p>
                    {role.location && (
                      <p className="mt-1 text-xs text-muted">{role.location}</p>
                    )}
                  </div>
                </div>

                {role.type && (
                  <span className="mt-3 inline-block rounded-full border border-line bg-elevated px-2.5 py-1 text-xs text-muted">
                    {role.type}
                  </span>
                )}

                {role.summary && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {role.summary}
                  </p>
                )}

                {role.highlights && role.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {role.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-fg-soft"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {role.stack && role.stack.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-elevated px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

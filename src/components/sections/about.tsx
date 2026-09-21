import { CheckCircle2, MapPin, Briefcase, GraduationCap, Quote } from "lucide-react";

import { site } from "@/data/site";
import { education } from "@/data/experience";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import ButtonLink from "@/components/ui/button";

const strengths = [
  "Every section and block built properly with its own settings — so your team can edit the store without me",
  "Custom Shopify apps on Gadget.dev when a theme genuinely cannot do the job",
  "Full stack MERN products — authentication, dashboards and APIs",
  "Store speed treated as a deliverable, not an afterthought",
];

const quickFacts = [
  { Icon: MapPin, label: "Based in", value: site.location },
  { Icon: Briefcase, label: "Experience", value: `${site.experienceYears} years` },
  { Icon: GraduationCap, label: "Focus", value: "Shopify + MERN" },
];

export default function About({ compact = false }: { compact?: boolean }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="About me"
        title="A developer who builds stores people can actually run"
        description="Shipping the feature is half the job. Leaving the client able to manage it themselves is the other half."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        {/* Narrative */}
        <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted">
          <p>
            I&apos;m {site.name}, a {site.role} based in {site.location}. I work
            full-time at Aheadtech360, where I write the development
            documentation before a project starts, work as the senior developer
            on the team, and build both Shopify stores and full stack products.
            Alongside that I take on freelance Shopify work of my own.
          </p>

          <p>
            When I joined Aheadtech360 there was no Shopify developer on the
            team at all. I started that capability from zero — and the stores I
            built then are still running today.
          </p>

          {/* The differentiator, in his own words */}
          <blockquote className="!mt-8 relative rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <Quote
              className="absolute right-5 top-5 h-8 w-8 text-accent/20"
              aria-hidden
            />
            <p className="relative text-[15px] leading-relaxed text-fg-soft">
              A lot of Shopify work gets done the lazy way — open the theme
              editor, drop in a custom Liquid block, paste the code there and
              call it finished. It is quick, and it leaves the client stuck:
              they can see the thing on their store but cannot edit a word of
              it themselves.
            </p>
            <p className="relative mt-4 text-[15px] leading-relaxed text-fg-soft">
              I build every section and block properly, with its own settings,
              so it behaves exactly like it shipped with the theme. That is the
              reason clients keep coming back to me — they get what they asked
              for, they get it quickly, and afterwards they can run their own
              store.
            </p>
          </blockquote>

          <ul className="!mt-8 space-y-3">
            {strengths.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
                <span className="text-fg-soft">{item}</span>
              </li>
            ))}
          </ul>

          {compact && (
            <div className="!mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/about">More about me</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          )}
        </Reveal>

        {/* Side panel */}
        <Reveal delay={0.1} className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="text-sm font-semibold">Quick facts</h3>
            <dl className="mt-4 space-y-4">
              {quickFacts.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-elevated text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="text-sm font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {!compact && education.length > 0 && (
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-sm font-semibold">Education</h3>
              <ul className="mt-4 space-y-5">
                {education.map((item) => (
                  <li key={item.institution}>
                    <p className="text-sm font-medium">{item.qualification}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.institution}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {item.start} — {item.end}
                    </p>
                    {item.detail && (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    )}
                    {item.courses && item.courses.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.courses.map((course) => (
                          <span
                            key={course}
                            className="rounded-md border border-line bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <h3 className="text-sm font-semibold">Currently</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Building Shopify stores and custom apps at Aheadtech360, and open
              to freelance projects alongside it.
            </p>
            <ButtonLink href="/contact" size="sm" className="mt-4">
              Start a conversation
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

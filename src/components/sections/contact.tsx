import { Mail, MapPin, Clock, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { SiWhatsapp, SiUpwork, SiFiverr } from "react-icons/si";

import { site } from "@/data/site";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import ContactForm from "./contact-form";

const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  `Hi ${site.name}, I found your portfolio and I'd like to discuss a project.`
)}`;

/** Direct channels, for people who would rather not use a form. */
const channels = [
  {
    label: "WhatsApp",
    value: "Fastest — usually a reply within hours",
    href: whatsappHref,
    Icon: SiWhatsapp,
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`,
    Icon: Mail,
    external: false,
  },
];

const profiles = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "Upwork", href: site.socials.upwork, Icon: SiUpwork },
  { label: "Fiverr", href: site.socials.fiverr, Icon: SiFiverr },
].filter((p) => Boolean(p.href));

const facts = [
  { Icon: MapPin, label: "Location", value: `${site.location} · Remote worldwide` },
  { Icon: Clock, label: "Response time", value: "Within 24 hours" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Tell me what you're building and what's in the way. I'll come back with an honest view on scope, timeline and cost."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* The form is the primary path */}
        <Reveal>
          <ContactForm />
        </Reveal>

        {/* Direct channels + details */}
        <Reveal delay={0.1} className="flex flex-col gap-4">
          {channels.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:border-accent/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-elevated text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{label}</p>
                <p className="mt-0.5 truncate text-sm text-muted">{value}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}

          <div className="rounded-2xl border border-line bg-surface p-5">
            <dl className="space-y-4">
              {facts.map(({ Icon, label, value }) => (
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
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-elevated">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                </span>
                <div>
                  <dt className="text-xs text-muted">Availability</dt>
                  <dd className="text-sm font-medium">
                    {site.availability.label}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="text-sm font-semibold">Find me elsewhere</h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {profiles.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-elevated px-3.5 py-2.5 text-sm transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

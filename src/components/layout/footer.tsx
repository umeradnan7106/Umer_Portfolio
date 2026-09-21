import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SiUpwork, SiFiverr, SiX } from "react-icons/si";

import { site, navItems } from "@/data/site";
import { categoryMeta, projects } from "@/data/projects";
import { hasResume } from "@/lib/resume";

const socialLinks = [
  { href: site.socials.github, label: "GitHub", Icon: Github },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.socials.upwork, label: "Upwork", Icon: SiUpwork },
  { href: site.socials.fiverr, label: "Fiverr", Icon: SiFiverr },
  { href: site.socials.x, label: "X", Icon: SiX },
].filter((s) => Boolean(s.href));

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-[13px] font-bold text-accent-contrast">
                {site.initials}
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                {site.name}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {site.location}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
              >
                <Mail className="h-3.5 w-3.5" />
                {site.email}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work categories */}
          <div>
            <h3 className="text-sm font-semibold">Work</h3>
            <ul className="mt-4 space-y-2.5">
              {/* Only link categories that actually have projects in them */}
              {(Object.keys(categoryMeta) as (keyof typeof categoryMeta)[])
                .filter((key) => projects.some((p) => p.category === key))
                .map((key) => (
                <li key={key}>
                  <Link
                    href={`/projects?category=${key}`}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {categoryMeta[key].label}
                  </Link>
                </li>
              ))}
              {hasResume() && (
              <li>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                >
                  Résumé
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

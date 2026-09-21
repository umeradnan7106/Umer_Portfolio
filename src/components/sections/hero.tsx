"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  MapPin,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiShopify,
  SiSupabase,
  SiGraphql,
  SiTailwindcss,
  SiJavascript,
  SiGit,
} from "react-icons/si";

import { site, stats } from "@/data/site";
import { getProject, type Project } from "@/data/projects";
import ButtonLink from "@/components/ui/button";
import HeroDeck from "./hero-deck";

const techLogos = [
  { Icon: SiShopify, name: "Shopify" },
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiExpress, name: "Express" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiSupabase, name: "Supabase" },
  { Icon: SiGraphql, name: "GraphQL" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiGit, name: "Git" },
];

/**
 * The work shown in the hero, back to front. One of each kind — a store, a
 * full stack platform, and the custom app in front — so the first screen
 * shows range with real screenshots instead of claims.
 */
const DECK = ["tshirt-corner", "afblanks", "ezprintpros-app"]
  .map(getProject)
  .filter((p): p is Project => Boolean(p?.cover));

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero({ hasResume = false }: { hasResume?: boolean }) {
  // With reduced motion on, render the final state straight away rather than
  // fading and sliding everything in.
  const still = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      {/* Background grid, faded at the edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-60"
        aria-hidden
      />
      {/* Accent glow sitting behind the work, not the text */}
      <div
        className="pointer-events-none absolute right-[-10%] top-10 h-[520px] w-[620px] rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* ---------- Text ---------- */}
          <motion.div
            initial={still ? false : "hidden"}
            animate="show"
            transition={{ staggerChildren: 0.08 }}
            className="text-center lg:text-left"
          >
            {site.availability.open && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {site.availability.label}
              </motion.div>
            )}

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-7 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.1rem]"
            >
              Shopify apps &amp; stores,{" "}
              <span className="text-gradient">built properly.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-[17px] lg:mx-0"
            >
              I&apos;m <span className="font-medium text-fg">{site.name}</span>,
              a Shopify &amp; MERN stack developer at Aheadtech360. I build embedded apps for what themes can&apos;t
              do, storefronts where every section is editable, and full stack
              products on Next.js and Node.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <ButtonLink href="/projects">
                View my work
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Let&apos;s work together
              </ButtonLink>
            </motion.div>

            {/* Quiet meta row — location and profiles without a row of icon
                buttons competing with the two calls to action above */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {site.location}
              </span>
              {[
                { label: "GitHub", href: site.socials.github },
                { label: "LinkedIn", href: site.socials.linkedin },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-fg"
                >
                  {label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
              {hasResume && (
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
                >
                  <Download className="h-3.5 w-3.5" />
                  CV
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ---------- Work deck ---------- */}
          {DECK.length > 0 && (
            <motion.div
              initial={still ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <HeroDeck projects={DECK} />
            </motion.div>
          )}
        </div>

        {/* ---------- Stats ---------- */}
        <motion.dl
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs text-muted sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* ---------- Tech marquee ---------- */}
      <div className="relative mt-16">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted">
          The stack I ship with
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...techLogos, ...techLogos].map(({ Icon, name }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-fg"
                aria-hidden={i >= techLogos.length}
              >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="whitespace-nowrap text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

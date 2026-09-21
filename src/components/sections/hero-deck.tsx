"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/data/projects";
import CategoryIcon from "@/components/ui/category-icon";
import { cn } from "@/lib/utils";

/**
 * Where a card sits, by its place in the stack (0 = front). Only classes
 * change when the order changes, so the CSS transition does the animating.
 */
const POSITIONS = [
  "z-30 bottom-0 left-0 group-hover:-translate-y-1 after:bg-transparent",
  "z-20 bottom-[10.5%] left-[9%] group-hover:bottom-[12.5%] group-hover:left-[10.5%] after:bg-bg/15 cursor-pointer hover:border-accent/50",
  "z-10 bottom-[21%] left-[18%] group-hover:bottom-[25%] group-hover:left-[21%] after:bg-bg/40 cursor-pointer hover:border-accent/50",
];

/** Horizontal travel, in px, before a touch counts as a swipe. */
const SWIPE = 40;

/**
 * A stack of project screenshots. Click a card behind to bring it forward,
 * swipe left or right on touch screens, or use the dots. The label under the
 * stack always names the front project and links to its case study.
 *
 * `projects` is ordered back to front; the last one starts in front.
 */
export default function HeroDeck({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const [active, setActive] = useState(n - 1);

  const touch = useRef<{ x: number; y: number } | null>(null);
  // A swipe ends with a tap on whichever card is under the finger; ignore it
  const justSwiped = useRef(false);

  // 0 = front. Counting down from `active` keeps the original back-to-front
  // order, so the card just behind the front one is always next in line.
  const place = (i: number) => (active - i + n) % n;
  const next = () => setActive((a) => (a - 1 + n) % n);
  const prev = () => setActive((a) => (a + 1) % n);

  const front = projects[active];

  return (
    <div
      className="group relative mx-auto aspect-[3/2] w-full max-w-lg select-none lg:max-w-none"
      // Let the browser keep vertical scrolling; horizontal moves come to us
      style={{ touchAction: "pan-y" }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy) * 1.2) {
          justSwiped.current = true;
          if (dx < 0) next();
          else prev();
          setTimeout(() => (justSwiped.current = false), 350);
        }
      }}
    >
      {projects.map((project, i) => {
        const at = place(i);
        const isFront = at === 0;

        return (
          <div
            key={project.slug}
            role={isFront ? "img" : "button"}
            aria-label={
              isFront
                ? `${project.title} screenshot`
                : `Bring ${project.title} to the front`
            }
            // The dots are the keyboard route; cards stay out of the tab order
            tabIndex={-1}
            onClick={() => {
              if (!isFront && !justSwiped.current) setActive(i);
            }}
            className={cn(
              "absolute aspect-[16/10] w-[82%] overflow-hidden rounded-2xl border border-line bg-elevated",
              "shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out",
              // Dimming overlay pushes the cards behind into depth
              "after:pointer-events-none after:absolute after:inset-0 after:transition-colors after:duration-500",
              POSITIONS[at] ?? POSITIONS[POSITIONS.length - 1]
            )}
          >
            <Image
              src={project.cover!}
              alt=""
              fill
              priority
              draggable={false}
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
        );
      })}

      {/* The label is the way into the case study for whatever is in front */}
      <Link
        href={`/projects/${front.slug}`}
        className="group/label absolute -bottom-5 left-4 z-40 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface/95 py-2.5 pl-2.5 pr-4 shadow-xl backdrop-blur-sm transition-colors hover:border-accent/50 sm:left-6"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-elevated">
          <CategoryIcon category={front.category} className="h-[18px] w-[18px]" />
        </span>
        <span className="text-left" aria-live="polite">
          <span className="block text-sm font-semibold leading-tight">
            {front.title}
          </span>
          <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-accent">
            View case study
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover/label:-translate-y-0.5 group-hover/label:translate-x-0.5" />
          </span>
        </span>
      </Link>

      {/* Dots: shows there is more than one, and the keyboard way through */}
      <div className="absolute -bottom-2 right-4 z-40 flex items-center gap-1.5 sm:right-6">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`Show ${project.title}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active
                ? "w-5 bg-accent"
                : "w-2 bg-line-strong hover:bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}

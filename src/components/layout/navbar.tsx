"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-[13px] font-bold tracking-tight text-accent-contrast transition-transform duration-200 group-hover:scale-105">
              {site.initials}
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
              {site.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive(item.path)
                      ? "text-fg"
                      : "text-muted hover:text-fg"
                  )}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover sm:inline-flex"
            >
              {/* The full phrase crowds the nav links between md and lg */}
              <span className="lg:hidden">Let&apos;s talk</span>
              <span className="hidden lg:inline">Let&apos;s work together</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        className={cn(
          "fixed inset-x-4 top-20 z-50 origin-top rounded-2xl border border-line bg-surface p-3 shadow-2xl transition-all duration-300 md:hidden",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-95 opacity-0"
        )}
      >
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-colors",
                  isActive(item.path)
                    ? "bg-elevated font-medium text-fg"
                    : "text-muted hover:bg-elevated hover:text-fg"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-2 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-medium text-accent-contrast"
        >
          Let&apos;s work together
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

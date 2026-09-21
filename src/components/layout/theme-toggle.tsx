"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        ready
          ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          : "Toggle colour theme"
      }
      title={ready ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : undefined}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border border-line",
        "bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg",
        className
      )}
    >
      {/* Both icons are always rendered and cross-faded, so the button does
          not shift or pop while the theme is being resolved. */}
      <Sun
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          theme === "dark"
            ? "scale-50 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 -rotate-90 opacity-0"
        )}
      />
    </button>
  );
}

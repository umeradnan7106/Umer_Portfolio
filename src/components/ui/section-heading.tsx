import { cn } from "@/lib/utils";
import Reveal from "./reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-2.5",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-accent" aria-hidden />
          <span className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted text-pretty">
          {description}
        </p>
      )}
    </Reveal>
  );
}

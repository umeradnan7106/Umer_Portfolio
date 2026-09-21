import { CheckCircle2, Loader, Rocket } from "lucide-react";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Status = NonNullable<Project["status"]>;

const config: Record<
  Status,
  { label: string; Icon: React.ElementType; className: string }
> = {
  completed: {
    label: "Completed",
    Icon: CheckCircle2,
    className: "border-accent/40 text-accent",
  },
  "launching-soon": {
    label: "Launching Soon",
    Icon: Rocket,
    // Build is done — this should read as anticipation, not as unfinished work
    className:
      "border-sky-500/40 text-sky-600 dark:border-sky-400/40 dark:text-sky-400",
  },
  "in-progress": {
    label: "In Progress",
    Icon: Loader,
    // Amber reads as "not finished" without competing with the accent colour
    className:
      "border-amber-500/40 text-amber-600 dark:border-amber-400/40 dark:text-amber-400",
  },
};

export default function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const { label, Icon, className: tone } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-bg/85 px-2.5 py-1",
        "text-[11px] font-medium backdrop-blur-sm",
        tone,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

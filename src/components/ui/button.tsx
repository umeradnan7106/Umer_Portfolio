import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-200 whitespace-nowrap disabled:opacity-50 " +
  "disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast hover:bg-accent-hover " +
    "shadow-sm hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "border border-line bg-surface text-fg hover:border-line-strong " +
    "hover:bg-elevated hover:-translate-y-0.5",
  ghost: "text-muted hover:text-fg hover:bg-elevated",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm sm:text-[15px]",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab with the right rel attributes */
  external?: boolean;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: Props) {
  const classes = buttonClass(variant, size, className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

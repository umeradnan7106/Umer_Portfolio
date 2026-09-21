import Reveal from "./reveal";

/** Consistent hero band for every sub-page. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-60"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
              {description}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

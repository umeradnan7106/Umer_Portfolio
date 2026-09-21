import { ArrowLeft } from "lucide-react";
import ButtonLink from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5">
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-60"
        aria-hidden
      />
      <div className="relative text-center">
        <p className="font-mono text-sm tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          The link may be outdated, or the project you&apos;re looking for has
          moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Browse work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

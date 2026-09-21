import { process } from "@/data/services";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

export default function Process() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="How I work"
        title="A process you can actually follow"
        description="No black boxes. You know what is being built, why, and what comes next."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, index) => (
          <Reveal
            key={step.step}
            delay={index * 0.08}
            className="relative bg-surface p-7"
          >
            <span className="font-mono text-sm text-accent">{step.step}</span>
            <h3 className="mt-3 text-base font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { ArrowRight, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import { site } from "@/data/site";
import Reveal from "@/components/ui/reveal";
import ButtonLink from "@/components/ui/button";

const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  `Hi ${site.name}, I found your portfolio and I'd like to discuss a project.`
)}`;

export default function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-[0.15] blur-[100px]"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Have a Shopify app or product idea in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty">
            Whether it&apos;s a store that needs to convert better or an
            application that needs building from scratch — let&apos;s scope it
            out together.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={whatsappHref} variant="secondary" external>
              <SiWhatsapp className="h-4 w-4" />
              WhatsApp me
            </ButtonLink>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

import {
  Layers,
  Server,
  Gauge,
  Wrench,
  Check,
} from "lucide-react";

import { services, type Service } from "@/data/services";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { ShopifyLogo } from "@/components/ui/category-icon";

const icons: Record<Service["icon"], React.ElementType> = {
  shopify: ShopifyLogo,
  layers: Layers,
  server: Server,
  gauge: Gauge,
  wrench: Wrench,
};

export default function Services() {
  return (
    <section
      id="services"
      className="border-y border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What I can do for you"
          description="From a single Shopify section to a complete product build — here is where I add the most value."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];

            return (
              <Reveal
                key={service.title}
                delay={index * 0.06}
                className="group relative flex flex-col rounded-2xl border border-line bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-elevated text-accent transition-colors duration-300 group-hover:border-accent/40">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-fg-soft"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

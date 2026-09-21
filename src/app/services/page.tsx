import type { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";
import Services from "@/components/sections/services";
import Process from "@/components/sections/process";
import Cta from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Shopify app development, custom themes and headless storefronts, MERN stack applications, API engineering, and performance work.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Shopify apps, storefronts and full stack products"
        description="Everything I offer, from a single custom section to a complete application built and deployed end to end."
      />
      <Services />
      <Process />
      <Cta />
    </>
  );
}

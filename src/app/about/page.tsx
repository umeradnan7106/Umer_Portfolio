import type { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import Cta from "@/components/sections/cta";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role} with ${site.experienceYears} years building Shopify apps, storefronts and MERN stack applications.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title={`${site.name} — ${site.role}`}
        description={site.tagline}
      />
      <About />
      <Experience />
      <Skills />
      <Cta />
    </>
  );
}

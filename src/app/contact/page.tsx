import type { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";
import Contact from "@/components/sections/contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} for Shopify app development, store builds and MERN stack projects.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's work together"
        description="Send a message below, or reach me directly on WhatsApp or email — either way you'll hear back within a day."
      />
      <Contact />
    </>
  );
}

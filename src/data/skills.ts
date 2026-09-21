/* -------------------------------------------------------------------------
 * SKILLS
 * Grouped by discipline. No percentage bars — recruiters read those as noise,
 * a grouped stack list reads as real capability.
 *
 * Rule for this file: only list what you have actually shipped with. An
 * interviewer will ask about anything here.
 * ---------------------------------------------------------------------- */

export type SkillGroup = {
  title: string;
  /** lucide-react icon name, resolved in the Skills component */
  icon: "layout" | "server" | "shopify" | "database" | "wrench" | "plug";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "layout",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5 & CSS3",
      "Responsive UI",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    items: [
      "Node.js",
      "Express.js",
      "Fastify",
      "REST APIs",
      "GraphQL",
      "Authentication & OAuth",
      "Webhooks",
      "Stripe",
    ],
  },
  {
    title: "Shopify Development",
    icon: "shopify",
    items: [
      "Custom Theme Development",
      "Liquid",
      "Online Store 2.0",
      "Horizon Theme",
      "Custom Sections & Schema",
      "Metafields",
      "Embedded Shopify App Development",
      "Gadget.dev",
      "Shopify Polaris",
      "Shopify Admin API",
      "Store Speed Optimisation",
    ],
  },
  {
    title: "Apps & Integrations",
    icon: "plug",
    items: [
      "Stripe",
      "QuickBooks",
      "Shippo",
      "GoHighLevel",
      "Resend",
      "ZipTax",
      "Judge.me",
      "Omnisend",
      "Easify Product Options",
      "Whatflow (WhatsApp)",
      "Microsoft Clarity",
      "remove.bg",
    ],
  },
  {
    title: "Databases",
    icon: "database",
    items: [
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Mongoose",
      "Sanity CMS",
      "Supabase Storage",
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "wrench",
    items: [
      "Git & GitHub",
      "Vercel",
      "Railway",
      "Postman",
      "Shopify CLI",
      "Figma to Code",
      "Performance & SEO",
    ],
  },
];

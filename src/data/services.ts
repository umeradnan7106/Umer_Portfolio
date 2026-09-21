/* -------------------------------------------------------------------------
 * SERVICES + PROCESS
 * ---------------------------------------------------------------------- */

export type Service = {
  title: string;
  description: string;
  /** lucide-react icon name, resolved in the Services component */
  icon: "shopify" | "layers" | "server" | "gauge" | "wrench";
  points: string[];
};

export const services: Service[] = [
  {
    title: "Shopify App Development",
    icon: "shopify",
    description:
      "Embedded Shopify apps for the things a theme cannot do — product configurators, pricing logic Shopify has no variant for, file uploads and real admin tooling. Built on Gadget.dev with React and Polaris.",
    points: [
      "Product configurators with dynamic, calculated pricing",
      "File upload, image processing and durable artwork storage",
      "Shopify data sync, webhooks and external database integration",
      "Private apps built for a single store",
    ],
  },
  {
    title: "Shopify Store & Theme Development",
    icon: "shopify",
    description:
      "Conversion-focused storefronts — custom Online Store 2.0 themes, section building, and rescuing stores that a previous developer broke.",
    points: [
      "Custom Online Store 2.0 sections",
      "Liquid theme customisation & migration",
      "Repairing and migrating broken themes",
      "Speed and Core Web Vitals tuning",
    ],
  },
  {
    title: "MERN Stack Development",
    icon: "layers",
    description:
      "End-to-end web applications on MongoDB, Express, React and Node — from data model to deployed product.",
    points: [
      "Authentication and role-based access",
      "Admin dashboards and analytics",
      "Payments with Stripe",
      "Real-time features with Socket.IO",
    ],
  },
  {
    title: "API & Backend Engineering",
    icon: "server",
    description:
      "Secure, documented REST and GraphQL APIs plus the third-party integrations your product depends on.",
    points: [
      "REST & GraphQL API design",
      "Third-party API integration",
      "Database modelling and indexing",
      "Background jobs and webhooks",
    ],
  },
  {
    title: "Performance & SEO",
    icon: "gauge",
    description:
      "Making existing sites measurably faster and easier to find, with the numbers to prove it.",
    points: [
      "Core Web Vitals optimisation",
      "Bundle and image optimisation",
      "Technical SEO and structured data",
      "Accessibility (WCAG) fixes",
    ],
  },
  {
    title: "Maintenance & Support",
    icon: "wrench",
    description:
      "Ongoing development, bug fixing and feature work for live stores and applications.",
    points: [
      "Bug fixing and hotfixes",
      "Feature development sprints",
      "Dependency and security updates",
      "Monitoring and uptime support",
    ],
  },
];

export type ProcessStep = { step: string; title: string; description: string };

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We talk through the goal, the users and the constraints, so the scope is clear before a line of code is written.",
  },
  {
    step: "02",
    title: "Architecture",
    description:
      "I map the data model, the stack and the milestones, then share a plan you can actually review.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Development in short, visible increments — you see working software every few days, not at the end.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Testing, performance tuning, deployment, and a hand-off with documentation plus ongoing support.",
  },
];

import type { IconType } from "react-icons";
import {
  SiShopify,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiFastify,
  SiStripe,
  SiQuickbooks,
  SiRailway,
  SiVercel,
  SiSanity,
  SiResend,
  SiTailwindcss,
  SiGraphql,
  SiRedis,
  SiPrisma,
  SiSocketdotio,
  SiCloudinary,
} from "react-icons/si";

import { cn } from "@/lib/utils";

/**
 * Stack names as written in projects.ts -> the brand logo.
 * Anything without an official logo (Liquid, Gadget.dev, Horizon Theme, ...)
 * is simply left off the card; the case-study page still lists it in text.
 */
const LOGOS: Record<string, { Icon: IconType; name: string }> = {
  shopify: { Icon: SiShopify, name: "Shopify" },
  "shopify polaris": { Icon: SiShopify, name: "Shopify" },
  "shopify admin api": { Icon: SiShopify, name: "Shopify" },
  react: { Icon: SiReact, name: "React" },
  "next.js": { Icon: SiNextdotjs, name: "Next.js" },
  typescript: { Icon: SiTypescript, name: "TypeScript" },
  javascript: { Icon: SiJavascript, name: "JavaScript" },
  css: { Icon: SiCss3, name: "CSS" },
  "node.js": { Icon: SiNodedotjs, name: "Node.js" },
  express: { Icon: SiExpress, name: "Express" },
  "express.js": { Icon: SiExpress, name: "Express" },
  mongodb: { Icon: SiMongodb, name: "MongoDB" },
  postgresql: { Icon: SiPostgresql, name: "PostgreSQL" },
  supabase: { Icon: SiSupabase, name: "Supabase" },
  fastify: { Icon: SiFastify, name: "Fastify" },
  stripe: { Icon: SiStripe, name: "Stripe" },
  quickbooks: { Icon: SiQuickbooks, name: "QuickBooks" },
  railway: { Icon: SiRailway, name: "Railway" },
  vercel: { Icon: SiVercel, name: "Vercel" },
  "sanity cms": { Icon: SiSanity, name: "Sanity" },
  resend: { Icon: SiResend, name: "Resend" },
  "tailwind css": { Icon: SiTailwindcss, name: "Tailwind CSS" },
  graphql: { Icon: SiGraphql, name: "GraphQL" },
  redis: { Icon: SiRedis, name: "Redis" },
  prisma: { Icon: SiPrisma, name: "Prisma" },
  "socket.io": { Icon: SiSocketdotio, name: "Socket.IO" },
  cloudinary: { Icon: SiCloudinary, name: "Cloudinary" },
};

/** Map a stack to unique logos, in stack order. */
export function stackLogos(stack: string[]) {
  const seen = new Set<string>();
  const out: { Icon: IconType; name: string }[] = [];
  for (const item of stack) {
    const logo = LOGOS[item.trim().toLowerCase()];
    if (logo && !seen.has(logo.name)) {
      seen.add(logo.name);
      out.push(logo);
    }
  }
  return out;
}

/** A row of tech logos with screen-reader names, in place of text tags. */
export default function TechLogos({
  stack,
  max = 6,
  className,
}: {
  stack: string[];
  max?: number;
  className?: string;
}) {
  const logos = stackLogos(stack).slice(0, max);
  if (logos.length === 0) return null;

  return (
    <ul
      aria-label="Built with"
      className={cn("flex flex-wrap items-center gap-3.5", className)}
    >
      {logos.map(({ Icon, name }) => (
        <li key={name} className="flex">
          <Icon aria-hidden className="h-[18px] w-[18px]" />
          <span className="sr-only">{name}</span>
        </li>
      ))}
    </ul>
  );
}

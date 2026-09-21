import { Layers, FlaskConical } from "lucide-react";
import { SiShopify } from "react-icons/si";

import type { ProjectCategory } from "@/data/projects";

/** Shopify's own brand green, so the mark reads as the real logo. */
export const SHOPIFY_GREEN = "#95BF47";

export const categoryLabel: Record<ProjectCategory, string> = {
  app: "Shopify App",
  shopify: "Shopify Store",
  fullstack: "Full Stack",
  test: "Test Project",
};

/**
 * The one place a project category becomes an icon. Shopify work uses the
 * real Shopify logo in its brand colour; the other categories have no single
 * brand to show, so they keep a neutral icon.
 */
export default function CategoryIcon({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  if (category === "app" || category === "shopify") {
    // Inline colour so it wins over any text-* class the caller passes
    return (
      <SiShopify
        aria-hidden
        className={className}
        style={{ color: SHOPIFY_GREEN }}
      />
    );
  }
  const Icon = category === "fullstack" ? Layers : FlaskConical;
  return <Icon aria-hidden className={className} />;
}

/** Drop-in for icon maps: the Shopify logo in its brand colour. */
export function ShopifyLogo({ className }: { className?: string }) {
  return (
    <SiShopify aria-hidden className={className} style={{ color: SHOPIFY_GREEN }} />
  );
}

/* -------------------------------------------------------------------------
 * PROJECTS
 * Add / edit projects here. Each project automatically gets:
 *   - a card on /projects (filtered by `category`)
 *   - its own case-study page at /projects/<slug>
 *
 * Set `compact: true` for a project you do not want to write a full case
 * study for. Its card then links straight to the live site and no detail page
 * is generated — better than a case-study page with nothing on it.
 *
 * Set `featured: true` for the handful shown on the home page.
 * ---------------------------------------------------------------------- */

export type ProjectCategory = "app" | "shopify" | "fullstack" | "test";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One line shown on the card */
  summary: string;
  /** Company / client name — omit for your own freelance work */
  client?: string;
  role?: string;
  /** e.g. "Jan 2025 — Mar 2025" */
  timeline?: string;
  /** Tech shown as tags on the card */
  stack: string[];
  /**
   * Shown as a badge on the card and case study.
   * "launching-soon" = build finished, waiting on something outside the code.
   */
  status?: "completed" | "launching-soon" | "in-progress";
  /** Shown on the home page */
  featured?: boolean;
  /** No case-study page; the card links to liveUrl instead */
  compact?: boolean;
  liveUrl?: string;
  codeUrl?: string;
  /** Path under /public, e.g. "/projects/my-app/cover.png" */
  cover?: string;

  /* ---- case-study page fields (all optional) ---- */
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: { title: string; body: string }[];
  /** Outcome metrics — shown as a highlight row */
  results?: { value: string; label: string }[];
  gallery?: { src: string; caption?: string }[];
};

export const categories = [
  { id: "all", label: "All Work" },
  { id: "app", label: "Shopify Apps" },
  { id: "shopify", label: "Shopify Stores" },
  { id: "fullstack", label: "Full Stack" },
  { id: "test", label: "Test Projects" },
] as const;

export const categoryMeta: Record<
  ProjectCategory,
  { label: string; blurb: string }
> = {
  app: {
    label: "Shopify Apps",
    blurb:
      "Private Shopify apps for the things a theme genuinely cannot do — product configurators with their own pricing logic and data behind them.",
  },
  shopify: {
    label: "Shopify Stores",
    blurb:
      "Storefronts built from scratch — custom themes, custom sections and product experiences the client can actually edit themselves.",
  },
  fullstack: {
    label: "Full Stack Projects",
    blurb:
      "Next.js and MERN products built at Aheadtech360 — from data model and CMS through to deployed application.",
  },
  test: {
    label: "Test & Practice Projects",
    blurb:
      "Self-driven builds where I explore new tools, patterns and APIs outside of client work.",
  },
};

/**
 * Most of the company stores were the same job: a standard storefront build
 * turned around in two to three days. One honest line shared between them
 * beats padding each card with something that did not happen.
 */
const STANDARD_STORE_SUMMARY =
  "A standard Shopify storefront build — theme setup, custom sections and product pages, turned around in two to three days.";

export const projects: Project[] = [
  /* =====================================================================
   * 1. SHOPIFY APPS
   * The strongest work — custom apps, not theme edits.
   * ================================================================== */
  {
    slug: "deluxe-lens-configurator",
    title: "Deluxe Lens Configurator",
    category: "app",
    role: "Shopify App Developer",
    status: "in-progress",
    timeline: "2 weeks so far",
    summary:
      "A private Shopify app that lets each customer configure their own prescription lenses instead of picking from fixed products at fixed prices.",
    cover: "/projects/deluxe-lens-configurator/cover.webp",
    stack: ["Gadget.dev", "React", "Supabase", "Shopify"],
    liveUrl: "",
    overview:
      "A private Shopify app built for Deluxe Optical Service, one of my own freelance clients. The storefront is a separate project; this is the piece of engineering that makes the business model possible. Development is paused for now.",
    problem:
      "Eyewear is not a fixed-catalogue product. A customer needs to choose their own lens options, and the price depends on the combination they pick. A standard Shopify product with preset variants and a preset price cannot express that — the store would have needed a separate product for every possible combination.",
    solution:
      "I built a private Shopify app on Gadget.dev with a React front end, so the customer is given real options and configures their own lenses rather than choosing from a fixed list at a fixed rate. I wired up the app connections, modelled the data, and connected Supabase for the configuration data behind the selections.",
    features: [
      "Custom lens configurator — the customer selects their own options",
      "Pricing driven by the configuration rather than fixed variants",
      "Built on Gadget.dev with a React front end",
      "Supabase connected for configuration and option data",
      "Shopify store connections and data model set up from scratch",
    ],
    gallery: [
      // { src: "/projects/deluxe-lens-configurator/1.png", caption: "Configurator" },
    ],
  },
  {
    slug: "ezprintpros-app",
    title: "EZPrintPros App",
    category: "app",
    client: "Aheadtech360",
    role: "Shopify App Developer",
    status: "completed",
    featured: true,
    timeline: "1 month",
    summary:
      "An embedded Shopify app for bulk custom-print bundle ordering — a four-step customiser with artwork upload, live DPI validation and pricing Shopify cannot express on its own.",
    stack: [
      "Gadget.dev",
      "React",
      "TypeScript",
      "Shopify Polaris",
      "Shopify Admin API",
      "Fastify",
      "PostgreSQL",
      "Supabase",
    ],
    // The app itself is private; this is the product page it runs on
    liveUrl:
      "https://ezdtfmaker.com/products/dtf-specific-blank-50-50-t-shirts-lypromo-12-pack",
    cover: "/projects/ezprintpros-app/cover.webp",
    overview:
      "A private embedded Shopify app built for EZDTFMaker at Aheadtech360. A customer buys a bundle — 12, 25, 50 or 100 shirts — and the app walks them through configuring the whole order in a popup on the storefront. The admin half runs inside Shopify itself, so staff never leave the platform they already work in.",
    problem:
      "None of this fits in a theme. The price is a function of the quantity tier, how many print locations were chosen, the artwork size and an optional design-help fee — and Shopify always charges whatever price the variant itself carries. Creating a variant for every combination is not possible. On top of that the flow needs file upload, image processing, variants pulled from other products entirely, a real configuration screen for the merchant, and production data on the order that Shopify's own order page cannot show.",
    solution:
      "I built it as an embedded app on Gadget.dev — React and TypeScript on the front, Node and Fastify routes on the back, Polaris for the admin UI so it looks native inside Shopify. For pricing I keep a pool of hidden variants and set the price on one through the Shopify Admin API immediately before it goes in the cart, which is something a theme can never do from the browser. Artwork lives in Supabase Storage with its own Postgres alongside Gadget's, so customer designs are kept separate from synced Shopify data.",
    features: [
      "Four-step customiser: print location, artwork, colours and sizes, review",
      "Print location picker with sub-locations, each with its own size and price",
      "Artwork upload with crop, resize and a live DPI check for print-readiness",
      "Option to send artwork later, or buy design help as a paid add-on",
      "Split one bundle across multiple colours and sizes, including Adults, Youth and Toddler",
      "Smart Distribute — auto-fills unassigned pieces across colours on a bell curve or an even split, skipping sold-out sizes",
      "Live quantity-tier prompt showing what to add to reach the next price per piece",
      "Per-size print dimensions with upcharges shown against the sizes that carry them",
      "Print Settings admin: print areas, sub-location pricing, combos and per-brand colour and size availability",
      "Orders admin showing artwork, DPI, print dimensions and a full pricing breakdown",
      "Staff image tools — resolution enhance, background removal and crop, saved to the order without ever destroying the original",
      "Separate development and production environments, each with its own database",
    ],
    challenges: [
      {
        title: "Charging a price Shopify has no variant for",
        body: "Shopify always charges the variant's own price, but here the price is built from the quantity tier, the number of print locations, the artwork size and an optional design-help fee — far too many combinations to pre-create. I solved it with a pool of hidden variants: the app picks one and sets its price through the Shopify Admin API in the moment before add-to-cart. A theme cannot call the Admin API from the browser at all, so this only works from an app.",
      },
      {
        title: "Artwork that has to survive the order",
        body: "Liquid gives you line-item properties and nothing else — no upload, no storage, no processing. The app takes the file, crops and resizes it, checks the DPI against the print dimensions, and stores it durably in Supabase Storage linked to the order. Staff can then enhance, crop or remove the background, and the edited version saves alongside the original rather than replacing it.",
      },
      {
        title: "Pulling variants out of other products",
        body: "The Adults, Youth and Toddler colourways come from separate blank products, and the cart needs those products' real variant IDs — not a copy. The theme has no way to resolve that mapping, so the app does it server-side before the line item is built.",
      },
      {
        title: "Giving production the data it actually needs",
        body: "Shopify's order page shows raw line-item properties, which is not enough to print from. The app's own Orders screen surfaces the artwork, the DPI, per-size print dimensions, the pricing breakdown, the brand and the cancel status — everything a production run needs in one place.",
      },
    ],
    results: [
      { value: "4-step", label: "Customer configurator" },
      { value: "3", label: "Admin screens built" },
      { value: "2", label: "Databases, cleanly separated" },
    ],
    gallery: [
      {
        src: "/projects/ezprintpros-app/5.JPG",
        caption:
          "Step 1 — print location, with sub-locations priced individually",
      },
      {
        src: "/projects/ezprintpros-app/6.JPG",
        caption:
          "Step 2 — artwork upload with live garment preview, a DPI check, and the option to send artwork later or buy design help",
      },
      {
        src: "/projects/ezprintpros-app/7.JPG",
        caption:
          "Step 3 — colours and sizes, with Smart Distribute and a live prompt toward the next quantity tier",
      },
      {
        src: "/projects/ezprintpros-app/3.JPG",
        caption:
          "Print Settings — per-product print areas, minimum quantities and per-brand colour and size availability",
      },
      // Orders screen held back until real order numbers, amounts and customer
      // artwork are blurred. The original is in ../_images-to-clean/.
    ],
  },

  /* =====================================================================
   * 2a. SHOPIFY STORES — freelance (my own clients)
   * ================================================================== */
  {
    slug: "tshirt-corner",
    title: "TShirt Corner",
    category: "shopify",
    role: "Shopify Developer",
    status: "completed",
    featured: true,
    timeline: "1 week",
    summary:
      "A womenswear store inherited in a broken state — I repaired the theme, rebuilt the product experience, and lifted the store speed score from the low 50s to 70-80+.",
    cover: "/projects/tshirt-corner/cover.webp",
    stack: ["Shopify", "Horizon Theme", "Liquid", "JavaScript", "CSS"],
    liveUrl: "https://tshirtcorner.com.pk/",
    overview:
      "TShirt Corner sells women's shirts, tops and winter coats. The store already existed when I took it on, but a previous developer had left the theme in a state the client could not work with. The client supplied reference sites for the direction they wanted.",
    problem:
      "The previous developer had modified the theme so badly that sections could no longer be added at all — not even the built-in ones that ship with Shopify. The client was locked out of editing their own storefront, and the store was loading at a speed score of only 50-55.",
    solution:
      "I traced the damage back through the theme, repaired the structure so the section system worked correctly again, and only then rebuilt on top of it: a reworked product page, new header and footer, reviews, and a full performance pass.",
    features: [
      "Repaired a broken theme so sections could be added again",
      "Site-wide performance optimisation",
      "Product page rebuilt with a size chart and multiple custom sections",
      "Header and footer redesigned",
      "Customer reviews integrated with Judge.me",
      "Gang sheet builder apps integrated for custom print orders",
      "All social media channels connected",
    ],
    results: [
      { value: "50-55 → 70-80+", label: "Store speed score" },
      { value: "1 week", label: "Turnaround" },
    ],
  },
  {
    slug: "amaryllis-by-adeena",
    title: "Amaryllis By Adeena",
    category: "shopify",
    role: "Designer & Shopify Developer",
    status: "launching-soon",
    timeline: "1 month",
    summary:
      "A handmade goods store I designed, built, photographed and wrote end to end. Finished and ready — launch is only waiting on shipping being finalised.",
    cover: "/projects/amaryllis-by-adeena/cover.webp",
    stack: ["Shopify", "Horizon Theme", "Liquid", "JavaScript", "CSS"],
    liveUrl: "",
    overview:
      "Amaryllis By Adeena sells handmade products — crochet keychains, hand bags, custom clay mugs and other handmade pieces. This is the project where I owned everything: the design direction, the product imagery and the full build. There was no brief or reference site to work from.",
    solution:
      "Because the range is handmade and every piece is different, the store had to feel personal rather than templated. I designed the layout myself, shot and placed the imagery, and built the storefront around showing each item properly.",
    features: [
      "Designed the entire store myself — no brief or reference site",
      "Product photography shot and edited by me",
      "Full product listing and catalogue setup",
      "All store copy and content written by me",
      "Complete storefront build on the Horizon theme",
      "Product pages with size charts and multiple custom sections",
      "Customer reviews integrated with Judge.me",
      "Site-wide performance optimisation",
    ],
    results: [{ value: "80+", label: "Store speed score" }],
    // TODO: add screenshots — this store has no public link yet, so the
    // gallery is what sells it.
    gallery: [
      // { src: "/projects/amaryllis-by-adeena/1.png", caption: "Homepage" },
      // { src: "/projects/amaryllis-by-adeena/2.png", caption: "Product page" },
    ],
  },
  {
    slug: "vercettis",
    title: "Vercettis",
    category: "shopify",
    role: "Shopify Developer",
    status: "completed",
    featured: true,
    timeline: "2-3 weeks",
    summary:
      "A menswear store built end to end, including a custom pack selector that lets shoppers combine several products into one purchase.",
    cover: "/projects/vercettis/cover.webp",
    stack: [
      "Shopify",
      "Horizon Theme",
      "Liquid",
      "JavaScript",
      "CSS",
      "Custom Sections",
    ],
    liveUrl: "https://vercettis.com/",
    overview:
      "Vercettis is a menswear brand selling shirts. The client arrived with a set of competitor stores they admired rather than a finished design, so the layout and structure were worked out from those references. I built the entire storefront from the ground up.",
    solution:
      "Rather than settle for the theme's default single-variant product page, I built a custom pack selector so a customer can pick several products and sizes in one go and add them as a single pack — the feature the brand's offers are built around.",
    features: [
      "Complete storefront built A to Z on the Horizon theme",
      "Custom pack variant selector — several products and sizes in one add-to-cart",
      "Custom product page layout with the brand's own content sections",
      "Homepage sections the client can reorder from the theme customiser",
      "Third-party app integrations across reviews and marketing",
      "Responsive layout tuned for mobile-first traffic",
    ],
    results: [{ value: "Fast", label: "Store speed score" }],
  },
  {
    slug: "niqabla",
    title: "Niqabla",
    category: "shopify",
    role: "Shopify Developer",
    status: "completed",
    timeline: "1-2 weeks",
    summary:
      "A modest-wear storefront built from scratch to the client's brief, with the same multi-product pack selector on the product page.",
    stack: [
      "Shopify",
      "Horizon Theme",
      "Liquid",
      "JavaScript",
      "CSS",
      "Custom Sections",
    ],
    // TODO: add the live store URL
    liveUrl: "",
    overview:
      "Niqabla sells hijabs and modest wear. The client had a clear brief for how they wanted the store to look and behave, and I built the full storefront to that specification.",
    solution:
      "Because the brand sells in sets, the product page had to handle more than one item per purchase. I built a pack variant selector so shoppers can choose multiple products and sizes and add them to the cart together.",
    features: [
      "Complete storefront built A to Z on the Horizon theme",
      "Custom pack variant selector for multi-product purchases",
      "Custom product and collection page templates",
      "Homepage sections editable from the theme customiser",
      "Third-party app integrations",
      "Responsive across all breakpoints",
    ],
    results: [{ value: "Fast", label: "Store speed score" }],
  },
  {
    slug: "elaq",
    title: "Elaq",
    category: "shopify",
    role: "Shopify Developer",
    status: "completed",
    timeline: "1 day",
    // Deliberately scoped small — focused product-page work on an existing
    // store, not a build. Claiming more would not survive a question.
    summary:
      "A single-day product page job on an existing menswear store — adding a multi-product pack selector and a size chart.",
    cover: "/projects/elaq/cover.webp",
    stack: ["Shopify", "Horizon Theme", "Liquid", "JavaScript", "CSS"],
    liveUrl: "https://elaq.pk/",
    overview:
      "Elaq is a menswear brand selling shirts. The store was already built; I was brought in for a focused piece of product page work, delivered in a single day against a reference site the client provided.",
    features: [
      "Custom pack variant selector so customers can buy multiple products together",
      "Size chart added to the product page",
    ],
  },
  {
    slug: "deluxe-optical-service",
    title: "Deluxe Optical Service",
    category: "shopify",
    role: "Designer & Shopify Developer",
    status: "in-progress",
    timeline: "TODO",
    summary:
      "An eyewear storefront I am designing and building end to end — the companion store to the Deluxe Lens Configurator app.",
    cover: "/projects/deluxe-optical-service/cover.webp",
    stack: ["Shopify", "Horizon Theme", "Liquid", "JavaScript", "CSS"],
    liveUrl: "",
    overview:
      "Deluxe Optical Service is an eyewear brand and one of my own freelance clients. I own this one from design through to build. The storefront is roughly half complete and paused for now; the custom lens configurator app built for it is a separate project.",
    features: [
      "Store design and theme build owned end to end",
      "Storefront roughly half complete",
      "Built to work alongside the custom lens configurator app",
      "TODO — what is still outstanding on the storefront",
    ],
  },

  /* =====================================================================
   * 2b. SHOPIFY STORES — company work (Aheadtech360)
   *
   * These are `compact: true` — the card links straight to the live store and
   * no case-study page is generated. Pick your best three, delete `compact`
   * from them, and fill in overview / features / results to promote them into
   * full case studies.
   * ================================================================== */
  {
    slug: "ezdtfmaker",
    title: "EZDTFMaker",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    summary:
      "A DTF printing store carrying both a UV DTF gang sheet builder and the custom EZPrintPros bundle configurator I built for it.",
    timeline: "TODO",
    cover: "/projects/ezdtfmaker/cover.webp",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    liveUrl: "https://ezdtfmaker.com/",
    overview:
      "EZDTFMaker sells apparel — t-shirts, hoodies and sweatshirts — alongside direct-to-film printing. Alongside the storefront work, this is the store the EZPrintPros app was built for — the bundle ordering configurator lives on its product pages.",
    features: [
      "TODO — what you built or changed",
      "TODO — what you built or changed",
      "TODO — what you built or changed",
    ],
  },
  {
    slug: "the-macp-store",
    title: "The MACP Store",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    compact: true,
    summary: STANDARD_STORE_SUMMARY,
    cover: "/projects/the-macp-store/cover.webp",
    stack: ["Shopify", "Liquid"],
    liveUrl: "https://themacpstore.com/",
  },
  {
    slug: "trashed-punk",
    title: "Trashed Punk",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    compact: true,
    summary: STANDARD_STORE_SUMMARY,
    cover: "/projects/trashed-punk/cover.webp",
    stack: ["Shopify", "Liquid"],
    liveUrl: "https://www.trashedpunk.com/",
  },
  {
    slug: "maniyas",
    title: "Maniyas",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    compact: true,
    summary: STANDARD_STORE_SUMMARY,
    cover: "/projects/maniyas/cover.webp",
    stack: ["Shopify", "Liquid"],
    liveUrl: "https://www.maniyas.com/",
  },
  {
    slug: "freshfits",
    title: "freshfits",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    compact: true,
    summary: STANDARD_STORE_SUMMARY,
    cover: "/projects/freshfits/cover.webp",
    stack: ["Shopify", "Liquid"],
    liveUrl: "https://freshfits.co/",
  },
  {
    slug: "eztmart",
    title: "EzTmart",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    featured: true,
    timeline: "10-12 days",
    summary:
      "An apparel store built around a custom bulk-order builder — pick up to ten colours, then set quantities per size across all of them, with size upcharges and stock handled inline.",
    cover: "/projects/eztmart/cover.webp",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    liveUrl: "https://eztmart.com/",
    overview:
      "EzTmart sells blank apparel — t-shirts, hoodies and sweatshirts — to customers who buy in volume rather than one piece at a time. The two pieces of real custom work were the bulk-order builder on the product page and the product card design; the rest was standard section and page building.",
    problem:
      "Shopify's default product form takes one variant and one quantity. For a customer ordering a run of shirts that is unusable — they would have to add the same product to the cart over and over, once for every colour and size combination, and the larger the order the worse it gets.",
    solution:
      "I built a bulk-order builder into the product page. The customer picks up to ten colours from a carousel, and each selected colour opens its own size grid with quantity steppers. Size upcharges are shown against the sizes that carry them, sold-out sizes are disabled in place rather than hidden, and a running piece count sits on each colour. The whole order goes to the cart in one action.",
    features: [
      "Multi-colour picker — select up to ten colours, click again to deselect",
      "Per-colour size grid with quantity steppers from S through 5XL",
      "Size upcharges surfaced inline on the sizes that carry them",
      "Sold-out sizes disabled in place, so the customer can see what exists",
      "Running piece count per colour, with collapse and remove controls",
      "Redesigned product card — colour swatches with overflow count, SKU, brand and As Low As pricing",
      "Fulfilment badges on cards for same-day and next-day availability",
      "Custom homepage and content sections",
    ],
  },
  {
    slug: "irunminaturals",
    title: "Irunminaturals",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    compact: true,
    summary: STANDARD_STORE_SUMMARY,
    cover: "/projects/irunminaturals/cover.webp",
    stack: ["Shopify", "Liquid"],
    liveUrl: "https://irunminaturals.com/",
  },
  {
    slug: "affirmation-online",
    title: "Affirmation Online",
    category: "shopify",
    client: "Aheadtech360",
    role: "Shopify Developer",
    status: "completed",
    compact: true,
    summary: STANDARD_STORE_SUMMARY,
    cover: "/projects/affirmation-online/cover.webp",
    stack: ["Shopify", "Liquid"],
    liveUrl: "https://affirmationonline.com/",
  },

  /* =====================================================================
   * 3. FULL STACK PROJECTS (Aheadtech360)
   * ================================================================== */
  {
    slug: "aheadtech360-website",
    title: "Aheadtech360",
    category: "fullstack",
    client: "Aheadtech360",
    role: "Next.js Developer",
    status: "completed",
    featured: true,
    timeline: "1 week",
    summary:
      "The company's own website — Next.js with Sanity CMS and GoHighLevel, built so the SEO team can change anything on it without touching code.",
    cover: "/projects/aheadtech360-website/cover.webp",
    stack: [
      "Next.js",
      "TypeScript",
      "Sanity CMS",
      "GoHighLevel",
      "Tailwind CSS",
    ],
    liveUrl: "https://www.aheadtech360.com/",
    overview:
      "Aheadtech360 builds websites and software for clients, and this is their own site. Beyond building the front end, the brief was that the marketing and SEO side of the business had to be able to run it themselves.",
    problem:
      "A marketing site that needs a developer for every copy change, every new page and every metadata tweak is a bottleneck. SEO work in particular is constant and iterative — waiting on a deployment for each change was not workable.",
    solution:
      "I modelled the entire site in Sanity so content, pages and metadata are all editable from the CMS, and wired the lead capture through GoHighLevel so forms land directly in the company CRM. The SEO team can now change whatever they need without touching the code or waiting on a developer.",
    features: [
      "Full site content modelled in Sanity CMS",
      "SEO team can edit pages, copy and metadata with no developer involved",
      "Multiple GoHighLevel connections wired up",
      "Forms attached through GHL and routed into the CRM",
      "Built on Next.js with server-rendered pages",
    ],
  },
  {
    slug: "afblanks",
    title: "Afblanks",
    category: "fullstack",
    client: "Aheadtech360",
    role: "Full Stack Developer",
    status: "completed",
    featured: true,
    timeline: "3 months",
    summary:
      "A complete B2B wholesale commerce platform — customer storefront, admin back office, purchase ordering and full QuickBooks accounting sync, built from scratch rather than on a store platform.",
    cover: "/projects/afblanks/cover.webp",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Shippo",
      "QuickBooks",
      "ZipTax",
      "Resend",
      "Railway",
    ],
    // NOTE: given as http:// — check whether https works and switch if it does
    liveUrl: "http://afblanks.com/",
    overview:
      "Afblanks is a wholesale blanks business, and this is the platform the whole operation runs on. It is not a storefront bolted onto an off-the-shelf system — it is a custom application covering the customer side, the admin back office, purchasing from manufacturers, and the accounting sync that ties it together. Over 40 database tables sit behind it.",
    problem:
      "Wholesale does not behave like retail. Customers have to apply and be approved before they can see pricing; different customer tiers get different prices and different shipping rules; several people from the same company need their own logins; orders need invoices, packing slips and payment terms rather than a receipt; and every order, payment and purchase order has to land in QuickBooks without anyone retyping it.",
    solution:
      "I built the platform end to end. On the customer side: an application and approval flow, a filtered catalogue, quick bulk ordering by SKU, reorder and saved templates, and a multi-step checkout with live Shippo rates, real-time ZipTax sales tax and Stripe card or ACH payment. On the admin side: order management with a full status workflow, label generation, draft orders, returns, tiered and per-variant pricing, a purchase order system for manufacturers, and a QuickBooks integration that syncs orders, payments, customers, POs and vendor bills automatically.",
    features: [
      "Wholesale application with business verification and admin approve/reject workflow",
      "Tiered pricing and shipping by discount group, plus per-customer variant price overrides",
      "Quick Order by SKU, saved templates and one-click reorder from order history",
      "Multi-step checkout with live Shippo rates, ZipTax sales tax and Stripe card + ACH",
      "Full order workflow from Pending through to Delivered, with payment terms and internal notes",
      "Shipping label generation and tracking through Shippo, per carrier",
      "Purchase order system — manufacturers, expected cost, partial receiving, automatic inventory updates",
      "QuickBooks sync for orders, payments, customers, purchase orders and vendor bills",
      "Generated Invoice, Packing Slip, Order Confirmation and Ship Confirmation PDFs",
      "Multiple contacts per company, address book, statements and purchase history reports",
      "Returns (RMA) with item-level tracking, plus abandoned checkout recovery",
      "Admin CMS for products, collections, blog, policy pages, SEO and an audit log",
    ],
    results: [
      { value: "40+", label: "Database tables" },
      { value: "5", label: "External integrations" },
      { value: "4", label: "Generated PDF documents" },
    ],
    gallery: [
      // { src: "/projects/afblanks/1.png", caption: "Customer storefront" },
      // { src: "/projects/afblanks/2.png", caption: "Admin dashboard" },
    ],
  },
  {
    slug: "lead-intel",
    title: "Lead Intelligence Platform",
    category: "fullstack",
    client: "Aheadtech360",
    role: "Full Stack Developer",
    status: "in-progress",
    timeline: "TODO",
    summary:
      "TODO — one line on this leads and data sourcing platform. Mention the AI if this is the project that uses it.",
    // TODO: confirm the real stack, and which AI model or service you used
    cover: "/projects/lead-intel/cover.webp",
    stack: ["Next.js", "TypeScript"],
    liveUrl: "https://lead-intel-web-smoky.vercel.app/",
    overview:
      "TODO — a leads and data sourcing platform, almost complete. What problem does it solve and who is it for?",
    problem: "TODO",
    solution: "TODO",
    features: ["TODO — main feature", "TODO — main feature"],
  },

  /* =====================================================================
   * 4. TEST / PRACTICE PROJECTS
   * ================================================================== */
  {
    slug: "nike-ecommerce",
    title: "Nike E-Commerce",
    category: "test",
    role: "Frontend Developer",
    summary:
      "A fully responsive e-commerce build with OAuth authentication, Stripe checkout and a product catalogue.",
    cover: "/projects/nike-ecommerce/cover.webp",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Auth.js"],
    liveUrl: "https://hackathon-ecommmerce-website-g8uy.vercel.app/",
    codeUrl: "https://github.com/umeradnan7106/hackathon-ecommmerce-website",
    overview:
      "A practice e-commerce storefront built to explore the full purchase flow — catalogue, cart, authentication and payment — end to end.",
    features: [
      "Product catalogue with category and size filtering",
      "Persistent cart state across sessions",
      "Stripe Checkout integration",
      "OAuth sign-in flow",
    ],
  },
  {
    slug: "foodtuck",
    title: "Foodtuck",
    category: "test",
    role: "Frontend Developer",
    summary:
      "A restaurant e-commerce site with Sanity CMS powering the menu, plus Stripe checkout and auth.",
    cover: "/projects/foodtuck/cover.webp",
    stack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Stripe"],
    liveUrl: "https://hackathon-weld-theta.vercel.app/",
    codeUrl: "https://github.com/armanzkhan/Hackathon",
    overview:
      "A team hackathon build where the menu, chefs and blog content are all managed from Sanity Studio.",
    features: [
      "Sanity CMS schemas for menu, chefs and blog posts",
      "Dynamic routing generated from CMS content",
      "Cart and Stripe checkout flow",
    ],
  },
  {
    slug: "client-engineer-portal",
    title: "Client & Engineer Portal",
    category: "test",
    role: "Full Stack Developer",
    summary:
      "A two-sided portal where clients post requirements and engineers respond, with an admin approval workflow.",
    cover: "/projects/client-engineer-portal/cover.webp",
    stack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS"],
    liveUrl: "https://client-and-engineer-portal.vercel.app/",
    codeUrl: "https://github.com/umeradnan7106/Client-and-engineer-portal",
    overview:
      "A portal with separate client and engineer flows, backed by Sanity for storage and a pending / approved / hidden moderation state.",
    features: [
      "Separate dynamic forms for clients and engineers",
      "Sanity-backed submissions with a moderation status field",
      "Admin approval workflow before content goes public",
    ],
  },
  {
    slug: "services-website",
    title: "Services Website",
    category: "test",
    role: "Frontend Developer",
    summary:
      "A responsive multi-page marketing site focused on clean layout and smooth scroll-based motion.",
    cover: "/projects/services-website/cover.webp",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://services-website-orpin.vercel.app/",
    codeUrl: "https://github.com/umeradnan7106/Services-website",
    overview:
      "A marketing site built to practise responsive layout systems and scroll-triggered animation.",
  },
];

/* ---- helpers ---- */

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string) =>
  category === "all"
    ? projects
    : projects.filter((p) => p.category === category);

const statusRank: Record<string, number> = {
  completed: 0,
  "launching-soon": 1,
  "in-progress": 2,
};

/**
 * Display order: finished work with a cover and a live link first, then work
 * still in progress, and anything missing a cover or a link last. A card with
 * no image and nowhere to click is the weakest thing in a grid, so it should
 * never lead.
 */
export const sortForDisplay = (list: Project[]) =>
  [...list].sort((a, b) => {
    const score = (p: Project) =>
      (p.cover && p.liveUrl ? 0 : 100) + (statusRank[p.status ?? ""] ?? 0);
    return score(a) - score(b);
  });

/** Home page: flagged AND finished. Work in progress never leads. */
export const featuredProjects = sortForDisplay(
  projects.filter((p) => p.featured && p.status === "completed")
);

/** Only these get a generated case-study page */
export const caseStudyProjects = projects.filter((p) => !p.compact);

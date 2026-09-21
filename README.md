# Umer Adnan — Portfolio

Portfolio site for a **MERN Stack & Shopify App / Website Developer**, built with
Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Where to edit content

All copy lives in `src/data/` — **you never need to touch a component to update
your content.** Anything marked `TODO` is a placeholder waiting for your details.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, role, tagline, location, email, WhatsApp, résumé link, social URLs, nav items, hero stats |
| `src/data/experience.ts` | Work history timeline + education |
| `src/data/projects.ts` | Every project and its full case study |
| `src/data/skills.ts` | Tech stack, grouped by discipline |
| `src/data/services.ts` | Services offered + the 4-step process |

### Things to fill in first

1. **`site.ts`** — real WhatsApp number (international format, no `+`), your
   deployed domain in `url`, and your Upwork / Fiverr links if you use them.
2. **`/public/resume.pdf`** — drop your CV here (or change `resumeUrl`).
3. **`experience.ts`** — company name, dates, and the bullet points for your role.
4. **`projects.ts`** — replace the Shopify and Full Stack placeholder entries
   with your real company work.

---

## Adding a project

Append an object to the `projects` array in `src/data/projects.ts`. It
automatically appears in the filtered grid **and** gets its own case-study page
at `/projects/<slug>` — no routing to wire up.

```ts
{
  slug: "my-shopify-app",          // becomes /projects/my-shopify-app
  title: "My Shopify App",
  category: "shopify",             // "shopify" | "fullstack" | "test"
  summary: "One line shown on the card.",
  stack: ["Remix", "Polaris", "GraphQL"],

  featured: true,                  // optional
  client: "Acme Ltd",
  role: "Shopify App Developer",
  timeline: "Mar 2025 — Jun 2025",
  liveUrl: "https://…",
  codeUrl: "https://github.com/…",
  cover: "/projects/my-app/cover.png",   // optional; a placeholder shows without it

  // case-study page — every field optional, omitted ones hide their section
  overview: "…",
  problem: "…",
  solution: "…",
  features: ["…", "…"],
  challenges: [{ title: "…", body: "…" }],
  results: [{ value: "40%", label: "Faster load" }],
  gallery: [{ src: "/projects/my-app/1.png", caption: "Admin view" }],
}
```

Project screenshots go in `public/projects/<slug>/`.

---

## Project images

```
public/projects/<slug>/cover.png   # card thumbnail  -> `cover`
public/projects/<slug>/1.png       # case study      -> `gallery[]`
```

**One size for everything: 1600 x 1000 px (16:10).** Both the card thumbnail
and the case-study gallery are locked to `aspect-[16/10]`, so anything else
gets cropped by `object-cover`. Export as WebP (or PNG) under ~300 KB;
[squoosh.app](https://squoosh.app) at quality 80 is enough.

A project with no `cover` falls back to a themed placeholder, so images can be
added one at a time without anything looking broken. Projects marked `compact`
do not need covers at all.

### The cover is a thumbnail, not a page

Cards render at roughly **368 x 230 px**, so a 1600px-wide image displays at
about 23%. Normal 14px website text lands at 3px on screen and is invisible.

Do not screenshot a whole page. Crop tight on one recognisable area and treat
the cover as an impression — layout shape, brand colour, a single focal
element. Gallery images display around 876px, roughly 2.4x larger, so that is
where a readable, detailed crop belongs.

### The recipe

```
Canvas          1600 x 1000 px
Background      flat #EAEAE6
Screenshot      1360px wide, centred (120px side padding)
Top padding     90-110px
Bottom          let the screenshot bleed off the canvas edge
Corner radius   14px
Shadow          0 30px 60px rgba(0, 0, 0, 0.18)
Browser chrome  none - it is just noise at 368px
```

Letting the screenshot run off the bottom edge avoids dead space and implies
the page continues.

### Background colour matters here

This site ships light and dark themes. Covers sit on `#F4F5F2` in light and
`#171A1D` in dark, so a white-background image looks fine in light mode and
glares in dark mode.

Use a mid-tone instead: **`#EAEAE6`** (neutral warm grey) or **`#E8EEEA`** for
a barely-there tint of the emerald accent. Avoid `#ECFDF5` — too light for
dark mode.

Whatever is chosen, **every cover uses the same background, padding and
corner radius**. Mixed backgrounds are the single thing that makes a portfolio
grid look amateur.

### What to put in frame

| Project type | Cover |
| --- | --- |
| Shopify app | The configurator mid-flow, or the Polaris admin screen — Polaris reads immediately as a real embedded app |
| Full stack platform | The admin dashboard with its charts, not the storefront — it signals platform rather than shop |
| Store with custom work | The custom feature itself (a bulk-order builder, a pack selector), not the homepage |
| Store with strong photography | The product imagery, when that is the asset |
| Marketing site | The homepage hero |

When several projects share a feature, crop a different part of each one, or
the grid reads as the same image repeated.

### Avoid

- Full-page screenshots — everything ends up too small to read
- A different background per image
- The project name written on the image; the card already shows the title
- Laptop or phone stock photos with a screen composited in
- Browser chrome and URL bars
- Mixed desktop-plus-phone mockups — good alone, hard to keep consistent across twenty images

### Workflow

1. Chrome DevTools -> device toolbar -> width `1440` -> Cmd/Ctrl+Shift+P ->
   "Capture screenshot", so every source shot is identically sized.
2. Compose in [shots.so](https://shots.so) or [screely.com](https://screely.com),
   setting background and padding once and reusing it. For full control, build
   a 1600x1000 template frame in Figma and paste each screenshot into it.
3. Export at 1600x1000, then compress.

### Before publishing company work

The Aheadtech360 stores and platforms are client work. Blur or replace client
names, logos, customer data, emails and order numbers with realistic dummy
data, and check any NDA before publishing screenshots at all. When in doubt,
show the UI without the branding.

---

## Theming

Dark and light are both first-class, toggled from the navbar and remembered in
`localStorage`. An inline script in `src/app/layout.tsx` applies the stored
theme before first paint, so there is no flash of the wrong colours.

Every colour is a CSS variable defined once in `src/app/globals.css` — `:root`
for light, `.dark` for dark — and exposed to Tailwind through `@theme inline`:

| Utility | Meaning |
| --- | --- |
| `bg-bg` | Page background |
| `bg-surface` | Cards and panels |
| `bg-elevated` | Insets, chips, icon tiles |
| `border-line` / `border-line-strong` | Borders |
| `text-fg` / `text-fg-soft` / `text-muted` | Text hierarchy |
| `text-accent` / `bg-accent` | Emerald accent |

**To rebrand, change the accent in two places only** — `--accent`,
`--accent-hover`, `--accent-soft` and `--accent-contrast` under `:root` and
under `.dark`. Nothing else hardcodes a colour.

> Tailwind v4 is CSS-first — there is deliberately no `tailwind.config.js`.
> Theme tokens live in `globals.css`.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, JSON-LD, theme script, chrome
│   ├── page.tsx              # home
│   ├── about|services|contact/
│   ├── projects/
│   │   ├── page.tsx          # filterable grid
│   │   └── [slug]/page.tsx   # generated case study (generateStaticParams)
│   ├── sitemap.ts, robots.ts, not-found.tsx
│   └── globals.css           # design tokens + utilities
├── components/
│   ├── layout/               # navbar, footer, theme provider/toggle, scroll-to-top
│   ├── sections/             # hero, about, experience, skills, services, work, process, contact, cta
│   ├── projects/             # project card + filterable gallery
│   └── ui/                   # button, reveal, section heading, page header
├── data/                     # ← all content
└── lib/utils.ts
```

---

## Notes

- **SEO:** per-page metadata, Open Graph + Twitter cards, `Person` JSON-LD,
  generated `sitemap.xml` and `robots.txt`. Set `site.url` to your real domain
  before deploying — canonical URLs and the sitemap are built from it.
- **Contact:** a form on `/contact` that emails you through Resend, alongside
  direct WhatsApp and email links. See *Contact form setup* below.
- **Accessibility:** skip-to-content link, visible focus rings and labelled
  controls. `prefers-reduced-motion` is respected by the CSS animations (the
  marquee, pulse and transitions); the framer-motion scroll reveals still fade
  in.
- The project cards render server-side (not behind a Suspense boundary), so
  crawlers see every case-study link without executing JavaScript.

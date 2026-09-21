import { projects, type Project } from "./projects";

/* -------------------------------------------------------------------------
 * SITE CONFIG — edit this file to update your personal info everywhere.
 * Anything marked  // TODO  is a placeholder you should replace.
 * ---------------------------------------------------------------------- */

export const site = {
  name: "Umer Adnan",
  /** Shown in the browser tab and as the logo mark */
  initials: "UA",
  role: "Shopify & MERN Stack Developer",
  /** Rotating words in the hero headline */
  roles: [
    "Shopify Web Developer",
    "Shopify App Developer",
    "MERN Stack Developer",
    "Full Stack Developer",
  ],
  tagline:
    "I build Shopify stores and custom apps the way they should be built — every section properly made, so your team can edit the store without calling a developer.",
  location: "Karachi, Pakistan",
  /** Used for "X+ years" everywhere on the site */
  experienceYears: "1+",
  availability: {
    open: true,
    label: "Available for freelance & full-time roles",
  },

  email: "umeradnan7106@gmail.com",
  whatsapp: "923347329816",
  // TODO: add your CV as /public/resume.pdf once it is ready
  resumeUrl: "/resume.pdf",

  url: "https://umer-portfolio-gcud.vercel.app",

  socials: {
    github: "https://github.com/umeradnan7106",
    linkedin: "https://www.linkedin.com/in/umer-adnan-42a361368/",
    // NOTE: this profile is out of date — worth refreshing, traffic lands here
    upwork: "https://www.upwork.com/freelancers/~01c47765b06856584f",
    fiverr: "",
    x: "",
  },
};

export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/projects" },
  { name: "Contact", path: "/contact" },
] as const;

/**
 * Headline numbers shown under the hero.
 *
 * Derived from the project data rather than typed by hand — these had drifted
 * out of date three times before, and a wrong number on a portfolio is worse
 * than no number.
 */
const countIn = (category: Project["category"]) =>
  projects.filter((p) => p.category === category).length;

/** Anything not still in progress or waiting to launch */
const delivered = projects.filter(
  (p) => p.status === "completed" || !p.status
).length;

export const stats = [
  { value: site.experienceYears, label: "Years of experience" },
  { value: String(countIn("shopify")), label: "Shopify stores built" },
  { value: String(countIn("app")), label: "Custom Shopify apps" },
  { value: String(delivered), label: "Projects delivered" },
];

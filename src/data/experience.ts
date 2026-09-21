/* -------------------------------------------------------------------------
 * EXPERIENCE & EDUCATION
 * ---------------------------------------------------------------------- */

export type Role = {
  company: string;
  position: string;
  /** e.g. "Jan 2025" */
  start: string;
  /** "Present" for your current role */
  end: string;
  location?: string;
  type?: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  /**
   * All three are optional. Leave them out for a minimal entry — the card then
   * shows only company, position and dates, which is enough to fill a gap in
   * the timeline without drawing attention to it.
   */
  summary?: string;
  highlights?: string[];
  stack?: string[];
};

export const experience: Role[] = [
  {
    company: "Aheadtech360",
    position: "Shopify & MERN Stack Developer",
    start: "Sep 2025",
    end: "Present",
    location: "Karachi, Pakistan",
    type: "Full-time",
    summary:
      "Aheadtech360 builds websites and software for clients. I joined as a developer and became the person who plans how projects get built — there was no Shopify developer on the team, so I took that on and now own it alongside full stack work.",
    highlights: [
      "Write the development documentation for every project before a line of code is written — scope, approach and what gets built with what",
      "Work as the senior developer on the team, reviewing how features should be implemented rather than only implementing them",
      "Started the company's Shopify capability from scratch in October 2025, as the first and only Shopify developer there",
      "Build Shopify stores and custom apps for company clients end to end",
      "Deliver full stack MERN products alongside the Shopify work",
    ],
    stack: [
      "Shopify",
      "Liquid",
      "Gadget.dev",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    // Deliberately minimal — listed so the timeline has no unexplained gap,
    // without pulling focus away from the development work.
    company: "Corex International",
    position: "Sales & Lead Generation Executive",
    start: "Feb 2025",
    end: "Jul 2025",
    location: "Karachi, Pakistan",
    type: "Full-time",
  },
];

export type Education = {
  institution: string;
  qualification: string;
  start: string;
  end: string;
  detail?: string;
  /** Individual courses / modules, shown as chips */
  courses?: string[];
};

export const education: Education[] = [
  {
    institution: "GIAIC — Governor Sindh Initiative for AI, Computing & Web 3.0",
    qualification: "Full Stack Development, AI & Agentic Engineering",
    start: "Feb 2024",
    end: "Present",
    detail:
      "A multi-course programme covering full stack web development through to agentic AI. Currently on the final module, with the last exams in September 2026.",
    courses: [
      "Full Stack Web Development (Web 3.0)",
      "Agentic AI",
      "Spec-Driven Development",
      "Prompt Engineering",
      "AI Agent Factory",
    ],
  },
];

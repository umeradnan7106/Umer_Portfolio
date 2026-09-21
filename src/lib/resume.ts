import { existsSync } from "node:fs";
import { join } from "node:path";

import { site } from "@/data/site";

/**
 * Whether the CV file is actually in /public. Every "Download CV" link checks
 * this at build time, so a missing file hides the link instead of shipping a
 * 404 — and adding the PDF makes the links appear with no code change.
 *
 * Server-only: reads the filesystem.
 */
export const hasResume = () =>
  existsSync(join(process.cwd(), "public", site.resumeUrl.replace(/^\//, "")));

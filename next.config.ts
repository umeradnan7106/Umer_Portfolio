import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // image-size is read at build time with node:fs; keep it out of the bundler
  // so Next does not try to trace it into a page chunk.
  serverExternalPackages: ["image-size"],
  // Pins the workspace root to this folder. Without it, Next walks upward
  // looking for lockfiles and can pick the wrong root if one happens to sit
  // higher up outside the repo (harmless, but noisy and worth avoiding).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

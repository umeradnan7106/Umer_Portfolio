import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // image-size is read at build time with node:fs; keep it out of the bundler
  // so Next does not try to trace it into a page chunk.
  serverExternalPackages: ["image-size"],
};

export default nextConfig;

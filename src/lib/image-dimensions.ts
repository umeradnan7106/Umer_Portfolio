import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";

export type Dimensions = { width: number; height: number };

const cache = new Map<string, Dimensions | null>();

/**
 * Read an image's real dimensions from /public at build time.
 *
 * Screenshots come in whatever shape the screen was — portrait admin panels,
 * wide banners, near-square panels. Knowing the real ratio lets the gallery
 * render each one whole instead of cropping it into a fixed box.
 *
 * Server-only: this touches the filesystem, so never import it from a
 * "use client" component.
 */
export function getImageDimensions(publicPath: string): Dimensions | null {
  if (cache.has(publicPath)) return cache.get(publicPath)!;

  let result: Dimensions | null = null;

  try {
    const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const { width, height } = imageSize(readFileSync(file));
    if (width && height) result = { width, height };
  } catch {
    // Missing or unreadable file — the caller falls back to a fixed ratio
    // rather than failing the build over a screenshot.
  }

  cache.set(publicPath, result);
  return result;
}

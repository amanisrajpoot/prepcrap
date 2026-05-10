import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Pillar, PillarFrontmatter } from "@/types/content";

/** Directory where MDX content files are stored */
const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Get all pillar files from the content directory.
 * Reads each .mdx file, parses frontmatter with gray-matter,
 * and returns an array sorted by the `order` frontmatter field.
 */
export function getAllPillars(): Pillar[] {
  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Content directory not found at ${CONTENT_DIR}`);
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const pillars: Pillar[] = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as PillarFrontmatter,
      content,
    };
  });

  // Sort by the `order` field in frontmatter
  return pillars.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/**
 * Get a single pillar by its slug.
 */
export function getPillarBySlug(slug: string): Pillar | undefined {
  const pillars = getAllPillars();
  return pillars.find((p) => p.frontmatter.slug === slug);
}

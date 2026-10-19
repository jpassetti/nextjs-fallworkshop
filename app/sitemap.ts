import type { MetadataRoute } from "next";
import { getAllYearSlugs, getStorySlugsByYear } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const years = await getAllYearSlugs() as Array<{ node: { slug: string } }>;
  const entries = await Promise.all(years.map(async ({ node: { slug: year } }) => {
    const stories = await getStorySlugsByYear(year) as Array<{ slug: string }>;
    return [
      { url: `${SITE_URL}/${year}` },
      { url: `${SITE_URL}/${year}/stories` },
      ...stories.map(({ slug }) => ({ url: `${SITE_URL}/${year}/stories/${slug}` })),
    ];
  }));
  return [...new Map(entries.flat().map((entry) => [entry.url, entry])).values()];
}

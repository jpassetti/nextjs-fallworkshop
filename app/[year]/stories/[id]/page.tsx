import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StoryPageClient from "@/app/_views/StoryPageClient";
import {
  getAllYearSlugs,
  getStoryBySlug,
  getStorySlugsByYear,
  getYearBySlug,
  getNavLinksByYear,
} from "@/lib/api";
import NAV_CONFIG from "@/lib/navConfig";
import { mergeYearContent } from "@/lib/yearContent";
import type { NavItem, StoryData } from "@/app/_views/types";
import JsonLd from "@/components/JsonLd";
import { articleSchema, isoDate, pageMetadata, plainText, storyAuthors } from "@/lib/seo";

type YearSlugEdge = { node: { slug: string } };
type StorySlug = { slug: string };
type StoryRouteParams = { year: string; id: string };
type NavConfigItem = { year: string | number; links: string[] };

export async function generateStaticParams() {
  const years = (await getAllYearSlugs()) as YearSlugEdge[] | undefined;
  const paths: Array<{ year: string; id: string }> = [];

  for (const year of years ?? []) {
    const yearSlug = year.node.slug;
    const storySlugs = (await getStorySlugsByYear(yearSlug)) as
      | StorySlug[]
      | undefined;

    for (const story of storySlugs ?? []) {
      paths.push({
        id: story.slug,
        year: yearSlug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<StoryRouteParams>;
}): Promise<Metadata> {
  const { year, id } = await params;
  const storyData = (await getStoryBySlug(id)) as StoryData | null;
  if (!storyData) {
    return {};
  }

  const title = plainText(storyData.title) || "Story";
  const description = plainText(storyData.excerpt) || `Student visual storytelling from the ${year} Alexia Fall Workshop.`;
  const authors = storyAuthors(storyData);
  const image = storyData.featuredImage?.node;
  const url = `https://fallworkshop.newhouse.syr.edu/${year}/stories/${storyData.slug}`;

  return {
    ...pageMetadata(title, description, `/${year}/stories/${storyData.slug}`),
    authors: authors.map((name) => ({ name })),
    openGraph: {
      type: "article",
      authors,
      publishedTime: isoDate(storyData.dateGmt ? `${storyData.dateGmt.replace(/Z$/, "")}Z` : undefined),
      modifiedTime: isoDate(storyData.modifiedGmt ? `${storyData.modifiedGmt.replace(/Z$/, "")}Z` : undefined),
      title,
      description,
      url,
      images: image
        ? [
            {
              url: image.sourceUrl,
              width: image.mediaDetails?.width || 800,
              height: image.mediaDetails?.height || 600,
              alt: image.altText || "",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image.sourceUrl] : undefined,
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<StoryRouteParams>;
}) {
  const { year, id } = await params;
  const [storyData, yearData] = (await Promise.all([
    getStoryBySlug(id),
    getYearBySlug(year),
  ])) as [StoryData | null, Record<string, unknown> | null];

  if (!storyData) {
    notFound();
  }

  const config = (NAV_CONFIG as NavConfigItem[]).find(
    (c) => String(c.year) === String(year)
  );
  const navResult = config
    ? getNavLinksByYear([{ year: config.year, links: config.links }])
    : [];
  const navItems = ((navResult[0] && navResult[0].nav) || []) as NavItem[];
  const yearContent = mergeYearContent(year, yearData);

  return (
    <>
    <JsonLd data={articleSchema(storyData, year)} />
    <StoryPageClient
      storyData={storyData}
      activeYear={year}
      navItems={navItems}
      workshopDates={yearContent.workshopDates}
    />
    </>
  );
}

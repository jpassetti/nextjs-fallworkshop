import { notFound } from "next/navigation";
import StoriesPageClient from "@/app/_views/StoriesPageClient";
import { getAllYears, getAllStories, getStoriesByYear, getYearBySlug, getNavLinksByYear } from "@/lib/api";
import NAV_CONFIG from "@/lib/navConfig";
import { mergeYearContent } from "@/lib/yearContent";
import type { NavItem } from "@/app/_views/types";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

type YearEdge = { node: { name: string } };
type NavConfigItem = { year: string | number; links: string[] };

export async function generateMetadata({ params, searchParams }: {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const { q } = await searchParams;
  return {
    ...pageMetadata(`${year} Student Stories | The Alexia Fall Workshop`,
      `Explore student photojournalism, photography, films, and visual storytelling from the ${year} Alexia Fall Workshop at Syracuse University.`, `/${year}/stories`),
    ...(q?.trim() ? { robots: { index: false, follow: true } } : {}),
  };
}

export async function generateStaticParams() {
  const years = (await getAllYears()) as YearEdge[] | undefined;
  return years?.map((year) => ({ year: year.node.name })) ?? [];
}

export default async function StoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { year } = await params;
  const { q } = await searchParams;
  const hasSearchQuery = Boolean(q?.trim());
  const [stories, yearData] = await Promise.all([
    hasSearchQuery ? getAllStories() : getStoriesByYear(year),
    getYearBySlug(year),
  ]);

  const config = (NAV_CONFIG as NavConfigItem[]).find(
    (c) => String(c.year) === String(year)
  );
  const navResult = config
    ? getNavLinksByYear([{ year: config.year, links: config.links }])
    : [];
  const navItems = ((navResult[0] && navResult[0].nav) || []) as NavItem[];
  const yearContent = mergeYearContent(year, yearData);

  if (!stories) {
    notFound();
  }

  return (
    <StoriesPageClient
      stories={stories}
      activeYear={year}
      searchQuery={q || ""}
      navItems={navItems}
      workshopDates={yearContent.workshopDates}
    />
  );
}

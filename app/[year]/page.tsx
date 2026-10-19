import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, SITE_NAME, SITE_URL, plainText } from "@/lib/seo";
import YearPageClient from "@/app/_views/YearPageClient";
import {
  getAllYears,
  getStoriesByYear,
  getPeopleByYear,
  getSponsorsByYear,
  getScheduleByYear,
  getNavLinksByYear,
  getYearBySlug,
} from "@/lib/api";
import NAV_CONFIG from "@/lib/navConfig";
import type { NavItem } from "@/app/_views/types";
import { mergeYearContent } from "@/lib/yearContent";

type YearEdge = { node: { name: string } };
type YearRouteParams = { year: string };
type NavConfigItem = { year: string | number; links: string[] };
const getYearStories = cache(getStoriesByYear);

export async function generateStaticParams() {
  const years = (await getAllYears()) as YearEdge[] | undefined;
  return years?.map((year) => ({ year: year.node.name })) ?? [];
}

export async function generateMetadata({ params }: { params: Promise<YearRouteParams> }): Promise<Metadata> {
  const { year } = await params;
  const stories = await getYearStories(year) as Array<{ featuredImage?: { node?: { sourceUrl?: string; altText?: string } } }>;
  const image = stories?.find((story) => story.featuredImage?.node?.sourceUrl)?.featuredImage?.node;
  const metadata = pageMetadata(`${year} Student Photojournalism & Stories | ${SITE_NAME}`,
    `Discover student photography, documentary films, and visual storytelling from the ${year} Alexia Fall Workshop at Syracuse University's Newhouse School.`, `/${year}`);
  if (image?.sourceUrl) {
    metadata.openGraph = { ...metadata.openGraph, images: [{ url: image.sourceUrl, alt: image.altText || `${year} student work from ${SITE_NAME}` }] };
    metadata.twitter = { ...metadata.twitter, images: [image.sourceUrl] };
  }
  return metadata;
}

export default async function YearPage({ params }: { params: Promise<YearRouteParams> }) {
  const { year: activeYear } = await params;
  const [people, sponsors, stories, schedule, yearData] = await Promise.all([
    getPeopleByYear(activeYear),
    getSponsorsByYear(activeYear),
    getYearStories(activeYear),
    getScheduleByYear(activeYear),
    getYearBySlug(activeYear),
  ]);

  if (!activeYear || !stories) {
    notFound();
  }

  const config = (NAV_CONFIG as NavConfigItem[]).find(
    (c) => String(c.year) === String(activeYear)
  );
  const navResult = config
    ? getNavLinksByYear([{ year: config.year, links: config.links }])
    : [];
  const navItems = ((navResult[0] && navResult[0].nav) || []) as NavItem[];
  const yearContent = mergeYearContent(activeYear, yearData);
  const collectionSchema = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: `${activeYear} Student Stories | ${SITE_NAME}`,
    url: `${SITE_URL}/${activeYear}`,
    description: `Student photojournalism and visual storytelling from the ${activeYear} Alexia Fall Workshop.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (stories as Array<{ slug: string; title?: string }>).map((story, index) => ({
        "@type": "ListItem", position: index + 1,
        url: `${SITE_URL}/${activeYear}/stories/${story.slug}`, name: plainText(story.title),
      })),
    },
  };

  return (
    <>
    <JsonLd data={collectionSchema} />
    <YearPageClient
      activeYear={activeYear}
      people={people}
      sponsors={sponsors}
      stories={stories}
      schedule={schedule}
      navItems={navItems}
      yearContent={yearContent}
    />
    </>
  );
}

import { notFound } from "next/navigation";
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

export async function generateStaticParams() {
  const years = (await getAllYears()) as YearEdge[] | undefined;
  return years?.map((year) => ({ year: year.node.name })) ?? [];
}

export default async function YearPage({ params }: { params: Promise<YearRouteParams> }) {
  const { year: activeYear } = await params;
  const [people, sponsors, stories, schedule, yearData] = await Promise.all([
    getPeopleByYear(activeYear),
    getSponsorsByYear(activeYear),
    getStoriesByYear(activeYear),
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

  return (
    <YearPageClient
      activeYear={activeYear}
      people={people}
      sponsors={sponsors}
      stories={stories}
      schedule={schedule}
      navItems={navItems}
      yearContent={yearContent}
    />
  );
}

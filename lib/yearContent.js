import FALLBACK_CONTENT from "@/lib/year-content-fallback.json";
import { getWorkshopDates } from "@/lib/workshopDates";

function formatDateLabel(dateValue) {
  if (!dateValue) return null;
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function getFallbackYearContent(year) {
  return FALLBACK_CONTENT[String(year)] || null;
}

export function mergeYearContent(year, apiContent) {
  const fallback = getFallbackYearContent(year) || {};
  const canonicalDates = getWorkshopDates(String(year));
  const startLabel = formatDateLabel(apiContent?.workshopStartDate);
  const endLabel = formatDateLabel(apiContent?.workshopEndDate);
  const generatedDates =
    startLabel && endLabel ? `${startLabel}-${endLabel}` : null;

  return {
    workshopDates:
      canonicalDates ||
      apiContent?.workshopDates ||
      generatedDates ||
      fallback.workshopDates ||
      null,
    aboutVideoUrl: apiContent?.aboutVideoUrl || fallback.aboutVideoUrl || null,
    aboutContentHtml:
      apiContent?.aboutContent || fallback.aboutContentHtml || null,
  };
}

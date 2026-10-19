import { decode } from "html-entities";
import type { Metadata } from "next";
import type { StoryData } from "@/app/_views/types";

export const SITE_URL = "https://fallworkshop.newhouse.syr.edu";
export const SITE_NAME = "The Alexia Fall Workshop";
export const SHARE_IMAGE = `${SITE_URL}/images/the-alexia-fall-workshop-1200x630px.jpg`;

export function plainText(html?: string | null) {
  return decode((html || "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website", images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: SITE_NAME }] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
  };
}

export function storyAuthors(story: StoryData) {
  return (story.storyInformation?.students || []).map((student) => {
    const person = student as { personInformation?: { firstName?: string; lastName?: string } };
    return [person.personInformation?.firstName, person.personInformation?.lastName].filter(Boolean).join(" ");
  }).filter(Boolean);
}

export function isoDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function articleSchema(story: StoryData, year: string) {
  const authors = storyAuthors(story);
  const images = [story.featuredImage?.node, ...(story.storyInformation?.stillImages || []).map(({ stillImage }) => stillImage),
    ...(story.storyInformation?.photoGalleries || []).flatMap((gallery) =>
      ((gallery as { photoGallery?: Array<{ image?: import("@/app/_views/types").StoryImageNode }> }).photoGallery || []).map(({ image }) => image))];
  const uniqueImages = [...new Map(images.filter((image) => image?.sourceUrl).map((image) => [image!.sourceUrl, image!])).values()];
  return {
    "@context": "https://schema.org", "@type": "Article",
    headline: plainText(story.title), description: plainText(story.excerpt),
    mainEntityOfPage: `${SITE_URL}/${year}/stories/${story.slug}`,
    datePublished: isoDate(story.dateGmt ? `${story.dateGmt.replace(/Z$/, "")}Z` : undefined),
    dateModified: isoDate(story.modifiedGmt ? `${story.modifiedGmt.replace(/Z$/, "")}Z` : undefined),
    author: authors.map((name) => ({ "@type": "Person", name })),
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    image: uniqueImages.map((image) => ({ "@type": "ImageObject", contentUrl: image.sourceUrl,
      caption: plainText(image.caption) || undefined, description: plainText(image.altText) || undefined,
      creditText: image.creditText || undefined, copyrightNotice: image.copyrightNotice || undefined,
      license: image.license || undefined, acquireLicensePage: image.acquireLicensePage || undefined })),
  };
}

import Heading from "@/components/primitives/Heading";
import Image from "next/image";
import Link from "next/link";
import Paragraph from "@/components/primitives/Paragraph";
import { getFormattedStoryType } from "@/lib/utilities";
import styles from "./search-results-list.module.scss";

type StoryStudent = {
  personInformation?: {
    firstName?: string;
    lastName?: string;
  };
};

type StoryItem = {
  slug?: string;
  title?: string;
  excerpt?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
      mediaDetails?: {
        width?: number;
        height?: number;
      };
    };
  };
  storyInformation?: {
    storyType?: string;
    students?: StoryStudent[];
  };
  years?: {
    edges?: Array<{
      node?: {
        name?: string;
      };
    }>;
  };
};

type SearchResultsListProps = {
  stories: StoryItem[];
  activeYear: string;
};

const stripHtml = (value?: string) =>
  (value || "")
    .replace(/\[\s*&hellip;\s*\]/gi, "…")
    .replace(/&hellip;/gi, "…")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+…/g, "…")
    .replace(/\s+/g, " ")
    .trim();

const formatByline = (students?: StoryStudent[]) => {
  const names = (students || [])
    .map((student) => {
      const first = student.personInformation?.firstName || "";
      const last = student.personInformation?.lastName || "";
      return `${first} ${last}`.trim();
    })
    .filter(Boolean);

  if (names.length === 0) return null;
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
};

const SearchResultsList = ({ stories, activeYear }: SearchResultsListProps) => {
  const getStoryYear = (story: StoryItem) => {
    const yearFromStory = story.years?.edges?.[0]?.node?.name;
    return yearFromStory || activeYear;
  };

  return (
    <div className={styles.list}>
      {stories.map((story, index) => {
        const storyYear = getStoryYear(story);
        const href = `/${storyYear}/stories/${story.slug || ""}`;
        const typeLabel = story.storyInformation?.storyType
          ? getFormattedStoryType(story.storyInformation.storyType)
          : null;
        const byline = formatByline(story.storyInformation?.students);
        const excerpt = stripHtml(story.excerpt);
        const imageNode = story.featuredImage?.node;

        return (
          <article key={`${story.slug || "story"}-${index}`} className={styles.item}>
            {imageNode?.sourceUrl && (
              <Link href={href} className={styles.thumbLink}>
                <Image
                  src={imageNode.sourceUrl}
                  alt={imageNode.altText || ""}
                  width={imageNode.mediaDetails?.width || 1200}
                  height={imageNode.mediaDetails?.height || 800}
                  className={styles.thumb}
                />
              </Link>
            )}
            <div className={styles.content}>
              {typeLabel && (
                <Paragraph className={styles.typeLabel} caps fontWeight="bold" color="orange">
                  {typeLabel}
                </Paragraph>
              )}
              <Heading level={3} className={styles.title}>
                <Link href={href}>{story.title || "Untitled Story"}</Link>
              </Heading>
              {byline && (
                <Paragraph className={styles.byline} condensed caps fontWeight="bold">
                  By {byline}
                </Paragraph>
              )}
              {excerpt && <Paragraph className={styles.excerpt}>{excerpt}</Paragraph>}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default SearchResultsList;

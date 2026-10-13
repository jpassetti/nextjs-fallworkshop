"use client";

import Stories from "@/components/stories/Stories";
import Layout from "@/components/layout/Layout";
import type { StoriesPageViewProps } from "@/app/_views/types";
import { useMemo } from "react";
import SearchResultsList from "@/components/stories/SearchResultsList";
import Section from "@/components/primitives/Section";
import Container from "@/components/primitives/Container";
import Paragraph from "@/components/primitives/Paragraph";

type StoryNode = {
  title?: string;
  excerpt?: string;
  storyInformation?: {
    students?: Array<{
      personInformation?: {
        firstName?: string;
        lastName?: string;
      };
    }>;
  };
};

const normalize = (text?: string) =>
  (text || "")
    .replace(/<[^>]*>/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const StoriesPageClient = ({
  stories,
  activeYear,
  searchQuery = "",
  navItems = [],
  workshopDates = null,
}: StoriesPageViewProps) => {
  const queryInput = searchQuery;
  const query = normalize(queryInput);
  const hasSearch = Boolean(query);
  const filteredStories = useMemo(() => {
    if (!query) return stories;
    return (stories as StoryNode[]).filter((story) => {
      const students = story.storyInformation?.students || [];
      const byline = students
        .map((student) => {
          const first = student.personInformation?.firstName || "";
          const last = student.personInformation?.lastName || "";
          return `${first} ${last}`.trim();
        })
        .join(" ");
      const corpus = [story.title, story.excerpt, byline].map(normalize).join(" ");
      return corpus.includes(query);
    });
  }, [stories, query]);
  const resultCount = filteredStories.length;
  const resultsSummary = hasSearch
    ? `${resultCount} ${resultCount === 1 ? "result" : "results"}`
    : undefined;

  return (
    <Layout
      home
      year={activeYear}
      navItems={navItems}
      workshopDates={workshopDates}
    >
      {hasSearch ? (
        <Section
          id="stories"
          title={`Search results for "${queryInput}"`}
          backgroundColor="white"
        >
          <Container>
            {resultsSummary && (
              <Paragraph textAlign="center" marginBottom="3">
                {resultsSummary}
              </Paragraph>
            )}
            {filteredStories.length > 0 ? (
              <SearchResultsList
                stories={filteredStories as Array<Record<string, unknown>>}
                activeYear={activeYear}
              />
            ) : (
              <Paragraph textAlign="center">
                No stories matched your search. Try another keyword.
              </Paragraph>
            )}
          </Container>
        </Section>
      ) : (
        <Stories
          stories={filteredStories}
          activeYear={activeYear}
          sectionTitle={`${activeYear} Stories`}
          emptyMessage="There are no stories published yet."
        />
      )}
    </Layout>
  );
};

export default StoriesPageClient;

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/Button";
import Container from "@/components/primitives/Container";
import Heading from "@/components/primitives/Heading";
import Link from "next/link";
import Paragraph from "@/components/primitives/Paragraph";
import styles from "./home-hero-showcase.module.scss";
import { useEffect, useMemo, useState } from "react";

type StoryStudent = {
  personInformation?: {
    firstName?: string;
    lastName?: string;
  };
};

type StoryTeaser = {
  slug?: string;
  title?: string;
  excerpt?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  storyInformation?: {
    students?: StoryStudent[];
  };
};

type HomeHeroShowcaseProps = {
  activeYear: string;
  workshopDates?: string | null;
  stories: Array<Record<string, unknown>>;
};

const cleanText = (html?: string) =>
  (html || "")
    .replace(/\[\s*&hellip;\s*\]/gi, "…")
    .replace(/&hellip;/gi, "…")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+…/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getByline = (story: StoryTeaser) => {
  const students = Array.isArray(story.storyInformation?.students)
    ? story.storyInformation?.students
    : [];
  const names = students
    .map((student) => {
      const first = student.personInformation?.firstName || "";
      const last = student.personInformation?.lastName || "";
      return `${first} ${last}`.trim();
    })
    .filter(Boolean);

  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
};

const HomeHeroShowcase = ({
  activeYear,
  workshopDates,
  stories,
}: HomeHeroShowcaseProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseStories = useMemo(
    () => stories.slice(0, 5) as StoryTeaser[],
    [stories]
  );

  useEffect(() => {
    if (prefersReducedMotion || showcaseStories.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseStories.length);
    }, 6800);

    return () => {
      window.clearInterval(timer);
    };
  }, [prefersReducedMotion, showcaseStories.length]);

  if (showcaseStories.length === 0) {
    return null;
  }

  const activeStory = showcaseStories[activeIndex];
  const activeSlug = activeStory.slug || "";
  const activeTitle = activeStory.title || `${activeYear} Stories`;
  const imageUrl = activeStory.featuredImage?.node?.sourceUrl || "";
  const excerpt = cleanText(activeStory.excerpt);
  const description = excerpt || "Visual storytelling from The Alexia Fall Workshop.";
  const byline = getByline(activeStory);

  const backgroundInitial = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 1.05 };
  const backgroundAnimate = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, scale: 1 };
  const backgroundExit = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.985 };

  return (
    <section className={styles.hero} aria-label={`${activeYear} featured story showcase`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${activeSlug}-${activeIndex}`}
          className={styles.heroBackground}
          initial={backgroundInitial}
          animate={
            prefersReducedMotion
              ? backgroundAnimate
              : {
                  ...backgroundAnimate,
                  scale: 1.02,
                }
          }
          exit={backgroundExit}
          transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        />
      </AnimatePresence>
      <div className={styles.heroOverlay} />
      <motion.div
        className={styles.heroTexture}
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? { backgroundPosition: "0px 0px" }
            : { backgroundPosition: ["0px 0px", "32px 18px", "0px 0px"] }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className={styles.heroVignette} />

      <Container>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`content-${activeSlug}-${activeIndex}`}
            className={styles.heroInner}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.74, ease: [0.16, 1, 0.3, 1] }}
          >
            <Paragraph className={styles.kicker} caps fontWeight="bold" color="white">
              {activeYear} Fall Workshop
            </Paragraph>

            <Heading level={1} color="white" className={styles.heroTitle}>
              {activeTitle}
            </Heading>

            <Paragraph className={styles.heroDek} color="white">
              {description}
            </Paragraph>

            {byline && (
              <Paragraph className={styles.heroByline} color="white" condensed>
                By {byline}
              </Paragraph>
            )}

            <div className={styles.heroActions}>
              <Button.CTA label="View Story" href={`/${activeYear}/stories/${activeSlug}`} />
              <Link href={`/${activeYear}#stories`} className={styles.ctaSecondary}>
                View all stories
              </Link>
            </div>

            {showcaseStories.length > 1 && (
              <div className={styles.pager} role="tablist" aria-label="Featured stories">
                {showcaseStories.map((story, index) => (
                  <button
                    key={`${story.slug || "story"}-${index}`}
                    type="button"
                    className={`${styles.pagerDot} ${index === activeIndex ? styles.pagerDotActive : ""}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show featured story ${index + 1}`}
                    aria-pressed={index === activeIndex}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {showcaseStories.length > 1 && !prefersReducedMotion && (
          <div className={styles.progressTrack} aria-hidden="true">
            <motion.div
              key={`progress-${activeIndex}`}
              className={styles.progressFill}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6.65, ease: "linear" }}
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default HomeHeroShowcase;

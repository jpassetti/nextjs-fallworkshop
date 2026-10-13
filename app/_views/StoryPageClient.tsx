"use client";

import Col from "@/components/primitives/Col";
import Container from "@/components/primitives/Container";
import Heading from "@/components/primitives/Heading";
import Image from "next/image";
import ImageWrapper from "@/components/media/ImageWrapper";
import Layout from "@/components/layout/Layout";
import Paragraph from "@/components/primitives/Paragraph";
import Person from "@/components/people/Person";
import PhotoGallery from "@/components/media/PhotoGallery";
import Row from "@/components/primitives/Row";
import Section from "@/components/primitives/Section";
import Vimeo from "@/components/media/Vimeo";
import Link from "next/link";
import type { StoryPageViewProps } from "@/app/_views/types";
import styles from "@/app/_views/story-page.module.scss";

const StoryPageClient = ({
  storyData,
  activeYear,
  navItems = [],
  workshopDates = null,
}: StoryPageViewProps) => {
  const { title, storyInformation, content, featuredImage } = storyData;
  const { storyType, stillImages, photoGalleries, videos, students, coaches } =
    storyInformation || {};
  const studentList = Array.isArray(students) ? students : [];
  const coachList = Array.isArray(coaches) ? coaches : [];

  return (
    <Layout
      home
      year={activeYear}
      navItems={navItems}
      workshopDates={workshopDates}
    >
      <section className={styles.storyBreadcrumbStrip}>
        <Container>
          <nav aria-label="Breadcrumb" className={styles.contextBar}>
            <div className={styles.contextBarDesktop}>
              <ol className={styles.contextTrail}>
                <li className={styles.contextTrailItem}>
                  <Link href={`/${activeYear}`}>{activeYear} Workshop</Link>
                </li>
                <li className={styles.contextTrailItem}>
                  <Link href={`/${activeYear}/#stories`}>Stories</Link>
                </li>
                <li className={`${styles.contextTrailItem} ${styles.contextCurrent}`}>
                  {title || "Story"}
                </li>
              </ol>
            </div>
            <div className={styles.contextBarMobile}>
              <Link href={`/${activeYear}/#stories`} className={styles.mobileBackLink}>
                &laquo; Stories
              </Link>
              <span className={styles.mobileCurrentTitle}>{title || "Story"}</span>
            </div>
          </nav>
        </Container>
      </section>

      <section className={styles.mediaLead}>
      <Container>
        {storyType === "still"
          ? stillImages?.map((node, index: number) => (
              <ImageWrapper key={index} marginTop="0">
                <Image
                  src={node.stillImage.sourceUrl}
                  alt={node.stillImage.altText || ""}
                  width={node.stillImage.mediaDetails.width}
                  height={node.stillImage.mediaDetails.height}
                />
                {node.stillImage.caption && (
                  <Paragraph marginTop="1" marginBottom="2" type="caption">
                    {node.stillImage.caption}
                  </Paragraph>
                )}
              </ImageWrapper>
            ))
          : storyType === "video"
          ? videos?.map((video, index: number) => (
              <div className={styles.videoWrap} key={index}>
                <Vimeo src={video.vimeoUrl} />
              </div>
            ))
          : storyType === "photo_gallery"
          ? photoGalleries?.map((photoGallery, index: number) => (
              <PhotoGallery
                title={title || ""}
                coverImage={featuredImage?.node}
                photoGallery={photoGallery}
                key={index}
              />
            ))
          : null}
      </Container>
      </section>

      <Container content>
        <article className={styles.storyBody}>
          {title && (
            <Heading level={1} className={styles.storyTitle}>
              {title}
            </Heading>
          )}

          {content && (
            <div
              className={styles.storyContent}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </article>
      </Container>

      {studentList.length > 0 && (
        <Section id="story-credits" title="Story Credits" backgroundColor="orange_10">
          <Container>
            <Row justifyContent="center">
              {studentList.map((student, index: number) => (
                <Col xs="6" sm="6" md="4" lg="3" key={index}>
                  <Person person={student} />
                </Col>
              ))}
            </Row>
          </Container>
        </Section>
      )}

      {coachList.length > 0 && (
        <Section id="coached-by" title="Coached by">
          <Container>
            <Row justifyContent="center">
              {coachList.map((coach, index: number) => (
                <Col xs="6" sm="6" md="4" lg="3" key={index}>
                  <Person person={coach} />
                </Col>
              ))}
            </Row>
          </Container>
        </Section>
      )}
    </Layout>
  );
};

export default StoryPageClient;

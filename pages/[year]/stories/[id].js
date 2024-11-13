import { Fragment } from "react";
import { useRouter } from "next/router";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import Group from "../../../components/Group";
import Head from "next/head";
import Heading from "../../../components/Heading";
import Image from "next/image";
import ImageWrapper from "../../../components/ImageWrapper";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Paragraph from "../../../components/Paragraph";
import Person from "../../../components/Person";
import PhotoGallery from "../../../components/PhotoGallery";
import Row from "../../../components/Row";
import Vimeo from "../../../components/Vimeo";
import {
 getStorySlugsByYear,
 getStoryBySlug,
 getAllYearSlugs,
} from "../../../lib/api";
import SEO from "../../../components/SEO";

export async function getStaticPaths() {
 const years = await getAllYearSlugs();
 let paths = [];

 for (const year of years) {
  const { slug: yearSlug } = year.node;
  const storySlugs = await getStorySlugsByYear(yearSlug);

  const yearPaths = storySlugs?.map((edge) => {
   const { slug } = edge.node;
   return {
    params: {
     id: slug,
     year: yearSlug,
    },
   };
  });

  paths = paths.concat(yearPaths);
 }

 return {
  paths,
  fallback: false,
 };
}

export async function getStaticProps({ params }) {
 const storyData = await getStoryBySlug(params.id);
 return {
  props: {
   storyData,
   activeYear: params.year,
  },
 };
}

const BackToStoriesLink = ({ activeYear }) => {
 const router = useRouter();

 const handleClick = (e) => {
  e.preventDefault();
  router.push(`/${activeYear}/#stories`, undefined, { shallow: true });
 };

 return (
  <a href={`/${activeYear}/#stories`} onClick={handleClick}>
   &laquo; Back to Stories
  </a>
 );
};

const SingleStory = ({ storyData, activeYear }) => {
 const { title, slug, storyInformation, content, excerpt, featuredImage } =
  storyData;
 const { storyType, stillImages, photoGalleries, videos, students, coaches } =
  storyInformation || {};

 //console.log({ videos });

 return (
  <Layout inside>
   <SEO
    title={title || ""}
    description={excerpt || ""}
    image={{
     src: featuredImage?.node.sourceUrl || "",
     alt: featuredImage?.node.altText || "",
     width: featuredImage?.node.mediaDetails?.width || 800,
     height: featuredImage?.node.mediaDetails?.height || 600,
    }}
    url={`https://fallworkshop.newhouse.syr.edu/${activeYear}/stories/${slug}`}
   />
   <Container>
    {storyType === "still"
     ? stillImages?.map((node, index) => (
        <ImageWrapper key={index}>
         <Image
          src={node.stillImage.sourceUrl}
          alt={node.stillImage.altText}
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
     ? videos?.map((video, index) => <Vimeo key={index} src={video.vimeoUrl} />)
     : storyType === "photo_gallery"
     ? photoGalleries?.map((photoGallery, index) => (
        <PhotoGallery
         title={title}
         coverImage={featuredImage?.node}
         photoGallery={photoGallery}
         key={index}
        />
       ))
     : null}
    <Row justifyContent="center" marginTop="6" marginBottom="4">
     <Col md="6" textAlign="left">
      <Heading
       level="4"
       textTransform="uppercase"
       color="orange"
       marginBottom="2"
      >
       <BackToStoriesLink activeYear={activeYear} />
      </Heading>
      {title && (
       <Heading level="1" marginBottom="2" size="small">
        {title}
       </Heading>
      )}
      {content && (
       <div
        style={{ marginBottom: "1rem" }}
        dangerouslySetInnerHTML={{ __html: content }}
       ></div>
      )}
     </Col>
     <Col md="3" textAlign="left" paddingLeft="3" borderLeft="1">
      <Heading
       level="4"
       textTransform="uppercase"
       color="orange"
       marginBottom="1"
      >
       Produced by
      </Heading>
      {students?.length > 0 && (
       <Group>
        {students.map((student, index) => (
         <Person person={student} teaser key={index} />
        ))}
       </Group>
      )}

      {coaches?.length > 0 && (
       <>
        <Heading
         level="4"
         textTransform="uppercase"
         color="orange"
         marginBottom="1"
         marginTop="2"
        >
         Coached by
        </Heading>
        <Group>
         {coaches.map((coach, index) => (
          <Person person={coach} teaser key={index} />
         ))}
        </Group>
       </>
      )}
     </Col>
    </Row>
   </Container>
  </Layout>
 );
};

export default SingleStory;

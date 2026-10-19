"use client";

import classNames from "classnames/bind";

import { useRouter } from "next/navigation";
import Heading from "@/components/primitives/Heading";
import Reveal from "@/components/primitives/Reveal";
import Link from "next/link";
import SpanifyAuthorsList from "@/components/stories/SpanifyAuthorsList";
import { getFormattedStoryType } from "@/lib/utilities";
import styles from "./maxgrid.module.scss";

let cx = classNames.bind(styles);

type MaxGridProps = {
 activeYear: string;
 stories: any[];
 centerSingle?: boolean;
};

const MaxGrid = ({ activeYear, stories, centerSingle = false }: MaxGridProps) => {
 const router = useRouter();
 const singleLayout = centerSingle && stories.length === 1;
 return (
  <div className={`${styles.maxgrid} ${singleLayout ? styles.maxgridSingle : ""}`}>
   {stories.map((story, index) => {
    const { slug } = story;
    return (
     <MaxGrid.Item
      key={index}
      story={story}
      activeYear={activeYear}
      singleLayout={singleLayout}
      revealDelay={(index % 3) * 0.1}
      clickHandler={(e) => {
       e.preventDefault();
       router.push(`/${activeYear}/stories/${slug}`);
      }}
     />
    );
   })}
  </div>
 );
};
export default MaxGrid;
const Item = ({ activeYear, story, clickHandler, singleLayout = false, revealDelay = 0 }: any) => {
 const { title, featuredImage, slug, storyInformation } = story;
 const { storyType, students } = storyInformation;
 const formattedStoryType = getFormattedStoryType(storyType);

 let gridItemClasses = cx({
  [`maxgrid_item`]: true,
  [`height_2x`]:
   !singleLayout &&
   featuredImage &&
   featuredImage.node.mediaDetails.height >
    featuredImage.node.mediaDetails.width,
 });
 return (
  <Reveal
   as="article"
   delay={revealDelay}
   className={gridItemClasses}
   onClick={clickHandler}
   style={{
    backgroundImage: `url(${
     featuredImage ? featuredImage.node.sourceUrl : ""
    })`,
   }}
  >
   <div className={styles.maxgrid_text}>
    {storyType && (
     <Heading
      level="5"
      fontWeight="normal"
      textTransform="uppercase"
      marginBottom="2"
      color="white"
      textAlign="center"
      className={styles.storyTypeLabel}
     >
      {formattedStoryType}
     </Heading>
    )}
    {title && (
     <Heading level="3" marginBottom="2" color="white" textAlign="center">
      <Link href={`/${activeYear}/stories/${slug}`}>
       {title}
      </Link>
     </Heading>
    )}
    {students && <SpanifyAuthorsList students={students} className={styles.storyByline} />}
   </div>
  </Reveal>
 );
};
MaxGrid.Item = Item;

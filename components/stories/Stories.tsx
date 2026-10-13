import MaxGrid from "@/components/stories/MaxGrid";
import Section from "@/components/primitives/Section";
import Paragraph from "@/components/primitives/Paragraph";

type StoriesProps = {
  activeYear: string;
  stories: unknown[];
  sectionTitle?: string;
  emptyMessage?: string;
  resultsSummary?: string;
  centerSingle?: boolean;
};

const Stories = ({
  activeYear,
  stories,
  sectionTitle,
  emptyMessage = "There are no stories published yet.",
  resultsSummary,
  centerSingle = false,
}: StoriesProps) => {
 //console.log({ stories });
 return (
  <Section
   id="stories"
   title={sectionTitle || `${activeYear} Stories`}
   backgroundColor="white"
   paddingBottom={stories.length > 0 ? "0" : "4"}
  >
   {resultsSummary && (
    <Paragraph textAlign="center" marginBottom="3">
     {resultsSummary}
    </Paragraph>
   )}
   {stories.length > 0 ? (
    <MaxGrid stories={stories} activeYear={activeYear} centerSingle={centerSingle} />
   ) : (
    <Paragraph textAlign="center">
     {emptyMessage}
    </Paragraph>
   )}
  </Section>
 );
};
export default Stories;

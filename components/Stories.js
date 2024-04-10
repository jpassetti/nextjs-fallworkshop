import Col from "./Col";
import Grid from "./Grid";
import Container from "./Container";
import MaxGrid from "./MaxGrid";
import Section from "./Section";
import Story from "./Story";
import Paragraph from "./Paragraph";

const Stories = ({ activeYear, stories }) => {
  return (
    <Section
      id="stories"
      title="Stories"
      backgroundColor="white"
      paddingBottom={stories.length > 0 ? "0" : "4"}
    >
      {stories.length > 0 ? (
        <MaxGrid stories={stories} activeYear={activeYear} />
      ) : (
        <Paragraph textAlign="center">
          There are no stories published yet.
        </Paragraph>
      )}
    </Section>
  );
};
export default Stories;

import Container from "@/components/primitives/Container";
import Col from "@/components/primitives/Col";
import Heading from "@/components/primitives/Heading";
import Row from "@/components/primitives/Row";
import Section from "@/components/primitives/Section";
import Paragraph from "@/components/primitives/Paragraph";

const Credits = () => {
 return (
  <Section>
   <Container>
    <Row>
     <Col textAlign="center">
      <Heading level="2" textAlign="center" marginBottom="4" color="blue">
       Credits
      </Heading>
      <Heading level="3" textAlign="center" marginBottom="1">
       Digital & Social Media Team
      </Heading>
      <Paragraph marginBottom={3}>
       Noah Love, Brooke Vaccaro and Sophia Zaninovich
      </Paragraph>
      <Heading level="3" textAlign="center" marginBottom="1">
       Writing & Editing Team
      </Heading>
      <Paragraph>
       Ankit Bandyopadhyay, Ryann Phillips, Madelyn Taylor and Remi Turner
      </Paragraph>
     </Col>
    </Row>
   </Container>
  </Section>
 );
};
export default Credits;

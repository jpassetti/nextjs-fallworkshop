import Section from "@/components/primitives/Section";
import Row from "@/components/primitives/Row";
import Col from "@/components/primitives/Col";
import Heading from "@/components/primitives/Heading";
import Paragraph from "@/components/primitives/Paragraph";
import Container from "@/components/primitives/Container";
import Image from "next/image";

const images = [
 {
  src: "/event-2024/image-01.jpg",
  alt: "A Day in the Life of Baldwinsville",
 },
 {
  src: "/event-2024/image-02.jpg",
  alt: "A Day in the Life of Baldwinsville",
 },
 {
  src: "/event-2024/image-03.jpg",
  alt: "A Day in the Life of Baldwinsville",
 },
 {
  src: "/event-2024/image-04.jpg",
  alt: "A Day in the Life of Baldwinsville",
 },
 {
  src: "/event-2024/image-05.jpg",
  alt: "A Day in the Life of Baldwinsville",
 },
 {
  src: "/event-2024/image-06.jpg",
  alt: "A Day in the Life of Baldwinsville",
 },
];

const Event = () => {
 return (
  <Section>
   <Container>
    <Row marginBottom={2}>
     {images.map((image, index) => {
      return (
       <Col key={index} xs={6} sm={6} lg={4}>
        <Image
         src={image.src}
         alt={image.alt}
         width={1200}
         height={800}
         sizes="(max-width: 768px) 50vw, 33vw"
         style={{ width: "100%", height: "auto" }}
        />
       </Col>
      );
     })}
    </Row>
   </Container>
   <Container size="content">
    <Row justifyContent="center">
     <Col sm={12} md={8}>
      <Heading
       level={3}
       textAlign="center"
       marginBottom={2}
       textTransform="uppercase"
       color="orange"
      >
       Special event
      </Heading>
      <Heading level={2} textAlign="center" marginBottom={2}>
       A Day in the Life of Baldwinsville
      </Heading>
      <Paragraph textAlign="center" marginBottom={2}>
       <strong>Thursday, Nov. 14, 6:30 p.m.</strong>
       <br />
       Baldwinsville High School Auditorium
      </Paragraph>
      <Paragraph textAlign="center">
       On Friday, Oct. 18, 2024, ninety-seven students and thirteen faculty
       members from the Newhouse School of Public Communications at Syracuse
       University, joined by 21 top visual professionals from around the
       country, spent 24 hours documenting “A Day in the Life of Baldwinsville.”
       Their visual stories – both video and still – will be shared with the
       community in a one-hour presentation. We are grateful to the entire
       village of Baldwinsville for the warm welcome we received and for the
       opportunity to share our students’ work with the community.
      </Paragraph>
     </Col>
    </Row>
   </Container>
  </Section>
 );
};
export default Event;

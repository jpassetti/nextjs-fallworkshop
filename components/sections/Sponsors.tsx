import Col from "@/components/primitives/Col";
import Container from "@/components/primitives/Container";
import Image from "next/image";
import Row from "@/components/primitives/Row";
import Section from "@/components/primitives/Section";
import Sponsor from "@/components/sections/Sponsor";

import classNames from "classnames/bind";
import styles from "./sponsor.module.scss";

let cx = classNames.bind(styles);

const Sponsors = ({ sponsors, activeYear }: any) => {
 let nikonClasses = cx({
  sponsor: true,
  nikon: true,
 });
 return (
  <Section
   id="sponsors"
   title={`${activeYear} Sponsors`}
   backgroundColor="orange_10"
  >
   <Container size="sm">
    <Row justifyContent="center">
     {sponsors.map((sponsor, index) => {
      return (
       <Col key={index} xs="6" sm="6" md="4">
        <Sponsor sponsor={sponsor.node} size="sm" />
       </Col>
      );
     })}
    </Row>
   </Container>
  </Section>
 );
};
export default Sponsors;

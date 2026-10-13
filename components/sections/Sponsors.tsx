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
     <Col xs="6" sm="6" md="4">
      <div className={nikonClasses}>
       <a href="https://www.nikonusa.com/" target="_blank" rel="noopener noreferrer">
        <Image
         src="/sponsors/38mm_NikonBSgrad_4c_bk.png"
         alt="Nikon USA logo"
         width={458.6}
         height={400}
         sizes="(max-width: 768px) 50vw, 33vw"
         style={{ width: "100%", height: "auto" }}
        />
       </a>
      </div>
     </Col>
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

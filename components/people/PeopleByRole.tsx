import Col from "@/components/primitives/Col";
import Container from "@/components/primitives/Container";
import Paragraph from "@/components/primitives/Paragraph";
import Row from "@/components/primitives/Row";
import Person from "@/components/people/Person";
import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";

type PeopleByRoleProps = {
 role: string;
 plural: string;
 people: any[];
 activeYear: string;
 emptyMessage?: string;
};

const PeopleByRole = ({
 role,
 plural,
 people,
 activeYear,
 emptyMessage,
}: PeopleByRoleProps) => {
 const hasRoleAndYear = (roleToFilter) =>
  roleToFilter.role === role && roleToFilter.year === activeYear;

 const filteredPeople = people.filter((person) =>
  person.node.personInformation.rolesPerYear?.some(hasRoleAndYear)
 );
 const alphabetizedPeople = [...filteredPeople].sort(function (a, b) {
  if (a.node.personInformation.lastName < b.node.personInformation.lastName) {
   return -1;
  }
  if (a.node.personInformation.lastName > b.node.personInformation.lastName) {
   return 1;
  }
  return 0;
 });
 const shouldFeaturePaula = role === "staff" && activeYear === "2026";
 const paulaIndex = shouldFeaturePaula
  ? alphabetizedPeople.findIndex((person) => {
     const firstName = person?.node?.personInformation?.firstName?.trim().toLowerCase();
     const lastName = person?.node?.personInformation?.lastName?.trim().toLowerCase();
     return firstName === "paula" && lastName === "nelson";
    })
  : -1;
 const featuredPaula = paulaIndex >= 0 ? alphabetizedPeople[paulaIndex] : null;
 const remainingPeople =
  paulaIndex >= 0
   ? alphabetizedPeople.filter((_, index) => index !== paulaIndex)
   : alphabetizedPeople;

 return (
  <Section id={role === "staff" ? "faculty" : plural.toLowerCase()} title={`${activeYear} ${plural}`}>
   <Container>
    {alphabetizedPeople.length > 0 ? (
      <>
       {featuredPaula && (
        <Row justifyContent="center">
         <Col xs="12" sm="8" md="4" lg="3">
          <Reveal delay={0}>
           <Person role={role} person={featuredPaula.node} activeYear={activeYear} />
          </Reveal>
         </Col>
        </Row>
       )}
       <Row justifyContent="center">
        {remainingPeople.map((person, index) => (
         <Col xs="6" sm="6" md="4" lg="3" key={index}>
          <Reveal delay={(index % 4) * 0.1}>
           <Person role={role} person={person.node} activeYear={activeYear} />
          </Reveal>
         </Col>
        ))}
       </Row>
      </>
     ) : (
      <Row justifyContent="center">
       <Col>
        <Paragraph textAlign="center">
         {emptyMessage || `No ${plural.toLowerCase()} added yet.`}
        </Paragraph>
       </Col>
      </Row>
     )}
   </Container>
  </Section>
 );
};
export default PeopleByRole;

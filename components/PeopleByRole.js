import Col from "./Col";
import Container from "./Container";
import Paragraph from "./Paragraph";
import Row from "./Row";
import Person from "./Person";
import Section from "./Section";

const PeopleByRole = ({ role, plural, people, activeYear }) => {
 //console.log({ role, plural, people });
 const hasRoleAndYear = (roleToFilter) =>
  roleToFilter.role === role && roleToFilter.year === activeYear;

 // Filter people based on both role and activeYear
 const filteredPeople = people.filter((person) =>
  person.node.personInformation.rolesPerYear?.some(hasRoleAndYear)
 );
 const alphabetizedPeople = filteredPeople.sort(function (a, b) {
  if (a.node.personInformation.lastName < b.node.personInformation.lastName) {
   return -1;
  }
  if (a.node.personInformation.lastName > b.node.personInformation.lastName) {
   return 1;
  }
  return 0;
 });
 //console.log(alphabetizedPeople);
 //const coaches = people.filter(person => person.peopleType === "coach")
 return (
  <Section id={plural.toLowerCase()} title={plural}>
   <Container>
    <Row justifyContent="center">
     {alphabetizedPeople.length > 0 ? (
      alphabetizedPeople.map((person, index) => {
       //console.log(person.node.personInformation);
       return (
        <Col xs="6" sm="6" md="4" lg="3" key={index}>
         <Person role={role} person={person.node} />
        </Col>
       );
      })
     ) : (
      <Col>
       <Paragraph textAlign="center">
        No {plural.toLowerCase()} added yet.
       </Paragraph>
      </Col>
     )}
    </Row>
   </Container>
  </Section>
 );
};
export default PeopleByRole;

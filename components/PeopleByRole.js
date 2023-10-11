import Col from './Col'
import Container from './Container'
import Row from './Row'
import Person from './Person'
import Section from './Section'


const PeopleByRole = ({role, plural, people}) => {
	const hasRole = (roleToFilter) => roleToFilter.role === role;
	const filteredPeople = people.filter(person => person.node.personInformation.rolesPerYear?.some(hasRole));
	const alphabetizedPeople = filteredPeople.sort(function(a, b){
    	if(a.node.personInformation.lastName < b.node.personInformation.lastName) { return -1; }
    	if(a.node.personInformation.lastName > b.node.personInformation.lastName) { return 1; }
    	return 0;
	})
	//const coaches = people.filter(person => person.peopleType === "coach")
	return <Section id={plural.toLowerCase()} title={plural}>
			<Container>
			<Row justifyContent="center">
			{
				alphabetizedPeople.map((person, index) => {
					return <Col xs="6" sm="6" md="4" lg="3" key={index}>
						<Person role={role} person={person.node} />
						</Col>
				})
			}
		</Row>
		</Container>
	</Section>
}
export default PeopleByRole;

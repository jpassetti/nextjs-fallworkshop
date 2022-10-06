import Col from './Col'
import Container from './Container'
import Row from './Row'
import Person from './Person'
import Section from './Section'
import { getPeople } from "../lib/api";

const Coaches = () => {
	const people = getPeople();
	const coaches = people.filter(person => person.peopleType === "coach")
	return <Section id="coaches" title="Coaches"><Container>
		<Row justifyContent="center">
		{
			coaches.length > 0 && coaches.map((coach, index) => {
				return <Col xs="6" sm="6" md="4" lg="3" key={index}><Person person={coach} /></Col>
			})
		}
	</Row></Container></Section>
}
export default Coaches;

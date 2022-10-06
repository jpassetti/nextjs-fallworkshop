import Col from './Col'
import Person from './Person'
import Row from './Row'
import Section from './Section'
import { getPeople } from "../lib/api";
import Container from './Container';


const Staff = () => {
	const people = getPeople();
	const staff = people.filter(person => person.peopleType === "staff")
	return <Section id="staff" title="Staff"><Container><Row justifyContent="center">
		{
			staff.length > 0 && staff.map((person, index) => {
				return <Col key={index} xs="6" sm="6" md="4" lg="3"><Person person={person} /></Col>
			})
		}
	</Row></Container></Section>
}
export default Staff;

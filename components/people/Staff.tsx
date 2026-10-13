import Col from "@/components/primitives/Col"
import Person from "@/components/people/Person"
import Row from "@/components/primitives/Row"
import Section from "@/components/primitives/Section"
import { getPeople } from "@/lib/api";
import Container from "@/components/primitives/Container";


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

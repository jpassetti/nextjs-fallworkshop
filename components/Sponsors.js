import Col from './Col'
import Container from './Container'
import Row from './Row'
import Section from './Section'
import Sponsor from './Sponsor'

const Sponsors = ({sponsors}) => {

	return <Section id="sponsors" title="Sponsors" backgroundColor="orange_10">
		<Container size="sm">
		<Row justifyContent="center">
			{sponsors.map((sponsor, index) => {
				return <Col key={index} xs="6" sm="6" md="4"><Sponsor sponsor={sponsor.node} size="sm" /></Col>
			})}
		</Row>
	</Container></Section>
}
export default Sponsors;

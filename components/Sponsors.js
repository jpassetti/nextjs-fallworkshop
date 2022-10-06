import Col from './Col'
import Container from './Container'
import Grid from './Grid'
import Section from './Section'
import Sponsor from './Sponsor'

import { getSponsors
 } from "../lib/api";
const Sponsors = () => {
	const sponsors = getSponsors();
	return <Section id="sponsors" title="Sponsors" backgroundColor="orange"><Container>
		<Grid>
			{sponsors.map((sponsor, index) => {
				return <Col key={index} xs="6" sm="6" md="4" lg="3"><Sponsor sponsor={sponsor} size="sm" /></Col>
			})}
		</Grid>
	</Container></Section>
}
export default Sponsors;

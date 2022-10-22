import Col from './Col'
import Grid from './Grid'
import Container from './Container'
import Section from './Section'
import Story from './Story'


const Stories = ({stories}) => {
	return <Section id="stories" title="Stories">
			<Container>
				<Grid>
		{stories.map((story, index) => {
			return <Col xs="12" sm="6" md="4"><Story key={index} story={story} teaser /></Col>
		})}
		</Grid>
	</Container></Section>
}
export default Stories;

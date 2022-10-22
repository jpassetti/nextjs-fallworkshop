import Col from './Col'
import Grid from './Grid'
import Container from './Container'
import Section from './Section'
import Story from './Story'
import Paragraph from './Paragraph'


const Stories = ({stories}) => {
	return <Section id="stories" title="Stories" backgroundColor="blue">
			<Container>
				{stories.length > 0 ? 
					<Grid>
						{stories.map((story, index) => {
							return <Col xs="12" sm="6" md="4"><Story key={index} story={story} teaser /></Col>
						})}
					</Grid>
				: 
				<Paragraph textAlign="center" color="white">There are no stories published yet.</Paragraph>
				}
	</Container></Section>
}
export default Stories;

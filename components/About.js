import Container from './Container'
import Paragraph from './Paragraph'
import Section from './Section'
import Vimeo from './Vimeo'

const About = () => {
	return <Section id="about" title="About">
	<Container content>
	<Vimeo src="https://vimeo.com/370923435"/>
		
	<Paragraph marginBottom="2">Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join our professors as we push students to identify, observe and artfully communicate the core of who we are and the issues we face in everyday life. In the process, students learn to better use still photography, audio, video, motion graphics, design and words to become exceptional storytellers who engage the community.</Paragraph>

<Paragraph marginBottom="2">This year’s workshop involved more than 90 students whose efforts ranged from content collection to working behind the scenes on social media, copy editing, and multimedia production.</Paragraph>

<Paragraph marginBottom="2">On behalf of all of us at VIS, thank you for taking the time to look at our work. We hope you might lose yourself as you walk in the footsteps of our subjects, experiencing their world and understanding yours just a little bit better.</Paragraph>
	</Container>
	</Section>
}
export default About;

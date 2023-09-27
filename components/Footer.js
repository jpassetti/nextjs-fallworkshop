import Container from './Container'
import Logo from './Logo'
import Paragraph from './Paragraph'

import styles from './footer.module.scss'

const Footer = () => {
	return <footer className={styles.footer}>
		<Container>
			<Paragraph color="white" marginBottom="4">Copyright 2023-24.<br />
			Newhouse School at Syracuse University.</Paragraph>
			<Paragraph color="white" marginBottom="4">
				<a style={{color: "white", margin: "1rem"}} target="_blank" href="https://www.syracuse.edu/life/accessibility-diversity/accessible-syracuse/">Accessibility</a> 
				<a style={{color: "white", margin: "1rem"}} target="_blank" href="https://www.syracuse.edu/about/site/privacy-policy/">Privacy</a></Paragraph>
			<a href="https://newhouse.syr.edu" target="_blank"><Logo invert /></a>
		</Container>
	</footer>
}
export default Footer;

import Container from './Container'
import Logo from './Logo'
import MobileNav from './MobileNav'
import Nav from './Nav'
import Paragraph from './Paragraph'
import Row from './Row'
import Wordmark from './Wordmark'

import styles from './header.module.scss'

const Header = () => {
	return <header className={styles.header}>
		<MobileNav />
		<Container>
			<Row alignItems="center" justifyContent="center" flexDirection="column">
				<Logo />
				<Wordmark />
				<Nav />
			</Row>
		</Container>
	</header>
}
export default Header;

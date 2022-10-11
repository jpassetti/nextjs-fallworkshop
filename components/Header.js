import Container from './Container'
import Logo from './Logo'
import Nav from './Nav'
import Paragraph from './Paragraph'
import Row from './Row'
import Wordmark from './Wordmark'

import styles from './header.module.scss'

const Header = () => {
	return <header className={styles.header}>
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
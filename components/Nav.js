import { scroller } from 'react-scroll'
import Link from 'next/link'
import styles from './nav.module.scss'
import { getNavLinks } from '../lib/api'
const Nav = () => {
	const navLinks = getNavLinks();
	return <nav>
		<ul className={styles.navList}>
			{navLinks.map((navLink, index) => {
				const { label, id} = navLink;
				return <li key={index} className={styles.navItem}>
					<a 
					href=""
					className={styles.navItemAnchor}
					onClick={(e) => {
						e.preventDefault();
						//console.log("clicked");
						scroller.scrollTo(id, {
							duration: 800,
							delay: 0,
							smooth: true,
						});
					}}
					>
							{label}
					</a>
				</li>
			})}
		</ul>
	</nav>
}
export default Nav;

import { useState } from 'react'
import { scroller, Events } from 'react-scroll'
import ButtonUI from './ButtonUI'
import styles from './mobilenav.module.scss'
import { getNavLinks } from '../lib/api'
import Link from 'next/link'

const MobileNav = ({ inside = false }) => {
	const [isMenuActive, setMenuActive] = useState(false);
	const navLinks = getNavLinks();
	return <>
	<nav className={styles.mobileNav}>
		<ButtonUI icon="menu" color="white" clickHandler={(e) => {
			e.preventDefault();
			setMenuActive(true)
		}}>Open</ButtonUI>
	</nav>
	{isMenuActive && 
		<div className={styles.overlay}>
			<ButtonUI icon="close" color="white" id="closeBtn" clickHandler={(e) => {
				e.preventDefault();
				setMenuActive(false);
			}}>Close</ButtonUI>
				<ul>
			{navLinks.map((navLink, index) => {
				const { label, id} = navLink;
				console.log({inside});
				return inside ? 
					<li key={index}>
						<Link href={`/#${id}`}>
						<a>
							{label}
						</a>
						</Link></li>
				: <li key={index}>
					<a 
					href=""
					onClick={(e) => {
						e.preventDefault();
						//console.log("clicked");
						scroller.scrollTo(`/#${id}`, {
							duration: 800,
							delay: 0,
							smooth: true,
						});
						Events.scrollEvent.register('end', function(to, element) {
							//console.log('end', to, element);
							setMenuActive(false);
						});
					}}
					>
					{label}
					</a>
				</li>
			})}
		</ul>
		</div>
	}
	</>
}
export default MobileNav;

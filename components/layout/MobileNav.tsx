import { useState } from "react"
import { scroller, Events } from "react-scroll"
import Button from "@/components/Button"
import styles from "./mobilenav.module.scss"
import { getNavLinks } from "@/lib/api"
import Link from "next/link"
import type { MouseEvent } from "react"

type NavLink = {
	label: string;
	id: string;
};

type MobileNavProps = {
	inside?: boolean;
	year?: string;
	tone?: "default" | "inverse";
};

const MobileNav = ({ inside = false, year, tone = "default" }: MobileNavProps) => {
	const [isMenuActive, setMenuActive] = useState(false);
	const navLinks: NavLink[] = getNavLinks();

	if (inside) {
		return (
			<nav className={`${styles.mobileNav} ${styles.storyMobileNav}`}>
				<Link href={`/${year ? year : "2024"}#stories`} className={styles.storyMobileBackLink}>
					&laquo; Stories
				</Link>
			</nav>
		);
	}

	return <>
	<nav className={`${styles.mobileNav} ${tone === "inverse" ? styles.mobileNavInverse : ""}`}>
		<Button.UI icon="menu" color="white" clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			setMenuActive(true)
		}}>Open</Button.UI>
	</nav>
	{isMenuActive && 
		<div className={styles.overlay}>
			<Button.UI icon="close" color="white" id="closeBtn" clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				setMenuActive(false);
			}}>Close</Button.UI>
				<ul>
			{navLinks.map((navLink, index) => {
				const { label, id} = navLink;
				//console.log({inside});
				return inside ? 
					<li key={index}>
						<Link href={`/${year ? year : '2024'}#${id}`} onClick={() => {
							setMenuActive(false);
						}}>
							{label}
						</Link></li>
				: <li key={index}>
					<a 
					href=""
					onClick={(e: MouseEvent<HTMLAnchorElement>) => {
						e.preventDefault();
						//console.log("clicked");
						scroller.scrollTo(`/#${id}`, {
							duration: 800,
							delay: 0,
							smooth: true,
						});
						Events.scrollEvent.register('end', function() {
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

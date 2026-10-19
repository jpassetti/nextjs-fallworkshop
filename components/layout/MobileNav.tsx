import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
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
	const prefersReducedMotion = useReducedMotion();
	const linkVariants = {
		hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
		visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.25 } },
	};
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
	<AnimatePresence>
	{isMenuActive && 
		<motion.div
			key="mobile-menu"
			className={styles.overlay}
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={{
				hidden: { opacity: 0, y: prefersReducedMotion ? 0 : "-100%" },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: prefersReducedMotion ? 0 : 0.3,
						when: "beforeChildren",
						staggerChildren: prefersReducedMotion ? 0 : 0.05,
					},
				},
				exit: {
					opacity: 0,
					y: prefersReducedMotion ? 0 : "-100%",
					transition: { duration: prefersReducedMotion ? 0 : 0.2 },
				},
			}}
		>
			<Button.UI icon="close" color="white" id="closeBtn" clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				setMenuActive(false);
			}}>Close</Button.UI>
				<ul>
			{navLinks.map((navLink, index) => {
				const { label, id} = navLink;
				//console.log({inside});
				return inside ? 
					<motion.li key={index} variants={linkVariants}>
						<Link href={`/${year ? year : '2024'}#${id}`} onClick={() => {
							setMenuActive(false);
						}}>
							{label}
						</Link></motion.li>
				: <motion.li key={index} variants={linkVariants}>
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
				</motion.li>
			})}
		</ul>
		</motion.div>
	}
	</AnimatePresence>
	</>
}
export default MobileNav;

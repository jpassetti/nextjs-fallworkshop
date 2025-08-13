import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./nav.module.scss";

import { getNavLinks } from "../lib/api";

const Nav = ({ inside, year }) => {
  const router = useRouter();
  const navLinks = getNavLinks();

  // Determine if we're on the year landing page (e.g., /2024)
  const isOnYearPage = router.pathname === "/[year]" || router.asPath === `/${year}`;

  const handleNavClick = (e, id, href) => {
    // If on the year page, scroll to section
    if (isOnYearPage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If not on the year page, let the link navigate to the year page and anchor
    // (default browser behavior)
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map((navLink, index) => {
          const { label, id } = navLink;
          // If on year page, use anchor link; else, link to /year#id
          const href = isOnYearPage ? `#${id}` : `/${year}#${id}`;
          return (
            <li key={index} className={styles.navItem}>
              <Link href={href} passHref legacyBehavior>
                <a
                  className={styles.navItemAnchor}
                  onClick={(e) => handleNavClick(e, id, href)}
                >
                  {label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;

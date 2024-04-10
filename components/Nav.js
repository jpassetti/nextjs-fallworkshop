import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./nav.module.scss";

import { getNavLinks } from "../lib/api";

const Nav = ({ inside }) => {
  const router = useRouter();
  const navLinks = getNavLinks();

  const handleNavClick = (e, id) => {
    e.preventDefault();

    if (router.pathname === "/") {
      // User is on the homepage, scroll to the section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // User is on another page, navigate back to the homepage and include the section id as a hash
      router.push(`/#${id}`);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map((navLink, index) => {
          const { label, id } = navLink;
          return (
            <li key={index} className={styles.navItem}>
              <a
                href={`/#${id}`}
                className={styles.navItemAnchor}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;

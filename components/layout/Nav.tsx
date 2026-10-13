"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { MouseEvent } from "react";

import styles from "./nav.module.scss";

import { getNavLinks } from "@/lib/api";

type NavLink = {
  label?: string;
  id: string;
};

type NavProps = {
  inside?: boolean;
  year?: string;
  navItems?: NavLink[] | null;
  tone?: "default" | "inverse";
  noWrap?: boolean;
  forceVisible?: boolean;
  centered?: boolean;
};

const Nav = ({
  inside,
  year,
  navItems = null,
  tone = "default",
  noWrap = false,
  forceVisible = false,
  centered = false,
}: NavProps) => {
  const pathname = usePathname();
  const availableLinks = getNavLinks();
  const availableLookup = availableLinks.reduce<Record<string, NavLink>>(
    (acc, link) => {
      acc[link.id] = link;
      return acc;
    },
    {}
  );
  const normalizedNavItems = Array.isArray(navItems)
    ? navItems
        .map((item) => {
          const fallback = availableLookup[item.id];
          const label =
            item.label ||
            fallback?.label ||
            item.id
              .split("_")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" ");
          return { id: item.id, label };
        })
        .filter((item) => Boolean(item.id) && Boolean(item.label))
    : [];
  const navLinks: NavLink[] =
    normalizedNavItems.length > 0 ? normalizedNavItems : availableLinks;

  const hasYear = Boolean(year);
  // Determine if we're on the year landing page (e.g., /2024)
  const isOnYearPage = hasYear && pathname === `/${year}`;

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    // If on the year page, scroll to section
    if (isOnYearPage || !hasYear) {
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
    <nav
      className={`${styles.nav} ${
        tone === "inverse" ? styles.navInverse : ""
      } ${forceVisible ? styles.navForceVisible : ""} ${
        centered ? styles.navCentered : ""
      }`}
    >
      <ul className={`${styles.navList} ${noWrap ? styles.navListNoWrap : ""}`}>
        {navLinks.map((navLink, index) => {
          const { label, id } = navLink;
          // If on year page, use anchor link; else, link to /year#id
          const href = hasYear
            ? isOnYearPage
              ? `#${id}`
              : `/${year}#${id}`
            : `#${id}`;
          return (
            <li key={index} className={styles.navItem}>
              <Link
                href={href}
                className={styles.navItemAnchor}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;

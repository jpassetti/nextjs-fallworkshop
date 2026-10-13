"use client";

import Container from "@/components/primitives/Container";
import HeaderUtilities from "@/components/layout/HeaderUtilities";
import NewhouseLogo from "@/components/Logo/Logo";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import Nav from "@/components/layout/Nav";
import Paragraph from "@/components/primitives/Paragraph";
import Row from "@/components/primitives/Row";
import Wordmark from "@/components/layout/Wordmark";
import { getWorkshopDates } from "@/lib/workshopDates";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./header.module.scss";

type HeaderProps = {
  inside?: boolean;
  home?: boolean;
  year?: string;
  navItems?: Array<{ id: string; label?: string }>;
  workshopDates?: string | null;
};

const Header = ({ inside, home, year, navItems = [], workshopDates }: HeaderProps) => {
  const pathname = usePathname();
  const pathnameYear = pathname?.split("/").filter(Boolean)[0];
  const resolvedYear =
    year || (pathnameYear && /^\d{4}$/.test(pathnameYear) ? pathnameYear : undefined);

  if (inside) {
    return (
      <header className={`${styles.header} ${styles.headerStory}`}>
        <MobileNav inside year={year} />
        <Container>
          <div className={styles.storyHeader}>
            <div className={styles.storyBrand}>
              <div className={styles.storyLogoTop}>
                <NewhouseLogo type="secondary" style="inverted" size="medium" />
              </div>
              <Wordmark year={year} workshopDates={workshopDates} compact invert />
            </div>
            <div className={styles.storyMastheadActions}>
              {resolvedYear && (
                <Link href={`/${resolvedYear}`} className={styles.storyMastheadLink}>
                  {resolvedYear} Workshop
                </Link>
              )}
              {resolvedYear && (
                <Link href={`/${resolvedYear}/#stories`} className={styles.storyMastheadLinkPrimary}>
                  &laquo; Back to Stories
                </Link>
              )}
            </div>
          </div>
        </Container>
      </header>
    );
  }

  if (home) {
    const dates = workshopDates || getWorkshopDates(resolvedYear);

    return (
      <header className={`${styles.header} ${styles.headerHome}`}>
        <MobileNav year={year} tone="inverse" />
        <Container>
          <div className={styles.homeHeader}>
            <div className={styles.homeLogoTop}>
              <NewhouseLogo type="secondary" style="inverted" size="medium" />
            </div>

            <h1 className={styles.homeTitle}>
              <Link href="/">The Alexia Fall Workshop</Link>
            </h1>

            <Paragraph className={styles.homeDates}>{dates}</Paragraph>

            <div className={styles.homeDivider} />

            <div className={styles.homeBottomRow}>
              <div className={styles.homeNavWrap}>
                <Nav
                  year={resolvedYear}
                  navItems={navItems}
                  tone="inverse"
                  noWrap
                  forceVisible
                />
              </div>
              <div className={styles.homeUtilitiesWrap}>
                <HeaderUtilities
                  currentYear={resolvedYear}
                  tone="inverse"
                  compact
                  idPrefix="search-home"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <MobileNav inside year={year} />
      <Container>
        <Row alignItems="center" justifyContent="center" flexDirection="column">
          <Logo />
          <Wordmark year={year} workshopDates={workshopDates} />
          {year && <Nav year={year} inside={inside} navItems={navItems} />}
          <HeaderUtilities currentYear={year} idPrefix="search-default" />
        </Row>
      </Container>
    </header>
  );
};

export default Header;

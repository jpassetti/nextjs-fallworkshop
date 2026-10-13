 "use client";

import { Fragment } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { HomeHeaderVariantProvider } from "@/components/layout/HomeHeaderVariantContext";
import PageTransition from "@/components/layout/PageTransition";
import Main from "@/components/primitives/Main";
import type { ReactNode } from "react";

type LayoutProps = {
    children?: ReactNode;
    inside?: boolean;
    home?: boolean;
    year?: string;
    navItems?: Array<{ id: string; label?: string }>;
    workshopDates?: string | null;
};

const Layout = ({
    children,
    inside = false,
    home = false,
    year,
    navItems = [],
    workshopDates,
}: LayoutProps) => {
    return (
        <HomeHeaderVariantProvider>
            <Fragment>
                <Header
                    inside={inside ? true : false}
                    home={home}
                    year={year}
                    navItems={navItems}
                    workshopDates={workshopDates}
                />
                <PageTransition>
                    <Main>{children}</Main>
                </PageTransition>
                <Footer />
            </Fragment>
        </HomeHeaderVariantProvider>
    );
};
export default Layout;

import Layout from "../../components/Layout";
import Event from "../../components/Event";
import Stories from "../../components/Stories";
import PeopleByRole from "../../components/PeopleByRole";
import Sponsors from "../../components/Sponsors";
import {
    getAllYears,
    getStoriesByYear,
    getPeopleByYear,
    getSponsorsByYear,
    getScheduleByYear,
    getNavLinksByYear,
} from "../../lib/api";
import NAV_CONFIG from "../../lib/navConfig";
import Schedule from "../../components/Schedule";

export async function getStaticPaths() {
 const years = await getAllYears();
 //console.log(years);
 const paths = years?.map((year) => ({
  params: { year: year.node.name },
 }));

 return {
  paths,
  fallback: false, // Set to 'blocking' for dynamic routes post-build
 };
}

export async function getStaticProps({ params }) {
 const activeYear = params.year;
 const people = await getPeopleByYear(activeYear);
 const sponsors = await getSponsorsByYear(activeYear);
 const stories = await getStoriesByYear(activeYear);
 const schedule = await getScheduleByYear(activeYear);

 return {
  props: { people, schedule, sponsors, stories, activeYear },
 };
}

const YearLandingPage = ({ activeYear, people, sponsors, stories, schedule }) => {
    const config = NAV_CONFIG.find((c) => String(c.year) === String(activeYear));
    // Use getNavLinksByYear with the object form so it returns [{ year, nav }]
    const navResult = config ? getNavLinksByYear([{ year: config.year, links: config.links }]) : [];
    const navItems = (navResult[0] && navResult[0].nav) || [];

    const hasNav = (id) => navItems.some((n) => n.id === id);

    return (
        <Layout year={activeYear} navItems={navItems}>
            {/* Render sections only if they're present in the per-year nav config */}
            {hasNav("schedule") && <Schedule schedule={schedule} />}

            {hasNav("stories") && stories.length > 0 && (
                <Stories stories={stories} activeYear={activeYear} />
            )}

            {hasNav("coaches") && people && (
                <PeopleByRole
                    role="coach"
                    plural="Coaches"
                    people={people}
                    activeYear={activeYear}
                />
            )}

            {hasNav("faculty") && people && (
                <PeopleByRole
                    role="staff"
                    plural="Faculty"
                    people={people}
                    activeYear={activeYear}
                />
            )}

            {hasNav("sponsors") && sponsors && (
                <Sponsors sponsors={sponsors} activeYear={activeYear} />
            )}
        </Layout>
    );
};

export default YearLandingPage;

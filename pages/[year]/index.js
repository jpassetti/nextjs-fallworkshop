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
} from "../../lib/api";
import { useRouter } from "next/router";

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

 return {
  props: { people, sponsors, stories, activeYear },
 };
}

const YearLandingPage = ({ activeYear, people, sponsors, stories }) => {
 return (
  <Layout>
   <Event />
   {stories.length > 0 && <Stories stories={stories} activeYear={activeYear} />}
   {people && (
    <PeopleByRole
     role="coach"
     plural="Coaches"
     people={people}
     activeYear={activeYear}
    />
   )}
   {people && (
    <PeopleByRole
     role="staff"
     plural="Faculty"
     people={people}
     activeYear={activeYear}
    />
   )}
   {sponsors && <Sponsors sponsors={sponsors} activeYear={activeYear} />}
  </Layout>
 );
};

export default YearLandingPage;

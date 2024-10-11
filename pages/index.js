import About from "../components/About";
import Head from "next/head";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Schedule from "../components/Schedule";
import PeopleByRole from "../components/PeopleByRole";
import Sponsors from "../components/Sponsors";
import Staff from "../components/Staff";
import Stories from "../components/Stories";
import WorkshopSpotlight from "../components/WorkshopSpotlight";

import {
 getPeopleByYear,
 getSponsorsByYear,
 getScheduleDays,
 getStoriesByYear,
} from "../lib/api";

import {
 filterWorkshopsFromSchedule,
 findAndMergeDuplicates,
} from "../lib/utilities";

export async function getStaticProps() {
 // Get external data from the file system, API, DB, etc.
 const activeYear = "2024";
 const people = await getPeopleByYear(activeYear);
 const sponsors = await getSponsorsByYear(activeYear);
 const schedule = await getScheduleDays(activeYear);
 const stories = await getStoriesByYear(activeYear);
 // The value of the `props` key will be
 //  passed to the `Home` component
 return {
  props: { people, sponsors, schedule, stories },
 };
}

const Home = ({ people, sponsors, schedule, stories }) => {
 const activeYear = "2024";
 //  const workshops = schedule ? filterWorkshopsFromSchedule(schedule) : null;
 //  const mergedWorkshops = workshops ? findAndMergeDuplicates(workshops) : null;
 //console.log({mergedWorkshops});
 return (
  <Layout>
   <About />
   {stories.length > 0 && <Stories stories={stories} activeYear={activeYear} />}
   {schedule && <Schedule schedule={schedule} />}
   {/* {workshops && <WorkshopSpotlight workshops={mergedWorkshops} />} */}
   {people && <PeopleByRole role="coach" plural="Coaches" people={people} />}
   {people && <PeopleByRole role="staff" plural="Staff" people={people} />}
   {sponsors && <Sponsors sponsors={sponsors} />}
  </Layout>
 );
};
export default Home;

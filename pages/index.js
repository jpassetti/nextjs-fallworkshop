import About from "../components/About";
import Container from "../components/Container";
import Head from "next/head";
import Event from "../components/Event";
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
import Vimeo from "../components/Vimeo";
import Paragraph from "../components/Paragraph";

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
  props: {
   people,
   sponsors,
   schedule,
   stories,
  },
 };
}

const Home = ({ people, sponsors, schedule, stories }) => {
 const activeYear = "2024";
 //  console.log({ stories });
 //  const workshops = schedule ? filterWorkshopsFromSchedule(schedule) : null;
 //  const mergedWorkshops = workshops ? findAndMergeDuplicates(workshops) : null;
 //console.log({mergedWorkshops});
 return (
  <Layout>
   <Container>
    <Vimeo src="https://vimeo.com/1028882555" />
   </Container>
   <Container content>
    <Paragraph>
     Go behind the scenes with photojournalists at the Alexia Fall Workshop as
     they capture the spirit of Baldwinsville, showcasing its people, places,
     and stories through their lenses.
    </Paragraph>
   </Container>

   {/* {schedule && <Schedule schedule={schedule} />} */}
   {/* <About /> */}
   {/* <Event /> */}
   {stories.length > 0 && <Stories stories={stories} activeYear={activeYear} />}

   {/* {workshops && <WorkshopSpotlight workshops={mergedWorkshops} />} */}
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
export default Home;

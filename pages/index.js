import About from '../components/About'
import Head from 'next/head'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Schedule from '../components/Schedule'
import PeopleByRole from '../components/PeopleByRole'
import Sponsors from '../components/Sponsors'
import Staff from '../components/Staff'
import Stories from '../components/Stories'

import { getPeopleByYear, getSponsorsByYear, getScheduleDays, getStoriesByYear } from "../lib/api";

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
	const people = await getPeopleByYear("2022");
	const sponsors = await getSponsorsByYear("2022");
	const schedule = await getScheduleDays("2022");
	const stories = await getStoriesByYear("2022");
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { people, sponsors, schedule, stories }
  }
}

const Home = ({people, sponsors, schedule, stories}) => {
	return <Layout>
		<About />
		{stories && 
			<Stories stories={stories} />
		}
		<Schedule schedule={schedule} />
		<PeopleByRole role="coach" plural="Coaches" people={people} />
		<PeopleByRole role="staff" plural="Staff" people={people} />
		<Sponsors sponsors={sponsors} />
	</Layout>
}
export default Home;

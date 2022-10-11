import Head from 'next/head'
import Layout from '../components/Layout'
import Section from '../components/Section'

import Stories from '../components/Stories'
import PeopleByRole from '../components/PeopleByRole'
import Staff from '../components/Staff'
import About from '../components/About'
import Sponsors from '../components/Sponsors'

import { getPeopleByYear, getSponsorsByYear } from "../lib/api";

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const people = await getPeopleByYear("2022");
	const sponsors = await getSponsorsByYear("2022");
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { people, sponsors }
  }
}

const Home = ({people, sponsors}) => {
	return <Layout>
		<About />
		<PeopleByRole role="coach" plural="Coaches" people={people} />
		<PeopleByRole role="staff" plural="Staff" people={people} />
		<Sponsors sponsors={sponsors} />
	</Layout>
}
export default Home;

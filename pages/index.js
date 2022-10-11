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
		<Head>
			<title>The Alexia Fall Workshop | Newhouse School at Syracuse University</title>
			<meta charSet="UTF-8" />
			<meta property="og:type" content="website" />
        	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta property="og:title" content="The Alexia Fall Workshop | Newhouse School at Syracuse University" key="title" />
			<meta name="description" content="Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join our professors as we push students to identify, observe and artfully communicate the core of who we are and the issues we face in everyday life." />
		</Head>
		<About />
		<PeopleByRole role="coach" plural="Coaches" people={people} />
		<PeopleByRole role="staff" plural="Staff" people={people} />
		<Sponsors sponsors={sponsors} />
	</Layout>
}
export default Home;

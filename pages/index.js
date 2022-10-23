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
		<Head>
			<title>The Alexia Fall Workshop | Newhouse School at Syracuse University</title>
			<meta property="og:title" content="The Alexia Fall Workshop | Newhouse School at Syracuse University" key="title" />

			<meta charSet="UTF-8" />
			<meta property="og:type" content="website" />
			<meta name='og:site_name' content='The Alexia Fall Workshop' />
        	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			
			<meta name="description" content="Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join our professors as we push students to identify, observe and artfully communicate the core of who we are and the issues we face in everyday life." />
			<meta property="og:description" content="Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join our professors as we push students to identify, observe and artfully communicate the core of who we are and the issues we face in everyday life." />

			<meta
         		property="og:image"
          		content="/images/newhouse-school-1200x627px.jpg"
        	/>
			<meta property="og:image:width" content="1200"/>
			<meta property="og:image:height" content="627"/>
			<meta name="subject" content="Photography Workshop" />
			<meta name="copyright" content="Newhouse School at Syracuse University" />
			<meta name="language" content="EN" />
			<meta name='robots' content='index,follow' />
			<meta name='url' content='https://fallworkshop.newhouse.syr.edu' />
			<meta name='og:url' content='https://fallworkshop.newhouse.syr.edu' />
		</Head>
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

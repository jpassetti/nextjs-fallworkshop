import Head from 'next/head'
import Layout from '../components/Layout'
import Section from '../components/Section'

import Stories from '../components/Stories'
import Coaches from '../components/Coaches'
import Staff from '../components/Staff'
import About from '../components/About'
import Sponsors from '../components/Sponsors'

const Home = () => {
	return <Layout>
		<About />
		<Coaches />
		<Staff />
		<Sponsors />
	</Layout>
}
export default Home;

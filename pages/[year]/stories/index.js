import Stories from "../../../components/Stories";
import Layout from '../../../components/Layout';

import { getAllStorySlugs, getStoriesByYear } from "../../../lib/api";

export async function getStaticPaths() {
	const storySlugs = await getAllStorySlugs();

	const paths = storySlugs.map(edge => {
		const { slug } = edge.node
		return {
			params: {
				id: slug,
				year : "2022"
			}
		}
	})
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
  // Get external data from the file system, API, DB, etc.
	const stories = await getStoriesByYear("2022");
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { stories }
  }
}

const StoriesLandingPage = ({stories}) => {
	return <Layout>
		<Stories stories={stories} />
	</Layout>
}
export default StoriesLandingPage;

import Stories from "../../../components/Stories";
import Layout from "../../../components/Layout";
import {
 getAllYears,
 getStorySlugsByYear,
 getStoriesByYear,
} from "../../../lib/api";

export async function getStaticPaths() {
 const years = await getAllYears();
 //console.log({ years });
 const paths = [];

 for (const year of years) {
  const storySlugs = await getStorySlugsByYear(year.node.name);

  storySlugs.forEach((edge) => {
   const { slug } = edge;
   const yearName = edge.years.edges?.[0]?.node?.name;

   paths.push({
    params: {
     id: slug,
     year: yearName,
    },
   });
  });
 }

 return {
  paths,
  fallback: false, // Set to 'blocking' to support dynamic routes post-build
 };
}

export async function getStaticProps({ params }) {
 const stories = await getStoriesByYear(params.year);

 return {
  props: { stories, activeYear: params.year },
 };
}

const StoriesLandingPage = ({ stories, activeYear }) => {
 return (
  <Layout year={activeYear}>
   <Stories stories={stories} activeYear={activeYear} />
  </Layout>
 );
};

export default StoriesLandingPage;

import { getPeople } from '../utils/wordpress';

export async function getStaticProps({ params }) {

  const people = await getPeople();
  return {
    props: {
    	people,
    },
    revalidate: 60, // In seconds
  }

}
const DirectoryPage = ({ people }) => {
	//console.log({people});
	const sortPeople = people.sort(function(a, b){return a - b});
	const displayPeople = sortPeople.map(((person, index) => {
		console.log({person});
		const { meta, person_type } = person; 
		const { job } = person.meta.person_meta;
		if (person_type[0] === 198) {
			// faculty
			//return `${meta.person_meta.name.first_name} ${meta.person_meta.name.last_name}\n`;
			return ''
		} else if (person_type[0] === 199) {
			// staff
			return `${meta.person_meta.name.first_name} ${meta.person_meta.name.last_name}; ${meta.person_meta.job.staff_positions.length > 0 ? meta.person_meta.job.staff_positions[0].staff_title : ''}\n`;
		} else {
			return '';
		}
		
	}));
	return <p style={{"whiteSpace" : "pre-wrap"}}>{displayPeople}</p>
}
export default DirectoryPage;

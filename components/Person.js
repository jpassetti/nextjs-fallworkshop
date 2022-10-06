import styles from './person.module.scss'
import Heading from './Heading';
import Image from 'next/image'
import Link from 'next/link'
import Span from './Span'
import SocialMediaLinks from './SocialMediaLinks'

const Person = ({person}) => {
	const {firstName, lastName, jobTitle, company, companyUrl, image, links} = person;
	return <article className={styles.person}>
		<Image 
			src={image.sourceUrl}
			alt={image.altText}
			width={image.mediaDetails.width}
			height={image.mediaDetails.height}
			className={styles.personImage}
		/>
		<div className={styles.personContent}>
			<Heading level="3" textTransform="uppercase" textAlign="center">
				<Span firstName>{firstName}</Span><br />
				<Span lastName>{lastName}</Span></Heading>
			{links.length > 0 && 
				<SocialMediaLinks links={links} color="orange" />
			}
		</div>
	</article>
}
export default Person

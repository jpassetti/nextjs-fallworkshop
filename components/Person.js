import styles from './person.module.scss'
import Heading from './Heading';
import Image from 'next/image'
import ImageWrapper from './ImageWrapper'
import Link from 'next/link'
import Span from './Span'
import SocialMediaLinks from './SocialMediaLinks'

const Person = ({person}) => {
	console.log({person});
	const {title, slug, featuredImage, personInformation} = person;
	const {firstName, lastName, jobs, linksInformation, rolesPerYear} = personInformation;
	return <article className={styles.person}>
		{featuredImage &&
			<ImageWrapper>
				<Image 
				src={featuredImage.node.sourceUrl}
				alt={featuredImage.node.altText}
				width={featuredImage.node.mediaDetails.width}
				height={featuredImage.node.mediaDetails.height}
				className={styles.personImage}
			/>
			</ImageWrapper>
		}
		<div className={styles.personContent}>
			<Heading level="3" textTransform="uppercase" textAlign="center">
				<Span firstName>{firstName}</Span><br />
				<Span lastName>{lastName}</Span>
			</Heading>
			{linksInformation.links.length > 0 && 
				<SocialMediaLinks color="orange" linksInformation={linksInformation}  />
			}
		</div>
	</article>
}
export default Person

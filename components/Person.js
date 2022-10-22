import styles from './person.module.scss'
import Col from './Col'
import Heading from './Heading';
import Image from 'next/image'
import ImageWrapper from './ImageWrapper'
import Link from 'next/link'
import Row from './Row'
import Span from './Span'
import SocialMediaLinks from './SocialMediaLinks'

const Person = ({person, role, teaser, invert}) => {
	const {title, slug, featuredImage, personInformation} = person;
	const {firstName, lastName, jobs, linksInformation, rolesPerYear} = personInformation;
	return teaser ? 
		<div className={styles.person_teaser_row}>
			<Image 
				src={featuredImage.node.sourceUrl}
				alt={featuredImage.node.altText}
				width={featuredImage.node.mediaDetails.width}
				height={featuredImage.node.mediaDetails.height}
				className={styles.personImage}
			/>
			<Heading level="4" color={invert ? "white" : ""}>
				{firstName} {lastName}
			</Heading>
		</div>
	: <article className={styles.person}>
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
			<Heading level="3" textTransform="uppercase" textAlign="center" marginBottom="2">
				{firstName && <><Span firstName>{firstName}</Span><br /></>}
				{lastName && <Span lastName>{lastName}</Span>}
			</Heading>
			<ul className={styles.metaInformation}>
			{role === "staff" ? 
				rolesPerYear?.filter((rolePerYear => rolePerYear.year === "2022"))
				.map((rolePerYear, index) => {
					return <li key={index}><span className={styles.job}>{rolePerYear.title}</span></li>
				})
			: jobs?.length > 0 ? 
				jobs.map((job, index) => {
				return <li key={index}>
					{job.jobTitle ? <span className={styles.job}>{job.jobTitle}</span> : ''}
					{(job.companyName && job.companyUrl) ? 
						<span className={styles.company}><a href={job.companyUrl} target="_blank">{job.companyName}</a></span> 
					: job.companyName ? 
						<span className={styles.company}>{job.companyName}</span> 
					: ''}
				</li>
			})
			: ''
			}
			</ul>
			{linksInformation && linksInformation.links.length > 0 && 
				<SocialMediaLinks color="orange" linksInformation={linksInformation}  />
			}
		</div>
	</article>
}
export default Person

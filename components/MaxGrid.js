import Image from 'next/image'
import { useRouter } from 'next/router'
import Heading from './Heading'
import Link from 'next/link'
import { getFormattedStoryType } from '../lib/utilities'
import styles from './maxgrid.module.scss'

const MaxGrid = ({stories}) => {
	const router = useRouter();
	return <div className={styles.maxgrid}>
		{stories.map((story, index) => {
			const {slug} = story;
			return <MaxGrid.Item key={index} story={story} clickHandler={(e) => {
				e.preventDefault()
				router.push(`/2022/stories/${slug}`)
  			}} />
		})}
	</div>
}
export default MaxGrid;
const Item = ({story, clickHandler}) => {
	 
	const {title, featuredImage, slug, storyInformation} = story;
	const {storyType} = storyInformation;
	const formattedStoryType = getFormattedStoryType(storyType);
	return <article className={styles.maxgrid_item} onClick={clickHandler}>
		<Link href={`/2022/stories/${slug}`}>
			<a>
				<Image 
					src={featuredImage.node.sourceUrl}
					alt={featuredImage.node.altText}
					width={featuredImage.node.mediaDetails.width}
					height={featuredImage.node.mediaDetails.height}
				/>
			</a>
		</Link>
		<div className={styles.maxgrid_text}>
			{storyType && <Heading level="5" fontWeight="normal" textTransform="uppercase" marginBottom="2" color="white" textAlign="center">{formattedStoryType}</Heading>}
			{title && <Heading level="3" marginBottom="2" color="white" textAlign="center">
			<Link href={`/2022/stories/${slug}`}>
				<a>
					{title}
				</a>
			</Link>
		</Heading>}
		{students && 
			students.map((student, index) => {
				const {firstName, lastName} = student.personInformation;
				return <Heading level="4" color="white" textAlign="center" fontWeight="normal">By {firstName} {lastName}</Heading> 
			})
		}
			
		</div>
	</article>
}
MaxGrid.Item = Item;

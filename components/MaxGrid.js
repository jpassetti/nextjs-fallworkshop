import classNames from 'classnames/bind';


import Image from 'next/image'
import { useRouter } from 'next/router'
import Heading from './Heading'
import Link from 'next/link'
import SpanifyAuthorsList from './SpanifyAuthorsList';
import { getFormattedStoryType } from '../lib/utilities'
import styles from './maxgrid.module.scss'

let cx = classNames.bind(styles);

const MaxGrid = ({stories}) => {
	const router = useRouter();
	return <div className={styles.maxgrid}>
		{stories.map((story, index) => {
			const {slug} = story.node;
			return <MaxGrid.Item key={index} story={story} clickHandler={(e) => {
				e.preventDefault()
				router.push(`/2022/stories/${slug}`)
  			}} />
		})}
	</div>
}
export default MaxGrid;
const Item = ({story, clickHandler}) => {
	 
	const {title, featuredImage, slug, storyInformation} = story.node;
	const {storyType, students} = storyInformation;
	const formattedStoryType = getFormattedStoryType(storyType);
	
	let gridItemClasses = cx({
		[`maxgrid_item`] : true,
		[`height_2x`] : featuredImage && (featuredImage.node.mediaDetails.height > featuredImage.node.mediaDetails.width)
	});
	return <article 
		className={gridItemClasses} 
		onClick={clickHandler}
		style={{
			backgroundImage: `url(${featuredImage ? featuredImage.node.sourceUrl : ''})`
		}}
		>
		<div className={styles.maxgrid_text}>
			{storyType && <Heading level="5" fontWeight="normal" textTransform="uppercase" marginBottom="2" color="white" textAlign="center">{formattedStoryType}</Heading>}
			{title && 
				<Heading level="3" marginBottom="2" color="white" textAlign="center">
					<Link href={`/2022/stories/${slug}`}>
						<a>
							{title}
						</a>
					</Link>
				</Heading>
			}
			{students && <SpanifyAuthorsList students={students} />}
			
		</div>
	</article>
}
MaxGrid.Item = Item;

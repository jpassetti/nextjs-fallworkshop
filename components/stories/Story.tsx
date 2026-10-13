import Image from "next/image";
import Heading from "@/components/primitives/Heading"
import ImageWrapper from "@/components/media/ImageWrapper";
import Link from "next/link";
import { getFormattedStoryType } from "@/lib/utilities";

const Story = ({story}: any) => {
	
	const {title, slug, featuredImage, storyInformation} = story.node;
	const {storyType, coaches, students} = storyInformation;

	const formattedStoryType = getFormattedStoryType(storyType);

	return <article>
		{featuredImage &&
			<ImageWrapper><Link href={`/2022/stories/${slug}`}>
				<Image 
					src={featuredImage.node.sourceUrl}
					alt={featuredImage.node.altText}
					width={featuredImage.node.mediaDetails.width}
					height={featuredImage.node.mediaDetails.height}
				/></Link>
			</ImageWrapper>
		}
		{storyType && <Heading level="4" textTransform="uppercase" marginBottom="2" marginTop="3" color="orange">{formattedStoryType}</Heading>}
		{title && <Heading level="3" marginBottom="2" color="white">
			<Link href={`/2022/stories/${slug}`}>
				{title}
			</Link>
		</Heading>}
	</article>
}
export default Story;

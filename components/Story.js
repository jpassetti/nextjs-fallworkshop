import Image from "next/image";
import Heading from "./Heading"
import ImageWrapper from "./ImageWrapper";
import { formatArrayToStringWithCommas } from '../lib/utilities'
import Paragraph from "./Paragraph";

const Story = ({story}) => {
	

	const {title, featuredImage, storyInformation} = story.node;
	const {storyType, coaches, students} = storyInformation;

	const formattedStudents = formatArrayToStringWithCommas(students);
	const formattedCoaches = formatArrayToStringWithCommas(coaches);

	return <article>
		{featuredImage &&
			<ImageWrapper>
				<Image 
					src={featuredImage.node.sourceUrl}
					alt={featuredImage.node.altText}
					width={featuredImage.node.mediaDetails.width}
					height={featuredImage.node.mediaDetails.height}
				/>
			</ImageWrapper>
		}
		{title && <Heading level="3">{title}</Heading>}
		{students && 
			<Paragraph>Students:<br />{formattedStudents}</Paragraph> 
		}
		{coaches && 
			<Paragraph>Coaches:<br />{formattedCoaches}</Paragraph> 
		}
	</article>
}
export default Story;

import Col from './Col'
import Grid from './Grid'
import Container from './Container'
import MaxGrid from './MaxGrid'
import Section from './Section'
import Story from './Story'
import Paragraph from './Paragraph'

const sampleStories = [
	{
		title: "Sample",
		slug: "sample-title",
		featuredImage: {
			node: {
				sourceUrl: "/images/iron-man-1.jpeg",
				altText: "Iron Man",
				mediaDetails: {
					width: 2880,
					height: 1620
				}
			}
		},
		storyInformation: {
			storyType: "photo_gallery"
		}
	},
	{
		title: "Sample",
		slug: "sample-title",
		featuredImage: {
			node: {
				sourceUrl: "/images/iron-man-1.jpeg",
				altText: "Iron Man",
				mediaDetails: {
					width: 2880,
					height: 1620
				}
			}
		},
		storyInformation: {
			storyType: "photo_gallery"
		}
	},
	{
		title: "Sample",
		slug: "sample-title",
		featuredImage: {
			node: {
				sourceUrl: "/images/iron-man-1.jpeg",
				altText: "Iron Man",
				mediaDetails: {
					width: 2880,
					height: 1620
				}
			}
		},
		storyInformation: {
			storyType: "photo_gallery"
		}
	},
	{
		title: "Sample",
		slug: "sample-title",
		featuredImage: {
			node: {
				sourceUrl: "/images/iron-man-1.jpeg",
				altText: "Iron Man",
				mediaDetails: {
					width: 2880,
					height: 1620
				}
			}
		},
		storyInformation: {
			storyType: "photo_gallery"
		}
	},
	{
		title: "Sample",
		slug: "sample-title",
		featuredImage: {
			node: {
				sourceUrl: "/images/iron-man-1.jpeg",
				altText: "Iron Man",
				mediaDetails: {
					width: 2880,
					height: 1620
				}
			}
		},
		storyInformation: {
			storyType: "photo_gallery"
		}
	},
	,{
		title: "Sample",
		slug: "sample-title",
		featuredImage: {
			node: {
				sourceUrl: "/images/iron-man-1.jpeg",
				altText: "Iron Man",
				mediaDetails: {
					width: 2880,
					height: 1620
				}
			}
		},
		storyInformation: {
			storyType: "photo_gallery"
		}
	}
];

const Stories = ({stories}) => {
	return <Section id="stories" title="Stories" backgroundColor="white" paddingBottom={stories.length > 0 ? "0" : "4"}>
		{stories.length > 0 ? 
			<MaxGrid stories={stories} />
		: 
			<Paragraph textAlign="center">There are no stories published yet.</Paragraph>
		}
			{/*<Container>
				{stories.length > 0 ? 
					<Grid>
						{stories.map((story, index) => {
							return <Col xs="12" sm="6" md="4"><Story key={index} story={story} teaser /></Col>
						})}
					</Grid>
				: 
				<Paragraph textAlign="center" color="white">There are no stories published yet.</Paragraph>
				}
	</Container>
			*/}
			
	</Section>
}
export default Stories;

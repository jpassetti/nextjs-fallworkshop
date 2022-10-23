import Col from '../../../components/Col'
import Container from '../../../components/Container'
import Group from '../../../components/Group'
import Head from 'next/head'
import Heading from '../../../components/Heading'
import Image from 'next/image'
import ImageWrapper from '../../../components/ImageWrapper'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import Paragraph from '../../../components/Paragraph'
import Person from '../../../components/Person'
import PhotoGallery from '../../../components/PhotoGallery'
import Row from '../../../components/Row'
import Vimeo from '../../../components/Vimeo'
import { getAllStorySlugs, getStoryBySlug } from '../../../lib/api'


export async function getStaticPaths() {
	const storySlugs = await getAllStorySlugs();

	const paths = storySlugs.map(edge => {
		const { slug } = edge.node
		return {
			params: {
				id: slug,
				year : "2022"
			}
		}
	})
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {

	const storyData = await getStoryBySlug(params.id)
	return {
		props: {
			storyData,
		}
	}

}

const SingleStory = ({storyData}) => {
	const {title, storyInformation, content, excerpt, featuredImage} = storyData;
	const {storyType, stillImages, photoGalleries, videos, students, coaches} = storyInformation;
	return <Layout>
		<Head>
			<title>{title} | The Alexia Fall Workshop</title>
			<meta charSet="UTF-8" />
			<meta property="og:type" content="website" />
        	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta property="og:title" content={`${title} | The Alexia Fall Workshop`} key="title" />
			<meta name="description" content={excerpt} />
		</Head>
		<Container>
			{storyType === "still" ?
				stillImages?.map((node, index) => {
					return <ImageWrapper key={index}><Image 
						src={node.stillImage.sourceUrl}
						alt={node.stillImage.altText}
						width={node.stillImage.mediaDetails.width}
						height={node.stillImage.mediaDetails.height}
					/>
					{node.stillImage.caption &&
						<Paragraph marginTop="1" marginBottom="2">{node.stillImage.caption}</Paragraph>
					}
					</ImageWrapper>
				})
			: storyType === "video" ?
				videos?.map((video, index) => {
					return <Vimeo key={index} src={video.vimeoUrl}/>
				})
				
			: storyType === "photo_gallery" ?
				photoGalleries?.map((photoGallery, index) => {
					return <PhotoGallery title={title} coverImage={featuredImage.node} photoGallery={photoGallery} key={index} />
				})
			: ''}
			<Row justifyContent="center" marginTop="6" marginBottom="4">
				<Col md="6" textAlign="left">
					<Heading level="4" textTransform="uppercase" color="orange" marginBottom="2">
						<Link href={`/2022/stories`}>
							<a>
								&laquo; Back to Stories
							</a>
						</Link>
						</Heading>
					<Heading level="1" marginBottom="2" size="small">{title}</Heading>
					<div style={{"marginBottom" : "1rem"}} dangerouslySetInnerHTML={{__html:content}}></div>
					
					
				</Col>
				<Col md="3" textAlign="left" paddingLeft="3" borderLeft="1">
					<Heading level="4" textTransform="uppercase" color="orange" marginBottom="1">Produced by</Heading>
					{students && 
					<Group>			
						{students.map((student, index) => {
							return <Person person={student} teaser key={index} />
						})}
					</Group>	
					}
					<Heading level="4" textTransform="uppercase" color="orange" marginBottom="1" marginTop="2">Coached by</Heading>
					{coaches && 
					<Group>
						{coaches.map((coach, index) => {
							return <Person person={coach} teaser key={index} />
						})}
					</Group>
					}
				</Col>
			</Row>
		</Container>
	</Layout>
}
export default SingleStory;

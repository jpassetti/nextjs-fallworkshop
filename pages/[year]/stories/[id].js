import {Fragment} from 'react'

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
import SEO from '../../../components/SEO'


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
	const {title, slug, storyInformation, content, excerpt, featuredImage} = storyData;
	const {storyType, stillImages, photoGalleries, videos, students, coaches} = storyInformation;
	return <Layout inside>
		<SEO 
			title={title ? title : null}
			description={excerpt ? excerpt : null}
			image={{
				src: featuredImage ? featuredImage.node.sourceUrl : null,
				alt: featuredImage ? featuredImage.node.altText : null,
				width: featuredImage ? featuredImage.node.mediaDetails.width : null,
				height: featuredImage ? featuredImage.node.mediaDetails.height : null,
			}}
			url={`https://fallworkshop.newhouse.syr.edu/2022/stories/${slug}`}
		/>
		<Container>
			{storyType === "still" ?
				stillImages?.map((node, index) => {
					return <ImageWrapper key={index}>
						<Image 
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
					return <PhotoGallery title={title} coverImage={featuredImage?.node} photoGallery={photoGallery} key={index} />
				})
			: ''}
			<Row justifyContent="center" marginTop="6" marginBottom="4">
				<Col md="6" textAlign="left">
					<Heading level="4" textTransform="uppercase" color="orange" marginBottom="2">
						<Link href={`/#stories`}>
							<a>
								&laquo; Back to Stories
							</a>
						</Link>
						</Heading>
					{title && 
						<Heading level="1" marginBottom="2" size="small">{title}</Heading>
					}
					{content && 
						<div style={{"marginBottom" : "1rem"}} dangerouslySetInnerHTML={{__html:content}}></div>
					}
					
					
				</Col>
				<Col md="3" textAlign="left" paddingLeft="3" borderLeft="1">
					<Heading level="4" textTransform="uppercase" color="orange" marginBottom="1">Produced by</Heading>
					{(students && students.length > 0) &&
					<Group>			
						{students?.map((student, index) => {
							return <Person person={student} teaser key={index} />
						})}
					</Group>	
					}
					<Heading level="4" textTransform="uppercase" color="orange" marginBottom="1" marginTop="2">Coached by</Heading>
					{(coaches && coaches.length > 0) &&
					<Group>
						{coaches?.map((coach, index) => {
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

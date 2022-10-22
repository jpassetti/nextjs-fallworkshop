import {useState} from 'react'

import Image from 'next/image'
import ImageWrapper from './ImageWrapper'
import Icon from './Icon'
import styles from './photogallery.module.scss';

import Lightbox from "yet-another-react-lightbox";

import image1 from "../public/images/iron-man-1.jpeg";
import image2 from "../public/images/iron-man-2.jpeg";
import image3 from "../public/images/iron-man-3.jpeg";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const PhotoGallery = ({coverImage, photoGallery, title}) => {
	  const [basicExampleOpen, setBasicExampleOpen] = useState(false);
  const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);


 const slides = photoGallery.photoGallery.map((slide, index) => {
	const {image} = slide;
	const {sourceUrl, altText, mediaDetails, description, caption} = image;
	return {
		key: index,
		src: sourceUrl,
		title: title,
		width: mediaDetails.width,
		height: mediaDetails.height,
		description: caption
	}
 });

	return <div className={styles.photoGalleryContainer}>
		<Lightbox
			open={advancedExampleOpen}
			close={() => setAdvancedExampleOpen(false)}
			slides={slides}
			plugins={[Captions, Fullscreen, Slideshow, Video, Zoom]}
			thumbnails={{
				position: "bottom",
				preload: photoGallery.photoGallery.length
			}}
			captions={{ 
				descriptionTextAlign: "center", 
				descriptionMaxLines: 3 
			}}
      	/>
	 	<div className={styles.photoGalleryCover} onClick={() => setAdvancedExampleOpen(true)} >
			<Image 
				src={coverImage.sourceUrl}
				alt={coverImage.altText}
				width={coverImage.mediaDetails.width}
				height={coverImage.mediaDetails.height}
			/>
			<button className={styles.photoGalleryIcon} tabIndex="0"><Icon icon="images" color="white" /></button>
		</div>
	</div>
}
export default PhotoGallery

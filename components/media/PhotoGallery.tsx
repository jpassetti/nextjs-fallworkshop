import {useState} from "react"
import {decode} from "html-entities";
import Image from "next/image"
import Icon from "@/components/media/Icon"
import styles from "./photogallery.module.scss";

import Lightbox from "yet-another-react-lightbox";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const PhotoGallery = ({coverImage, photoGallery, title}: any) => {
	const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);

	// filter out slides that are null by accident
  	const filteredSlides = photoGallery.photoGallery.filter(slide => slide.image !== null);

 	const slides = filteredSlides.map((slide, index) => {
	const {image} = slide;
	if (image) {
		const {sourceUrl, altText, mediaDetails, description, caption} = image;
		return {
			key: index,
			src: sourceUrl,
			alt: altText,
			title: title,
			width: mediaDetails.width,
			height: mediaDetails.height,
			description: decode(caption)
		}
	} else {
		return null;
	}
	
 });

	return <div className={styles.photoGalleryContainer}>
		<Lightbox
			open={advancedExampleOpen}
			close={() => setAdvancedExampleOpen(false)}
			slides={slides}
			plugins={[Captions, Fullscreen, Slideshow, Video, Zoom]}
			thumbnails={{
				position: "bottom"
			}}
			captions={{ 
				descriptionTextAlign: "center", 
				descriptionMaxLines: 3 
			}}
      	/>
	 	<div className={styles.photoGalleryCover} onClick={() => setAdvancedExampleOpen(true)} >
			{coverImage && <Image 
				src={coverImage.sourceUrl}
				alt={coverImage.altText || title || "Photo gallery cover image"}
				fill
				sizes="(max-width: 980px) 100vw, 72ch"
				className={styles.photoGalleryCoverImage}
			/>
			}
			<button className={styles.photoGalleryIcon} tabIndex={0}><Icon icon="images" color="white" /></button>
		</div>
	</div>
}
export default PhotoGallery

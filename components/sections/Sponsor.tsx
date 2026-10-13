import Image from "next/image"
import Paragraph from "@/components/primitives/Paragraph"
import classNames from "classnames/bind"
import styles from "./sponsor.module.scss";

let cx = classNames.bind(styles);

const Sponsor = ({sponsor}: any) => {
	let sponsorClasses = cx({
		[`sponsor`] : true,
	});
	const {title, featuredImage, sponsorInformation} = sponsor;
	return featuredImage ? <div className={sponsorClasses}>
		<a href={sponsorInformation.sponsorUrl} target="_blank" rel="noopener noreferrer">
		<Image
				src={featuredImage.node.sourceUrl}
				alt={featuredImage.node.altText}
				width={featuredImage.node.mediaDetails.width}
				height={featuredImage.node.mediaDetails.height}
				sizes="(max-width: 768px) 50vw, 33vw"
				style={{ width: "100%", height: "auto" }}
		/>
		</a>
	</div> 
	: <div className={sponsorClasses}><Paragraph textAlign="center"><a href={sponsorInformation.sponsorUrl} target="_blank" rel="noopener noreferrer">{title}</a></Paragraph></div>
}
export default Sponsor

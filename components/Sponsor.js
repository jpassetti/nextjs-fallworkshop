import Image from 'next/image'
import Paragraph from './Paragraph'
import classNames from 'classnames/bind'
import styles from './sponsor.module.scss';

let cx = classNames.bind(styles);

const Sponsor = ({sponsor}) => {
	let sponsorClasses = cx({
		[`sponsor`] : true,
	});
	const {title, featuredImage, sponsorInformation} = sponsor;
	return featuredImage ? <div className={sponsorClasses}>
		<a href={sponsorInformation.sponsorUrl} target="_blank">
		<Image
				src={featuredImage.node.sourceUrl}
				alt={featuredImage.node.altText}
				width={featuredImage.node.mediaDetails.width}
				height={featuredImage.node.mediaDetails.height}
				layout="responsive"
		/>
		</a>
	</div> 
	: <div className={sponsorClasses}><Paragraph textAlign="center"><a href={sponsorInformation.sponsorUrl} target="_blank">{title}</a></Paragraph></div>
}
export default Sponsor

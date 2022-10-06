import Image from 'next/image'
import Paragraph from './Paragraph'
import classNames from 'classnames/bind'
import styles from './sponsor.module.scss';

let cx = classNames.bind(styles);

const Sponsor = ({sponsor, size="md"}) => {
	let sponsorClasses = cx({
		[`sponsor`] : true,
		[`size-${size}`] : size
	});
	const {title, url, logo} = sponsor;
	return logo ? <div className={sponsorClasses}>
		<a href={url} target="_blank">
		<Image
				src={`/sponsors/${logo}`}
				alt={`${title} logo`}
				width={200}
				height={200}
				layout="responsive"
		/>
		</a>
	</div> 
	: <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><Paragraph textAlign="center"><a style={{color: "white"}} href={url} target="_blank">{title}</a></Paragraph></div>
}
export default Sponsor

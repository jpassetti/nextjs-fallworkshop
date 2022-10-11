import Icon from './Icon'

import classNames from 'classnames/bind'
import styles from './socialmedialinks.module.scss'

let cx = classNames.bind(styles);


const SocialMediaLinks = ({linksInformation, color}) => {
	const {linkedinUrl, instagramUrl, twitterUrl, websiteUrl, links} = linksInformation;
	let socialLinksAnchorClasses = cx({
		socialLinksAnchor: true,
		[`color-${color}`] : color
	});
	const getCorrespondingUrl = (link) => {
		switch (link) {
			case 'linkedin':
				return linkedinUrl;
				break;
			case 'instagram':
				return instagramUrl;
				break;
			case 'twitter':
				return twitterUrl;
				break;
			case 'website':
				return websiteUrl;
				break;
			}
	}
	return <ul className={styles.socialLinksList}>
		{links.map((link, index)=> {
			return <li key={index} className={styles.socialLinksListItem}>
				<a target="_blank" href={getCorrespondingUrl(link)} className={socialLinksAnchorClasses}>
					<Icon icon={link} />
				</a>
			</li>
		})}
	</ul>
}
export default SocialMediaLinks

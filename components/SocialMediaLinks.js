import Icon from './Icon'

import classNames from 'classnames/bind'
import styles from './socialmedialinks.module.scss'

let cx = classNames.bind(styles);


const SocialMediaLinks = ({links, color}) => {
	let socialLinksAnchorClasses = cx({
		socialLinksAnchor: true,
		[`color-${color}`] : color
	});
	return <ul className={styles.socialLinksList}>
		{links.map((link, index)=> {
			const {type, url} = link;
			return <li key={index} className={styles.socialLinksListItem}>
				<a href={url} className={socialLinksAnchorClasses}>
					<Icon icon={type} />
				</a>
			</li>
		})}
	</ul>
}
export default SocialMediaLinks

import Heading from './Heading'

import classNames from 'classnames/bind';
import styles from './section.module.scss'

let cx = classNames.bind(styles)

const Section = ({children, id, title, backgroundColor}) => {
	let sectionClasses = cx({
		[`section`] : true,
		[`background-color-${backgroundColor}`] : backgroundColor
	})
	return <section id={id} className={sectionClasses}>
		<Heading level="2" textAlign="center" marginBottom="4">{title}</Heading>
		{children}
	</section>
}
export default Section

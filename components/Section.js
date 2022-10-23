import Heading from './Heading'

import classNames from 'classnames/bind';
import styles from './section.module.scss'

let cx = classNames.bind(styles)

const Section = ({children, id, title, backgroundColor, paddingBottom}) => {
	let sectionClasses = cx({
		[`section`] : true,
		[`background-color-${backgroundColor}`] : backgroundColor,
		[`padding-bottom-${paddingBottom}`] : paddingBottom
	})
	return <section id={id} className={sectionClasses}>
		<Heading level="2" textAlign="center" marginBottom="4" color={backgroundColor === "blue" ? "white" : ''}>{title}</Heading>
		{children}
	</section>
}
export default Section

import classNames from 'classnames/bind';
import * as styles from './paragraph.module.scss';

let cx = classNames.bind(styles);

const Paragraph = ({
	type, 
	caps,
	children, 
	className,
	condensed,
	color,
	diminish,
	marginBottom, 
	marginTop,
	textAlign,
	fontWeight
}) => {

	let paragraphClasses = cx({
		paragraph: true,
		intro: type === 'intro',
		[`margin-bottom-${marginBottom}`] : marginBottom,
		[`margin-top-${marginTop}`]: marginTop,
		diminish : diminish,
		[`text-align-${textAlign}`] : textAlign,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`font-color-${color}`] : color,
		[`condensed`]: condensed,
		[`caps`]: caps
	});
	return <p className={`${paragraphClasses} ${className}`}>{children}</p>
}
export default Paragraph;

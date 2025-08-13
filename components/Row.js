import classNames from 'classnames/bind';
import styles from './row.module.scss'

let cx = classNames.bind(styles)

const Row = ({
	borderPosition, // 'top', 'bottom', 'left', 'right'
	borderSize,     // 1, 2, etc.
	borderColor,    // 'orange', 'blue', etc.
	gap,            // 1, 2, etc.
	children,
	alignItems,
	justifyContent,
	flexDirection,
	th, tr,
	marginTop,
	marginRight,
	marginBottom,
	marginLeft,
	paddingTop,
	paddingRight,
	paddingBottom,
	paddingLeft,
	paddingAll,
}) => {
	let rowClasses = cx({
		row: true,
		[`align-items-${alignItems}`]: alignItems,
		[`justify-content-${justifyContent}`]: justifyContent,
		[`flex-direction-${flexDirection}`]: flexDirection,
		[`table-header`]: th,
		[`table-row`]: tr,
		[`margin-top-${marginTop}`]: marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`padding-top-${paddingTop}`]: paddingTop,
		[`padding-right-${paddingRight}`]: paddingRight,
		[`padding-bottom-${paddingBottom}`]: paddingBottom,
		[`padding-left-${paddingLeft}`]: paddingLeft,
		[`padding-all-${paddingAll}`]: paddingAll,
		// Border classes
		[
			borderPosition && borderSize && borderColor
				? `border-${borderPosition}-${borderSize}-${borderColor}`
				: null
		]: borderPosition && borderSize && borderColor,
		// Gap class
		[gap ? `gap-${gap}` : null]: gap,
	});
	return <div className={rowClasses}>{children}</div>;
};
export default Row;

import classNames from 'classnames/bind';
import styles from './row.module.scss'

let cx = classNames.bind(styles)

const Row = ({children, alignItems, justifyContent, flexDirection}) => {
	let rowClasses = cx({
		row: true,
		[`align-items-${alignItems}`] : alignItems,
		[`justify-content-${justifyContent}`] : justifyContent,
		[`flex-direction-${flexDirection}`] : flexDirection
	});
	return <div className={rowClasses}>{children}</div>
}
export default Row;
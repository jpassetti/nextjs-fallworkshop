import classNames from 'classnames/bind';
import * as styles from './container.module.scss';

let cx = classNames.bind(styles)

const Container = ({ type, children, content, size }) => {
	let containerClasses = cx({
		container: true,
		full: type === "full",
		content: content,
		[`size-${size}`] : size
	});
	return <div className={containerClasses}>{children}</div>
}
export default Container;

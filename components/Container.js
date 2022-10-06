import classNames from 'classnames/bind';
import * as styles from './container.module.scss';

let cx = classNames.bind(styles)

const Container = ({ type, children, content }) => {
	let containerClasses = cx({
		container: true,
		full: type === "full",
		content: content
	});
	return <div className={containerClasses}>{children}</div>
}
export default Container;

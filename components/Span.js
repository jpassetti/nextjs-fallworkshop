import classNames from 'classnames/bind'
import styles from './span.module.scss';

let cx = classNames.bind(styles);

const Span = ({children, firstName, lastName, display="inline-block"}) => {

	let spanClasses = cx({
		[`firstName`] : firstName,
		[`lastName`] : lastName,
		[`display-${display}`] : display
	});
	return <span className={spanClasses}>{children}</span>
}
export default Span;

import classNames from 'classnames/bind'
import styles from './span.module.scss';

let cx = classNames.bind(styles);

const Span = ({children, firstName, lastName}) => {

	let spanClasses = cx({
		[`firstName`] : firstName,
		[`lastName`] : lastName
	});
	return <span className={spanClasses}>{children}</span>
}
export default Span;

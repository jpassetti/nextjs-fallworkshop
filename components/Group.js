import classNames from 'classnames/bind';
import styles from './group.module.scss';

let cx = classNames.bind(styles)

const Group = ({children, flex}) => {
	let groupClasses = cx({
		group : true,
		flex: flex
	});
	return <div className={groupClasses}>{children}</div>
}
export default Group;

import classNames from 'classnames/bind'
import styles from './tab.module.scss';

let cx = classNames.bind(styles);
// todo: tabbing, on enter, make active
const Tab = ({children, clickHandler, activeTab}) => {
	let tabClasses = cx({
		tab: true,
		active: activeTab
	});
	const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
     	clickHandler();
    }
  }
	return <li tabIndex="0" onClick={clickHandler} onKeyDown={handleKeyDown} className={tabClasses}>{children}</li>
}
export default Tab;

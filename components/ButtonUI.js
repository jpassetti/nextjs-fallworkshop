import Icon from './Icon'

import classNames from 'classnames/bind';
import * as styles from './buttonui.module.scss';

let cx = classNames.bind(styles);



const ButtonUI = ({icon, clickHandler, color, id}) => {
	let btnuiClasses = cx({
		btnui : true,
		[`btnui--close`] : id === "closeBtn"
	});
	return <button className={btnuiClasses} onClick={clickHandler} id={id}>
		<Icon icon={icon} color={color} />
	</button>
}
export default ButtonUI

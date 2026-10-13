import Icon from "@/components/media/Icon"

import classNames from "classnames/bind";
import * as styles from "./button.module.scss";

let cx = classNames.bind(styles);



const ButtonUI = ({icon, clickHandler, color, id}: any) => {
	let btnuiClasses = cx({
		btn__ui : true,
		[`btn__ui--close`] : id === "closeBtn"
	});
	return <button className={btnuiClasses} onClick={clickHandler} id={id}>
		<Icon icon={icon} color={color} />
	</button>
}
export default ButtonUI

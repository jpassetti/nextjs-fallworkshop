import classNames from "classnames/bind";
import * as styles from "./container.module.scss";
import type { ReactNode } from "react";

let cx = classNames.bind(styles)

type ContainerProps = {
	type?: "full";
	children?: ReactNode;
	content?: boolean;
	size?: string;
};

const Container = ({ type, children, content, size }: ContainerProps) => {
	let containerClasses = cx({
		container: true,
		full: type === "full",
		content: content,
		[`size-${size}`] : size
	});
	return <div className={containerClasses}>{children}</div>
}
export default Container;

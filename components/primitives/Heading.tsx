import classNames from "classnames/bind"
import styles from "./heading.module.scss";
import type { ElementType, ReactNode } from "react";

let cx = classNames.bind(styles);

type HeadingProps = {
	borderTop?: string;
	children?: ReactNode;
	className?: string;
	color?: string;
	fontFamily?: string;
	fontStyle?: string;
	fontWeight?: string;
	level: number | string;
	lineHeight?: string;
	marginTop?: string | number;
	marginBottom?: string | number;
	marginLeft?: string | number;
	marginRight?: string | number;
	textAlign?: string;
	textTransform?: string;
	size?: string;
};

const Heading = ({
	borderTop,
	children, 
	className = "",
	color="blue", 
	fontFamily = "primary",
	fontStyle = "normal",
	fontWeight = "bold",
	level, 
	lineHeight = "normal",
	marginTop, 
	marginBottom, 
	marginLeft, 
	marginRight, 
	textAlign = "left", 
	textTransform,
	size
}: HeadingProps) => {
	const headingLevel = Number(level);
	const normalizedLevel = Number.isFinite(headingLevel)
		? Math.max(1, Math.min(6, headingLevel))
		: 2;
	const tagName = `h${normalizedLevel}`;
	const Tag = tagName as ElementType;

	let headingClasses = cx({
		heading: true,
		[tagName]: normalizedLevel,
		[`text-align-${textAlign}`] : textAlign,
		[`margin-top-${marginTop}`] : marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`border-top-${borderTop}`] : borderTop,
		[`text-transform-${textTransform}`] : textTransform,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`font-color-${color}`] : color,
		[`font-style-${fontStyle}`] : fontStyle,
		[`line-height-${lineHeight}`] : lineHeight,
		[`font-family-${fontFamily}`] : fontFamily,
		[`size-${size}`] : size
	});

	return <Tag className={`${headingClasses} ${className}`}>{children}</Tag>
}
export default Heading

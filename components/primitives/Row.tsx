import classNames from "classnames/bind";
import styles from "./row.module.scss"
import type { ReactNode } from "react";

let cx = classNames.bind(styles)

type RowProps = {
	borderPosition?: "top" | "right" | "bottom" | "left";
	borderSize?: 1 | 2 | 3 | 4 | 5;
	borderColor?: "orange" | "orange_10" | "blue" | "blue_10" | "black" | "white";
	borderBottom?: string | number;
	borderTop?: string | number;
	borderLeft?: string | number;
	borderRight?: string | number;
	gap?: 1 | 2 | 3 | 4 | 5;
	children?: ReactNode;
	alignItems?: string;
	justifyContent?: string;
	flexDirection?: string;
	th?: boolean;
	tr?: boolean;
	marginTop?: string | number;
	marginRight?: string | number;
	marginBottom?: string | number;
	marginLeft?: string | number;
	paddingTop?: string | number;
	paddingRight?: string | number;
	paddingBottom?: string | number;
	paddingLeft?: string | number;
	paddingAll?: string | number;
};

const Row = ({
	borderPosition, // 'top', 'bottom', 'left', 'right'
	borderSize,     // 1, 2, etc.
	borderColor,    // 'orange', 'blue', etc.
	gap,            // 1, 2, etc.
	children,
	alignItems,
	justifyContent,
	flexDirection,
	th, tr,
	marginTop,
	marginRight,
	marginBottom,
	marginLeft,
	paddingTop,
	paddingRight,
	paddingBottom,
	paddingLeft,
	paddingAll,
}: RowProps) => {
	let rowClasses = cx({
		row: true,
		[`align-items-${alignItems}`]: alignItems,
		[`justify-content-${justifyContent}`]: justifyContent,
		[`flex-direction-${flexDirection}`]: flexDirection,
		[`table-header`]: th,
		[`table-row`]: tr,
		[`margin-top-${marginTop}`]: marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`padding-top-${paddingTop}`]: paddingTop,
		[`padding-right-${paddingRight}`]: paddingRight,
		[`padding-bottom-${paddingBottom}`]: paddingBottom,
		[`padding-left-${paddingLeft}`]: paddingLeft,
		[`padding-all-${paddingAll}`]: paddingAll,
		...(borderPosition && borderSize && borderColor
			? {
					[`border-${borderPosition}-${borderSize}-${borderColor}`]: true,
			  }
			: {}),
		...(gap
			? {
					[`gap-${gap}`]: true,
			  }
			: {}),
	});
	return <div className={rowClasses}>{children}</div>;
};
export default Row;

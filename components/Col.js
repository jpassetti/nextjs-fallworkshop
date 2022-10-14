import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './col.module.scss';

let cx = classNames.bind(styles);

const Col = ({ 
	children, 
	xs, 
	sm, 
	md, 
	lg, 
	xl, 
	fontSize,
	fontWeight,
	position, 
	marginTop,
	marginRight,
	marginBottom="2",
	marginLeft,
	paddingTop,
	paddingRight="1",
	paddingBottom,
	paddingLeft="1",
	th,
	td,
	textAlign,
	flexOrder
}) => {
	
	const responsiveOrderArr = flexOrder ? flexOrder.split(" ") : null;
	const responsiveOrderObj = {};
	responsiveOrderArr?.forEach(string => {
		const [key, value] = string.split(":");
		responsiveOrderObj[key] = value;
	});

	let colClasses = cx({
		col: true,
		[`col__xs__${xs}`]: xs,
		[`col__sm__${sm}`]: sm,
		[`col__md__${md}`] : md,
		[`col__lg__${lg}`]: lg,
		[`col__xl__${xl}`]: xl,
		sticky : position === 'sticky',
		[`margin-top-${marginTop}`] : marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`padding-top-${paddingTop}`] : paddingTop,
		[`padding-right-${paddingRight}`]: paddingRight,
		[`padding-bottom-${paddingBottom}`]: paddingBottom,
		[`padding-left-${paddingLeft}`]: paddingLeft,
		[`table-header`] : th,
		[`table-data-cell`] : td,
		[`text-align-${textAlign}`] : textAlign,
		[`font-size-${fontSize}`] : fontSize,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`flex-order-xs-${responsiveOrderObj['xs']}`]: responsiveOrderObj.hasOwnProperty('xs'),
		[`flex-order-sm-${responsiveOrderObj['sm']}`]: responsiveOrderObj.hasOwnProperty('sm'),
		[`flex-order-md-${responsiveOrderObj['md']}`]: responsiveOrderObj.hasOwnProperty('md'),
		[`flex-order-lg-${responsiveOrderObj['lg']}`]: responsiveOrderObj.hasOwnProperty('lg'),
		[`flex-order-xl-${responsiveOrderObj['xl']}`]: responsiveOrderObj.hasOwnProperty('xl'),
	});

	return <div className={colClasses}>{children}</div>
}
export default Col;

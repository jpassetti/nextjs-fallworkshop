import classNames from 'classnames/bind'

import styles from './imagewrapper.module.scss'

let cx = classNames.bind(styles);


const ImageWrapper = ({children, size, margin, marginTop}) => {
	let imageWrapperClasses = cx({
		imagewrapper : true,
		[`size-${size}`] : size,
		[`margin-${margin}`] : margin,
		[`margin-top-${marginTop}`] : marginTop
	});
	return <div className={imageWrapperClasses}>{children}</div>
}
export default ImageWrapper

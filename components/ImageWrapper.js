import classNames from 'classnames/bind'

import styles from './imagewrapper.module.scss'

let cx = classNames.bind(styles);


const ImageWrapper = ({children, size}) => {
	let imageWrapperClasses = cx({
		imagewrapper : true,
		[`size-${size}`] : size
	});
	return <div className={imageWrapperClasses}>{children}</div>
}
export default ImageWrapper

import styles from './imagewrapper.module.scss'

const ImageWrapper = ({children}) => {
	return <div className={styles.imagewrapper}>{children}</div>
}
export default ImageWrapper

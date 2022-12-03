import classNames from 'classnames/bind'
import styles from './vimeo.module.scss';

let cx = classNames.bind(styles);

const Vimeo = ({src}) => {
	console.log({src});
	const vimeoClasses = cx({
		[`embed-responsive`] : true,
		[`embed-responsive-16by9`] : true
	})
	const iframeClasses = cx({
		[`embed-responsive-item`] : true,
	})
	const vimeoId = src?.substring(src.length - 9);

	return src ? <div className={vimeoClasses}><iframe className={iframeClasses} title="The Fall Workshop 2019" src={`https://player.vimeo.com/video/${vimeoId}`} width="500" height="281" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen="" data-ready="true"></iframe></div>: '';
}
export default Vimeo;

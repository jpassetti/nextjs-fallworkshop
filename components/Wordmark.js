import styles from './wordmark.module.scss'
import Paragraph from './Paragraph'

const Wordmark = () => {
	return <div className={styles.wordmarkContainer}>
		<h1 className={styles.wordmark}>The Fall Workshop</h1>
		<Paragraph textAlign="center" fontWeight="bold">Oct. 20-23, 2022</Paragraph>
	</div>
}
export default Wordmark;

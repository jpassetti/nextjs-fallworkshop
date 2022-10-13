import styles from './tabs.module.scss'

const Tabs = ({children}) => {
	return <ul className={styles.tabs}>{children}</ul>
}
export default Tabs;

import styles from "./tabs.module.scss"

const Tabs = ({children}: any) => {
	return <ul className={styles.tabs}>{children}</ul>
}
export default Tabs;

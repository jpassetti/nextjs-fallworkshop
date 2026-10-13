import styles from "./main.module.scss"

const Main = ({children}: any) => {
	return <main className={styles.main}>{children}</main>
}
export default Main

import styles from "./grid.module.scss"

const Grid = ({children}: any) => {
	return <div className={styles.grid}>{children}</div>
}
export default Grid;

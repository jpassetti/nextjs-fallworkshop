import styles from "./strong.module.scss";

const Strong = ({ children }: any) => {
    return <strong className={styles.strong}>{children}</strong>;
};

export default Strong;
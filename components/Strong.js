import styles from './strong.module.scss';

const Strong = ({ children }) => {
    return <strong className={styles.strong}>{children}</strong>;
};

export default Strong;
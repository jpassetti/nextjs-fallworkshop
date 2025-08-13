import styles from './button.module.scss';

const ButtonCTA = ({ label, onClick }) => {
    return (
        <button className={styles.btn__cta} onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonCTA;
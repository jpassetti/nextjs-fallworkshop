import styles from './button.module.scss';
import Link from 'next/link';

const ButtonCTA = ({ label, href, onClick, ...props }) => {
    // If href is provided, determine if it's internal or external
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

    if (href) {
        if (isExternal) {
            return (
                <a
                    className={styles.btn__cta}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {label}
                </a>
            );
        } else {
            return (
                <Link href={href} passHref legacyBehavior>
                    <a className={styles.btn__cta} {...props}>
                        {label}
                    </a>
                </Link>
            );
        }
    }
    // Fallback to button if no href
    return (
        <button className={styles.btn__cta} onClick={onClick} {...props}>
            {label}
        </button>
    );
};

export default ButtonCTA;
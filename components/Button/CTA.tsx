import styles from "./button.module.scss";
import Link from "next/link";

type ButtonCTAVariant = "primary" | "inverse";

type ButtonCTAProps = {
    label: string;
    href?: string;
    onClick?: (...args: any[]) => void;
    variant?: ButtonCTAVariant;
    hero?: boolean;
    className?: string;
} & Record<string, any>;

const ButtonCTA = ({
    label,
    href,
    onClick,
    variant = "primary",
    hero = false,
    className = "",
    ...props
}: ButtonCTAProps) => {
    const variantClass = variant === "inverse" ? styles.btn__ctaInverse : "";
    const heroClass = hero ? styles.btn__ctaHero : "";
    const buttonClass = `${styles.btn__cta} ${variantClass} ${heroClass} ${className}`.trim();

    // If href is provided, determine if it's internal or external
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

    if (href) {
        if (isExternal) {
            return (
                <a
                    className={buttonClass}
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
                <Link href={href} className={buttonClass} {...props}>
                    {label}
                </Link>
            );
        }
    }
    // Fallback to button if no href
    return (
        <button className={buttonClass} onClick={onClick} {...props}>
            {label}
        </button>
    );
};

export default ButtonCTA;
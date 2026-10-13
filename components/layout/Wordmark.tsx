import styles from "./wordmark.module.scss";
import Paragraph from "@/components/primitives/Paragraph";
import Link from "next/link";
import { getWorkshopDates } from "@/lib/workshopDates";

type WordmarkProps = {
    year?: string;
    workshopDates?: string | null;
    compact?: boolean;
    invert?: boolean;
};

const Wordmark = ({
    year,
    workshopDates,
    compact = false,
    invert = false,
}: WordmarkProps) => {
    // If year is not provided, use latest
    const dates = workshopDates || getWorkshopDates(year);
    return (
        <div
            className={`${styles.wordmarkContainer} ${compact ? styles.wordmarkContainerCompact : ""} ${invert ? styles.wordmarkContainerInvert : ""}`}
        >
            <h1
                className={`${styles.wordmark} ${compact ? styles.wordmarkCompact : ""} ${invert ? styles.wordmarkInvert : ""}`}
            >
                <Link href="/">The Alexia Fall Workshop</Link>
            </h1>
            {!compact && (
                <Paragraph
                    textAlign="center"
                    fontWeight="bold"
                    color={invert ? "white" : undefined}
                    className={invert ? styles.wordmarkDatesInvert : ""}
                >
                    {dates}
                </Paragraph>
            )}
        </div>
    );
};
export default Wordmark;

import styles from "./wordmark.module.scss";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { getWorkshopDates } from "../lib/workshopDates";

const Wordmark = ({ year }) => {
    // If year is not provided, use latest
    const dates = getWorkshopDates(year);
    return (
        <div className={styles.wordmarkContainer}>
            <h1 className={styles.wordmark}>
                <Link href="/">
                    <a>The Alexia Fall Workshop</a>
                </Link>
            </h1>
            <Paragraph textAlign="center" fontWeight="bold">
                {dates}
            </Paragraph>
        </div>
    );
};
export default Wordmark;

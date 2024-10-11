import styles from "./wordmark.module.scss";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Link from "next/link";

const Wordmark = () => {
 return (
  <div className={styles.wordmarkContainer}>
   <h1 className={styles.wordmark}>
    <Link href="/">
     <a>The Alexia Fall Workshop</a>
    </Link>
   </h1>
   <Paragraph textAlign="center" fontWeight="bold">
    Oct. 17-20, 2024
   </Paragraph>
  </div>
 );
};
export default Wordmark;

import type { StoryImageNode } from "@/app/_views/types";
import { plainText } from "@/lib/seo";
import styles from "./photo-caption.module.scss";

const PhotoCaption = ({ image }: { image: StoryImageNode }) => {
  const caption = plainText(image.caption);
  if (!caption && !image.creditText && !image.copyrightNotice && !image.license && !image.acquireLicensePage) return null;
  return (
    <figcaption className={styles.caption}>
      {caption && <p className={styles.captionText}>{caption}</p>}
      {image.creditText && (
        <p className={styles.metaLine}>
          <span className={styles.metaLabel}>Photo:</span> {image.creditText}
        </p>
      )}
      {image.copyrightNotice && <p className={styles.metaLine}>{image.copyrightNotice}</p>}
      {image.license && (
        <p className={styles.metaLine}>
          <a href={image.license}>Image license</a>
        </p>
      )}
      {image.acquireLicensePage && (
        <p className={styles.metaLine}>
          <a href={image.acquireLicensePage}>Licensing inquiries</a>
        </p>
      )}
    </figcaption>
  );
};
export default PhotoCaption;

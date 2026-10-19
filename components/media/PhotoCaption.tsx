import type { StoryImageNode } from "@/app/_views/types";
import { plainText } from "@/lib/seo";
import styles from "./photo-caption.module.scss";

const PhotoCaption = ({ image }: { image: StoryImageNode }) => {
  const caption = plainText(image.caption);
  if (!caption && !image.creditText && !image.copyrightNotice && !image.license && !image.acquireLicensePage) return null;
  return (
    <figcaption className={styles.caption}>
      {caption && <p>{caption}</p>}
      {image.creditText && <p>Photo: {image.creditText}</p>}
      {image.copyrightNotice && <p>{image.copyrightNotice}</p>}
      {image.license && <p><a href={image.license}>Image license</a></p>}
      {image.acquireLicensePage && <p><a href={image.acquireLicensePage}>Licensing inquiries</a></p>}
    </figcaption>
  );
};
export default PhotoCaption;

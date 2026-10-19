"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./vimeo-lightbox.module.scss";

type VimeoLightboxProps = {
 src: string;
 title?: string;
};

const extractVimeoId = (url: string) => {
 const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)(?:$|[?/])/i);
 return match?.[1] ?? null;
};

const VimeoLightbox = ({ src, title = "Workshop video" }: VimeoLightboxProps) => {
 const [open, setOpen] = useState(false);
 const vimeoId = useMemo(() => extractVimeoId(src), [src]);

 const thumbnailSrc = vimeoId ? `https://vumbnail.com/${vimeoId}.jpg` : src;
 const videoSrc = vimeoId
  ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
  : src;

 useEffect(() => {
  if (!open) {
   return;
  }

  const onKeyDown = (event: KeyboardEvent) => {
   if (event.key === "Escape") {
    setOpen(false);
   }
  };

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onKeyDown);

  return () => {
   document.body.style.overflow = previousOverflow;
   document.removeEventListener("keydown", onKeyDown);
  };
 }, [open]);

 return (
  <>
   <button
    type="button"
    className={styles.videoTrigger}
    onClick={() => setOpen(true)}
    aria-label={`Play ${title}`}
   >
    <Image
     src={thumbnailSrc}
     alt={title}
     width={1280}
     height={720}
     loading="eager"
     sizes="(max-width: 980px) 100vw, 44rem"
     className={styles.videoThumbnail}
    />
    <span className={styles.videoOverlay} aria-hidden="true" />
    <span className={styles.playButton} aria-hidden="true">
     <span className={styles.playTriangle} />
    </span>
   </button>

   {open &&
    createPortal(
     <div
      className={styles.lightboxBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => setOpen(false)}
     >
      <div className={styles.lightboxFrame} onClick={(event) => event.stopPropagation()}>
       <button
        type="button"
        className={styles.closeButton}
        onClick={() => setOpen(false)}
        aria-label="Close video"
       >
        ×
       </button>
       <div className={styles.lightboxVideo}>
        <iframe
         title={title}
         src={videoSrc}
         allow="autoplay; fullscreen; picture-in-picture"
         allowFullScreen
        />
       </div>
      </div>
     </div>,
     document.body
    )}
  </>
 );
};

export default VimeoLightbox;

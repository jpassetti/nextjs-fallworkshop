"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./page-transition.module.scss";

type PageTransitionProps = {
  children: ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={styles.scene}
        initial={{
          opacity: 0,
          y: 34,
          filter: "blur(9px)",
          scale: 0.988,
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -28,
          filter: "blur(8px)",
          scale: 0.99,
        }}
        transition={{
          opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.82, ease: [0.16, 1, 0.3, 1] },
          filter: { duration: 0.68, ease: "easeOut" },
          scale: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{ willChange: "transform, opacity, filter" }}
      >
        <motion.div
          className={styles.overlayPrimary}
          initial={{ opacity: 0, scaleX: 0, transformOrigin: "left center" }}
          animate={{ opacity: 0, scaleX: 0, transformOrigin: "right center" }}
          exit={{ opacity: 1, scaleX: 1, transformOrigin: "left center" }}
          transition={{
            opacity: { duration: 0.56, ease: "easeInOut" },
            scaleX: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
          }}
        />
        <motion.div
          className={styles.overlayAccent}
          initial={{ opacity: 0, scaleX: 0, transformOrigin: "right center" }}
          animate={{ opacity: 0, scaleX: 0, transformOrigin: "left center" }}
          exit={{ opacity: 0.7, scaleX: 1, transformOrigin: "right center" }}
          transition={{
            opacity: { duration: 0.5, ease: "easeInOut", delay: 0.05 },
            scaleX: { duration: 0.62, ease: [0.83, 0, 0.17, 1], delay: 0.04 },
          }}
        />
        <motion.div
          className={styles.content}
          initial={{ y: 18, opacity: 0.92 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0.9 }}
          transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

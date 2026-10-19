"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  as?: "div" | "article";
  delay?: number;
};

const Reveal = ({ as = "div", delay = 0, children, ...props }: RevealProps) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement & HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: "some", margin: "0px 0px -64px 0px" });
  const Component = as === "article" ? motion.article : motion.div;

  return (
    <Component
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Reveal;

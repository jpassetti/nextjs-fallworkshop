import classNames from "classnames/bind";
import * as styles from "./paragraph.module.scss";
import type { ReactNode } from "react";

let cx = classNames.bind(styles);

type ParagraphProps = {
  type?: "intro" | "caption";
  caps?: boolean;
  children?: ReactNode;
  className?: string;
  condensed?: boolean;
  color?: string;
  diminish?: boolean;
  marginBottom?: string | number;
  marginTop?: string | number;
  textAlign?: string;
  fontWeight?: string;
  html?: string;
};

const Paragraph = ({
  type,
  caps,
  children,
  className = "",
  condensed,
  color,
  diminish,
  marginBottom,
  marginTop,
  textAlign,
  fontWeight,
  html,
}: ParagraphProps) => {
  let paragraphClasses = cx({
    paragraph: true,
    intro: type === "intro",
    caption: type === "caption",
    [`margin-bottom-${marginBottom}`]: marginBottom,
    [`margin-top-${marginTop}`]: marginTop,
    diminish: diminish,
    [`text-align-${textAlign}`]: textAlign,
    [`font-weight-${fontWeight}`]: fontWeight,
    [`font-color-${color}`]: color,
    [`condensed`]: condensed,
    [`caps`]: caps,
  });
  return (
    <p
      className={`${paragraphClasses} ${className}`}
      {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
    >
      {!html ? children : null}
    </p>
  );
};
export default Paragraph;

import { resolveFontWeight, responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import {
  LinkUnderline,
  Responsive,
  TextAlign,
  TextSize,
  TextTrim,
  TextWeight,
  TextWrap,
  ThemeColor,
} from "@/types/variant-types";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  buildLayoutProps,
  stripLayoutProps,
  type LayoutProps,
} from "./layout-props";

const WRAP_MAP: Record<TextWrap, string> = {
  wrap: "whitespace-normal",
  nowrap: "whitespace-nowrap",
  pretty: "text-pretty",
  balance: "text-balance",
};

const TRIM_MAP: Record<TextTrim, string> = {
  normal: "trim-normal",
  start: "trim-start",
  end: "trim-end",
  both: "trim-both",
};

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, LayoutProps {
  type?: "text" | "heading";
  as?:
    | "span"
    | "div"
    | "label"
    | "p"
    | "pre"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  asChild?: boolean;
  size?: Responsive<TextSize>;
  align?: Responsive<TextAlign>;
  weight?: Responsive<TextWeight>;
  wrap?: TextWrap;
  trim?: TextTrim;
  truncate?: boolean;
  uppercase?: boolean;
  preserveLineBreaks?: boolean;
  color?: ThemeColor | string;
  highContrast?: boolean;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  size?: Responsive<TextSize>;
  weight?: Responsive<TextWeight>;
  underline?: LinkUnderline;
  wrap?: TextWrap;
  truncate?: boolean;
  uppercase?: boolean;
  color?: ThemeColor | string;
  highContrast?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>((props, ref) => {
  const {
    className,
    style,
    type = "text",
    align,
    weight,
    wrap,
    trim,
    truncate,
    uppercase,
    preserveLineBreaks,
    size = "1",
    asChild,
    as: Tag = "span",
    color,
    highContrast,
    ...rest
  } = props;
  const Component = (asChild ? Slot : Tag) as React.ElementType;
  const { className: layoutCls, style: layoutStyle } = buildLayoutProps(rest);
  const htmlProps = stripLayoutProps(rest);

  return (
    <Component
      ref={ref}
      data-accent-color={color}
      className={cn(
        "ui-reset",
        type === "heading" ? "ui-Heading" : "ui-Text",
        responsiveClass("ui-r-size", size),
        responsiveClass("text", align),
        resolveFontWeight(weight),
        wrap && WRAP_MAP[wrap],
        trim && TRIM_MAP[trim],
        truncate && "truncate",
        uppercase && "uppercase",
        preserveLineBreaks && "whitespace-pre-line",
        highContrast && "ui-high-contrast",
        layoutCls,
        className,
      )}
      style={{ ...layoutStyle, ...style }}
      {...htmlProps}
    />
  );
});

export const Heading = React.forwardRef<
  HTMLElement,
  Omit<TextProps, "type" | "as"> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }
>(({ as = "h1", ...props }, ref) => (
  <Text ref={ref} as={as} {...props} type="heading" />
));

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      className,
      underline = "auto",
      weight,
      wrap,
      truncate,
      uppercase,
      size = "1",
      asChild,
      color,
      highContrast,
      ...rest
    } = props;

    const Component = (asChild ? Slot : "a") as React.ElementType;

    return (
      <Component
        ref={ref}
        data-accent-color={color}
        className={cn(
          "ui-reset ui-Text ui-Link",
          `ui-underline-${underline}`,
          responsiveClass("ui-r-size", size),
          resolveFontWeight(weight),
          wrap && WRAP_MAP[wrap],
          truncate && "truncate",
          uppercase && "uppercase",
          highContrast && "ui-high-contrast",
          className,
        )}
        {...rest}
      />
    );
  },
);

Text.displayName = "Text";
Heading.displayName = "Heading";
Link.displayName = "Link";

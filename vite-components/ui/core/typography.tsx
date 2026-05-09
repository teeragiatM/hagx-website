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
import { buildLayoutProps, stripLayoutProps, type LayoutProps } from "@ui";
import * as React from "react";

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
  color?: ThemeColor;
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
    size,
    asChild,
    as: Tag = "span",
    color,
    highContrast,
    ...rest
  } = props;
  const Component = (asChild ? Slot : Tag) as React.ElementType;
  const { className: layoutCls, style: layoutStyle } = buildLayoutProps(
    rest as LayoutProps
  );
  const htmlProps = stripLayoutProps(rest as TextProps & LayoutProps);

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
        highContrast && "ui-high-contrast",
        layoutCls,
        className
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
>((props, ref) => <Text ref={ref} as="h1" {...props} type="heading" />);

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      className,
      underline = "auto",
      weight,
      wrap,
      truncate,
      size,
      asChild,
      color,
      highContrast,
      ...rest
    } = props;

    const Component = (asChild ? Slot : "a") as React.ElementType;

    return (
      <Component
        ref={ref}
        data-accent-color={color ?? ""}
        className={cn(
          "ui-reset ui-Text ui-Link",
          `ui-underline-${underline}`,
          responsiveClass("ui-r-size", size),
          resolveFontWeight(weight),
          wrap && WRAP_MAP[wrap],
          truncate && "truncate",
          highContrast && "ui-high-contrast",
          className
        )}
        {...rest}
      />
    );
  }
);

Text.displayName = "Text";
Heading.displayName = "Heading";
Link.displayName = "Link";

/**
 * Layout primitives: Box, Flex, Grid
 * Mirrors Radix Themes API, outputs Tailwind classes directly.
 */
import {
  resolveArbitraryProp,
  resolveFlexProp,
  resolveFlexSize,
  resolveGap,
  resolveGapX,
  resolveGapY,
  resolveGridTrack,
  resolveSpaceProp,
  responsiveClass,
  type Responsive,
} from "@/lib/responsive";
import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";
import * as React from "react";

export type { Responsive };

// ═══════════════════════════════════════════════════════════════════════════
// Shared LayoutProps
// ═══════════════════════════════════════════════════════════════════════════

export interface LayoutProps {
  p?: Responsive<string>;
  px?: Responsive<string>;
  py?: Responsive<string>;
  pt?: Responsive<string>;
  pr?: Responsive<string>;
  pb?: Responsive<string>;
  pl?: Responsive<string>;
  m?: Responsive<string>;
  mx?: Responsive<string>;
  my?: Responsive<string>;
  mt?: Responsive<string>;
  mr?: Responsive<string>;
  mb?: Responsive<string>;
  ml?: Responsive<string>;
  width?: Responsive<string>;
  minWidth?: Responsive<string>;
  maxWidth?: Responsive<string>;
  height?: Responsive<string>;
  minHeight?: Responsive<string>;
  maxHeight?: Responsive<string>;
  position?: Responsive<
    "static" | "relative" | "absolute" | "fixed" | "sticky"
  >;
  inset?: Responsive<string>;
  top?: Responsive<string>;
  right?: Responsive<string>;
  bottom?: Responsive<string>;
  left?: Responsive<string>;
  overflow?: Responsive<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  overflowX?: Responsive<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  overflowY?: Responsive<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  flex?: Responsive<string>;
  flexBasis?: Responsive<string>;
  flexShrink?: Responsive<"0" | "1" | string>;
  flexGrow?: Responsive<"0" | "1" | string>;
  gridArea?: Responsive<string>;
  gridColumn?: Responsive<string>;
  gridColumnStart?: Responsive<string>;
  gridColumnEnd?: Responsive<string>;
  gridRow?: Responsive<string>;
  gridRowStart?: Responsive<string>;
  gridRowEnd?: Responsive<string>;
}

const LAYOUT_KEYS: Record<keyof LayoutProps, 1> = {
  p: 1,
  px: 1,
  py: 1,
  pt: 1,
  pr: 1,
  pb: 1,
  pl: 1,
  m: 1,
  mx: 1,
  my: 1,
  mt: 1,
  mr: 1,
  mb: 1,
  ml: 1,
  width: 1,
  minWidth: 1,
  maxWidth: 1,
  height: 1,
  minHeight: 1,
  maxHeight: 1,
  position: 1,
  inset: 1,
  top: 1,
  right: 1,
  bottom: 1,
  left: 1,
  overflow: 1,
  overflowX: 1,
  overflowY: 1,
  flex: 1,
  flexBasis: 1,
  flexShrink: 1,
  flexGrow: 1,
  gridArea: 1,
  gridColumn: 1,
  gridColumnStart: 1,
  gridColumnEnd: 1,
  gridRow: 1,
  gridRowStart: 1,
  gridRowEnd: 1,
};

function stripLayoutProps<T extends LayoutProps>(
  props: T
): Omit<T, keyof LayoutProps> {
  const result = { ...props };
  for (const key of Object.keys(LAYOUT_KEYS) as (keyof LayoutProps)[]) {
    delete result[key];
  }
  return result as Omit<T, keyof LayoutProps>;
}

function buildLayoutProps(props: LayoutProps) {
  const classes: (string | undefined)[] = [];
  const style: React.CSSProperties = {};
  const merge = (r: {
    cls: string | undefined;
    style: React.CSSProperties;
  }) => {
    classes.push(r.cls);
    Object.assign(style, r.style);
  };

  merge(resolveSpaceProp("p", "padding", props.p));
  merge(resolveSpaceProp("px", "paddingInline", props.px));
  merge(resolveSpaceProp("py", "paddingBlock", props.py));
  merge(resolveSpaceProp("pt", "paddingTop", props.pt));
  merge(resolveSpaceProp("pr", "paddingRight", props.pr));
  merge(resolveSpaceProp("pb", "paddingBottom", props.pb));
  merge(resolveSpaceProp("pl", "paddingLeft", props.pl));
  merge(resolveSpaceProp("m", "margin", props.m));
  merge(resolveSpaceProp("mx", "marginInline", props.mx));
  merge(resolveSpaceProp("my", "marginBlock", props.my));
  merge(resolveSpaceProp("mt", "marginTop", props.mt));
  merge(resolveSpaceProp("mr", "marginRight", props.mr));
  merge(resolveSpaceProp("mb", "marginBottom", props.mb));
  merge(resolveSpaceProp("ml", "marginLeft", props.ml));

  merge(resolveArbitraryProp("width", props.width));
  merge(resolveArbitraryProp("minWidth", props.minWidth));
  merge(resolveArbitraryProp("maxWidth", props.maxWidth));
  merge(resolveArbitraryProp("height", props.height));
  merge(resolveArbitraryProp("minHeight", props.minHeight));
  merge(resolveArbitraryProp("maxHeight", props.maxHeight));

  classes.push(responsiveClass("", props.position));
  merge(resolveSpaceProp("inset", "inset", props.inset));
  merge(resolveSpaceProp("top", "top", props.top));
  merge(resolveSpaceProp("right", "right", props.right));
  merge(resolveSpaceProp("bottom", "bottom", props.bottom));
  merge(resolveSpaceProp("left", "left", props.left));

  classes.push(responsiveClass("overflow", props.overflow));
  classes.push(responsiveClass("overflow-x", props.overflowX));
  classes.push(responsiveClass("overflow-y", props.overflowY));

  merge(resolveFlexProp(props.flex));
  merge(resolveArbitraryProp("flexBasis", props.flexBasis));
  merge(resolveFlexSize("shrink", "flexShrink", props.flexShrink));
  merge(resolveFlexSize("grow", "flexGrow", props.flexGrow));

  merge(resolveArbitraryProp("gridArea", props.gridArea));
  merge(resolveArbitraryProp("gridColumn", props.gridColumn));
  merge(resolveArbitraryProp("gridColumnStart", props.gridColumnStart));
  merge(resolveArbitraryProp("gridColumnEnd", props.gridColumnEnd));
  merge(resolveArbitraryProp("gridRow", props.gridRow));
  merge(resolveArbitraryProp("gridRowStart", props.gridRowStart));
  merge(resolveArbitraryProp("gridRowEnd", props.gridRowEnd));

  return { className: cn(...classes) || undefined, style };
}

// ═══════════════════════════════════════════════════════════════════════════
// Display alias (Radix uses "none" but Tailwind uses "hidden")
// ═══════════════════════════════════════════════════════════════════════════

const DISPLAY_ALIAS: Record<string, string> = { none: "hidden" };
const resolveDisplay = (v: Responsive<string> | undefined) =>
  responsiveClass("", v, DISPLAY_ALIAS);

// ═══════════════════════════════════════════════════════════════════════════
// Shared base type
// ═══════════════════════════════════════════════════════════════════════════

type BaseProps = LayoutProps & {
  as?: "div" | "span";
  asChild?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

type HTMLRest = Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps>;

// ═══════════════════════════════════════════════════════════════════════════
// Shared flex + grid props (all 5 components share these)
// ═══════════════════════════════════════════════════════════════════════════

const FLEX_DIRECTION_MAP: Record<string, string> = {
  column: "col",
  "column-reverse": "col-reverse",
};

interface FlexGridProps {
  // Flex
  direction?: Responsive<"row" | "column" | "row-reverse" | "column-reverse">;
  wrap?: Responsive<"nowrap" | "wrap" | "wrap-reverse">;
  // Grid
  areas?: Responsive<string>;
  columns?: Responsive<string>;
  rows?: Responsive<string>;
  flow?: Responsive<"row" | "column" | "dense" | "row-dense" | "column-dense">;
  // Shared flex + grid
  align?: Responsive<"start" | "center" | "end" | "stretch" | "baseline">;
  justify?: Responsive<
    "start" | "center" | "end" | "between" | "around" | "evenly"
  >;
  gap?: Responsive<string>;
  gapX?: Responsive<string>;
  gapY?: Responsive<string>;
}

function applyFlexGridProps(props: FlexGridProps): {
  cls: string;
  style: React.CSSProperties;
} {
  const {
    direction,
    wrap,
    areas,
    columns,
    rows,
    flow,
    align,
    justify,
    gap,
    gapX,
    gapY,
  } = props;
  const g = resolveGap(gap);
  const gx = resolveGapX(gapX);
  const gy = resolveGapY(gapY);
  const cols = resolveGridTrack("grid-cols", "gridTemplateColumns", columns);
  const rws = resolveGridTrack("grid-rows", "gridTemplateRows", rows);
  const areasResult = resolveArbitraryProp("gridTemplateAreas", areas);

  return {
    cls: cn(
      responsiveClass("flex", direction, FLEX_DIRECTION_MAP),
      responsiveClass("flex", wrap),
      cols.cls,
      rws.cls,
      responsiveClass("grid-flow", flow),
      responsiveClass("items", align),
      responsiveClass("justify", justify),
      g.cls,
      gx.cls,
      gy.cls,
      areasResult.cls,
    ),
    style: {
      ...cols.style,
      ...rws.style,
      ...areasResult.style,
      ...g.style,
      ...gx.style,
      ...gy.style,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Box — generic block/inline element, display prop only
// ═══════════════════════════════════════════════════════════════════════════

interface BoxOwnProps extends BaseProps {
  display?: Responsive<
    | "none"
    | "block"
    | "inline-block"
    | "inline"
    | "flex"
    | "inline-flex"
    | "grid"
    | "inline-grid"
  >;
}
type BoxProps = BoxOwnProps & HTMLRest;

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    { as = "div", asChild = false, display, className, style, ...rest },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : as;
    const layoutRest = rest as BoxOwnProps & React.HTMLAttributes<HTMLElement>;
    const { className: layoutCls, style: layoutStyle } =
      buildLayoutProps(layoutRest);
    const htmlProps = stripLayoutProps(layoutRest);

    return (
      <Comp
        ref={ref}
        className={cn(
          display ? resolveDisplay(display) : "block",
          layoutCls,
          className
        )}
        style={{ ...layoutStyle, ...style }}
        {...htmlProps}
      />
    );
  }
);
Box.displayName = "Box";
// ═══════════════════════════════════════════════════════════════════════════
// Flex
// ═══════════════════════════════════════════════════════════════════════════

interface FlexOwnProps extends BaseProps {
  display?: Responsive<"none" | "inline-flex" | "flex">;
  direction?: Responsive<"row" | "column" | "row-reverse" | "column-reverse">;
  align?: Responsive<"start" | "center" | "end" | "stretch" | "baseline">;
  justify?: Responsive<
    "start" | "center" | "end" | "between" | "around" | "evenly"
  >;
  wrap?: Responsive<"nowrap" | "wrap" | "wrap-reverse">;
  flex?: Responsive<string>;
  gap?: Responsive<string>;
  gapX?: Responsive<string>;
  gapY?: Responsive<string>;
}
type FlexProps = FlexOwnProps & HTMLRest;

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as = "div",
      asChild = false,
      display = "flex",
      direction,
      align,
      justify,
      wrap,
      flex,
      gap,
      gapX,
      gapY,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : as;
    const layoutRest = {
      ...rest,
      flex,
    } as FlexOwnProps & React.HTMLAttributes<HTMLElement>;
    const { className: layoutCls, style: layoutStyle } =
      buildLayoutProps(layoutRest);
    const htmlProps = stripLayoutProps(layoutRest);
    const fg = applyFlexGridProps({
      direction,
      wrap,
      align,
      justify,
      gap,
      gapX,
      gapY,
    });

    return (
      <Comp
        ref={ref}
        className={cn(resolveDisplay(display), fg.cls, layoutCls, className)}
        style={{ ...layoutStyle, ...fg.style, ...style }}
        {...htmlProps}
      />
    );
  }
);
Flex.displayName = "Flex";

// ═══════════════════════════════════════════════════════════════════════════
// Grid
// ═══════════════════════════════════════════════════════════════════════════

interface GridOwnProps extends BaseProps {
  display?: Responsive<"none" | "inline-grid" | "grid">;
  areas?: Responsive<string>;
  columns?: Responsive<string>;
  rows?: Responsive<string>;
  flow?: Responsive<"row" | "column" | "dense" | "row-dense" | "column-dense">;
  align?: Responsive<"start" | "center" | "end" | "baseline" | "stretch">;
  justify?: Responsive<"start" | "center" | "end" | "between">;
  gap?: Responsive<string>;
  gapX?: Responsive<string>;
  gapY?: Responsive<string>;
}
type GridProps = GridOwnProps & HTMLRest;

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as = "div",
      asChild = false,
      display = "grid",
      areas,
      columns,
      rows,
      flow,
      align,
      justify,
      gap,
      gapX,
      gapY,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : as;
    const layoutRest = rest as GridOwnProps & React.HTMLAttributes<HTMLElement>;
    const { className: layoutCls, style: layoutStyle } =
      buildLayoutProps(layoutRest);
    const htmlProps = stripLayoutProps(layoutRest);
    const fg = applyFlexGridProps({
      areas,
      columns,
      rows,
      flow,
      align,
      justify,
      gap,
      gapX,
      gapY,
    });

    return (
      <Comp
        ref={ref}
        className={cn(resolveDisplay(display), fg.cls, layoutCls, className)}
        style={{ ...layoutStyle, ...fg.style, ...style }}
        {...htmlProps}
      />
    );
  }
);
Grid.displayName = "Grid";

// ═══════════════════════════════════════════════════════════════════════════
// Container
// ═══════════════════════════════════════════════════════════════════════════

interface ContainerOwnProps extends BaseProps {
  asChild?: boolean;
  size?: Responsive<"1" | "2" | "3" | "4">;
  display?: Responsive<"none" | "initial">;
  align?: Responsive<"left" | "center" | "right">;
}
type ContainerProps = ContainerOwnProps & HTMLRest;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Tag = "div",
      asChild = false,
      size = "4",
      display,
      align = "center",
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    // 2. ถ้าเป็น asChild ให้ใช้ Slot แต่ถ้าไม่ใช้ ให้ใช้ค่าจาก Tag (div, span, etc.)
    const Comp = asChild ? Slot.Root : Tag;

    const layoutRest = rest as ContainerOwnProps &
      React.HTMLAttributes<HTMLElement>;
    const { className: layoutCls, style: layoutStyle } =
      buildLayoutProps(layoutRest);
    const htmlProps = stripLayoutProps(layoutRest);

    return (
      <Comp
        ref={ref}
        data-slot="container"
        className={cn(
          "ui-Container",
          responsiveClass("ui-r-size", size),
          responsiveClass("ui-r-align", align),
          display === "none" ? "hidden" : undefined,
          layoutCls,
          className
        )}
        style={{ ...layoutStyle, ...style }}
        {...htmlProps}
      >
        <div className="ui-ContainerInner">{children}</div>
      </Comp>
    );
  }
);
Container.displayName = "Container";

// ═══════════════════════════════════════════════════════════════════════════
// Section
// ═══════════════════════════════════════════════════════════════════════════

interface SectionOwnProps extends Omit<BaseProps, "as"> {
  as?: "section" | "div" | "span";
  asChild?: boolean;
  size?: Responsive<"1" | "2" | "3" | "4">;
  display?: Responsive<"none" | "initial">;
}
type SectionProps = SectionOwnProps & HTMLRest;

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      as = "section",
      asChild = false,
      size = "3",
      display,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : as;
    const layoutRest = rest as SectionOwnProps &
      React.HTMLAttributes<HTMLElement>;
    const { className: layoutCls, style: layoutStyle } =
      buildLayoutProps(layoutRest);
    const htmlProps = stripLayoutProps(layoutRest);

    return (
      <Comp
        ref={ref}
        className={cn(
          "ui-Section",
          responsiveClass("ui-r-size", size),
          display === "none" ? "hidden" : undefined,
          layoutCls,
          className
        )}
        style={{ ...layoutStyle, ...style }}
        {...htmlProps}
      />
    );
  }
);
Section.displayName = "Section";

// ═══════════════════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════════════════

export {
  Box,
  buildLayoutProps,
  Container,
  Flex,
  Grid,
  Section,
  stripLayoutProps,
};
export type { BoxProps, ContainerProps, FlexProps, GridProps, SectionProps };

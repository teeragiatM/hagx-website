import type * as React from "react";

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

type SpaceValue = string;
type DisplayValue =
  | "none"
  | "inline"
  | "inline-block"
  | "block"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline-grid";
type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

export interface LayoutProps {
  display?: Responsive<DisplayValue>;
  position?: Responsive<PositionValue>;
  flex?: Responsive<string>;
  flexGrow?: Responsive<string>;
  flexShrink?: Responsive<string>;
  flexBasis?: Responsive<string>;
  gridColumn?: Responsive<string>;
  gridColumnStart?: Responsive<string>;
  gridColumnEnd?: Responsive<string>;
  gridRow?: Responsive<string>;
  gridRowStart?: Responsive<string>;
  gridRowEnd?: Responsive<string>;
  gridTemplateColumns?: Responsive<string>;
  gridTemplateRows?: Responsive<string>;
  width?: Responsive<string>;
  minWidth?: Responsive<string>;
  maxWidth?: Responsive<string>;
  height?: Responsive<string>;
  minHeight?: Responsive<string>;
  maxHeight?: Responsive<string>;
  gap?: Responsive<SpaceValue>;
  gapX?: Responsive<SpaceValue>;
  gapY?: Responsive<SpaceValue>;
  m?: Responsive<SpaceValue>;
  mx?: Responsive<SpaceValue>;
  my?: Responsive<SpaceValue>;
  mt?: Responsive<SpaceValue>;
  mr?: Responsive<SpaceValue>;
  mb?: Responsive<SpaceValue>;
  ml?: Responsive<SpaceValue>;
  p?: Responsive<SpaceValue>;
  px?: Responsive<SpaceValue>;
  py?: Responsive<SpaceValue>;
  pt?: Responsive<SpaceValue>;
  pr?: Responsive<SpaceValue>;
  pb?: Responsive<SpaceValue>;
  pl?: Responsive<SpaceValue>;
  inset?: Responsive<SpaceValue>;
}

const LAYOUT_PROP_KEYS = [
  "display",
  "position",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "gridColumn",
  "gridColumnStart",
  "gridColumnEnd",
  "gridRow",
  "gridRowStart",
  "gridRowEnd",
  "gridTemplateColumns",
  "gridTemplateRows",
  "width",
  "minWidth",
  "maxWidth",
  "height",
  "minHeight",
  "maxHeight",
  "gap",
  "gapX",
  "gapY",
  "m",
  "mx",
  "my",
  "mt",
  "mr",
  "mb",
  "ml",
  "p",
  "px",
  "py",
  "pt",
  "pr",
  "pb",
  "pl",
  "inset",
] as const satisfies ReadonlyArray<keyof LayoutProps>;

const layoutPropSet = new Set<string>(LAYOUT_PROP_KEYS);

function mergeResolved(
  current: { className?: string; style: React.CSSProperties },
  resolved: { cls?: string; className?: string; style?: React.CSSProperties },
) {
  return {
    className: cn(current.className, resolved.cls, resolved.className),
    style: { ...current.style, ...resolved.style },
  };
}

export function buildLayoutProps(props: LayoutProps) {
  let result: { className?: string; style: React.CSSProperties } = {
    className: undefined,
    style: {},
  };

  result.className = cn(
    responsiveClass("", props.display),
    responsiveClass("", props.position),
  );

  result = mergeResolved(result, resolveFlexProp(props.flex));
  result = mergeResolved(
    result,
    resolveFlexSize("grow", "flexGrow", props.flexGrow),
  );
  result = mergeResolved(
    result,
    resolveFlexSize("shrink", "flexShrink", props.flexShrink),
  );
  result = mergeResolved(result, resolveArbitraryProp("flexBasis", props.flexBasis));
  result = mergeResolved(result, resolveArbitraryProp("gridColumn", props.gridColumn));
  result = mergeResolved(
    result,
    resolveArbitraryProp("gridColumnStart", props.gridColumnStart),
  );
  result = mergeResolved(
    result,
    resolveArbitraryProp("gridColumnEnd", props.gridColumnEnd),
  );
  result = mergeResolved(result, resolveArbitraryProp("gridRow", props.gridRow));
  result = mergeResolved(
    result,
    resolveArbitraryProp("gridRowStart", props.gridRowStart),
  );
  result = mergeResolved(
    result,
    resolveArbitraryProp("gridRowEnd", props.gridRowEnd),
  );
  result = mergeResolved(
    result,
    resolveGridTrack("grid-cols", "gridTemplateColumns", props.gridTemplateColumns),
  );
  result = mergeResolved(
    result,
    resolveGridTrack("grid-rows", "gridTemplateRows", props.gridTemplateRows),
  );
  result = mergeResolved(result, resolveArbitraryProp("width", props.width));
  result = mergeResolved(result, resolveArbitraryProp("minWidth", props.minWidth));
  result = mergeResolved(result, resolveArbitraryProp("maxWidth", props.maxWidth));
  result = mergeResolved(result, resolveArbitraryProp("height", props.height));
  result = mergeResolved(result, resolveArbitraryProp("minHeight", props.minHeight));
  result = mergeResolved(result, resolveArbitraryProp("maxHeight", props.maxHeight));
  result = mergeResolved(result, resolveGap(props.gap));
  result = mergeResolved(result, resolveGapX(props.gapX));
  result = mergeResolved(result, resolveGapY(props.gapY));

  result = mergeResolved(result, resolveSpaceProp("m", "margin", props.m));
  result = mergeResolved(result, resolveSpaceProp("mx", "marginInline", props.mx));
  result = mergeResolved(result, resolveSpaceProp("my", "marginBlock", props.my));
  result = mergeResolved(result, resolveSpaceProp("mt", "marginTop", props.mt));
  result = mergeResolved(result, resolveSpaceProp("mr", "marginRight", props.mr));
  result = mergeResolved(result, resolveSpaceProp("mb", "marginBottom", props.mb));
  result = mergeResolved(result, resolveSpaceProp("ml", "marginLeft", props.ml));
  result = mergeResolved(result, resolveSpaceProp("p", "padding", props.p));
  result = mergeResolved(result, resolveSpaceProp("px", "paddingInline", props.px));
  result = mergeResolved(result, resolveSpaceProp("py", "paddingBlock", props.py));
  result = mergeResolved(result, resolveSpaceProp("pt", "paddingTop", props.pt));
  result = mergeResolved(result, resolveSpaceProp("pr", "paddingRight", props.pr));
  result = mergeResolved(result, resolveSpaceProp("pb", "paddingBottom", props.pb));
  result = mergeResolved(result, resolveSpaceProp("pl", "paddingLeft", props.pl));
  result = mergeResolved(result, resolveSpaceProp("inset", "inset", props.inset));

  return result;
}

export function stripLayoutProps<T extends Record<string, unknown>>(props: T) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !layoutPropSet.has(key)),
  ) as Omit<T, keyof LayoutProps>;
}

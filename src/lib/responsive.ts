import type * as React from "react";

export type Responsive<T> =
  | T
  | { initial?: T; xs?: T; sm?: T; md?: T; lg?: T; xl?: T };

type ResponsiveKey = "initial" | "xs" | "sm" | "md" | "lg" | "xl";
type ResolverResult = {
  cls: string | undefined;
  style: React.CSSProperties;
};

const RESPONSIVE_KEYS: ResponsiveKey[] = [
  "initial",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

const CSS_PROP_TO_CLASS: Record<string, string> = {
  flexBasis: "basis",
  gridColumn: "col",
  gridColumnStart: "col-start",
  gridColumnEnd: "col-end",
  gridRow: "row",
  gridRowStart: "row-start",
  gridRowEnd: "row-end",
  height: "h",
  maxHeight: "max-h",
  maxWidth: "max-w",
  minHeight: "min-h",
  minWidth: "min-w",
  width: "w",
};

const SPACE_PROPS = new Set([
  "inset",
  "m",
  "mb",
  "ml",
  "mr",
  "mt",
  "mx",
  "my",
  "p",
  "pb",
  "pl",
  "pr",
  "pt",
  "px",
  "py",
]);

const FONT_WEIGHT_MAP: Record<string, string> = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

function isResponsiveObject<T>(
  value: Responsive<T> | undefined,
): value is Exclude<Responsive<T>, T> {
  return (
    typeof value === "object" &&
    value !== null &&
    RESPONSIVE_KEYS.some((key) => key in value)
  );
}

function toEntries<T>(
  value: Responsive<T> | undefined,
): Array<[ResponsiveKey, T]> {
  if (value === undefined || value === null) return [];
  if (!isResponsiveObject(value)) return [["initial", value as T]];

  return RESPONSIVE_KEYS.flatMap((key) => {
    const item = value[key];
    return item === undefined || item === null
      ? []
      : [[key, item] as [ResponsiveKey, T]];
  });
}

function classPart(prefix: string, value: string) {
  return prefix ? `${prefix}-${value}` : value;
}

function breakpointClass(key: ResponsiveKey, className: string) {
  return key === "initial" ? className : `${key}:${className}`;
}

function arbitraryClass(prefix: string, value: string) {
  return `${prefix}-[${String(value).replaceAll(" ", "_")}]`;
}

function initialValue<T>(value: Responsive<T> | undefined) {
  return toEntries(value).find(([key]) => key === "initial")?.[1];
}

export function responsiveClass<T extends string>(
  prefix: string,
  value: Responsive<T> | undefined,
  transform?: Record<string, string> | ((value: T) => string),
) {
  return toEntries(value)
    .map(([key, item]) => {
      const rawValue =
        typeof transform === "function"
          ? transform(item)
          : (transform?.[String(item)] ?? String(item));

      return breakpointClass(key, classPart(prefix, rawValue));
    })
    .join(" ");
}

export function resolveFontWeight(value: Responsive<string> | undefined) {
  return responsiveClass("", value, FONT_WEIGHT_MAP);
}

export function resolveSpaceProp(
  classPrefix: string,
  styleProp: keyof React.CSSProperties,
  value: Responsive<string> | undefined,
): ResolverResult {
  if (value === undefined) return { cls: undefined, style: {} };

  const entries = toEntries(value);
  const cls = entries
    .map(([key, item]) => {
      const raw = String(item);
      const token = /^[0-9]+$/.test(raw)
        ? classPart(classPrefix, raw)
        : arbitraryClass(classPrefix, raw);

      return breakpointClass(key, token);
    })
    .join(" ");

  const styleValue = initialValue(value);

  return {
    cls,
    style:
      styleValue !== undefined
        ? ({ [styleProp]: styleValue } as React.CSSProperties)
        : {},
  };
}

export function resolveArbitraryProp(
  styleProp: keyof React.CSSProperties,
  value: Responsive<string> | undefined,
): ResolverResult {
  if (value === undefined) return { cls: undefined, style: {} };

  const prefix = CSS_PROP_TO_CLASS[String(styleProp)];
  const cls = prefix
    ? toEntries(value)
        .map(([key, item]) =>
          breakpointClass(key, arbitraryClass(prefix, String(item))),
        )
        .join(" ")
    : undefined;

  const styleValue = initialValue(value);

  return {
    cls,
    style:
      styleValue !== undefined
        ? ({ [styleProp]: styleValue } as React.CSSProperties)
        : {},
  };
}

export function resolveFlexProp(
  value: Responsive<string> | undefined,
): ResolverResult {
  return resolveArbitraryProp("flex", value);
}

export function resolveFlexSize(
  classPrefix: "grow" | "shrink",
  styleProp: "flexGrow" | "flexShrink",
  value: Responsive<string> | undefined,
): ResolverResult {
  if (value === undefined) return { cls: undefined, style: {} };

  const cls = toEntries(value)
    .map(([key, item]) => {
      const raw = String(item);
      const token =
        raw === "0" || raw === "1"
          ? classPart(classPrefix, raw)
          : arbitraryClass(classPrefix, raw);

      return breakpointClass(key, token);
    })
    .join(" ");

  const styleValue = initialValue(value);

  return {
    cls,
    style:
      styleValue !== undefined
        ? ({ [styleProp]: styleValue } as React.CSSProperties)
        : {},
  };
}

export function resolveGap(value: Responsive<string> | undefined) {
  return resolveSpaceProp("gap", "gap", value);
}

export function resolveGapX(value: Responsive<string> | undefined) {
  return resolveSpaceProp("gap-x", "columnGap", value);
}

export function resolveGapY(value: Responsive<string> | undefined) {
  return resolveSpaceProp("gap-y", "rowGap", value);
}

export function resolveGridTrack(
  classPrefix: "grid-cols" | "grid-rows",
  styleProp: "gridTemplateColumns" | "gridTemplateRows",
  value: Responsive<string> | undefined,
): ResolverResult {
  if (value === undefined) return { cls: undefined, style: {} };

  const cls = toEntries(value)
    .map(([key, item]) => {
      const raw = String(item);
      const token = /^[0-9]+$/.test(raw)
        ? classPart(classPrefix, raw)
        : arbitraryClass(classPrefix, raw);

      return breakpointClass(key, token);
    })
    .join(" ");

  const styleValue = initialValue(value);

  return {
    cls,
    style:
      styleValue !== undefined
        ? ({ [styleProp]: styleValue } as React.CSSProperties)
        : {},
  };
}

export function isSpaceClassPrefix(prefix: string) {
  return SPACE_PROPS.has(prefix);
}

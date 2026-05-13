import type { CSSProperties } from "react";
export type ThemeColor =
  | "gray"
  | "warning"
  | "destructive"
  | "brand"
  | "success"
  | "info";

export type ThemeRadius = "none" | "small" | "medium" | "large" | "full";
export type BadgeSize = "1" | "2" | "3" | "4" | "5";
export type BadgeVariant = "solid" | "surface" | "soft" | "outline";

export type ButtonSize = "1" | "2" | "3" | "4";
export type ButtonVariant =
  | "classic"
  | "solid"
  | "soft"
  | "surface"
  | "outline"
  | "ghost";

export type CardSize = "1" | "2" | "3" | "4" | "5";
export type CardVariant = "surface" | "classic" | "ghost";

export type InsetSide = "all" | "x" | "y" | "top" | "right" | "bottom" | "left";
export type InsetClip = "border-box" | "padding-box";
export type InsetPadding = "current" | "0";

export type AvatarVariant = "solid" | "soft";
export type AvatarSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type CheckboxSize = "1" | "2" | "3";
export type CheckboxVariant = "classic" | "surface" | "soft";

export type CodeSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type CodeVariant = "solid" | "soft" | "outline" | "ghost";

export type TextWeight = "light" | "regular" | "medium" | "bold";
export type TextWrap = "wrap" | "nowrap" | "pretty" | "balance";

export type ProgressSize = "1" | "2" | "3";
export type ProgressVariant = "classic" | "surface" | "soft";

export type SliderSize = "1" | "2" | "3";
export type SliderVariant = "classic" | "surface" | "soft";

export type SwitchSize = "1" | "2" | "3";
export type SwitchVariant = "classic" | "surface" | "soft";

export type RadioSize = "1" | "2" | "3";
export type RadioVariant = "classic" | "surface" | "soft";

export type DropdownMenuSize = "1" | "2";
export type DropdownMenuVariant = "solid" | "soft";

export type SelectSize = "1" | "2" | "3";
export type SelectTriggerVariant = "classic" | "surface" | "soft" | "ghost";
export type SelectContentVariant = "solid" | "soft";
/** @deprecated use SelectTriggerVariant or SelectContentVariant */
export type SelectVariant = SelectTriggerVariant | SelectContentVariant;

export type Responsive<T> =
  | T
  | { initial?: T; xs?: T; sm?: T; md?: T; lg?: T; xl?: T };

/** Radix-scale spacing tokens 1–9 (maps to --space-1 … --space-9) */
export type SpaceScale = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * Inline-axis spacing props shared by slot/addon components
 * (TextFieldSlot, InputSlot, etc.)
 */
export interface InlineSpacingProps {
  color?: ThemeColor;
  gap?: Responsive<SpaceScale | string>;
  px?: Responsive<SpaceScale | string>;
  pl?: Responsive<SpaceScale | string>;
  pr?: Responsive<SpaceScale | string>;
}

/** @deprecated Use `Responsive<T>` instead */
export type ResponsiveValue<T> = Responsive<T>;

export type ScrollAreaSize = "1" | "2" | "3";
export type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type TextAlign = "left" | "center" | "right";
export type TextTrim = "normal" | "start" | "end" | "both";
export type LinkUnderline = "auto" | "always" | "hover" | "none";

export type AlertSize = "1" | "2" | "3";

export type DataListSize = "1" | "2" | "3";
export type DataListOrientation = "horizontal" | "vertical";
export type DataListTrim = "normal" | "start" | "end" | "both";
export type DataListAlign = "baseline" | "start" | "center" | "end" | "stretch";

export type DialogSize = "1" | "2" | "3" | "4";
export type DialogAlign = "start" | "center";
export type DialogWidth = "1" | "2" | "3" | "4";
export type DialogCloseVariant = "corner" | "footer" | "both";

export type FieldOrientation = "vertical" | "horizontal" | "responsive";
export type FieldSize = "1" | "2" | "3";

export type InputSize = "1" | "2" | "3";
export type InputVariant = "classic" | "surface" | "soft";
export type InputResize = "none" | "vertical" | "horizontal" | "both";

export type RadioCardsSize = "1" | "2" | "3";
export type RadioCardsVariant = "surface" | "classic";

export type SegmentedControlSize = "1" | "2" | "3";
export type SegmentedControlVariant = "surface" | "classic";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorSize = "1" | "2" | "3" | "4";

export type SpinnerVariant = "default" | "circle" | "icon";

export type TableSize = "1" | "2" | "3";
export type TableVariant = "surface" | "ghost";
export type TableAlign = "start" | "center" | "end" | "baseline";
export type TableJustify = "start" | "center" | "end";

// ─── Predicates ──────────────────────────────────────────────────────────────
export const isScale = (v: string) => /^\d+$/.test(v);

// ─── Core ─────────────────────────────────────────────────────────────────────
/**
 * Iterates a `Responsive<string>` value and collects Tailwind classes + inline styles.
 * Each breakpoint calls `toClass(v)` first; if it returns undefined, falls back to `toStyle(bp, v)`.
 */
export function collectResponsive(
  value: Responsive<string> | undefined,
  toClass: (v: string) => string | undefined,
  toStyle?: (bp: string, v: string) => CSSProperties,
): { cls: string | undefined; style: CSSProperties } {
  if (!value) return { cls: undefined, style: {} };

  const pairs: [string, string][] =
    typeof value === "string"
      ? [["initial", value]]
      : (Object.entries(value).filter(([, v]) => !!v) as [string, string][]);

  const classes: string[] = [];
  const style: CSSProperties = {};
  for (const [bp, v] of pairs) {
    const cls = toClass(v);
    if (cls) classes.push(bp === "initial" ? cls : `${bp}:${cls}`);
    else if (toStyle) Object.assign(style, toStyle(bp, v));
  }
  return { cls: classes.join(" ") || undefined, style };
}

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** Enum value → `prefix-value` class. */
export function responsiveClass(
  prefix: string,
  value: Responsive<string> | undefined,
  transform?: ((v: string) => string) | Record<string, string>,
): string | undefined {
  const build = (v: string) => {
    let mapped = v;
    if (typeof transform === "function") mapped = transform(v);
    else if (transform) mapped = transform[v] ?? v;
    return prefix ? `${prefix}-${mapped}` : mapped;
  };
  return collectResponsive(value, build).cls;
}

/**
 * Pulls the CSS var value for the `initial` breakpoint only (for arbitrary values).
 * `skip` — if provided and returns true, the value is a scale token → no var needed.
 */
function initialVar(
  varName: string,
  value: Responsive<string> | undefined,
  skip?: (v: string) => boolean,
): CSSProperties {
  if (!value) return {};
  const v = typeof value === "string" ? value : value.initial;
  if (!v || skip?.(v)) return {};
  return { [varName]: v } as CSSProperties;
}

// ─── Spacing / Gap ────────────────────────────────────────────────────────────

/**
 * Scale (0-9) → static Tailwind class (`px-4`).
 * Arbitrary → static utility class (`ui-px`) + CSS var (`--ui-px: value`) in style.
 *
 * The utility class is always a static string → Tailwind scanner always sees it.
 * The dynamic part lives in the CSS variable, not the class name.
 */
export function resolveSpaceProp(
  twPrefix: string,
  _cssProp: string,
  value: Responsive<string> | undefined,
) {
  const { cls } = collectResponsive(value, (v) =>
    isScale(v) ? `${twPrefix}-${v}` : `ui-${twPrefix}`,
  );
  return { cls, style: initialVar(`--ui-${twPrefix}`, value, isScale) };
}

/** `"0"` / `"1"` → `shrink-0` / `shrink`; other → `[flex-shrink:v]`. */
export function resolveFlexSize(
  prefix: "shrink" | "grow",
  cssProp: "flexShrink" | "flexGrow",
  value: Responsive<string> | undefined,
) {
  const prop = cssProp === "flexShrink" ? "flex-shrink" : "flex-grow";
  return collectResponsive(value, (v) =>
    v === "0" ? `${prefix}-0` : v === "1" ? prefix : `[${prop}:${v}]`,
  );
}

/** Flex shorthand → Tailwind utilities when possible, otherwise arbitrary. */
export function resolveFlexProp(value: Responsive<string> | undefined) {
  return collectResponsive(value, (v) => {
    if (v === "1") return "flex-1";
    if (v === "auto") return "flex-auto";
    if (v === "none") return "flex-none";
    if (v === "initial") return "flex-initial";
    if (v === "0") return "flex-[0]";
    return `flex-[${v.replace(/\s+/g, "_")}]`;
  });
}

/**
 * Scale (0-9) → `gap-N`.
 * Arbitrary → `ui-gap` class + `--ui-gap` CSS var.
 */
export function resolveGapLike(
  value?: Responsive<string>,
  type: "gap" | "gap-x" | "gap-y" = "gap",
) {
  const { cls } = collectResponsive(value, (v) =>
    isScale(v) ? `${type}-${v}` : `ui-${type}`,
  );
  return { cls, style: initialVar(`--ui-${type}`, value, isScale) };
}

export const resolveGap = (v?: Responsive<string>) => resolveGapLike(v, "gap");
export const resolveGapX = (v?: Responsive<string>) =>
  resolveGapLike(v, "gap-x");
export const resolveGapY = (v?: Responsive<string>) =>
  resolveGapLike(v, "gap-y");

export function resolveFontWeight(value: Responsive<string> | undefined) {
  return responsiveClass("font", value, {
    light: "light",
    regular: "normal",
    medium: "medium",
    bold: "bold",
  });
}

// ─── Grid tracks ─────────────────────────────────────────────────────────────

// Var names match the existing ui-grid-cols / ui-grid-rows definitions in index.css.
const GRID_TRACK_VAR: Record<string, { cls: string; var: string }> = {
  "grid-cols": { cls: "ui-grid-cols", var: "--grid-template-columns" },
  "grid-rows": { cls: "ui-grid-rows", var: "--grid-template-rows" },
};

/**
 * Scale (0-9) → `grid-cols-N`.
 * Arbitrary → static utility class + CSS var (matches existing `ui-grid-cols` convention).
 */
export function resolveGridTrack(
  twPrefix: "grid-cols" | "grid-rows",
  _cssProp: "gridTemplateColumns" | "gridTemplateRows",
  value: Responsive<string> | undefined,
) {
  const { cls: utilCls, var: varName } = GRID_TRACK_VAR[twPrefix];
  const { cls } = collectResponsive(value, (v) =>
    isScale(v) ? `${twPrefix}-${v}` : utilCls,
  );
  return { cls, style: initialVar(varName, value, isScale) };
}

// ─── Arbitrary dimension / placement props ───────────────────────────────────

// CSS property camelCase → { static utility class, CSS var name }
const ARBITRARY_PROP_MAP: Record<string, { cls: string; var: string }> = {
  width: { cls: "ui-r-w", var: "--ui-w" },
  minWidth: { cls: "ui-r-min-w", var: "--ui-min-w" },
  maxWidth: { cls: "ui-r-max-w", var: "--ui-max-w" },
  height: { cls: "ui-r-h", var: "--ui-h" },
  minHeight: { cls: "ui-r-min-h", var: "--ui-min-h" },
  maxHeight: { cls: "ui-r-max-h", var: "--ui-max-h" },
  flexBasis: { cls: "ui-r-basis", var: "--ui-basis" },
  gridColumn: { cls: "ui-r-col", var: "--ui-col" },
  gridColumnStart: { cls: "ui-r-col-start", var: "--ui-col-start" },
  gridColumnEnd: { cls: "ui-r-col-end", var: "--ui-col-end" },
  gridRow: { cls: "ui-r-row", var: "--ui-row" },
  gridRowStart: { cls: "ui-r-row-start", var: "--ui-row-start" },
  gridRowEnd: { cls: "ui-r-row-end", var: "--ui-row-end" },
  gridArea: { cls: "ui-r-grid-area", var: "--ui-grid-area" },
  gridTemplateAreas: { cls: "ui-r-grid-areas", var: "--ui-grid-areas" },
};

/**
 * Arbitrary CSS property → static utility class + CSS var in style.
 * Responsive-aware for the class; CSS var only set at `initial` breakpoint.
 */
export function resolveArbitraryProp(
  cssProp: string,
  value: Responsive<string> | undefined,
) {
  const map = ARBITRARY_PROP_MAP[cssProp];
  if (!map || !value) return { cls: undefined, style: {} as CSSProperties };
  const { cls } = collectResponsive(value, () => map.cls);
  return { cls, style: initialVar(map.var, value) };
}

/** @deprecated Use `resolveArbitraryProp` instead. */
export function resolveInlineOnlyProp(
  cssProp: string,
  value: Responsive<string> | undefined,
): CSSProperties {
  if (!value) return {};
  const v = typeof value === "string" ? value : value.initial;
  return v ? { [cssProp]: v } : {};
}

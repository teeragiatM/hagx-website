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

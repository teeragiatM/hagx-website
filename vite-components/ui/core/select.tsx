import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  Responsive,
  SelectContentVariant,
  SelectSize,
  SelectTriggerVariant,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

type SelectContextValue = {
  size: Responsive<SelectSize>;
  triggerVariant: SelectTriggerVariant;
  contentVariant: SelectContentVariant;
  color?: ThemeColor;
  highContrast: boolean;
};

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  size?: Responsive<SelectSize>;
  variant?: SelectTriggerVariant;
  contentVariant?: SelectContentVariant;
  color?: ThemeColor;
  highContrast?: boolean;
};

type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  size?: Responsive<SelectSize | "sm" | "default">;
  variant?: SelectTriggerVariant;
  color?: ThemeColor;
  radius?: ThemeRadius;
};

type SelectContentProps = React.ComponentProps<
  typeof SelectPrimitive.Content
> & {
  size?: Responsive<SelectSize>;
  variant?: SelectContentVariant;
  color?: ThemeColor;
  highContrast?: boolean;
};

const SelectContext = React.createContext<SelectContextValue>({
  size: "2",
  triggerVariant: "surface",
  contentVariant: "solid",
  highContrast: false,
});

function normalizeSelectSize(
  size: Responsive<SelectSize | "sm" | "default"> | undefined,
): Responsive<SelectSize> | undefined {
  if (size === undefined) return undefined;

  const normalize = (value: SelectSize | "sm" | "default"): SelectSize => {
    if (value === "sm") return "1";
    if (value === "default") return "2";
    return value;
  };

  if (typeof size === "string") return normalize(size);

  return Object.fromEntries(
    Object.entries(size).map(([breakpoint, value]) => [
      breakpoint,
      value === undefined ? undefined : normalize(value),
    ]),
  ) as Responsive<SelectSize>;
}

function Select({
  size = "2",
  variant = "surface",
  contentVariant = "solid",
  color,
  highContrast = false,
  ...props
}: SelectProps) {
  const contextValue = React.useMemo(
    () => ({
      size,
      triggerVariant: variant,
      contentVariant,
      color,
      highContrast,
    }),
    [size, variant, contentVariant, color, highContrast],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root data-slot="select" {...props} />
    </SelectContext.Provider>
  );
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("ui-SelectGroup", className)}
      {...props}
    />
  );
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size,
  variant,
  color,
  radius,
  children,
  ...props
}: SelectTriggerProps) {
  const context = React.useContext(SelectContext);
  const triggerSize = normalizeSelectSize(size) ?? context.size;
  const triggerVariant = variant ?? context.triggerVariant;
  const triggerColor = color ?? context.color;

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-accent-color={triggerColor}
      data-radius={radius}
      className={cn(
        "ui-reset ui-SelectTrigger",
        responsiveClass("ui-r-size", triggerSize),
        `ui-variant-${triggerVariant}`,
        className,
      )}
      {...props}
    >
      <span className="ui-SelectTriggerInner">{children}</span>
      <SelectPrimitive.Icon asChild>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" aria-hidden="true" className="ui-SelectIcon">
          <path d="M0.135232 3.15803C0.324102 2.95657 0.640521 2.94637 0.841971 3.13523L4.5 6.56464L8.158 3.13523C8.3595 2.94637 8.6759 2.95657 8.8648 3.15803C9.0536 3.35949 9.0434 3.67591 8.842 3.86477L4.84197 7.6148C4.64964 7.7951 4.35036 7.7951 4.15803 7.6148L0.158031 3.86477C-0.0434285 3.67591 -0.0536285 3.35949 0.135232 3.15803Z" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  size,
  variant,
  color,
  highContrast,
  ...props
}: SelectContentProps) {
  const context = React.useContext(SelectContext);
  const contentSize = size ?? context.size;
  const contentVariant = variant ?? context.contentVariant;
  const contentColor = color ?? context.color;
  const contentHighContrast = highContrast ?? context.highContrast;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-accent-color={contentColor}
        data-align-trigger={position === "item-aligned"}
        className={cn(
          "ui-SelectContent",
          responsiveClass("ui-r-size", contentSize),
          `ui-variant-${contentVariant}`,
          contentHighContrast && "ui-high-contrast",
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectPrimitive.Viewport
          data-position={position}
          className="ui-SelectViewport"
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("ui-SelectLabel", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn("ui-SelectItem", className)}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="ui-SelectItemIndicator">
        <CheckIcon className="ui-SelectItemIndicatorIcon" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("ui-SelectSeparator", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
export type { SelectContentProps, SelectProps, SelectTriggerProps };

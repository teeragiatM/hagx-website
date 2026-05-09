import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  CheckboxSize,
  CheckboxVariant,
  Responsive,
  ThemeColor,
} from "@/types/variant-types";
import { CheckIcon, MinusIcon } from "lucide-react";

// ─── Checkbox ────────────────────────────────────────────────────────────────

interface CheckboxProps extends React.ComponentProps<
  typeof CheckboxPrimitive.Root
> {
  size?: Responsive<CheckboxSize>;
  variant?: CheckboxVariant;
  color?: ThemeColor;
  highContrast?: boolean;
}

function Checkbox({
  className,
  size = "2",
  variant = "surface",
  color,
  highContrast = false,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-accent-color={color}
      className={cn(
        "ui-reset ui-BaseCheckboxRoot ui-CheckboxRoot",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        highContrast && "ui-high-contrast",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="ui-BaseCheckboxIndicator group/checkbox-indicator"
      >
        <CheckIcon className="hidden size-full group-data-[state=checked]/checkbox-indicator:block" />
        <MinusIcon className="hidden size-full group-data-[state=indeterminate]/checkbox-indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

// ─── CheckboxGroup ────────────────────────────────────────────────────────────

type CheckboxGroupContextValue = {
  size: Responsive<CheckboxSize>;
  variant: CheckboxVariant;
  color?: ThemeColor;
  highContrast: boolean;
  value: string[];
  onValueChange: (value: string[]) => void;
};

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({
  size: "2",
  variant: "surface",
  highContrast: false,
  value: [],
  onValueChange: () => {},
});

interface CheckboxGroupProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "value" | "onChange"
> {
  size?: Responsive<CheckboxSize>;
  variant?: CheckboxVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

function CheckboxGroup({
  className,
  size = "2",
  variant = "surface",
  color,
  highContrast = false,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  ...props
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] =
    React.useState<string[]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const context = React.useMemo(
    () => ({
      size,
      variant,
      color,
      highContrast,
      value,
      onValueChange: handleValueChange,
    }),
    [size, variant, color, highContrast, value, handleValueChange],
  );

  return (
    <CheckboxGroupContext.Provider value={context}>
      <div
        data-slot="checkbox-group"
        role="group"
        className={cn("ui-CheckboxGroupRoot", className)}
        {...props}
      />
    </CheckboxGroupContext.Provider>
  );
}

// ─── CheckboxGroupItem ────────────────────────────────────────────────────────

interface CheckboxGroupItemProps extends Omit<
  React.ComponentProps<"label">,
  "children"
> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function CheckboxGroupItem({
  className,
  value,
  disabled,
  children,
  ...props
}: CheckboxGroupItemProps) {
  const ctx = React.useContext(CheckboxGroupContext);
  const checked = ctx.value.includes(value);

  function toggle() {
    if (disabled) return;
    const next = checked
      ? ctx.value.filter((v) => v !== value)
      : [...ctx.value, value];
    ctx.onValueChange(next);
  }

  return (
    <label
      data-slot="checkbox-group-item"
      className={cn(
        "ui-Text",
        responsiveClass("ui-r-size", ctx.size),
        "ui-CheckboxGroupItem",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox-group-item-checkbox"
        data-accent-color={ctx.color}
        checked={checked}
        onCheckedChange={toggle}
        disabled={disabled}
        value={value}
        className={cn(
          "ui-reset ui-BaseCheckboxRoot ui-CheckboxGroupItemCheckbox",
          responsiveClass("ui-r-size", ctx.size),
          `ui-variant-${ctx.variant}`,
          ctx.highContrast && "ui-high-contrast",
        )}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="ui-BaseCheckboxIndicator group/checkbox-indicator"
        >
          <CheckIcon className="hidden size-full group-data-[state=checked]/checkbox-indicator:block" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <span className="ui-CheckboxGroupItemInner">{children}</span>
      )}
    </label>
  );
}

export { Checkbox, CheckboxGroup, CheckboxGroupItem };
export type { CheckboxGroupItemProps, CheckboxGroupProps, CheckboxProps };

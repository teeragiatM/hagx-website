"use client";
import { Switch as SwitchPrimitive } from "radix-ui";
import * as React from "react";
import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  Responsive,
  SwitchSize,
  SwitchVariant,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: Responsive<SwitchSize>;
  variant?: SwitchVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
};

function Switch({
  className,
  size = "2",
  variant = "surface",
  color,
  highContrast = false,
  radius,
  disabled,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-accent-color={color}
      data-radius={radius}
      data-disabled={disabled || undefined}
      disabled={disabled}
      className={cn(
        "ui-SwitchRoot",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        highContrast && "ui-high-contrast",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        data-disabled={disabled || undefined}
        className={cn("ui-SwitchThumb", highContrast && "ui-high-contrast")}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
export type { SwitchProps };

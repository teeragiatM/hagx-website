"use client";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  Responsive,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export type ButtonVariant = "default" | "secondary" | "outline" | "ghost";

export type ButtonSize = "1" | "2" | "3" | "4";

type ButtonClassOptions = {
  className?: string;
  variant?: ButtonVariant;
  size?: Responsive<ButtonSize>;
  highContrast?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
};

export interface ButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  size?: Responsive<ButtonSize>;
  variant?: ButtonVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
  rounded?: boolean;
  iconOnly?: boolean;
}

export function getButtonClassName({
  className,
  variant = "default",
  size = "2",
  highContrast = false,
  iconOnly = false,
  disabled = false,
}: ButtonClassOptions) {
  return cn(
    "ui-reset ui-BaseButton",
    iconOnly ? "ui-IconButton" : "ui-Button",
    responsiveClass("ui-r-size", size ?? "2"),
    `ui-variant-${variant}`,
    highContrast && "ui-high-contrast",
    iconOnly && "shrink-0 px-0",
    disabled && "pointer-events-none opacity-50",
    className,
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "2",
      rounded = false,
      asChild = false,
      color,
      highContrast = false,
      iconOnly = false,
      disabled,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        disabled={asChild ? undefined : disabled}
        data-slot="button"
        data-accent-color={color ?? ""}
        data-disabled={disabled || undefined}
        aria-disabled={disabled || undefined}
        style={style}
        className={getButtonClassName({
          className,
          variant,
          size,
          highContrast,
          iconOnly,
          disabled,
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

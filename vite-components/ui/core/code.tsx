import { cn } from "@/lib/utils";
import { responsiveClass } from "@/lib/responsive";
import type {
  CodeSize,
  CodeVariant,
  Responsive,
  TextWeight,
  TextWrap,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";
import { Slot } from "radix-ui";
import * as React from "react";

interface CodeProps extends React.ComponentProps<"span"> {
  asChild?: boolean;
  size?: Responsive<CodeSize>;
  variant?: CodeVariant;
  weight?: TextWeight;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
  truncate?: boolean;
  wrap?: TextWrap;
}

function Code({
  className,
  size = "2",
  variant = "soft",
  weight,
  highContrast = false,
  asChild = false,
  color,
  radius = "full",
  truncate,
  wrap,
  ...props
}: CodeProps) {
  const Component = asChild ? Slot.Root : "code";

  const weightMap = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  const wrapMap = {
    wrap: "whitespace-normal",
    nowrap: "whitespace-nowrap",
    pretty: "text-pretty",
    balance: "text-balance",
  };

  return (
    <Component
      data-slot="Code"
      data-accent-color={color ?? ""}
      data-variant={variant}
      data-radius={radius}
      className={cn(
        "ui-reset ui-Code",
        `ui-variant-${variant}`,
        responsiveClass("ui-r-size", size),
        weight && weightMap[weight],
        wrap && wrapMap[wrap],
        truncate && "truncate",
        highContrast && "ui-high-contrast",
        className,
      )}
      {...props}
    />
  );
}

export { Code };

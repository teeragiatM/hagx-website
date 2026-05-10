// Badge.tsx
import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  BadgeSize,
  BadgeVariant,
  Responsive,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";
import { Slot } from "radix-ui";
import * as React from "react";

interface BadgeProps extends React.ComponentProps<"span"> {
  asChild?: boolean;
  size?: Responsive<BadgeSize>;
  variant?: BadgeVariant;
  highContrast?: boolean;
  color?: ThemeColor;
  radius?: ThemeRadius;
  iconOnly?: boolean;
}

function Badge({
  className,
  size = "2",
  variant = "soft",
  highContrast = false,
  asChild = false,
  color,
  radius = "full",
  iconOnly = false,
  ...props
}: BadgeProps) {
  const Component = asChild ? Slot.Root : "span";

  const dataAttrs: Record<string, string> = {};
  if (color) {
    dataAttrs["data-accent-color"] = color;
  }

  return (
    <Component
      data-radius={radius}
      className={cn(
        "ui-reset ui-Badge",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        {
          "ui-high-contrast": highContrast,
          "ui-IconBadge": iconOnly,
        },
        className
      )}
      {...dataAttrs}
      {...props}
    />
  );
}

export { Badge };

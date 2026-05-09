"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  ProgressSize,
  ProgressVariant,
  Responsive,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  size?: Responsive<ProgressSize>;
  variant?: ProgressVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
  duration?: string;
};

function Progress({
  className,
  value,
  max = 100,
  size = "2",
  variant = "surface",
  color,
  highContrast = false,
  radius,
  duration,
  style,
  ...props
}: ProgressProps) {
  const progressValue = typeof value === "number" ? value : 0;
  const progressMax = typeof max === "number" ? max : 100;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-accent-color={color}
      data-radius={radius}
      value={value}
      max={max}
      className={cn(
        "ui-ProgressRoot",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        highContrast && "ui-high-contrast",
        className,
      )}
      style={
        {
          "--progress-value": progressValue,
          "--progress-max": progressMax,
          "--progress-duration": duration,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="ui-ProgressIndicator"
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
export type { ProgressProps };

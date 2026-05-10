"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  Responsive,
  SliderSize,
  SliderVariant,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  size?: Responsive<SliderSize>;
  variant?: SliderVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
};

function Slider({
  className,
  size = "2",
  variant = "surface",
  color,
  highContrast = false,
  radius,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value,
  ...props
}: SliderProps) {
  const values = value ?? defaultValue ?? [min];

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-accent-color={color}
      data-radius={radius}
      data-disabled={disabled || undefined}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      className={cn(
        "ui-SliderRoot",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        highContrast && "ui-high-contrast",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        data-disabled={disabled || undefined}
        className="ui-SliderTrack"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          data-disabled={disabled || undefined}
          className={cn("ui-SliderRange", highContrast && "ui-high-contrast")}
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          data-disabled={disabled || undefined}
          className="ui-SliderThumb"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
export type { SliderProps };

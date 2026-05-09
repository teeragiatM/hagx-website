import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  RadioSize,
  RadioVariant,
  Responsive,
  ThemeColor,
} from "@/types/variant-types";
import { Slot } from "radix-ui";
import * as React from "react";

interface RadioGroupProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

interface RadioProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: Responsive<RadioSize>;
  variant?: RadioVariant;
  color?: ThemeColor | string;
  highContrast?: boolean;
}

function RadioGroup({ asChild = false, className, ...props }: RadioGroupProps) {
  const Component = asChild ? Slot.Root : "div";

  return (
    <Component
      role="radiogroup"
      data-slot="radio-group"
      className={cn("ui-RadioGroup", className)}
      {...props}
    />
  );
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size = "2",
      variant = "surface",
      color,
      highContrast = false,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type="radio"
        data-slot="radio"
        data-accent-color={color}
        className={cn(
          "ui-reset ui-BaseRadioRoot ui-RadioRoot",
          responsiveClass("ui-r-size", size),
          `ui-variant-${variant}`,
          highContrast && "ui-high-contrast",
          className,
        )}
        {...props}
      />
    );
  },
);

Radio.displayName = "Radio";

export { Radio, RadioGroup };
export type { RadioGroupProps, RadioProps };

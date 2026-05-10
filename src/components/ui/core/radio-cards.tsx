import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  RadioCardsSize,
  RadioCardsVariant,
  Responsive,
  SpaceScale,
  ThemeColor,
} from "@/types/variant-types";

// ─── Context ──────────────────────────────────────────────────────────────────

type RadioCardsContextValue = {
  size: Responsive<RadioCardsSize>;
  variant: RadioCardsVariant;
  color?: ThemeColor;
  highContrast: boolean;
};

const RadioCardsContext = React.createContext<RadioCardsContextValue>({
  size: "2",
  variant: "surface",
  highContrast: false,
});

// ─── Root ─────────────────────────────────────────────────────────────────────

interface RadioCardsRootProps extends React.ComponentProps<
  typeof RadioGroupPrimitive.Root
> {
  size?: Responsive<RadioCardsSize>;
  variant?: RadioCardsVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  columns?: string;
  gap?: Responsive<SpaceScale | string>;
}

function RadioCardsRoot({
  className,
  size = "2",
  variant = "surface",
  color,
  highContrast = false,
  columns = "repeat(auto-fit, minmax(160px, 1fr))",
  gap = "4",
  style,
  ...props
}: RadioCardsRootProps) {
  const context = React.useMemo(
    () => ({ size, variant, color, highContrast }),
    [size, variant, color, highContrast]
  );

  const gapClass =
    typeof gap === "string" && /^\d+$/.test(gap)
      ? `gap-${gap}`
      : gap !== undefined
        ? responsiveClass("gap", gap)
        : undefined;

  return (
    <RadioCardsContext.Provider value={context}>
      <RadioGroupPrimitive.Root
        data-slot="radio-cards"
        data-accent-color={color}
        className={cn(
          "ui-RadioCardsRoot grid",
          responsiveClass("ui-r-size", size),
          `ui-variant-${variant}`,
          highContrast && "ui-high-contrast",
          "ui-grid-cols",
          gapClass,
          className
        )}
        style={
          {
            "--grid-template-columns": columns,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    </RadioCardsContext.Provider>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

function RadioCardsItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-cards-item"
      className={cn("ui-reset ui-BaseCard ui-RadioCardsItem", className)}
      {...props}
    />
  );
}

export { RadioCardsItem, RadioCardsRoot };
export type { RadioCardsRootProps, RadioCardsSize, RadioCardsVariant };

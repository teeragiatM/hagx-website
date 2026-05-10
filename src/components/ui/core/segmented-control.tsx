import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive, SegmentedControlSize, SegmentedControlVariant, ThemeRadius } from "@/types/variant-types";

// ─── Root ─────────────────────────────────────────────────────────────────────

interface SegmentedControlRootProps
  extends Omit<
    React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
    "type" | "rovingFocus" | "loop"
  > {
  size?: Responsive<SegmentedControlSize>;
  variant?: SegmentedControlVariant;
  radius?: ThemeRadius;
  // controlled / uncontrolled sugar
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function SegmentedControlRoot({
  className,
  size = "2",
  variant = "surface",
  radius,
  children,
  ...props
}: SegmentedControlRootProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      data-slot="segmented-control"
      data-radius={radius}
      className={cn(
        "ui-SegmentedControlRoot",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        className,
      )}
      {...props}
    >
      {children}
      {/* Single indicator — CSS uses nth-child(itemCount+1) to set width and transform to slide */}
      <div className="ui-SegmentedControlIndicator" aria-hidden="true" />
    </ToggleGroupPrimitive.Root>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

function SegmentedControlItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="segmented-control-item"
      className={cn("ui-reset ui-SegmentedControlItem", className)}
      {...props}
    >
      <span className="ui-SegmentedControlItemSeparator" aria-hidden="true" />
      <span className="ui-SegmentedControlItemLabel">
        <span className="ui-SegmentedControlItemLabelActive">{children}</span>
        <span className="ui-SegmentedControlItemLabelInactive" aria-hidden="true">{children}</span>
      </span>
    </ToggleGroupPrimitive.Item>
  );
}

export { SegmentedControlItem, SegmentedControlRoot };
export type {
  SegmentedControlRootProps,
  SegmentedControlSize,
  SegmentedControlVariant,
};

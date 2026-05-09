import { Separator as SeparatorPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass, type Responsive } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { SeparatorOrientation, SeparatorSize, ThemeColor } from "@/types/variant-types";

interface SeparatorProps extends Omit<
  React.ComponentProps<typeof SeparatorPrimitive.Root>,
  "orientation"
> {
  orientation?: SeparatorOrientation;
  size?: Responsive<SeparatorSize>;
  color?: ThemeColor;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  size = "1",
  color = "gray",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-accent-color={color}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "ui-Separator",
        responsiveClass("ui-r-orientation", orientation),
        responsiveClass("ui-r-size", size),
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
export type { SeparatorOrientation, SeparatorProps, SeparatorSize };

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive, ScrollAreaSize } from "@/types/variant-types";

interface ScrollAreaProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
> {
  size?: Responsive<ScrollAreaSize>;
}

interface ScrollBarProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {
  size?: Responsive<ScrollAreaSize>;
}

function ScrollArea({
  className,
  children,
  size = "1",
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("ui-ScrollAreaRoot", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="ui-ScrollAreaViewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <div className="ui-ScrollAreaViewportFocusRing" />
      <ScrollBar size={size} />
      <ScrollAreaPrimitive.Corner
        data-slot="scroll-area-corner"
        className="ui-ScrollAreaCorner"
      />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  size = "1",
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "ui-ScrollAreaScrollbar",
        responsiveClass("ui-r-size", size),
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="ui-ScrollAreaThumb"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
export type { ScrollAreaProps, ScrollBarProps };

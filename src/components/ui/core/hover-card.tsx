import { HoverCard as HoverCardPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive } from "@/types/variant-types";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={cn("ui-Hovercard-Trigger", className)}
      {...props}
    />
  );
}

interface HoverCardContentProps extends React.ComponentProps<
  typeof HoverCardPrimitive.Content
> {
  size?: Responsive<"1" | "2" | "3">;
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  size = "2",
  ...props
}: HoverCardContentProps) {
  const sizeClasses = responsiveClass("ui-r-size", size);

  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "ui-reset ui-PopperContent ui-HoverCardContent ui-r-max-w",
          sizeClasses,
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };

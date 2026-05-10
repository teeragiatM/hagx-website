import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive, ThemeColor } from "@/types/variant-types";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs ui-reset ui-TabsRoot flex data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  );
}

interface TabsListProps extends React.ComponentProps<
  typeof TabsPrimitive.List
> {
  size?: Responsive<"1" | "2">;
  variant?: "default" | "solid" | "surface" | "classic" | "soft";
  color?: ThemeColor;
  highContrast?: boolean;
}

function TabsList({
  className,
  variant = "default",
  size = "2",
  color,
  highContrast,
  style,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-accent-color={color}
      className={cn(
        "group/tabs-list ui-reset ui-BaseTabList ui-TabsList",
        `ui-variant-${variant}`,
        responsiveClass("ui-r-size", size),
        highContrast && "ui-high-contrast",
        className
      )}
      style={{ ...style }}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn("ui-reset ui-BaseTabListTrigger ui-TabsTrigger", className)}
      {...props}
    >
      <span className="ui-BaseTabListTriggerInner ui-TabsTriggerInner">
        {children}
      </span>
      <span
        className="ui-BaseTabListTriggerInnerHidden ui-TabsTriggerInnerHidden"
        aria-hidden="true"
      >
        {children}
      </span>
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("ui-TabsContent", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };

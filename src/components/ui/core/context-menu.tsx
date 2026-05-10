import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  DropdownMenuSize,
  DropdownMenuVariant,
  Responsive,
} from "@/types/variant-types";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

interface ContextMenuContentProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Content> {
  size?: Responsive<DropdownMenuSize>;
  variant?: DropdownMenuVariant;
  color?: string;
  highContrast?: boolean;
}

interface ContextMenuItemProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
  shortcut?: string;
  color?: string;
}

interface ContextMenuLabelProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Label> {
  inset?: boolean;
}

// ============ Components ============

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuContent({
  className,
  size = "2",
  variant = "solid",
  color,
  highContrast = false,
  children,
  ...props
}: ContextMenuContentProps) {
  const sizeClass = responsiveClass("ui-r-size", size);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-accent-color={color}
        data-slot="context-menu-content"
        className={cn(
          "ui-reset ui-PopperContent ui-BaseMenuContent ui-ContextMenuContent",
          `ui-variant-${variant}`,
          sizeClass,
          highContrast && "ui-high-contrast",
          className,
        )}
        {...props}
      >
        <div className="ui-BaseMenuViewport ui-ContextMenuViewport">
          {children}
        </div>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  shortcut,
  color,
  children,
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-accent-color={variant === "destructive" ? "destructive" : color}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-ContextMenuItem",
        inset && "ui-inset",
        className,
      )}
      {...props}
    >
      {children}
      {shortcut && (
        <div className="ui-BaseMenuShortcut ui-ContextMenuShortcut">
          {shortcut}
        </div>
      )}
    </ContextMenuPrimitive.Item>
  );
}

function ContextMenuItemIndicator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.ItemIndicator>) {
  return (
    <ContextMenuPrimitive.ItemIndicator
      data-slot="context-menu-item-indicator"
      className={cn("ui-BaseMenuItemIndicator", className)}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-BaseMenuCheckboxItem ui-ContextMenuItem",
        inset && "ui-inset",
        className,
      )}
      checked={checked}
      {...props}
    >
      <ContextMenuItemIndicator>
        <CheckIcon className="ui-BaseMenuItemIndicatorIcon" />
      </ContextMenuItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "ui-reset ui-BaseMenuItem ui-BaseMenuRadioItem ui-ContextMenuItem",
        className,
      )}
      {...props}
    >
      <ContextMenuItemIndicator>
        <CircleIcon className="ui-BaseMenuItemIndicatorIcon fill-current" />
      </ContextMenuItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "ui-BaseMenuLabel ui-ContextMenuLabel",
        inset && "ui-inset",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  full = false,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator> & {
  full?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(
        "ui-BaseMenuSeparator ui-ContextMenuSeparator",
        full && "ui-full",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="context-menu-shortcut"
      className={cn("ui-BaseMenuShortcut ui-ContextMenuShortcut", className)}
      {...props}
    />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-BaseMenuSubTrigger ui-ContextMenuItem ui-ContextMenuSubTrigger",
        inset && "ui-inset",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ui-BaseMenuSubTriggerIcon ui-ContextMenuSubTriggerIcon" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  size = "2",
  variant = "solid",
  color,
  highContrast = false,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent> &
  Pick<
    ContextMenuContentProps,
    "size" | "variant" | "color" | "highContrast"
  >) {
  const sizeClass = responsiveClass("ui-r-size", size);

  return (
    <ContextMenuPrimitive.SubContent
      data-accent-color={color}
      data-slot="context-menu-sub-content"
      className={cn(
        "ui-reset ui-PopperContent ui-BaseMenuContent ui-BaseMenuSubContent ui-ContextMenuContent ui-ContextMenuSubContent",
        `ui-variant-${variant}`,
        sizeClass,
        highContrast && "ui-high-contrast",
        className,
      )}
      {...props}
    >
      <div className="ui-BaseMenuViewport ui-ContextMenuViewport">
        {children}
      </div>
    </ContextMenuPrimitive.SubContent>
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};

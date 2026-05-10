import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  DropdownMenuSize,
  DropdownMenuVariant,
  Responsive,
} from "@/types/variant-types";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

interface DropdownMenuContentProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
> {
  size?: Responsive<DropdownMenuSize>;
  variant?: DropdownMenuVariant;
  color?: string;
  highContrast?: boolean;
}

interface DropdownMenuItemProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> {
  inset?: boolean;
  variant?: "default" | "destructive";
  shortcut?: string;
  color?: string;
}

interface DropdownMenuLabelProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Label
> {
  inset?: boolean;
}

// ============ Components ============
function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  size = "2",
  variant = "solid",
  color,
  highContrast = false,
  children,
  ...props
}: DropdownMenuContentProps) {
  const sizeClass = responsiveClass("ui-r-size", size);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-accent-color={color}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "ui-reset ui-PopperContent ui-BaseMenuContent ui-DropdownMenuContent",
          `ui-variant-${variant}`,
          sizeClass,
          highContrast && "ui-high-contrast",
          className,
        )}
        {...props}
      >
        <div className="ui-BaseMenuViewport ui-DropdownMenuViewport">
          {children}
        </div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  shortcut,
  color,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-accent-color={variant === "destructive" ? "destructive" : color}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-DropdownMenuItem",
        inset && "ui-inset",
        className,
      )}
      {...props}
    >
      {children}
      {shortcut && (
        <div className="ui-BaseMenuShortcut ui-DropdownMenuShortcut">
          {shortcut}
        </div>
      )}
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuItemIndicator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.ItemIndicator>) {
  return (
    <DropdownMenuPrimitive.ItemIndicator
      data-slot="dropdown-menu-item-indicator"
      className={cn("ui-BaseMenuItemIndicator", className)}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-BaseMenuCheckboxItem ui-DropdownMenuItem",
        inset && "ui-inset",
        className,
      )}
      checked={checked}
      {...props}
    >
      <DropdownMenuItemIndicator>
        <CheckIcon className="ui-BaseMenuItemIndicatorIcon" />
      </DropdownMenuItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn("ui-reset ui-BaseMenuItem ui-BaseMenuRadioItem ui-DropdownMenuItem", className)}
      {...props}
    >
      <DropdownMenuItemIndicator>
        <CircleIcon className="ui-BaseMenuItemIndicatorIcon fill-current" />
      </DropdownMenuItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "ui-BaseMenuLabel ui-DropdownMenuLabel",
        inset && "ui-inset",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  full = false,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator> & {
  full?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        "ui-BaseMenuSeparator ui-DropdownMenuSeparator",
        full && "ui-full",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-shortcut"
      className={cn("ui-BaseMenuShortcut ui-DropdownMenuShortcut", className)}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-DropdownMenuSubTrigger",
        inset && "ui-inset",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ui-BaseMenuSubTriggerIcon ui-DropdownMenuSubTriggerIcon" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  size = "2",
  variant = "solid",
  color,
  highContrast = false,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> &
  Pick<DropdownMenuContentProps, "size" | "variant" | "color" | "highContrast">) {
  const sizeClass = responsiveClass("ui-r-size", size);

  return (
    <DropdownMenuPrimitive.SubContent
      data-accent-color={color}
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "ui-reset ui-PopperContent ui-BaseMenuContent ui-BaseMenuSubContent ui-DropdownMenuContent ui-DropdownMenuSubContent",
        `ui-variant-${variant}`,
        sizeClass,
        highContrast && "ui-high-contrast",
        className,
      )}
      {...props}
    >
      <div className="ui-BaseMenuViewport ui-DropdownMenuViewport">
        {children}
      </div>
    </DropdownMenuPrimitive.SubContent>
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};

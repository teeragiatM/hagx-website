import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  DialogAlign,
  DialogSize,
  DialogWidth,
  Responsive,
} from "@/types/variant-types";
import { Button } from "@ui";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn("ui-BaseDialogOverlay ui-DialogOverlay", className)}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  children,
  align = "center",
  size = "2",
  container,
  maxWidth = "1",
  forceMount,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  align?: DialogAlign;
  size?: Responsive<DialogSize>;
  maxWidth?: DialogWidth;
  container?: React.ComponentProps<
    typeof AlertDialogPrimitive.Portal
  >["container"];
  forceMount?: true;
}) {
  return (
    <AlertDialogPortal container={container} forceMount={forceMount}>
      <AlertDialogOverlay />
      <div className="ui-BaseDialogScroll ui-DialogScroll">
        <div
          className={cn(
            "ui-BaseDialogScrollPadding ui-DialogScrollPadding",
            `ui-r-align-${align}`
          )}
        >
          <AlertDialogPrimitive.Content
            data-accent-color="gray"
            data-slot="alert-dialog-content"
            className={cn(
              "ui-BaseDialogContent ui-AlertDialogContent",
              responsiveClass("ui-r-size", size),
              `ui-r-max-w-${maxWidth}`,
              className
            )}
            {...props}
          >
            {children}
          </AlertDialogPrimitive.Content>
        </div>
      </div>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("ui-DialogHeader", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("ui-DialogFooter", className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("ui-reset ui-Heading ui-r-size-4", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      data-accent-color="gray"
      className={cn("ui-reset ui-Text ui-r-size-2", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action asChild {...props}>
      <Button color="destructive" size="1" className={className}>
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  );
}

function AlertDialogCancel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel asChild {...props}>
      <Button size="1" variant="outline" className={className}>
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

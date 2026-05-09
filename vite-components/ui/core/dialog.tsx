"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  DialogAlign,
  DialogCloseVariant,
  DialogSize,
  DialogWidth,
  Responsive,
} from "@/types/variant-types";
import { Button } from "@ui";
import { XIcon } from "lucide-react";


// Context สำหรับส่งสถานะปุ่มปิดไปยัง Footer
const DialogContext = React.createContext<{ showClose?: DialogCloseVariant }>(
  {}
);

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" modal {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("ui-BaseDialogOverlay ui-DialogOverlay", className)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showClose = "footer",
  showCloseButton = true,
  align = "center",
  size = "2",
  container,
  maxWidth = "1",
  forceMount,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showClose?: DialogCloseVariant;
  showCloseButton?: boolean;
  align?: DialogAlign;
  size?: Responsive<DialogSize>;
  maxWidth?: DialogWidth;
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>["container"];
  forceMount?: true;
}) {
  // หากมีการเรียกใช้ showClose แต่ไม่ระบุค่า (undefined ใน prop แต่มีชื่อ) หรือส่งมาดื้อๆ
  // ในที่นี้เราจะเช็คถ้ามีค่า หรือมีการระบุค่าเข้ามา
  const closeVariant = showCloseButton ? showClose : undefined;

  return (
    <DialogContext.Provider value={{ showClose: closeVariant }}>
      <DialogPrimitive.Portal container={container} forceMount={forceMount}>
        <DialogPrimitive.Overlay
          data-slot="dialog-overlay"
          className="ui-BaseDialogOverlay ui-DialogOverlay"
        >
          <div className="ui-BaseDialogScroll ui-DialogScroll">
            <div
              className={cn(
                "ui-BaseDialogScrollPadding ui-DialogScrollPadding",
                `ui-r-align-${align}`
              )}
            >
              <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                  "ui-BaseDialogContent ui-DialogContent",
                  responsiveClass("ui-r-size", size),
                  `ui-r-max-w-${maxWidth}`,
                  className
                )}
                {...props}
              >
                {children}

                {/* แสดงปุ่มที่มุมขวาบนเมื่อเป็น "corner" หรือ "both" */}
                {(closeVariant === "corner" || closeVariant === "both") && (
                  <DialogPrimitive.Close data-slot="dialog-close" asChild>
                    <Button
                      iconOnly
                      variant="ghost"
                      className="ui-BaseDialogClose"
                      size="1"
                      color="gray"
                      radius="large"
                    >
                      <XIcon size={16} />
                      <span className="sr-only">Close</span>
                    </Button>
                  </DialogPrimitive.Close>
                )}
              </DialogPrimitive.Content>
            </div>
          </div>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogContext.Provider>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("ui-DialogHeader", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { showClose } = React.useContext(DialogContext);

  return (
    <div
      data-slot="dialog-footer"
      className={cn("ui-DialogFooter", className)}
      {...props}
    >
      {children}
      {/* แสดงปุ่มที่ Footer เมื่อเป็น "footer" หรือ "both" */}
      {(showClose === "footer" || showClose === "both") && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("ui-reset ui-Heading ui-r-size-4", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      data-accent-color="gray"
      className={cn("ui-reset ui-Text ui-r-size-2", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

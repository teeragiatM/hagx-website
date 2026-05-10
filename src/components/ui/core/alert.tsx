import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
// Import Text มาจากไฟล์ที่คุณเก็บไว้
import type { AlertSize, Responsive, ThemeColor } from "@/types/variant-types";
import { Text } from "@ui";

/* =========================
 * Context สำหรับแชร์ Size
 * ========================= */

const AlertContext = React.createContext<{ size?: Responsive<AlertSize> }>({
  size: "2",
});

const alertVariants = cva("ui-AlertRoot", {
  variants: {
    highContrast: { true: "ui-high-contrast", false: "" },
  },
  defaultVariants: { highContrast: false },
});

type AlertProps = React.ComponentProps<"div"> &
  Omit<VariantProps<typeof alertVariants>, "size"> & {
    variant?: "soft" | "surface" | "outline";
    color?: ThemeColor;
    size?: Responsive<AlertSize>;
  };

/* =========================
 * Component: Alert (Provider)
 * ========================= */
function Alert({
  className,
  variant = "surface",
  color,
  size = "2",
  highContrast,
  children,
  ...props
}: AlertProps) {
  return (
    <AlertContext.Provider value={{ size }}>
      <div
        role="alert"
        className={cn(
          "group/alert",
          alertVariants({ highContrast }),
          responsiveClass("ui-r-size", size),
          variant && `ui-variant-${variant}`,
          className
        )}
        data-accent-color={color ?? ""}
        {...props}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
}

/* =========================
 * Subcomponents (ใช้ Text Component)
 * ========================= */

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { size } = React.useContext(AlertContext);

  return (
    <Text
      as="div"
      weight={"medium"}
      size={size}
      className={cn("group-has-[>svg]/alert:col-start-2", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { size } = React.useContext(AlertContext);

  return (
    <Text
      as="p"
      size={size}
      className={cn("[&_p:not(:last-child)]:mb-4", className)}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(AlertContext);
  return (
    <div
      className={cn(
        "ui-AlertAction",
        responsiveClass("ui-r-size", size),
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertDescription, AlertTitle };

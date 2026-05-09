import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";
import * as React from "react";
import type { LayoutProps } from "./layout";
import { buildLayoutProps, stripLayoutProps } from "./layout";

interface SkeletonOwnProps extends Pick<LayoutProps,
  "width" | "minWidth" | "maxWidth" | "height" | "minHeight" | "maxHeight"
> {
  loading?: boolean;
  /**
   * Apply skeleton styles directly to the child element instead of wrapping.
   * ใช้เมื่อ skeleton ต้องการ apply กับ component เช่น <TextField> หรือ <Button>
   * โดยไม่ต้องห่อด้วย <span> เพิ่ม
   */
  asChild?: boolean;
}

type SkeletonProps = SkeletonOwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, keyof SkeletonOwnProps>;

const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ loading = true, asChild = false, className, style, children, ...rest }, ref) => {
    const layoutRest = rest as SkeletonOwnProps & React.HTMLAttributes<HTMLSpanElement>;
    const { className: layoutCls, style: layoutStyle } = buildLayoutProps(layoutRest);
    const htmlProps = stripLayoutProps(layoutRest);

    if (!loading) {
      return <>{children}</>;
    }

    const skeletonAttrs = {
      "aria-hidden": "true" as const,
      tabIndex: -1,
      inert: true,
    };

    // asChild — merge skeleton class + attrs into the child element directly
    if (asChild) {
      return (
        <Slot.Root
          ref={ref}
          data-slot="skeleton"
          className={cn("ui-Skeleton", layoutCls, className)}
          style={{ ...layoutStyle, ...style }}
          {...skeletonAttrs}
          {...htmlProps}
        >
          {children}
        </Slot.Root>
      );
    }

    // wrapping span — detect inline (has children) vs standalone (no children)
    const isInline = typeof children !== "undefined";

    return (
      <span
        ref={ref}
        data-slot="skeleton"
        {...(isInline ? { "data-inline-skeleton": "" } : {})}
        className={cn("ui-Skeleton", layoutCls, className)}
        style={{ ...layoutStyle, ...style }}
        {...skeletonAttrs}
        {...htmlProps}
      >
        {children}
      </span>
    );
  },
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonProps };

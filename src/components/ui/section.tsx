import type { ComponentPropsWithoutRef } from "react";

import { responsiveClass, type Responsive } from "@/lib/responsive";
import { cn } from "@/lib/utils";

export type SectionSize = "0" | "1" | "2" | "3" | "4";
export type ContainerWidth = "sm" | "md" | "lg" | "xl" | "full";
export type ContainerSize = "1" | "2" | "3" | "4" | "5" | "6" | "7";
export type ContainerAlign = "left" | "center" | "right";

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  size?: Responsive<SectionSize>;
}

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: Responsive<ContainerSize>;
  align?: Responsive<ContainerAlign>;
  innerClassName?: string;
  /** @deprecated Use `size` instead. */
  width?: ContainerWidth;
  /** Adds the site inline padding to the outer container. */
  padded?: boolean;
}

export function Section({
  size = "3",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "ui-Section",
        responsiveClass("ui-r-size", size),
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

const containerWidthSize: Record<ContainerWidth, ContainerSize> = {
  sm: "1",
  md: "2",
  lg: "3",
  xl: "4",
  full: "4",
};

function resolveContainerSize(
  size: Responsive<ContainerSize> | undefined,
  width: ContainerWidth | undefined,
): Responsive<ContainerSize> {
  if (size) return size;
  return containerWidthSize[width ?? "lg"];
}

export function Container({
  size,
  align = "center",
  innerClassName,
  width,
  padded = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "ui-Container",
        responsiveClass("ui-r-size", resolveContainerSize(size, width)),
        responsiveClass("ui-r-align", align),
        className,
      )}
      {...props}
    >
      <div
        data-slot="container-inner"
        className={cn("ui-ContainerInner", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionBody({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

export default Section;

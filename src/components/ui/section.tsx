import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type SectionBorder = "none" | "top" | "bottom" | "y";
type SectionWidth = "sm" | "md" | "lg" | "xl" | "full";

const spacingClass: Record<SectionSpacing, string> = {
  none: "",
  xs: "py-5",
  sm: "py-16 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-24 lg:py-36",
  xl: "py-28 lg:py-44",
};

const borderClass: Record<SectionBorder, string> = {
  none: "",
  top: "border-t border-white/[0.06]",
  bottom: "border-b border-white/[0.06]",
  y: "border-y border-white/[0.06]",
};

const widthClass: Record<SectionWidth, string> = {
  sm: "max-w-5xl",
  md: "max-w-[1500px]",
  lg: "max-w-[1500px]",
  xl: "max-w-[1500px]",
  full: "max-w-none",
};

interface AppSectionRootProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: SectionSpacing;
  border?: SectionBorder;
  background?: string;
}

interface AppSectionContainerProps extends ComponentPropsWithoutRef<"div"> {
  width?: SectionWidth;
  padded?: boolean;
}

function AppSectionRoot({
  spacing = "lg",
  border = "none",
  background = "bg-[#080808]",
  className,
  children,
  ...props
}: AppSectionRootProps) {
  return (
    <section
      className={cn(
        "ui-section",
        `ui-section-spacing-${spacing}`,
        `ui-section-border-${border}`,
        background,
        borderClass[border],
        spacingClass[spacing],
        className,
      )}
      data-ui="section"
      data-spacing={spacing}
      data-border={border}
      {...props}
    >
      {children}
    </section>
  );
}

function AppSectionContainer({
  width = "md",
  padded = false,
  className,
  children,
  ...props
}: AppSectionContainerProps) {
  return (
    <div
      className={cn(
        "ui-section-container mx-auto w-full",
        `ui-section-container-${width}`,
        padded && "ui-section-container-padded",
        widthClass[width],
        padded && "px-[var(--site-inline-px)]",
        className,
      )}
      data-ui="section-container"
      data-width={width}
      data-padded={padded ? "true" : "false"}
      {...props}
    >
      {children}
    </div>
  );
}

function AppSectionBody({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("ui-section-body relative", className)}
      data-ui="section-body"
      {...props}
    >
      {children}
    </div>
  );
}

const AppSection = Object.assign(AppSectionRoot, {
  Root: AppSectionRoot,
  Container: AppSectionContainer,
  Body: AppSectionBody,
});

export {
  AppSection,
  AppSectionRoot,
  AppSectionContainer,
  AppSectionBody,
  type SectionSpacing,
  type SectionBorder,
  type SectionWidth,
};

export default AppSection;

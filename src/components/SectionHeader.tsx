import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";
type SectionHeaderLayout = "split" | "stack";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Heading semantic level for SEO, defaults to "h2" */
  as?: HeadingTag;
  /** "split" is a two-column, two-row grid. "stack" centers content. */
  layout?: SectionHeaderLayout;
  className?: string;
}

interface SectionHeaderRootProps extends ComponentPropsWithoutRef<"div"> {
  layout?: SectionHeaderLayout;
}

interface SectionHeaderHeadingProps
  extends Omit<ComponentPropsWithoutRef<"h2">, "as"> {
  as?: HeadingTag;
  children: ReactNode;
}

function renderHeadingLines(heading: string) {
  return heading.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

function SectionHeaderRoot({
  layout = "split",
  className,
  children,
  ...props
}: SectionHeaderRootProps) {
  return (
    <div
      data-section-header=""
      data-layout={layout}
      className={cn(
        layout === "stack"
          ? "mb-14 text-center"
          : "mb-16 grid gap-x-8 gap-y-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SectionHeaderEyebrow({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-section-header-eyebrow=""
      className={cn(
        "text-[10px] font-light uppercase tracking-widest text-[#DB5828]",
        "lg:col-span-2",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function SectionHeaderHeading({
  as: Tag = "h2",
  className,
  children,
  ...props
}: SectionHeaderHeadingProps) {
  return (
    <Tag
      data-section-header-heading=""
      className={cn(
        "max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

function SectionHeaderDescription({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-section-header-description=""
      className={cn(
        "max-w-xl text-sm font-light leading-7 text-white/55 lg:ml-auto lg:pt-1 lg:text-right",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function SectionHeaderBase({
  eyebrow,
  heading,
  description,
  as = "h2",
  layout = "split",
  className = "",
}: SectionHeaderProps) {
  return (
    <SectionHeaderRoot layout={layout} className={className}>
      {eyebrow && (
        <SectionHeaderEyebrow
          className={layout === "stack" ? "mx-auto mb-4" : undefined}
        >
          {eyebrow}
        </SectionHeaderEyebrow>
      )}
      <SectionHeaderHeading
        as={as}
        className={layout === "stack" ? "mx-auto" : undefined}
      >
        {renderHeadingLines(heading)}
      </SectionHeaderHeading>
      {description && (
        <SectionHeaderDescription
          className={
            layout === "stack" ? "mx-auto mt-6 text-center lg:text-center" : ""
          }
        >
          {description}
        </SectionHeaderDescription>
      )}
    </SectionHeaderRoot>
  );
}

const SectionHeader = Object.assign(SectionHeaderBase, {
  Root: SectionHeaderRoot,
  Eyebrow: SectionHeaderEyebrow,
  Heading: SectionHeaderHeading,
  Description: SectionHeaderDescription,
});

export {
  SectionHeader,
  SectionHeaderRoot,
  SectionHeaderEyebrow,
  SectionHeaderHeading,
  SectionHeaderDescription,
};

export default SectionHeader;

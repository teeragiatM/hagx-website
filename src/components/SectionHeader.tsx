import type { HTMLAttributes, ReactNode } from "react";
import { Text, Heading, type TextProps } from "./ui";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";
type SectionHeaderLayout = "split" | "stack" | "row";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  as?: HeadingTag;
  layout?: SectionHeaderLayout;
  className?: string;
  /** Slot for the right-side content in split/row layouts — accepts any ReactNode */
  action?: ReactNode;
}

// ============ Compound Components ============

function SectionHeaderRoot({
  layout = "split",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { layout?: SectionHeaderLayout }) {
  return (
    <div
      data-layout={layout}
      className={cn("section-header-root", className)}
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
}: TextProps & { children: ReactNode }) {
  return (
    <Text
      as="p"
      size="1"
      weight="light"
      uppercase
      color="brand"
      className={cn("section-header-eyebrow", className)}
      {...props}
    >
      {children}
    </Text>
  );
}

function SectionHeaderHeading({
  as = "h2",
  className,
  children,
  ...props
}: { as?: HeadingTag; children: ReactNode } & Omit<TextProps, "as">) {
  const headingLines =
    typeof children === "string"
      ? children.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))
      : children;

  return (
    <Heading
      as={as}
      size="8"
      weight="light"
      className={cn("section-header-heading", className)}
      {...props}
    >
      {headingLines}
    </Heading>
  );
}

function SectionHeaderDescription({
  className,
  children,
  ...props
}: TextProps & { children: ReactNode }) {
  return (
    <Text
      as="p"
      size="2"
      weight="light"
      color="gray"
      className={cn("section-header-description", className)}
      {...props}
    >
      {children}
    </Text>
  );
}

/**
 * Left slot — wraps eyebrow + heading (and description for split layout).
 * Useful when composing via compound API.
 */
function SectionHeaderLeft({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("section-header-left", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Right slot — accepts any ReactNode: button, component, text, etc.
 * Renders in the right column for split/row layouts.
 */
function SectionHeaderRight({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("section-header-right", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Action slot — shorthand alias for SectionHeaderRight when used inside
 * the opinionated <SectionHeader> convenience wrapper via the `action` prop.
 */
function SectionHeaderAction({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("section-header-action", className)} {...props}>
      {children}
    </div>
  );
}

// ============ Main Component ============

function SectionHeader({
  eyebrow,
  heading,
  description,
  as = "h2",
  layout = "split",
  className,
  action,
}: SectionHeaderProps) {
  return (
    <SectionHeaderRoot layout={layout} className={className}>
      {eyebrow && <SectionHeaderEyebrow>{eyebrow}</SectionHeaderEyebrow>}
      <SectionHeaderHeading as={as}>{heading}</SectionHeaderHeading>
      {description && (
        <SectionHeaderDescription>{description}</SectionHeaderDescription>
      )}
      {action && <SectionHeaderAction>{action}</SectionHeaderAction>}
    </SectionHeaderRoot>
  );
}

// ============ Export ============

const SectionHeaderCompound = Object.assign(SectionHeader, {
  Root: SectionHeaderRoot,
  Eyebrow: SectionHeaderEyebrow,
  Heading: SectionHeaderHeading,
  Description: SectionHeaderDescription,
  Left: SectionHeaderLeft,
  Right: SectionHeaderRight,
  Action: SectionHeaderAction,
});

export default SectionHeaderCompound;
export {
  SectionHeaderRoot,
  SectionHeaderEyebrow,
  SectionHeaderHeading,
  SectionHeaderDescription,
  SectionHeaderLeft,
  SectionHeaderRight,
  SectionHeaderAction,
};

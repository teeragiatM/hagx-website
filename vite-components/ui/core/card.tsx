import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  CardSize,
  CardVariant,
  Responsive,
  ThemeColor,
} from "@/types/variant-types";
import { Heading, Text } from "@ui";
import { Slot } from "radix-ui";
import * as React from "react";

type LegacyCardSize = "xs" | "sm" | "md" | "lg" | "xl";
type LegacyCardVariant = "default";

interface CardProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  size?: Responsive<CardSize | LegacyCardSize>;
  variant?: CardVariant | LegacyCardVariant;
  color?: ThemeColor;
}

const legacySizeMap: Record<LegacyCardSize, CardSize> = {
  xs: "1",
  sm: "1",
  md: "2",
  lg: "3",
  xl: "4",
};

function normalizeCardSize(
  size: CardSize | LegacyCardSize | undefined
): CardSize {
  if (!size) return "1";
  if (size in legacySizeMap) {
    return legacySizeMap[size as LegacyCardSize];
  }
  return size as CardSize;
}

function normalizeCardVariant(variant: CardProps["variant"]): CardVariant {
  if (!variant || variant === "default") return "surface";
  return variant;
}

function Card({
  className,
  asChild = false,
  variant = "surface",
  size = "1",
  color,
  ...props
}: CardProps) {
  const Component = asChild ? Slot.Root : "div";
  const normalizedSize =
    typeof size === "object"
      ? Object.fromEntries(
          Object.entries(size).map(([breakpoint, value]) => [
            breakpoint,
            normalizeCardSize(value),
          ])
        )
      : normalizeCardSize(size);
  const normalizedVariant = normalizeCardVariant(variant);

  return (
    <Component
      data-slot="card"
      data-accent-color={color}
      className={cn(
        "ui-BaseCard ui-Card group/card text-start",
        responsiveClass("ui-r-size", normalizedSize),
        `ui-variant-${normalizedVariant}`,
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header grid auto-rows-min items-start gap-1",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  as = "h3",
  ...props
}: React.ComponentProps<typeof Heading>) {
  return (
    <Heading
      as={as}
      data-slot="card-title"
      className={cn("font-heading text-base font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  as = "div",
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      as={as}
      data-slot="card-description"
      size="2"
      color="gray"
      className={cn("leading-relaxed", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("group/card-content", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("group/card-footer flex items-center gap-2", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
export type { CardProps };

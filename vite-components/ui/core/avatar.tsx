import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  AvatarSize,
  AvatarVariant,
  Responsive,
  ThemeRadius,
} from "@/types/variant-types";

function Avatar({
  className,
  size = "3",
  variant = "solid",
  color,
  highContrast = false,
  radius = "medium",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: Responsive<AvatarSize>;
  variant?: AvatarVariant;
  color?: string;
  highContrast?: boolean;
  radius?: ThemeRadius;
  asChild?: boolean;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-radius={radius}
      data-accent-color={color}
      className={cn(
        "group/avatar ui-AvatarRoot ui-AvatarBase",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        {
          "ui-high-contrast": highContrast,
        },
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("ui-AvatarImage", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("ui-AvatarFallback", className)}
      {...props}
    />
  );
}

function AvatarBadge({
  className,
  color,
  ...props
}: React.ComponentProps<"span"> & {
  color?: string;
}) {
  return (
    <span
      data-slot="avatar-badge"
      data-accent-color={color}
      className={cn("ui-AvatarBadge", className)}
      {...props}
    />
  );
}
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group ui-AvatarGroup ui-AvatarRoot",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      data-accent-color="gray"
      className={cn(
        "ui-AvatarRoot ui-AvatarGroupCount ",

        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
};

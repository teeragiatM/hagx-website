import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive, SpinnerVariant } from "@/types/variant-types";
import { LoaderCircleIcon } from "lucide-react";
import type React from "react";

interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: Responsive<"1" | "2" | "3">;
  loading?: boolean;
  variant?: SpinnerVariant;
  children?: React.ReactNode;
}

// size → icon pixel size mapping
const ICON_SIZE: Record<"1" | "2" | "3", number> = { "1": 14, "2": 16, "3": 20 };

export function Spinner({
  size = "2",
  variant = "default",
  className,
  loading,
  children,
  ...props
}: SpinnerProps) {
  // ── circle / icon variants ──────────────────────────────────────────────────
  if (variant === "circle" || variant === "icon") {
    const resolvedSize = (Array.isArray(size) ? size[0] : size) as "1" | "2" | "3";
    const iconPx = ICON_SIZE[resolvedSize];

    const circleEl = (
      <LoaderCircleIcon
        role="status"
        aria-label="Loading"
        className={cn("animate-spin", variant === "circle" && className)}
        style={{ width: iconPx, height: iconPx }}
      />
    );

    if (variant === "icon") {
      return (
        <span
          data-slot="spinner"
          data-variant="icon"
          className={cn(
            "[&_svg]:pointer-events-none [&_svg]:shrink-0",
            "flex shrink-0 items-center justify-center rounded-lg bg-muted text-foreground",
            resolvedSize === "1" && "size-6",
            resolvedSize === "2" && "size-8",
            resolvedSize === "3" && "size-10",
            className,
          )}
          {...props}
        >
          {circleEl}
        </span>
      );
    }

    // variant="circle" — bare SVG, no wrapper
    return (
      <span
        data-slot="spinner"
        data-variant="circle"
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        {circleEl}
      </span>
    );
  }

  // ── default (leaf) variant ──────────────────────────────────────────────────
  const spinnerEl = (
    <span
      data-slot="spinner"
      data-variant="default"
      className={cn("ui-Spinner", responsiveClass("ui-r-size", size), className)}
      {...props}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="ui-SpinnerLeaf" />
      ))}
    </span>
  );

  // loading=true + children → wrap icon in relative/absolute pattern (Radix Spinner pattern)
  if (loading && children) {
    return (
      <span className="ui-ButtonSpinnerWrapper">
        <span aria-hidden="true" style={{ display: "contents", visibility: "hidden" }}>
          {children}
        </span>
        <span className="ui-ButtonSpinner" aria-hidden="true">
          {spinnerEl}
        </span>
      </span>
    );
  }

  return spinnerEl;
}

export type { SpinnerVariant };

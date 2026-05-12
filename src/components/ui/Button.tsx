"use client";

/**
 * Central Button component
 *
 * Variants:   primary | secondary | ghost | outline
 * Sizes:      sm | md | lg
 * iconOnly:   true  → square button, padding balanced for a single icon
 *
 * Usage:
 *   <Button variant="primary">Submit</Button>
 *   <Button variant="outline" size="sm">View all</Button>
 *   <Button variant="outline" iconOnly aria-label="Next"><ArrowRight /></Button>
 *   <Button variant="outline" iconOnly rounded aria-label="Prev"><ArrowLeft /></Button>
 */

import { cn } from "@/lib/utils";
import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square icon-only button — balanced padding, no text expected */
  iconOnly?: boolean;
  /** Rounded corners (circle when iconOnly) */
  rounded?: boolean;
  /** Render as <a> — pass href */
  href?: string;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#DB5828] text-white border border-transparent hover:bg-[#e67a00] active:bg-[#cc6d00]",
  secondary:
    "border border-white/22 text-white/70 bg-transparent hover:border-white hover:bg-white hover:text-[#080808]",
  ghost:
    "border border-[#DB5828] text-[#DB5828] bg-transparent hover:bg-[#DB5828] hover:text-white",
  outline:
    "border border-white/15 text-white/40 bg-transparent hover:border-white/40 hover:text-white disabled:opacity-20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8  px-4  text-[10px] tracking-[0.1em]",
  md: "h-10 px-6  text-[11px] tracking-[0.12em]",
  lg: "h-12 px-8  text-xs     tracking-[0.14em]",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-8  w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      iconOnly = false,
      rounded = false,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const base = cn(
      "ui-btn inline-flex items-center justify-center font-light uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DB5828]/50 select-none",
      rounded ? "rounded-full" : "",
      variantClasses[variant],
      iconOnly ? iconSizeClasses[size] : sizeClasses[size],
      className,
    );

    if (href) {
      return (
        <a href={href} className={base}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={base} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

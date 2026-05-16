"use client";

import { toEntries } from '@/lib/responsive';
import { cn } from "@/lib/utils";
import type { Responsive, ThemeRadius } from '@/types/variant-types';
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export type ButtonVariant =
  | 'default'
  | 'accent'
  | 'secondary'
  | 'outline'
  | 'ghost';
export type ButtonSize = '1' | '2' | '3' | '4';

// ── Size maps ────────────────────────────────────────────────────────────────

const BUTTON_SIZE: Record<ButtonSize, string> = {
  '1': 'h-6 gap-1 text-xs px-2',
  '2': 'h-8 gap-2 text-sm px-3',
  '3': 'h-10 gap-3 text-base px-4',
  '4': 'h-12 gap-3 text-lg px-6',
};

const ICON_SIZE: Record<ButtonSize, string> = {
  '1': 'h-6 w-6 min-w-6 p-0',
  '2': 'h-8 w-8 min-w-8 p-0',
  '3': 'h-10 w-10 min-w-10 p-0',
  '4': 'h-12 w-12 min-w-12 p-0',
};

// ── Variant styles ───────────────────────────────────────────────────────────

const BASE =
  'transition-all enabled:active:scale-[0.97]  duration-200 focus-visible:outline-2 rounded-full focus-visible:outline-(--accent-500) focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:cursor-not-allowed';

const VARIANT: Record<ButtonVariant, string> = {
  default: cn(
    BASE,
    'bg-(--color-button-invert-bg) text-background-100 font-medium',
    'hover:bg-(--color-button-invert-bg-hover) shadow-(--button-secondary-shadow)',
    'enabled:active:bg-(--color-button-invert-bg-hover) enabled:active:brightness-108',
    'disabled:bg-foreground-200 disabled:outline-none'
  ),
  accent: cn(
    BASE,
    'bg-accent-500 text-accent-contrast font-medium',
    'hover:bg-accent-400 shadow-(--button-secondary-shadow) border-accent-500',
    'enabled:active:bg-accent-400 enabled:active:brightness-108',
    'disabled:bg-foreground-200 disabled:outline-none'
  ),
  outline: cn(
    BASE,
    'ring-1 ring-inset ring-foreground-100/60 text-foreground bg-transparent',
    'hover:bg-accent-500/8',
    'enabled:active:bg-accent-500/14',
    'disabled:ring-foreground-200/32 disabled:bg-transparent'
  ),
  secondary: cn(
    BASE,
    'bg-background-translucent text-foreground border-none font-medium',
    'will-change-transform',
    'hover:bg-background-level-3',
    'enabled:active:bg-background-level-3 shadow-(--button-secondary-shadow)'
  ),
  ghost: cn(
    BASE,
    'bg-transparent text-foreground-200',
    'hover:bg-background-level-3 hover:text-foreground-100',
    'enabled:active:bg-background-level-3 '
  ),
};

// ── Responsive size resolver ──────────────────────────────────────────────────

function resolveSize(size: Responsive<ButtonSize>, iconOnly: boolean): string {
  const map = iconOnly ? ICON_SIZE : BUTTON_SIZE;
  return toEntries(size)
    .flatMap(([bp, s]) => {
      const classes = map[s as ButtonSize].split(' ');
      return bp === 'initial' ? classes : classes.map((c) => `${bp}:${c}`);
    })
    .join(' ');
}

// ── Public helper (used externally) ──────────────────────────────────────────

type ButtonClassOptions = {
  className?: string;
  variant?: ButtonVariant;
  size?: Responsive<ButtonSize>;
  iconOnly?: boolean;
  disabled?: boolean;
};

export function getButtonClassName({
  className,
  variant = 'default',
  size = '2',
  iconOnly = false,
  disabled = false,
}: ButtonClassOptions) {
  return cn(
    'ui-reset inline-flex shrink-0 cursor-pointer select-none items-center justify-center text-center align-top not-italic transition-all duration-200',
    resolveSize(size, iconOnly),
    VARIANT[variant],
    className
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export interface ButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  size?: Responsive<ButtonSize>;
  variant?: ButtonVariant;
  radius?: ThemeRadius;
  rounded?: boolean;
  iconOnly?: boolean;
  notched?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = '2',
      rounded = false,
      asChild = false,
      iconOnly = false,
      notched = false,
      disabled,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        disabled={asChild ? undefined : disabled}
        data-slot="button"
        data-disabled={disabled || undefined}
        aria-disabled={disabled || undefined}
        style={style}
        className={getButtonClassName({
          className: cn(notched && 'notched-sm', className),
          variant,
          size,
          iconOnly,
          disabled,
        })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';
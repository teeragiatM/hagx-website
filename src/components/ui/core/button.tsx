import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import {
  ButtonSize,
  ButtonVariant,
  Responsive,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";
import {
  Slot,
  ToggleGroup as ToggleGroupPrimitive,
  Toggle as TogglePrimitive,
} from "radix-ui";
import * as React from "react";
import { Spinner } from "./spinner";

// ─── ButtonGroup context ────────────────────────────────────────────────────────
// Lets Button / ToggleButton know they're inside a group → switches data-slot
// to "button-group-item" so CSS can target grouped vs standalone buttons.

const ButtonGroupContext = React.createContext(false);

// ─── Shared types ──────────────────────────────────────────────────────────────

type ToggleGroupSpacing = Responsive<string | number> | number;

function resolveGroupSpace(
  spacing: ToggleGroupSpacing | undefined,
  style: React.CSSProperties | undefined
): React.CSSProperties {
  const groupSpace =
    typeof spacing === "string" || typeof spacing === "number"
      ? `var(--spacing-${spacing})`
      : undefined;
  return {
    ...style,
    "--button-group-space": groupSpace,
  } as React.CSSProperties;
}

function disabledAttrs(disabled: boolean | undefined) {
  return {
    disabled,
    "data-disabled": disabled || undefined,
    "aria-disabled": disabled || undefined,
  } as const;
}

// ─── Shared className builder ───────────────────────────────────────────────────

type ButtonClassNameOptions = {
  className?: string;
  variant?: ButtonVariant;
  size?: Responsive<ButtonSize>;
  highContrast?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  toggle?: boolean;
};

function getButtonClassName({
  className,
  variant = "solid",
  size = "2",
  highContrast = false,
  loading = false,
  iconOnly = false,
  toggle = false,
}: ButtonClassNameOptions) {
  return cn(
    "ui-reset ui-BaseButton",
    toggle && "ui-ToggleButton",
    iconOnly ? "ui-IconButton" : "ui-Button",
    `ui-variant-${variant}`,
    responsiveClass("ui-r-size", size),
    highContrast && "ui-high-contrast",
    loading && "ui-loading",
    className
  );
}

// ─── Button ────────────────────────────────────────────────────────────────────

interface ButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  size?: Responsive<ButtonSize>;
  variant?: ButtonVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
  loading?: boolean;
  loadingLabel?: string;
  iconOnly?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "2",
      radius,
      asChild = false,
      color,
      highContrast = false,
      loading = false,
      loadingLabel = "Loading",
      iconOnly = false,
      disabled,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const inGroup = React.useContext(ButtonGroupContext);
    const Component = asChild ? Slot.Root : "button";
    const isDisabled = disabled || loading;
    const initialSize = typeof size === "string" ? size : size?.initial;
    const spinnerSize =
      initialSize === "1" ? "1" : initialSize === "4" ? "3" : "2";

    function flattenChildren(node: React.ReactNode): React.ReactNode[] {
      const result: React.ReactNode[] = [];
      React.Children.forEach(node, (child) => {
        if (React.isValidElement(child) && child.type === React.Fragment) {
          result.push(
            ...flattenChildren(
              (child as React.ReactElement<{ children: React.ReactNode }>).props
                .children
            )
          );
        } else {
          result.push(child);
        }
      });
      return result;
    }

    let loadingContent: React.ReactNode = null;
    if (loading) {
      const flat = flattenChildren(children);
      // First child is a React element (function, forwardRef, svg) followed by more children → icon+label pattern
      const firstIsIcon = flat.length > 1 && React.isValidElement(flat[0]);

      if (firstIsIcon) {
        loadingContent = (
          <>
            <span className="inline-flex relative items-center justify-center">
              <span
                aria-hidden="true"
                style={{ display: "contents", visibility: "hidden" }}
              >
                {flat[0]}
              </span>
              <span
                aria-hidden="true"
                className="flex absolute inset-0 items-center justify-center pointer-events-none"
              >
                <Spinner size={spinnerSize} />
              </span>
            </span>
            {flat.slice(1)}
            {loadingLabel && <span className="sr-only">{loadingLabel}</span>}
          </>
        );
      } else {
        loadingContent = (
          <>
            <span
              aria-hidden="true"
              style={{ display: "contents", visibility: "hidden" }}
            >
              {children}
            </span>
            <span className="sr-only">{loadingLabel ?? children}</span>
            <span
              aria-hidden="true"
              className="flex absolute inset-0 items-center justify-center pointer-events-none"
            >
              <Spinner size={spinnerSize} />
            </span>
          </>
        );
      }
    }

    return (
      <Component
        ref={ref}
        disabled={asChild ? undefined : isDisabled}
        data-slot={inGroup ? "button-group-item" : "button"}
        data-accent-color={color ?? ""}
        data-radius={radius}
        data-loading={loading || undefined}
        data-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        style={style}
        className={getButtonClassName({
          className,
          variant,
          size,
          highContrast,
          loading,
          iconOnly,
        })}
        {...props}
      >
        {loading ? loadingContent : children}
      </Component>
    );
  }
);

Button.displayName = "Button";

// ─── ToggleButton ──────────────────────────────────────────────────────────────
// Same visual as Button, but renders as Radix Toggle.Root.
// Manages aria-pressed + data-state="on"/"off" automatically.
// Default variant is "soft" (matches typical toggle UX).

interface ToggleButtonProps extends Omit<
  React.ComponentProps<typeof TogglePrimitive.Root>,
  "asChild"
> {
  size?: Responsive<ButtonSize>;
  variant?: ButtonVariant;
  color?: ThemeColor;
  highContrast?: boolean;
  radius?: ThemeRadius;
  iconOnly?: boolean;
}

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      className,
      variant = "soft",
      size = "2",
      radius,
      color,
      highContrast = false,
      iconOnly = false,
      disabled,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const inGroup = React.useContext(ButtonGroupContext);
    return (
      <TogglePrimitive.Root
        ref={ref}
        data-slot={inGroup ? "button-group-item" : "toggle-button"}
        data-accent-color={color ?? ""}
        data-radius={radius}
        {...disabledAttrs(disabled)}
        style={style}
        className={getButtonClassName({
          className,
          variant,
          size,
          highContrast,
          iconOnly,
          toggle: true,
        })}
        {...props}
      >
        {children}
      </TogglePrimitive.Root>
    );
  }
);

ToggleButton.displayName = "ToggleButton";

// ─── ButtonGroup ──────────────────────────────────────────────────────────────
// Visual wrapper — joins adjacent Buttons with shared borders.

type ButtonGroupOrientation = "horizontal" | "vertical";

interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: ButtonGroupOrientation;
  spacing?: ToggleGroupSpacing;
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  spacing,
  style,
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={true}>
      <div
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        data-has-spacing={spacing !== undefined}
        style={resolveGroupSpace(spacing, style)}
        className={cn("ui-ControlGroup", className)}
        {...props}
      />
    </ButtonGroupContext.Provider>
  );
}

// ─── ToggleGroup ───────────────────────────────────────────────────────────────
// Radix-managed selection group — single or multiple. children = ToggleGroupItem.
// variant/size/iconOnly trickle down to each item via cloneElement.

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: ButtonVariant;
  size?: Responsive<ButtonSize>;
  spacing?: ToggleGroupSpacing;
  iconOnly?: boolean;
};

type ToggleGroupItemProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Item>,
  "asChild"
> & {
  variant?: ButtonVariant;
  size?: Responsive<ButtonSize>;
  highContrast?: boolean;
  iconOnly?: boolean;
};

function ToggleGroup({
  className,
  variant,
  size,
  iconOnly,
  spacing,
  style,
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ButtonGroupContext.Provider value={true}>
      <ToggleGroupPrimitive.Root
        data-slot="button-group"
        data-variant={variant}
        data-size={typeof size === "string" ? size : undefined}
        data-has-spacing={spacing !== undefined}
        style={resolveGroupSpace(spacing, style)}
        className={cn("ui-ControlGroup", className)}
        {...props}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<Record<string, unknown>>,
                { variant, size, iconOnly }
              )
            : child
        )}
      </ToggleGroupPrimitive.Root>
    </ButtonGroupContext.Provider>
  );
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  (
    {
      className,
      children,
      variant = "soft",
      size = "2",
      highContrast = false,
      iconOnly = false,
      disabled,
      ...props
    },
    ref
  ) => (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="button-group-item"
      {...disabledAttrs(disabled)}
      className={getButtonClassName({ className, variant, size, highContrast, iconOnly, toggle: true })}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
);

ToggleGroupItem.displayName = "ToggleGroupItem";

// ─── Exports ───────────────────────────────────────────────────────────────────

export { Button, ButtonGroup, ToggleButton, ToggleGroup, ToggleGroupItem };

export type {
  ButtonGroupProps,
  ButtonProps,
  ThemeColor,
  ToggleButtonProps,
  ToggleGroupItemProps,
  ToggleGroupProps,
};

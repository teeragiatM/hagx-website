import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { FieldOrientation, FieldSize, Responsive } from "@/types/variant-types";
import { Flex, Text } from "@ui";
import * as React from "react";
import { createContext, useContext, useMemo } from "react";

const fieldRootClassName = "group/field";
const fieldLabelClassName = "group/field-label peer/field-label";

// สร้าง Context สำหรับส่งข้อมูลจาก Field ไปยัง FieldLabel
type FieldContextValue = {
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
};

const FieldContext = createContext<FieldContextValue>({});

function useFieldContext() {
  return useContext(FieldContext);
}

function FieldSet({
  className,
  disabled,
  ...props
}: React.ComponentProps<"fieldset"> & { disabled?: boolean }) {
  return (
    <fieldset
      data-slot="field-set"
      data-disabled={disabled || undefined}
      disabled={disabled}
      className={cn("ui-FieldSet flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  disabled,
  ...props
}: React.ComponentProps<"legend"> & {
  variant?: "legend" | "label";
  disabled?: boolean;
}) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      data-disabled={disabled || undefined}
      className={cn(
        "ui-FieldLegend ui-Text ui-r-size-3 mb-2 font-medium",
        className
      )}
      {...props}
    />
  );
}

function FieldGroup({
  className,
  disabled,
  ...props
}: React.ComponentProps<"div"> & { disabled?: boolean }) {
  return (
    <Flex
      direction={"column"}
      gap="5"
      width={"100%"}
      data-slot="field-group"
      data-disabled={disabled || undefined}
      className={cn("ui-FieldGroup", className)}
      {...props}
    />
  );
}

function Field({
  className,
  orientation = "vertical",
  invalid,
  disabled,
  required,
  size = "2",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: FieldOrientation;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: Responsive<FieldSize>;
}) {
  const contextValue = useMemo(
    () => ({
      required,
      disabled,
      invalid,
    }),
    [required, disabled, invalid]
  );

  return (
    <FieldContext.Provider value={contextValue}>
      <Flex
        role="group"
        data-slot="field"
        data-orientation={orientation}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        data-required={required || undefined}
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
        width={"100%"}
        gap={"2"}
        direction={orientation === "horizontal" ? "row" : "column"}
        align={orientation === "horizontal" ? "center" : "start"}
        className={cn(
          "ui-Field",
          fieldRootClassName,
          responsiveClass("ui-r-size", size),
          className
        )}
        {...props}
      >
        {children}
      </Flex>
    </FieldContext.Provider>
  );
}

function FieldContent({
  className,
  disabled,
  ...props
}: React.ComponentProps<"div"> & { disabled?: boolean }) {
  return (
    <Flex
      direction={"column"}
      flex={"1"}
      data-slot="field-content"
      data-disabled={disabled || undefined}
      className={cn("ui-FieldContent", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  disabled,
  children,
  required: propRequired,
  ...props
}: React.ComponentProps<"label"> & {
  disabled?: boolean;
  required?: boolean;
}) {
  const context = useFieldContext();
  const isRequired = propRequired ?? context.required;
  const isDisabled = disabled ?? context.disabled;

  return (
    <Flex align="center" gap="2">
      <Text
        as="label"
        data-slot="field-label"
        size="1"
        weight="medium"
        data-disabled={isDisabled || undefined}
        data-required={isRequired || undefined}
        className={cn("ui-FieldLabel", fieldLabelClassName, className)}
        {...props}
      >
        {children}
      </Text>
      {isRequired && (
        <Text as="span" size="1" color="destructive" aria-hidden="true">
          *
        </Text>
      )}
    </Flex>
  );
}

function FieldDescription({
  className,
  disabled,
  ...props
}: React.ComponentProps<"p"> & { disabled?: boolean }) {
  const context = useFieldContext();
  const isDisabled = disabled ?? context.disabled;

  return (
    <Text
      as="p"
      data-slot="field-description"
      data-disabled={isDisabled || undefined}
      color="gray"
      className={cn("ui-FieldDescription ui-Text ui-r-size-1", className)}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  disabled,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      data-disabled={disabled || undefined}
      data-orientation={orientation}
      className={cn("ui-TextSeparator", className)}
      {...props}
    >
      {children && (
        <Text
          as="span"
          size="1"
          data-accent-color="gray"
          data-slot="field-separator-content"
        >
          {children}
        </Text>
      )}
    </div>
  );
}
function FieldError({
  className,
  children,
  errors,
  disabled,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
  disabled?: boolean;
}) {
  const context = useFieldContext();
  const isDisabled = disabled ?? context.disabled;

  const content = useMemo(() => {
    if (isDisabled) return null;
    if (children) return children;
    if (!errors?.length) return null;

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <Flex direction={"column"} gap={"1"} ml={"4"}>
        <ul
          style={{ listStyleType: "disc" }}
          data-accent-color="destructive"
          className="ui-FieldErrorList ui-reset ui-r-size-2 ui-Text"
        >
          {uniqueErrors.map(
            (error, index) =>
              error?.message && <li key={index}>{error.message}</li>
          )}
        </ul>
      </Flex>
    );
  }, [children, errors, isDisabled]);

  if (!content) return null;

  return (
    <Text
      role="alert"
      size="2"
      data-accent-color="destructive"
      data-slot="field-error"
      data-disabled={isDisabled || undefined}
      className={cn("ui-FieldError", className)}
      {...props}
    >
      {content}
    </Text>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
};

import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  InputResize,
  InputSize,
  InputVariant,
  Responsive,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";

type FieldSlotAlign =
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end";

type AriaInvalidState = {
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
};

type RootInvalidState = AriaInvalidState & {
  invalid?: boolean;
};

type InputRootProps = React.ComponentProps<"div"> &
  RootInvalidState & {
    size?: Responsive<InputSize>;
    variant?: InputVariant;
    color?: ThemeColor | string;
    radius?: ThemeRadius;
    multiline?: boolean;
    resize?: Responsive<InputResize>;
    disabled?: boolean;
  };

type InputRootContextValue = {
  multiline: boolean;
  disabled?: boolean;
};

const InputRootContext = React.createContext<InputRootContextValue | null>(
  null
);

const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  (
    {
      className,
      size = "2",
      variant = "surface",
      color,
      radius,
      multiline = false,
      resize,
      disabled,
      invalid,
      "aria-invalid": ariaInvalid,
      children,
      ...props
    },
    ref
  ) => {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const accentColor = isInvalid ? "destructive" : color;
    const rootClassName = multiline ? "ui-TextAreaRoot" : "ui-TextFieldRoot";

    return (
      <InputRootContext.Provider value={{ multiline, disabled }}>
        <div
          ref={ref}
          data-slot="input-root"
          data-accent-color={accentColor}
          data-disabled={disabled || undefined}
          data-invalid={isInvalid || undefined}
          data-radius={radius}
          className={cn(
            "ui-InputGroupRoot",
            rootClassName,
            responsiveClass("ui-r-size", size),
            `ui-variant-${variant}`,
            multiline ? responsiveClass("ui-r-resize", resize) : undefined,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </InputRootContext.Provider>
    );
  }
);

InputRoot.displayName = "InputRoot";

interface InputSlotProps extends React.ComponentProps<"div"> {
  align?: FieldSlotAlign;
}

function InputSlot({
  className,
  align = "inline-start",
  ...props
}: InputSlotProps) {
  return (
    <div
      data-slot="input-slot"
      data-align={align}
      className={cn("ui-FieldSlot", className)}
      {...props}
    />
  );
}

type BaseInputProps = RootInvalidState & {
  size?: Responsive<InputSize>;
  variant?: InputVariant;
  color?: ThemeColor | string;
  radius?: ThemeRadius;
  rootClassName?: string;
  multiline?: boolean;
  resize?: Responsive<InputResize>;
};

type SingleLineInputProps = BaseInputProps &
  Omit<React.ComponentProps<"input">, "color" | "size"> & {
    multiline?: false;
  };

type MultiLineInputProps = BaseInputProps &
  Omit<React.ComponentProps<"textarea">, "color"> & {
    multiline: true;
  };

type InputFieldProps =
  | (Omit<SingleLineInputProps, keyof BaseInputProps | "invalid"> &
      AriaInvalidState & {
        multiline?: false;
      })
  | (Omit<MultiLineInputProps, keyof BaseInputProps | "invalid"> &
      AriaInvalidState & {
        multiline: true;
      });

const InputField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(
  (
    { className, multiline, disabled, "aria-invalid": ariaInvalid, ...props },
    ref
  ) => {
    const rootContext = React.useContext(InputRootContext);
    const resolvedMultiline = multiline ?? rootContext?.multiline ?? false;
    const resolvedDisabled = disabled ?? rootContext?.disabled;
    const controlClassName = cn(
      "ui-reset",
      resolvedMultiline ? "ui-AreaInput" : "ui-FieldInput",
      className
    );

    const control = resolvedMultiline ? (
      <textarea
        {...(props as React.ComponentProps<"textarea">)}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        data-slot="input"
        className={controlClassName}
        disabled={resolvedDisabled}
        aria-invalid={ariaInvalid}
      />
    ) : (
      <input
        {...(props as React.ComponentProps<"input">)}
        ref={ref as React.Ref<HTMLInputElement>}
        data-slot="input"
        className={controlClassName}
        disabled={resolvedDisabled}
        aria-invalid={ariaInvalid}
      />
    );

    if (rootContext) return control;

    return control;
  }
);

InputField.displayName = "InputField";

type InputProps = InputFieldProps & BaseInputProps;

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      className,
      rootClassName,
      size,
      variant,
      color,
      radius,
      multiline,
      resize,
      disabled,
      invalid,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const resolvedMultiline = multiline ?? false;
    const resolvedDisabled = disabled ?? false;
    const isInvalid =
      invalid ?? (ariaInvalid === true || ariaInvalid === "true");

    const field = resolvedMultiline ? (
      <InputField
        {...(props as Omit<MultiLineInputProps, keyof BaseInputProps>)}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={className}
        multiline
        disabled={resolvedDisabled}
        aria-invalid={ariaInvalid}
      />
    ) : (
      <InputField
        {...(props as Omit<SingleLineInputProps, keyof BaseInputProps>)}
        ref={ref as React.Ref<HTMLInputElement>}
        className={className}
        multiline={false}
        disabled={resolvedDisabled}
        aria-invalid={ariaInvalid}
      />
    );

    return (
      <InputRoot
        size={size}
        variant={variant}
        color={color}
        radius={radius}
        multiline={resolvedMultiline}
        resize={resize}
        disabled={resolvedDisabled}
        invalid={isInvalid}
        aria-invalid={ariaInvalid}
        className={rootClassName}
      >
        {field}
      </InputRoot>
    );
  }
);

Input.displayName = "Input";

export { Input, InputField, InputRoot, InputSlot };

export type {
  FieldSlotAlign,
  InputFieldProps,
  InputProps,
  InputRootProps,
  InputSize,
  InputSlotProps,
  InputVariant,
};

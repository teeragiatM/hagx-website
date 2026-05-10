"use client";

import * as React from "react";

import { Button } from "@/components/ui/core/button";
import {
  InputField,
  InputRoot,
  type InputFieldProps,
  type InputRootProps,
} from "@/components/ui/core/input";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Badge } from "./badge";
type ChipsProps = InputRootProps & {
  contentClassName?: string;
};

const Chips = React.forwardRef<HTMLDivElement, ChipsProps>(
  ({ className, contentClassName, children, ...props }, ref) => {
    return (
      <InputRoot
        ref={ref}
        data-slot="chips"
        className={cn("ui-Chips", className)}
        {...props}
      >
        <div
          data-slot="chips-content"
          className={cn("ui-ChipContent", contentClassName)}
        >
          {children}
        </div>
      </InputRoot>
    );
  }
);

Chips.displayName = "Chips";

const ChipsInput = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <InputField
        ref={ref}
        data-slot="chips-input"
        className={cn("ui-chip-input", className)}
        {...props}
      />
    );
  }
);

function Chip({
  className,
  variant = "surface",
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="chip"
      variant={variant}
      size={"1"}
      radius="medium"
      className={cn("ui-Chip", className)}
      {...props}
    />
  );
}

function ChipRemove({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="1"
      iconOnly
      data-slot="chip-remove"
      className={cn("ui-ChipRemove", className)}
      {...props}
    >
      {children ?? <XIcon />}
    </Button>
  );
}

ChipsInput.displayName = "ChipsInput";

export { Chip, ChipRemove, Chips, ChipsInput };

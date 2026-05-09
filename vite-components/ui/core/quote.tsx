// Quote.tsx
import { Slot } from "radix-ui";
import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";

type ResponsiveValue<T> =
  | T
  | { initial?: T; xs?: T; sm?: T; md?: T; lg?: T; xl?: T };
type QuoteWrap = "wrap" | "nowrap" | "pretty" | "balance";

interface QuoteProps extends React.ComponentProps<"q"> {
  asChild?: boolean;
  truncate?: boolean;
  wrap?: ResponsiveValue<QuoteWrap>;
}

function Quote({
  className,
  asChild = false,
  truncate = false,
  wrap,
  children,
  ...props
}: QuoteProps) {
  const Component = asChild ? Slot.Root : "q";

  const wrapClass = wrap ? responsiveClass("rt-r-w", wrap) : "";

  const dataAttrs: Record<string, string> = {};
  if (wrap) {
    dataAttrs["data-wrp"] =
      typeof wrap === "string" ? wrap : wrap.initial || "wrap";
  }

  return (
    <Component
      data-slot="quote"
      className={cn("ui-Quote", truncate && "truncate", wrapClass, className)}
      {...dataAttrs}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Quote };

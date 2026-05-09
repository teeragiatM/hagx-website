import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  InsetClip,
  InsetPadding,
  InsetSide,
  Responsive,
} from "@/types/variant-types";
import { Slot } from "radix-ui";
import * as React from "react";

interface InsetProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  side?: Responsive<InsetSide>;
  clip?: Responsive<InsetClip>;
  p?: Responsive<InsetPadding>;
  px?: Responsive<InsetPadding>;
  py?: Responsive<InsetPadding>;
  pt?: Responsive<InsetPadding>;
  pr?: Responsive<InsetPadding>;
  pb?: Responsive<InsetPadding>;
  pl?: Responsive<InsetPadding>;
}

const insetTransform = (v: string) => (v === "current" ? "inset" : v);

function Inset({
  className,
  asChild = false,
  side = "all",
  clip = "border-box",
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  ...props
}: InsetProps) {
  const Component = asChild ? Slot.Root : "div";

  return (
    <Component
      data-slot="inset"
      className={cn(
        "ui-Inset",
        responsiveClass("ui-r-side", side),
        responsiveClass("ui-r-clip", clip),
        responsiveClass("ui-r-p", p, insetTransform),
        responsiveClass("ui-r-px", px, insetTransform),
        responsiveClass("ui-r-py", py, insetTransform),
        responsiveClass("ui-r-pt", pt, insetTransform),
        responsiveClass("ui-r-pr", pr, insetTransform),
        responsiveClass("ui-r-pb", pb, insetTransform),
        responsiveClass("ui-r-pl", pl, insetTransform),
        className,
      )}
      {...props}
    />
  );
}

export { Inset };
export type { InsetProps };

import { resolveFontWeight, responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive, TextWeight } from "@/types/variant-types";

interface KbdProps extends React.ComponentProps<"kbd"> {
  size?: Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">;
  weight?: Responsive<TextWeight>;
}

function Kbd({ className, size = "1", weight, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "ui-Kbd",
        responsiveClass("ui-r-size", size),
        resolveFontWeight(weight),
        "[&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("ui-Kbd-Group", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };

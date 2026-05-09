import { cn } from "@/lib/utils";
import * as React from "react";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("ui-FieldLabel ui-Text ui-r-size-1 font-medium", className)}
      {...props}
    />
  );
}

export { Label };

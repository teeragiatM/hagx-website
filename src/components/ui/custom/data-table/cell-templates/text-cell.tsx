import { cn } from "@/lib/utils";
import type { BaseCellProps } from "./types";

export type TextCellConfig = {
  /** Truncate with ellipsis when text overflows (default: true). */
  isTruncated?: boolean;
};

export function TextCell({
  value,
  config,
  className,
}: BaseCellProps<unknown, TextCellConfig>) {
  const isTruncated = config?.isTruncated ?? true;

  if (value == null || value === "") {
    return <span className="text-muted-foreground/50">—</span>;
  }

  return (
    <span className={cn(isTruncated && "block truncate", className)}>
      {String(value)}
    </span>
  );
}

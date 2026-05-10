import { cn } from "@/lib/utils";
import type { BaseCellProps } from "./types";

export type BadgeCellConfig = {
  /** Map raw value → display label. Falls back to raw value if missing. */
  map?: Record<string, string>;
  /**
   * Map raw value → Tailwind color classes.
   * Falls back to a neutral muted style.
   *
   * @example
   * colorMap: {
   *   active:    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
   *   inactive:  "bg-red-100  text-red-700  dark:bg-red-900/40  dark:text-red-400",
   * }
   */
  colorMap?: Record<string, string>;
};

export function BadgeCell({
  value,
  config,
  className,
}: BaseCellProps<unknown, BadgeCellConfig>) {
  const v = String(value ?? "");
  if (!v) return <span className="text-muted-foreground/50">—</span>;

  const label      = config?.map?.[v]      ?? v;
  const colorClass = config?.colorMap?.[v] ?? "bg-muted text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        colorClass,
        className,
      )}
    >
      {label}
    </span>
  );
}

import { cn } from "@/lib/utils";
import type { BaseCellProps } from "./types";

export type DateCellConfig = {
  /** "date" shows day/month/year; "datetime" also shows hour:minute. Default: "date". */
  display?: "date" | "datetime";
  /** BCP 47 locale (default: "th-TH"). */
  locale?: string;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(locale: string, display: "date" | "datetime"): Intl.DateTimeFormat {
  const key = `${locale}:${display}`;
  if (!formatterCache.has(key)) {
    formatterCache.set(
      key,
      new Intl.DateTimeFormat(locale, display === "datetime" ? DATETIME_FORMAT : DATE_FORMAT),
    );
  }
  return formatterCache.get(key)!;
}

export function DateCell({
  value,
  config,
  className,
}: BaseCellProps<unknown, DateCellConfig>) {
  if (!value) return <span className="text-muted-foreground/50">—</span>;

  try {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) return <span className="text-muted-foreground/50">—</span>;

    const locale  = config?.locale  ?? "th-TH";
    const display = config?.display ?? "date";

    return (
      <span className={cn("tabular-nums", className)}>
        {getFormatter(locale, display).format(d)}
      </span>
    );
  } catch {
    return <span className="text-muted-foreground/50">—</span>;
  }
}

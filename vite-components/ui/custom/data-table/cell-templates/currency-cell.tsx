import { cn } from "@/lib/utils";
import type { BaseCellProps } from "./types";

export type CurrencyCellConfig = {
  /** Symbol/text prepended to the formatted number (e.g. "฿ "). */
  prefix?: string;
  /** Symbol/text appended to the formatted number (e.g. " บาท"). */
  suffix?: string;
  /** Fixed decimal places (default: 0). */
  decimals?: number;
  /** BCP 47 locale for number formatting (default: "th-TH"). */
  locale?: string;
};

const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(locale: string, decimals: number): Intl.NumberFormat {
  const key = `${locale}:${decimals}`;
  if (!formatterCache.has(key)) {
    formatterCache.set(
      key,
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }
  return formatterCache.get(key)!;
}

export function CurrencyCell({
  value,
  config,
  className,
}: BaseCellProps<unknown, CurrencyCellConfig>) {
  if (value == null || value === "") {
    return <span className="text-muted-foreground/50">—</span>;
  }

  const locale   = config?.locale   ?? "th-TH";
  const decimals = config?.decimals ?? 0;
  const formatted = getFormatter(locale, decimals).format(Number(value));

  return (
    <span className={cn("tabular-nums", className)}>
      {config?.prefix}{formatted}{config?.suffix}
    </span>
  );
}

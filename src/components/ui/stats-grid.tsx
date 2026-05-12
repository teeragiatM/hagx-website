import { BorderGrid } from "@/components/ui/BorderGrid";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export type StatsGridDataItem = {
  value: string;
  label: string;
  description?: string;
};

export type StatsGridProps = {
  variant?: "dark" | "accent";
  items?: StatsGridDataItem[];
  className?: string;
  children?: ReactNode;
};

export function StatsGrid({
  variant = "dark",
  items,
  className,
  children,
}: StatsGridProps) {
  const isAccent = variant === "accent";

  return (
    <BorderGrid
      cols={4}
      borderColor={isAccent ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}
      className={cn("ui-stats-grid", className)}
    >
      {items
        ? items.map((item) => (
            <StatsGridItem
              key={`${item.value}-${item.label}`}
              value={item.value}
              label={item.label}
              description={item.description}
              variant={variant}
            />
          ))
        : children}
    </BorderGrid>
  );
}

export type StatsGridItemProps = HTMLAttributes<HTMLDivElement> & {
  value: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  variant?: "dark" | "accent";
};

export function StatsGridItem({
  value,
  label,
  description,
  variant = "dark",
  className,
  ...props
}: StatsGridItemProps) {
  const isAccent = variant === "accent";

  return (
    <div
      className={cn(
        "ui-stats-grid-item flex min-h-[230px] flex-col items-start px-10 py-12",
        isAccent ? "bg-[#DB5828]" : "bg-[#080808] lg:px-16 lg:py-14",
        className,
      )}
      {...props}
    >
      <p
        className={cn(
          "font-bold leading-none",
          isAccent
            ? "mb-2 text-5xl text-white lg:text-6xl"
            : "text-6xl text-[#DB5828] lg:text-7xl",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          isAccent
            ? "mb-1 text-base font-semibold text-white"
            : "mt-4 text-xs font-light uppercase tracking-widest text-white/35",
        )}
      >
        {label}
      </p>
      {description && (
        <p
          className={cn(
            "text-sm font-light leading-7",
            isAccent ? "text-white/70" : "mt-3 max-w-xs text-white/50",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

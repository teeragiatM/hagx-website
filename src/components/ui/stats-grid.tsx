'use client';

import { BorderGrid } from '@/components/ui/BorderGrid';
import { CountUp } from '@/components/ui/engineering';
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

export type StatsGridDataItem = {
  value: string;
  label: string;
  description?: string;
};

export type StatsGridProps = {
  variant?: 'dark' | 'accent';
  items?: StatsGridDataItem[];
  className?: string;
  children?: ReactNode;
};

export function StatsGrid({
  variant = 'dark',
  items,
  className,
  children,
}: StatsGridProps) {
  const isAccent = variant === 'accent';

  return (
    <BorderGrid
      cols={4}
      borderColor={
        isAccent ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'
      }
      className={cn('ui-stats-grid', className)}
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
  variant?: 'dark' | 'accent';
};

// Parse "150+" → { num: 150, suffix: "+" } for CountUp. Falls back to raw display.
function NumericValue({ value }: { value: ReactNode }) {
  if (typeof value !== 'string') return <>{value}</>;
  const match = value.match(/^([~≈]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return <>{value}</>;
  const [, prefix, numStr, suffix] = match;
  const num = parseFloat(numStr);
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return (
    <CountUp
      to={num}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      duration={1.8}
    />
  );
}

export function StatsGridItem({
  value,
  label,
  description,
  variant = 'dark',
  className,
  ...props
}: StatsGridItemProps) {
  const isAccent = variant === 'accent';

  return (
    <div
      className={cn(
        'ui-stats-grid-item flex min-h-[230px] flex-col items-start border px-10 py-12',
        isAccent ? 'bg-accent-500' : 'lg:px-16 lg:py-14',
        className
      )}
      {...props}
    >
      <p
        className={cn(
          'font-mono leading-none font-bold tabular-nums',
          isAccent
            ? 'mb-2 text-5xl text-foreground-100 lg:text-6xl'
            : 'text-6xl text-accent-500 lg:text-7xl'
        )}
      >
        <NumericValue value={value} />
      </p>
      <p
        className={cn(
          isAccent
            ? 'mb-1 text-base font-semibold text-foreground-100'
            : 'mt-4 text-xs font-light tracking-widest text-foreground-200 uppercase'
        )}
      >
        {label}
      </p>
      {description && (
        <p
          className={cn(
            'text-sm leading-7 font-light',
            isAccent
              ? 'text-foreground-200'
              : 'mt-3 max-w-xs text-foreground-300'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

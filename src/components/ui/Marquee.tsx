"use client";

/**
 * Marquee — reusable infinite-scroll component
 *
 * Two variants:
 *
 *   1. <Marquee>                     horizontal ticker (logo strips, text ribbons)
 *   2. <MarqueeGrid>                 vertical multi-column background (clients hero)
 *
 * ─────────────────────────────────────────────────────────────────
 *  Marquee (horizontal)
 * ─────────────────────────────────────────────────────────────────
 *   <Marquee items={logos} />
 *   <Marquee items={logos} direction="right" speed={20} gap={32} />
 *   <Marquee items={logos} renderItem={(item) => <img src={item.logo} />} />
 *
 * ─────────────────────────────────────────────────────────────────
 *  MarqueeGrid (vertical columns — full-height background)
 * ─────────────────────────────────────────────────────────────────
 *   <MarqueeGrid items={clients} columns={5} />
 *   <MarqueeGrid
 *     items={clients}
 *     columns={5}
 *     columnSpeeds={[38, 44, 36, 50, 42]}
 *     renderItem={(item) => <MyCard item={item} />}
 *   />
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

// ─── Shared types ─────────────────────────────────────────────────────────────

/** Minimum shape for the default card renderer */
export type MarqueeItem = {
  id: string;
  label: string;
  sub?: string;
  /** Optional logo URL — renders as <img> instead of text */
  logo?: string;
};

// ─── Default card ─────────────────────────────────────────────────────────────

function DefaultCard({ item }: { item: MarqueeItem }) {
  return item.logo ? (
    <div className="flex h-20 shrink-0 items-center justify-center border border-accent-500/20 bg-[#0c0c0c] px-6 transition-colors hover:border-accent-500/50">
      <img
        src={item.logo}
        alt={item.label}
        className="h-8 max-w-[80px] object-contain opacity-60"
      />
    </div>
  ) : (
    <div className="flex h-20 shrink-0 items-center justify-center border border-accent-500/20 bg-background-100 px-5 transition-colors hover:border-accent-500/50 hover:bg-background-200">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-foreground-300">
          {item.label}
        </p>
        {item.sub && (
          <p className="mt-0.5 text-xs font-light tracking-widest text-foreground-400 uppercase">
            {item.sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Marquee (horizontal) ─────────────────────────────────────────────────────

export type MarqueeProps<T extends MarqueeItem = MarqueeItem> = {
  items: T[];
  /** px/s effective scroll speed (lower = faster), default 40 */
  speed?: number;
  /** "left" (default) | "right" */
  direction?: "left" | "right";
  /** Gap between items in px, default 16 */
  gap?: number;
  /** Override item card render */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** Pause on hover, default true */
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee<T extends MarqueeItem = MarqueeItem>({
  items,
  speed = 40,
  direction = "left",
  gap = 16,
  renderItem,
  pauseOnHover = true,
  className,
}: MarqueeProps<T>) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const segmentItems = items;

  return (
    <div
      className={cn(
        "ui-marquee group relative overflow-hidden",
        className,
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {[0, 1].map((segment) => (
          <div
            key={segment}
            className="flex shrink-0"
            aria-hidden={segment === 1}
            style={{ gap, paddingRight: gap }}
          >
            {segmentItems.map((item, i) => (
              <div key={`${segment}-${i}`} className="shrink-0">
                {renderItem ? (
                  renderItem(item as T, i)
                ) : (
                  <DefaultCard item={item} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TextMarquee ─────────────────────────────────────────────────────────────
// Simple string-array ticker — no id/label shape needed.

export type TextMarqueeProps = {
  items: string[];
  /** px/s scroll speed, default 32 */
  speed?: number;
  /** "left" (default) | "right" */
  direction?: "left" | "right";
  /** Gap between items in px, default 96 */
  gap?: number;
  /** Class on the overflow wrapper */
  className?: string;
  /** Class on each text span */
  itemClassName?: string;
};

export function TextMarquee({
  items,
  speed = 32,
  direction = "left",
  gap = 96,
  className,
  itemClassName,
}: TextMarqueeProps) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const segmentCopies = 4;
  const segmentItems = Array.from({ length: segmentCopies }, () => items).flat();

  return (
    <div className={cn('ui-marquee-text relative overflow-hidden', className)}>
      <div
        className="flex w-max items-center"
        style={{
          animation: `${animName} ${speed * segmentCopies}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {[0, 1].map((segment) => (
          <div
            key={segment}
            className="flex shrink-0 items-center"
            aria-hidden={segment === 1}
            style={{ gap, paddingRight: gap }}
          >
            {segmentItems.map((item, i) => (
              <span
                key={`${segment}-${i}`}
                className={cn(
                  'text-xs font-light tracking-widest whitespace-nowrap text-foreground-100 uppercase',
                  itemClassName
                )}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MarqueeColumn (internal — single vertical column) ────────────────────────

function MarqueeColumn<T extends MarqueeItem>({
  items,
  reverse = false,
  speed = 40,
  gap = 12,
  renderItem,
  minCopies = 6,
  offset = 0,
}: {
  items: T[];
  reverse?: boolean;
  speed?: number;
  gap?: number;
  renderItem?: (item: T, index: number) => React.ReactNode;
  minCopies?: number;
  offset?: number;
}) {
  const copies = Math.max(3, minCopies);
  const loopItems = Array.from({ length: copies }, () => items).flat();
  const startY = `calc(${reverse ? "-50%" : "0%"} + ${offset}px)`;
  const endY = `calc(${reverse ? "0%" : "-50%"} + ${offset}px)`;

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        animate={{ y: [startY, endY] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-col"
        style={{ gap }}
      >
        {loopItems.map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem ? (
              renderItem(item as T, i % items.length)
            ) : (
              <DefaultCard item={item} />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MarqueeGrid (vertical multi-column — use as background) ─────────────────

export type MarqueeGridProps<T extends MarqueeItem = MarqueeItem> = {
  items: T[];
  /** Number of columns, default 5 */
  columns?: number;
  /** Base scroll speed — each column gets slight variation, default 40 */
  speed?: number;
  /** Override per-column speeds (length should match columns) */
  columnSpeeds?: number[];
  /** Override per-column reverse direction */
  columnReverse?: boolean[];
  /** Gap between items in px, default 12 */
  gap?: number;
  /** How many repeated item sets each column keeps in the track. Higher fills tall hero backgrounds better. */
  copies?: number;
  /** Override item card render */
  renderItem?: (item: T, index: number) => React.ReactNode;
  className?: string;
};

export function MarqueeGrid<T extends MarqueeItem = MarqueeItem>({
  items,
  columns = 5,
  speed = 40,
  columnSpeeds,
  columnReverse,
  gap = 12,
  copies = 8,
  renderItem,
  className,
}: MarqueeGridProps<T>) {
  if (items.length === 0) return null;

  // Default speed variation per column for visual depth
  const defaultSpeeds = Array.from({ length: columns }, (_, i) =>
    Math.round(speed * (0.85 + (i % 3) * 0.15)),
  );
  const defaultReverse = Array.from({ length: columns }, (_, i) => i % 2 === 1);

  const speeds = columnSpeeds ?? defaultSpeeds;
  const reverse = columnReverse ?? defaultReverse;

  // Distribute items across columns with overlap for visual density
  const colItems = Array.from({ length: columns }, (_, colIdx) => {
    const perCol = Math.max(6, Math.ceil(items.length / columns) + 4);
    const start = Math.floor((colIdx * items.length) / columns);
    const slice = Array.from({ length: perCol }, (_, i) => {
      return items[(start + i) % items.length];
    });
    // Pad with wrapped items if slice is short
    return slice;
  });

  return (
    <div className={cn("ui-marquee-grid flex h-full gap-3", className)}>
      {Array.from({ length: columns }).map((_, colIdx) => (
        <div key={colIdx} className="flex-1 h-full">
          <MarqueeColumn
            items={colItems[colIdx] as T[]}
            reverse={reverse[colIdx]}
            speed={speeds[colIdx]}
            gap={gap}
            minCopies={copies}
            offset={-(colIdx % 3) * 72}
            renderItem={renderItem}
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

// ─── BorderGrid ───────────────────────────────────────────────────────────────
// Grid whose cells are separated by hairline borders via the gap-px trick.
// bg-white/[0.06] on the wrapper + bg-[#0a0a0a] on each cell = 1px border lines.

const colClasses: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
};

export type BorderGridProps = HTMLAttributes<HTMLDivElement> & {
  /** Number of columns at full width. Default 4. */
  cols?: 1 | 2 | 3 | 4;
  /** Border / gap colour. Default white/[0.06]. */
  borderColor?: string;
};

export function BorderGrid({
  cols = 4,
  borderColor = "rgba(255,255,255,0.06)",
  className,
  children,
  ...props
}: BorderGridProps) {
  return (
    <div
      className={cn(
        "ui-border-grid grid items-stretch gap-px overflow-hidden border",
        colClasses[cols],
        className,
      )}
      style={{ borderColor, backgroundColor: borderColor }}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── BorderGridCell ───────────────────────────────────────────────────────────

export type BorderGridCellProps = HTMLAttributes<HTMLDivElement> & {
  /** Animate in on scroll. Default true. */
  animate?: boolean;
  /** Stagger delay index (used when animate=true). */
  index?: number;
  /** Cell background colour. Default #0a0a0a. */
  bg?: string;
  /** Radial accent glow on hover. Pass false to disable. */
  glow?: boolean | string;
  children: ReactNode;
};

export function BorderGridCell({
  animate = true,
  index = 0,
  bg = "#0a0a0a",
  glow = true,
  className,
  children,
  style,
  ...props
}: BorderGridCellProps) {
  const glowColor =
    typeof glow === "string"
      ? glow
      : "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,138,0,0.07), transparent 70%)";

  const inner = (
    <div
      className={cn(
        "ui-border-grid-cell group relative flex h-full min-h-full flex-col px-6 py-8 transition-colors duration-300 sm:px-7 sm:py-9",
        className,
      )}
      style={{ backgroundColor: bg, ...style }}
      {...props}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowColor }}
        />
      )}
      <div className="relative flex h-full flex-1 flex-col">{children}</div>
    </div>
  );

  if (!animate) return inner;

  return (
    <motion.div
      className="h-full min-h-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
    >
      {inner}
    </motion.div>
  );
}

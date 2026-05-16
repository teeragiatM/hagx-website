"use client";

/**
 * Engineering UI primitives — HAGX visual language
 *
 * Components:
 *   <CornerMarks>     — SVG crosshair corners with optional coordinate labels
 *   <DimensionLine>   — horizontal or vertical measurement annotation
 *   <ScanLine>        — scroll-driven accent scan line over a container
 *
 * CountUp has moved to animate.tsx — re-exported here for compatibility.
 */

export { CountUp } from "./animate";

import { motion, useInView, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── CornerMarks ──────────────────────────────────────────────────────────────
// Draws thin SVG L-shaped marks at corners of its parent (position: relative).
// Optional coordinate labels in monospace.

type CornerMarksProps = {
  /** Length of each arm in px */
  size?: number;
  /** Stroke color — defaults to accent */
  color?: string;
  /** Stroke width */
  weight?: number;
  /** Show x,y coordinate labels */
  coords?: boolean;
  /** Label prefix e.g. "SEC-01" */
  label?: string;
  /** Which corners to show */
  corners?: ("tl" | "tr" | "bl" | "br")[];
  className?: string;
};

export function CornerMarks({
  size = 14,
  color = "var(--accent-500)",
  weight = 1,
  coords = false,
  label,
  corners = ["tl", "tr", "bl", "br"],
  className,
}: CornerMarksProps) {
  const s = size;
  const pad = 0;

  const arms: Record<string, string> = {
    tl: `M ${pad + s},${pad} L ${pad},${pad} L ${pad},${pad + s}`,
    tr: `M 100%-${pad + s},${pad} L 100%-${pad},${pad} L 100%-${pad},${pad + s}`,
    bl: `M ${pad},100%-${pad + s} L ${pad},100%-${pad} L ${pad + s},100%-${pad}`,
    br: `M 100%-${pad},100%-${pad + s} L 100%-${pad},100%-${pad} L 100%-${pad + s},100%-${pad}`,
  };

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{ zIndex: 1 }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 overflow-visible"
      >
        {corners.includes("tl") && (
          <path
            d={`M ${s},0 L 0,0 L 0,${s}`}
            fill="none"
            stroke={color}
            strokeWidth={weight}
          />
        )}
        {corners.includes("tr") && (
          <path
            d={`M calc(100% - ${s}px),0 L 100%,0 L 100%,${s}`}
            fill="none"
            stroke={color}
            strokeWidth={weight}
          />
        )}
        {corners.includes("bl") && (
          <path
            d={`M 0,calc(100% - ${s}px) L 0,100% L ${s},100%`}
            fill="none"
            stroke={color}
            strokeWidth={weight}
          />
        )}
        {corners.includes("br") && (
          <path
            d={`M calc(100% - ${s}px),100% L 100%,100% L 100%,calc(100% - ${s}px)`}
            fill="none"
            stroke={color}
            strokeWidth={weight}
          />
        )}

        {/* Coordinate labels */}
        {coords && (
          <>
            <text
              x="0"
              y="-4"
              fill={color}
              fontSize="7"
              fontFamily="monospace"
              opacity="0.5"
            >
              {label ?? "0,0"}
            </text>
            <text
              x="100%"
              y="-4"
              fill={color}
              fontSize="7"
              fontFamily="monospace"
              opacity="0.5"
              textAnchor="end"
            >
              {label ? `${label}` : "W,0"}
            </text>
          </>
        )}
      </svg>
    </span>
  );
}

// ─── DimensionLine ────────────────────────────────────────────────────────────
// Renders a thin measurement annotation line with end ticks and a label.
// Place inside a `position: relative` container.

type DimensionLineProps = {
  /** "h" = horizontal across bottom, "v" = vertical on right */
  axis?: "h" | "v";
  /** Offset from the edge (px) */
  offset?: number;
  /** Label text — defaults to the axis width/height string */
  label?: string;
  color?: string;
  className?: string;
  /** Animate in on viewport enter */
  animate?: boolean;
};

export function DimensionLine({
  axis = "h",
  offset = 10,
  label = "—",
  color = "var(--accent-500)",
  className,
  animate = true,
}: DimensionLineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });

  const opacity = animate ? (inView ? 0.55 : 0) : 0.55;
  const pathLength = animate ? (inView ? 1 : 0) : 1;

  if (axis === "h") {
    return (
      <svg
        ref={ref}
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 overflow-visible ${className ?? ""}`}
        style={{ bottom: offset, height: 16 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="0" y1="8" x2="100%" y2="8"
          stroke={color} strokeWidth="0.75"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength, opacity }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* end ticks */}
        <motion.line x1="0" y1="4" x2="0" y2="12" stroke={color} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.4, delay: 0.6 }} />
        <motion.line x1="100%" y1="4" x2="100%" y2="12" stroke={color} strokeWidth="0.75"
          initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.4, delay: 0.6 }} />
        <motion.text
          x="50%" y="6" textAnchor="middle" dominantBaseline="middle"
          fill={color} fontSize="7" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.4, delay: 0.7 }}
        >
          {label}
        </motion.text>
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 overflow-visible ${className ?? ""}`}
      style={{ right: offset, width: 16 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.line
        x1="8" y1="0" x2="8" y2="100%"
        stroke={color} strokeWidth="0.75"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength, opacity }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.line x1="4" y1="0" x2="12" y2="0" stroke={color} strokeWidth="0.75"
        initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.4, delay: 0.6 }} />
      <motion.line x1="4" y1="100%" x2="12" y2="100%" stroke={color} strokeWidth="0.75"
        initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.4, delay: 0.6 }} />
      <motion.text
        x="8" y="50%" textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize="7" fontFamily="monospace"
        transform="rotate(-90, 8, 50%)"
        initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.4, delay: 0.7 }}
      >
        {label}
      </motion.text>
    </svg>
  );
}

// ─── ScanLine ─────────────────────────────────────────────────────────────────
// A 1px accent line that sweeps top→bottom driven by scroll progress (0–1).
// Wrap a section in `position: relative` and drop <ScanLine scrollProgress={sp} />.

type ScanLineProps = {
  /** framer-motion MotionValue<number> from useScroll, range 0–1 */
  scrollProgress: { get: () => number; on: (event: string, cb: (v: number) => void) => () => void };
  color?: string;
  opacity?: number;
};

export function ScanLine({
  scrollProgress,
  color = "var(--accent-500)",
  opacity = 0.35,
}: ScanLineProps) {
  const top = useTransform(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollProgress as any,
    [0, 1],
    ["0%", "100%"],
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-20"
      style={{
        top,
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${color} 20%, ${color} 80%, transparent 100%)`,
        opacity,
        boxShadow: `0 0 8px 1px ${color}`,
      }}
    />
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";

// ─── Root ─────────────────────────────────────────────────────────────────────

export type MediaCardProps = {
  href?: string;
  animate?: boolean;
  animateDelay?: number;
  className?: string;
  children: ReactNode;
};

export function MediaCard({
  href,
  animate = true,
  animateDelay = 0,
  className,
  children,
}: MediaCardProps) {
  const inner = (
    <div
      className={cn(
        "ui-media-card group relative flex h-full flex-col overflow-hidden border border-white/[0.07] bg-[#0c0c0c] transition-all duration-300 hover:border-[#DB5828]/30 hover:shadow-[0_0_40px_rgba(255,138,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );

  const wrapped = href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );

  if (!animate) return <div>{wrapped}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: animateDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      {wrapped}
    </motion.div>
  );
}

// ─── Image ────────────────────────────────────────────────────────────────────

const aspectClasses = {
  video: "aspect-video",
  wide: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

export type MediaCardImageProps = {
  src: string;
  alt: string;
  aspect?: keyof typeof aspectClasses;
  sizes?: string;
  /** Gradient overlay colour stop. Default #0c0c0c */
  gradientFrom?: string;
  children?: ReactNode;
  className?: string;
};

export function MediaCardImage({
  src,
  alt,
  aspect = "wide",
  sizes = "(min-width:1280px) 25vw, (min-width:640px) 40vw, 90vw",
  gradientFrom = "#0c0c0c",
  children,
  className,
}: MediaCardImageProps) {
  return (
    <div
      className={cn(
        "ui-media-card-image relative overflow-hidden",
        aspectClasses[aspect],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover opacity-65 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent"
        style={{ backgroundImage: `linear-gradient(to top, ${gradientFrom}/90%, transparent)` }}
      />
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export type MediaCardBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "default" | "accent" | "custom";
  children: ReactNode;
};

const positionClasses = {
  "top-left": "absolute left-4 top-4",
  "top-right": "absolute right-4 top-4",
  "bottom-left": "absolute bottom-4 left-4",
  "bottom-right": "absolute bottom-4 right-4",
};

export function MediaCardBadge({
  position = "top-left",
  variant = "default",
  className,
  children,
  ...props
}: MediaCardBadgeProps) {
  return (
    <span
      className={cn(
        "ui-media-card-badge px-2.5 py-1 text-[9px] font-light uppercase tracking-widest backdrop-blur-sm",
        positionClasses[position],
        variant === "default" && "border border-white/15 bg-black/50 text-white/60",
        variant === "accent" && "border border-[#DB5828]/50 bg-[#DB5828]/15 text-[#DB5828]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────

export function MediaCardBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ui-media-card-body flex flex-1 flex-col p-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

export function MediaCardEyebrow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "ui-media-card-eyebrow mb-1 text-[10px] font-light uppercase tracking-widest text-[#DB5828]",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

export function MediaCardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "ui-media-card-title mb-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-[#DB5828]",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

// ─── Excerpt ──────────────────────────────────────────────────────────────────

export function MediaCardExcerpt({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "ui-media-card-excerpt mb-4 flex-1 text-xs font-light leading-[1.8] text-white/45 line-clamp-3",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// ─── Meta (top row: left + right slots) ──────────────────────────────────────

export function MediaCardMeta({
  left,
  right,
  className,
}: {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ui-media-card-meta mb-3 flex items-center justify-between gap-2",
        className,
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// ─── Footer (bottom row: left + right slots) ──────────────────────────────────

export function MediaCardFooter({
  left,
  right,
  className,
}: {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ui-media-card-footer mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4",
        className,
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// ─── Arrow CTA (common pattern) ───────────────────────────────────────────────

export function MediaCardArrow({ label }: { label: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-light uppercase tracking-widest text-[#DB5828] opacity-0 transition-opacity group-hover:opacity-100">
      {label}
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path
          d="M1 6h10M7 2l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

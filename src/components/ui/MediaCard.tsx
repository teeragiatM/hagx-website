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
        'ui-media-card group relative flex h-full flex-col overflow-hidden border border-white/[0.07] bg-[#0c0c0c] transition-all duration-300 hover:border-accent-500/30 hover:shadow-[0_0_40px_rgba(255,138,0,0.08)]',
        className
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
  /** fill=true: image is absolute inset-0, parent must have explicit height */
  fill?: boolean;
  sizes?: string;
  /** Gradient overlay colour stop. Default #0c0c0c */
  gradientFrom?: string;
  children?: ReactNode;
  className?: string;
};

export function MediaCardImage({
  src,
  alt,
  aspect = 'wide',
  fill = false,
  sizes = '(min-width:1280px) 25vw, (min-width:640px) 40vw, 90vw',
  gradientFrom = '#0c0c0c',
  children,
  className,
}: MediaCardImageProps) {
  return (
    <div
      className={cn(
        'ui-media-card-image relative overflow-hidden',
        fill ? 'absolute inset-0' : aspectClasses[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover opacity-65 transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to top, color-mix(in srgb, ${gradientFrom} 90%, transparent), transparent)`,
        }}
      />
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export type MediaCardBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant?: 'default' | 'accent' | 'outlined';
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
        'ui-media-card-badge px-2.5 py-1 text-xs font-light tracking-widest uppercase backdrop-blur-sm',
        positionClasses[position],
        variant === 'default' && 'bg-black/50 text-foreground-200',
        variant === 'accent' &&
          'border border-accent-500/50 bg-accent-500/15 text-accent-500',
        variant === 'outlined' &&
          'border border-white/25 bg-transparent text-foreground-200',
        className
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

// ─── Number ───────────────────────────────────────────────────────────────────
// Used for carousel/stack items to show "01", "02" etc.

export function MediaCardNumber({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "ui-media-card-number mb-3 text-xs font-light tracking-widest text-foreground-400",
        className,
      )}
      {...props}
    >
      {children}
    </p>
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
        'ui-media-card-eyebrow mb-1 text-[10px] font-light tracking-widest text-accent-500 uppercase',
        className
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
        'ui-media-card-title mb-2 text-base leading-snug font-semibold text-foreground-100 transition-colors group-hover:text-accent-500',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

// ─── Subtitle ─────────────────────────────────────────────────────────────────
// Secondary label under title (e.g. English product name, client name)

export function MediaCardSubtitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'ui-media-card-subtitle mb-2 text-[11px] font-light text-foreground-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
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
        'ui-media-card-excerpt mb-4 line-clamp-3 flex-1 text-xs leading-[1.8] font-light text-foreground-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// ─── Meta (top row: left + right slots) ───────────────────────────────────────

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
    <span className="flex items-center gap-1.5 text-[10px] font-light tracking-widest text-accent-500 uppercase opacity-0 transition-opacity group-hover:opacity-100">
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

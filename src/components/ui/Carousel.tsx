"use client";

/**
 * Composable Carousel system
 *
 * Simple usage (recommended):
 *   <Carousel eyebrow="..." title="..." description="..." items={items} ctaPrimary={...} />
 *
 * Composable usage (custom layout):
 *   <CarouselRoot items={items} visibleCount={3}>
 *     <CarouselHeader eyebrow="..." title="..." description="..." />
 *     <CarouselGrid />                          ← renders cards from context
 *     <CarouselNav ctaPrimary={...} />
 *   </CarouselRoot>
 *
 * To change card design: edit CarouselCard only — all carousels update.
 */

import * as React from "react";
import { useMemo, useState, useContext, createContext } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselItem = {
  /** display number, e.g. "01" */
  n: string;
  title: string;
  desc: string;
  image: string;
};

export type CarouselCta = { href: string; label: string };

type CarouselContextValue = {
  items: CarouselItem[];
  visibleItems: CarouselItem[];
  startIndex: number;
  setStartIndex: (i: number) => void;
  safeVisibleCount: number;
  canSlide: boolean;
  maxStart: number;
  goPrev: () => void;
  goNext: () => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel sub-component used outside <CarouselRoot>");
  return ctx;
}

// ─── CarouselRoot ─────────────────────────────────────────────────────────────
// Manages state; renders a plain div — no layout opinions.

export type CarouselRootProps = {
  items: CarouselItem[];
  visibleCount?: number;
  children: React.ReactNode;
  className?: string;
};

export function CarouselRoot({
  items,
  visibleCount = 4,
  children,
  className,
}: CarouselRootProps) {
  const safeVisibleCount = Math.max(1, Math.min(visibleCount, items.length));
  const maxStart         = Math.max(0, items.length - safeVisibleCount);
  const canSlide         = items.length > safeVisibleCount;
  const [startIndex, setStartIndex] = useState(0);

  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + safeVisibleCount),
    [items, safeVisibleCount, startIndex],
  );

  const goPrev = () => setStartIndex((i) => Math.max(0, i - 1));
  const goNext = () => setStartIndex((i) => Math.min(maxStart, i + 1));

  return (
    <CarouselContext.Provider
      value={{ items, visibleItems, startIndex, setStartIndex, safeVisibleCount, canSlide, maxStart, goPrev, goNext }}
    >
      <div className={className}>{children}</div>
    </CarouselContext.Provider>
  );
}

// ─── CarouselHeader ───────────────────────────────────────────────────────────

export type CarouselHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function CarouselHeader({ eyebrow, title, description, className }: CarouselHeaderProps) {
  return (
    <div className={`mb-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start ${className ?? ""}`}>
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-xl text-sm font-light leading-7 text-white/55 lg:ml-auto lg:pt-3 lg:text-right">
          {description}
        </p>
      )}
    </div>
  );
}

// ─── CarouselCard ─────────────────────────────────────────────────────────────
// Edit THIS component to change the visual design for all carousels.

export type CarouselCardProps = {
  item: CarouselItem;
  className?: string;
};

export function CarouselCard({ item, className }: CarouselCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-h-[500px] overflow-hidden bg-[#111] ${className ?? ""}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="mb-4 text-xs font-light text-white/35">{item.n}</p>
        <h3 className="max-w-[15rem] text-2xl font-light leading-tight text-white">
          {item.title}
        </h3>
        <p className="mt-4 text-xs font-light leading-6 text-white/55">{item.desc}</p>
      </div>
    </motion.article>
  );
}

// ─── CarouselGrid ─────────────────────────────────────────────────────────────
// Renders the visible cards in a responsive grid.

export type CarouselGridProps = {
  className?: string;
  /** Override card rendering for custom card variants */
  renderCard?: (item: CarouselItem, index: number) => React.ReactNode;
};

export function CarouselGrid({ className, renderCard }: CarouselGridProps) {
  const { visibleItems, safeVisibleCount } = useCarousel();

  const colClass =
    safeVisibleCount >= 4 ? "lg:grid-cols-4" :
    safeVisibleCount === 3 ? "lg:grid-cols-3" :
    "lg:grid-cols-2";

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${colClass} ${className ?? ""}`}>
      {visibleItems.map((item, i) =>
        renderCard ? renderCard(item, i) : <CarouselCard key={item.n} item={item} />,
      )}
    </div>
  );
}

// ─── CarouselNav ──────────────────────────────────────────────────────────────
// CTA buttons + dot indicators + prev/next arrows.

export type CarouselNavProps = {
  ctaPrimary?:   CarouselCta;
  ctaSecondary?: CarouselCta;
  className?: string;
};

export function CarouselNav({ ctaPrimary, ctaSecondary, className }: CarouselNavProps) {
  const { items, startIndex, setStartIndex, safeVisibleCount, canSlide, maxStart, goPrev, goNext } = useCarousel();

  return (
    <div className={`mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between ${className ?? ""}`}>
      <div className="flex flex-wrap gap-4">
        {ctaPrimary && (
          <Link href={ctaPrimary.href} className="btn btn-primary">
            {ctaPrimary.label}
          </Link>
        )}
        {ctaSecondary && (
          <Link href={ctaSecondary.href} className="btn btn-secondary">
            {ctaSecondary.label}
          </Link>
        )}
      </div>

      {canSlide && (
        <div className="flex items-center gap-6 sm:justify-end">
          <div className="hidden gap-3 sm:flex">
            {items.map((item, index) => (
              <button
                key={item.n}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setStartIndex(Math.min(index, maxStart))}
                className={`h-[2px] w-8 transition-colors ${
                  index >= startIndex && index < startIndex + safeVisibleCount
                    ? "bg-[#ff8a00]"
                    : "bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={startIndex === 0}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white disabled:opacity-20"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={startIndex === maxStart}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white disabled:opacity-20"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Carousel (convenience component) ────────────────────────────────────────
// Drop-in replacement — same API as the old ServiceCarousel.

export type CarouselProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CarouselItem[];
  ctaPrimary?:   CarouselCta;
  ctaSecondary?: CarouselCta;
  visibleCount?: number;
  className?: string;
};

export function Carousel({
  eyebrow,
  title,
  description,
  items,
  ctaPrimary,
  ctaSecondary,
  visibleCount = 4,
  className,
}: CarouselProps) {
  return (
    <CarouselRoot items={items} visibleCount={visibleCount}>
      <section className={`border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28 ${className ?? ""}`}>
        <div className="mx-auto max-w-[1500px]">
          <CarouselHeader eyebrow={eyebrow} title={title} description={description} />
          <CarouselGrid />
          <CarouselNav ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} />
        </div>
      </section>
    </CarouselRoot>
  );
}

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
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { Container, Section } from "@/components/ui/section";
import { useSwipe } from "@/hooks/useSwipe";

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
  if (!ctx)
    throw new Error("Carousel sub-component used outside <CarouselRoot>");
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
  const maxStart = Math.max(0, items.length - safeVisibleCount);
  const canSlide = items.length > safeVisibleCount;
  const [startIndex, setStartIndex] = useState(0);

  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + safeVisibleCount),
    [items, safeVisibleCount, startIndex],
  );

  const goPrev = () => setStartIndex((i) => Math.max(0, i - 1));
  const goNext = () => setStartIndex((i) => Math.min(maxStart, i + 1));

  return (
    <CarouselContext.Provider
      value={{
        items,
        visibleItems,
        startIndex,
        setStartIndex,
        safeVisibleCount,
        canSlide,
        maxStart,
        goPrev,
        goNext,
      }}
    >
      <div className={cn("ui-carousel", className)}>{children}</div>
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

export function CarouselHeader({
  eyebrow,
  title,
  description,
  className,
}: CarouselHeaderProps) {
  return (
    <SectionHeader
      eyebrow={eyebrow}
      heading={title}
      description={description}
      className={className}
    />
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
      className={`ui-carousel-card group relative min-h-[500px] overflow-hidden bg-[#111] ${className ?? ""}`}
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
        <p className="mb-4 text-xs font-light text-muted">{item.n}</p>
        <h3 className="max-w-[15rem] text-2xl font-light leading-tight text-white">
          {item.title}
        </h3>
        <p className="mt-4 text-xs font-light leading-6 text-white/55">
          {item.desc}
        </p>
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
  const { visibleItems, safeVisibleCount, goPrev, goNext } = useCarousel();
  const swipe = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  const colClass =
    safeVisibleCount >= 4
      ? "lg:grid-cols-4"
      : safeVisibleCount === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-2";

  return (
    <div
      {...swipe}
      className={`ui-carousel-grid grid gap-4 sm:grid-cols-2 ${colClass} ${className ?? ""} touch-pan-y select-none`}
    >
      {visibleItems.map((item, i) =>
        renderCard ? (
          renderCard(item, i)
        ) : (
          <CarouselCard key={item.n} item={item} />
        ),
      )}
    </div>
  );
}

// ─── CarouselNav ──────────────────────────────────────────────────────────────
// Unified nav: action slot (left) + dots + arrows (right)

export type CarouselNavProps = {
  ctaPrimary?: CarouselCta;
  ctaSecondary?: CarouselCta;
  /** Extra content for the left action slot — overrides ctaPrimary/ctaSecondary */
  actionSlot?: React.ReactNode;
  className?: string;
};

export function CarouselNav({
  ctaPrimary,
  ctaSecondary,
  actionSlot,
  className,
}: CarouselNavProps) {
  const {
    items,
    startIndex,
    setStartIndex,
    safeVisibleCount,
    canSlide,
    maxStart,
    goPrev,
    goNext,
  } = useCarousel();

  const actions = actionSlot ?? (
    <>
      {ctaPrimary && (
        <Button asChild variant="default">
          <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
        </Button>
      )}
      {ctaSecondary && (
        <Button asChild variant="secondary">
          <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
        </Button>
      )}
    </>
  );

  // dot index = first visible card's position among all items
  const dotIndex = startIndex;
  // total pages = max number of distinct starting positions + 1
  const totalDots = maxStart + 1;

  return (
    <CarouselControls
      index={dotIndex}
      total={canSlide ? totalDots : 0}
      onPrev={goPrev}
      onNext={goNext}
      onDotClick={(i) => setStartIndex(Math.min(i, maxStart))}
      canPrev={startIndex > 0}
      canNext={startIndex < maxStart}
      actionSlot={actions}
      dotStyle="dot"
      className={`mt-12 ${className ?? ""}`}
    />
  );
}

// ─── Carousel (convenience component) ────────────────────────────────────────
// Drop-in replacement — same API as the old ServiceCarousel.

export type CarouselProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CarouselItem[];
  ctaPrimary?: CarouselCta;
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
      <Section
        size={{ initial: "3", lg: "4" }}
        className={cn("border-b border-white/[0.06]", className)}
      >
        <Container size="4">
          <CarouselHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <CarouselGrid />
          <CarouselNav ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} />
        </Container>
      </Section>
    </CarouselRoot>
  );
}

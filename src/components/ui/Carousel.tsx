"use client";

import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from '@ui/Button';
import { useSwipe } from "@/hooks/useSwipe";
import SectionHeader from '@layout/SectionHeader';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Minimal item shape — n is used for keying only. Put any extra fields you need. */
export type CarouselItem = {
  n: string;
  [key: string]: unknown;
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
  dir: number;
  loop: boolean;
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

export type CarouselRootProps = {
  items: CarouselItem[];
  visibleCount?: number;
  loop?: boolean;
  autoPlay?: boolean;
  intervalMs?: number;
  autoPlayDirection?: "next" | "prev";
  children: React.ReactNode;
  className?: string;
};

export function CarouselRoot({
  items,
  visibleCount = 4,
  loop = false,
  autoPlay = false,
  intervalMs = 5000,
  autoPlayDirection = "next",
  children,
  className,
}: CarouselRootProps) {
  const safeVisibleCount = Math.max(1, Math.min(visibleCount, items.length));
  const maxStart = Math.max(0, items.length - safeVisibleCount);
  const canSlide = items.length > safeVisibleCount;

  const [startIndex, setStartIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const goPrev = useCallback(() => {
    setDir(-1);
    setStartIndex((i) =>
      loop ? (i - 1 + items.length) % items.length : Math.max(0, i - 1)
    );
  }, [loop, items.length]);

  const goNext = useCallback(() => {
    setDir(1);
    setStartIndex((i) =>
      loop ? (i + 1) % items.length : Math.min(maxStart, i + 1)
    );
  }, [loop, items.length, maxStart]);

  const prevRef = useRef(goPrev);
  const nextRef = useRef(goNext);
  prevRef.current = goPrev;
  nextRef.current = goNext;

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = window.setInterval(() => {
      autoPlayDirection === "prev" ? prevRef.current() : nextRef.current();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayDirection, intervalMs, items.length]);

  const visibleItems = useMemo(() => {
    if (loop) {
      return Array.from(
        { length: safeVisibleCount },
        (_, i) => items[(startIndex + i) % items.length]
      );
    }
    return items.slice(startIndex, startIndex + safeVisibleCount);
  }, [items, safeVisibleCount, startIndex, loop]);

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
        dir,
        loop,
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

export function CarouselHeader({ title, description, className }: CarouselHeaderProps) {
  return <SectionHeader heading={title} description={description} className={className} />;
}

// ─── CarouselGrid ─────────────────────────────────────────────────────────────

export type CarouselGridProps = {
  className?: string;
  animate?: boolean;
  /**
   * Required — (item, localIndex, globalIndex) → ReactNode
   * globalIndex = (startIndex + localIndex) % items.length
   */
  renderCard: (item: CarouselItem, localIndex: number, globalIndex: number) => React.ReactNode;
};

export function CarouselGrid({ className, animate = true, renderCard }: CarouselGridProps) {
  const { visibleItems, safeVisibleCount, startIndex, items, goPrev, goNext, dir } = useCarousel();
  const swipe = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  const colClass =
    safeVisibleCount >= 4
      ? "lg:grid-cols-4"
      : safeVisibleCount === 3
        ? "lg:grid-cols-3"
        : safeVisibleCount === 2
          ? "lg:grid-cols-2"
          : "grid-cols-1";

  const grid = (
    <div
      className={cn(
        `ui-carousel-grid grid gap-4 sm:grid-cols-2 ${colClass} select-none`,
        safeVisibleCount === 1 && "sm:grid-cols-1",
        className
      )}
    >
      {visibleItems.map((item, localIdx) => {
        const globalIdx = (startIndex + localIdx) % items.length;
        return (
          <React.Fragment key={`${globalIdx}-${item.n}`}>
            {renderCard(item, localIdx, globalIdx)}
          </React.Fragment>
        );
      })}
    </div>
  );

  if (!animate) {
    return <div {...swipe} className="touch-pan-y">{grid}</div>;
  }

  return (
    <div {...swipe} className="touch-pan-y overflow-hidden relative">
      {/* invisible spacer — keeps container height stable while slides are absolute */}
      <div aria-hidden className="invisible pointer-events-none">{grid}</div>
      <AnimatePresence mode="sync" custom={dir} initial={false}>
        <motion.div
          key={startIndex}
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
            center: { x: 0 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {grid}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── CarouselControls ─────────────────────────────────────────────────────────

export type CarouselControlsDotStyle = "line" | "dot";

export type CarouselControlsProps = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick?: (i: number) => void;
  actionSlot?: React.ReactNode;
  dotStyle?: CarouselControlsDotStyle;
  canPrev?: boolean;
  canNext?: boolean;
  className?: string;
};

export function CarouselControls({
  index,
  total,
  onPrev,
  onNext,
  onDotClick,
  actionSlot,
  dotStyle = "dot",
  canPrev,
  canNext,
  className,
}: CarouselControlsProps) {
  const prevDisabled = canPrev !== undefined ? !canPrev : index <= 0;
  const nextDisabled = canNext !== undefined ? !canNext : index >= total - 1;

  return (
    <div className={cn("ui-carousel-controls flex items-center justify-between gap-5", className)}>
      <div className="flex flex-wrap items-center gap-4">{actionSlot}</div>
      <div className="flex shrink-0 items-center gap-4">
        {total > 1 && onDotClick && (
          <div className="hidden items-center gap-2 sm:flex">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to item ${i + 1}`}
                onClick={() => onDotClick(i)}
                className={cn(
                  "transition-all duration-300",
                  dotStyle === "line"
                    ? cn("h-[2px]", i === index ? "w-8 bg-foreground-200" : "w-5 bg-foreground-400 hover:bg-foreground-300")
                    : cn("rounded-full", i === index ? "h-2 w-2 bg-foreground-200" : "h-1.5 w-1.5 bg-foreground-400 hover:bg-foreground-300")
                )}
              />
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="secondary" size="2" iconOnly rounded onClick={onPrev} disabled={prevDisabled} aria-label="Previous">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button variant="secondary" size="2" iconOnly rounded onClick={onNext} disabled={nextDisabled} aria-label="Next">
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── CarouselNav ──────────────────────────────────────────────────────────────

export type CarouselNavProps = {
  ctaPrimary?: CarouselCta;
  ctaSecondary?: CarouselCta;
  actionSlot?: React.ReactNode;
  dotStyle?: "dot" | "line";
  showDots?: boolean;
  className?: string;
};

export function CarouselNav({
  ctaPrimary,
  ctaSecondary,
  actionSlot,
  dotStyle = "dot",
  showDots = true,
  className,
}: CarouselNavProps) {
  const { items, startIndex, setStartIndex, canSlide, maxStart, loop, goPrev, goNext } =
    useCarousel();

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

  const totalDots = loop ? items.length : maxStart + 1;

  return (
    <CarouselControls
      index={startIndex}
      total={showDots && canSlide ? totalDots : 0}
      onPrev={goPrev}
      onNext={goNext}
      onDotClick={(i) => setStartIndex(loop ? i % items.length : Math.min(i, maxStart))}
      canPrev={loop ? true : startIndex > 0}
      canNext={loop ? true : startIndex < maxStart}
      actionSlot={actions}
      dotStyle={dotStyle}
      className={cn("mt-10", className)}
    />
  );
}

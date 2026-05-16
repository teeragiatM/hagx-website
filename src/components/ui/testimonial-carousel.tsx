"use client";

import { CarouselControls } from "@/components/ui/CarouselControls";
import {
  MediaCardBody,
  MediaCardEyebrow,
  MediaCardTitle,
  MediaCardExcerpt,
} from '@/components/ui/MediaCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export type TestimonialCarouselItem = {
  client: string;
  project: string;
  scope: string;
  quote: string;
};

const VISIBLE_COUNT = 3;
const GAP_PX = 16;
// Large side buffer: transitionend fires only ONCE after the last queued rapid
// transition, so we need enough clones to stay valid across the whole burst.
const SIDE_BUFFER = 20;

type TestimonialContextValue = {
  items: TestimonialCarouselItem[];
  active: number;
  prev: () => void;
  next: () => void;
  trackItems: TestimonialCarouselItem[];
  position: number;
  transitionEnabled: boolean;
  visibleCount: number;
  cloneCount: number;
  handleTransitionEnd: () => void;
  slotWidth: number;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};

const TestimonialContext = createContext<TestimonialContextValue | null>(null);

function useTestimonialContext() {
  const ctx = useContext(TestimonialContext);
  if (!ctx)
    throw new Error(
      'TestimonialCarousel components must be used inside <TestimonialCarousel>.'
    );
  return ctx;
}

export type TestimonialCarouselProps = HTMLAttributes<HTMLDivElement> & {
  items: TestimonialCarouselItem[];
  autoPlay?: boolean;
  intervalMs?: number;
  autoPlayDirection?: 'next' | 'prev';
};

export function TestimonialCarousel({
  items,
  autoPlay = true,
  intervalMs = 5200,
  autoPlayDirection = 'next',
  className,
  children,
  ...props
}: TestimonialCarouselProps) {
  const visibleCount = VISIBLE_COUNT;
  // Fixed large buffer — independent of items.length so it never depletes.
  const cloneCount = SIDE_BUFFER;

  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(cloneCount);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slotWidth, setSlotWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  positionRef.current = position;

  // Measure the overflow viewport to derive pixel-perfect slot width
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = (w: number) => setSlotWidth((w + GAP_PX) / visibleCount);
    const ro = new ResizeObserver(([entry]) => update(entry.contentRect.width));
    ro.observe(el);
    update(el.offsetWidth);
    return () => ro.disconnect();
  }, [visibleCount]);

  const wrapIndex = useCallback(
    (i: number) => ((i % items.length) + items.length) % items.length,
    [items.length]
  );

  const prev = useCallback(() => {
    if (items.length <= 1) return;
    setTransitionEnabled(true);
    setPosition((p) => p - 1);
    setActive((a) => wrapIndex(a - 1));
  }, [items.length, wrapIndex]);

  const next = useCallback(() => {
    if (items.length <= 1) return;
    setTransitionEnabled(true);
    setPosition((p) => p + 1);
    setActive((a) => wrapIndex(a + 1));
  }, [items.length, wrapIndex]);

  const handleTransitionEnd = useCallback(() => {
    if (items.length <= visibleCount) return;
    const p = positionRef.current;
    // Modulo normalisation: always bring position back into [cloneCount, cloneCount+N-1]
    // regardless of how many rapid clicks accumulated before this event fired.
    const normalized =
      ((((p - cloneCount) % items.length) + items.length) % items.length) +
      cloneCount;
    if (normalized !== p) {
      setTransitionEnabled(false);
      setPosition(normalized);
    }
  }, [cloneCount, items.length, visibleCount]);

  // Double rAF: paint the instant-jump frame before re-enabling transition
  // so the loop reset is truly invisible to the user.
  useEffect(() => {
    if (transitionEnabled) return;
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [transitionEnabled]);

  // Reset when items change
  useEffect(() => {
    setActive((a) => wrapIndex(a));
    setTransitionEnabled(false);
    setPosition(cloneCount);
  }, [cloneCount, items.length, wrapIndex]);

  // Stable refs so the interval never captures a stale callback
  const prevRef = useRef(prev);
  const nextRef = useRef(next);
  prevRef.current = prev;
  nextRef.current = next;

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = window.setInterval(() => {
      autoPlayDirection === 'prev' ? prevRef.current() : nextRef.current();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayDirection, intervalMs, items.length]);

  const trackItems = useMemo(() => {
    if (items.length <= visibleCount) return items;
    // Generate circular clones so even cloneCount > items.length produces valid content.
    // clonesBefore: the SIDE_BUFFER items immediately *before* items[0] in the circle.
    const clonesBefore = Array.from(
      { length: cloneCount },
      (_, i) =>
        items[(((i - cloneCount) % items.length) + items.length) % items.length]
    );
    // clonesAfter: the SIDE_BUFFER items immediately *after* items[N-1] in the circle.
    const clonesAfter = Array.from(
      { length: cloneCount },
      (_, i) => items[i % items.length]
    );
    return [...clonesBefore, ...items, ...clonesAfter];
  }, [cloneCount, items, visibleCount]);

  const value = useMemo(
    () => ({
      items,
      active,
      prev,
      next,
      trackItems,
      position,
      transitionEnabled,
      visibleCount,
      cloneCount,
      handleTransitionEnd,
      slotWidth,
      viewportRef,
    }),
    [
      active,
      cloneCount,
      handleTransitionEnd,
      items,
      next,
      position,
      prev,
      slotWidth,
      trackItems,
      transitionEnabled,
      visibleCount,
    ]
  );

  if (items.length === 0) return null;

  return (
    <TestimonialContext.Provider value={value}>
      <div className={cn('ui-testimonial', className)} {...props}>
        {children}
      </div>
    </TestimonialContext.Provider>
  );
}

export type TestimonialContentProps = HTMLAttributes<HTMLDivElement> & {
  slideAnimation?: boolean;
  renderItem?: (
    item: TestimonialCarouselItem,
    index: number,
    isFocus: boolean
  ) => ReactNode;
};

export function TestimonialContent({
  className,
  slideAnimation = true,
  renderItem,
  ...props
}: TestimonialContentProps) {
  const {
    items,
    active,
    trackItems,
    position,
    transitionEnabled,
    visibleCount,
    cloneCount,
    handleTransitionEnd,
    slotWidth,
    viewportRef,
  } = useTestimonialContext();

  const useLoopTrack = slideAnimation && items.length > visibleCount;
  const displayItems = useLoopTrack ? trackItems : items;
  const hasMeasured = slotWidth > 0;

  // Pixel-perfect transform: each slot = cardWidth + gap, translate by N slots.
  // Falls back to percentage until the ResizeObserver fires.
  const trackStyle = useLoopTrack
    ? hasMeasured
      ? {
          display: 'flex' as const,
          gap: GAP_PX,
          width: displayItems.length * slotWidth - GAP_PX,
          transform: `translate3d(${-position * slotWidth}px, 0, 0)`,
          transition: transitionEnabled
            ? 'transform 640ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          willChange: 'transform' as const,
        }
      : {
          display: 'flex' as const,
          width: `${(displayItems.length / visibleCount) * 100}%`,
          transform: `translate3d(${-position * (100 / displayItems.length)}%, 0, 0)`,
          transition: transitionEnabled
            ? 'transform 640ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          willChange: 'transform' as const,
        }
    : undefined;

  return (
    <div ref={viewportRef} className="overflow-hidden" {...props}>
      <div
        onTransitionEnd={handleTransitionEnd}
        style={trackStyle}
        className={cn(
          useLoopTrack
            ? 'ui-testimonial-content items-stretch'
            : 'ui-testimonial-content grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3',
          className
        )}
      >
        {displayItems.map((item, index) => {
          const realIndex = useLoopTrack
            ? (index - cloneCount + items.length) % items.length
            : index;
          const isFocus = useLoopTrack
            ? realIndex === active
            : index === active;
          const itemKey = `${item.client}-${item.project}-${index}`;

          if (renderItem) {
            return <div key={itemKey}>{renderItem(item, index, isFocus)}</div>;
          }

          return (
            <div
              key={itemKey}
              style={
                useLoopTrack && hasMeasured
                  ? { width: slotWidth - GAP_PX, flexShrink: 0 }
                  : useLoopTrack
                    ? {
                        flexBasis: `${100 / displayItems.length}%`,
                        flexShrink: 0,
                        minWidth: 0,
                      }
                    : undefined
              }
            >
              <TestimonialCard item={item} index={index} isFocus={isFocus} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TestimonialCard({
  item,
  isFocus,
  className,
}: {
  item: TestimonialCarouselItem;
  index?: number;
  isFocus: boolean;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0.72 }}
      animate={{ opacity: isFocus ? 1 : 0.52 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'ui-testimonial-card relative flex h-full min-h-[420px] flex-col overflow-hidden border border-white/[0.07] bg-background-200',
        className
      )}
    >
      {/* radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 0%, rgba(219,88,40,0.12), transparent 62%)',
        }}
      />

      <MediaCardBody className="relative justify-between">
        {/* client badge */}
        <div>
          <div className="mb-5 inline-flex items-center border border-accent-500/30 px-4 py-2">
            <span className="text-base font-bold text-accent-500">
              {item.client}
            </span>
          </div>
          <MediaCardEyebrow>{item.scope}</MediaCardEyebrow>
          <MediaCardTitle className="mb-4 text-xl font-semibold group-hover:text-foreground-100">
            {item.project}
          </MediaCardTitle>
          <MediaCardExcerpt className="mb-0 line-clamp-none text-sm leading-7 text-foreground-300">
            {item.quote}
          </MediaCardExcerpt>
        </div>

        {/* footer line */}
        <div className="mt-8 flex items-center gap-2">
          <span className="h-0.5 w-6 bg-accent-500" />
          <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">
            {item.client}
          </span>
        </div>
      </MediaCardBody>
    </motion.article>
  );
}

export function TestimonialControls({ className }: { className?: string }) {
  const { items, active, prev, next } = useTestimonialContext();

  if (items.length <= 1) return null;

  return (
    <CarouselControls
      index={active}
      total={items.length}
      onPrev={prev}
      onNext={next}
      dotStyle="dot"
      canPrev
      canNext
      className={cn("mt-8 justify-center", className)}
    />
  );
}

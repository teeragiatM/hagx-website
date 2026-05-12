"use client";

import { CarouselControls } from "@/components/ui/CarouselControls";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
} from "react";

export type TestimonialCarouselItem = {
  client: string;
  project: string;
  scope: string;
  quote: string;
  bg?: string;
  accent?: string;
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
      "TestimonialCarousel components must be used inside <TestimonialCarousel>.",
    );
  return ctx;
}

export type TestimonialCarouselProps = HTMLAttributes<HTMLDivElement> & {
  items: TestimonialCarouselItem[];
  autoPlay?: boolean;
  intervalMs?: number;
  autoPlayDirection?: "next" | "prev";
};

export function TestimonialCarousel({
  items,
  autoPlay = true,
  intervalMs = 5200,
  autoPlayDirection = "next",
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
    const update = (w: number) =>
      setSlotWidth((w + GAP_PX) / visibleCount);
    const ro = new ResizeObserver(([entry]) =>
      update(entry.contentRect.width),
    );
    ro.observe(el);
    update(el.offsetWidth);
    return () => ro.disconnect();
  }, [visibleCount]);

  const wrapIndex = useCallback(
    (i: number) => ((i % items.length) + items.length) % items.length,
    [items.length],
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
      ((p - cloneCount) % items.length + items.length) % items.length +
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
      autoPlayDirection === "prev" ? prevRef.current() : nextRef.current();
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
        items[((i - cloneCount) % items.length + items.length) % items.length],
    );
    // clonesAfter: the SIDE_BUFFER items immediately *after* items[N-1] in the circle.
    const clonesAfter = Array.from(
      { length: cloneCount },
      (_, i) => items[i % items.length],
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
    ],
  );

  if (items.length === 0) return null;

  return (
    <TestimonialContext.Provider value={value}>
      <section
        className={cn(
          "ui-testimonial border-b border-white/[0.06] px-8 py-24 sm:px-14",
          className,
        )}
        {...props}
      >
        <div className="mx-auto max-w-[1500px]">{children}</div>
      </section>
    </TestimonialContext.Provider>
  );
}

export type TestimonialHeaderProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
};

export function TestimonialHeader({
  eyebrow,
  title,
  description,
  className,
  ...props
}: TestimonialHeaderProps) {
  return (
    <div
      className={cn(
        "ui-testimonial-header mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
      {...props}
    >
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-sm font-light leading-8 text-white/40 lg:text-right">
          {description}
        </p>
      )}
    </div>
  );
}

export type TestimonialContentProps = HTMLAttributes<HTMLDivElement> & {
  slideAnimation?: boolean;
  renderItem?: (
    item: TestimonialCarouselItem,
    index: number,
    isFocus: boolean,
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
          display: "flex" as const,
          gap: GAP_PX,
          width: displayItems.length * slotWidth - GAP_PX,
          transform: `translate3d(${-position * slotWidth}px, 0, 0)`,
          transition: transitionEnabled
            ? "transform 640ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
          willChange: "transform" as const,
        }
      : {
          display: "flex" as const,
          width: `${(displayItems.length / visibleCount) * 100}%`,
          transform: `translate3d(${-position * (100 / displayItems.length)}%, 0, 0)`,
          transition: transitionEnabled
            ? "transform 640ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
          willChange: "transform" as const,
        }
    : undefined;

  return (
    <div ref={viewportRef} className="overflow-hidden" {...props}>
      <div
        onTransitionEnd={handleTransitionEnd}
        style={trackStyle}
        className={cn(
          useLoopTrack
            ? "ui-testimonial-content items-stretch"
            : "ui-testimonial-content grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3",
          className,
        )}
      >
        {displayItems.map((item, index) => {
          const realIndex = useLoopTrack
            ? (index - cloneCount + items.length) % items.length
            : index;
          const isFocus = useLoopTrack
            ? realIndex === active
            : index === active;

          return renderItem ? (
            renderItem(item, index, isFocus)
          ) : (
            <div
              key={`${item.client}-${item.project}-${index}`}
              style={
                useLoopTrack && hasMeasured
                  ? { width: slotWidth - GAP_PX, flexShrink: 0 }
                  : useLoopTrack
                    ? { flexBasis: `${100 / displayItems.length}%`, flexShrink: 0, minWidth: 0 }
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
  index,
  isFocus,
  className,
}: {
  item: TestimonialCarouselItem;
  index: number;
  isFocus: boolean;
  className?: string;
}) {
  const accent = item.accent ?? "#DB5828";

  return (
    <motion.article
      initial={{ opacity: 0.72 }}
      animate={{ opacity: isFocus ? 1 : 0.52 }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "ui-testimonial-card relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden p-8",
        className,
      )}
      style={{ backgroundColor: item.bg ?? "#0c0c0c" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 80% 0%, ${accent}24, transparent 62%)`,
        }}
      />
      <div className="relative">
        <div
          className="mb-6 inline-flex items-center justify-center border px-4 py-2"
          style={{ borderColor: `${accent}55` }}
        >
          <span className="text-lg font-bold" style={{ color: accent }}>
            {item.client}
          </span>
        </div>
        <p
          className="mb-3 text-[10px] font-light uppercase tracking-widest"
          style={{ color: `${accent}aa` }}
        >
          {item.scope}
        </p>
        <h3 className="mb-6 text-xl font-semibold leading-tight text-white">
          {item.project}
        </h3>
        <p className="text-sm font-light leading-7 text-white/62">
          {item.quote}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-2">
        <span className="h-0.5 w-6" style={{ backgroundColor: accent }} />
        <span className="text-[10px] font-light uppercase tracking-widest text-white/32">
          {item.client}
        </span>
      </div>
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

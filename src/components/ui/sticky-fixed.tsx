"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type StickyFixedMode = "vertical" | "horizontal" | "stack";
export type StickyFixedPinnedSide = "left" | "right";
export type StickyFixedDirection = "rtl" | "ltr";

export type StickyFixedItem = { id: string };


type RenderCtx<TItem extends StickyFixedItem> = {
  activeItem: TItem;
  activeIndex: number;
  items: TItem[];
};

type RenderFn<TItem extends StickyFixedItem> = (ctx: RenderCtx<TItem>) => ReactNode;

// ── Context ───────────────────────────────────────────────────────────────────

type StickyFixedCtxValue = {
  mode: StickyFixedMode;
  pinnedSide: StickyFixedPinnedSide;
  items: StickyFixedItem[];
  activeIndex: number;
  activeItem: StickyFixedItem;
  setActiveIndex: (i: number) => void;
  // horizontal
  x: MotionValue<number> | null;
  registerViewport: ((el: HTMLDivElement | null) => void) | null;
  registerTrack: ((el: HTMLDivElement | null) => void) | null;
  // stack
  stackOffset: number;
  stickyTopOffset: number;
};

const StickyFixedCtx = createContext<StickyFixedCtxValue | null>(null);

function useStickyFixedCtx() {
  const ctx = useContext(StickyFixedCtx);
  if (!ctx) throw new Error("StickyFixed sub-components must be used inside <StickyFixed>");
  return ctx;
}

export function useStickyFixed<TItem extends StickyFixedItem = StickyFixedItem>() {
  return useStickyFixedCtx() as unknown as StickyFixedCtxValue & {
    items: TItem[];
    activeItem: TItem;
  };
}

// ── Root ──────────────────────────────────────────────────────────────────────

export type StickyFixedProps<TItem extends StickyFixedItem> = {
  mode?: StickyFixedMode;
  items: TItem[];
  pinnedSide?: StickyFixedPinnedSide;
  /** horizontal — scroll direction */
  direction?: StickyFixedDirection;
  /** horizontal — CSS top for sticky wrapper */
  top?: string | number;
  /** horizontal — className for the inner sticky wrapper */
  stickyClassName?: string;
  /** stack — px gap between stacked tops */
  stackOffset?: number;
  /** stack — px from viewport top for first sticky item */
  stickyTopOffset?: number;
  id?: string;
  className?: string;
  children: ReactNode;
};

function StickyFixedRoot<TItem extends StickyFixedItem>({
  mode = "vertical",
  items,
  pinnedSide = "left",
  direction = "rtl",
  top = "var(--header-height, 0px)",
  stickyClassName,
  stackOffset = 64,
  stickyTopOffset = 104,
  id,
  className,
  children,
}: StickyFixedProps<TItem>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = (items[activeIndex] ?? items[0]) as StickyFixedItem;

  // Horizontal scroll engine — refs always created, only used when mode="horizontal"
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "ltr" ? [-scrollDistance, 0] : [0, -scrollDistance]
  );

  const measure = useCallback(() => {
    if (mode !== "horizontal") return;
    const vw = viewportRef.current?.clientWidth ?? 0;
    const tw = trackRef.current?.scrollWidth ?? 0;
    setScrollDistance(Math.max(tw - vw, 0));
  }, [mode]);

  useEffect(() => {
    if (mode !== "horizontal") return;
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [measure, mode]);

  const registerViewport = useCallback((el: HTMLDivElement | null) => {
    viewportRef.current = el; measure();
  }, [measure]);

  const registerTrack = useCallback((el: HTMLDivElement | null) => {
    trackRef.current = el; measure();
  }, [measure]);

  const ctx = useMemo<StickyFixedCtxValue>(() => ({
    mode,
    pinnedSide,
    items: items as StickyFixedItem[],
    activeIndex,
    activeItem,
    setActiveIndex,
    x: mode === "horizontal" ? x : null,
    registerViewport: mode === "horizontal" ? registerViewport : null,
    registerTrack: mode === "horizontal" ? registerTrack : null,
    stackOffset,
    stickyTopOffset,
  }), [mode, pinnedSide, items, activeIndex, activeItem, x, registerViewport, registerTrack, stackOffset, stickyTopOffset]);

  // ── horizontal ──────────────────────────────────────────────────────────────
  if (mode === "horizontal") {
    return (
      <StickyFixedCtx.Provider value={ctx}>
        <div
          ref={rootRef}
          className={cn("ui-sticky-fixed ui-sticky-fixed--h", className)}
          style={{ minHeight: `calc(100vh + ${scrollDistance}px)` }}
        >
          <div
            className={cn(
              "sticky flex h-screen w-full pt-0 pb-0 sm:pt-12 sm:pb-24 lg:pt-24 lg:pb-32 mx-auto flex-col overflow-hidden",
              stickyClassName
            )}
            style={{ top }}
          >
            {children}
          </div>
        </div>
      </StickyFixedCtx.Provider>
    );
  }

  // ── stack ───────────────────────────────────────────────────────────────────
  if (mode === "stack") {
    return (
      <StickyFixedCtx.Provider value={ctx}>
        <section id={id} ref={rootRef} className={cn("ui-sticky-fixed ui-sticky-fixed--s relative", className)}>
          <div className="mx-auto">{children}</div>
        </section>
      </StickyFixedCtx.Provider>
    );
  }

  // ── vertical ────────────────────────────────────────────────────────────────
  return (
    <StickyFixedCtx.Provider value={ctx}>
      <section id={id} ref={rootRef} className={cn("ui-sticky-fixed ui-sticky-fixed--v relative", className)}>
        <div className="mx-auto grid lg:grid-cols-2">{children}</div>
      </section>
    </StickyFixedCtx.Provider>
  );
}

// ── Pin ───────────────────────────────────────────────────────────────────────
// vertical  → sticky column (left or right)
// horizontal → top slot inside sticky wrapper
// stack     → plain header div before the track

export type StickyFixedPinProps<TItem extends StickyFixedItem> = {
  className?: string;
  children: ReactNode | RenderFn<TItem>;
};

function StickyFixedPin<TItem extends StickyFixedItem>({ className, children }: StickyFixedPinProps<TItem>) {
  const ctx = useStickyFixedCtx();
  const content = typeof children === "function"
    ? (children as RenderFn<TItem>)({
        activeItem: ctx.activeItem as TItem,
        activeIndex: ctx.activeIndex,
        items: ctx.items as TItem[],
      })
    : children;

  if (ctx.mode === "horizontal") {
    return <div className={cn("ui-sticky-fixed-pin", className)}>{content}</div>;
  }

  if (ctx.mode === "stack") {
    return (
      <div className={cn("ui-sticky-fixed-pin mb-14 lg:mb-20", className)}>{content}</div>
    );
  }

  // vertical
  const first = ctx.pinnedSide === "left";
  return (
    <div
      className={cn(
        "ui-sticky-fixed-pin mx-auto flex px-(--homepage-padding-inset) sm:pt-12 sm:pb-24",
        "lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:pt-24 lg:pb-32",
        first ? "lg:order-1" : "lg:order-2",
        className
      )}
    >
      <div className="flex flex-col gap-5">{content}</div>
    </div>
  );
}

// ── Nav + NavItem (vertical — activeIndex tab navigation) ─────────────────────

export type StickyFixedNavProps = { className?: string; children: ReactNode };

function StickyFixedNav({ className, children }: StickyFixedNavProps) {
  return (
    <nav data-slot="sticky-nav" >
      <div className={cn("flex flex-wrap gap-2", className)}>
              {children}
      </div>
    </nav>
  );
}

export type StickyFixedNavItemProps = { index: number; className?: string; children: ReactNode };

function StickyFixedNavItem({ index, className, children }: StickyFixedNavItemProps) {
  const ctx = useStickyFixedCtx();
  const isActive = index === ctx.activeIndex;
  const itemId = ctx.items[index]?.id;

  return (
    <button
      type="button"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => {
        ctx.setActiveIndex(index);
        if (itemId) document.getElementById(itemId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className={cn(
        "ui-sticky-fixed-nav-item inline-flex items-center gap-2 text-xs",
        "text-foreground-300 hover:text-foreground-100 data-[state=active]:text-foreground-100",
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Track ─────────────────────────────────────────────────────────────────────
// vertical    → scrolling column
// horizontal  → motion.div translating on x
// stack       → content wrapper with bottom padding for scroll room

export type StickyFixedTrackProps<TItem extends StickyFixedItem> = {
  className?: string;
  itemClassName?: string;
  /** stack only — extra space below last card so it can scroll off */
  bottomSpace?: string;
  children?: ReactNode;
  renderItem?: (item: TItem, index: number, all: TItem[]) => ReactNode;
};

function StickyFixedTrack<TItem extends StickyFixedItem>({
  className,
  itemClassName,
  bottomSpace = "28vh",
  children,
  renderItem,
}: StickyFixedTrackProps<TItem>) {
  const ctx = useStickyFixedCtx();

  if (ctx.mode === "horizontal") {
    return (
      <div ref={ctx.registerViewport} className={cn("flex-1 overflow-hidden", className)}>
        <motion.div
          ref={ctx.registerTrack as React.Ref<HTMLDivElement>}
          style={{ x: ctx.x ?? undefined }}
          className="flex h-full w-max items-stretch gap-5 sm:gap-7 lg:gap-8"
        >
          {renderItem
            ? (ctx.items as TItem[]).map((item, i) => (
                <div key={item.id} className={cn("relative flex shrink-0", itemClassName)}>
                  {renderItem(item, i, ctx.items as TItem[])}
                </div>
              ))
            : children}
        </motion.div>
      </div>
    );
  }

  if (ctx.mode === "stack") {
    return (
      <div
        className={cn("ui-sticky-fixed-track w-full space-y-8", className)}
        style={{ paddingBottom: bottomSpace }}
      >
        {children}
      </div>
    );
  }

  // vertical
  const first = ctx.pinnedSide === "left";
  return (
    <div className={cn("ui-sticky-fixed-track relative", first ? "lg:order-2" : "lg:order-1", className)}>
      {children}
    </div>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────
// vertical → min-h-screen + IntersectionObserver triggers activeIndex
// stack    → position:sticky with increasing top offset, whileInView fade-in

export type StickyFixedItemProps<TItem extends StickyFixedItem> = {
  index: number;
  item?: TItem;
  className?: string;
  children: ReactNode | RenderFn<TItem>;
};

function StickyFixedItem<TItem extends StickyFixedItem>({
  index,
  item,
  className,
  children,
}: StickyFixedItemProps<TItem>) {
  const ctx = useStickyFixedCtx();
  const resolvedItem = (item ?? ctx.items[index]) as TItem;
  const content = typeof children === "function"
    ? (children as RenderFn<TItem>)({
        activeItem: ctx.activeItem as TItem,
        activeIndex: ctx.activeIndex,
        items: ctx.items as TItem[],
      })
    : children;

  if (ctx.mode === "stack") {
    const stackStyle: CSSProperties = {
      top: ctx.stickyTopOffset + index * ctx.stackOffset,
      zIndex: 10 + index,
    };
    return (
      <motion.div
        id={resolvedItem?.id}
        initial={{ opacity: 0.82, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.45 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn("ui-sticky-fixed-item sticky", className)}
        style={stackStyle}
      >
        {content}
      </motion.div>
    );
  }

  // vertical
  return (
    <motion.article
      id={resolvedItem?.id}
      onViewportEnter={() => ctx.setActiveIndex(index)}
      viewport={{ amount: 0.55 }}
      className={cn(
        "ui-sticky-fixed-item mx-auto flex items-center px-(--homepage-padding-inset)",
        "sm:pt-12 sm:pb-24 lg:min-h-screen lg:pt-24 lg:pb-32",
        className
      )}
    >
      <div className="h-full w-full flex-1">{content}</div>
    </motion.article>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const StickyFixed = Object.assign(StickyFixedRoot, {
  Pin: StickyFixedPin,
  Nav: StickyFixedNav,
  NavItem: StickyFixedNavItem,
  Track: StickyFixedTrack,
  Item: StickyFixedItem,
});

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type StickySplitItemBase = {
  id: string;
};

type StickySplitContextValue<TItem extends StickySplitItemBase = StickySplitItemBase> = {
  items: TItem[];
  activeIndex: number;
  activeItem: TItem;
  pinnedSide: "left" | "right";
  setActiveIndex: (index: number) => void;
};

const StickySplitContext =
  createContext<StickySplitContextValue<StickySplitItemBase> | null>(null);

function useStickySplitContext() {
  const context = useContext(StickySplitContext);
  if (!context) {
    throw new Error("StickySplit components must be used inside <StickySplit>.");
  }
  return context;
}

export type StickySplitProps<TItem extends StickySplitItemBase> =
  Omit<HTMLAttributes<HTMLElement>, "children"> & {
    items: TItem[];
    pinnedSide?: "left" | "right";
    children: ReactNode;
  };

export function StickySplit<TItem extends StickySplitItemBase>({
  id,
  items,
  pinnedSide = "left",
  className,
  children,
  ...props
}: StickySplitProps<TItem>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  const context = useMemo(
    () => ({
      items,
      activeIndex,
      activeItem,
      pinnedSide,
      setActiveIndex,
    }),
    [activeIndex, activeItem, items, pinnedSide],
  );

  return (
    <StickySplitContext.Provider
      value={context as StickySplitContextValue<StickySplitItemBase>}
    >
      <section
        id={id}
        className={cn(
          "ui-sticky-split relative border-y border-white/[0.06] bg-[#080808]",
          className,
        )}
        {...props}
      >
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[49%_51%]">
          {children}
        </div>
      </section>
    </StickySplitContext.Provider>
  );
}

export type StickySplitRenderContext<
  TItem extends StickySplitItemBase = StickySplitItemBase,
> = StickySplitContextValue<TItem>;

type RenderableChildren<TItem extends StickySplitItemBase = StickySplitItemBase> =
  | ReactNode
  | ((context: StickySplitRenderContext<TItem>) => ReactNode);

function renderChildren<TItem extends StickySplitItemBase>(
  children: RenderableChildren<TItem>,
  context: StickySplitContextValue<StickySplitItemBase>,
) {
  return typeof children === "function"
    ? children(context as StickySplitRenderContext<TItem>)
    : children;
}

export type StickySplitPinnedProps<TItem extends StickySplitItemBase> =
  Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    children: RenderableChildren<TItem>;
  };

export function StickySplitPinned<TItem extends StickySplitItemBase>({
  className,
  children,
  ...props
}: StickySplitPinnedProps<TItem>) {
  const context = useStickySplitContext();
  const pinnedFirst = context.pinnedSide === "left";

  return (
    <div
      className={cn(
          "ui-sticky-split-pinned border-white/[0.06] px-[var(--site-inline-px)] py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center",
        pinnedFirst ? "lg:order-1 lg:border-r" : "lg:order-2 lg:border-l",
        className,
      )}
      {...props}
    >
      {renderChildren(children, context)}
    </div>
  );
}

export type StickySplitNavProps<TItem extends StickySplitItemBase> =
  Omit<HTMLAttributes<HTMLElement>, "children"> & {
    children: RenderableChildren<TItem>;
  };

export function StickySplitNav<TItem extends StickySplitItemBase>({
  className,
  children,
  ...props
}: StickySplitNavProps<TItem>) {
  const context = useStickySplitContext();

  return (
    <nav
      className={cn("ui-sticky-split-nav mb-12 flex flex-wrap gap-x-10 gap-y-5", className)}
      {...props}
    >
      {renderChildren(children, context)}
    </nav>
  );
}

export type StickySplitNavItemProps =
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> & {
    index: number;
    targetId?: string;
    children: ReactNode;
  };

export function StickySplitNavItem({
  index,
  targetId,
  className,
  children,
  ...props
}: StickySplitNavItemProps) {
  const context = useStickySplitContext();
  const isActive = index === context.activeIndex;
  const id = targetId ?? context.items[index]?.id;

  return (
    <button
      type="button"
      onClick={() => {
        context.setActiveIndex(index);
        if (id) {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }}
      className={cn(
        "ui-sticky-split-nav-item group inline-flex items-center gap-4 text-base font-light transition-colors sm:text-lg",
        isActive ? "text-[#DB5828]" : "text-white/38 hover:text-white/70",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "h-0 w-0 border-y-[7px] border-l-[9px] border-y-transparent drop-shadow-[0_0_10px_rgba(255,138,0,0.8)] transition-colors",
          isActive ? "border-l-[#DB5828]" : "border-l-[#DB5828]/70",
        )}
        aria-hidden="true"
      />
      {children}
    </button>
  );
}

export type StickySplitContentProps = HTMLAttributes<HTMLDivElement>;

export function StickySplitContent({
  className,
  children,
  ...props
}: StickySplitContentProps) {
  const context = useStickySplitContext();
  const pinnedFirst = context.pinnedSide === "left";

  return (
    <div
      className={cn(
        "ui-sticky-split-content relative",
        pinnedFirst ? "lg:order-2" : "lg:order-1",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute top-0 z-20 hidden h-full w-px bg-[#DB5828]/80 lg:block",
          pinnedFirst ? "left-0" : "right-0",
        )}
      />
      {children}
    </div>
  );
}

export type StickySplitItemProps<TItem extends StickySplitItemBase> =
  {
    id?: string;
    className?: string;
    index: number;
    item?: TItem;
    children: RenderableChildren<TItem>;
  };

export function StickySplitItem<TItem extends StickySplitItemBase>({
  id,
  index,
  item,
  className,
  children,
}: StickySplitItemProps<TItem>) {
  const context = useStickySplitContext();

  return (
    <motion.article
      id={id ?? item?.id ?? context.items[index]?.id}
      onViewportEnter={() => context.setActiveIndex(index)}
      viewport={{ amount: 0.55 }}
      className={cn(
        "ui-sticky-split-item flex min-h-screen items-center px-[var(--site-inline-px)] py-20 lg:px-[calc(var(--site-inline-px)*1.35)]",
        className,
      )}
    >
      {renderChildren(children, context)}
    </motion.article>
  );
}

export function useStickySplit() {
  return useStickySplitContext();
}

// ── Convenience composite ─────────────────────────────────────────────────────

export type StickySplitSectionProps<TItem extends StickySplitItemBase> = {
  id?: string;
  items: TItem[];
  pinnedSide?: "left" | "right";
  ariaLabel?: string;
  className?: string;
  pinnedClassName?: string;
  contentClassName?: string;
  renderPinned: (context: StickySplitRenderContext<TItem>) => ReactNode;
  renderPinnedFooter?: (context: StickySplitRenderContext<TItem>) => ReactNode;
  renderNavLabel: (item: TItem, index: number) => ReactNode;
  renderItem: (item: TItem, index: number, context: StickySplitRenderContext<TItem>) => ReactNode;
};

export function StickySplitSection<TItem extends StickySplitItemBase>({
  id,
  items,
  pinnedSide = "left",
  ariaLabel = "Section navigation",
  className,
  pinnedClassName,
  contentClassName,
  renderPinned,
  renderPinnedFooter,
  renderNavLabel,
  renderItem,
}: StickySplitSectionProps<TItem>) {
  return (
    <StickySplit id={id} items={items} pinnedSide={pinnedSide} className={className}>
      <StickySplitPinned<TItem> className={pinnedClassName}>
        {(context) => (
          <>
            {renderPinned(context)}
            <StickySplitNav aria-label={ariaLabel}>
              {items.map((item, index) => (
                <StickySplitNavItem key={item.id} index={index}>
                  {renderNavLabel(item, index)}
                </StickySplitNavItem>
              ))}
            </StickySplitNav>
            {renderPinnedFooter?.(context)}
          </>
        )}
      </StickySplitPinned>
      <StickySplitContent className={contentClassName}>
        {items.map((item, index) => (
          <StickySplitItem<TItem> key={item.id} index={index} item={item}>
            {(context) => renderItem(item, index, context)}
          </StickySplitItem>
        ))}
      </StickySplitContent>
    </StickySplit>
  );
}

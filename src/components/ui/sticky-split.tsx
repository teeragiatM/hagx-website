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

type StickySplitContextValue<
  TItem extends StickySplitItemBase = StickySplitItemBase,
> = {
  items: TItem[];
  activeIndex: number;
  activeItem: TItem;
  pinnedSide: "left" | "right";
  setActiveIndex: (index: number) => void;
  innerClassName?: string;
};

const StickySplitContext =
  createContext<StickySplitContextValue<StickySplitItemBase> | null>(null);

function useStickySplitContext() {
  const context = useContext(StickySplitContext);
  if (!context) {
    throw new Error(
      "StickySplit components must be used inside <StickySplit>.",
    );
  }
  return context;
}

export type StickySplitProps<TItem extends StickySplitItemBase> = Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> & {
  items: TItem[];
  pinnedSide?: "left" | "right";
  as?: React.ElementType;
  /** Class applied to the inner content wrapper inside each column (pinned + items) */
  innerClassName?: string;
  children: ReactNode;
};

export function StickySplit<TItem extends StickySplitItemBase>({
  id,
  items,
  pinnedSide = "left",
  as: Component = "div",
  className,
  innerClassName,
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
      innerClassName,
    }),
    [activeIndex, activeItem, innerClassName, items, pinnedSide],
  );

  return (
    <StickySplitContext.Provider
      value={context as StickySplitContextValue<StickySplitItemBase>}
    >
      <Component
        id={id}
        className={cn("ui-sticky-split relative", className)}
        {...props}
      >
        <div className="mx-auto grid lg:grid-cols-2">{children}</div>
      </Component>
    </StickySplitContext.Provider>
  );
}

export type StickySplitRenderContext<
  TItem extends StickySplitItemBase = StickySplitItemBase,
> = StickySplitContextValue<TItem>;

type RenderableChildren<
  TItem extends StickySplitItemBase = StickySplitItemBase,
> = ReactNode | ((context: StickySplitRenderContext<TItem>) => ReactNode);

function renderChildren<TItem extends StickySplitItemBase>(
  children: RenderableChildren<TItem>,
  context: StickySplitContextValue<StickySplitItemBase>,
) {
  return typeof children === "function"
    ? children(context as StickySplitRenderContext<TItem>)
    : children;
}

export type StickySplitPinnedProps<TItem extends StickySplitItemBase> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
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
        "ui-sticky-split-pinned ui-padding ui-margin lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col",
        pinnedFirst ? "lg:order-1" : "lg:order-2",
        className,
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-5", context.innerClassName)}>
        {renderChildren(children, context)}
      </div>
    </div>
  );
}

export type StickySplitNavProps<TItem extends StickySplitItemBase> = Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> & {
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
      className={cn(
        "ui-sticky-split-nav flex flex-wrap gap-x-2 gap-y-1",
        className,
      )}
      {...props}
    >
      {renderChildren(children, context)}
    </nav>
  );
}

export type StickySplitNavItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "type"
> & {
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
          "pointer-events-none absolute top-0 z-20 hidden h-full w-px lg:block",
          pinnedFirst ? "left-0" : "right-0",
        )}
      />
      {children}
    </div>
  );
}

export type StickySplitItemProps<TItem extends StickySplitItemBase> = {
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
        "flex min-h-screen items-center ui-padding ui-margin",
        className,
      )}
    >
      <div className={cn("w-full", context.innerClassName)}>
        {renderChildren(children, context)}
      </div>
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
  renderItem: (
    item: TItem,
    index: number,
    context: StickySplitRenderContext<TItem>,
  ) => ReactNode;
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
    <StickySplit
      id={id}
      items={items}
      pinnedSide={pinnedSide}
      className={className}
    >
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

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  createContext,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type ScrollStackContextValue = {
  itemCount: number;
  stackDirection: "vertical" | "horizontal";
  stackOffset: number;
  stickyOffset: number;
};

const ScrollStackContext = createContext<ScrollStackContextValue | null>(null);

function useScrollStackContext() {
  const context = useContext(ScrollStackContext);
  if (!context) {
    throw new Error(
      "ScrollStack components must be used inside <ScrollStack>.",
    );
  }
  return context;
}

export type ScrollStackProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  itemCount: number;
  stackDirection?: "vertical" | "horizontal";
  stackOffset?: number;
  stickyOffset?: number;
};

export function ScrollStack({
  itemCount,
  stackDirection = 'vertical',
  stackOffset = 18,
  stickyOffset = 104,
  className,
  children,
  ...props
}: ScrollStackProps) {
  return (
    <ScrollStackContext.Provider
      value={{ itemCount, stackDirection, stackOffset, stickyOffset }}
    >
      <section
        data-slot="value-stack"
        className={cn('ui-scroll-stack relative', className)}
        {...props}
      >
        <div className="mx-auto">{children}</div>
      </section>
    </ScrollStackContext.Provider>
  );
}

export type ScrollStackHeaderProps = HTMLAttributes<HTMLDivElement>;

export function ScrollStackHeader({
  className,
  children,
  ...props
}: ScrollStackHeaderProps) {
  return (
    <div
      className={cn('ui-scroll-stack-header mb-14 lg:mb-20', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export type ScrollStackContentProps = HTMLAttributes<HTMLDivElement> & {
  bottomSpace?: string;
};

export function ScrollStackContent({
  bottomSpace = '28vh',
  className,
  style,
  ...props
}: ScrollStackContentProps) {
  return (
    <div
      className={cn('ui-scroll-stack-content w-full space-y-8', className)}
      style={{ paddingBottom: bottomSpace, ...style }}
      {...props}
    />
  );
}

export type ScrollStackItemProps = Omit<
  HTMLAttributes<HTMLElement>,
  'children'
> & {
  index: number;
  children: ReactNode;
};

export function ScrollStackItem({
  index,
  className,
  children,
  style,
}: ScrollStackItemProps) {
  const { itemCount, stackDirection, stackOffset, stickyOffset } =
    useScrollStackContext();
  const isHorizontal = stackDirection === 'horizontal';

  const stackStyle: CSSProperties = isHorizontal
    ? {
        top: stickyOffset,
        zIndex: 10 + index,
        marginInlineStart: index * stackOffset,
        marginInlineEnd: (itemCount - index - 1) * stackOffset,
      }
    : {
        top: stickyOffset + index * stackOffset,
        zIndex: 10 + index,
      };

  return (
    <motion.article
      initial={{
        opacity: 0.82,
        x: isHorizontal ? 34 : 0,
        y: isHorizontal ? 0 : 34,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ amount: 0.45 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'ui-scroll-stack-item sticky overflow-hidden border border-white/[0.08] bg-[#0c0a08] shadow-[0_30px_90px_rgba(0,0,0,0.38)]',
        className
      )}
      style={{ ...stackStyle, ...style }}
    >
      {children}
    </motion.article>
  );
}

export function useScrollStack() {
  return useScrollStackContext();
}

// ── Convenience composite ─────────────────────────────────────────────────────

export type ScrollStackDataItem = {
  id: string;
  number?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  secondarySubtitle?: ReactNode;
  secondaryDescription?: ReactNode;
  icon?: ReactNode;
};

export type ScrollStackSectionProps = Omit<ScrollStackProps, 'itemCount'> & {
  header?: ReactNode;
  items: ScrollStackDataItem[];
  bottomSpace?: string;
  renderItem?: (
    item: ScrollStackDataItem,
    index: number,
    items: ScrollStackDataItem[]
  ) => ReactNode;
};

export function ScrollStackSection({
  header,
  items,
  bottomSpace = '28vh',
  renderItem,
  stackDirection = 'vertical',
  stackOffset = 64,
  stickyOffset = 104,
  className,
  ...props
}: ScrollStackSectionProps) {
  return (
    <ScrollStack
      itemCount={items.length}
      stackDirection={stackDirection}
      stackOffset={stackOffset}
      stickyOffset={stickyOffset}
      className={className}
      {...props}
    >
      {header && <ScrollStackHeader>{header}</ScrollStackHeader>}
      <ScrollStackContent bottomSpace={bottomSpace}>
        {items.map((item, index) => (
          <ScrollStackItem key={item.id} index={index}>
            {renderItem ? (
              renderItem(item, index, items)
            ) : (
              <DefaultStackCard item={item} total={items.length} />
            )}
          </ScrollStackItem>
        ))}
      </ScrollStackContent>
    </ScrollStack>
  );
}

function DefaultStackCard({
  item,
  total,
}: {
  item: ScrollStackDataItem;
  total: number;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_18%_0%,rgba(255,138,0,0.16),transparent_58%)]" />
      <div className="relative grid min-h-[420px] gap-8 p-8 sm:p-10 lg:grid-cols-[220px_1fr] lg:p-12 xl:p-14">
        <div className="flex flex-col justify-between border-white/[0.08] lg:border-r lg:pr-8">
          <div>
            {item.number && (
              <p className="text-[10px] font-light tracking-widest text-accent-500 uppercase">
                {item.number} / {String(total).padStart(2, '0')}
              </p>
            )}
            {item.icon && (
              <div className="mt-8 text-accent-500">{item.icon}</div>
            )}
          </div>
          {item.number && (
            <p className="mt-10 text-7xl leading-none font-light text-foreground-400 sm:text-8xl">
              {item.number}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="max-w-5xl text-3xl font-bold tracking-tight text-foreground-100 sm:text-4xl lg:text-5xl">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="mt-6 max-w-4xl text-lg leading-8 font-light text-foreground-200">
              {item.subtitle}
            </p>
          )}
          {item.description && (
            <p className="mt-4 max-w-4xl text-sm leading-8 font-light text-foreground-300">
              {item.description}
            </p>
          )}
          {item.secondarySubtitle && (
            <p className="mt-7 max-w-4xl text-sm leading-7 font-light text-foreground-400">
              {item.secondarySubtitle}
            </p>
          )}
          {item.secondaryDescription && (
            <p className="mt-2 max-w-4xl text-xs leading-7 font-light text-foreground-400">
              {item.secondaryDescription}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

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
  stackDirection = "vertical",
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
        className={cn(
          "ui-scroll-stack relative border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28",
          className,
        )}
        {...props}
      >
        <div className="mx-auto max-w-[1500px]">{children}</div>
      </section>
    </ScrollStackContext.Provider>
  );
}

export type ScrollStackHeaderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
};

export function ScrollStackHeader({
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: ScrollStackHeaderProps) {
  return (
    <div
      className={cn(
        "ui-scroll-stack-header mb-14 max-w-4xl lg:mb-20",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          {eyebrow && <p className="sh-eyebrow mb-5">{eyebrow}</p>}
          {title && (
            <h2 className="ui-Section-Heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="section-header-description ml-0 mt-6 max-w-2xl text-left text-white/45 lg:ml-0 lg:pt-0 lg:text-left">
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export type ScrollStackContentProps = HTMLAttributes<HTMLDivElement> & {
  bottomSpace?: string;
};

export function ScrollStackContent({
  bottomSpace = "28vh",
  className,
  style,
  ...props
}: ScrollStackContentProps) {
  return (
    <div
      className={cn("ui-scroll-stack-content w-full space-y-8", className)}
      style={{ paddingBottom: bottomSpace, ...style }}
      {...props}
    />
  );
}

export type ScrollStackItemProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children"
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
  const isHorizontal = stackDirection === "horizontal";

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
        "ui-scroll-stack-item sticky overflow-hidden border border-white/[0.08] bg-[#0c0a08] shadow-[0_30px_90px_rgba(0,0,0,0.38)]",
        className,
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

export type ScrollStackSectionProps = Omit<ScrollStackProps, "itemCount"> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  items: ScrollStackDataItem[];
  bottomSpace?: string;
  renderItem?: (
    item: ScrollStackDataItem,
    index: number,
    items: ScrollStackDataItem[],
  ) => ReactNode;
};

export function ScrollStackSection({
  eyebrow,
  title,
  description,
  items,
  bottomSpace = "28vh",
  renderItem,
  stackDirection = "vertical",
  stackOffset = 18,
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
      <ScrollStackHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
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
              <p className="text-[10px] font-light uppercase tracking-widest text-[#E15F31]">
                {item.number} / {String(total).padStart(2, "0")}
              </p>
            )}
            {item.icon && (
              <div className="mt-8 text-[#E15F31]">{item.icon}</div>
            )}
          </div>
          {item.number && (
            <p className="mt-10 text-7xl font-light leading-none text-white/[0.04] sm:text-8xl">
              {item.number}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="max-w-5xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="mt-6 max-w-4xl text-lg font-light leading-8 text-white/70">
              {item.subtitle}
            </p>
          )}
          {item.description && (
            <p className="mt-4 max-w-4xl text-sm font-light leading-8 text-white/48">
              {item.description}
            </p>
          )}
          {item.secondarySubtitle && (
            <p className="mt-7 max-w-4xl text-sm font-light leading-7 text-white/40">
              {item.secondarySubtitle}
            </p>
          )}
          {item.secondaryDescription && (
            <p className="mt-2 max-w-4xl text-xs font-light leading-7 text-white/30">
              {item.secondaryDescription}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

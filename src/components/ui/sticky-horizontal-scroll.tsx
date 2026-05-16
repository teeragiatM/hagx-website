"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type StickyHorizontalScrollDirection = "right-to-left" | "left-to-right";

export type StickyHorizontalScrollItem = {
  id: string;
  number?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
};

export type StickyHorizontalScrollSectionProps = Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> & {
  header?: ReactNode;
  items: StickyHorizontalScrollItem[];
  direction?: StickyHorizontalScrollDirection;
  stickyOffset?: number;
  renderItem?: (
    item: StickyHorizontalScrollItem,
    index: number,
    items: StickyHorizontalScrollItem[],
  ) => ReactNode;
};

export function StickyHorizontalScrollSection({
  header,
  items,
  direction = "right-to-left",
  stickyOffset = 0,
  renderItem,
  className,
  ...props
}: StickyHorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const isLeftToRight = direction === "left-to-right";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftToRight ? [-scrollDistance, 0] : [0, -scrollDistance],
  );

  useEffect(() => {
    const measure = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      setScrollDistance(Math.max(trackWidth - viewportWidth, 0));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      data-direction={direction}
      className={cn('ui-Sticky', className)}
      style={{ minHeight: `calc(100vh + ${scrollDistance}px)` }}
      {...props}
    >
      <div
        className="sticky flex h-screen flex-col overflow-hidden py-20 lg:py-24"
        style={{ top: stickyOffset }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:120px_120px] opacity-45" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_56%_at_18%_24%,rgba(219,88,40,0.16),transparent_66%)]" />

        <div className="relative z-10 mx-auto flex w-full flex-1 flex-col">
          {header}

          <div ref={viewportRef} className="flex-1 overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex h-full w-max items-stretch gap-5 sm:gap-7 lg:gap-8"
            >
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className="relative flex min-h-[390px] w-[min(78vw,520px)] shrink-0 overflow-hidden border border-white/[0.08] bg-[#0c0a08] shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:min-h-[440px] lg:w-[520px]"
                >
                  {renderItem ? (
                    renderItem(item, index, items)
                  ) : (
                    <DefaultStickyHorizontalCard item={item} index={index} />
                  )}
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DefaultStickyHorizontalCard({
  item,
  index,
}: {
  item: StickyHorizontalScrollItem;
  index: number;
}) {
  return (
    <div className="relative flex min-h-full w-full flex-col justify-between p-8 sm:p-10 lg:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_84%_72%_at_18%_0%,rgba(219,88,40,0.14),transparent_60%)]" />
      <div className="relative">
        <p className="text-sm font-light tracking-widest text-accent-500 uppercase">
          {item.number ?? String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-8 text-4xl font-bold tracking-tight text-foreground-100 sm:text-5xl">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-5 text-sm leading-8 font-light text-foreground-200">
            {item.description}
          </p>
        )}
      </div>
      {item.subtitle && (
        <p className="relative mt-10 text-sm font-medium tracking-widest text-foreground-400 uppercase">
          {item.subtitle}
        </p>
      )}
    </div>
  );
}

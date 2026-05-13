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
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
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
  eyebrow,
  title,
  description,
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
      className={cn("ui-Sticky", className)}
      style={{ minHeight: `calc(100vh + ${scrollDistance}px)` }}
      {...props}
    >
      <div
        className="sticky flex min-h-screen flex-col overflow-hidden py-20 lg:py-24"
        style={{ top: stickyOffset }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:120px_120px] opacity-45" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_56%_at_18%_24%,rgba(219,88,40,0.16),transparent_66%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              {eyebrow && <p className="sh-eyebrow mb-5">{eyebrow}</p>}
              {title && (
                <h2 className="ui-Section-Heading max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  {title}
                </h2>
              )}
            </div>
            {description && (
              <p className="max-w-2xl text-sm font-light leading-8 text-white/45 lg:ml-auto lg:text-right">
                {description}
              </p>
            )}
          </div>

          <div
            ref={viewportRef}
            className="mt-14 flex-1 overflow-hidden lg:mt-20"
          >
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
        <p className="text-sm font-light uppercase tracking-widest text-[#E15F31]">
          {item.number ?? String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-5 text-sm font-light leading-8 text-white/60">
            {item.description}
          </p>
        )}
      </div>
      {item.subtitle && (
        <p className="relative mt-10 text-sm font-medium uppercase tracking-widest text-white/35">
          {item.subtitle}
        </p>
      )}
    </div>
  );
}

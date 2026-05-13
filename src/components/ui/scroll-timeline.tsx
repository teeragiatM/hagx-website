"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, type MotionValue } from "framer-motion";
import Image from "next/image";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type TimelineItem = {
  n: string;
  phase: string;
  title: string;
  image: string;
  body: string[];
  year?: string;
};

type ScrollTimelineContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  scrollYProgress: MotionValue<number>;
};

const ScrollTimelineContext = createContext<ScrollTimelineContextValue | null>(
  null,
);

function useScrollTimelineContext() {
  const context = useContext(ScrollTimelineContext);
  if (!context) {
    throw new Error(
      "ScrollTimeline components must be used inside <ScrollTimeline>.",
    );
  }
  return context;
}

export type ScrollTimelineProps = HTMLAttributes<HTMLElement> & {
  items?: TimelineItem[];
};

export function ScrollTimeline({
  items,
  className,
  children,
  ...props
}: ScrollTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 45%"],
  });

  return (
    <ScrollTimelineContext.Provider
      value={{ activeIndex, setActiveIndex, scrollYProgress }}
    >
      <section
        ref={sectionRef}
        className={cn(
          "ui-scroll-timeline relative overflow-hidden border-b border-white/[0.06] px-4 py-16 sm:px-8 lg:px-10 lg:py-24",
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:140px_140px] opacity-25" />
        <div className="relative mx-auto max-w-[1500px]">
          {items ? (
            <ScrollTimelineTrack>
              {items.map((item, index) => (
                <ScrollTimelineItem key={item.n} item={item} index={index} />
              ))}
            </ScrollTimelineTrack>
          ) : (
            children
          )}
        </div>
      </section>
    </ScrollTimelineContext.Provider>
  );
}

export function ScrollTimelineTrack({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { scrollYProgress } = useScrollTimelineContext();

  return (
    <div className={cn("ui-scroll-timeline-track relative", className)}>
      <div className="absolute left-5 top-0 h-full w-px bg-white/[0.08] lg:left-1/2" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-5 top-0 h-full w-px origin-top bg-[#E15F31]/70 lg:left-1/2"
      />
      <div className="space-y-12 lg:space-y-16">{children}</div>
    </div>
  );
}

export function ScrollTimelineItem({
  item,
  index,
  className,
}: {
  item: TimelineItem;
  index: number;
  className?: string;
}) {
  const { activeIndex, setActiveIndex } = useScrollTimelineContext();
  const isReverse = index % 2 === 1;
  const isActive = activeIndex === index;
  const isPast = index < activeIndex;

  return (
    <motion.article
      key={item.n}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setActiveIndex(index)}
      viewport={{ once: false, amount: 0.58 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "ui-scroll-timeline-item relative grid gap-6 pl-14 lg:grid-cols-2 lg:gap-12 lg:pl-0",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0.72, opacity: 0.45 }}
        whileInView={{ opacity: 1 }}
        animate={{
          opacity: isActive ? 1 : isPast ? 0.45 : 0.26,
          backgroundColor: isActive ? "#E15F31" : "#080808",
          color: isActive ? "#080808" : "#E15F31",
          boxShadow: isActive
            ? "0 0 0 12px rgba(255,138,0,0.14), 0 0 34px rgba(255,138,0,0.85)"
            : "0 0 18px rgba(255,138,0,0.22)",
        }}
        viewport={{ once: false, amount: 0.65 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 top-2 z-20 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[#E15F31]/60  text-[10px] font-medium text-[#E15F31] shadow-[0_0_18px_rgba(255,138,0,0.3)] lg:left-1/2 lg:-translate-x-1/2"
      >
        {item.n}
      </motion.div>

      <div className={isReverse ? "lg:col-start-2" : ""}>
        <motion.div
          initial={{ opacity: 0.24, filter: "grayscale(1) brightness(0.42)" }}
          whileInView={{ opacity: 1, filter: "grayscale(0) brightness(1)" }}
          animate={{
            opacity: isActive ? 1 : isPast ? 0.42 : 0.24,
            filter: isActive
              ? "grayscale(0) brightness(1)"
              : isPast
                ? "grayscale(0.75) brightness(0.55)"
                : "grayscale(1) brightness(0.42)",
          }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative aspect-[1.55/1] overflow-hidden border bg-[#111] transition-colors duration-500 lg:max-w-[520px]",
            isActive ? "border-[#E15F31]/45" : "border-white/[0.06]",
          )}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div
        className={cn(
          "flex items-center",
          isReverse ? "lg:col-start-1 lg:row-start-1 lg:text-right" : "",
        )}
      >
        <motion.div
          animate={{ opacity: isActive ? 1 : isPast ? 0.44 : 0.28 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={isReverse ? "lg:ml-auto" : ""}
        >
          {item.year && (
            <p
              className={cn(
                "mb-1 text-[11px] font-bold tracking-tight transition-colors duration-500",
                isActive ? "text-[#E15F31]" : "text-white/30",
              )}
            >
              {item.year}
            </p>
          )}
          <p
            className={cn(
              "mb-3 text-[10px] font-light uppercase tracking-widest transition-colors duration-500",
              isActive ? "text-[#E15F31]" : "text-white/30",
            )}
          >
            {item.phase}
          </p>
          <h3
            className={cn(
              "max-w-lg text-2xl font-light leading-tight transition-colors duration-500 sm:text-3xl",
              isActive ? "text-white" : "text-white/45",
            )}
          >
            {item.title}
          </h3>
          <div className="mt-5 space-y-3">
            {item.body.map((text) => (
              <p
                key={text}
                className={cn(
                  "max-w-lg text-xs font-light leading-7 transition-colors duration-500",
                  isActive ? "text-white/62" : "text-muted",
                )}
              >
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

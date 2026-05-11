"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CarouselControls } from "@/components/ui/CarouselControls";

export type TestimonialItem = {
  client: string;
  project: string;
  scope: string;
  quote: string;
  bg?: string;
  accent?: string;
};

type TestimonialCarouselProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: TestimonialItem[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
};

export default function TestimonialCarousel({
  eyebrow = "Client Stories",
  title,
  description,
  items,
  autoPlay = true,
  intervalMs = 5200,
  className = "",
}: TestimonialCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [autoPlay, intervalMs, items.length]);

  const visible = useMemo(() => {
    if (items.length <= 3) return items;

    return [
      items[(active - 1 + items.length) % items.length],
      items[active],
      items[(active + 1) % items.length],
    ];
  }, [active, items]);

  const prev = () => setActive((current) => (current - 1 + items.length) % items.length);
  const next = () => setActive((current) => (current + 1) % items.length);

  if (items.length === 0) return null;

  return (
    <section className={`border-b border-white/[0.06] px-8 py-24 sm:px-14 ${className}`}>
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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

        <div className="relative">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {visible.map((item, index) => {
              const isFocus = items.length <= 3 ? index === 0 : index === 1;
              const accent = item.accent ?? "#ff8a00";

              return (
                <motion.article
                  key={`${active}-${item.client}-${item.project}-${index}`}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: isFocus ? 1 : 0.68, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex min-h-[420px] flex-col justify-between overflow-hidden p-8 transition-transform duration-500 ${
                    isFocus ? "lg:-translate-y-3" : ""
                  }`}
                  style={{ backgroundColor: item.bg ?? "#0c0c0c" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      background: `radial-gradient(ellipse 70% 50% at 80% 0%, ${accent}24, transparent 62%)`,
                    }}
                  />
                  <div className="relative">
                    <div className="mb-6 inline-flex items-center justify-center border px-4 py-2" style={{ borderColor: `${accent}55` }}>
                      <span className="text-lg font-bold" style={{ color: accent }}>
                        {item.client}
                      </span>
                    </div>
                    <p className="mb-3 text-[10px] font-light uppercase tracking-widest" style={{ color: `${accent}aa` }}>
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
            })}
          </div>

          {items.length > 1 && (
            <CarouselControls
              index={active}
              total={items.length}
              onPrev={prev}
              onNext={next}
              onDotClick={setActive}
              dotStyle="dot"
              className="mt-8 justify-end"
            />
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ServiceCarouselItem = {
  n: string;
  title: string;
  desc: string;
  image: string;
};

type ServiceCarouselProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceCarouselItem[];
  ctaPrimary?: {
    href: string;
    label: string;
  };
  ctaSecondary?: {
    href: string;
    label: string;
  };
  visibleCount?: number;
};

function ServiceCard({ item }: { item: ServiceCarouselItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[430px] overflow-hidden bg-[#111]"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="mb-4 text-xs font-light text-white/35">{item.n}</p>
        <h3 className="max-w-[15rem] text-2xl font-light leading-tight text-white">
          {item.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-xs font-light leading-6 text-white/45">
          {item.desc}
        </p>
      </div>
    </motion.article>
  );
}

export default function ServiceCarousel({
  eyebrow,
  title,
  description,
  items,
  ctaPrimary,
  ctaSecondary,
  visibleCount = 4,
}: ServiceCarouselProps) {
  const safeVisibleCount = Math.max(1, Math.min(visibleCount, items.length));
  const [startIndex, setStartIndex] = useState(0);
  const maxStart = Math.max(0, items.length - safeVisibleCount);
  const canSlide = items.length > safeVisibleCount;

  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + safeVisibleCount),
    [items, safeVisibleCount, startIndex],
  );

  const gridClass =
    safeVisibleCount >= 4
      ? "lg:grid-cols-4"
      : safeVisibleCount === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-2";

  const goPrev = () => setStartIndex((current) => Math.max(0, current - 1));
  const goNext = () => setStartIndex((current) => Math.min(maxStart, current + 1));

  return (
    <section className="border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-sm font-light leading-7 text-white/55 lg:ml-auto lg:pt-3 lg:text-right">
            {description}
          </p>
        </div>

        <div className={`grid gap-4 sm:grid-cols-2 ${gridClass}`}>
          {visibleItems.map((item) => (
            <ServiceCard key={item.n} item={item} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className="btn btn-primary">
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn btn-secondary">
                {ctaSecondary.label}
              </Link>
            )}
          </div>

          {canSlide && (
            <div className="flex items-center gap-6 sm:justify-end">
              <div className="hidden gap-3 sm:flex">
                {items.map((item, index) => (
                  <button
                    key={item.n}
                    type="button"
                    aria-label={`Show service ${index + 1}`}
                    onClick={() => setStartIndex(Math.min(index, maxStart))}
                    className={`h-[2px] w-8 transition-colors ${
                      index >= startIndex && index < startIndex + safeVisibleCount
                        ? "bg-[#ff8a00]"
                        : "bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={startIndex === 0}
                  aria-label="Previous services"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={startIndex === maxStart}
                  aria-label="Next services"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

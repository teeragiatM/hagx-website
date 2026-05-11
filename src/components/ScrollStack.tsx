"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ScrollStackItem = {
  id: string;
  number?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  secondarySubtitle?: ReactNode;
  secondaryDescription?: ReactNode;
  icon?: ReactNode;
};

export type ScrollStackProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  items: ScrollStackItem[];
  className?: string;
  renderItem?: (item: ScrollStackItem, index: number, items: ScrollStackItem[]) => ReactNode;
};

export default function ScrollStack({
  eyebrow,
  title,
  description,
  items,
  className,
  renderItem,
}: ScrollStackProps) {
  return (
    <section className={cn("relative border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28", className)}>
      <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
          {eyebrow && (
            <p className="mb-5 text-xs font-light uppercase tracking-widest text-[#ff8a00]">{eyebrow}</p>
          )}
          <h2 className="max-w-xl text-4xl font-light leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {description && (
            <p className="mt-6 max-w-md text-sm font-light leading-8 text-white/45">{description}</p>
          )}
        </div>

        <div className="space-y-8 pb-[28vh]">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0.82, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.45 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="sticky overflow-hidden border border-white/[0.08] bg-[#0c0a08] shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
              style={{
                top: `${104 + index * 18}px`,
                zIndex: 10 + index,
              }}
            >
              {renderItem ? renderItem(item, index, items) : <DefaultStackCard item={item} total={items.length} />}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DefaultStackCard({ item, total }: { item: ScrollStackItem; total: number }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_18%_0%,rgba(255,138,0,0.16),transparent_58%)]" />
      <div className="relative grid min-h-[420px] gap-8 p-8 sm:p-10 lg:grid-cols-[180px_1fr] lg:p-12">
        <div className="flex flex-col justify-between border-white/[0.08] lg:border-r lg:pr-8">
          <div>
            {item.number && (
              <p className="text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
                {item.number} / {String(total).padStart(2, "0")}
              </p>
            )}
            {item.icon && <div className="mt-8 text-[#ff8a00]">{item.icon}</div>}
          </div>
          {item.number && (
            <p className="mt-10 text-7xl font-light leading-none text-white/[0.04] sm:text-8xl">
              {item.number}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {item.number && (
            <p className="mb-4 text-[10px] font-light uppercase tracking-widest text-white/25">
              {item.number}
            </p>
          )}
          <h3 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h3>
          {item.subtitle && <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-white/70">{item.subtitle}</p>}
          {item.description && <p className="mt-4 max-w-2xl text-sm font-light leading-8 text-white/48">{item.description}</p>}
          {item.secondarySubtitle && <p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/40">{item.secondarySubtitle}</p>}
          {item.secondaryDescription && <p className="mt-2 max-w-2xl text-xs font-light leading-7 text-white/30">{item.secondaryDescription}</p>}
        </div>
      </div>
    </>
  );
}

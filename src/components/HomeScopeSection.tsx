"use client";

import { useI18n } from "@/i18n/useI18n";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { ScopeItem } from '@/content/hagx';

// ── Component ─────────────────────────────────────────────────────────────────

export default function HomeScopeSection({ items }: { items: ScopeItem[] }) {
  const { lang } = useI18n();
  const [active, setActive] = useState(items[0].n);

  const activeItem = items.find((s) => s.n === active)!;

  return (
    <div>
      <div className="px-(--homepage-padding-inset)">
        {/* ── Scope text block ── */}
        <p className="scope-text" aria-label="Scope of works">
          {items.map((item, i) => (
            <span key={item.n}>
              <span
                className="inline cursor-default font-medium transition-colors outline-none hover:text-accent-500 data-[active]:text-accent-500"
                onMouseEnter={() => setActive(item.n)}
                onFocus={() => setActive(item.n)}
                tabIndex={0}
                role="button"
                aria-label={lang === 'th' ? item.th : item.en}
                data-active={active === item.n ? 'true' : undefined}
              >
                {lang === 'th' ? item.th : item.en}
                <sup className="scope-sup">{item.n}</sup>
              </span>
              {i < items.length - 1 && (
                <span className="scope-sep" aria-hidden="true">
                  {' / '}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* ── Image reveal ── */}
      <div className="scope-image-wrap" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.n}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeItem.image}
              alt={lang === 'th' ? activeItem.th : activeItem.en}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover opacity-80"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
            <div className="absolute bottom-6 left-8 flex items-end gap-4">
              <span className="text-xs font-light tracking-widest text-foreground-400 uppercase">
                {activeItem.n}
              </span>
              <span className="text-sm font-light text-foreground-200">
                {lang === 'th' ? activeItem.th : activeItem.en}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

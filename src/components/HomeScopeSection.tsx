"use client";

import { useI18n } from "@/i18n/useI18n";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const scopeItems = [
  {
    n: "01",
    en: "Curtain Wall Systems",
    th: "ระบบ Curtain Wall",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85",
  },
  {
    n: "02",
    en: "Glass Facades",
    th: "ผนังกระจก Facade",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=85",
  },
  {
    n: "03",
    en: "Aluminium Windows & Doors",
    th: "หน้าต่างและประตูอลูมิเนียม",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
  },
  {
    n: "04",
    en: "Glass Partitions",
    th: "ผนังกระจกภายใน",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85",
  },
  {
    n: "05",
    en: "Sliding & Folding Systems",
    th: "ระบบบานเลื่อนและบานพับ",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85",
  },
  {
    n: "06",
    en: "Railings & Balusters",
    th: "ราวบันไดและราวกันตก",
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&q=85",
  },
  {
    n: "07",
    en: "Material Supply",
    th: "จำหน่ายวัสดุและฮาร์ดแวร์",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=85",
  },
  {
    n: "08",
    en: "Project Management",
    th: "บริหารโครงการครบวงจร",
    image:
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1400&q=85",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function HomeScopeSection() {
  const { lang } = useI18n();
  const [active, setActive] = useState(scopeItems[0].n);

  const activeItem = scopeItems.find((s) => s.n === active)!;

  return (
    <section className="ui-padding border-t border-white/[0.06]">
      <div className="ui-margin">

        {/* ── Scope text block ── */}
        <p className="scope-text" aria-label="Scope of works">
          {scopeItems.map((item, i) => (
            <span key={item.n}>
              <span
                className="scope-item"
                onMouseEnter={() => setActive(item.n)}
                onFocus={() => setActive(item.n)}
                tabIndex={0}
                role="button"
                aria-label={lang === "th" ? item.th : item.en}
                data-active={active === item.n ? "true" : undefined}
              >
                {lang === "th" ? item.th : item.en}
                <sup className="scope-sup">{item.n}</sup>
              </span>
              {i < scopeItems.length - 1 && (
                <span className="scope-sep" aria-hidden="true">
                  {" / "}
                </span>
              )}
            </span>
          ))}
        </p>

        {/* ── Image reveal ── */}
        <div className="scope-image-wrap" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.n}
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="scope-image-inner"
            >
              <Image
                src={activeItem.image}
                alt={lang === "th" ? activeItem.th : activeItem.en}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover opacity-80"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
              <div className="absolute bottom-6 left-8 flex items-end gap-4">
                <span className="text-xs font-light uppercase tracking-widest text-white/40">
                  {activeItem.n}
                </span>
                <span className="text-sm font-light text-white/80">
                  {lang === "th" ? activeItem.th : activeItem.en}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

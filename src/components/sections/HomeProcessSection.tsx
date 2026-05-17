"use client";

import { useI18n } from '@/i18n/useI18n';
import { StickyFixed } from '@ui/sticky-fixed';
import { CarouselControls } from '@ui/Carousel';
import Image from "next/image";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipe } from '@/hooks/useSwipe';
import type { ProcessStep } from '@/content/hagx';

// ── Shared card content ───────────────────────────────────────────────────────

function ProcessCardInner({
  step,
  lang,
}: {
  step: ProcessStep;
  lang: 'th' | 'en';
}) {
  const title = lang === 'th' ? step.titleTh : step.title;
  const items = lang === 'th' ? step.itemsTh : step.itemsEn;

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="relative h-[200px] shrink-0 overflow-hidden sm:h-[240px]">
        <Image
          src={step.image}
          alt={title}
          fill
          sizes="min(82vw, 520px)"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/20 to-transparent" />
        <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center bg-background-100/70 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-accent-500">{step.n}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-7 sm:p-9">
        <h3 className="text-2xl font-medium text-foreground-100 sm:text-3xl">{title}</h3>
        <ul className="mt-auto space-y-3">
          {items.map((text) => (
            <li key={text} className="flex gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              <span className="text-xs leading-relaxed font-light text-foreground-400 sm:text-sm">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function HomeProcessSection({
  items,
  pin,
}: {
  items: ProcessStep[];
  pin?: React.ReactNode;
}) {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const goPrev = () => { setDir(-1); setActive((i) => Math.max(0, i - 1)); };
  const goNext = () => { setDir(1);  setActive((i) => Math.min(items.length - 1, i + 1)); };
  const swipe = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  const stickyItems = items.map((step) => ({
    id: step.n,
    number: step.n,
    title: lang === 'th' ? step.titleTh : step.title,
    _step: step,
  }));

  return (
    <>
      {/* ── Mobile: slide carousel ── */}
      <div className="lg:hidden flex flex-col gap-5">
        {pin}
        <div {...swipe} className="touch-pan-y select-none overflow-hidden px-(--homepage-padding-inset)">
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -60, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="border border-white/[0.08] bg-[#0c0a08]"
            >
              <ProcessCardInner step={items[active]} lang={lang} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-(--homepage-padding-inset)">
          <CarouselControls
            index={active}
            total={items.length}
            onPrev={goPrev}
            onNext={goNext}
            onDotClick={setActive}
            dotStyle="line"
          />
        </div>
      </div>

      {/* ── Desktop: sticky horizontal scroll ── */}
      <div className="hidden lg:block">
        <StickyFixed
          mode="horizontal"
          items={stickyItems}
          stickyClassName="pt-0 pb-0 sm:pt-12 sm:pb-24 lg:pt-24 lg:pb-32 mx-auto"
        >
          {pin && <StickyFixed.Pin>{pin}</StickyFixed.Pin>}
          <StickyFixed.Track
            itemClassName="min-h-[390px] w-[min(78vw,520px)] border border-white/[0.08] bg-[#0c0a08] shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:min-h-[440px] lg:w-[520px]"
            renderItem={(item) => {
              const data = item as (typeof stickyItems)[number];
              return <ProcessCardInner step={data._step} lang={lang} />;
            }}
          />
        </StickyFixed>
      </div>
    </>
  );
}

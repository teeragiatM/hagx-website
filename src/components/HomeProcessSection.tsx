"use client";

import { useI18n } from '@/i18n/useI18n';
import { StickyHorizontalScrollSection } from '@/components/ui/sticky-horizontal-scroll';
import { cn } from '@/lib/utils';
import Image from "next/image";
import { useRef, useState } from 'react';
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
          <span className="text-[10px] font-medium text-accent-500">
            {step.n}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-7 sm:p-9">
        <h3 className="text-2xl font-medium text-foreground-100 sm:text-3xl">
          {title}
        </h3>
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

// ── Mobile touch carousel ─────────────────────────────────────────────────────

function MobileCarousel({
  steps,
  lang,
}: {
  steps: ProcessStep[];
  lang: 'th' | 'en';
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / steps.length;
    setActive(
      Math.max(
        0,
        Math.min(Math.round(el.scrollLeft / cardWidth), steps.length - 1)
      )
    );
  };

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({
      left: (el.scrollWidth / steps.length) * idx,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* snap track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto"
        style={{
          scrollPaddingLeft: 'var(--homepage-padding-inset)',
          paddingLeft: 'var(--homepage-padding-inset)',
        }}
      >
        {steps.map((step) => (
          <div
            key={step.n}
            className="xs:w-[74vw] w-[82vw] shrink-0 snap-start overflow-hidden border border-white/[0.08] bg-[#0c0a08]"
          >
            <ProcessCardInner step={step} lang={lang} />
          </div>
        ))}
        {/* trailing spacer so last card snaps fully into view */}
        <div
          className="w-[calc(var(--homepage-padding-inset)-12px)] shrink-0"
          aria-hidden
        />
      </div>

      {/* dots */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`ขั้นตอนที่ ${i + 1}`}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              i === active
                ? 'w-6 bg-accent-500'
                : 'w-2 bg-foreground-200/25 hover:bg-foreground-200/50'
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function HomeProcessSection({
  items,
  header,
}: {
  items: ProcessStep[];
  header: React.ReactNode;
}) {
  const { lang } = useI18n();

  const stickyItems = items.map((step) => ({
    id: step.n,
    number: step.n,
    title: lang === 'th' ? step.titleTh : step.title,
    _step: step,
  }));

  return (
    <>
      {/* ── Mobile: touch snap carousel ── */}
      <div className="lg:hidden">
        {header}
        <div className="mt-10">
          <MobileCarousel steps={items} lang={lang} />
        </div>
      </div>

      {/* ── Desktop: sticky horizontal scroll ── */}
      <div className="hidden lg:block">
        <StickyHorizontalScrollSection
          header={header}
          items={stickyItems}
          renderItem={(item) => {
            const data = item as (typeof stickyItems)[number];
            return <ProcessCardInner step={data._step} lang={lang} />;
          }}
        />
      </div>
    </>
  );
}

"use client";

import { cn } from '@/lib/utils';
import { useI18n } from "@/i18n/useI18n";
import { ScanSearch, Factory, Hammer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import type { StrategyPillar } from '@/content/hagx';

const ICON_MAP: Record<string, LucideIcon> = { ScanSearch, Factory, Hammer };

export default function StrategySection({
  pillars,
}: {
  pillars: StrategyPillar[];
}) {
  const { lang } = useI18n();

  return (
    <div>
      {/* Mobile: snap carousel */}
      <div className="sm:hidden">
        <MobilePillarCarousel pillars={pillars} lang={lang} />
      </div>

      {/* Desktop: static overlapping circles */}
      <div className="mt-10 hidden items-center justify-center sm:flex">
        {pillars.map((pillar, i) => {
          const Icon = ICON_MAP[pillar.iconName];
          return (
            <div
              key={pillar.num}
              className="relative w-[220px] shrink-0 rounded-full border border-border-100 bg-background-level-1 md:w-[260px] lg:w-[300px] xl:w-[340px]"
              style={{
                aspectRatio: '1',
                marginLeft: i > 0 ? '-6%' : undefined,
                filter: 'drop-shadow(0 0 12px var(--background-100))',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <Icon
                  className="text-foreground"
                  size={22}
                  strokeWidth={1.25}
                />
                <p className="text-[10px] font-light tracking-widest text-foreground-300 uppercase">
                  {pillar.num} / {pillar.tag}
                </p>
                <p className="text-sm font-light text-foreground-200">
                  {lang === 'th' ? pillar.titleTh : pillar.titleEn}
                </p>
                <p className="mt-1 max-w-[80%] text-[11px] leading-relaxed font-light text-foreground-300">
                  {lang === 'th' ? pillar.descTh : pillar.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobilePillarCarousel({
  pillars,
  lang,
}: {
  pillars: StrategyPillar[];
  lang: 'th' | 'en';
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
      >
        {pillars.map((pillar) => {
          const Icon = ICON_MAP[pillar.iconName];
          return (
            <div
              key={pillar.num}
              className="flex w-full shrink-0 snap-start flex-col items-center gap-4 px-6"
            >
              <div
                className="relative w-[220px] rounded-full border border-accent-500 bg-background-level-1"
                style={{
                  aspectRatio: '1',
                  boxShadow:
                    '0 0 40px 8px color-mix(in oklab, var(--accent-500) 35%, transparent), 0 0 80px 24px color-mix(in oklab, var(--accent-500) 15%, transparent)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center">
                  <Icon
                    className="text-foreground"
                    size={24}
                    strokeWidth={1.25}
                  />
                  <p className="text-xs font-light tracking-widest text-foreground-300 uppercase">
                    {pillar.num} / {pillar.tag}
                  </p>
                  <p className="text-sm font-light text-foreground-200">
                    {lang === 'th' ? pillar.titleTh : pillar.titleEn}
                  </p>
                </div>
              </div>
              <p className="max-w-[280px] text-center text-sm leading-relaxed font-light text-foreground-300">
                {lang === 'th' ? pillar.descTh : pillar.descEn}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {pillars.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              trackRef.current?.scrollTo({
                left: i * trackRef.current.clientWidth,
                behavior: 'smooth',
              })
            }
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              i === active ? 'w-6 bg-accent-500' : 'w-2 bg-foreground-300/40'
            )}
            aria-label={`Pillar ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

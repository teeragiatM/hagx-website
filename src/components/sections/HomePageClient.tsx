'use client';

import CTA from './CTA';
import HomePortfolioSection from './HomePortfolioSection';
import HomeProcessSection from './HomeProcessSection';
import HomeScopeSection from './HomeScopeSection';
import { StatsGrid, CarouselRoot, CarouselGrid, TestimonialCard } from '@ui';
import PageHero from '@layout/PageHero';
import SectionHeader from '@layout/SectionHeader';
import { Marquee } from '@ui/Marquee';
import {
  hagxBrands,
  hagxProcessSteps,
  hagxScopeItems,
  hagxStats,
} from '@/content/hagx';
import { useI18n } from '@/i18n/useI18n';
import type { LocalizedPortfolioItem } from '@/lib/localizePortfolio';
import type { TestimonialItem as TestimonialCarouselItem } from '@ui';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Preloader } from '@ui/Preloader';
import Bleed from '../layout/Bleed';
import PageSeparator from './../layout/PageSeparator';
import { PageSection } from '../layout';

// ── Page ─────────────────────────────────────────────────────────────────────

type HomePageClientProps = {
  latestItemsTh: LocalizedPortfolioItem[];
  latestItemsEn: LocalizedPortfolioItem[];
  reviewsTh: TestimonialCarouselItem[];
  reviewsEn: TestimonialCarouselItem[];
};

export default function HomePageClient({
  latestItemsTh,
  latestItemsEn,
  reviewsTh,
  reviewsEn,
}: HomePageClientProps) {
  const [loaded, setLoaded] = useState(false);
  const { t, lang } = useI18n();

  const portfolio = (lang === 'th' ? latestItemsTh : latestItemsEn).map(
    (item) => ({
      title: item.title,
      sub: item.location,
      desc: item.description,
      image: item.cover_image,
      slug: item.slug,
      scope: item.scope,
    })
  );

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <Preloader onDone={() => setLoaded(true)}>
            <Preloader.Background />
            <Preloader.Logo />
            <Preloader.Bottom>
              <Preloader.Percent />
              <Preloader.Bar />
            </Preloader.Bottom>
          </Preloader>
        )}
      </AnimatePresence>
      {/* ── HERO ── */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')
          .split('\n')
          .map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br className="hidden sm:block" />}
            </span>
          ))}
        subtitle={t('hero.subtitle')}
        align="left"
        variant="shadow"
        glow={false}
        className='justify-end'
        titleClassName="home-hero-title"
        backgroundSlot={
          <Image
            src="/images/20241030_135650.jpg"
            alt="วิลล่าสมัยใหม่ระบบกระจก Full-height — HAGX Premium Glass Bangkok"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        }
      ></PageHero>
      {/* ── FEATURED PROJECTS ── */}
      <HomePortfolioSection portfolio={portfolio} />
      <Bleed>
        <PageSeparator/>
      </Bleed>
      {/* ── HOW WE WORK ── */}
      <HomeProcessSection
        items={hagxProcessSteps}
        pin={
          <SectionHeader
            heading={t('whatwedo.title')}
            description={t('whatwedo.desc')}
          />
        }
      />
      {/* ── SCOPE OF WORK ── */}
      <PageSection>
        <HomeScopeSection items={hagxScopeItems} />
      </PageSection>
      <Bleed>
        <PageSeparator/>
      </Bleed>
      {/* ── TRUST / NUMBERS ── */}
      <PageSection>
        <SectionHeader heading={t('partnership.title')} />
        <StatsGrid
          items={hagxStats.map((s) => ({
            value: s.n,
            label: lang === 'th' ? s.labelTh : s.labelEn,
            description: lang === 'th' ? s.sub : s.subEn,
          }))}
        />
      </PageSection>
      {/* ── BRAND MARQUEE ── */}
      <section aria-label="HAGX material partners" className="mt-10 mb-10">
        <Marquee speed={32} gap={96} className="relative overflow-hidden">
          {hagxBrands.map((item, i) => (
            <Marquee.Item key={`${item}-${i}`}>
              <span className="text-xs font-light tracking-widest whitespace-nowrap text-foreground-100 uppercase">
                {item}
              </span>
            </Marquee.Item>
          ))}
        </Marquee>
      </section>
      <Bleed>
        <PageSeparator/>
      </Bleed>
      {/* ── CLIENT REVIEWS ── */}
      {(lang === "th" ? reviewsTh : reviewsEn).length > 0 && (
        <PageSection>
          {(() => {
            const reviews = lang === "th" ? reviewsTh : reviewsEn;
            const items = reviews.map((_, i) => ({ n: String(i) }));
            const visibleCount = Math.min(3, reviews.length);
            const centerIdx = Math.floor(visibleCount / 2);
            return (
              <CarouselRoot items={items} visibleCount={visibleCount} loop autoPlay intervalMs={4800}>
                <CarouselGrid

                  renderCard={(_, localIdx, globalIdx) => (
                    <TestimonialCard item={reviews[globalIdx]} isFocus={localIdx === centerIdx} />
                  )}
                />
              </CarouselRoot>
            );
          })()}
        </PageSection>
      )}
      {/* ── CTA ── */}
      <CTA
        eyebrow={t('cta.eyebrow')}
        title={t('cta.title')}
        description={t('cta.desc')}
        primaryAction={{ href: '/contact', label: t('cta.button_1') }}
        secondaryAction={{ href: '/shop', label: t('cta.button_2') }}
      />
    </>
  );
}

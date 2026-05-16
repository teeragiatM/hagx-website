'use client';

import CtaSection from '@/components/CtaSection';
import HomePortfolioSection from '@/components/HomePortfolioSection';
import HomeProcessSection from '@/components/HomeProcessSection';
import HomeScopeSection from '@/components/HomeScopeSection';
import HomeTestimonialsSection from '@/components/HomeTestimonialsSection';
import PageHero from '@/components/PageHero';
import StrategySection from '@/components/StrategySection';
import SectionHeader from '@/components/SectionHeader';
import { StickyHorizontalScrollSection } from '@/components/ui/sticky-horizontal-scroll';
import { StickySplitSection } from '@/components/ui/sticky-split';
import { TextMarquee } from '@/components/ui/Marquee';
import {
  hagxBrands,
  hagxProcessSteps,
  hagxScopeItems,
  hagxStats,
  hagxStrategyPillars,
  hagxValues,
} from '@/content/hagx';
import { useI18n } from '@/i18n/useI18n';
import type { LocalizedPortfolioItem } from '@/lib/localizePortfolio';
import type { TestimonialCarouselItem } from '@/components/ui/testimonial-carousel';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Gem, Users, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Preloader } from './ui/Preloader';

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

  const getAboutSectionKey = (id: string) => {
    if (id === 'who-we-are') return 'who';
    if (id === 'our-values') return 'values';
    if (id === 'our-team') return 'team';
    return 'founders';
  };

  const getAboutSectionIcon = (id: string) => {
    if (id === 'who-we-are')
      return <Building2 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
    if (id === 'our-values')
      return <Gem className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
    if (id === 'our-team')
      return <Users className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
    return <UserRound className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  };

  const aboutTabs = [
    {
      id: 'who-we-are',
      image:
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90',
      stats: hagxStats.map(
        ({ n, labelTh, labelEn }) =>
          [n, lang === 'th' ? labelTh : labelEn] as const
      ),
    },
    {
      id: 'our-values',
      image:
        'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90',
      values: hagxValues.map(
        ({ n, title, titleTh, subTh, subEn }) =>
          [
            n,
            lang === 'th' ? titleTh : title,
            lang === 'th' ? subTh : subEn,
          ] as const
      ),
    },
    {
      id: 'our-team',
      image: '/images/team/hagx_team.png',
      roles: t('about_intro.sections.team.roles', {
        returnObjects: true,
      }) as unknown as string[],
    },
    {
      id: 'founders',
      image: '/images/team/Panya_Sukyoo.png',
      founders: [
        {
          nameKey: 'panya_sukyoo_name',
          image: '/images/team/Panya_Sukyoo.png',
        },
        {
          nameKey: 'chanyanat_moopayak_name',
          image: '/images/team/Chanyanat.png',
        },
      ],
    },
  ];

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
        className="justify-end"
        titleClassName="home-hero-title"
        backgroundSlot={
          <Image
            src="/images/20241030_135650.jpg"
            alt="วิลล่าสมัยใหม่ระบบกระจก Full-height — HAGX Premium Glass Bangkok"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        }
      ></PageHero>
      {/* ── ABOUT US ── */}
      <section>
        <StickySplitSection
          id="about"
          items={aboutTabs}
          pinnedSide="left"
          ariaLabel="About sections"
          renderNavLabel={(tab) => (
            <>
              {getAboutSectionIcon(tab.id)}
              {t(`about_intro.tabs.${getAboutSectionKey(tab.id)}`)}
            </>
          )}
          renderPinned={() => (
            <div className="flex flex-col gap-5" data-slot="sticky-fixed">
              <h1 className="text-2xl font-medium md:text-4xl lg:text-5xl">
                {t('about_intro.title')}
              </h1>
              <p className="text-sm text-foreground-200">
                {t('about_intro.description')}
              </p>
            </div>
          )}
          renderPinnedFooter={({ activeItem }) => {
            const activeKey = getAboutSectionKey(activeItem.id);
            return (
              <motion.div
                key={activeItem.image}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-2 h-[180px] overflow-hidden border-b border-accent-500/60 bg-white/5 sm:h-[240px] lg:h-[24vh]"
              >
                <Image
                  src={activeItem.image}
                  alt={`${t(`about_intro.tabs.${activeKey}`)} - HAGX`}
                  fill
                  sizes="(min-width: 1024px) 49vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-[#080808]/10 to-transparent" />
              </motion.div>
            );
          }}
          renderItem={(tab) => (
            <>
              {tab.stats && (
                <>
                  <div className="flex flex-col gap-4">
                    {tab.stats.map(([number, label]) => (
                      <div
                        key={label}
                        className="grid grid-cols-[1fr_auto] items-center gap-5"
                      >
                        <p className="text-6xl font-medium sm:text-9xl">
                          {number}
                        </p>
                        <div className="flex">
                          <p className="text-xs text-foreground-200 md:text-base">
                            {label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {tab.values && (
                <>
                  <div className="mt-[48px] overflow-hidden rounded-2xl bg-background-level-1 shadow-[0_0_0_1px_var(--border-100)]">
                    {tab.values.map(([number, title, text]) => (
                      <div
                        key={title}
                        className="grid min-h-36 grid-cols-[1fr_auto] gap-4 border-b border-(--border-100) p-[var(--card-padding)] last:border-none"
                      >
                        <div className="flex flex-col gap-2">
                          <h3 className="text-2xl font-medium">{title}</h3>
                          <p className="text-sm font-light text-foreground-200">
                            {text}
                          </p>
                        </div>
                        <p className="text-5xl">{number}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {tab.roles && (
                <div className="relative">
                  <div className="absolute top-0 flex w-full justify-center">
                    <p className="text-foreground/90 text-5xl font-bold">
                      {t('about_intro.sections.team.eyebrow')}
                    </p>
                  </div>
                  <div className="relative h-[360px] overflow-hidden sm:h-[520px]">
                    <Image
                      src={tab.image}
                      alt="HAGX team"
                      fill
                      sizes="(min-width: 1024px) 51vw, 100vw"
                      className="object-cover opacity-75"
                    />
                  </div>
                  <div className="absolute bottom-2 flex w-full flex-wrap justify-center gap-2">
                    {tab.roles.map((role) => (
                      <span
                        key={role}
                        className="text-xs font-light text-foreground-200 uppercase"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tab.founders && (
                <div className="relative w-full overflow-hidden">
                  <div
                    className="relative top-0 z-30 mx-auto"
                    style={{ marginTop: 'var(--spacing-4' }}
                  >
                    <p
                      className="text-center text-5xl font-bold text-[#7c3400]"
                      style={{
                        WebkitTextStroke: '1px rgba(219, 88, 40, 0.55)',
                        textShadow:
                          '0 0 18px rgba(219,88,40,0.26), 0 12px 24px rgba(0,0,0,0.72)',
                      }}
                    >
                      {t('about_intro.sections.founders.heading')}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute top-12 left-1/2 h-[420px] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(219,88,40,0.72)_0%,rgba(142,68,0,0.38)_34%,rgba(8,8,8,0)_72%)] blur-sm" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
                  <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-px border-x border-accent-500/20 bg-accent-500/25">
                    {tab.founders.map((founder) => {
                      const founderName = t(
                        `about_intro.sections.founders.${founder.nameKey}`
                      );

                      return (
                        <div
                          key={founder.nameKey}
                          className="relative h-[440px] overflow-hidden sm:h-[560px]"
                        >
                          <Image
                            src={founder.image}
                            alt={founderName}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="z-10 object-cover object-top opacity-100"
                          />
                          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/8 to-transparent" />
                          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#050505] to-transparent" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#050505] to-transparent" />
                          <p className="absolute bottom-10 z-30 flex w-full justify-center text-xs text-foreground-200">
                            {founderName}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        />
      </section>
      <div className="Bleed_root">
        <div className="HomepageSeparator_shadow"></div>
        <div className="HomepageSeparator_keyline"></div>
      </div>
      {/* ── WHAT WE DO ── */}
      <HomeProcessSection
        items={hagxProcessSteps}
        header={
          <section className="PageSection_root utils_inset">
            <SectionHeader
              heading={t('whatwedo.title')
                .split('\n')
                .map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
              description={t('whatwedo.desc')}
            />
          </section>
        }
      />
      {/* ── SCOPE OF WORKS ── */}
      <section className="PageSection_root">
        <HomeScopeSection items={hagxScopeItems} />
      </section>
      <div className="Bleed_root">
        <div className="HomepageSeparator_shadow"></div>
        <div className="HomepageSeparator_keyline"></div>
      </div>
      {/* ── STRATEGY ── */}
      <section className="PageSection_root PageSection_root_reverse utils_inset">
        <SectionHeader
          heading={t('strategy.title').split('\n').map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
          description={t('strategy.desc')}
        />
        <StrategySection pillars={hagxStrategyPillars} />
      </section>
      <div className="Bleed_root">
        <div className="HomepageSeparator_shadow"></div>
        <div className="HomepageSeparator_keyline"></div>
      </div>{' '}
      {/* ── LATEST PROJECTS ── */}
      <HomePortfolioSection portfolio={portfolio} />
      <div className="Bleed_root">
        <div className="HomepageSeparator_shadow"></div>
        <div className="HomepageSeparator_keyline"></div>
      </div>
      {/* ── TRUSTED PARTNERSHIP + CLIENT MARQUEE ── */}
      <section className="PageSection_root">
        <SectionHeader
          heading={t('partnership.title')
            .split('\n')
            .map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
        />
        <HomeTestimonialsSection itemsTh={reviewsTh} itemsEn={reviewsEn} />
      </section>
      {/* ── BRAND MARQUEE ── */}
      <section aria-label="HAGX material partners" className="mt-10 mb-10">
        <TextMarquee items={hagxBrands} />
      </section>
      {/* ── CTA ── */}
      <CtaSection
        eyebrow={t('cta.eyebrow')}
        title={t('cta.title')}
        description={t('cta.desc')}
        primaryAction={{ href: '/contact', label: t('cta.button') }}
        secondaryAction={{ href: '/shop', label: 'ดูวัสดุ' }}
      />
    </>
  );
}

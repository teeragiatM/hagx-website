"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from '@/components/PageHero';
import {
  ScrollStackSection,
  type ScrollStackDataItem,
} from '@/components/ui/scroll-stack';
import {
  ScrollTimeline,
  type TimelineItem,
} from '@/components/ui/scroll-timeline';
import SectionHeader from '@/components/SectionHeader';
import { StatsGrid } from '@/components/ui/stats-grid';
import { hagxStats } from '@/content/hagx';
import { useI18n } from '@/i18n/useI18n';
import Image from 'next/image';
type JourneyCopy = {
  n: string;
  year?: string;
  phase: string;
  title: string;
  body: string[];
};

type ValueItem = {
  n: string;
  title: string;
  subtitle: string;
  description: string;
};

const journeyImages = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1100&q=85',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1100&q=85',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1100&q=85',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1100&q=85',
];

const valueIcons = [
  <svg key="experience" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <rect
      x="10"
      y="10"
      width="60"
      height="60"
      rx="4"
      stroke="#DB5828"
      strokeWidth="2"
      fill="rgba(255,138,0,0.08)"
    />
    <path
      d="M25 55 L40 20 L55 55"
      stroke="#DB5828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 43 H50"
      stroke="#DB5828"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  <svg
    key="accountability"
    viewBox="0 0 80 80"
    fill="none"
    className="h-16 w-16"
  >
    <circle
      cx="40"
      cy="40"
      r="28"
      stroke="#DB5828"
      strokeWidth="2"
      fill="rgba(255,138,0,0.08)"
    />
    <path
      d="M40 22 V40 L52 48"
      stroke="#DB5828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="precision" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <rect
      x="12"
      y="28"
      width="56"
      height="36"
      rx="3"
      stroke="#DB5828"
      strokeWidth="2"
      fill="rgba(255,138,0,0.08)"
    />
    <path
      d="M28 28 V20 Q28 12 40 12 Q52 12 52 20 V28"
      stroke="#DB5828"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="40"
      cy="46"
      r="6"
      stroke="#DB5828"
      strokeWidth="2"
      fill="rgba(255,138,0,0.2)"
    />
  </svg>,
  <svg key="innovation" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <path
      d="M14 40 L32 58 L66 24"
      stroke="#DB5828"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="40"
      cy="40"
      r="28"
      stroke="#DB5828"
      strokeWidth="1.5"
      fill="rgba(255,138,0,0.06)"
      strokeDasharray="4 3"
    />
  </svg>,
];

export default function AboutPage() {
  const { t, lang } = useI18n('about');
  const clients = t('hero.clients', {
    returnObjects: true,
  }) as unknown as string[];
  const journeyCopy = t('journey', {
    returnObjects: true,
  }) as unknown as JourneyCopy[];
  const values = t('values.items', {
    returnObjects: true,
  }) as unknown as ValueItem[];
  const stats = hagxStats.map((stat) => ({
    value: stat.n,
    label: lang === 'th' ? stat.labelTh : stat.labelEn,
    description: lang === 'th' ? stat.sub : stat.subEn,
  }));
  const dummyYears = ['2006', '2012', '2018', '2024'];
  const journey = journeyCopy.map((item, index) => ({
    ...item,
    year: item.year || dummyYears[index],
    image: journeyImages[index] ?? journeyImages[0],
  }));

  return (
    <>
      <div>
        <PageHero
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          titleAlt={t('hero.title_alt')}
          subtitle={t('hero.subtitle')}
          bottomSlot={
            <div className="text-center">
              <div className="mb-5">
                <p className="text-xs font-light uppercase">
                  {t('hero.trusted')}
                </p>{' '}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="text-xs font-light tracking-widest text-foreground-400 uppercase"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          }
        />

        <section className="PageSection_root">
          <StatsGrid items={stats} />
        </section>

        <section className="PageSection_root">
          <SectionHeader
            heading={t('journey_header.heading')}
            description={t('journey_header.description')}
          />
          <ScrollTimeline items={journey} />
        </section>

        <section className="PageSection_root">
          <SectionHeader
            heading={t('statement.heading')}
            description={t('statement.description')}
          />
          <div className="mx-auto mt-10 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#DB5828]/60 to-transparent" />
        </section>

        <ScrollStackSection
          header={
            <SectionHeader
              heading={t('values.title')}
              description={t('values.description')}
            />
          }
          items={values.map((value, index) => ({
            id: value.n,
            number: value.n,
            title: value.title,
            subtitle: value.subtitle,
            description: value.description,
            icon: valueIcons[index],
          }))}
        />

        {/* ── OUR PEOPLE ── */}
        <section className="PageSection_root">
          {/* FOUNDERS */}
          <SectionHeader
            heading={t('people.founders.heading')}
            description={t('people.founders.description')}
          />

          <div className="mt-10 grid gap-px border border-accent-500/20 bg-accent-500/20 sm:grid-cols-2">
            {/* Founder 1 */}
            <div className="group relative h-[480px] overflow-hidden bg-[#0a0a0a] sm:h-[580px]">
              <Image
                src="/images/team/Panya_Sukyoo.png"
                alt={t('people.founders.panya_name')}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 z-10 p-6 sm:p-8">
                <p className="mb-1 text-xs font-light tracking-widest text-accent-600 uppercase">
                  {t('people.founders.panya_role')}
                </p>
                <p className="text-lg font-light text-foreground-100">
                  {t('people.founders.panya_name')}
                </p>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="group relative h-[480px] overflow-hidden bg-[#0a0a0a] sm:h-[580px]">
              <Image
                src="/images/team/Chanyanat.png"
                alt={t('people.founders.chanyanat_name')}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 z-10 p-6 sm:p-8">
                <p className="mb-1 text-xs font-light tracking-widest text-accent-600">
                  {t('people.founders.chanyanat_role')}
                </p>
                <p className="text-lg font-light text-foreground-100">
                  {t('people.founders.chanyanat_name')}
                </p>
              </div>
            </div>
          </div>

          {/* TEAM */}
          <div className="mt-20 lg:mt-28">
            <SectionHeader
              heading={t('people.team.heading')}
              description={t('people.team.description')}
            />
            <div className="relative mt-10 h-[320px] overflow-hidden border border-accent-500/20 sm:h-[440px] lg:h-[560px]">
              <Image
                src="/images/team/hagx_team.png"
                alt="HAGX Team"
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
            </div>
          </div>
        </section>
        <CtaSection
          eyebrow={t('cta.eyebrow')}
          title={t('cta.title')}
          description={t('cta.description')}
          primaryAction={{ href: '/contact', label: t('cta.primary') }}
          secondaryAction={{ href: '/portfolio', label: t('cta.secondary') }}
        />
      </div>
    </>
  );
}

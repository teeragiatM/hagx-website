"use client";

import CTA from '@sections/CTA';
import AboutStickySection from '@sections/AboutStickySection';
import StrategySection from '@sections/StrategySection';
import PageHero from '@layout/PageHero';
import { ScrollTimeline } from '@ui/scroll-timeline';
import SectionHeader from '@layout/SectionHeader';
import { StatsGrid } from '@ui/stats-grid';
import { Marquee } from '@ui/Marquee';
import { hagxStats, hagxBrands, hagxStrategyPillars } from '@/content/hagx';
import { useI18n } from '@/i18n/useI18n';
import Image from 'next/image';
import { PageSection } from '@/components/layout';

type JourneyCopy = {
  n: string;
  year?: string;
  phase: string;
  title: string;
  body: string[];
};

const journeyImages = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1100&q=85',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1100&q=85',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1100&q=85',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1100&q=85',
];

const workshopImages = [
  {
    src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80',
    labelEn: 'Fabrication',
    labelTh: 'การผลิต',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80',
    labelEn: 'Inspection',
    labelTh: 'การตรวจสอบ',
  },
  {
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80',
    labelEn: 'Installation',
    labelTh: 'การติดตั้ง',
  },
  {
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=80',
    labelEn: 'Technical Drawing',
    labelTh: 'แบบทางเทคนิค',
  },
];

export default function AboutPage() {
  const { t, lang } = useI18n('about');
  const clients = t('hero.clients', {
    returnObjects: true,
  }) as unknown as string[];
  const journeyCopy = t('journey', {
    returnObjects: true,
  }) as unknown as JourneyCopy[];

  const stats = hagxStats.map((stat) => ({
    value: stat.n,
    label: lang === 'th' ? stat.labelTh : stat.labelEn,
    description: lang === 'th' ? stat.sub : stat.subEn,
  }));

  const journey = journeyCopy.map((item, index) => ({
    ...item,
    year: item.year || ['2014', '2018', '2021', '2026'][index],
    image: journeyImages[index] ?? journeyImages[0],
  }));

  return (
    <div>
      {/* 1. HERO */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        titleAlt={t('hero.title_alt')}
        subtitle={t('hero.subtitle')}
        bottomSlot={
          <div className="text-center">
            <p className="mb-5 text-xs font-light uppercase">
              {t('hero.trusted')}
            </p>
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
      {/* 3. ABOUT STICKY — เราคือใคร / Vision / Values / Positioning */}
      <AboutStickySection />

      {/* 2. STRATEGY — three circles */}
      <PageSection>
        <SectionHeader
          heading={lang === 'th' ? 'กลยุทธ์ของเรา' : 'Our Strategy'}
          description={lang === 'th' ? 'สามเสาหลักที่ขับเคลื่อน HAGX' : 'Three pillars that drive HAGX forward'}
        />
        <div className="mt-12">
          <StrategySection pillars={hagxStrategyPillars} />
        </div>
      </PageSection>

      {/* 4. FOUNDERS & TEAM */}
      <PageSection>
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
              <p className="mb-1 text-xs font-light tracking-widest text-accent-500 uppercase">
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
              <p className="mb-1 text-xs font-light tracking-widest text-accent-500 uppercase">
                {t('people.founders.chanyanat_role')}
              </p>
              <p className="text-lg font-light text-foreground-100">
                {t('people.founders.chanyanat_name')}
              </p>
            </div>
          </div>
        </div>

        {/* Team photo */}
        <div className="mt-16">
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
      </PageSection>

      {/* 5. COMPANY TIMELINE */}
      <PageSection>
        <SectionHeader
          heading={t('journey_header.heading')}
          description={t('journey_header.description')}
        />
        <ScrollTimeline items={journey} />
      </PageSection>

      {/* 6. OUR APPROACH / CAPABILITIES */}
      <PageSection>
        <SectionHeader
          heading={
            lang === 'th'
              ? 'แนวทางและความสามารถของเรา'
              : 'Our Approach & Capabilities'
          }
          description={
            lang === 'th'
              ? 'สิ่งที่ทำให้ HAGX แตกต่าง — จากกระบวนการผลิต ไปจนถึงการส่งมอบงานที่สมบูรณ์'
              : 'What sets HAGX apart — from how we fabricate to how we deliver.'
          }
        />
        <div className="mt-12 grid gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2">
          {[
            {
              n: '01',
              titleEn: 'Precision in Every Detail',
              titleTh: 'ความแม่นยำในทุกรายละเอียด',
              descEn:
                'Every component is measured, cut, and inspected at millimetre tolerance before it leaves our factory. No shortcuts — because a 1 mm error on site costs 10× to fix.',
              descTh:
                'ทุกชิ้นส่วนถูกวัด ตัด และตรวจสอบในระดับความละเอียดมิลลิเมตรก่อนออกจากโรงงาน เพราะข้อผิดพลาด 1 มม. ในงานจริงมีต้นทุนมากกว่า 10 เท่าในการแก้ไข',
            },
            {
              n: '02',
              titleEn: 'Integrated Engineering',
              titleTh: 'วิศวกรรมแบบบูรณาการ',
              descEn:
                'We provide complimentary Shop Drawing services for every project — translating architectural intent into precise installation plans that the site team can execute without ambiguity.',
              descTh:
                'เราจัดทำ Shop Drawing ให้ฟรีในทุกโครงการ — แปลงแนวคิดสถาปัตยกรรมให้เป็นแผนติดตั้งที่ชัดเจนสำหรับทีมหน้างาน',
            },
            {
              n: '03',
              titleEn: 'Internal Installation Team',
              titleTh: 'ทีมติดตั้งของตัวเอง',
              descEn:
                'Our installers are trained in-house, not outsourced. They understand HAGX tolerances, handle our own products, and are accountable to the same quality standard as the factory.',
              descTh:
                'ช่างติดตั้งของเราได้รับการฝึกจากภายในองค์กร ไม่ใช่รับเหมาช่วง พวกเขาเข้าใจมาตรฐาน HAGX และรับผิดชอบตามมาตรฐานเดียวกับโรงงาน',
            },
            {
              n: '04',
              titleEn: 'End-to-End Execution',
              titleTh: 'ดูแลครบจบทุกขั้นตอน',
              descEn:
                'One point of contact. From site survey and design consultation through fabrication, delivery, installation, and post-handover warranty — we own the entire process.',
              descTh:
                'ผู้ประสานงานเพียงคนเดียว ตั้งแต่สำรวจพื้นที่ ให้คำปรึกษาด้านดีไซน์ ผลิต ส่ง ติดตั้ง จนถึงการรับประกันหลังส่งมอบ — เราดูแลทุกขั้นตอน',
            },
          ].map((item, i) => (
            <div
              key={item.n}
              className="group relative overflow-hidden bg-[#0a0908] p-8 sm:p-10 lg:p-14"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(219,88,40,0.12),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[10px] font-light tracking-widest text-accent-500 uppercase">
                    {lang === 'th' ? 'ความสามารถ' : 'Capability'} {item.n}
                  </p>
                  <p className="text-5xl leading-none font-light text-foreground-400/30 sm:text-6xl">
                    {item.n}
                  </p>
                </div>
                <div className="h-px w-8 bg-accent-500/50" />
                <h3 className="text-2xl leading-snug font-medium text-foreground-100 sm:text-3xl">
                  {lang === 'th' ? item.titleTh : item.titleEn}
                </h3>
                <p className="text-sm leading-8 font-light text-foreground-300">
                  {lang === 'th' ? item.descTh : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* 7. TRUSTED BY — light */}

      <section className="py-16">
        <p className="mb-8 text-center text-xs font-light tracking-widest text-foreground-400 uppercase">
          {t('hero.trusted')}
        </p>
        <Marquee speed={28} gap={80} className="relative overflow-hidden">
          {hagxBrands.map((brand, i) => (
            <Marquee.Item key={`${brand}-${i}`}>
              <span className="text-xs font-light tracking-widest whitespace-nowrap text-foreground-300 uppercase">
                {brand}
              </span>
            </Marquee.Item>
          ))}
        </Marquee>
      </section>

      {/* 7. WORKSHOP / OPERATIONS VISUALS */}
      <PageSection>
        <SectionHeader
          heading={lang === 'th' ? 'การทำงานของเรา' : 'Workshop & Operations'}
          description={
            lang === 'th'
              ? 'ทุกงานผ่านกระบวนการผลิต ตรวจสอบ และติดตั้งภายใต้มาตรฐาน HAGX'
              : 'Every project passes through HAGX fabrication, inspection, and installation — under one standard.'
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-px bg-border-100 lg:grid-cols-4">
          {workshopImages.map((img) => (
            <div
              key={img.labelEn}
              className="group relative aspect-[3/4] overflow-hidden bg-background-100"
            >
              <Image
                src={img.src}
                alt={lang === 'th' ? img.labelTh : img.labelEn}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 50vw"
                className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.04] group-hover:opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/10 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xs font-light tracking-widest text-foreground-300 uppercase">
                {lang === 'th' ? img.labelTh : img.labelEn}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* 8. CTA */}
      <CTA
        eyebrow={t('cta.eyebrow')}
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ href: '/contact', label: t('cta.primary') }}
        secondaryAction={{ href: '/portfolio', label: t('cta.secondary') }}
      />
    </div>
  );
}

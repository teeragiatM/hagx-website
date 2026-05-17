﻿"use client";

import CTA from '@sections/CTA';
import { BorderGrid, BorderGridCell } from '@ui/BorderGrid';
import ScopeOfWorks, { type ScopeCategory } from '@sections/ScopeOfWorks';
import SectionHeader from '@layout/SectionHeader';
import { CarouselRoot, CarouselHeader, CarouselGrid, CarouselNav } from '@ui/Carousel';
import { MediaCard, MediaCardImage, MediaCardBody, MediaCardNumber, MediaCardTitle, MediaCardExcerpt } from '@ui/MediaCard';
import { useI18n } from '@/i18n/useI18n';
import { ShieldCheck, PencilRuler, Handshake } from 'lucide-react';
import { PageSection, PageHero } from '@layout';

type ExpertiseTrack = {
  n: string;
  eyebrow: string;
  title: string;
  desc: string;
};

type ServiceItem = { n: string; title: string; desc: string; image: string };

type CarouselContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ title: string; desc: string }>;
  ctaPrimary: string;
  ctaSecondary: string;
};

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <MediaCard animate={false} className="min-h-[500px]">
      <MediaCardImage
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw"
        gradientFrom="#000"
      />
      <MediaCardBody className="absolute inset-x-0 bottom-0 bg-transparent">
        <MediaCardNumber>{item.n}</MediaCardNumber>
        <MediaCardTitle className="max-w-[15rem] text-2xl font-light group-hover:text-foreground-100">
          {item.title}
        </MediaCardTitle>
        <MediaCardExcerpt className="mb-0">{item.desc}</MediaCardExcerpt>
      </MediaCardBody>
    </MediaCard>
  );
}

const serviceImages = {
  installation: [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=80',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80',
  ],
  manufacturing: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=80',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80',
    'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1000&q=80',
  ],
  supply: [
    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1000&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80',
  ],
};

const itemNumbers = ['01', '02', '03', '04'];

function buildItems(
  items: CarouselContent['items'],
  images: string[]
): ServiceItem[] {
  return items.map((item, index) => ({
    n: itemNumbers[index] ?? String(index + 1).padStart(2, '0'),
    title: item.title,
    desc: item.desc,
    image: images[index] ?? images[0],
  }));
}

const whyUsItems = [
  {
    icon: ShieldCheck,
    titleTh: 'Beyond Warranty',
    titleEn: 'Beyond Warranty',
    descTh:
      'เราไม่ได้แค่ติดตั้งแล้วจบ แต่เราดูแลตลอดอายุการใช้งานด้วยทีม Maintenance เฉพาะทาง',
    descEn:
      "We don't just install and leave. We provide lifetime care with our specialized maintenance team.",
  },
  {
    icon: PencilRuler,
    titleTh: 'Integrated Engineering',
    titleEn: 'Integrated Engineering',
    descTh:
      "เราเปลี่ยนจาก 'การขายวัสดุ' เป็น 'การมอบโซลูชัน' ด้วยบริการออกแบบ Shop Drawing ฟรีสำหรับลูกค้าของเรา",
    descEn:
      "Transitioning from 'selling materials' to 'providing solutions' with complimentary Shop Drawing services for our clients.",
  },
  {
    icon: Handshake,
    titleTh: 'Partner Ecosystem',
    titleEn: 'Partner Ecosystem',
    descTh:
      'เรามีเครือข่ายผู้รับเหมาที่แข็งแกร่งในพื้นที่ เพื่อให้การทำงานร่วมกับโครงสร้างหลักเป็นไปได้อย่างไร้รอยต่อ',
    descEn:
      'A robust local contractor network ensures seamless integration with the primary project structure.',
  },
];

export default function ServicesPage() {
  const { t, lang } = useI18n('services');
  const expertiseTracks = t('expertise.tracks', {
    returnObjects: true,
  }) as unknown as ExpertiseTrack[];
  const installation = t('carousels.installation', {
    returnObjects: true,
  }) as unknown as CarouselContent;
  const manufacturing = t('carousels.manufacturing', {
    returnObjects: true,
  }) as unknown as CarouselContent;
  const supply = t('carousels.supply', {
    returnObjects: true,
  }) as unknown as CarouselContent;

  const scopeOfWorks = {
    eyebrow: t('scope_of_works.eyebrow'),
    subtitle: t('scope_of_works.subtitle'),
    footer: t('scope_of_works.footer'),
    categories: t('scope_of_works.categories', {
      returnObjects: true,
    }) as unknown as ScopeCategory[],
  };

  return (
    <div>
      {/* 1. HERO */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        minHeight="70vh"
      />

      {/* 2. SCOPE OF WORKS — 3 service tracks */}
      <PageSection>
        <SectionHeader
          heading={t('expertise.heading')}
          description={t('expertise.description')}
        />
        <BorderGrid cols={3} borderColor="rgba(255,255,255,0.08)">
          {expertiseTracks.map((track, index) => (
            <BorderGridCell
              key={track.n}
              index={index}
              bg={index === 0 ? '#120d08' : '#0c0c0c'}
              glow="radial-gradient(ellipse 70% 55% at 80% 15%, rgba(255,138,0,0.16), transparent 64%)"
              className="px-7 py-9 sm:px-10 sm:py-12"
            >
              <div className="mb-8 flex items-center justify-between gap-5">
                <p className="text-xs font-light tracking-widest text-accent-500 uppercase">
                  {track.eyebrow}
                </p>
                <p className="text-4xl font-light text-foreground-400">
                  {track.n}
                </p>
              </div>
              <h3 className="text-2xl leading-tight font-light text-foreground-100 sm:text-3xl">
                {track.title}
              </h3>
              <p className="mt-5 text-sm leading-8 font-light text-foreground-300">
                {track.desc}
              </p>
            </BorderGridCell>
          ))}
        </BorderGrid>
      </PageSection>

      {/* 3. รายละเอียดงานแต่ละประเภท */}
      {[
        { content: installation, images: serviceImages.installation, cta1: { href: '/contact', label: installation.ctaPrimary }, cta2: { href: '/portfolio', label: installation.ctaSecondary } },
        { content: manufacturing, images: serviceImages.manufacturing, cta1: { href: '/contact', label: manufacturing.ctaPrimary }, cta2: { href: '/portfolio', label: manufacturing.ctaSecondary } },
        { content: supply, images: serviceImages.supply, cta1: { href: '/shop', label: supply.ctaPrimary }, cta2: { href: '/contact', label: supply.ctaSecondary } },
      ].map(({ content, images, cta1, cta2 }) => {
        const serviceItems = buildItems(content.items, images);
        const carouselItems = serviceItems.map((s) => ({ n: s.n }));
        return (
          <PageSection key={content.title}>
            <div className="px-(--homepage-padding-inset)">
              <CarouselHeader eyebrow={content.eyebrow} title={content.title} description={content.description} />
              <CarouselRoot items={carouselItems} visibleCount={3}>
                <CarouselGrid renderCard={(_, __, globalIdx) => <ServiceCard item={serviceItems[globalIdx]} />} />
                <CarouselNav ctaPrimary={cta1} ctaSecondary={cta2} showDots={false} />
              </CarouselRoot>
            </div>
          </PageSection>
        );
      })}

      {/* 4. ขอบเขตงานติดตั้งโดยละเอียด (01-04) */}
      <ScopeOfWorks
        eyebrow={scopeOfWorks.eyebrow}
        subtitle={scopeOfWorks.subtitle}
        footer={scopeOfWorks.footer}
        categories={scopeOfWorks.categories}
      />

      {/* 5. ทำไมเลือกเรา */}
      <PageSection>
        <SectionHeader
          heading={
            lang === 'th'
              ? 'ทำไมสถาปนิกและเจ้าของโครงการระดับ High-end ถึงไว้วางใจ HAGX?'
              : 'Why Leading Architects & High-end Owners Trust HAGX'
          }
          className="mb-16"
        />

        <BorderGrid cols={3} borderColor="rgba(219, 88, 40, 0.15)">
          {whyUsItems.map((item, index) => (
            <BorderGridCell
              key={index}
              index={index}
              bg="#0a0a0a"
              glow="radial-gradient(ellipse 80% 50% at 50% 0%, rgba(219, 88, 40, 0.15), transparent 70%)"
              className="group"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-500/20">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 text-xl font-light tracking-tight text-foreground-100 sm:text-2xl">
                {lang === 'th' ? item.titleTh : item.titleEn}
              </h3>
              <p className="text-sm leading-relaxed font-light text-foreground-300">
                {lang === 'th' ? item.descTh : item.descEn}
              </p>
              <div className="mt-10 h-px w-full bg-gradient-to-r from-[#DB5828]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </BorderGridCell>
          ))}
        </BorderGrid>
      </PageSection>

      {/* 5. CTA */}
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

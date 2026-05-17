"use client";

import CTA from '@sections/CTA';
import { PageHero, PageSection, SectionHeader } from "@layout";
import { Marquee, type MarqueeItem } from "@ui/Marquee";
import { CarouselRoot, CarouselGrid, TestimonialCard } from "@ui";
import { Preloader } from "@ui/Preloader";
import { useI18n } from "@/i18n/useI18n";
import { useState } from "react";
import type { TestimonialItem as TestimonialCarouselItem } from "@ui";

type StoryItem = {
  client: string;
  project: string;
  scope: string;
  quote: string;
  slug?: string;
};

function ProjectCard({ item, imgSrc, isFocus }: { item: StoryItem; imgSrc: string; isFocus?: boolean }) {
  return (
    <a
      href={item.slug ? `/portfolio/${item.slug}` : '/portfolio'}
      className={`group flex h-full flex-col overflow-hidden border bg-[#0a0908] transition-all duration-300 ${
        isFocus ? 'border-accent-500/40' : 'border-white/[0.06]'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.project}
          className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-[1.04] group-hover:opacity-70"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/40 to-transparent" />
        <p className="absolute top-4 left-4 text-[10px] font-light tracking-widest text-accent-500 uppercase">
          {item.scope}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-medium text-foreground-100">{item.client}</h3>
        <p className="mt-1 text-sm font-light text-foreground-300">{item.project}</p>
        <div className="mt-4 h-px w-full bg-white/[0.06]" />
        <p className="mt-4 line-clamp-3 flex-1 text-xs font-light leading-6 text-foreground-400">"{item.quote}"</p>
        <p className="mt-5 text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors group-hover:text-accent-500">
          ดูโปรเจกต์ →
        </p>
      </div>
    </a>
  );
}

const INDUSTRY_GROUPS: { id: string; labelEn: string; labelTh: string; ids: string[] }[] = [
  { id: 'residential', labelEn: 'Residential Development', labelTh: 'อสังหาริมทรัพย์', ids: ['mqdc', 'sansiri', 'origin', 'ap'] },
  { id: 'hospitality', labelEn: 'Hospitality', labelTh: 'โรงแรม', ids: ['dusit', 'minor', 'marriott', 'hilton'] },
  { id: 'retail', labelEn: 'Retail & Commercial', labelTh: 'ค้าปลีก', ids: ['cpn', 'tcc'] },
  { id: 'corporate', labelEn: 'Corporate & Office', labelTh: 'สำนักงาน', ids: ['aia', 'true', 'bdms'] },
  { id: 'industrial', labelEn: 'Industrial & Energy', labelTh: 'อุตสาหกรรม', ids: ['scg', 'ptt', 'egco'] },
];

const projectImages: Record<string, string> = {
  mqdc: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  dusit: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  cpn: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  origin: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80',
  ptt: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  aia: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
};

type Props = {
  reviewsTh: TestimonialCarouselItem[];
  reviewsEn: TestimonialCarouselItem[];
};

export default function ClientsPageClient({ reviewsTh, reviewsEn }: Props) {
  const [mounted, setMounted] = useState(typeof window !== 'undefined');
  const [activeIndustry, setActiveIndustry] = useState("all");

  const { t, lang } = useI18n("clients");
  const clients = t("clients", { returnObjects: true }) as unknown as MarqueeItem[];
  const stories = t("stories.items", { returnObjects: true }) as unknown as StoryItem[];
  const reviews = lang === "th" ? reviewsTh : reviewsEn;

  const columns = 5;
  const columnSpeeds = [38, 44, 36, 50, 42];
  const colItems = Array.from({ length: columns }, (_, colIdx) => {
    const perCol = Math.max(6, Math.ceil(clients.length / columns) + 4);
    const start = Math.floor((colIdx * clients.length) / columns);
    return Array.from({ length: perCol }, (_, i) => clients[(start + i) % clients.length]);
  });

  const activeGroup = INDUSTRY_GROUPS.find((g) => g.id === activeIndustry);
  const visibleClients = activeIndustry === "all"
    ? clients
    : clients.filter((c) => activeGroup?.ids.includes(c.id as string));

  return (
    <div>
      {/* 1. HERO */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title')}
            <br />
            <span className="text-accent-500">{t('hero.title_accent')}</span>
          </>
        }
        subtitle={t('hero.subtitle')}
        backgroundSlot={
          mounted ? (
            <div className="flex h-full gap-3 px-3">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div key={colIdx} className="h-full flex-1">
                  <Marquee
                    orientation="vertical"
                    direction={colIdx % 2 === 1 ? "down" : "up"}
                    speed={columnSpeeds[colIdx] ?? 40}
                    gap={12}
                    className="h-full"
                  >
                    {colItems[colIdx].map((client, i) => (
                      <Marquee.Item key={`${client.id}-${i}`}>
                        <div className="flex h-20 shrink-0 items-center justify-center border border-accent-500/20 bg-[#0c0c0c] px-6 transition-colors hover:border-accent-500/50">
                          {client.logo ? (
                            <img src={client.logo} alt={client.label} className="h-8 max-w-[80px] object-contain opacity-60" />
                          ) : (
                            <div className="text-center">
                              <p className="text-sm font-semibold tracking-wide text-foreground-300">{client.label}</p>
                              {client.sub && (
                                <p className="mt-1 text-[10px] font-light tracking-widest text-foreground-500 uppercase">{client.sub}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </Marquee.Item>
                    ))}
                  </Marquee>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center"><Preloader.Logo /></div>
          )
        }
      />

      {/* 2. TRUST / POSITIONING INTRO */}
      <PageSection>
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs font-light tracking-widest text-accent-500 uppercase">
            {lang === 'th' ? 'พาร์ทเนอร์ของเรา' : 'Our Partners'}
          </p>
          <p className="text-xl font-light leading-9 text-foreground-200 sm:text-2xl">
            {lang === 'th'
              ? 'ตลอดระยะเวลาการดำเนินงาน HAGX ได้ร่วมงานกับผู้พัฒนาโครงการ สตูดิโอสถาปัตยกรรม และองค์กรชั้นนำในหลากหลายอุตสาหกรรม โดยมุ่งเน้นการส่งมอบงานที่ได้มาตรฐานสูงและตอบโจทย์การใช้งานจริงในทุกโครงการ'
              : 'Throughout its operations, HAGX has worked with leading developers, architecture studios, and major organisations across multiple industries — focused on delivering high-standard work that meets the real demands of every project.'}
          </p>
        </div>
      </PageSection>

      {/* 3. FEATURED COLLABORATIONS — carousel */}
      {stories.length > 0 && (
        <PageSection>
          <SectionHeader
            heading={lang === 'th' ? 'ผลงานความร่วมมือ' : 'Featured Collaborations'}
            description={lang === 'th'
              ? 'โครงการคัดสรรที่สะท้อนความไว้วางใจจากองค์กรชั้นนำ'
              : 'Selected engagements reflecting trust from industry-leading organisations.'}
          />
          <div className="mt-10">
            {(() => {
              const items = stories.map((_, i) => ({ n: String(i) }));
              const visibleCount = Math.min(3, stories.length);
              const centerIdx = Math.floor(visibleCount / 2);
              return (
                <CarouselRoot items={items} visibleCount={visibleCount} loop autoPlay intervalMs={5000}>
                  <CarouselGrid
                    renderCard={(_, localIdx, globalIdx) => {
                      const story = stories[globalIdx];
                      const clientId = clients.find(
                        (c) => c.label?.toLowerCase() === story.client.toLowerCase().split(' ')[0].toLowerCase()
                      )?.id as string | undefined;
                      const imgSrc = projectImages[clientId ?? ''] ?? projectImages.mqdc;
                      return (
                        <ProjectCard
                          item={story}
                          imgSrc={imgSrc}
                          isFocus={localIdx === centerIdx}
                        />
                      );
                    }}
                  />
                </CarouselRoot>
              );
            })()}
          </div>
        </PageSection>
      )}

      {/* 4. INDUSTRIES WE SERVE */}
      <PageSection>
        <SectionHeader heading={lang === 'th' ? 'อุตสาหกรรมที่เราให้บริการ' : 'Industries We Serve'} />
        <nav className="mt-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveIndustry("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-light transition-colors ${activeIndustry === "all" ? "bg-foreground-100 text-[#0a0a0a]" : "border border-white/10 text-foreground-400 hover:text-foreground-100"}`}
          >
            {lang === 'th' ? 'ทั้งหมด' : 'All'}
          </button>
          {INDUSTRY_GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveIndustry(activeIndustry === group.id ? "all" : group.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-light transition-colors ${activeIndustry === group.id ? "bg-foreground-100 text-[#0a0a0a]" : "border border-white/10 text-foreground-400 hover:text-foreground-100"}`}
            >
              {lang === 'th' ? group.labelTh : group.labelEn}
            </button>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          {visibleClients.map((client) => (
            <div key={client.id} className="flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-3 transition-colors hover:border-white/[0.14]">
              <span className="text-sm font-medium text-foreground-200">{client.label}</span>
              {client.sub && (
                <span className="mt-0.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase">{client.sub}</span>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      {/* 5. CLIENT REVIEWS */}
      {reviews.length > 0 && (
        <PageSection>
          <SectionHeader
            heading={t('stories.title')}
            description={t('stories.description')}
          />
          {(() => {
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

      {/* 6. CTA */}
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

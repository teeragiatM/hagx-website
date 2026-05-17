'use client';

import { StickyFixed } from '@ui/sticky-fixed';
import { useI18n } from '@/i18n/useI18n';
import { hagxStats, hagxValues } from '@/content/hagx';
import { motion } from 'framer-motion';
import { Building2, Eye, Gem, Target } from 'lucide-react';
import Image from 'next/image';

type Tab = {
  id: string;
  labelEn: string;
  labelTh: string;
  image: string;
};

const tabs: Tab[] = [
  {
    id: 'who',
    labelEn: 'Who We Are',
    labelTh: 'เราคือใคร',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90',
  },
  {
    id: 'vision',
    labelEn: 'Vision',
    labelTh: 'วิสัยทัศน์',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=90',
  },
  {
    id: 'values',
    labelEn: 'Values',
    labelTh: 'คุณค่าเรา',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90',
  },
  {
    id: 'positioning',
    labelEn: 'Positioning',
    labelTh: 'จุดยืน',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=90',
  },
];

function getTabIcon(id: string) {
  if (id === 'who') return <Building2 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  if (id === 'vision') return <Eye className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  if (id === 'values') return <Gem className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  return <Target className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
}

export default function AboutStickySection() {
  const { t, lang } = useI18n('about');

  const values = hagxValues.map(({ n, title, titleTh, subEn, subTh }) => ({
    n,
    title: lang === 'th' ? titleTh : title,
    sub: lang === 'th' ? subTh : subEn,
  }));

  const clients = t('hero.clients', { returnObjects: true }) as unknown as string[];

  return (
    <StickyFixed mode="vertical" items={tabs} pinnedSide="left" id="about-detail">
      <StickyFixed.Pin>
        {({ activeIndex }) => {
          const activeTab = tabs[activeIndex];
          return (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-xs font-light tracking-widest text-accent-500 uppercase">
                  {lang === 'th' ? 'เกี่ยวกับ HAGX' : 'About HAGX'}
                </p>
                <h2 className="text-2xl font-medium md:text-4xl lg:text-5xl">
                  {t('intro.title').split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h2>
                <p className="text-sm font-light text-foreground-200">
                  {t('intro.body')}
                </p>
              </div>

              <StickyFixed.Nav aria-label="About sections">
                {tabs.map((tab, i) => (
                  <StickyFixed.NavItem key={tab.id} index={i}>
                    {getTabIcon(tab.id)}
                    {lang === 'th' ? tab.labelTh : tab.labelEn}
                  </StickyFixed.NavItem>
                ))}
              </StickyFixed.Nav>

              <motion.div
                key={activeTab.image}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[24vh] overflow-hidden"
              >
                <Image
                  src={activeTab.image}
                  alt={`${lang === 'th' ? activeTab.labelTh : activeTab.labelEn} - HAGX`}
                  fill
                  sizes="(min-width: 1024px) 49vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-[#080808]/10 to-transparent" />
              </motion.div>
            </>
          );
        }}
      </StickyFixed.Pin>

      <StickyFixed.Track>
        {/* TAB 1 — Who We Are */}
        <StickyFixed.Item key="who" index={0} item={tabs[0]}>
          <div className="flex flex-col gap-4">
            {hagxStats.map(({ n, labelTh, labelEn, sub, subEn }) => (
              <div key={n} className="grid grid-cols-[1fr_auto] items-end gap-5">
                <p className="latin text-6xl font-medium trim-both sm:text-9xl">{n}</p>
                <p className="text-right text-xs text-foreground-200 sm:text-xl lg:text-sm">
                  {lang === 'th' ? labelTh : labelEn}
                </p>
              </div>
            ))}
          </div>
        </StickyFixed.Item>

        {/* TAB 2 — Vision */}
        <StickyFixed.Item key="vision" index={1} item={tabs[1]}>
          <div className="flex flex-col gap-8">
            <p className="text-xs font-light tracking-widest text-accent-500 uppercase">
              {lang === 'th' ? 'วิสัยทัศน์ของเรา' : 'Our Vision'}
            </p>
            <h3 className="text-3xl font-light leading-snug text-foreground-100 sm:text-4xl lg:text-5xl">
              {t('statement.heading')}
            </h3>
            <div className="h-px w-16 bg-accent-500/60" />
            <p className="text-sm font-light leading-8 text-foreground-200">
              {t('statement.description')}
            </p>
            <p className="text-sm font-light leading-8 text-foreground-300">
              {t('hero.subtitle')}
            </p>
          </div>
        </StickyFixed.Item>

        {/* TAB 3 — Values */}
        <StickyFixed.Item key="values" index={2} item={tabs[2]}>
          <div className="mt-4 overflow-hidden rounded-2xl bg-background-level-1 shadow-[0_0_0_1px_var(--border-100)]">
            {values.map(({ n, title, sub }) => (
              <div
                key={n}
                className="grid min-h-28 grid-cols-[1fr_auto] items-center gap-4 border-b border-(--border-100) p-(--card-padding) last:border-none"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-medium text-foreground-100">{title}</p>
                  <p className="text-xs font-light text-foreground-300">{sub}</p>
                </div>
                <p className="text-4xl font-light text-foreground-400">{n}</p>
              </div>
            ))}
          </div>
        </StickyFixed.Item>

        {/* TAB 4 — Positioning */}
        <StickyFixed.Item key="positioning" index={3} item={tabs[3]}>
          <div className="flex flex-col gap-8">
            <p className="text-xs font-light tracking-widest text-accent-500 uppercase">
              {lang === 'th' ? 'เราทำงานกับใคร' : 'Who We Work With'}
            </p>
            <div className="flex flex-wrap gap-3">
              {clients.map((client) => (
                <span
                  key={client}
                  className="rounded-full border border-border-100 px-4 py-1.5 text-xs font-light text-foreground-200"
                >
                  {client}
                </span>
              ))}
            </div>
            <div className="h-px w-full bg-border-100" />
            <p className="text-xs font-light tracking-widest text-accent-500 uppercase">
              {lang === 'th' ? 'มาตรฐานที่เราวาง' : 'Our Standard'}
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  en: 'Millimetre-level fabrication precision',
                  th: 'ความแม่นยำระดับมิลลิเมตรในการผลิต',
                },
                {
                  en: 'In-house factory — full quality control',
                  th: 'โรงงานของตัวเอง — ควบคุมคุณภาพทุกขั้นตอน',
                },
                {
                  en: 'End-to-end: design → supply → install → warranty',
                  th: 'ครบจบ: ออกแบบ → จัดหาวัสดุ → ติดตั้ง → รับประกัน',
                },
                {
                  en: 'Official distributor for leading material brands',
                  th: 'ตัวแทนจำหน่ายอย่างเป็นทางการของแบรนด์วัสดุชั้นนำ',
                },
              ].map((item) => (
                <div key={item.en} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  <p className="text-sm font-light text-foreground-200">
                    {lang === 'th' ? item.th : item.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </StickyFixed.Item>
      </StickyFixed.Track>
    </StickyFixed>
  );
}

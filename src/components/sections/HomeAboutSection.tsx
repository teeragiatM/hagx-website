'use client';

import { StickyFixed } from '@ui/sticky-fixed';
import { useI18n } from '@/i18n/useI18n';
import { hagxStats, hagxValues } from '@/content/hagx';
import { motion } from 'framer-motion';
import { Building2, Gem, Users, UserRound } from 'lucide-react';
import Image from 'next/image';

function getSectionKey(id: string) {
  if (id === 'who-we-are') return 'who';
  if (id === 'our-values') return 'values';
  if (id === 'our-team') return 'team';
  return 'founders';
}

function getSectionIcon(id: string) {
  if (id === 'who-we-are') return <Building2 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  if (id === 'our-values') return <Gem className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  if (id === 'our-team') return <Users className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
  return <UserRound className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />;
}

export default function HomeAboutSection() {
  const { t, lang } = useI18n();

  const tabs = [
    {
      id: 'who-we-are',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90',
      stats: hagxStats.map(({ n, labelTh, labelEn }) =>
        [n, lang === 'th' ? labelTh : labelEn] as const
      ),
    },
    {
      id: 'our-values',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90',
      values: hagxValues.map(({ n, title, titleTh, subTh, subEn }) =>
        [n, lang === 'th' ? titleTh : title, lang === 'th' ? subTh : subEn] as const
      ),
    },
    {
      id: 'our-team',
      image: '/images/team/hagx_team.png',
      roles: t('about_intro.sections.team.roles', { returnObjects: true }) as unknown as string[],
    },
    {
      id: 'founders',
      image: '/images/team/Panya_Sukyoo.png',
      founders: [
        { nameKey: 'panya_sukyoo_name', image: '/images/team/Panya_Sukyoo.png' },
        { nameKey: 'chanyanat_moopayak_name', image: '/images/team/Chanyanat.png' },
      ],
    },
  ];

  return (
    <section>
      <StickyFixed mode="vertical" items={tabs} pinnedSide="left" id="about">
        <StickyFixed.Pin>
          {({ activeIndex }) => {
            const activeTab = tabs[activeIndex];
            const activeKey = getSectionKey(activeTab.id);
            return (
              <>
                <div className="flex flex-col gap-5">
                  <h1 className="text-2xl font-medium md:text-4xl lg:text-5xl">
                    {t('about_intro.title')}
                  </h1>
                  <p className="text-sm text-foreground-200">
                    {t('about_intro.description')}
                  </p>
                </div>
                <StickyFixed.Nav aria-label="About sections">
                  {tabs.map((tab, i) => (
                    <StickyFixed.NavItem key={tab.id} index={i}>
                      {getSectionIcon(tab.id)}
                      {t(`about_intro.tabs.${getSectionKey(tab.id)}`)}
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
                    alt={`${t(`about_intro.tabs.${activeKey}`)} - HAGX`}
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
          {tabs.map((tab, i) => (
            <StickyFixed.Item key={tab.id} index={i} item={tab}>
              <>
                {tab.stats && (
                  <div className="flex flex-col gap-4">
                    {tab.stats.map(([number, label]) => (
                      <div key={label} className="grid grid-cols-[1fr_auto] items-end gap-5">
                        <p className="text-6xl latin font-medium sm:text-9xl trim-both">{number}</p>
                        <p className="text-xs text-right text-foreground-200 sm:text-xl lg:text-sm">{label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {tab.values && (
                  <div className="mt-[48px] overflow-hidden rounded-2xl bg-background-level-1 shadow-[0_0_0_1px_var(--border-100)]">
                    {tab.values.map(([number, title, text]) => (
                      <div
                        key={title}
                        className="grid min-h-36 grid-cols-[1fr_auto] gap-4 border-b border-(--border-100) p-(--card-padding) last:border-none"
                      >
                        <div className="flex flex-col gap-2">
                          <h3 className="text-2xl font-medium">{title}</h3>
                          <p className="text-sm font-light text-foreground-200">{text}</p>
                        </div>
                        <p className="text-5xl">{number}</p>
                      </div>
                    ))}
                  </div>
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
                        <span key={role} className="text-xs font-light text-foreground-200 uppercase">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tab.founders && (
                  <div className="relative w-full overflow-hidden">
                    <div className="relative top-0 z-30 mx-auto" style={{ marginTop: 'var(--spacing-4' }}>
                      <p
                        className="text-center text-5xl font-bold text-[#7c3400]"
                        style={{
                          WebkitTextStroke: '1px rgba(219, 88, 40, 0.55)',
                          textShadow: '0 0 18px rgba(219,88,40,0.26), 0 12px 24px rgba(0,0,0,0.72)',
                        }}
                      >
                        {t('about_intro.sections.founders.heading')}
                      </p>
                    </div>
                    <div className="pointer-events-none absolute top-12 left-1/2 h-[420px] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(219,88,40,0.72)_0%,rgba(142,68,0,0.38)_34%,rgba(8,8,8,0)_72%)] blur-sm" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
                    <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-px border-x border-accent-500/20 bg-accent-500/25">
                      {tab.founders.map((founder) => {
                        const name = t(`about_intro.sections.founders.${founder.nameKey}`);
                        return (
                          <div key={founder.nameKey} className="relative h-[440px] overflow-hidden sm:h-[560px]">
                            <Image
                              src={founder.image}
                              alt={name}
                              fill
                              sizes="(min-width: 1024px) 25vw, 50vw"
                              className="z-10 object-cover object-top"
                            />
                            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/8 to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#050505] to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#050505] to-transparent" />
                            <p className="absolute bottom-10 z-30 flex w-full justify-center text-xs text-foreground-200">
                              {name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            </StickyFixed.Item>
          ))}
        </StickyFixed.Track>
      </StickyFixed>
    </section>
  );
}

"use client";
import { cn } from "@/lib/utils";

import CtaSection from "@/components/CtaSection";
import HomePortfolioSection from "@/components/HomePortfolioSection";
import HomeProcessSection from "@/components/HomeProcessSection";
import HomeScopeSection from "@/components/HomeScopeSection";
import HomeTestimonialsSection from "@/components/HomeTestimonialsSection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import StrategySection from "@/components/StrategySection";
import { StickyHorizontalScrollSection } from "@/components/ui/sticky-horizontal-scroll";
import { StickySplitSection } from "@/components/ui/sticky-split";
import { TextMarquee } from "@/components/ui/Marquee";
import { hagxStats, hagxValues } from "@/content/hagx";
import { useI18n } from "@/i18n/useI18n";
import type { LocalizedPortfolioItem } from "@/lib/localizePortfolio";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Layout, Text } from "./ui";
import { Heading } from "@ui";

// ── Preloader ────────────────────────────────────────────────────────────────

function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(onDone, 400);
      }
      setProgress(Math.min(p, 100));
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full">
        <p className="mb-4 text-xs font-light uppercase tracking-widest text-white/30">
          Loading — {Math.round(progress)}%
        </p>
        <div className="preloader-bar-wrap">
          <div className="preloader-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Horizontal scroll items ───────────────────────────────────────────────────

const horizontalScrollItems = [
  {
    id: "horizontal-01",
    number: "01",
    title: "Glass Systems",
    subtitle: "Curtain walls, partitions & doors",
    description:
      "Explore modern glass systems designed for strong, elegant facades and crisp interior transitions.",
  },
  {
    id: "horizontal-02",
    number: "02",
    title: "Aluminium Profiles",
    subtitle: "Structural precision & finish",
    description:
      "High-performance aluminium systems engineered for durability, weather resistance, and premium detail.",
  },
  {
    id: "horizontal-03",
    number: "03",
    title: "Project Support",
    subtitle: "Design, fabrication, installation",
    description:
      "From concept to handover, our team delivers seamless coordination and quality control for every project.",
  },
];

const brands = [
  "YKK AP",
  "Dow Corning",
  "Guardian Glass",
  "AGC Glass",
  "Schuco",
  "Reynaers",
  "Pilkington",
  "Technal",
];
const clientNames = [
  "Property Developer A",
  "Architecture Studio",
  "Interior Design Co.",
  "Real Estate Group",
  "Construction Corp",
  "Design Build Ltd",
  "Premium Residences",
];

// ── Page ─────────────────────────────────────────────────────────────────────

type HomePageClientProps = {
  latestItemsTh: LocalizedPortfolioItem[];
  latestItemsEn: LocalizedPortfolioItem[];
};

export default function HomePageClient({
  latestItemsTh,
  latestItemsEn,
}: HomePageClientProps) {
  const [loaded, setLoaded] = useState(false);
  const { t, lang } = useI18n();

  const portfolio = (lang === "th" ? latestItemsTh : latestItemsEn).map(
    (item) => ({
      title: item.title,
      sub: item.location,
      desc: item.description,
      image: item.cover_image,
      slug: item.slug,
      scope: item.scope,
    }),
  );

  const getAboutSectionKey = (id: string) => {
    if (id === "who-we-are") return "who";
    if (id === "our-values") return "values";
    if (id === "our-team") return "team";
    return "founders";
  };

  const aboutTabs = [
    {
      id: "who-we-are",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
      stats: hagxStats.map(
        ({ n, labelTh, labelEn }) =>
          [n, lang === "th" ? labelTh : labelEn] as const,
      ),
    },
    {
      id: "our-values",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
      values: hagxValues.map(
        ({ n, title, titleTh, subTh, subEn }) =>
          [
            n,
            lang === "th" ? titleTh : title,
            lang === "th" ? subTh : subEn,
          ] as const,
      ),
    },
    {
      id: "our-team",
      image: "/images/team/hagx_team.png",
      roles: t("about_intro.sections.team.roles", {
        returnObjects: true,
      }) as unknown as string[],
    },
    {
      id: "founders",
      image: "/images/team/Panya_Sukyoo.png",
      founders: [
        {
          nameKey: "panya_sukyoo_name",
          image: "/images/team/Panya_Sukyoo.png",
        },
        {
          nameKey: "chanyanat_moopayak_name",
          image: "/images/team/Chanyanat.png",
        },
      ],
    },
  ];

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>
      <SiteNav />

      <main>
        {/* ── HERO ── */}
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")
            .split("\n")
            .map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </span>
            ))}
          subtitle={t("hero.subtitle")}
          align="left"
          minHeight="100vh"
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
        >
          <div className={cn("flex flex-wrap gap-4")}>
            <Button asChild color="gray" highContrast size="3">
              <Link href="/contact">{t("hero.cta_primary")}</Link>
            </Button>
            <Button
              asChild
              color="gray"
              highContrast
              variant="outline"
              size="3"
            >
              <Link href="#about"> {t("hero.cta_secondary")}</Link>
            </Button>
          </div>
        </PageHero>

        {/* ── ABOUT US ── */}
        <section>
          <StickySplitSection
            id="about"
            items={aboutTabs}
            pinnedSide="left"
            ariaLabel="About sections"
            renderNavLabel={(tab) =>
              t(`about_intro.tabs.${getAboutSectionKey(tab.id)}`)
            }
            renderPinned={() => (
              <div className="flex flex-col gap-5" data-slot="sticky-fixed">
                <Text
                  size={{ initial: "2" }}
                  as="p"
                  weight={{ initial: "light" }}
                  uppercase
                  color=""
                >
                  {t("about_intro.eyebrow")}
                </Text>
                <Heading size={{ initial: "9" }} weight={{ initial: "light" }}>
                  {t("about_intro.title")}
                </Heading>
                <Text
                  color="gray"
                  size={{ initial: "2" }}
                  as="p"
                  weight={{ initial: "light" }}
                  uppercase
                >
                  {t("about_intro.description")}
                </Text>
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
                  className="relative mt-2 h-[180px] overflow-hidden border-b border-[#DB5828]/60 bg-white/5 sm:h-[240px] lg:h-[24vh]"
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
                  <div className="w-full">
                    <Text
                      as="p"
                      size={{ initial: "2", sm: "3" }}
                      weight={{ initial: "light" }}
                      uppercase
                      color=""
                      className="mb-10"
                    >
                      {t("about_intro.sections.who.eyebrow")}
                    </Text>
                    <div className="flex flex-col gap-4">
                      {tab.stats.map(([number, label]) => (
                        <div
                          key={label}
                          className="grid items-center gap-5 sm:grid-cols-[1fr_220px]"
                        >
                          <Text
                            as="p"
                            weight={{ initial: "light" }}
                            color=""
                            size={{ initial: "9" }}
                            style={{ fontSize: "8vw", lineHeight: "1" }}
                          >
                            {number}
                          </Text>
                          <Text
                            as="p"
                            weight={{ initial: "light" }}
                            color=""
                            size={{ initial: "6" }}
                            className="max-w-[220px]"
                          >
                            {label}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab.values && (
                  <>
                    <Text
                      as="p"
                      color=""
                      size={{ initial: "2", sm: "3" }}
                      weight={{ initial: "light" }}
                      uppercase
                      className="mb-12"
                    >
                      {t("about_intro.sections.values.eyebrow")}
                    </Text>
                    <div className="overflow-hidden rounded-2xl border border-[var(--accent-a6)] bg-white/[0.04] shadow-2xl shadow-black/40">
                      {tab.values.map(([number, title, text]) => (
                        <div
                          key={title}
                          className="grid min-h-36 grid-cols-[1fr_auto] gap-4 border-b bg-[var(--gray-2)] p-3 last:border-b-0 sm:p-5"
                        >
                          <div className="flex flex-col gap-2">
                            <Heading
                              as="h3"
                              color=""
                              size={{ initial: "6" }}
                              weight={{ initial: "light" }}
                            >
                              {title}
                            </Heading>
                            <Text
                              as="p"
                              weight={{ initial: "light" }}
                              size={{ initial: "2" }}
                              color="gray"
                            >
                              {text}
                            </Text>
                          </div>
                          <Text
                            as="p"
                            weight={{ initial: "light" }}
                            size={{ initial: "7", sm: "9" }}
                            color=""
                          >
                            {number}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab.roles && (
                  <div className="relative">
                    <div className="absolute w-full flex justify-center top-0">
                      <Text
                        as="p"
                        size={{ initial: "9" }}
                        weight={{ initial: "bold" }}
                        color=""
                      >
                        {t("about_intro.sections.team.eyebrow")}
                      </Text>
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
                    <div className="absolute bottom-2 flex flex-wrap justify-center gap-2 w-full">
                      {tab.roles.map((role) => (
                        <Text
                          as="span"
                          color="gray"
                          uppercase
                          weight={{ initial: "light" }}
                          size={{ initial: "1" }}
                          key={role}
                        >
                          {role}
                        </Text>
                      ))}
                    </div>
                  </div>
                )}

                {tab.founders && (
                  <div className="relative w-full overflow-hidden">
                    <div
                      className="relative top-0 z-30 mx-auto"
                      style={{ marginTop: "var(--spacing-4" }}
                    >
                      <Text
                        as="p"
                        align={{ initial: "center" }}
                        weight={{ initial: "bold" }}
                        size={{ initial: "9" }}
                        className="text-[#7c3400]"
                        style={{
                          WebkitTextStroke: "1px rgba(219, 88, 40, 0.55)",
                          textShadow:
                            "0 0 18px rgba(219,88,40,0.26), 0 12px 24px rgba(0,0,0,0.72)",
                        }}
                      >
                        {t("about_intro.sections.founders.heading")}
                      </Text>
                    </div>
                    <div className="pointer-events-none absolute left-1/2 top-12 h-[420px] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(219,88,40,0.72)_0%,rgba(142,68,0,0.38)_34%,rgba(8,8,8,0)_72%)] blur-sm" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
                    <div className="relative mx-auto grid max-w-5xl gap-px border-x border-[#DB5828]/20 bg-[#DB5828]/25 sm:grid-cols-2">
                      {tab.founders.map((founder) => {
                        const founderName = t(
                          `about_intro.sections.founders.${founder.nameKey}`,
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
                            <p className="absolute bottom-10 z-30 flex w-full justify-center">
                              <Text size={{ initial: "1" }} color="gray">
                                {founderName}
                              </Text>
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

        {/* ── WHAT WE DO ── */}
        <HomeProcessSection />

        {/* ── SCOPE OF WORKS ── */}
        <HomeScopeSection />

        {/* ── STRATEGY ── */}
        <section className="ui-padding">
          <div className="ui-margin">
            <StrategySection />
          </div>
        </section>

        {/* ── LATEST PROJECTS ── */}
        <HomePortfolioSection portfolio={portfolio} />

        {/* ── TRUSTED PARTNERSHIP + CLIENT MARQUEE ── */}

        <HomeTestimonialsSection />

        {/* ── BRAND MARQUEE ── */}
        <section aria-label="HAGX material partners" className="ui-padding">
          <TextMarquee items={brands} />
          <TextMarquee items={clientNames} />
        </section>

        {/* ── CTA ── */}
        <CtaSection
          eyebrow={t("cta.eyebrow")}
          title={t("cta.title")}
          description={t("cta.desc")}
          primaryAction={{ href: "/contact", label: t("cta.button") }}
          secondaryAction={{ href: "/shop", label: "ดูวัสดุ" }}
        />
      </main>

      <SiteFooter />
    </>
  );
}

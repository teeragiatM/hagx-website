"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import ScrollStack from "@/components/ScrollStack";
import ScrollTimeline from "@/components/ScrollTimeline";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { useI18n } from "@/i18n/useI18n";
import { motion } from "framer-motion";

type Stat = {
  n: string;
  label: string;
  sub: string;
};

type Category = {
  n: string;
  title: string;
  desc: string;
};

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
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1100&q=85",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1100&q=85",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1100&q=85",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1100&q=85",
];

const valueIcons = [
  <svg key="experience" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <rect x="10" y="10" width="60" height="60" rx="4" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.08)" />
    <path d="M25 55 L40 20 L55 55" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 43 H50" stroke="#ff8a00" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="accountability" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <circle cx="40" cy="40" r="28" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.08)" />
    <path d="M40 22 V40 L52 48" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="precision" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <rect x="12" y="28" width="56" height="36" rx="3" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.08)" />
    <path d="M28 28 V20 Q28 12 40 12 Q52 12 52 20 V28" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="46" r="6" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.2)" />
  </svg>,
  <svg key="innovation" viewBox="0 0 80 80" fill="none" className="h-16 w-16">
    <path d="M14 40 L32 58 L66 24" stroke="#ff8a00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="40" r="28" stroke="#ff8a00" strokeWidth="1.5" fill="rgba(255,138,0,0.06)" strokeDasharray="4 3" />
  </svg>,
];

function lines(text: string) {
  return text.split("\n").map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

export default function AboutPage() {
  const { t } = useI18n("about");
  const clients = t("hero.clients", { returnObjects: true }) as unknown as string[];
  const stats = t("stats", { returnObjects: true }) as unknown as Stat[];
  const categories = t("categories", { returnObjects: true }) as unknown as Category[];
  const journeyCopy = t("journey", { returnObjects: true }) as unknown as JourneyCopy[];
  const values = t("values.items", { returnObjects: true }) as unknown as ValueItem[];
  const dummyYears = ["2006", "2012", "2018", "2024"];
  const journey = journeyCopy.map((item, index) => ({
    ...item,
    year: item.year || dummyYears[index],
    image: journeyImages[index] ?? journeyImages[0],
  }));

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        titleAlt={t("hero.title_alt")}
        subtitle={t("hero.subtitle")}
        bottomSlot={
          <div className="border-t border-white/[0.06] px-6 py-8 text-center sm:px-10">
            <p className="mb-5 text-[10px] font-light uppercase tracking-widest text-white/25">
              {t("hero.trusted")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {clients.map((client) => (
                <span key={client} className="text-xs font-light uppercase tracking-widest text-white/20">
                  {client}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <section className="border-y border-white/[0.06]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 divide-y divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-10 py-12 lg:px-16 lg:py-14">
              <p className="text-6xl font-bold leading-none text-[#ff8a00] lg:text-7xl">{stat.n}</p>
              <p className="mt-4 text-xs font-light uppercase tracking-widest text-white/35">{stat.label}</p>
              <p className="mt-3 max-w-xs text-sm font-light leading-7 text-white/50">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[340px_1fr]">
          <div className="border-white/[0.06] px-10 py-16 lg:border-r lg:px-14 lg:py-20">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {lines(t("intro.title"))}
            </h2>
            <p className="mt-8 text-sm font-light leading-8 text-white/40">
              {t("intro.body")}
            </p>
          </div>

          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.n}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className={`relative flex flex-col justify-between overflow-hidden px-8 py-10 ${
                  index === 0
                    ? "bg-gradient-to-b from-[#7a3500] to-[#3a1600]"
                    : "bg-[#0c0c0c]"
                }`}
                style={
                  index === 0
                    ? { boxShadow: "0 0 60px rgba(255,138,0,0.2) inset" }
                    : {}
                }
              >
                <div>
                  <p className={`mb-4 text-3xl font-light ${index === 0 ? "text-white/40" : "text-white/15"}`}>
                    {category.n}
                  </p>
                  <h3 className={`text-2xl font-bold leading-tight ${index === 0 ? "text-white" : "text-white/30"}`}>
                    {lines(category.title)}
                  </h3>
                </div>
                <p className={`mt-6 text-sm font-light leading-7 ${index === 0 ? "text-white/65" : "text-white/25"}`}>
                  {category.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden border-b border-white/[0.06] px-4 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <div className="sticky top-20 z-20 bg-[#080808]/80 py-4 backdrop-blur-md">
          <div className="mx-auto max-w-[1500px]">
            <SectionHeader
              eyebrow={t("journey_header.eyebrow")}
              heading={t("journey_header.heading")}
              description={t("journey_header.description")}
            />
          </div>
        </div>
        <ScrollTimeline items={journey} />
      </div>

      <section className="border-b border-white/[0.06] px-8 py-24 text-center sm:px-12 lg:py-32">
        <p className="mb-6 text-xs font-light uppercase tracking-widest text-[#ff8a00]">{t("statement.eyebrow")}</p>
        <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {t("statement.heading")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-8 text-white/40">
          {t("statement.description")}
        </p>
        <div className="mx-auto mt-10 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#ff8a00]/60 to-transparent" />
      </section>

      <ScrollStack
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        description={t("values.description")}
        items={values.map((value, index) => ({
          id: value.n,
          number: value.n,
          title: value.title,
          subtitle: value.subtitle,
          description: value.description,
          icon: valueIcons[index],
        }))}
      />

      <CtaSection
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryAction={{ href: "/contact", label: t("cta.primary") }}
        secondaryAction={{ href: "/portfolio", label: t("cta.secondary") }}
      />
      <SiteFooter />
    </main>
  );
}

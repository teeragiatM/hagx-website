"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import { Container, Section } from "@/components/ui/section";
import {
  ScrollStackSection,
  type ScrollStackDataItem,
} from "@/components/ui/scroll-stack";
import {
  ScrollTimeline,
  type TimelineItem,
} from "@/components/ui/scroll-timeline";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { StatsGrid } from "@/components/ui/stats-grid";
import { hagxStats } from "@/content/hagx";
import { useI18n } from "@/i18n/useI18n";
import { Text } from "@ui";
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
  const { t, lang } = useI18n("about");
  const clients = t("hero.clients", {
    returnObjects: true,
  }) as unknown as string[];
  const journeyCopy = t("journey", {
    returnObjects: true,
  }) as unknown as JourneyCopy[];
  const values = t("values.items", {
    returnObjects: true,
  }) as unknown as ValueItem[];
  const stats = hagxStats.map((stat) => ({
    value: stat.n,
    label: lang === "th" ? stat.labelTh : stat.labelEn,
    description: lang === "th" ? stat.sub : stat.subEn,
  }));
  const dummyYears = ["2006", "2012", "2018", "2024"];
  const journey = journeyCopy.map((item, index) => ({
    ...item,
    year: item.year || dummyYears[index],
    image: journeyImages[index] ?? journeyImages[0],
  }));

  return (
    <main>
      <SiteNav />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        titleAlt={t("hero.title_alt")}
        subtitle={t("hero.subtitle")}
        bottomSlot={
          <div className="text-center">
            <div className="mb-5">
              <Text
                as="p"
                size={{ initial: "1" }}
                weight={{ initial: "light" }}
                uppercase
              >
                {t("hero.trusted")}
              </Text>{" "}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {clients.map((client) => (
                <span
                  key={client}
                  className="text-xs font-light uppercase tracking-widest text-white/20"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <Section size="1">
        <Container width="xl" padded={false}>
          <StatsGrid items={stats} />
        </Container>
      </Section>

      <Section size="1" className="relative overflow-hidden pt-16 lg:pt-24">
        <Container width="xl" padded={false}>
          <SectionHeader
            eyebrow={t("journey_header.eyebrow")}
            heading={t("journey_header.heading")}
            description={t("journey_header.description")}
          />
          <ScrollTimeline items={journey} />
        </Container>
      </Section>

      <Section size="4" className="px-8 text-center sm:px-12">
        <SectionHeader
          eyebrow={t("statement.eyebrow")}
          heading={t("statement.heading")}
          description={t("statement.description")}
          layout="stack"
          className="mb-0 [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight sm:[&_h2]:text-accentxl lg:[&_h2]:text-6xl [&_p:last-child]:text-white/40"
        />
        <div className="mx-auto mt-10 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#DB5828]/60 to-transparent" />
      </Section>

      <ScrollStackSection
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

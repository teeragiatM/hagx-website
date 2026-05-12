"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { StatsGrid } from "@/components/ui/stats-grid";
import { BorderGrid, BorderGridCell } from "@/components/ui/BorderGrid";
import type { TestimonialItem } from "@/components/ui/ReviewSection";
import { MarqueeGrid, type MarqueeItem } from "@/components/ui/Marquee";
import { ReviewSection } from "@/components/ui/ReviewSection";
import { hagxStats } from "@/content/hagx";
import { useI18n } from "@/i18n/useI18n";

type TestimonialCopy = Omit<TestimonialItem, "bg" | "accent">;

const testimonialStyles = [
  { bg: "#1a1a2e", accent: "#DB5828" },
  { bg: "#1c1408", accent: "#c8a000" },
  { bg: "#0d1a0d", accent: "#00a651" },
  { bg: "#1a0a1a", accent: "#9b59b6" },
  { bg: "#0a1a0a", accent: "#00843d" },
  { bg: "#1a0808", accent: "#e63946" },
];

function lines(text: string) {
  return text.split("\n").map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

export default function ClientsPage() {
  const { t, lang } = useI18n("clients");
  const clients = t("clients", {
    returnObjects: true,
  }) as unknown as MarqueeItem[];
  const testimonialCopy = t("stories.items", {
    returnObjects: true,
  }) as unknown as TestimonialCopy[];
  const testimonials = testimonialCopy.map((item, index) => ({
    ...item,
    ...testimonialStyles[index],
  }));
  const stats = hagxStats.map((stat) => ({
    value: stat.n,
    label: lang === "th" ? stat.labelTh : stat.labelEn,
    description: lang === "th" ? stat.sub : stat.subEn,
  }));

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={
          <>
            {t("hero.title")}
            <br />
            <span className="text-[#DB5828]">{t("hero.title_accent")}</span>
          </>
        }
        subtitle={t("hero.subtitle")}
        backgroundSlot={
          <MarqueeGrid
            items={clients}
            columns={5}
            columnSpeeds={[38, 44, 36, 50, 42]}
            className="h-full px-3"
          />
        }
      />

      <section className="bg-[#DB5828] px-8 py-20 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <StatsGrid items={stats} variant="accent" />

          <div className="mt-16 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                {lines(t("tagline.title"))}
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/70">
              {t("tagline.description")}
            </p>
          </div>
        </div>
      </section>

      <ReviewSection
        eyebrow={t("stories.eyebrow")}
        title={t("stories.title")}
        description={t("stories.description")}
        items={testimonials}
      />

      <section className="border-b border-white/[0.06] px-8 py-24 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow mb-3">{t("all.eyebrow")}</p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight">
            {t("all.title")}
          </h2>
          <BorderGrid cols={4} className="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {clients.map((client, i) => (
              <BorderGridCell key={client.id} index={i} bg="#0c0c0c" animate={false}
                className="flex flex-col items-center justify-center gap-2 px-4 py-8"
              >
                <span className="text-base font-bold text-white/70">{client.label}</span>
                <span className="text-[9px] font-light uppercase tracking-widest text-white/25">{client.sub}</span>
              </BorderGridCell>
            ))}
          </BorderGrid>
        </div>
      </section>

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

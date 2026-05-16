"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { StatsGrid } from "@/components/ui/stats-grid";
import { BorderGrid, BorderGridCell } from "@/components/ui/BorderGrid";
import { MarqueeGrid, type MarqueeItem } from "@/components/ui/Marquee";
import { ReviewSection } from "@/components/ui/ReviewSection";
import { Preloader } from "@/components/ui/Preloader";
import type { TestimonialCarouselItem } from "@/components/ui/testimonial-carousel";
import { hagxStats } from "@/content/hagx";
import { useI18n } from "@/i18n/useI18n";
import { useEffect, useState } from "react";

function lines(text: string) {
  return text.split("\n").map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

type Props = {
  reviewsTh: TestimonialCarouselItem[];
  reviewsEn: TestimonialCarouselItem[];
};

export default function ClientsPageClient({ reviewsTh, reviewsEn }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { t, lang } = useI18n("clients");
  const clients = t("clients", { returnObjects: true }) as unknown as MarqueeItem[];
  const reviews = lang === "th" ? reviewsTh : reviewsEn;
  const stats = hagxStats.map((stat) => ({
    value: stat.n,
    label: lang === "th" ? stat.labelTh : stat.labelEn,
    description: lang === "th" ? stat.sub : stat.subEn,
  }));

  return (
    <div>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={
          <>
            {t("hero.title")}
            <br />
            <span className="text-accent-500">{t("hero.title_accent")}</span>
          </>
        }
        subtitle={t("hero.subtitle")}
        backgroundSlot={
          mounted ? (
            <MarqueeGrid
              items={clients}
              columns={5}
              columnSpeeds={[38, 44, 36, 50, 42]}
              className="h-full px-3"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Preloader.Logo />
            </div>
          )
        }
      />

      <section className="bg-accent-500 px-8 py-20 sm:px-14">
        <div className="mx-auto">
          <StatsGrid items={stats} variant="accent" />
          <div className="mt-16 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-4xl leading-tight font-bold text-foreground-100 lg:text-5xl">
                {lines(t("tagline.title"))}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-8 font-light text-foreground-200">
              {t("tagline.description")}
            </p>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="PageSection_root">
          <SectionHeader
            heading={t("stories.title")}
            description={t("stories.description")}
          />
          <ReviewSection items={reviews} />
        </section>
      )}

      <section className="border-b border-white/[0.06] px-8 py-24 sm:px-14">
        <div className="mx-auto">
          <p className="eyebrow mb-3">{t("all.eyebrow")}</p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight">
            {t("all.title")}
          </h2>
          <BorderGrid
            cols={4}
            className="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          >
            {clients.map((client, i) => (
              <BorderGridCell
                key={client.id}
                index={i}
                bg="#0c0c0c"
                animate={false}
                className="flex flex-col items-center justify-center gap-2 px-4 py-8"
              >
                <span className="text-base font-bold text-foreground-200">
                  {client.label}
                </span>
                <span className="text-xs font-light tracking-widest text-foreground-400 uppercase">
                  {client.sub}
                </span>
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
    </div>
  );
}

"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { useI18n } from "@/i18n/useI18n";
import { MarqueeGrid, type MarqueeItem } from "@/components/ui/Marquee";
import { ReviewSection } from "@/components/ui/ReviewSection";
import type { TestimonialItem } from "@/components/TestimonialCarousel";

type Stat = {
  value: string;
  label: string;
  sub: string;
};

type TestimonialCopy = Omit<TestimonialItem, "bg" | "accent">;

const testimonialStyles = [
  { bg: "#1a1a2e", accent: "#ff8a00" },
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
  const { t } = useI18n("clients");
  const clients = t("clients", { returnObjects: true }) as unknown as MarqueeItem[];
  const stats = t("stats", { returnObjects: true }) as unknown as Stat[];
  const testimonialCopy = t("stories.items", { returnObjects: true }) as unknown as TestimonialCopy[];
  const testimonials = testimonialCopy.map((item, index) => ({
    ...item,
    ...testimonialStyles[index],
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
            <span className="text-[#ff8a00]">{t("hero.title_accent")}</span>
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

      <section className="bg-[#ff8a00] px-8 py-20 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-2 gap-px bg-white/20 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col items-start bg-[#ff8a00] px-10 py-12">
                <p className="mb-2 text-5xl font-bold leading-none text-white lg:text-6xl">{stat.value}</p>
                <p className="mb-1 text-base font-semibold text-white">{stat.label}</p>
                <p className="text-xs font-light text-white/70">{stat.sub}</p>
              </div>
            ))}
          </div>

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
          <h2 className="mb-12 text-3xl font-bold tracking-tight">{t("all.title")}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-center justify-center gap-2 border border-white/[0.07] bg-[#0c0c0c] px-4 py-8 transition-colors hover:border-[#ff8a00]/30"
              >
                <span className="text-base font-bold text-white/70">{client.label}</span>
                <span className="text-[9px] font-light uppercase tracking-widest text-white/25">{client.sub}</span>
              </div>
            ))}
          </div>
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

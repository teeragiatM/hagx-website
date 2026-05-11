"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import ServiceCarousel, {
  type ServiceCarouselItem,
} from "@/components/ServiceCarousel";
import ScopeOfWorks, { type ScopeCategory } from "@/components/ScopeOfWorks";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { useI18n } from "@/i18n/useI18n";

type ExpertiseTrack = {
  n: string;
  eyebrow: string;
  title: string;
  desc: string;
};

type CarouselContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<Omit<ServiceCarouselItem, "n" | "image">>;
  ctaPrimary: string;
  ctaSecondary: string;
};

const serviceImages = {
  installation: [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80",
  ],
  manufacturing: [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80",
    "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1000&q=80",
  ],
  supply: [
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1000&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80",
  ],
};

const itemNumbers = ["01", "02", "03", "04"];

function buildItems(
  items: CarouselContent["items"],
  images: string[],
): ServiceCarouselItem[] {
  return items.map((item, index) => ({
    n: itemNumbers[index] ?? String(index + 1).padStart(2, "0"),
    title: item.title,
    desc: item.desc,
    image: images[index] ?? images[0],
  }));
}

export default function ServicesPage() {
  const { t } = useI18n("services");
  const expertiseTracks = t("expertise.tracks", {
    returnObjects: true,
  }) as unknown as ExpertiseTrack[];
  const installation = t("carousels.installation", {
    returnObjects: true,
  }) as unknown as CarouselContent;
  const manufacturing = t("carousels.manufacturing", {
    returnObjects: true,
  }) as unknown as CarouselContent;
  const supply = t("carousels.supply", {
    returnObjects: true,
  }) as unknown as CarouselContent;

  const scopeOfWorks = {
    eyebrow: t("scope_of_works.eyebrow"),
    subtitle: t("scope_of_works.subtitle"),
    footer: t("scope_of_works.footer"),
    categories: t("scope_of_works.categories", { returnObjects: true }) as unknown as ScopeCategory[],
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        minHeight="70vh"
      />

      <section className="border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            heading={t("expertise.heading")}
            description={t("expertise.description")}
          />

          <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {expertiseTracks.map((track, index) => (
              <article
                key={track.n}
                className={`relative overflow-hidden px-7 py-9 sm:px-10 sm:py-12 ${
                  index === 0 ? "bg-[#120d08]" : "bg-[#0c0c0c]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_15%,rgba(255,138,0,0.16),transparent_64%)]" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-6">
                    <p className="text-xs font-light uppercase tracking-widest text-[#ff8a00]">
                      {track.eyebrow}
                    </p>
                    <p className="text-4xl font-light text-white/10">
                      {track.n}
                    </p>
                  </div>
                  <h3 className="text-2xl font-light leading-tight text-white sm:text-3xl">
                    {track.title}
                  </h3>
                  <p className="mt-5 text-sm font-light leading-8 text-white/50">
                    {track.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceCarousel
        eyebrow={installation.eyebrow}
        title={installation.title}
        description={installation.description}
        items={buildItems(installation.items, serviceImages.installation)}
        ctaPrimary={{ href: "/contact", label: installation.ctaPrimary }}
        ctaSecondary={{ href: "/portfolio", label: installation.ctaSecondary }}
        visibleCount={3}
      />

      <ScopeOfWorks
        eyebrow={scopeOfWorks.eyebrow}
        subtitle={scopeOfWorks.subtitle}
        footer={scopeOfWorks.footer}
        categories={scopeOfWorks.categories}
      />

      <ServiceCarousel
        eyebrow={manufacturing.eyebrow}
        title={manufacturing.title}
        description={manufacturing.description}
        items={buildItems(manufacturing.items, serviceImages.manufacturing)}
        ctaPrimary={{ href: "/contact", label: manufacturing.ctaPrimary }}
        ctaSecondary={{ href: "/portfolio", label: manufacturing.ctaSecondary }}
        visibleCount={3}
      />

      <ServiceCarousel
        eyebrow={supply.eyebrow}
        title={supply.title}
        description={supply.description}
        items={buildItems(supply.items, serviceImages.supply)}
        ctaPrimary={{ href: "/shop", label: supply.ctaPrimary }}
        ctaSecondary={{ href: "/contact", label: supply.ctaSecondary }}
        visibleCount={3}
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

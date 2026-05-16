import CtaSection from "@/components/CtaSection";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type DetailItem = { label: string; value: string };

export type RelatedCard = {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
};

export type DetailPageTemplateProps = {
  // Breadcrumb
  backHref: string;
  backLabel: string;
  breadcrumb?: string;

  // Hero
  coverImage?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;

  // Body (left column)
  body?: ReactNode;
  gallery?: string[];

  // Highlights (optional tag pills — for portfolio)
  highlights?: string[];

  // Sidebar (right column)
  details?: DetailItem[];
  primaryAction: { href: string; label: string };
  secondaryAction: { href: string; label: string };

  // Related section
  related?: RelatedCard[];
  relatedEyebrow?: string;
  relatedTitle?: string;

  // Bottom CTA
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
};

export default function DetailPageTemplate({
  backHref, backLabel, breadcrumb,
  coverImage, eyebrow, title, subtitle,
  body, gallery, highlights,
  details, primaryAction, secondaryAction,
  related, relatedEyebrow = "Related", relatedTitle = "See Also",
  cta,
}: DetailPageTemplateProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] px-8 pt-28 pb-5 sm:px-14">
        <nav className="flex items-center gap-2 text-[10px] font-light tracking-widest text-foreground-400 uppercase">
          <Link href={backHref} className="transition-colors hover:text-foreground-100">{backLabel}</Link>
          {breadcrumb && <><span>/</span><span>{breadcrumb}</span></>}
          <span>/</span>
          <span className="text-foreground-200">{title}</span>
        </nav>
      </div>

      {/* Cover hero */}
      {coverImage && (
        <div className="relative h-[55vh] overflow-hidden">
          <Image src={coverImage} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-100/80 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 px-8 pb-12 sm:px-14">
            {eyebrow && <p className="mb-3 text-[10px] font-light tracking-widest text-accent-500 uppercase">{eyebrow}</p>}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
            {subtitle && <p className="mt-3 text-sm font-light text-foreground-300">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Content */}
      <section className="px-8 py-16 sm:px-14">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Left — body + gallery */}
          <div className="space-y-10 lg:col-span-2">
            {!coverImage && (
              <div>
                {eyebrow && <p className="mb-3 text-[10px] font-light tracking-widest text-accent-500 uppercase">{eyebrow}</p>}
                <h1 className="mb-4 text-4xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="text-sm font-light text-foreground-300">{subtitle}</p>}
              </div>
            )}

            {body && <div className="text-sm leading-8 font-light text-foreground-300">{body}</div>}

            {highlights && highlights.length > 0 && (
              <div>
                <p className="mb-6 text-[10px] font-light tracking-widest text-foreground-400 uppercase">Highlights</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {highlights.map((h) => (
                    <div key={h} className="border border-white/[0.07] bg-background-200 p-4">
                      <span className="mb-1 block h-0.5 w-6 bg-accent-500" />
                      <p className="text-xs leading-5 font-light text-foreground-200">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gallery && gallery.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {gallery.map((src, i) => (
                  <div key={i} className="relative aspect-[16/10] overflow-hidden border border-white/[0.07]">
                    <Image src={src} alt={`${title} ${i + 1}`} fill sizes="45vw" className="object-cover opacity-65" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="space-y-6">
            {details && details.length > 0 && (
              <div className="space-y-4 border border-white/[0.07] bg-background-200 p-6">
                <p className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">Details</p>
                {details.map((d) => (
                  <div key={d.label} className="border-t border-white/[0.06] pt-3">
                    <p className="mb-1 text-xs font-light tracking-widest text-foreground-400 uppercase">{d.label}</p>
                    <p className="text-sm font-light text-foreground-200">{d.value}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-3">
              <Link href={primaryAction.href} className="btn btn-primary block w-full text-center">{primaryAction.label}</Link>
              <Link href={secondaryAction.href} className="btn btn-secondary block w-full text-center">{secondaryAction.label}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="px-8 py-16 sm:px-14">
          <p className="eyebrow mb-3">{relatedEyebrow}</p>
          <h2 className="mb-10 text-2xl font-bold tracking-tight">{relatedTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="group block border border-white/[0.07] bg-background-200 transition-colors hover:border-accent-500/30">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={r.image} alt={r.title} fill sizes="(min-width:1024px) 28vw, 50vw" className="object-cover opacity-60 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-200/80 to-transparent" />
                </div>
                <div className="p-5">
                  {r.subtitle && <p className="mb-1 text-xs font-light tracking-widest text-foreground-400 uppercase">{r.subtitle}</p>}
                  <h3 className="text-sm font-semibold text-foreground-100">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaSection
        eyebrow={cta.eyebrow}
        title={cta.title}
        description={cta.description}
        primaryAction={cta.primary}
        secondaryAction={cta.secondary}
      />
    </div>
  );
}

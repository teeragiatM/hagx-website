import CtaSection from "@/components/CtaSection";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import {
  getPortfolioItemBySlug,
  getPortfolioItems,
  getPortfolioSlugs,
} from "@/lib/getPortfolioItems";
import { typeOptions } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

// ── Static params — pre-render all published slugs at build time ──────────────

export async function generateStaticParams() {
  return getPortfolioSlugs();
}

// ── SEO metadata from localized title ────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug, "th");
  if (!item) return {};

  return {
    title: `${item.title} | HAGX Portfolio`,
    description: item.description,
    openGraph: {
      title: `${item.title} | HAGX`,
      description: item.description,
      images: [
        { url: item.cover_image, width: 800, height: 600, alt: item.title },
      ],
      type: "website",
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, allItems] = await Promise.all([
    getPortfolioItemBySlug(slug, "th"),
    getPortfolioItems("th"),
  ]);

  if (!item) notFound();

  const typeLabel =
    typeOptions.find((t) => t.value === item.type)?.label ?? item.type;
  const related = allItems
    .filter((r) => r.type === item.type && r.slug !== item.slug)
    .slice(0, 3);

  return (
    <main>
      <SiteNav />

      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] px-8 pt-28 pb-5 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <nav className="flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/25">
            <Link
              href="/portfolio"
              className="transition-colors hover:text-white"
            >
              Projects
            </Link>
            <span>/</span>
            <span className="text-white/40">{typeLabel}</span>
            <span>/</span>
            <span className="text-white/60">{item.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero image */}
      <div className="hero-bottom-shadow relative h-[55vh] overflow-hidden">
        <Image
          src={item.cover_image}
          alt={item.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 sm:px-14">
          <div className="mx-auto max-w-[1500px]">
            <p className="eyebrow mb-3">{typeLabel}</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="px-8 py-16 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main */}
            <div className="space-y-10 lg:col-span-2">
              <p className="max-w-2xl text-sm font-light leading-8 text-white/55">
                {item.description}
              </p>

              {item.highlights.length > 0 && (
                <div>
                  <p className="mb-6 text-[10px] font-light uppercase tracking-widest text-white/25">
                    Project Highlights
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {item.highlights.map((h) => (
                      <div
                        key={h}
                        className="border border-white/[0.07] bg-[#0c0c0c] p-4"
                      >
                        <span className="mb-1 block h-0.5 w-6 bg-[#DB5828]" />
                        <p className="text-xs font-light leading-5 text-white/60">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional gallery images */}
              {item.gallery.length > 1 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.gallery.slice(1).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] overflow-hidden border border-white/[0.07]"
                    >
                      <Image
                        src={src}
                        alt={`${item.title} ${i + 2}`}
                        fill
                        sizes="45vw"
                        className="object-cover opacity-65"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="space-y-4 border border-white/[0.07] bg-[#0c0c0c] p-6">
                <p className="text-[10px] font-light uppercase tracking-widest text-white/25">
                  Project Details
                </p>
                {[
                  { label: "Location", value: item.location },
                  { label: "Year", value: item.year },
                  {
                    label: "Category",
                    value:
                      item.category === "installation"
                        ? "Installation Work"
                        : "Supply & Sales",
                  },
                  {
                    label: "Scope",
                    value: item.scope,
                  },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="border-t border-white/[0.06] pt-3"
                  >
                    <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/20">
                      {d.label}
                    </p>
                    <p className="text-sm font-light text-white/70">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="btn btn-primary block w-full text-center"
                >
                  สอบถามโครงการลักษณะนี้
                </Link>
                <Link
                  href="/portfolio"
                  className="btn btn-secondary block w-full text-center"
                >
                  ← ดูผลงานทั้งหมด
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/[0.06] px-8 py-16 sm:px-14">
          <div className="mx-auto max-w-[1500px]">
            <p className="eyebrow mb-3">โครงการในประเภทเดียวกัน</p>
            <h2 className="mb-10 text-2xl font-bold tracking-tight">
              Related Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/portfolio/${r.slug}`}
                  className="group block border border-white/[0.07] bg-[#0c0c0c] transition-colors hover:border-[#DB5828]/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.cover_image}
                      alt={r.title}
                      fill
                      sizes="(min-width:1024px) 28vw, 50vw"
                      className="object-cover opacity-60 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/25">
                      {r.location} / {r.year}
                    </p>
                    <h3 className="text-sm font-semibold text-white">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow="Start a Project"
        title="อยากทำโครงการลักษณะนี้?"
        description="ส่งรายละเอียดโครงการให้ทีม HAGX ช่วยประเมินระบบ วัสดุ และแนวทางติดตั้งเบื้องต้น"
        primaryAction={{ href: "/contact", label: "ปรึกษาโครงการ" }}
        secondaryAction={{ href: "/portfolio", label: "ดูผลงานอื่น" }}
      />

      <SiteFooter />
    </main>
  );
}

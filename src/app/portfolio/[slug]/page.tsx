import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { projects, typeOptions } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = projects.find((p) => p.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} | HAGX Projects`,
    description: p.desc,
    openGraph: {
      title: `${p.title} — HAGX`,
      description: p.desc,
      images: [{ url: p.image, width: 800, height: 600, alt: p.title }],
      type: "website",
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projects.find((p) => p.slug === params.slug);
  if (!p) notFound();

  const typeLabel = typeOptions.find((t) => t.value === p.type)?.label ?? p.type;
  const related = projects.filter((r) => r.type === p.type && r.slug !== p.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] px-8 pt-28 pb-5 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <nav className="flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/25">
            <Link href="/portfolio" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white/40">{typeLabel}</span>
            <span>/</span>
            <span className="text-white/60">{p.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[55vh] overflow-hidden">
        <Image
          src={p.images[0]}
          alt={p.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 sm:px-14">
          <div className="mx-auto max-w-[1500px]">
            <p className="eyebrow mb-3">{typeLabel}</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{p.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="px-8 py-16 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-16 lg:grid-cols-3">

            {/* Main info */}
            <div className="lg:col-span-2 space-y-10">
              <p className="text-sm font-light leading-8 text-white/55 max-w-2xl">{p.desc}</p>

              {/* Project highlights */}
              <div>
                <p className="mb-6 text-[10px] font-light uppercase tracking-widest text-white/25">Project Highlights</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {p.highlights.map((h) => (
                    <div key={h} className="border border-white/[0.07] bg-[#0c0c0c] p-4">
                      <span className="mb-1 block h-0.5 w-6 bg-[#ff8a00]" />
                      <p className="text-xs font-light leading-5 text-white/60">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional images */}
              {p.images.length > 1 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {p.images.slice(1).map((img, i) => (
                    <div key={i} className="relative aspect-[16/10] overflow-hidden border border-white/[0.07]">
                      <Image src={img} alt={`${p.title} ${i + 2}`} fill sizes="45vw" className="object-cover opacity-65" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="border border-white/[0.07] bg-[#0c0c0c] p-6 space-y-5">
                <p className="text-[10px] font-light uppercase tracking-widest text-white/25">Project Details</p>
                {[
                  { label: "Location", value: p.location },
                  { label: "Year", value: p.year },
                  { label: "Category", value: p.category === "installation" ? "Installation Work" : "Supply & Sales" },
                  { label: "Scope", value: p.scope },
                ].map((d) => (
                  <div key={d.label} className="border-t border-white/[0.06] pt-4">
                    <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/20">{d.label}</p>
                    <p className="text-sm font-light text-white/70">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Link href="/contact" className="btn btn-primary w-full text-center block">
                  สอบถามโครงการลักษณะนี้
                </Link>
                <Link href="/portfolio" className="btn btn-secondary w-full text-center block">
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
            <h2 className="mb-10 text-2xl font-bold tracking-tight">Related Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/portfolio/${r.slug}`}
                  className="group block border border-white/[0.07] bg-[#0c0c0c] transition-colors hover:border-[#ff8a00]/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(min-width:1024px) 28vw, 50vw"
                      className="object-cover opacity-60 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/25">{r.location} · {r.year}</p>
                    <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

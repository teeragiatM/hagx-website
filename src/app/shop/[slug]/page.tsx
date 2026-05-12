import CtaSection from "@/components/CtaSection";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { categories, products } from "@/lib/products";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} | HAGX Shop`,
    description: p.desc,
    openGraph: {
      title: `${p.name} — ${p.nameEn}`,
      description: p.desc,
      images: [{ url: p.image, width: 900, height: 675, alt: p.nameEn }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();

  const cat = categories.find((c) => c.value === p.category);
  const related = products
    .filter((r) => r.category === p.category && r.slug !== p.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] px-8 pt-28 pb-5 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <nav className="flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/25">
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white/40">{cat?.label.split(" ")[0]}</span>
            <span>/</span>
            <span className="text-white/60">{p.nameEn}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <section className="px-8 py-16 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.07] bg-[#0c0c0c]">
                <Image
                  src={p.images[0]}
                  alt={p.nameEn}
                  fill
                  priority
                  sizes="(min-width:1024px) 50vw, 95vw"
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
                {p.featured && (
                  <span className="absolute right-4 top-4 border border-[#DB5828]/50 bg-[#DB5828]/15 px-2.5 py-1 text-[9px] font-light uppercase tracking-widest text-[#DB5828]">
                    Popular
                  </span>
                )}
                {!p.inStock && (
                  <span className="absolute left-4 top-4 border border-white/20 bg-black/60 px-2.5 py-1 text-[9px] font-light uppercase tracking-widest text-white/50 backdrop-blur-sm">
                    สั่งจอง
                  </span>
                )}
              </div>
              {p.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {p.images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden border border-white/[0.07] bg-[#0c0c0c]"
                    >
                      <Image
                        src={img}
                        alt={`${p.nameEn} ${i + 2}`}
                        fill
                        sizes="20vw"
                        className="object-cover opacity-60"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="eyebrow mb-3">{p.subcategory}</p>
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {p.name}
              </h1>
              <p className="mb-6 text-sm font-light text-white/35">
                {p.nameEn}
              </p>

              <div className="mb-6 border-l-2 border-[#DB5828] pl-4">
                <p className="text-sm font-light italic text-white/50">
                  {p.tagline}
                </p>
              </div>

              <p className="mb-8 text-sm font-light leading-8 text-white/50">
                {p.desc}
              </p>

              {/* Price */}
              <div className="mb-8 border border-white/[0.07] bg-[#0c0c0c] p-5">
                <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/20">
                  ราคาเริ่มต้น
                </p>
                <p className="text-3xl font-bold text-[#DB5828]">
                  ฿{Number(p.priceFrom).toLocaleString()}
                  <span className="ml-2 text-sm font-light text-white/30">
                    /{p.unit}
                  </span>
                </p>
                <p className="mt-2 text-[11px] font-light text-white/25">
                  * ราคานี้เป็นราคาเริ่มต้น ขึ้นอยู่กับขนาดและปริมาณ
                </p>
              </div>

              {/* Specs */}
              <div className="mb-8">
                <p className="mb-4 text-[10px] font-light uppercase tracking-widest text-white/25">
                  ข้อมูลจำเพาะ
                </p>
                <div className="divide-y divide-white/[0.06] border border-white/[0.06]">
                  {p.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <span className="text-xs font-light text-white/35">
                        {s.label}
                      </span>
                      <span className="text-xs font-light text-white/70">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn btn-primary flex-1 text-center"
                >
                  สอบถามราคา / สั่งซื้อ
                </Link>
                <Link href="/shop" className="btn btn-secondary">
                  ← กลับ
                </Link>
              </div>

              {/* Stock */}
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${p.inStock ? "bg-green-500" : "bg-yellow-500"}`}
                />
                <span className="text-[10px] font-light text-white/30">
                  {p.inStock ? "พร้อมส่ง" : "สั่งจองล่วงหน้า"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/[0.06] px-8 py-16 sm:px-14">
          <div className="mx-auto max-w-[1500px]">
            <p className="eyebrow mb-3">สินค้าในหมวดเดียวกัน</p>
            <h2 className="mb-10 text-2xl font-bold tracking-tight">
              Related Products
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/shop/${r.slug}`}
                  className="group block border border-white/[0.07] bg-[#0c0c0c] transition-colors hover:border-[#DB5828]/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.nameEn}
                      fill
                      sizes="(min-width:1024px) 28vw, 50vw"
                      className="object-cover opacity-60 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/25">
                      {r.subcategory}
                    </p>
                    <h3 className="mb-1 text-sm font-semibold text-white">
                      {r.name}
                    </h3>
                    <p className="text-base font-semibold text-[#DB5828]">
                      ฿{Number(r.priceFrom).toLocaleString()}
                      <span className="ml-1 text-[10px] font-light text-white/30">
                        /{r.unit}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow="Need Project Pricing?"
        title="ต้องการสเปกหรือจำนวนมาก?"
        description="ทีม HAGX พร้อมช่วยประเมินราคา สเปก และการจัดส่งสำหรับคำสั่งซื้อโครงการ"
        primaryAction={{ href: "/contact", label: "สอบถามราคา" }}
        secondaryAction={{ href: "/shop", label: "ดูสินค้าอื่น" }}
      />

      <SiteFooter />
    </main>
  );
}

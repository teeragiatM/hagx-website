import DetailPageTemplate from "@/components/DetailPageTemplate";
import { categories, products } from "@/lib/products";
import type { Metadata } from "next";
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

  const body = (
    <div className="flex flex-col gap-6">
      <div className="border-l-2 border-accent-500 pl-4">
        <p className="text-sm font-light text-foreground-300 italic">{p.tagline}</p>
      </div>

      <p className="text-sm leading-8 font-light text-foreground-300">{p.desc}</p>

      {/* Price box */}
      <div className="border border-white/[0.07] bg-background-200 p-5">
        <p className="mb-1 text-xs font-light tracking-widest text-foreground-400 uppercase">ราคาเริ่มต้น</p>
        <p className="text-3xl font-bold text-accent-500">
          ฿{Number(p.priceFrom).toLocaleString()}
          <span className="ml-2 text-sm font-light text-foreground-400">/{p.unit}</span>
        </p>
        <p className="mt-2 text-[11px] font-light text-foreground-400">
          * ราคานี้เป็นราคาเริ่มต้น ขึ้นอยู่กับขนาดและปริมาณ
        </p>
      </div>

      {/* Specs table */}
      <div>
        <p className="mb-4 text-[10px] font-light tracking-widest text-foreground-400 uppercase">ข้อมูลจำเพาะ</p>
        <div className="divide-y divide-white/[0.06] border border-white/[0.06]">
          {p.specs.map((s) => (
            <div key={s.label} className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-light text-foreground-200">{s.label}</span>
              <span className="text-xs font-light text-foreground-200">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stock indicator */}
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${p.inStock ? "bg-green-500" : "bg-yellow-500"}`} />
        <span className="text-[10px] font-light text-foreground-400">
          {p.inStock ? "พร้อมส่ง" : "สั่งจองล่วงหน้า"}
        </span>
      </div>
    </div>
  );

  return (
    <DetailPageTemplate
      backHref="/shop"
      backLabel="Shop"
      breadcrumb={cat?.label}
      coverImage={p.images[0]}
      eyebrow={p.subcategory}
      title={p.name}
      subtitle={p.nameEn}
      body={body}
      gallery={p.images.slice(1)}
      details={[]}
      primaryAction={{ href: "/contact", label: "สอบถามราคา / สั่งซื้อ" }}
      secondaryAction={{ href: "/shop", label: "← กลับ" }}
      related={related.map((r) => ({
        href: `/shop/${r.slug}`,
        image: r.image,
        title: r.name,
        subtitle: r.subcategory,
      }))}
      relatedEyebrow="สินค้าในหมวดเดียวกัน"
      relatedTitle="Related Products"
      cta={{
        eyebrow: "Need Project Pricing?",
        title: "ต้องการสเปกหรือจำนวนมาก?",
        description:
          "ทีม HAGX พร้อมช่วยประเมินราคา สเปก และการจัดส่งสำหรับคำสั่งซื้อโครงการ",
        primary: { href: "/contact", label: "สอบถามราคา" },
        secondary: { href: "/shop", label: "ดูสินค้าอื่น" },
      }}
    />
  );
}

import { ProductEditPanel } from "@admin";
import DetailPageTemplate from "@sections/DetailPageTemplate";
import { getProductBySlug, getProducts } from "@/lib/supabase";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name_th} | HAGX Shop`,
    description: p.description_th ?? undefined,
    openGraph: {
      title: `${p.name_th} — ${p.name_en}`,
      description: p.description_th ?? undefined,
      images: p.cover_image ? [{ url: p.cover_image, width: 900, height: 675, alt: p.name_en }] : [],
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
  const [p, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);
  if (!p) notFound();

  const specs: { label: string; value: string }[] = Array.isArray(p.specs) ? p.specs : [];

  const related = allProducts
    .filter((r) => r.category_id === p.category_id && r.slug !== p.slug)
    .slice(0, 3);

  const body = (
    <div className="flex flex-col gap-5">
      <div className="border-l-2 border-accent-500 pl-4">
        <p className="text-sm font-light text-foreground-300 italic">{p.tagline_th}</p>
      </div>

      <p className="text-sm leading-8 font-light text-foreground-300">{p.description_th}</p>

      <div className="border border-white/[0.07] bg-background-200 p-5">
        <p className="mb-1 text-xs font-light tracking-widest text-foreground-400 uppercase">
          ราคาเริ่มต้น
        </p>
        <p className="text-3xl font-bold text-accent-500">
          ฿{Number(p.price_from).toLocaleString()}
          <span className="ml-2 text-sm font-light text-foreground-400">/{p.price_unit_th}</span>
        </p>
        {p.price_note_th && (
          <p className="mt-2 text-[11px] font-light text-foreground-400">{p.price_note_th}</p>
        )}
      </div>

      {specs.length > 0 && (
        <div>
          <p className="mb-4 text-[10px] font-light tracking-widest text-foreground-400 uppercase">
            ข้อมูลจำเพาะ
          </p>
          <div className="divide-y divide-white/[0.06] border border-white/[0.06]">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between px-4 py-3">
                <span className="text-xs font-light text-foreground-200">{s.label}</span>
                <span className="text-xs font-light text-foreground-200">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${p.in_stock ? "bg-green-500" : "bg-yellow-500"}`} />
        <span className="text-[10px] font-light text-foreground-400">
          {p.in_stock ? "พร้อมส่ง" : "สั่งจองล่วงหน้า"}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <DetailPageTemplate
        backHref="/shop"
        backLabel="Shop"
        breadcrumb={p.category?.name_th}
        coverImage={p.cover_image ?? undefined}
        eyebrow={p.subcategory?.name_en ?? undefined}
        title={p.name_th}
        subtitle={p.name_en}
        body={body}
        gallery={p.gallery ?? []}
        details={[]}
        primaryAction={{ href: "/contact", label: "สอบถามราคา / สั่งซื้อ" }}
        secondaryAction={{ href: "/shop", label: "← กลับ" }}
        related={related.map((r) => ({
          href: `/shop/${r.slug}`,
          image: r.cover_image ?? "",
          title: r.name_th,
          subtitle: r.subcategory?.name_en ?? undefined,
        }))}
        relatedEyebrow="สินค้าในหมวดเดียวกัน"
        relatedTitle="Related Products"
        cta={{
          eyebrow: "Need Project Pricing?",
          title: "ต้องการสเปกหรือจำนวนมาก?",
          description: "ทีม HAGX พร้อมช่วยประเมินราคา สเปก และการจัดส่งสำหรับคำสั่งซื้อโครงการ",
          primary: { href: "/contact", label: "สอบถามราคา" },
          secondary: { href: "/shop", label: "ดูสินค้าอื่น" },
        }}
      />
      <ProductEditPanel product={p} />
    </>
  );
}

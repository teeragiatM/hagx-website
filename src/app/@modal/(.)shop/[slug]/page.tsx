"use client";

import { useParams, useRouter } from "next/navigation";
import ModalShell from "@/components/ModalShell";
import { useI18n } from "@/i18n/useI18n";
import { products, categories } from "@/lib/products";

export default function ProductModal() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n("shop");

  const p = products.find((p) => p.slug === slug);
  if (!p) { router.back(); return null; }

  const cat = categories.find((c) => c.value === p.category);
  const tagged = products.filter((r) => r.category === p.category && r.slug !== p.slug);

  return (
    <ModalShell
      eyebrow={p.subcategory}
      title={p.name}
      subtitle={p.nameEn}
      tagline={p.tagline}
      details={[
        { label: t("modal.description"), value: p.desc },
        { label: t("modal.category"),    value: `${cat?.label ?? ""} › ${p.subcategory}` },
        ...p.specs.map((s) => ({ label: s.label, value: s.value })),
      ]}
      price={{
        amount: `฿${Number(p.priceFrom).toLocaleString()}`,
        unit: p.unit,
      }}
      stockStatus={{
        inStock: p.inStock,
        inLabel: t("modal.in_stock"),
        outLabel: t("modal.pre_order"),
      }}
      gallery={p.images.map((src) => ({ src, alt: p.nameEn }))}
      tags={tagged.map((r) => ({ label: r.name, slug: r.slug, href: `/shop/${r.slug}` }))}
      tagsLabel={t("modal.same_category")}
      cta={{ href: "/contact", label: t("modal.ask_cta") }}
      closeLabel={t("modal.close")}
    />
  );
}

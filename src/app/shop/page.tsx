"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import { FilterToolbar } from "@/components/ui/FilterToolbar";
import type { FilterValues } from "@/components/ui/FilterToolbar";
import {
  MediaCard,
  MediaCardBadge,
  MediaCardBody,
  MediaCardEyebrow,
  MediaCardFooter,
  MediaCardImage,
  MediaCardTitle,
} from "@/components/ui/MediaCard";
import { categories, products } from "@/lib/products";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const FILTER_GROUPS = [
  {
    key: "categories",
    label: "หมวดหมู่",
    type: "multi" as const,
    options: categories,
  },
  {
    key: "inStock",
    label: "พร้อมส่งเท่านั้น",
    type: "toggle" as const,
  },
];

const SORT_OPTIONS = [
  { value: "default", label: "ค่าเริ่มต้น" },
  { value: "price-asc", label: "ราคา ↑" },
  { value: "price-desc", label: "ราคา ↓" },
];

export default function ShopPage() {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    categories: [],
    inStock: false,
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const selectedCats = (filterValues.categories as string[]) ?? [];
  const inStockOnly = filterValues.inStock === true;

  const handleChange = (key: string, value: string[] | boolean) =>
    setFilterValues((prev) => ({ ...prev, [key]: value }));

  const handleClear = () => {
    setFilterValues({ categories: [], inStock: false });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    if (inStockOnly) list = list.filter((p) => p.inStock);
    if (search) list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc") list.sort((a, b) => +a.priceFrom - +b.priceFrom);
    if (sort === "price-desc") list.sort((a, b) => +b.priceFrom - +a.priceFrom);
    return list;
  }, [selectedCats, inStockOnly, search, sort]);

  return (
    <div>
      <PageHero
        eyebrow="Shop"
        title="วัสดุพรีเมียม"
        titleAlt="ราคาโรงงาน"
        subtitle="กระจก · อลูมิเนียม · ฮาร์ดแวร์ · สั่งตัดขนาดพิเศษได้ · ส่งทั่วประเทศ"
        minHeight="55vh"
      />

      <div className="mx-auto px-8 py-10 sm:px-14">
        <FilterToolbar
          groups={FILTER_GROUPS}
          values={filterValues}
          onChange={handleChange}
          onClear={handleClear}
          search={search}
          onSearch={setSearch}
          searchPlaceholder="ค้นหาสินค้า..."
          sort={{ value: sort, onChange: setSort, options: SORT_OPTIONS }}
          resultCount={filtered.length}
          totalCount={products.length}
          chipLabel={(key, value) =>
            key === "categories"
              ? (categories.find((c) => c.value === value)?.label ?? value)
              : value
          }
          className="mb-8"
        />

        <AnimatePresence mode="popLayout">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <MediaCard href={`/shop/${p.slug}`} animate={false}>
                  <MediaCardImage src={p.image} alt={p.nameEn} aspect="wide">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <MediaCardBadge position="top-left" className="static">
                        {categories.find((c) => c.value === p.category)?.label.split(" ")[0]}
                      </MediaCardBadge>
                      {!p.inStock && (
                        <MediaCardBadge position="top-left" className="static bg-black/70 text-foreground-400">
                          สั่งจอง
                        </MediaCardBadge>
                      )}
                    </div>
                    {p.featured && (
                      <MediaCardBadge position="top-right" variant="accent">Popular</MediaCardBadge>
                    )}
                  </MediaCardImage>

                  <MediaCardBody>
                    <MediaCardEyebrow className="text-xs text-foreground-400">{p.subcategory}</MediaCardEyebrow>
                    <MediaCardTitle className="mb-1 text-sm">{p.name}</MediaCardTitle>
                    <p className="text-foreground-200 mb-2 text-[11px] font-light">{p.nameEn}</p>
                    <p className="mb-3 line-clamp-2 text-[11px] leading-5 font-light text-foreground-400">{p.tagline}</p>
                    <MediaCardFooter
                      left={
                        <div>
                          <p className="text-xs font-light tracking-widest text-foreground-400 uppercase">เริ่มต้น</p>
                          <p className="text-base font-semibold text-accent-500">
                            ฿{Number(p.priceFrom).toLocaleString()}
                            <span className="ml-1 text-[10px] font-light text-foreground-400">/{p.unit}</span>
                          </p>
                        </div>
                      }
                      right={
                        <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors group-hover:text-accent-500">
                          รายละเอียด →
                        </span>
                      }
                    />
                  </MediaCardBody>
                </MediaCard>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-sm font-light text-foreground-400">ไม่พบสินค้าที่ตรงกัน</p>
            <button
              onClick={() => { handleClear(); setSearch(""); }}
              className="mt-4 text-xs font-light text-accent-500 underline underline-offset-4"
            >
              ล้าง Filter
            </button>
          </div>
        )}
      </div>

      <CtaSection
        eyebrow="ต้องการสินค้าในปริมาณมาก?"
        title="ติดต่อขอใบเสนอราคา"
        description="สำหรับโครงการหรือคำสั่งซื้อขนาดใหญ่ ทีม HAGX พร้อมให้ราคาพิเศษและจัดส่งตามกำหนด"
        primaryAction={{ href: "/contact", label: "สอบถามราคา Project" }}
        secondaryAction={{ href: "/services", label: "ดูบริการ" }}
      />
    </div>
  );
}

"use client";

import CTA from '@sections/CTA';
import PageHero from "@layout/PageHero";
import { PageListHeader } from "@layout";
import { Sheet } from "@ui/Sheet";
import {
  MediaCard,
  MediaCardBadge,
  MediaCardBody,
  MediaCardEyebrow,
  MediaCardFooter,
  MediaCardImage,
  MediaCardTitle,
} from "@ui/MediaCard";
import type { ProductCategoryRow, ProductRow } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const PAGE_SIZE = 9;

type Props = {
  products: ProductRow[];
  categories: ProductCategoryRow[];
};

const SORT_OPTIONS = [
  { value: "default", label: "ล่าสุด" },
  { value: "price-asc", label: "ราคา ↑" },
  { value: "price-desc", label: "ราคา ↓" },
];

function FilterCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2 text-sm font-light text-foreground-300 transition-colors hover:text-foreground-100">
      <span
        onClick={onChange}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-accent-500 bg-accent-500" : "border-border-300"
        )}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

export default function ShopPageClient({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const tabs = categories.map((c) => ({ value: c.slug, label: c.name_th }));

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "ALL") list = list.filter((p) => p.category?.slug === activeCategory);
    if (inStockOnly) list = list.filter((p) => p.in_stock);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name_th.toLowerCase().includes(q) || p.name_en.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => (a.price_from ?? 0) - (b.price_from ?? 0));
    if (sort === "price-desc") list.sort((a, b) => (b.price_from ?? 0) - (a.price_from ?? 0));
    return list;
  }, [products, activeCategory, inStockOnly, search, sort]);

  const displayed = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;
  const filterActive = activeCategory !== "ALL" || inStockOnly;

  const clearFilters = () => { setActiveCategory("ALL"); setInStockOnly(false); setSearch(""); };

  return (
    <>
      <PageHero
        eyebrow="HAGX SHOP"
        title="สินค้าและแพ็กเกจ"
        subtitle="ระบบ LED · ป้ายไฟ · อุปกรณ์ตกแต่ง · แพ็กเกจโครงการ"
        align="center"
        minHeight="60vh"
      />

    <div className="px-(--homepage-padding-inset)">
      <PageListHeader
        title="สินค้า"
        tabs={tabs}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
        allLabel="ทั้งหมด"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="ค้นหาสินค้า..."
        onFilterOpen={() => setFilterOpen(true)}
        filterActive={filterActive}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortOptions={SORT_OPTIONS}
        sort={sort}
        onSortChange={setSort}
        className="mb-10"
      />

      {filtered.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <p className="text-sm font-light text-foreground-400">ไม่พบสินค้าที่ตรงกัน</p>
          <button onClick={clearFilters} className="mt-4 text-xs font-light text-accent-500 underline underline-offset-4">ล้าง Filter</button>
        </div>
      ) : viewMode === "grid" ? (
        <AnimatePresence mode="popLayout">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayed.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <MediaCard href={`/shop/${p.slug}`} animate={false}>
                  <MediaCardImage src={p.cover_image ?? ""} alt={p.name_en} aspect="wide">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <MediaCardBadge position="top-left" className="static">{p.category?.name_th ?? ""}</MediaCardBadge>
                      {!p.in_stock && (
                        <MediaCardBadge position="top-left" className="static bg-black/70 text-foreground-400">สั่งจอง</MediaCardBadge>
                      )}
                    </div>
                    {p.is_featured && <MediaCardBadge position="top-right" variant="accent">Popular</MediaCardBadge>}
                  </MediaCardImage>
                  <MediaCardBody>
                    <MediaCardEyebrow className="text-xs text-foreground-400">{p.subcategory?.name_en ?? ""}</MediaCardEyebrow>
                    <MediaCardTitle className="mb-1 text-sm">{p.name_th}</MediaCardTitle>
                    <p className="mb-2 text-[11px] font-light text-foreground-200">{p.name_en}</p>
                    <p className="mb-3 line-clamp-2 text-[11px] leading-5 font-light text-foreground-400">{p.tagline_th}</p>
                    <MediaCardFooter
                      left={
                        <div>
                          <p className="text-xs font-light tracking-widest text-foreground-400 uppercase">เริ่มต้น</p>
                          <p className="text-base font-semibold text-accent-500">
                            ฿{Number(p.price_from).toLocaleString()}
                            <span className="ml-1 text-[10px] font-light text-foreground-400">/{p.price_unit_th}</span>
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
      ) : (
        /* ── LIST VIEW ── */
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {displayed.map((p) => (
            <a
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group flex items-center gap-4 py-3 transition-colors hover:bg-white/[0.02] sm:gap-5"
            >
              <div className="relative aspect-square w-14 shrink-0 overflow-hidden sm:w-16">
                <Image src={p.cover_image ?? ""} alt={p.name_en} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase">{p.category?.name_th ?? ""}</p>
                <p className="truncate text-sm font-light text-foreground-100 transition-colors group-hover:text-foreground">{p.name_th}</p>
                <p className="text-[10px] font-light text-foreground-400">{p.name_en}</p>
              </div>
              <div className="flex shrink-0 items-center gap-5 text-right">
                <div className="hidden sm:block">
                  <p className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">เริ่มต้น</p>
                  <p className="text-sm font-semibold text-accent-500">฿{Number(p.price_from).toLocaleString()}</p>
                </div>
                {!p.in_stock && (
                  <span className="hidden text-[10px] font-light text-foreground-400 md:block">สั่งจอง</span>
                )}
                <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors group-hover:text-accent-500">รายละเอียด →</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && filtered.length > 0 && (
        <div className="mt-14 mb-4 flex justify-center">
          <button
            onClick={() => setDisplayCount((c) => c + PAGE_SIZE)}
            className="group flex items-center gap-3 border border-white/10 px-8 py-3 text-xs font-light tracking-widest text-foreground-300 uppercase transition-colors hover:border-white/25 hover:text-foreground-100"
          >
            โหลดเพิ่มเติม
            <span className="text-foreground-400 transition-colors group-hover:text-foreground-200">({filtered.length - displayCount})</span>
          </button>
        </div>
      )}

      {/* Filter Sheet */}
      <Sheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="กรองสินค้า"
        footerSlot={
          <div className="px-6 py-4">
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full border border-accent-500 py-2.5 text-[10px] font-light tracking-widest text-accent-500 uppercase transition-colors hover:bg-accent-500 hover:text-background-100"
            >
              ดูผลลัพธ์ ({filtered.length})
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          {filterActive && (
            <button onClick={clearFilters} className="text-[10px] font-light tracking-widest text-accent-500 uppercase hover:text-foreground-100">
              ล้างทั้งหมด
            </button>
          )}

          <div>
            <p className="mb-3 border-b border-white/[0.08] pb-2 text-[10px] font-light tracking-widest text-foreground-400 uppercase">หมวดหมู่</p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <FilterCheck
                  key={cat.slug}
                  label={`${cat.name_th} (${cat.name_en})`}
                  checked={activeCategory === cat.slug}
                  onChange={() => setActiveCategory(activeCategory === cat.slug ? "ALL" : cat.slug)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 border-b border-white/[0.08] pb-2 text-[10px] font-light tracking-widest text-foreground-400 uppercase">สต็อก</p>
            <FilterCheck label="พร้อมส่งเท่านั้น" checked={inStockOnly} onChange={() => setInStockOnly((v) => !v)} />
          </div>

          <div>
            <p className="mb-3 border-b border-white/[0.08] pb-2 text-[10px] font-light tracking-widest text-foreground-400 uppercase">เรียงตาม</p>
            <div className="space-y-1">
              {SORT_OPTIONS.map((opt) => (
                <FilterCheck key={opt.value} label={opt.label} checked={sort === opt.value} onChange={() => setSort(opt.value)} />
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      <CTA
        eyebrow="ต้องการสินค้าในปริมาณมาก?"
        title="ติดต่อขอใบเสนอราคา"
        description="สำหรับโครงการหรือคำสั่งซื้อขนาดใหญ่ ทีม HAGX พร้อมให้ราคาพิเศษและจัดส่งตามกำหนด"
        primaryAction={{ href: '/contact', label: 'สอบถามราคา Project' }}
        secondaryAction={{ href: '/services', label: 'ดูบริการ' }}
      />
    </div>
    </>
  );
}

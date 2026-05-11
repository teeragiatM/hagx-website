"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { products, categories } from "@/lib/products";

function FilterCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1 text-sm font-light text-white/45 transition-colors hover:text-white">
      <span
        onClick={onChange}
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${checked ? "border-[#ff8a00] bg-[#ff8a00]" : "border-white/20 bg-transparent"}`}
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

export default function ShopPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggle = (arr: string[], setArr: (a: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const clearAll = () => { setSelectedCats([]); setInStockOnly(false); setSearch(""); };
  const hasFilter = selectedCats.length || inStockOnly || search;

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCats.length) list = list.filter(p => selectedCats.includes(p.category));
    if (inStockOnly) list = list.filter(p => p.inStock);
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc") list.sort((a, b) => +a.priceFrom - +b.priceFrom);
    if (sort === "price-desc") list.sort((a, b) => +b.priceFrom - +a.priceFrom);
    return list;
  }, [selectedCats, inStockOnly, search, sort]);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <PageHero
        eyebrow="Shop"
        title="วัสดุพรีเมียม"
        titleAlt="ราคาโรงงาน"
        subtitle="กระจก · อลูมิเนียม · ฮาร์ดแวร์ · สั่งตัดขนาดพิเศษได้ · ส่งทั่วประเทศ"
        minHeight="55vh"
      />

      <div className="mx-auto max-w-[1500px] flex flex-col gap-0 lg:flex-row">

        {/* ── Sidebar ── */}
        <aside className={`shrink-0 border-b border-white/[0.06] px-8 py-8 sm:px-14 lg:border-b-0 lg:border-r lg:px-10 lg:py-10 ${sidebarOpen ? "lg:w-64" : "lg:w-14"} transition-all duration-300`}>

          {/* toggle button desktop */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="mb-6 hidden items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/25 hover:text-white lg:flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {sidebarOpen && "Filter"}
          </button>

          {sidebarOpen && (
            <div className="space-y-8">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="contact-input text-sm"
                />
              </div>

              {/* Categories */}
              {categories.map(cat => (
                <div key={cat.value}>
                  <p className="mb-3 border-b border-white/[0.06] pb-2 text-[10px] font-light uppercase tracking-widest text-white/25">
                    {cat.label}
                  </p>
                  <FilterCheck
                    label="ทั้งหมด"
                    checked={selectedCats.includes(cat.value)}
                    onChange={() => toggle(selectedCats, setSelectedCats, cat.value)}
                  />
                </div>
              ))}

              {/* Stock */}
              <div>
                <p className="mb-3 border-b border-white/[0.06] pb-2 text-[10px] font-light uppercase tracking-widest text-white/25">สต๊อก</p>
                <FilterCheck label="พร้อมส่งเท่านั้น" checked={inStockOnly} onChange={() => setInStockOnly(v => !v)} />
              </div>

              {hasFilter && (
                <button onClick={clearAll} className="text-[10px] font-light uppercase tracking-widest text-[#ff8a00] hover:text-white">
                  ล้างทั้งหมด ×
                </button>
              )}
            </div>
          )}
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 px-8 py-10 sm:px-14 lg:px-10">
          {/* toolbar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-light text-white/35">
              แสดง <span className="text-white">{filtered.length}</span> / {products.length} รายการ
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-light uppercase tracking-widest text-white/25">เรียงโดย</span>
              {(["default", "price-asc", "price-desc"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`text-[10px] font-light uppercase tracking-widest transition-colors ${sort === s ? "text-[#ff8a00]" : "text-white/30 hover:text-white"}`}
                >
                  {s === "default" ? "ค่าเริ่มต้น" : s === "price-asc" ? "ราคา ↑" : "ราคา ↓"}
                </button>
              ))}
            </div>
          </div>

          {/* active filter chips */}
          {hasFilter && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCats.map(c => (
                <span key={c} className="flex items-center gap-2 border border-[#ff8a00]/30 bg-[#ff8a00]/10 px-3 py-1 text-[10px] font-light text-[#ff8a00]">
                  {categories.find(cat => cat.value === c)?.label}
                  <button onClick={() => toggle(selectedCats, setSelectedCats, c)}>×</button>
                </span>
              ))}
              {inStockOnly && (
                <span className="flex items-center gap-2 border border-white/15 px-3 py-1 text-[10px] font-light text-white/40">
                  พร้อมส่ง <button onClick={() => setInStockOnly(false)}>×</button>
                </span>
              )}
              {search && (
                <span className="flex items-center gap-2 border border-white/15 px-3 py-1 text-[10px] font-light text-white/40">
                  "{search}" <button onClick={() => setSearch("")}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(p => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/shop/${p.slug}`} className="group block border border-white/[0.07] bg-[#0c0c0c] transition-colors hover:border-[#ff8a00]/30">
                    {/* image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.nameEn}
                        fill
                        sizes="(min-width:1280px) 22vw, (min-width:640px) 40vw, 90vw"
                        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent" />

                      {/* badges */}
                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="border border-white/15 bg-black/50 px-2.5 py-1 text-[9px] font-light uppercase tracking-widest text-white/60 backdrop-blur-sm">
                          {categories.find(c => c.value === p.category)?.label.split(" ")[0]}
                        </span>
                        {!p.inStock && (
                          <span className="border border-white/15 bg-black/70 px-2.5 py-1 text-[9px] font-light uppercase tracking-widest text-white/40 backdrop-blur-sm">
                            สั่งจอง
                          </span>
                        )}
                      </div>

                      {p.featured && (
                        <span className="absolute right-4 top-4 border border-[#ff8a00]/50 bg-[#ff8a00]/15 px-2.5 py-1 text-[9px] font-light uppercase tracking-widest text-[#ff8a00]">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* info */}
                    <div className="p-5">
                      <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/25">{p.subcategory}</p>
                      <h2 className="mb-1 text-sm font-semibold leading-tight text-white">{p.name}</h2>
                      <p className="mb-3 text-[11px] font-light text-white/35">{p.nameEn}</p>
                      <p className="text-[11px] font-light leading-5 text-white/30 line-clamp-2">{p.tagline}</p>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-[9px] font-light uppercase tracking-widest text-white/20">เริ่มต้น</p>
                          <p className="text-base font-semibold text-[#ff8a00]">
                            ฿{Number(p.priceFrom).toLocaleString()}
                            <span className="ml-1 text-[10px] font-light text-white/30">/{p.unit}</span>
                          </p>
                        </div>
                        <span className="text-[10px] font-light uppercase tracking-widest text-white/20 transition-colors group-hover:text-[#ff8a00]">
                          รายละเอียด →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <p className="text-white/25 text-sm font-light">ไม่พบสินค้าที่ตรงกัน</p>
              <button onClick={clearAll} className="mt-4 text-xs font-light text-[#ff8a00] underline underline-offset-4">ล้าง Filter</button>
            </div>
          )}

        </div>
      </div>

      <CtaSection
        eyebrow="ต้องการสินค้าในปริมาณมาก?"
        title="ติดต่อขอใบเสนอราคา"
        description="สำหรับโครงการหรือคำสั่งซื้อขนาดใหญ่ ทีม HAGX พร้อมให้ราคาพิเศษและจัดส่งตามกำหนด"
        primaryAction={{ href: "/contact", label: "สอบถามราคา Project" }}
        secondaryAction={{ href: "/services", label: "ดูบริการ" }}
      />

      <SiteFooter />
    </main>
  );
}

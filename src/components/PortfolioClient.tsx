"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LocalizedPortfolioItem } from "@/lib/localizePortfolio";
import { typeOptions, categoryOptions } from "@/lib/projects";

// ── Map constants ─────────────────────────────────────────────────────────────

const MAP_PINS = [
  { name: "กรุงเทพฯ", left: "51%", top: "58%", count: 68 },
  { name: "ชลบุรี / พัทยา", left: "58%", top: "62%", count: 12 },
  { name: "เชียงใหม่", left: "35%", top: "23%", count: 8 },
  { name: "หัวหิน", left: "44%", top: "72%", count: 15 },
  { name: "ภูเก็ต", left: "30%", top: "90%", count: 10 },
  { name: "ขอนแก่น", left: "65%", top: "44%", count: 5 },
  { name: "เชียงราย", left: "40%", top: "11%", count: 3 },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function ThailandMap({
  activePin,
  setActivePin,
}: {
  activePin: string | null;
  setActivePin: (n: string | null) => void;
}) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,138,0,0.16),transparent_58%)]" />
        <svg
          viewBox="0 0 420 620"
          className="absolute inset-0 h-full w-full drop-shadow-[0_22px_60px_rgba(255,138,0,0.08)]"
          aria-hidden
        >
          <path
            d="M178 28c37 10 70 34 80 70 8 29-9 45-2 74 6 24 28 31 39 55 14 31-2 68 16 95 14 21 43 21 55 43 14 25-6 54-25 76-23 27-42 51-38 86 3 27 19 49 9 61-13 15-53-2-77-23-30-26-34-62-61-69-25-7-40 21-68 11-27-10-35-45-37-70-4-41 16-74 37-106 17-27 35-55 30-88-4-28-23-41-28-68-8-47 33-91 70-147Z"
            fill="rgba(255,138,0,0.08)"
            stroke="rgba(255,138,0,0.42)"
            strokeWidth="2"
          />
          <path
            d="M167 86c42 31 63 66 64 105 1 52-36 86-34 132 2 44 38 73 35 116-2 32-25 61-49 83"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="absolute inset-8">
        {MAP_PINS.map((loc) => (
          <button
            key={loc.name}
            type="button"
            onClick={() => setActivePin(activePin === loc.name ? null : loc.name)}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
            style={{ left: loc.left, top: loc.top }}
            aria-label={loc.name}
          >
            <motion.span
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff8a00]/30 bg-[#ff8a00]/10"
              animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="relative z-10 block h-3 w-3 rounded-full border border-white bg-[#ff8a00]"
              whileHover={{ scale: 1.45 }}
            />
            <span className="absolute left-1/2 top-[-26px] hidden -translate-x-1/2 whitespace-nowrap text-[10px] font-light text-white/70 sm:block">
              {loc.name}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activePin && (() => {
          const loc = MAP_PINS.find((l) => l.name === activePin)!;
          return (
            <motion.div
              key={activePin}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute left-6 top-6 w-52 border border-[#ff8a00]/30 bg-gradient-to-br from-[#7a3500] to-[#2a1000] p-5 shadow-2xl"
            >
              <p className="mb-1 text-xs font-light uppercase tracking-widest text-[#ff8a00]">Location</p>
              <h3 className="text-xl font-bold text-white">{loc.name}</h3>
              <p className="mt-3 text-3xl font-bold text-[#ff8a00]">{loc.count}+</p>
              <p className="text-xs font-light text-white/50">Projects Completed</p>
              <button
                onClick={() => setActivePin(null)}
                className="mt-4 text-[10px] font-light uppercase tracking-widest text-white/30 hover:text-white"
              >
                Close ×
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-light text-white/50 hover:text-white">
      <span
        onClick={onChange}
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
          checked ? "border-[#ff8a00] bg-[#ff8a00]" : "border-white/20"
        }`}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 10 10">
            <path d="M1.5 5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

// ── Main client component ─────────────────────────────────────────────────────

export default function PortfolioClient({ items }: { items: LocalizedPortfolioItem[] }) {
  const [activePin, setActivePin]               = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes]       = useState<string[]>([]);
  const [selectedCategories, setSelectedCats]   = useState<string[]>([]);
  const [selectedLocations, setSelectedLocs]    = useState<string[]>([]);

  const toggle = (arr: string[], setArr: (a: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const locationOptions = useMemo(
    () => items.map((p) => p.location).filter((v, i, a) => a.indexOf(v) === i),
    [items]
  );

  const filtered = useMemo(
    () =>
      items.filter((p) => {
        if (selectedTypes.length      && !selectedTypes.includes(p.type))         return false;
        if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
        if (selectedLocations.length  && !selectedLocations.includes(p.location))  return false;
        return true;
      }),
    [items, selectedTypes, selectedCategories, selectedLocations]
  );

  const clearAll = () => { setSelectedTypes([]); setSelectedCats([]); setSelectedLocs([]); };
  const hasFilter = selectedTypes.length || selectedCategories.length || selectedLocations.length;

  return (
    <>
      {/* ── HERO MAP ── */}
      <section className="relative h-[85vh] overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[#080808]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 70% at 65% 55%, rgba(80,30,0,0.5) 0%, transparent 65%)" }}
        />

        <div className="absolute inset-0">
          <ThailandMap activePin={activePin} setActivePin={setActivePin} />
        </div>

        <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 sm:left-14">
          <p className="eyebrow mb-4">Our Projects</p>
          <h1 className="max-w-xs text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Across<br />Thailand
          </h1>
          <p className="mt-5 max-w-[220px] text-sm font-light leading-7 text-white/40">
            คลิกจุดบนแผนที่เพื่อดูโครงการในแต่ละพื้นที่
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2">
            {([["120+", "Projects"], ["7", "Provinces"], ["10+", "Years"]] as const).map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-[#ff8a00]">{n}</p>
                <p className="text-[10px] font-light uppercase tracking-widest text-white/30">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="container-site section-py">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Sidebar */}
          <aside className="shrink-0 lg:w-56">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Filter</h2>
              {hasFilter ? (
                <button
                  onClick={clearAll}
                  className="text-[10px] font-light uppercase tracking-widest text-[#ff8a00] hover:text-white"
                >
                  Clear all
                </button>
              ) : null}
            </div>

            <div className="space-y-8">
              <div>
                <p className="mb-4 border-b border-white/[0.06] pb-2 text-[10px] font-light uppercase tracking-widest text-white/30">
                  Project Type
                </p>
                <div className="space-y-3">
                  {typeOptions.map((opt) => (
                    <FilterCheck
                      key={opt.value}
                      label={opt.label}
                      checked={selectedTypes.includes(opt.value)}
                      onChange={() => toggle(selectedTypes, setSelectedTypes, opt.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 border-b border-white/[0.06] pb-2 text-[10px] font-light uppercase tracking-widest text-white/30">
                  Scope of Work
                </p>
                <div className="space-y-3">
                  {categoryOptions.map((opt) => (
                    <FilterCheck
                      key={opt.value}
                      label={opt.label}
                      checked={selectedCategories.includes(opt.value)}
                      onChange={() => toggle(selectedCategories, setSelectedCats, opt.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 border-b border-white/[0.06] pb-2 text-[10px] font-light uppercase tracking-widest text-white/30">
                  Location
                </p>
                <div className="space-y-3">
                  {locationOptions.map((loc) => (
                    <FilterCheck
                      key={loc}
                      label={loc}
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggle(selectedLocations, setSelectedLocs, loc)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-light text-white/40">
                แสดง <span className="text-white">{filtered.length}</span> โครงการ
              </p>
              {hasFilter && (
                <div className="flex flex-wrap gap-2">
                  {[...selectedTypes, ...selectedCategories, ...selectedLocations].map((v) => (
                    <span
                      key={v}
                      className="flex items-center gap-1 border border-[#ff8a00]/30 bg-[#ff8a00]/10 px-3 py-1 text-[10px] font-light text-[#ff8a00]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/portfolio/${p.slug}`}
                      className="group relative block overflow-hidden border border-white/[0.06] bg-[#0c0c0c] transition-colors hover:border-[#ff8a00]/30"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={p.cover_image}
                          alt={p.title}
                          fill
                          sizes="(min-width:1280px) 22vw, (min-width:640px) 40vw, 90vw"
                          className="object-cover opacity-65 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/90 via-transparent to-transparent" />
                        <span className="absolute right-4 top-4 border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-light uppercase tracking-widest text-white/50 backdrop-blur-sm">
                          {p.year}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="mb-1 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">{p.location}</p>
                        <h3 className="mb-2 text-base font-semibold text-white">{p.title}</h3>
                        <p className="text-[10px] font-light uppercase tracking-widest text-white/25">{p.scope}</p>
                        <span className="mt-3 block text-[10px] font-light uppercase tracking-widest text-white/20 transition-colors group-hover:text-[#ff8a00]">
                          ดูรายละเอียด →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="flex h-60 flex-col items-center justify-center text-center">
                <p className="text-sm font-light text-white/25">ไม่พบโครงการที่ตรงกับ Filter ที่เลือก</p>
                <button
                  onClick={clearAll}
                  className="mt-4 text-xs font-light text-[#ff8a00] underline underline-offset-4"
                >
                  ล้าง Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

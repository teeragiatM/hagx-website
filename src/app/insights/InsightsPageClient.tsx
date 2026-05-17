"use client";

import {
  MediaCard,
  MediaCardArrow,
  MediaCardBadge,
  MediaCardBody,
  MediaCardExcerpt,
  MediaCardFooter,
  MediaCardImage,
  MediaCardMeta,
  MediaCardTitle,
} from "@ui/MediaCard";
import { Sheet } from "@ui/Sheet";
import { PageListHeader } from "@layout";
import type { ArticleRow } from "@/lib/supabase";
import { useI18n } from "@/i18n/useI18n";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui";


const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "newest", label: "ล่าสุด" },
  { value: "oldest", label: "เก่าสุด" },
];

const categoryColors: Record<string, string> = {
  TECHNICAL: "text-accent-500 border-accent-500/40",
  "CASE STUDY": "text-sky-400 border-sky-400/40",
  DESIGN: "text-violet-400 border-violet-400/40",
  MAINTENANCE: "text-emerald-400 border-emerald-400/40",
};

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPageClient({ articles }: { articles: ArticleRow[] }) {
  const { lang } = useI18n("nav");

  // Applied filter state (committed on Apply)
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // Draft filter state (pending inside Sheet)
  const [draftCategory, setDraftCategory] = useState<string>("ALL");
  const [draftSearch, setDraftSearch] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");

  const categories = useMemo(() =>
    Array.from(new Set(articles.map((a) => a.category).filter(Boolean))) as string[],
    [articles]
  );

  const filtered = useMemo(() => {
    const list = articles.filter((post) => {
      const matchCat = activeCategory === "ALL" || post.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        (lang === "th" ? post.title_th : post.title_en)?.toLowerCase().includes(q) ||
        (lang === "th" ? post.excerpt_th : post.excerpt_en)?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
    list.sort((a, b) => {
      const da = a.published_at ? new Date(a.published_at).getTime() : 0;
      const db = b.published_at ? new Date(b.published_at).getTime() : 0;
      return sort === "oldest" ? da - db : db - da;
    });
    return list;
  }, [articles, activeCategory, search, lang, sort]);

  const displayed = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  const openFilter = () => {
    setDraftCategory(activeCategory);
    setDraftSearch(search);
    setFilterOpen(true);
  };

  const applyFilters = () => {
    setActiveCategory(draftCategory);
    setSearch(draftSearch);
    setDisplayCount(PAGE_SIZE);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setActiveCategory("ALL");
    setSearch("");
    setDraftCategory("ALL");
    setDraftSearch("");
  };

  const title = (p: ArticleRow) => (lang === "th" ? p.title_th : p.title_en);
  const excerpt = (p: ArticleRow) => lang === "th" ? (p.excerpt_th ?? "") : (p.excerpt_en ?? "");
  const category = (p: ArticleRow) => p.category ?? "";

  // Count results with draft filters (for Apply button label)
  const draftFiltered = useMemo(() => {
    return articles.filter((post) => {
      const matchCat = draftCategory === "ALL" || post.category === draftCategory;
      const q = draftSearch.toLowerCase();
      const matchSearch =
        !q ||
        (lang === "th" ? post.title_th : post.title_en)?.toLowerCase().includes(q) ||
        (lang === "th" ? post.excerpt_th : post.excerpt_en)?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [articles, draftCategory, draftSearch, lang]);

  return (
    <section className="px-(--homepage-padding-inset)">
      <PageListHeader
        title={lang === "th" ? "บทความ" : "Knowledge"}
        tabs={categories.map((c) => ({ value: c, label: c }))}
        activeTab={activeCategory}
        onTabChange={(tab) => { setActiveCategory(tab); setDraftCategory(tab); setDisplayCount(PAGE_SIZE); }}
        allLabel={lang === "th" ? "ทั้งหมด" : "All"}
        search={search}
        onSearch={(v) => { setSearch(v); setDraftSearch(v); }}
        searchPlaceholder={lang === "th" ? "ค้นหา..." : "Search..."}
        onFilterOpen={openFilter}
        filterActive={activeCategory !== "ALL"}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortOptions={SORT_OPTIONS}
        sort={sort}
        onSortChange={(v) => { setSort(v); setDisplayCount(PAGE_SIZE); }}
        className="mb-10"
      />

      {/* ── CONTENT ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-32 text-center">
          <p className="text-sm font-light text-foreground-300">
            {lang === "th" ? "ไม่พบบทความ" : "No articles found"}
          </p>
          <button onClick={clearFilters} className="text-xs font-light text-accent-500 underline">
            {lang === "th" ? "ล้างตัวกรอง" : "Clear filters"}
          </button>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            /* ── GRID VIEW ── */
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.map((post, i) => (
                <MediaCard
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  animateDelay={(i % 3) * 0.1}
                  className="bg-[#121212]/80 backdrop-blur-sm"
                >
                  <MediaCardImage
                    src={post.cover_image ?? ""}
                    alt={title(post)}
                    aspect="video"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    gradientFrom="#121212"
                  >
                    {post.is_featured && (
                      <MediaCardBadge
                        position="top-left"
                        className="border-transparent bg-accent-500 font-semibold text-black"
                      >
                        {lang === "th" ? "แนะนำ" : "Featured"}
                      </MediaCardBadge>
                    )}
                  </MediaCardImage>

                  <MediaCardBody className="p-6">
                    <MediaCardMeta
                      className="mb-4"
                      left={
                        <span className={`border px-2.5 py-1 text-xs font-light tracking-[0.15em] uppercase ${categoryColors[post.category ?? ""] ?? "border-white/15 text-foreground-400"}`}>
                          {category(post)}
                        </span>
                      }
                      right={
                        <span className="text-[10px] font-light text-foreground-400">
                          {post.reading_time} {lang === "th" ? "นาที" : "min read"}
                        </span>
                      }
                    />
                    <MediaCardTitle className="mb-3 line-clamp-2 sm:text-lg">
                      {title(post)}
                    </MediaCardTitle>
                    <MediaCardExcerpt>{excerpt(post)}</MediaCardExcerpt>
                    <MediaCardFooter
                      left={
                        <span className="text-[10px] font-light text-foreground-400">
                          {post.published_at ? formatDate(post.published_at, lang) : ""}
                        </span>
                      }
                      right={<MediaCardArrow label={lang === "th" ? "อ่าน" : "Read"} />}
                    />
                  </MediaCardBody>
                </MediaCard>
              ))}
            </div>
          ) : (
            /* ── LIST VIEW ── */
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {displayed.map((post) => (
                <a
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group flex items-start justify-between gap-6 py-5 transition-colors hover:bg-white/[0.02] sm:items-center sm:py-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className={`border px-2 py-0.5 text-[10px] font-light tracking-[0.15em] uppercase ${categoryColors[post.category ?? ""] ?? "border-white/15 text-foreground-400"}`}>
                        {category(post)}
                      </span>
                      {post.is_featured && (
                        <span className="border border-transparent bg-accent-500 px-2 py-0.5 text-[10px] font-semibold text-black">
                          {lang === "th" ? "แนะนำ" : "Featured"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-light text-foreground-100 transition-colors group-hover:text-foreground line-clamp-1">
                      {title(post)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-6 text-right">
                    <span className="hidden text-[10px] font-light text-foreground-400 sm:block">
                      {post.published_at ? formatDate(post.published_at, lang) : ""}
                    </span>
                    <span className="hidden text-[10px] font-light text-foreground-400 md:block">
                      {post.reading_time} {lang === "th" ? "นาที" : "min read"}
                    </span>
                    <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors group-hover:text-accent-500">
                      {lang === "th" ? "อ่าน →" : "Read →"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* ── LOAD MORE ── */}
          {hasMore && (
            <div className="mt-14 flex justify-center">
              <Button variant="secondary" onClick={() => setDisplayCount((c) => c + PAGE_SIZE)}>
                {lang === "th" ? "โหลดเพิ่มเติม" : "Load more"}
                <span className="ml-2 text-foreground-400">({filtered.length - displayCount})</span>
              </Button>
            </div>
          )}
        </>
      )}

      {/* ── FILTER SHEET ── */}
      <Sheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title={lang === "th" ? "กรองเนื้อหา" : "Filter"}
        footerSlot={
          <div className="flex gap-3 px-6 py-4">
            {(draftCategory !== "ALL" || draftSearch) && (
              <button
                onClick={() => { setDraftCategory("ALL"); setDraftSearch(""); }}
                className="text-[10px] font-light tracking-widest text-foreground-400 uppercase hover:text-foreground-100 transition-colors"
              >
                {lang === "th" ? "ล้าง" : "Clear"}
              </button>
            )}
            <button
              onClick={applyFilters}
              className="flex-1 border border-accent-500 py-2.5 text-[10px] font-light tracking-widest text-accent-500 uppercase transition-colors hover:bg-accent-500 hover:text-black"
            >
              {lang === "th" ? `ดูผลลัพธ์ (${draftFiltered.length})` : `Apply (${draftFiltered.length})`}
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          {/* Search inside sheet */}
          <div>
            <p className="mb-3 text-[10px] font-light tracking-widest text-foreground-400 uppercase">
              {lang === "th" ? "ค้นหา" : "Search"}
            </p>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-foreground-400" />
              <input
                type="text"
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                placeholder={lang === "th" ? "ค้นหา..." : "Search..."}
                className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-9 pr-3 text-xs text-foreground-100 placeholder:text-foreground-400 focus:border-white/20 focus:outline-none"
              />
              {draftSearch && (
                <button onClick={() => setDraftSearch("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground-400 hover:text-foreground-100">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="mb-3 text-[10px] font-light tracking-widest text-foreground-400 uppercase">
              {lang === "th" ? "ประเภท" : "Category"}
            </p>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setDraftCategory("ALL")}
                className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-xs font-light transition-colors ${
                  draftCategory === "ALL"
                    ? "bg-foreground-100 text-[#0a0a0a]"
                    : "text-foreground-300 hover:bg-white/[0.05] hover:text-foreground-100"
                }`}
              >
                {lang === "th" ? "ทั้งหมด" : "All"}
                <span className="text-[10px] opacity-60">{articles.length}</span>
              </button>
              {categories.map((cat) => {
                const count = articles.filter((a) => a.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setDraftCategory(draftCategory === cat ? "ALL" : cat)}
                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-xs font-light transition-colors ${
                      draftCategory === cat
                        ? "bg-foreground-100 text-[#0a0a0a]"
                        : "text-foreground-300 hover:bg-white/[0.05] hover:text-foreground-100"
                    }`}
                  >
                    {cat}
                    <span className="text-[10px] opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Sheet>
    </section>
  );
}

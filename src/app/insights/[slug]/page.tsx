"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { insightPosts } from "@/content/insights";
import { useI18n } from "@/i18n/useI18n";

const categoryColors: Record<string, string> = {
  TECHNICAL:    "text-[#ff8a00] border-[#ff8a00]/40 bg-[#ff8a00]/[0.06]",
  "CASE STUDY": "text-sky-400 border-sky-400/40 bg-sky-400/[0.06]",
  DESIGN:       "text-violet-400 border-violet-400/40 bg-violet-400/[0.06]",
  MAINTENANCE:  "text-emerald-400 border-emerald-400/40 bg-emerald-400/[0.06]",
};

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function renderBody(md: string) {
  return md.split("\n\n").map((block, i) => {
    if (block.startsWith("**") && block.endsWith("**")) {
      return (
        <h3 key={i} className="mt-10 mb-4 text-lg font-semibold text-white">
          {block.replace(/\*\*/g, "")}
        </h3>
      );
    }
    // inline bold
    const parts = block.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") ? (
        <strong key={j} className="font-semibold text-white">{part.replace(/\*\*/g, "")}</strong>
      ) : part
    );
    return (
      <p key={i} className="mb-5 text-sm font-light leading-[1.9] text-white/60">
        {parts}
      </p>
    );
  });
}

export default function InsightPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = insightPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { lang } = useI18n("nav");
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const title    = lang === "th" ? post.titleTh    : post.title;
  const excerpt  = lang === "th" ? post.excerptTh  : post.excerpt;
  const body     = lang === "th" ? post.bodyTh     : post.body;
  const category = lang === "th" ? post.categoryTh : post.category;

  const related = insightPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed left-0 top-0 z-[100] h-[2px] w-full bg-[#ff8a00] shadow-[0_0_12px_rgba(255,138,0,0.7)]"
      />

      <SiteNav />

      {/* ── HERO ── */}
      <section className="hero-bottom-shadow relative h-[65vh] min-h-[420px] overflow-hidden">
        <Image
          src={post.image}
          alt={title}
          fill priority sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/22" />

        <div className="relative flex h-full flex-col justify-end px-6 pb-14 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-4xl"
          >
            {/* breadcrumb */}
            <div className="mb-5 flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/30">
              <Link href="/insights" className="transition-colors hover:text-white">
                {lang === "th" ? "บทความ" : "Insights"}
              </Link>
              <span>/</span>
              <span className={`border px-2 py-0.5 ${categoryColors[post.category] ?? "text-white/40 border-white/15"}`}>
                {category}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-[11px] font-light text-white/35">
              <span>{formatDate(post.date, lang)}</span>
              <span className="h-3 w-px bg-white/20" />
              <span>{post.readMin} {lang === "th" ? "นาทีในการอ่าน" : "min read"}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BODY + SIDEBAR ── */}
      <div className="mx-auto grid max-w-[1500px] gap-0 px-6 pb-8 pt-14 sm:px-10 lg:grid-cols-[1fr_300px] lg:gap-16 lg:px-14">

        {/* article */}
        <article ref={articleRef}>
          {/* lead */}
          <p className="mb-10 border-l-2 border-[#ff8a00] pl-6 text-base font-light leading-[1.9] text-white/65 sm:text-lg">
            {excerpt}
          </p>

          <div className="prose-invert max-w-none">
            {renderBody(body)}
          </div>

          {/* divider */}
          <div className="my-14 h-px bg-gradient-to-r from-[#ff8a00]/30 via-white/10 to-transparent" />

          {/* ── CTA ── */}
          <div className="border border-[#ff8a00]/20 bg-[#ff8a00]/[0.04] p-8 sm:p-10">
            <p className="mb-2 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
              {lang === "th" ? "พูดคุยกับผู้เชี่ยวชาญ" : "Talk to an Expert"}
            </p>
            <h3 className="mb-3 text-xl font-bold sm:text-2xl">
              {lang === "th"
                ? "มีคำถามเกี่ยวกับโครงการของคุณ?"
                : "Have questions about your project?"}
            </h3>
            <p className="mb-7 max-w-lg text-sm font-light leading-7 text-white/45">
              {lang === "th"
                ? "ทีม HAGX พร้อมให้คำปรึกษาด้านวัสดุ ระบบ และงบประมาณ — ไม่มีค่าใช้จ่าย"
                : "The HAGX team can advise on materials, systems, and budget — at no cost."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#ff8a00] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#ff9f33]"
            >
              {lang === "th" ? "ปรึกษาผู้เชี่ยวชาญ" : "Consult an Expert"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="mt-12 space-y-6 lg:mt-0">
          {/* quick specs */}
          {post.specs && post.specs.length > 0 && (
            <div className="sticky top-28">
              <div className="border border-white/[0.08] bg-[#121212]/80 backdrop-blur-sm">
                <div className="border-b border-white/[0.06] px-6 py-4">
                  <p className="text-[10px] font-light uppercase tracking-[0.18em] text-[#ff8a00]">
                    {lang === "th" ? "ข้อมูลเทคนิค" : "Quick Specs"}
                  </p>
                </div>
                <div className="divide-y divide-white/[0.05] px-6">
                  {post.specs.map((s) => (
                    <div key={s.label} className="py-4">
                      <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/30">{s.label}</p>
                      <p className="text-sm font-light text-white/75">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* back to insights */}
              <Link
                href="/insights"
                className="mt-4 flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/30 transition-colors hover:text-white"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M11 6H1M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {lang === "th" ? "บทความทั้งหมด" : "All Articles"}
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section className="border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <p className="mb-2 text-[10px] font-light uppercase tracking-[0.2em] text-[#ff8a00]">
              {lang === "th" ? "บทความที่เกี่ยวข้อง" : "Related Articles"}
            </p>
            <h2 className="mb-10 text-2xl font-bold">
              {lang === "th" ? "อ่านเพิ่มเติม" : "Continue Reading"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/insights/${rp.slug}`} className="group block">
                  <div className="flex gap-5 border border-white/[0.07] bg-[#121212]/80 p-5 transition-all duration-300 hover:border-[#ff8a00]/30 hover:shadow-[0_0_24px_rgba(255,138,0,0.08)]">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden">
                      <Image src={rp.image} alt={lang === "th" ? rp.titleTh : rp.title} fill sizes="112px" className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"/>
                    </div>
                    <div className="min-w-0">
                      <span className={`mb-2 inline-block border px-2 py-0.5 text-[9px] font-light uppercase tracking-widest ${categoryColors[rp.category] ?? "text-white/40 border-white/15"}`}>
                        {lang === "th" ? rp.categoryTh : rp.category}
                      </span>
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white/80 transition-colors group-hover:text-white">
                        {lang === "th" ? rp.titleTh : rp.title}
                      </h3>
                    </div>
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

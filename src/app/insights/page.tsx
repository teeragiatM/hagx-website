"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { insightPosts } from "@/content/insights";
import { useI18n } from "@/i18n/useI18n";

const categoryColors: Record<string, string> = {
  TECHNICAL:   "text-[#ff8a00] border-[#ff8a00]/40",
  "CASE STUDY":"text-sky-400 border-sky-400/40",
  DESIGN:      "text-violet-400 border-violet-400/40",
  MAINTENANCE: "text-emerald-400 border-emerald-400/40",
};

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function InsightsPage() {
  const { lang } = useI18n("nav");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale  = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const featured = insightPosts.find((p) => p.featured)!;
  const rest      = insightPosts.filter((p) => !p.featured);

  const title    = (p: typeof insightPosts[0]) => lang === "th" ? p.titleTh    : p.title;
  const excerpt  = (p: typeof insightPosts[0]) => lang === "th" ? p.excerptTh  : p.excerpt;
  const category = (p: typeof insightPosts[0]) => lang === "th" ? p.categoryTh : p.category;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />

      {/* ── HERO ── */}
      <section ref={heroRef} className="hero-bottom-shadow relative h-[88vh] min-h-[520px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 origin-center">
          <Image
            src={featured.image}
            alt={title(featured)}
            fill priority sizes="100vw"
            className="object-cover opacity-55"
          />
        </motion.div>

        {/* overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/20" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,138,0,0.12) 0%, transparent 65%)" }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex h-full flex-col items-center justify-center px-6 text-center sm:px-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 text-[10px] font-light uppercase tracking-[0.22em] text-[#ff8a00]"
          >
            {lang === "th" ? "บทความ · ข้อมูลเชิงลึก" : "Insights · Technical Knowledge"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {lang === "th"
              ? "ความรู้เชิงเทคนิค\nจากทีม HAGX"
              : "Technical Knowledge\nfrom the HAGX Team"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.35 }}
            className="mx-auto mt-6 max-w-xl text-sm font-light leading-7 text-white/50"
          >
            {lang === "th"
              ? "บทความเชิงลึกเกี่ยวกับระบบกระจก อลูมิเนียม และสถาปัตยกรรม จากประสบการณ์ 20+ ปีของเรา"
              : "In-depth articles on glass systems, aluminium, and architecture — from our 20+ years of field experience."}
          </motion.p>

          {/* featured CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.5 }}
            className="mt-10"
          >
            <Link
              href={`/insights/${featured.slug}`}
              className="group inline-flex items-center gap-3 border border-[#ff8a00]/60 bg-[#ff8a00]/10 px-7 py-3.5 text-[11px] font-light uppercase tracking-widest text-[#ff8a00] transition-all duration-300 hover:bg-[#ff8a00] hover:text-[#0a0a0a]"
            >
              {lang === "th" ? "อ่านบทความแนะนำ" : "Read Featured Article"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-light uppercase tracking-[0.2em] text-white/25">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="block h-4 w-px bg-white/20"
          />
        </motion.div>
      </section>

      {/* ── GRID ── */}
      <section className="mx-auto max-w-[1500px] px-6 pb-32 pt-20 sm:px-10 lg:px-14">

        {/* section label */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-light uppercase tracking-[0.2em] text-[#ff8a00]">
              {lang === "th" ? "บทความทั้งหมด" : "All Articles"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {lang === "th" ? "ทุกบทความ" : "Knowledge Base"}
            </h2>
          </div>
          <p className="hidden text-xs font-light text-white/25 sm:block">
            {insightPosts.length} {lang === "th" ? "บทความ" : "articles"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insightPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href={`/insights/${post.slug}`} className="block h-full">
                <div
                  className="relative flex h-full flex-col overflow-hidden border border-white/[0.08] bg-[#121212]/80 backdrop-blur-sm transition-all duration-400 hover:border-[#ff8a00]/35 hover:shadow-[0_0_40px_rgba(255,138,0,0.1)]"
                  style={{ transform: "translateZ(0)" }}
                >
                  {/* image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={title(post)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />

                    {post.featured && (
                      <span className="absolute left-4 top-4 bg-[#ff8a00] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-black">
                        {lang === "th" ? "แนะนำ" : "Featured"}
                      </span>
                    )}
                  </div>

                  {/* content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* category + meta */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className={`border px-2.5 py-1 text-[9px] font-light uppercase tracking-[0.15em] ${categoryColors[post.category] ?? "text-white/40 border-white/15"}`}>
                        {category(post)}
                      </span>
                      <span className="text-[10px] font-light text-white/25">
                        {post.readMin} {lang === "th" ? "นาที" : "min read"}
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-[#ff8a00] sm:text-lg">
                      {title(post)}
                    </h3>

                    {/* excerpt */}
                    <p className="mb-5 line-clamp-3 flex-1 text-xs font-light leading-[1.8] text-white/45">
                      {excerpt(post)}
                    </p>

                    {/* footer */}
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="text-[10px] font-light text-white/30">
                        {formatDate(post.date, lang)}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-light uppercase tracking-widest text-[#ff8a00] opacity-0 transition-opacity group-hover:opacity-100">
                        {lang === "th" ? "อ่าน" : "Read"}
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

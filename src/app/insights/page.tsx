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
} from "@/components/ui/MediaCard";
import { insightPosts } from "@/content/insights";
import { useI18n } from "@/i18n/useI18n";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const categoryColors: Record<string, string> = {
  TECHNICAL: 'text-accent-500 border-accent-500/40',
  'CASE STUDY': 'text-sky-400 border-sky-400/40',
  DESIGN: 'text-violet-400 border-violet-400/40',
  MAINTENANCE: 'text-emerald-400 border-emerald-400/40',
};

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const { lang } = useI18n("nav");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const featured = insightPosts.find((p) => p.featured)!;
  const rest = insightPosts.filter((p) => !p.featured);

  const title = (p: (typeof insightPosts)[0]) =>
    lang === "th" ? p.titleTh : p.title;
  const excerpt = (p: (typeof insightPosts)[0]) =>
    lang === "th" ? p.excerptTh : p.excerpt;
  const category = (p: (typeof insightPosts)[0]) =>
    lang === "th" ? p.categoryTh : p.category;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground-100">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="hero-bottom-shadow relative h-[88vh] min-h-[520px] overflow-hidden"
      >
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 origin-center"
        >
          <Image
            src={featured.image}
            alt={title(featured)}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
        </motion.div>

        {/* overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/20" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,138,0,0.12) 0%, transparent 65%)',
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex h-full flex-col items-center justify-center px-6 text-center sm:px-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 text-[10px] font-light tracking-[0.22em] text-accent-500 uppercase"
          >
            {lang === 'th'
              ? 'บทความ · ข้อมูลเชิงลึก'
              : 'Insights · Technical Knowledge'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-4xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {lang === 'th'
              ? 'ความรู้เชิงเทคนิค\nจากทีม HAGX'
              : 'Technical Knowledge\nfrom the HAGX Team'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-7 font-light text-foreground-300"
          >
            {lang === 'th'
              ? 'บทความเชิงลึกเกี่ยวกับระบบกระจก อลูมิเนียม และสถาปัตยกรรม จากประสบการณ์ 20+ ปีของเรา'
              : 'In-depth articles on glass systems, aluminium, and architecture — from our 20+ years of field experience.'}
          </motion.p>

          {/* featured CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="mt-10"
          >
            <Link
              href={`/insights/${featured.slug}`}
              className="group inline-flex items-center gap-3 border border-accent-500/60 bg-accent-500/10 px-7 py-3.5 text-[11px] font-light tracking-widest text-accent-500 uppercase transition-all duration-300 hover:bg-accent-500 hover:text-background-100"
            >
              {lang === 'th' ? 'อ่านบทความแนะนำ' : 'Read Featured Article'}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M1 6h10M7 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs font-light tracking-[0.2em] text-foreground-400 uppercase">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="block h-4 w-px bg-white/20"
          />
        </motion.div>
      </section>

      {/* ── GRID ── */}
      <section className="mx-auto px-6 pt-20 pb-32 sm:px-10 lg:px-14">
        {/* section label */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-light tracking-[0.2em] text-accent-500 uppercase">
              {lang === 'th' ? 'บทความทั้งหมด' : 'All Articles'}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {lang === 'th' ? 'ทุกบทความ' : 'Knowledge Base'}
            </h2>
          </div>
          <p className="hidden text-xs font-light text-foreground-400 sm:block">
            {insightPosts.length} {lang === 'th' ? 'บทความ' : 'articles'}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insightPosts.map((post, i) => (
            <MediaCard
              key={post.slug}
              href={`/insights/${post.slug}`}
              animateDelay={(i % 3) * 0.1}
              className="bg-[#121212]/80 backdrop-blur-sm"
            >
              <MediaCardImage
                src={post.image}
                alt={title(post)}
                aspect="video"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                gradientFrom="#121212"
              >
                {post.featured && (
                  <MediaCardBadge
                    position="top-left"
                    className="border-transparent bg-accent-500 font-semibold text-black"
                  >
                    {lang === 'th' ? 'แนะนำ' : 'Featured'}
                  </MediaCardBadge>
                )}
              </MediaCardImage>

              <MediaCardBody className="p-6">
                <MediaCardMeta
                  className="mb-4"
                  left={
                    <span
                      className={`border px-2.5 py-1 text-xs font-light tracking-[0.15em] uppercase ${categoryColors[post.category] ?? 'border-white/15 text-foreground-400'}`}
                    >
                      {category(post)}
                    </span>
                  }
                  right={
                    <span className="text-[10px] font-light text-foreground-400">
                      {post.readMin} {lang === 'th' ? 'นาที' : 'min read'}
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
                      {formatDate(post.date, lang)}
                    </span>
                  }
                  right={
                    <MediaCardArrow label={lang === 'th' ? 'อ่าน' : 'Read'} />
                  }
                />
              </MediaCardBody>
            </MediaCard>
          ))}
        </div>
      </section>

    </div>
  );
}

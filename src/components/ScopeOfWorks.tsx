"use client";

import { motion } from "framer-motion";

export interface ScopeCategory {
  id: string;
  title: string;
  items: string[];
}

interface ScopeOfWorksProps {
  eyebrow: string;
  subtitle: string;
  footer: string;
  categories: ScopeCategory[];
}

export default function ScopeOfWorks({ eyebrow, subtitle, footer, categories }: ScopeOfWorksProps) {
  return (
    <section className="border-b border-white/[0.06] px-4 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1500px]">

        {/* header row */}
        <div className="mb-10 flex flex-wrap items-baseline gap-3">
          <p className="text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
            {eyebrow}
          </p>
          <span className="hidden h-px flex-1 bg-white/[0.06] sm:block" />
          <p className="text-[10px] font-light uppercase tracking-widest text-white/25">
            {subtitle}
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="group relative bg-[#0a0a0a] px-6 py-8 transition-colors duration-300 hover:bg-[#0f0c09] sm:px-7 sm:py-9"
            >
              {/* accent glow on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,138,0,0.07),transparent_70%)]" />

              <div className="relative">
                {/* number + title */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[9px] font-light uppercase tracking-[0.2em] text-[#ff8a00]/70">
                      {cat.id}
                    </p>
                    <h3 className="text-sm font-light leading-snug text-white/90 sm:text-base">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="mt-1 h-px w-8 shrink-0 bg-[#ff8a00]/30" />
                </div>

                {/* items list */}
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#ff8a00]/60" />
                      <p className="text-[11px] font-light leading-[1.75] text-white/50 whitespace-pre-line">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* footer note */}
        <p className="mt-5 text-center text-[10px] font-light leading-relaxed text-white/25">
          {footer.split(" — ")[0]} —{" "}
          <span className="text-white/40">{footer.split(" — ")[1]}</span>
        </p>
      </div>
    </section>
  );
}

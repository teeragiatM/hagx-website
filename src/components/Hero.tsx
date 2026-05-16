"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[640px] items-end overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
          alt="อาคารกระจกสถาปัตยกรรมระดับพรีเมียม"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-slate-900/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-xs font-light tracking-[0.3em] text-foreground-300 uppercase"
        >
          Premium Aluminium & Glass
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-10 max-w-3xl text-5xl leading-[1.05] font-bold tracking-tight text-foreground-100 sm:text-6xl md:text-7xl"
        >
          งานกระจกและ
          <br />
          อลูมิเนียม
          <br />
          <span className="font-light">ระดับพรีเมียม</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col items-start gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="inline-block border border-foreground-100 px-8 py-3.5 text-xs font-light tracking-[0.2em] text-foreground-100 uppercase transition-all duration-300 hover:bg-foreground-100 hover:text-background-100"
          >
            สอบถามราคา
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 py-3.5 text-xs font-light tracking-[0.15em] text-foreground-200 uppercase transition-colors duration-200 hover:text-foreground-100"
          >
            ดูผลงาน
            <span className="inline-block h-px w-8 bg-white/40" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex gap-12"
        >
          {[
            { n: '250+', label: 'โครงการ' },
            { n: '18', label: 'ปีประสบการณ์' },
            { n: '99%', label: 'ลูกค้าพึงพอใจ' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-foreground-100">
                {s.n}
              </div>
              <div className="mt-1 text-[10px] font-light tracking-widest text-foreground-400 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

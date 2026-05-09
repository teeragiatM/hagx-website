"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] flex items-end overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase text-white/50 font-light mb-6"
        >
          Premium Aluminium & Glass
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-3xl mb-10"
        >
          งานกระจกและ<br />อลูมิเนียม<br />
          <span className="font-light">ระดับพรีเมียม</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <a
            href="#contact"
            className="inline-block text-xs tracking-[0.2em] uppercase font-light px-8 py-3.5 border border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            สอบถามราคา
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-light text-white/60 hover:text-white transition-colors duration-200 py-3.5"
          >
            ดูผลงาน
            <span className="w-8 h-px bg-white/40 inline-block" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex gap-12"
        >
          {[
            { n: "250+", label: "โครงการ" },
            { n: "18", label: "ปีประสบการณ์" },
            { n: "99%", label: "ลูกค้าพึงพอใจ" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white">{s.n}</div>
              <div className="text-[10px] tracking-widest text-white/40 uppercase mt-1 font-light">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

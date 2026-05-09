"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
          alt="Luxury glass and aluminium architectural facade"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/30 text-[11px] tracking-[0.25em] uppercase text-gold-400 font-medium bg-gold-400/5">
            Premium Architectural Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white mb-6 max-w-4xl tracking-tight"
        >
          Crafted in{" "}
          <span className="gold-gradient">Glass</span>
          <br />& Aluminium
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0"
        >
          HAGX engineers bespoke facades, curtain walls, and glazing systems
          where architectural vision meets industrial precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-400 text-zinc-950 text-sm font-semibold hover:bg-gold-500 transition-colors duration-200"
          >
            View Our Work
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
          >
            Start a Project
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto lg:mx-0"
        >
          {[
            { value: "250+", label: "Projects" },
            { value: "18yr", label: "Experience" },
            { value: "99%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-3xl font-bold gold-gradient">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 hover:text-gold-400 transition-colors"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}

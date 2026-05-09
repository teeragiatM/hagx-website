"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
          alt="Luxury glass and aluminium architectural facade"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/40" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-400/60 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-gold-400 font-medium">
            <span className="w-8 h-px bg-gold-400" />
            Premium Architectural Solutions
            <span className="w-8 h-px bg-gold-400" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white mb-6 max-w-4xl"
        >
          Crafted in{" "}
          <span className="gold-gradient">Glass</span>
          <br />& Aluminium
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0"
        >
          HAGX engineers bespoke facades, curtain walls, and glazing systems
          where architectural vision meets industrial precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-400 text-slate-950 text-sm font-semibold tracking-widest uppercase hover:bg-gold-500 transition-colors duration-300"
          >
            View Our Work
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-semibold tracking-widest uppercase hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
          >
            Start a Project
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
        >
          {[
            { value: "250+", label: "Projects Delivered" },
            { value: "18", label: "Years Experience" },
            { value: "99%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="font-display text-3xl font-bold gold-gradient">
                {stat.value}
              </div>
              <div className="text-[11px] tracking-widest text-slate-400 uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-gold-400 transition-colors group"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  );
}

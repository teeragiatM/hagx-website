"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export interface TimelineItem {
  n: string;
  phase: string;
  title: string;
  image: string;
  body: string[];
  year?: string; // Added year property for timestamp
}

export interface ScrollTimelineProps {
  items: TimelineItem[];
}

export default function ScrollTimeline({ items }: ScrollTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 45%"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/[0.06] px-4 py-16 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:140px_140px] opacity-25" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* timeline */}
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-white/[0.08] lg:left-1/2" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-[#ff8a00]/70 lg:left-1/2"
          />
          <div className="space-y-12 lg:space-y-16">
            {items.map((item, index) => {
              const isReverse = index % 2 === 1;
              const isActive = activeIndex === index;
              const isPast = index < activeIndex;

              return (
                <motion.article
                  key={item.n}
                  initial={{ opacity: 0 }} // Simplified animation to fade only
                  whileInView={{ opacity: 1 }} // Simplified animation to fade only
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ once: false, amount: 0.58 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid gap-6 pl-14 lg:grid-cols-2 lg:gap-12 lg:pl-0"
                >
                  {/* number dot */}
                  <motion.div
                    initial={{ scale: 0.72, opacity: 0.45 }}
                    whileInView={{ opacity: 1 }} // Simplified animation to fade only
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.45 : 0.26,
                      backgroundColor: isActive ? "#ff8a00" : "#080808",
                      color: isActive ? "#080808" : "#ff8a00",
                      boxShadow: isActive
                        ? "0 0 0 12px rgba(255,138,0,0.14), 0 0 34px rgba(255,138,0,0.85)"
                        : "0 0 18px rgba(255,138,0,0.22)",
                    }}
                    viewport={{ once: false, amount: 0.65 }} // Keep viewport for active state detection
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-5 top-2 z-20 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[#ff8a00]/60 bg-[#080808] text-[10px] font-medium text-[#ff8a00] shadow-[0_0_18px_rgba(255,138,0,0.3)] lg:left-1/2 lg:-translate-x-1/2" // Aligned dot center with line
                  >
                    {item.n}
                  </motion.div>

                  {/* image */}
                  <div className={isReverse ? "lg:col-start-2" : ""}>
                    <motion.div
                      initial={{
                        opacity: 0.24,
                        filter: "grayscale(1) brightness(0.42)",
                      }} // Simplified animation
                      whileInView={{
                        opacity: 1,
                        filter: "grayscale(0) brightness(1)",
                      }} // Simplified animation
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.42 : 0.24,
                        filter: isActive
                          ? "grayscale(0) brightness(1)"
                          : isPast
                            ? "grayscale(0.75) brightness(0.55)"
                            : "grayscale(1) brightness(0.42)",
                      }}
                      viewport={{ once: false, amount: 0.45 }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative aspect-[1.55/1] overflow-hidden border bg-[#111] transition-colors duration-500 lg:max-w-[520px] ${
                        isActive ? "border-[#ff8a00]/45" : "border-white/[0.06]"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </motion.div>
                  </div>

                  {/* text */}
                  <div
                    className={`flex items-center ${isReverse ? "lg:col-start-1 lg:row-start-1 lg:text-right" : ""}`}
                  >
                    <motion.div
                      animate={{
                        // Simplified animation to fade only
                        opacity: isActive ? 1 : isPast ? 0.44 : 0.28,
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={isReverse ? "lg:ml-auto" : ""}
                    >
                      {item.year && (
                        <p
                          className={`mb-1 text-[11px] font-bold tracking-tight transition-colors duration-500 ${
                            isActive ? "text-[#ff8a00]" : "text-white/30"
                          }`}
                        >
                          {item.year}
                        </p>
                      )}
                      <p
                        className={`mb-3 text-[10px] font-light uppercase tracking-widest transition-colors duration-500 ${
                          isActive ? "text-[#ff8a00]" : "text-white/30"
                        }`}
                      >
                        {item.phase}
                      </p>
                      <h3
                        className={`max-w-lg text-2xl font-light leading-tight transition-colors duration-500 sm:text-3xl ${
                          isActive ? "text-white" : "text-white/45"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <div className="mt-5 space-y-3">
                        {item.body.map((text) => (
                          <p
                            key={text}
                            className={`max-w-lg text-xs font-light leading-7 transition-colors duration-500 ${
                              isActive ? "text-white/62" : "text-white/35"
                            }`}
                          >
                            {text}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "The Meridian Tower",
    category: "Curtain Wall",
    location: "Dubai, UAE",
    img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    span: "col-span-2",
  },
  {
    title: "Azure Residences",
    category: "Structural Glazing",
    location: "London, UK",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    span: "",
  },
  {
    title: "One Commerce Plaza",
    category: "Skylight",
    location: "Singapore",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    span: "",
  },
  {
    title: "Vertex Corporate HQ",
    category: "Curtain Wall",
    location: "Frankfurt, DE",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    span: "",
  },
  {
    title: "The Glasshouse Hotel",
    category: "Glass Partitions",
    location: "Amsterdam, NL",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    span: "",
  },
  {
    title: "Pinnacle Residences",
    category: "Aluminium Cladding",
    location: "Toronto, CA",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    span: "col-span-2",
  },
];

export default function Portfolio() {
  const [lightbox, setLightbox] = useState<null | (typeof projects)[0]>(null);

  return (
    <section id="portfolio" className="relative py-28 bg-slate-900/50" aria-labelledby="portfolio-heading">
      <div className="section-divider mb-0" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-gold-400 font-medium mb-4">
            <span className="w-6 h-px bg-gold-400" />
            Our Work
            <span className="w-6 h-px bg-gold-400" />
          </span>
          <h2
            id="portfolio-heading"
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Iconic <span className="gold-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            A curated selection of landmark installations across residential,
            commercial, and hospitality sectors worldwide.
          </p>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.07}
              className={`${project.span || ""} group relative overflow-hidden cursor-pointer`}
            >
              <div
                className="relative overflow-hidden aspect-[4/3]"
                onClick={() => setLightbox(project)}
              >
                <Image
                  src={project.img}
                  alt={`${project.title} — HAGX ${project.category} project in ${project.location}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/60 transition-all duration-500" />

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">{project.location}</p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-gold-400/20 backdrop-blur-sm text-gold-400">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-slate-400 hover:text-gold-400 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              <div className="relative aspect-video">
                <Image
                  src={lightbox.img}
                  alt={lightbox.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
              <div className="p-6 glass-card border-t-0">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400">
                  {lightbox.category} · {lightbox.location}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {lightbox.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

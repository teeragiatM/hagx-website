"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Curtain Wall",
    subtitle: "ผนังกระจกโครงสร้าง",
    img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=85",
    size: "lg",
  },
  {
    title: "Skylight",
    subtitle: "หลังคากระจก",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=85",
    size: "sm",
  },
  {
    title: "Structural Glazing",
    subtitle: "กระจกโครงสร้าง",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=85",
    size: "sm",
  },
  {
    title: "Glass Partition",
    subtitle: "ฉากกั้นกระจก",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85",
    size: "lg",
  },
  {
    title: "Aluminium Cladding",
    subtitle: "หุ้มผนังอลูมิเนียม",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=85",
    size: "sm",
  },
  {
    title: "Security Glazing",
    subtitle: "กระจกนิรภัย",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85",
    size: "sm",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal className="mb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-light mb-4">Our Services</p>
          <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-lg leading-tight">
            บริการของเรา
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((s, i) => (
            <ScrollReveal
              key={s.title}
              delay={i * 0.07}
              className={`group relative overflow-hidden cursor-pointer ${
                s.size === "lg" ? "md:col-span-2 aspect-[16/9]" : "aspect-square"
              }`}
            >
              <Image
                src={s.img}
                alt={s.subtitle}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 400px"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/60 font-light mb-1">
                  {s.title}
                </p>
                <h3 className="text-base font-semibold text-white">{s.subtitle}</h3>
              </div>
              <div className="absolute top-4 left-4">
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-light group-hover:opacity-0 transition-opacity duration-300">
                  {s.title}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

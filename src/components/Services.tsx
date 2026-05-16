"use client";

import Image from "next/image";
import ScrollReveal from "./effects/ScrollReveal";

const services = [
  {
    title: "Curtain Wall",
    subtitle: "à¸œà¸™à¸±à¸‡à¸à¸£à¸°à¸ˆà¸à¹‚à¸„à¸£à¸‡à¸ªà¸£à¹‰à¸²à¸‡",
    img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=85",
    size: "lg",
  },
  {
    title: "Skylight",
    subtitle: "à¸«à¸¥à¸±à¸‡à¸„à¸²à¸à¸£à¸°à¸ˆà¸",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=85",
    size: "sm",
  },
  {
    title: "Structural Glazing",
    subtitle: "à¸à¸£à¸°à¸ˆà¸à¹‚à¸„à¸£à¸‡à¸ªà¸£à¹‰à¸²à¸‡",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=85",
    size: "sm",
  },
  {
    title: "Glass Partition",
    subtitle: "à¸‰à¸²à¸à¸à¸±à¹‰à¸™à¸à¸£à¸°à¸ˆà¸",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85",
    size: "lg",
  },
  {
    title: "Aluminium Cladding",
    subtitle: "à¸«à¸¸à¹‰à¸¡à¸œà¸™à¸±à¸‡à¸­à¸¥à¸¹à¸¡à¸´à¹€à¸™à¸µà¸¢à¸¡",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=85",
    size: "sm",
  },
  {
    title: "Security Glazing",
    subtitle: "à¸à¸£à¸°à¸ˆà¸à¸™à¸´à¸£à¸ à¸±à¸¢",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85",
    size: "sm",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-8">
        <ScrollReveal className="mb-20">
          <p className="mb-4 text-[10px] font-light tracking-[0.3em] text-slate-400 uppercase">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="max-w-lg text-4xl leading-tight font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            à¸šà¸£à¸´à¸à¸²à¸£à¸‚à¸­à¸‡à¹€à¸£à¸²
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {services.map((s, i) => (
            <ScrollReveal
              key={s.title}
              delay={i * 0.07}
              className={`group relative cursor-pointer overflow-hidden ${
                s.size === 'lg'
                  ? 'aspect-[16/9] md:col-span-2'
                  : 'aspect-square'
              }`}
            >
              <Image
                src={s.img}
                alt={s.subtitle}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 400px"
              />
              <div className="absolute inset-0 bg-background-100/0 transition-all duration-500 group-hover:bg-background-100/50" />
              <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="mb-1 text-xs font-light tracking-[0.25em] text-foreground-200 uppercase">
                  {s.title}
                </p>
                <h3 className="text-base font-semibold text-foreground-100">
                  {s.subtitle}
                </h3>
              </div>
              <div className="absolute top-4 left-4">
                <p className="text-xs font-light tracking-[0.25em] text-foreground-400 uppercase transition-opacity duration-300 group-hover:opacity-0">
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


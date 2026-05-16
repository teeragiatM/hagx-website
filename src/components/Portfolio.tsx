"use client";

import Image from "next/image";
import ScrollReveal from "./effects/ScrollReveal";

const projects = [
  {
    title: "The Meridian Tower",
    location: "Dubai, UAE",
    year: "2023",
    img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=85",
    wide: true,
  },
  {
    title: "Azure Residences",
    location: "London, UK",
    year: "2023",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=85",
    wide: false,
  },
  {
    title: "One Commerce Plaza",
    location: "Singapore",
    year: "2022",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=85",
    wide: false,
  },
  {
    title: "Vertex Corporate HQ",
    location: "Frankfurt, DE",
    year: "2022",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85",
    wide: false,
  },
  {
    title: "The Glasshouse Hotel",
    location: "Amsterdam, NL",
    year: "2021",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=85",
    wide: false,
  },
  {
    title: "Pinnacle Residences",
    location: "Toronto, CA",
    year: "2021",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85",
    wide: true,
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-[#F9F9F9] py-28"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-7xl px-8">
        <ScrollReveal className="mb-20">
          <p className="mb-4 text-[10px] font-light tracking-[0.3em] text-slate-400 uppercase">
            Selected Works
          </p>
          <h2
            id="portfolio-heading"
            className="max-w-lg text-4xl leading-tight font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            à¸œà¸¥à¸‡à¸²à¸™à¸—à¸µà¹ˆà¸œà¹ˆà¸²à¸™à¸¡à¸²
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-2">
          {projects.map((p, i) => (
            <ScrollReveal
              key={p.title}
              delay={i * 0.06}
              className={`group bg-white ${p.wide ? 'md:col-span-2' : ''}`}
            >
              <div
                className={`relative overflow-hidden ${p.wide ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-foreground-100/0 transition-all duration-500 group-hover:bg-foreground-100/10" />
              </div>
              <div className="flex items-start justify-between p-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-light text-slate-400">
                    {p.location}
                  </p>
                </div>
                <span className="mt-0.5 text-[10px] font-light tracking-widest text-slate-300">
                  {p.year}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


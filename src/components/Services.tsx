"use client";

import { Building2, Layers, Sun, LayoutGrid, Shield, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Building2,
    title: "Curtain Wall Systems",
    description:
      "Engineered unitised and stick-built curtain wall façades offering superior thermal performance, weather resistance, and structural integrity.",
  },
  {
    icon: Sun,
    title: "Skylight & Roof Glazing",
    description:
      "Bespoke overhead glazing solutions — from feature atriums to expansive barrel vaults — flooding interiors with natural light.",
  },
  {
    icon: Layers,
    title: "Structural Glazing",
    description:
      "Seamless all-glass facades with spider fittings and point-fixed systems delivering minimal framing and maximum visual impact.",
  },
  {
    icon: LayoutGrid,
    title: "Glass Partitions",
    description:
      "Frameless and framed internal partitioning systems with acoustic performance, ideal for high-end commercial and hospitality spaces.",
  },
  {
    icon: Shield,
    title: "Security Glazing",
    description:
      "Laminated, toughened, and blast-resistant glass assemblies engineered to meet the most demanding safety and security specifications.",
  },
  {
    icon: Wrench,
    title: "Aluminium Cladding",
    description:
      "Precision-fabricated aluminium rainscreen cladding and composite panel systems with unlimited finish options and concealed fixing.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 bg-slate-950" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-gold-400 font-medium mb-4">
            <span className="w-6 h-px bg-gold-400" />
            What We Do
            <span className="w-6 h-px bg-gold-400" />
          </span>
          <h2
            id="services-heading"
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Precision-Engineered{" "}
            <span className="gold-gradient">Solutions</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            From concept to completion, every system we design and install is
            built to perform — and built to last.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold-400/10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <article className="glass-card p-8 h-full group hover:bg-white/[0.06] transition-colors duration-400 cursor-default">
                  <div className="mb-5 inline-flex p-3 border border-gold-400/20 text-gold-400 group-hover:bg-gold-400/10 transition-colors duration-300">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 w-8 h-px bg-gold-400/40 group-hover:w-16 transition-all duration-500" />
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <section id="services" className="py-28 bg-bg" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold-400 font-medium mb-4">
            What We Do
          </span>
          <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-content tracking-tight">
            Precision-Engineered{" "}
            <span className="gold-gradient">Solutions</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto text-base leading-relaxed">
            From concept to completion, every system we design and install is built to perform — and built to last.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 0.07}>
                <article className="glass-card p-7 h-full group hover:border-gold-400/30 transition-all duration-300 cursor-default">
                  <div className="mb-5 inline-flex p-2.5 rounded-xl bg-gold-400/10 text-gold-400 group-hover:bg-gold-400/20 transition-colors duration-200">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-content mb-2.5">{service.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

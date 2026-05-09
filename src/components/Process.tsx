"use client";

import { ClipboardList, Ruler, Cog, Truck, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Discovery & Briefing",
    description:
      "We engage with architects, developers, and contractors to understand the vision, technical requirements, and site-specific constraints.",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Design & Engineering",
    description:
      "Our in-house engineers develop detailed shop drawings, thermal calculations, and 3D models — fully coordinated with the project BIM environment.",
  },
  {
    icon: Cog,
    number: "03",
    title: "Precision Fabrication",
    description:
      "Every aluminium extrusion and glass unit is manufactured to micron-level tolerances in our ISO-certified production facility.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Logistics & Delivery",
    description:
      "Sequenced, just-in-time delivery programmes keep your construction programme on track with zero material waste.",
  },
  {
    icon: CheckCircle2,
    number: "05",
    title: "Installation & Sign-off",
    description:
      "Our specialist installation crews complete each project to CWCT and EN standards, with full commissioning and handover documentation.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 bg-bg" aria-labelledby="process-heading">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 pt-28">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold-400 font-medium mb-4">
            How We Work
          </span>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-content tracking-tight">
            Our <span className="gold-gradient">Process</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto text-base leading-relaxed">
            A rigorous five-stage methodology that guarantees quality at every phase of your project.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 0.08}>
                <div className="glass-card p-6 flex items-start gap-5 hover:border-gold-400/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-semibold tracking-widest text-gold-400/60 uppercase">
                        {step.number}
                      </span>
                      <h3 className="text-sm font-semibold text-content">{step.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <section id="process" className="relative py-28 bg-slate-950" aria-labelledby="process-heading">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-gold-400 font-medium mb-4">
            <span className="w-6 h-px bg-gold-400" />
            How We Work
            <span className="w-6 h-px bg-gold-400" />
          </span>
          <h2
            id="process-heading"
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Our <span className="gold-gradient">Process</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            A rigorous five-stage methodology that guarantees quality at every
            phase of your project.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/60 via-gold-400/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal
                  key={step.number}
                  delay={i * 0.1}
                  direction={isEven ? "left" : "right"}
                  className={`relative flex items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isEven ? "lg:text-right" : ""}`}>
                    <div
                      className={`glass-card p-7 max-w-md ${isEven ? "lg:ml-auto" : ""} hover:border-gold-400/30 transition-colors duration-300`}
                    >
                      <div
                        className={`flex items-start gap-4 ${isEven ? "lg:flex-row-reverse" : ""}`}
                      >
                        <div className="flex-shrink-0 p-2.5 border border-gold-400/20 text-gold-400">
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-[10px] tracking-[0.3em] text-gold-400/60 mb-1">
                            Step {step.number}
                          </div>
                          <h3 className="font-display text-lg font-semibold text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 hidden lg:flex items-center justify-center border border-gold-400/40 bg-slate-950 text-gold-400">
                    <span className="font-display font-bold text-sm">{step.number}</span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

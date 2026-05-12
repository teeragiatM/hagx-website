"use client";

import ScrollReveal from "./effects/ScrollReveal";

const steps = [
  {
    number: "01",
    en: "Survey",
    th: "à¸ªà¸³à¸£à¸§à¸ˆ",
    description:
      "à¸—à¸µà¸¡à¸‡à¸²à¸™à¸‚à¸­à¸‡à¹€à¸£à¸²à¸¥à¸‡à¸žà¸·à¹‰à¸™à¸—à¸µà¹ˆà¸ªà¸³à¸£à¸§à¸ˆà¸«à¸™à¹‰à¸²à¸‡à¸²à¸™ à¸§à¸±à¸”à¸‚à¸™à¸²à¸” à¹à¸¥à¸°à¸—à¸³à¸„à¸§à¸²à¸¡à¹€à¸‚à¹‰à¸²à¹ƒà¸ˆà¸„à¸§à¸²à¸¡à¸•à¹‰à¸­à¸‡à¸à¸²à¸£à¸‚à¸­à¸‡à¸¥à¸¹à¸à¸„à¹‰à¸²à¹à¸¥à¸°à¸ªà¸–à¸²à¸›à¸™à¸´à¸ à¹€à¸žà¸·à¹ˆà¸­à¸§à¸²à¸‡à¹à¸œà¸™à¸à¸²à¸£à¸­à¸­à¸à¹à¸šà¸šà¸—à¸µà¹ˆà¹à¸¡à¹ˆà¸™à¸¢à¸³",
  },
  {
    number: "02",
    en: "Craft",
    th: "à¸œà¸¥à¸´à¸•",
    description:
      "à¸œà¸¥à¸´à¸•à¸Šà¸´à¹‰à¸™à¸ªà¹ˆà¸§à¸™à¸­à¸¥à¸¹à¸¡à¸´à¹€à¸™à¸µà¸¢à¸¡à¹à¸¥à¸°à¸à¸£à¸°à¸ˆà¸à¸—à¸¸à¸à¸Šà¸´à¹‰à¸™à¹ƒà¸™à¹‚à¸£à¸‡à¸‡à¸²à¸™à¸—à¸µà¹ˆà¹„à¸”à¹‰à¸¡à¸²à¸•à¸£à¸à¸²à¸™ ISO à¸”à¹‰à¸§à¸¢à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸ˆà¸±à¸à¸£à¸—à¸µà¹ˆà¸¡à¸µà¸„à¸§à¸²à¸¡à¹€à¸—à¸µà¹ˆà¸¢à¸‡à¸•à¸£à¸‡à¸£à¸°à¸”à¸±à¸šà¸¡à¸´à¸¥à¸¥à¸´à¹€à¸¡à¸•à¸£",
  },
  {
    number: "03",
    en: "Install",
    th: "à¸•à¸´à¸”à¸•à¸±à¹‰à¸‡",
    description:
      "à¸—à¸µà¸¡à¸Šà¹ˆà¸²à¸‡à¸œà¸¹à¹‰à¹€à¸Šà¸µà¹ˆà¸¢à¸§à¸Šà¸²à¸à¸•à¸´à¸”à¸•à¸±à¹‰à¸‡à¸•à¸²à¸¡à¸¡à¸²à¸•à¸£à¸à¸²à¸™ CWCT à¸žà¸£à¹‰à¸­à¸¡à¸ªà¹ˆà¸‡à¸¡à¸­à¸šà¸‡à¸²à¸™à¸žà¸£à¹‰à¸­à¸¡à¹€à¸­à¸à¸ªà¸²à¸£à¸„à¸£à¸šà¸–à¹‰à¸§à¸™ à¹à¸¥à¸°à¸£à¸±à¸šà¸›à¸£à¸°à¸à¸±à¸™à¸„à¸¸à¸“à¸ à¸²à¸žà¸‡à¸²à¸™",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 bg-white" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal className="mb-24">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-light mb-4">Our Process</p>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-lg leading-tight">
            à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸à¸²à¸£à¸—à¸³à¸‡à¸²à¸™
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-slate-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.12}>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] tracking-[0.2em] text-slate-300 font-light">{step.number}</span>
                    <div className="w-3 h-3 rounded-full border border-slate-900 bg-white relative z-10" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-light">{step.en}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">{step.th}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


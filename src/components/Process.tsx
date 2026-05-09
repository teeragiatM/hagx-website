"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    en: "Survey",
    th: "สำรวจ",
    description:
      "ทีมงานของเราลงพื้นที่สำรวจหน้างาน วัดขนาด และทำความเข้าใจความต้องการของลูกค้าและสถาปนิก เพื่อวางแผนการออกแบบที่แม่นยำ",
  },
  {
    number: "02",
    en: "Craft",
    th: "ผลิต",
    description:
      "ผลิตชิ้นส่วนอลูมิเนียมและกระจกทุกชิ้นในโรงงานที่ได้มาตรฐาน ISO ด้วยเครื่องจักรที่มีความเที่ยงตรงระดับมิลลิเมตร",
  },
  {
    number: "03",
    en: "Install",
    th: "ติดตั้ง",
    description:
      "ทีมช่างผู้เชี่ยวชาญติดตั้งตามมาตรฐาน CWCT พร้อมส่งมอบงานพร้อมเอกสารครบถ้วน และรับประกันคุณภาพงาน",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 bg-white" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal className="mb-24">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-light mb-4">Our Process</p>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-lg leading-tight">
            ขั้นตอนการทำงาน
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

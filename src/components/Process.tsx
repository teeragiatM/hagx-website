"use client";

import ScrollReveal from "./effects/ScrollReveal";

const steps = [
  {
    number: "01",
    en: "Consultation & Site Survey",
    th: "การปรึกษาและสำรวจหน้างาน",
    description:
      "ให้คำปรึกษาเชิงลึกเพื่อเป็นคู่คิดในการวางแผนโครงการ เข้าตรวจสอบหน้างานเพื่อเก็บข้อมูลทางเทคนิคที่แม่นยำ และวางรากฐานโครงการด้วยการวิเคราะห์ความพร้อม",
  },
  {
    number: "02",
    en: "Design & Engineering Development",
    th: "การพัฒนาแบบและวิศวกรรม",
    description:
      "เปลี่ยนไอเดียให้เป็นรูปธรรมด้วย Shop Drawing ที่ละเอียดถี่ถ้วน จัดทำรายการวัสดุ (BOQ) ที่ชัดเจน และออกแบบให้ความสวยงามมาพร้อมกับโครงสร้างที่แข็งแรง",
  },
  {
    number: "03",
    en: "Manufacturing & Quality Control",
    th: "การผลิตและควบคุมคุณภาพ",
    description:
      "ผลิตชิ้นงานภายใต้ระบบควบคุมที่เข้มงวดในโรงงานของเราเอง ตรวจสอบความสมบูรณ์ของชิ้นงาน (Pre-test) ก่อนนำเข้าติดตั้ง และคัดสรรวัสดุคุณภาพสูง",
  },
  {
    number: "04",
    en: "Professional Installation",
    th: "การติดตั้งโดยทีมช่างผู้เชี่ยวชาญ",
    description:
      "ดำเนินการติดตั้งโดยทีมช่างเฉพาะทางที่มีประสบการณ์สูง ยึดถือความละเอียดแม่นยำระดับมิลลิเมตรเป็นมาตรฐาน และเน้นความสะอาดเรียบร้อยและความปลอดภัย",
  },
  {
    number: "05",
    en: "Inspection & Handover",
    th: "การตรวจสอบและส่งมอบงาน",
    description:
      "ตรวจสอบคุณภาพ (QC) อย่างละเอียดในทุกมิติก่อนการส่งมอบ จัดหาและติดตั้งอุปกรณ์คุณภาพสูง และมอบความมั่นใจในระยะยาวด้วยการรับประกันและบริการหลังการขาย",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-28 bg-white"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal className="mb-24">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-light mb-4">
            Our Process
          </p>
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-lg leading-tight"
          >
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
                    <span className="text-[10px] tracking-[0.2em] text-slate-300 font-light">
                      {step.number}
                    </span>
                    <div className="w-3 h-3 rounded-full border border-slate-900 bg-white relative z-10" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-light">
                      {step.en}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                    {step.th}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

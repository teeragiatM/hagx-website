"use client";

import { useI18n } from "@/i18n/useI18n";
import { Container, Section } from "@/components/ui/section";
import SectionHeader from "@/components/SectionHeader";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Text, Heading } from "./ui";
// ── Data ─────────────────────────────────────────────────────────────────────

const processSteps = [
  {
    n: "01",
    title: "Consultation & Site Survey",
    titleTh: "การปรึกษาและสำรวจหน้างาน",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    itemsTh: [
      "วิเคราะห์ความต้องการ: ให้คำปรึกษาเชิงลึกเพื่อเป็นคู่คิดในการวางแผนโครงการร่วมกับคุณ",
      "สำรวจพื้นที่จริง: เข้าตรวจสอบหน้างานเพื่อเก็บข้อมูลทางเทคนิคและขนาดที่แม่นยำ",
      "วางรากฐานโครงการ: ตรวจสอบความพร้อมเพื่อให้การวางแผนมีความถูกต้องสูงสุด",
    ],
    itemsEn: [
      "Requirement Analysis: Providing in-depth consultation to act as your strategic project partner.",
      "Technical Survey: Conducting on-site inspections to gather precise measurements and technical data.",
      "Project Foundation: Ensuring total accuracy in project planning from the very first step.",
    ],
  },
  {
    n: "02",
    title: "Design & Engineering Development",
    titleTh: "การพัฒนาแบบและวิศวกรรม",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
    itemsTh: [
      "จัดทำแบบขยาย: เปลี่ยนไอเดียให้เป็นรูปธรรมด้วย Shop Drawing ที่ละเอียดถี่ถ้วน",
      "วางแผนงบประมาณ: จัดทำรายการวัสดุ (BOQ) ที่ชัดเจนและตรวจสอบได้",
      "มาตรฐานสากล: ออกแบบให้ความสวยงามมาพร้อมกับโครงสร้างที่แข็งแรงและใช้งานได้จริง",
    ],
    itemsEn: [
      "Shop Drawings: Transforming concepts into reality with detailed architectural shop drawings.",
      "Budget Planning: Preparing transparent and verifiable Bills of Quantities (BOQ).",
      "International Standards: Designing for aesthetic excellence combined with structural integrity.",
    ],
  },
  {
    n: "03",
    title: "Manufacturing & Quality Control",
    titleTh: "การผลิตและควบคุมคุณภาพ",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    itemsTh: [
      "การผลิตเฉพาะทาง: ดำเนินการผลิตชิ้นงานภายใต้ระบบควบคุมที่เข้มงวดในโรงงานของเราเอง",
      "การทดสอบระบบ: ตรวจสอบความสมบูรณ์ของชิ้นงาน (Pre-test) ก่อนนำเข้าติดตั้ง",
      "วัสดุเกรดพรีเมียม: คัดสรรวัสดุคุณภาพสูงเพื่อความทนทานและประสิทธิภาพการใช้งานสูงสุด",
    ],
    itemsEn: [
      "Specialized Production: Manufacturing components under strict quality control within our own facilities.",
      "System Testing: Conducting rigorous pre-installation tests to ensure component integrity.",
      "Premium Materials: Selecting high-grade materials for maximum durability and performance.",
    ],
  },
  {
    n: "04",
    title: "Professional Installation",
    titleTh: "การติดตั้งโดยทีมช่างผู้เชี่ยวชาญ",
    image: "/images/step_4.png",
    itemsTh: [
      "ทีมงานเทคนิค: ดำเนินการติดตั้งโดยทีมช่างเฉพาะทางที่มีประสบการณ์สูง",
      "ความแม่นยำระดับมิลลิเมตร: ยึดถือความละเอียดแม่นยำเป็นมาตรฐานสูงสุดในการปฏิบัติงาน",
      "มาตรฐานความปลอดภัย: เน้นความสะอาดเรียบร้อยและความปลอดภัยในพื้นที่หน้างาน",
    ],
    itemsEn: [
      "Technical Teams: Execution by highly skilled and specialized technical installation teams.",
      "Millimeter Precision: Adhering to the highest standards of precision in every aspect of installation.",
      "Worksite Excellence: Prioritizing safety, cleanliness, and strict adherence to technical specifications.",
    ],
  },
  {
    n: "05",
    title: "Inspection & Handover",
    titleTh: "การตรวจสอบและส่งมอบงาน",
    image: "/images/step_5.png",
    itemsTh: [
      "การตรวจรับงาน: ตรวจสอบคุณภาพ (QC) อย่างละเอียดในทุกมิติก่อนการส่งมอบ",
      "โซลูชันอุปกรณ์ฮาร์ดแวร์: จัดหาและติดตั้งอุปกรณ์คุณภาพสูงเพื่อความสมบูรณ์แบบของงาน",
      "การรับประกัน: มอบความมั่นใจในระยะยาวด้วยบริการหลังการขายและการรับประกันที่เชื่อถือได้",
    ],
    itemsEn: [
      "Final Quality Control: Performing detailed QC inspections across all dimensions before handover.",
      "Hardware Solutions: Providing and integrating high-quality hardware for a flawless finish.",
      "Warranty & Support: Ensuring long-term peace of mind with reliable after-sales service and warranties.",
    ],
  },
];

// ── Animation variants ────────────────────────────────────────────────────────

const premiumEase = [0.22, 1, 0.36, 1] as const;

const premiumTextGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const premiumTextItem: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: premiumEase },
  },
};

// ── ProcessStepCard ───────────────────────────────────────────────────────────

type ProcessStep = {
  n: string;
  title: string;
  titleTh: string;
  image: string;
  itemsTh: string[];
  itemsEn: string[];
};

function ProcessStepCard({
  step,
  index,
  lang,
}: {
  step: ProcessStep;
  index: number;
  lang: "th" | "en";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isReverse = index % 2 === 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  const imageY = useTransform(smoothProgress, [0, 1], [-72, 72]);
  const imageInnerY = useTransform(smoothProgress, [0, 1], [46, -46]);
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1.18, 1.08, 1.18],
  );

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`grid min-h-[700px] items-center gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-24 xl:px-16 ${
        isReverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div className={isReverse ? "lg:col-start-2 lg:text-right" : ""}>
        <Text
          as="p"
          className="mb-8 text-3xl font-light leading-none text-[#DB5828] sm:text-4xl"
        >
          {step.n}
        </Text>
        <Heading size={{ initial: "9" }} as="h3" className="font-light">
          {lang === "th" ? step.titleTh : step.title}
        </Heading>
        <ul className={`mt-10 space-y-5 ${isReverse ? "lg:ml-auto" : ""}`}>
          {(lang === "th" ? step.itemsTh : step.itemsEn).map((item) => (
            <li
              key={item}
              className={`flex max-w-xl items-center gap-5 text-sm font-light leading-7 text-white/65 sm:text-base ${
                isReverse ? "lg:ml-auto lg:flex-row-reverse" : ""
              }`}
            >
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#DB5828]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        style={{ y: imageY }}
        className={`relative mx-auto aspect-[1.02/1] w-full max-w-[560px] overflow-hidden ${
          isReverse ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        <motion.div
          className="absolute inset-[-14%]"
          style={{ y: imageInnerY, scale: imageScale }}
        >
          <Image
            src={step.image}
            alt={`HAGX ${step.title}`}
            fill
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function HomeProcessSection() {
  const { t, lang } = useI18n();

  return (
    <section className="ui-padding">
      <div className="ui-margin">
        <div className="overflow-hidden border-[var(--accent-a6)] border">
          <SectionHeader
            eyebrow={t("whatwedo.eyebrow")}
            heading={t("whatwedo.title")}
            description={t("whatwedo.desc")}
            layout="stack"
          />
          {processSteps.map((step, index) => (
            <ProcessStepCard
              key={step.n}
              step={step}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

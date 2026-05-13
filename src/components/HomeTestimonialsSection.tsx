"use client";

import { useSwipe } from "@/hooks/useSwipe";
import { useI18n } from "@/i18n/useI18n";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Text, Button } from "@ui";

// ── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    client: "Property Developer, Bangkok",
    project: "CURTAIN WALL · GLASS FACADE · PROJECT MANAGEMENT",
    quote:
      "ทีม HAGX ดูแลโครงการตั้งแต่ขั้นตอนออกแบบจนส่งมอบ การสื่อสารชัดเจนและงานเสร็จตรงเวลา ระบบ Curtain Wall ทำงานได้อย่างสมบูรณ์แบบ ไม่มีปัญหาหลังส่งมอบ",
    logo: "PA",
  },
  {
    client: "Interior Design Studio, Silom",
    project: "GLASS PARTITION · SLIDING SYSTEM",
    quote:
      "วัสดุคุณภาพดีมาก ทีมช่างมีความชำนาญและทำงานได้สะอาดเรียบร้อย ลูกค้าของเราประทับใจมากกับผลงานที่ได้รับ จะกลับมาใช้บริการอีกแน่นอน",
    logo: "DS",
  },
  {
    client: "Real Estate Group, Hua Hin",
    project: "GLASS FACADE · ALUMINIUM SYSTEM",
    quote:
      "ผลงานออกมาดีเกินคาด ทีมเข้าใจ vision ของเราและแปลงมันเป็นงานจริงได้อย่างแม่นยำ ระบบกระจกทั้งหมดทำให้บ้านดูโมเดิร์นมากขึ้น",
    logo: "RG",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export default function HomeTestimonialsSection() {
  const { t } = useI18n();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () =>
    setActiveTestimonial(
      (p) => (p - 1 + testimonials.length) % testimonials.length,
    );
  const next = () => setActiveTestimonial((p) => (p + 1) % testimonials.length);
  const swipe = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  return (
    <section className="ui-padding">
      <div className="ui-margin">
        <div
          data-slot="customer-review"
          className="grid gap-16 lg:grid-cols-[320px_1fr] lg:items-start"
        >
          <div className="space-y-2">
            <Text size={{ initial: "7" }}>{t("partnership.title")}</Text>
            <div>
              <Button asChild variant="outline" color="gray">
                <Link href="#portfolio">See all Works</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              {...swipe}
              key={activeTestimonial}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 touch-pan-y select-none"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-[#DB5828]/30 bg-[#DB5828]/10 text-xs font-semibold text-[#DB5828]">
                  {testimonials[activeTestimonial].logo}
                </div>
                <Text
                  as="p"
                  size="1"
                  weight={{ initial: "light" }}
                  color="gray"
                >
                  {testimonials[activeTestimonial].client}
                </Text>
              </div>
              <Text asChild>
                <blockquote>
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
              </Text>
              <Text
                as="p"
                size="1"
                weight={{ initial: "light" }}
                uppercase
                color="gray"
              >
                {testimonials[activeTestimonial].project}
              </Text>
            </motion.div>

            <div className="flex gap-3">
              <Button
                iconOnly
                color="gray"
                variant="outline"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </Button>
              <Button
                iconOnly
                color="gray"
                variant="outline"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useState } from "react";

const topics = [
  "Curtain Wall System",
  "Glass Facade & Cladding",
  "Interior Glass Partition",
  "Sliding & Folding Doors",
  "Premium Material Supply",
  "Other",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[420px_1fr]">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-r border-white/[0.06] px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
        >
          <p className="mb-5 text-xs font-light uppercase tracking-widest text-[#ff8a00]">Contact Us</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Ready to Design<br />Your Space?
          </h1>
          <p className="mt-6 max-w-xs text-sm font-light leading-8 text-white/45">
            ทีม HAGX พร้อมประเมินแนวทาง วัสดุ และงบประมาณเบื้องต้นให้คุณโดยไม่มีค่าใช้จ่าย
          </p>

          {/* testimonial card */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#ff8a00] to-[#c05500] p-7 shadow-[0_8px_40px_rgba(255,138,0,0.25)]">
            <p className="text-base font-light leading-7 text-white">
              &ldquo;ทีม HAGX ดูแลโครงการตั้งแต่ต้นจนจบ ส่งมอบตรงเวลา และงานออกมาดีเกินคาด&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20" />
              <p className="text-xs font-light text-white/70">Property Developer, Bangkok</p>
            </div>
          </div>

          <div className="mt-12 space-y-3 text-sm font-light text-white/35">
            <p>Bangkok, Thailand</p>
            <p>hello@hagx.co</p>
            <p>Mon – Sat · 09:00 – 18:00</p>
          </div>
        </motion.div>

        {/* right — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
        >
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center">
              <p className="mb-4 text-5xl font-bold text-[#ff8a00]">✓</p>
              <h2 className="text-3xl font-bold">ส่งข้อมูลแล้ว</h2>
              <p className="mt-4 text-sm font-light leading-7 text-white/45">ทีม HAGX จะติดต่อกลับภายใน 1 วันทำการ</p>
              <Link href="/" className="mt-8 inline-flex h-12 items-center border border-white/20 px-6 text-xs font-light uppercase tracking-normal transition-colors hover:border-white hover:bg-white hover:text-[#080808]">
                กลับหน้าหลัก
              </Link>
            </div>
          ) : (
            <form
              className="grid gap-8"
              aria-label="HAGX contact form"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">First Name *</label>
                  <input required className="contact-input" placeholder="Your first name" type="text" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Last Name *</label>
                  <input required className="contact-input" placeholder="Your last name" type="text" />
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Email *</label>
                  <input required className="contact-input" placeholder="Your work email" type="email" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Industry</label>
                  <select className="contact-input appearance-none bg-[#111] cursor-pointer">
                    <option value="">Your company&apos;s industry</option>
                    <option>Real Estate</option>
                    <option>Architecture / Interior Design</option>
                    <option>Construction</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Company Name *</label>
                  <input required className="contact-input" placeholder="Your company name" type="text" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Contact No. *</label>
                  <input required className="contact-input" placeholder="Your contact number" type="tel" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Topic of Inquiry *</label>
                <select required className="contact-input appearance-none bg-[#111] cursor-pointer">
                  <option value="">Select an option</option>
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-light uppercase tracking-widest text-white/35">Project Details</label>
                <textarea
                  className="contact-input min-h-36 resize-none"
                  placeholder="Enter your project details (location, size, goals, timeline, budget, etc.)"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center bg-[#ff8a00] text-sm font-light uppercase tracking-normal text-white transition-colors hover:bg-[#e07a00] sm:w-auto sm:px-12"
              >
                Send Your Inquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>
      <SiteFooter />
    </main>
  );
}

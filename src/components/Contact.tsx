"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import ScrollReveal from "./effects/ScrollReveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-[#F9F9F9]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-light mb-4">Contact Us</p>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
              à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™<br />à¹‚à¸„à¸£à¸‡à¸à¸²à¸£à¸‚à¸­à¸‡à¸„à¸¸à¸“
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-light max-w-sm mb-12">
              à¸šà¸­à¸à¹€à¸¥à¹ˆà¸²à¹‚à¸„à¸£à¸‡à¸à¸²à¸£à¸‚à¸­à¸‡à¸„à¸¸à¸“à¹ƒà¸«à¹‰à¹€à¸£à¸²à¸Ÿà¸±à¸‡ à¸—à¸µà¸¡à¸‡à¸²à¸™à¸ˆà¸°à¸•à¸´à¸”à¸•à¹ˆà¸­à¸à¸¥à¸±à¸šà¸ à¸²à¸¢à¹ƒà¸™ 1 à¸§à¸±à¸™à¸—à¸³à¸à¸²à¸£
            </p>

            <div className="flex flex-col gap-5 text-sm">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light mb-1">à¸—à¸µà¹ˆà¸­à¸¢à¸¹à¹ˆ</p>
                <p className="text-slate-600 font-light leading-relaxed">
                  à¹€à¸‚à¸•à¸­à¸¸à¸•à¸ªà¸²à¸«à¸à¸£à¸£à¸¡ à¹‚à¸‹à¸™ 4 à¸­à¸²à¸„à¸²à¸£ 12<br />
                  à¸à¸£à¸¸à¸‡à¹€à¸—à¸žà¸¡à¸«à¸²à¸™à¸„à¸£ à¸›à¸£à¸°à¹€à¸—à¸¨à¹„à¸—à¸¢
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light mb-1">à¹‚à¸—à¸£à¸¨à¸±à¸žà¸—à¹Œ</p>
                <a href="tel:+6620001234" className="text-slate-600 font-light hover:text-slate-900 transition-colors">
                  +66 2 000 1234
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light mb-1">à¸­à¸µà¹€à¸¡à¸¥</p>
                <a href="mailto:contact@hagx.com" className="text-slate-600 font-light hover:text-slate-900 transition-colors">
                  contact@hagx.com
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            {submitted ? (
              <div className="flex flex-col justify-center h-full gap-4 py-16">
                <div className="w-10 h-px bg-slate-900" />
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">à¸ªà¹ˆà¸‡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸ªà¸³à¹€à¸£à¹‡à¸ˆ</h3>
                <p className="text-sm text-slate-500 font-light">
                  à¸‚à¸­à¸šà¸„à¸¸à¸“à¸—à¸µà¹ˆà¸•à¸´à¸”à¸•à¹ˆà¸­à¸¡à¸² à¹€à¸£à¸²à¸ˆà¸°à¸•à¸­à¸šà¸à¸¥à¸±à¸šà¸ à¸²à¸¢à¹ƒà¸™ 1 à¸§à¸±à¸™à¸—à¸³à¸à¸²à¸£
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light block mb-1">
                      à¸Šà¸·à¹ˆà¸­-à¸™à¸²à¸¡à¸ªà¸à¸¸à¸¥ *
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="à¸ªà¸¡à¸Šà¸²à¸¢ à¹ƒà¸ˆà¸”à¸µ"
                      className="underline-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light block mb-1">
                      à¸­à¸µà¹€à¸¡à¸¥ *
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="email@company.com"
                      className="underline-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light block mb-1">
                      à¹€à¸šà¸­à¸£à¹Œà¹‚à¸—à¸£
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="08x-xxx-xxxx"
                      className="underline-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light block mb-1">
                      à¸›à¸£à¸°à¹€à¸ à¸—à¸‡à¸²à¸™
                    </label>
                    <select id="project" name="project" value={form.project} onChange={handleChange} className="underline-input">
                      <option value="">à¹€à¸¥à¸·à¸­à¸à¸šà¸£à¸´à¸à¸²à¸£...</option>
                      <option value="curtain-wall">Curtain Wall</option>
                      <option value="skylight">à¸«à¸¥à¸±à¸‡à¸„à¸²à¸à¸£à¸°à¸ˆà¸</option>
                      <option value="structural">Structural Glazing</option>
                      <option value="partitions">à¸‰à¸²à¸à¸à¸±à¹‰à¸™à¸à¸£à¸°à¸ˆà¸</option>
                      <option value="security">à¸à¸£à¸°à¸ˆà¸à¸™à¸´à¸£à¸ à¸±à¸¢</option>
                      <option value="cladding">à¸«à¸¸à¹‰à¸¡à¸œà¸™à¸±à¸‡à¸­à¸¥à¸¹à¸¡à¸´à¹€à¸™à¸µà¸¢à¸¡</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light block mb-1">
                    à¸£à¸²à¸¢à¸¥à¸°à¹€à¸­à¸µà¸¢à¸”à¹‚à¸„à¸£à¸‡à¸à¸²à¸£ *
                  </label>
                  <textarea
                    id="message" name="message" rows={4} required
                    value={form.message} onChange={handleChange}
                    placeholder="à¸šà¸­à¸à¹€à¸¥à¹ˆà¸²à¹‚à¸„à¸£à¸‡à¸à¸²à¸£ à¸‚à¸™à¸²à¸” à¹à¸¥à¸°à¸£à¸°à¸¢à¸°à¹€à¸§à¸¥à¸²à¸—à¸µà¹ˆà¸•à¹‰à¸­à¸‡à¸à¸²à¸£..."
                    className="underline-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-light px-8 py-3.5 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300"
                >
                  à¸ªà¹ˆà¸‡à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡
                  <Send size={13} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} className="mt-16">
          <div className="w-full h-64 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.467!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDMwJzA2LjUiRQ!5e0!3m2!1sth!2sth!4v1710000000000!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) contrast(1.05) brightness(0.95)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="à¸—à¸µà¹ˆà¸•à¸±à¹‰à¸‡à¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™ HAGX"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


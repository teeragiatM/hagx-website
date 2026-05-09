"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/hagx" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/hagx" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/hagx" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 bg-slate-900/40" aria-labelledby="contact-heading">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-gold-400 font-medium mb-4">
            <span className="w-6 h-px bg-gold-400" />
            Get In Touch
            <span className="w-6 h-px bg-gold-400" />
          </span>
          <h2
            id="contact-heading"
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Start Your <span className="gold-gradient">Project</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Tell us about your project and our team will respond within one
            business day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Info panel */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="glass-card h-full p-8 lg:p-10 flex flex-col justify-between gap-10">
              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-6">
                  Contact Information
                </h3>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-start gap-4">
                    <div className="p-2 border border-gold-400/20 text-gold-400 mt-0.5 flex-shrink-0">
                      <MapPin size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-gold-400/60 mb-1">Office</div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Industrial Zone 4, Building 12<br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 border border-gold-400/20 text-gold-400 mt-0.5 flex-shrink-0">
                      <Phone size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-gold-400/60 mb-1">Phone</div>
                      <a href="tel:+97142001234" className="text-slate-300 text-sm hover:text-gold-400 transition-colors">
                        +971 4 200 1234
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 border border-gold-400/20 text-gold-400 mt-0.5 flex-shrink-0">
                      <Mail size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-gold-400/60 mb-1">Email</div>
                      <a href="mailto:hello@hagx.com" className="text-slate-300 text-sm hover:text-gold-400 transition-colors">
                        hello@hagx.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Socials */}
              <div>
                <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-4">Follow Us</div>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 border border-white/10 text-slate-400 hover:border-gold-400/50 hover:text-gold-400 transition-all duration-300"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-3">
            <div className="glass-card border-l-0 p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4">
                  <div className="w-14 h-14 border border-gold-400/40 flex items-center justify-center text-gold-400 mb-2">
                    <Send size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">Message Sent</h3>
                  <p className="text-slate-400 max-w-xs text-sm">
                    Thank you for reaching out. Our team will be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-slate-400">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="bg-white/5 border border-white/10 focus:border-gold-400/50 outline-none px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] tracking-widest uppercase text-slate-400">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="bg-white/5 border border-white/10 focus:border-gold-400/50 outline-none px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="project" className="text-[10px] tracking-widest uppercase text-slate-400">
                      Project Type
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 focus:border-gold-400/50 outline-none px-4 py-3 text-sm text-slate-200 transition-colors appearance-none"
                    >
                      <option value="" className="bg-slate-900">Select a service...</option>
                      <option value="curtain-wall" className="bg-slate-900">Curtain Wall Systems</option>
                      <option value="skylight" className="bg-slate-900">Skylight & Roof Glazing</option>
                      <option value="structural" className="bg-slate-900">Structural Glazing</option>
                      <option value="partitions" className="bg-slate-900">Glass Partitions</option>
                      <option value="security" className="bg-slate-900">Security Glazing</option>
                      <option value="cladding" className="bg-slate-900">Aluminium Cladding</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-slate-400">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                      className="bg-white/5 border border-white/10 focus:border-gold-400/50 outline-none px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-400 text-slate-950 text-sm font-semibold tracking-widest uppercase hover:bg-gold-500 transition-colors duration-300 self-start"
                  >
                    Send Message
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Google Map embed */}
        <ScrollReveal delay={0.2} className="mt-4">
          <div className="relative w-full h-72 overflow-hidden border border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTYnMTQuOSJF!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HAGX office location on Google Maps"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

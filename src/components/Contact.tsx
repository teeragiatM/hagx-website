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

  const inputClass = "bg-surface border border-border focus:border-gold-400/60 outline-none px-4 py-3 rounded-xl text-sm text-content placeholder:text-muted/50 transition-colors w-full";
  const labelClass = "text-xs font-medium text-muted mb-1.5 block";

  return (
    <section id="contact" className="py-28 bg-surface" aria-labelledby="contact-heading">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 pt-28">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold-400 font-medium mb-4">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-content tracking-tight">
            Start Your <span className="gold-gradient">Project</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto text-base leading-relaxed">
            Tell us about your project and our team will respond within one business day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="glass-card h-full p-8 flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-base font-semibold text-content mb-6">Contact Information</h3>
                <ul className="flex flex-col gap-5">
                  {[
                    { icon: MapPin, label: "Office", content: "Industrial Zone 4, Building 12\nDubai, United Arab Emirates" },
                    { icon: Phone, label: "Phone", content: "+971 4 200 1234", href: "tel:+97142001234" },
                    { icon: Mail, label: "Email", content: "hello@hagx.com", href: "mailto:hello@hagx.com" },
                  ].map(({ icon: Icon, label, content, href }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-gold-400/10 text-gold-400 mt-0.5 flex-shrink-0">
                        <Icon size={15} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-gold-400/60 mb-1">{label}</div>
                        {href ? (
                          <a href={href} className="text-muted text-sm hover:text-content transition-colors">
                            {content}
                          </a>
                        ) : (
                          <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{content}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-medium text-muted mb-3">Follow Us</div>
                <div className="flex gap-2">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-lg border border-border text-muted hover:border-gold-400/50 hover:text-gold-400 transition-all duration-200"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-3">
            <div className="glass-card p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center min-h-[320px] text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center text-gold-400 mb-2">
                    <Send size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-content">Message Sent</h3>
                  <p className="text-muted max-w-xs text-sm">
                    Thank you for reaching out. Our team will be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name *</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="project" className={labelClass}>Project Type</label>
                    <select id="project" name="project" value={form.project} onChange={handleChange} className={inputClass}>
                      <option value="">Select a service...</option>
                      <option value="curtain-wall">Curtain Wall Systems</option>
                      <option value="skylight">Skylight & Roof Glazing</option>
                      <option value="structural">Structural Glazing</option>
                      <option value="partitions">Glass Partitions</option>
                      <option value="security">Security Glazing</option>
                      <option value="cladding">Aluminium Cladding</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Project Details *</label>
                    <textarea
                      id="message" name="message" rows={5} required value={form.message} onChange={handleChange}
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold-400 text-zinc-950 text-sm font-semibold hover:bg-gold-500 transition-colors duration-200 self-start"
                  >
                    Send Message
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} className="mt-4">
          <div className="relative w-full h-64 overflow-hidden rounded-2xl border border-border">
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

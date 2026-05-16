"use client";

import CtaSection from '@/components/CtaSection';
import { useI18n } from "@/i18n/useI18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function lines(text: string) {
  return text.split("\n").map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

function requiredLabel(label: string) {
  return `${label} *`;
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { t } = useI18n("contact");
  const topics = t("form.topics", {
    returnObjects: true,
  }) as unknown as string[];
  const industries = t("form.industries", {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <div>
      <div className="hero-bottom-shadow relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 30% 40%, rgba(120,50,0,0.40) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-0 lg:grid-cols-[420px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="border-r border-white/[0.06] px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
          >
            <p className="mb-5 text-xs font-light tracking-widest text-accent-500 uppercase">
              {t('hero.eyebrow')}
            </p>
            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              {lines(t('hero.title'))}
            </h1>
            <p className="mt-6 max-w-xs text-sm leading-8 font-light text-foreground-400">
              {t('hero.description')}
            </p>

            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#DB5828] to-[#c05500] p-7 shadow-[0_8px_40px_rgba(255,138,0,0.25)]">
              <p className="text-base leading-7 font-light text-foreground-100">
                &ldquo;{t('hero.testimonial')}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20" />
                <p className="text-xs font-light text-foreground-200">
                  {t('hero.testimonial_author')}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-3 text-sm font-light text-foreground-200">
              <p>{t('hero.location')}</p>
              <p>{t('hero.email')}</p>
              <p>{t('hero.hours')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
          >
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center">
                <p className="mb-4 text-5xl font-bold text-accent-500">
                  {t('success.mark')}
                </p>
                <h2 className="text-3xl font-bold">{t('success.title')}</h2>
                <p className="mt-4 text-sm leading-7 font-light text-foreground-400">
                  {t('success.description')}
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex h-12 items-center border border-border-300 px-6 text-xs font-light tracking-normal uppercase transition-colors hover:border-foreground-100 hover:bg-foreground-100 hover:text-background-100"
                >
                  {t('success.back')}
                </Link>
              </div>
            ) : (
              <form
                className="grid gap-8"
                aria-label={t('form.aria')}
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                      {requiredLabel(t('form.first_name'))}
                    </label>
                    <input
                      required
                      className="contact-input"
                      placeholder={t('form.first_name_placeholder')}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                      {requiredLabel(t('form.last_name'))}
                    </label>
                    <input
                      required
                      className="contact-input"
                      placeholder={t('form.last_name_placeholder')}
                      type="text"
                    />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                      {requiredLabel(t('form.email'))}
                    </label>
                    <input
                      required
                      className="contact-input"
                      placeholder={t('form.email_placeholder')}
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                      {t('form.industry')}
                    </label>
                    <select className="contact-input cursor-pointer appearance-none bg-[#111]">
                      <option value="">{t('form.industry_placeholder')}</option>
                      {industries.map((industry) => (
                        <option key={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                      {requiredLabel(t('form.company'))}
                    </label>
                    <input
                      required
                      className="contact-input"
                      placeholder={t('form.company_placeholder')}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                      {requiredLabel(t('form.phone'))}
                    </label>
                    <input
                      required
                      className="contact-input"
                      placeholder={t('form.phone_placeholder')}
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                    {requiredLabel(t('form.topic'))}
                  </label>
                  <select
                    required
                    className="contact-input cursor-pointer appearance-none bg-[#111]"
                  >
                    <option value="">{t('form.topic_placeholder')}</option>
                    {topics.map((topic) => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-light tracking-widest text-foreground-200 uppercase">
                    {t('form.details')}
                  </label>
                  <textarea
                    className="contact-input min-h-36 resize-none"
                    placeholder={t('form.details_placeholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-14 w-full items-center justify-center bg-accent-500 text-sm font-light tracking-normal text-foreground-100 uppercase transition-colors hover:bg-accent-500 sm:w-auto sm:px-12"
                >
                  {t('form.submit')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <CtaSection
        eyebrow={t('before_send.eyebrow')}
        title={t('before_send.title')}
        description={t('before_send.description')}
        primaryAction={{ href: '/portfolio', label: t('before_send.primary') }}
        secondaryAction={{
          href: '/services',
          label: t('before_send.secondary'),
        }}
      />
    </div>
  );
}

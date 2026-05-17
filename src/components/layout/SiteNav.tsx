"use client";

import AuthButton from '@shared/AuthButton';
import LangSwitch from '@shared/LangSwitch';
import { NavLink } from '@shared/NavLink';
import { Sheet } from '@ui/Sheet';
import { useI18n } from '@/i18n/useI18n';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@ui';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/shop', key: 'shop' },
  { href: '/clients', key: 'clients' },
  { href: '/insights', key: 'insights' },
];

export default function SiteNav() {
  const { t } = useI18n('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header data-header>
      <div className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-all duration-500',
            scrolled ? 'bg-background-100/95 backdrop-blur-xl' : 'bg-transparent'
          )}
        />
        <div className="relative z-100 mx-auto flex h-(--header-height) max-w-(--homepage-max-width) items-center justify-between px-[calc(var(--homepage-padding-inset)+var(--homepage-outer-padding)-1px)]">
          <a className="cursor-pointer" href="/" aria-label="HAGX" onClick={() => setOpen(false)}>
            <img src="/images/hagx-logo.svg" alt="HAGX" width="76" height="19" />
          </a>

          <nav>
            <div className="hidden items-center gap-4 lg:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} className="text-xs">
                  {t(link.key)}
                </NavLink>
              ))}
              <div className="bg-background-200 h-4 w-px" />
              <LangSwitch />
              <AuthButton />
              <Button asChild size={{ initial: '1' }} variant="default">
                <a href="/contact">{t('contact_cta')}</a>
              </Button>
            </div>
          </nav>

          {/* Hamburger */}
          <Button
            variant="ghost"
            iconOnly
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t('menu_toggle')}
          >
            <span className="flex flex-col gap-[5px]">
              <span className={`block h-[1.5px] w-5 origin-center bg-current transition-transform duration-300 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] w-5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] w-5 origin-center bg-current transition-transform duration-300 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile nav — Sheet */}
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        side="bottom"
        className="bg-background-100"
        headerSlot={
          <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-border-100 px-4">
            <a href="/" onClick={() => setOpen(false)}>
              <img src="/images/hagx-logo.svg" alt="HAGX" width="76" height="19" className="h-[19px] w-[76px]" />
            </a>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-foreground flex items-center gap-2 text-[10px] font-light tracking-widest text-foreground-200 uppercase transition-colors"
            >
              {t('close')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        }
        footerSlot={
          <div className="px-4 py-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-subtle mb-3 text-xs font-light tracking-widest uppercase">{t('contact_heading')}</p>
                <p className="text-xs font-light text-foreground-200">contact@hagx.co</p>
                <p className="text-subtle mt-1 text-xs font-light">{t('business_hours')}</p>
              </div>
              <div>
                <p className="text-subtle mb-3 text-xs font-light tracking-widest uppercase">{t('social_heading')}</p>
                <div className="flex gap-5 text-xs font-light text-foreground-200">
                  <a href="https://line.me/ti/p/hagx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LINE</a>
                  <a href="https://instagram.com/hagx.co" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">IG</a>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="hover:text-background text-foreground hover:border-foreground hover:bg-foreground inline-flex h-11 items-center border border-border-100 px-7 text-[11px] font-light tracking-widest uppercase transition-colors"
                >
                  {t('contact_cta')}
                </a>
                <AuthButton />
              </div>
              <LangSwitch />
            </div>
          </div>
        }
      >
        {/* Nav links */}
        <nav className="flex flex-col justify-center py-4">
          <div className="space-y-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="block border-b border-border-100 py-5">
                  <NavLink href={link.href} onClick={() => setOpen(false)} className="text-4xl font-light">
                    {t(link.key)}
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        </nav>
      </Sheet>
    </header>
  );
}

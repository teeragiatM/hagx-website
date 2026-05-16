"use client";

import { useI18n } from "@/i18n/useI18n";
import Link from "next/link";

export default function SiteFooter() {
  const { t: tNav } = useI18n("nav");
  const { t: tFooter } = useI18n("footer");

  const cols: {
    heading: string;
    links?: [string, string][];
    content?: string;
  }[] = [
    {
      heading: tFooter("sitemap"),
      links: [
        ["/", tNav("home")],
        ["/about", tNav("about")],
        ["/services", tNav("services")],
        ["/portfolio", tNav("portfolio")],
        ["/shop", tNav("shop")],
        ["/insights", tNav("insights")],
        ["/contact", tNav("contact")],
      ],
    },
    {
      heading: tFooter("location"),
      links: [
        [
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tFooter("address") || "6/197 Huahin")}`,
          tFooter("address"),
        ],
      ],
    },
    {
      heading: tFooter("social"),
      links: [
        ["mailto:contact@hagx.co", "contact@hagx.co"],
        ["https://line.me/ti/p/hagx", "LINE: @hagx"],
        ["https://instagram.com/hagx.co", "Instagram"],
      ],
    },
  ];

  return (
    <footer className="relative z-50 border-t border-border-100 bg-background-100">
      {/* top */}
      <div className="mx-auto max-w-[var(--homepage-max-width)]">
        <div
          className="grid grid-cols-2 px-[var(--homepage-outer-padding)] py-14 pb-6 lg:grid-cols-[repeat(4,1fr)]"
          style={{ rowGap: '48px' }}
        >
          {/* brand */}
          <div className="px-(--homepage-padding-inset)">
            <Link href="/" aria-label="HAGX">
              <img
                src="/images/hagx-logo.svg"
                alt="HAGX"
                width="80"
                height="20"
                className="h-5 w-20"
              />
            </Link>
            <p className="mt-5 text-xs text-foreground-300">
              {tFooter('tagline')}
            </p>
          </div>

          {/* link cols */}
          {cols.map((col) => (
            <div className="px-(--homepage-padding-inset)" key={col.heading}>
              <p className="mb-5 text-xs font-medium uppercase">
                {col.heading}
              </p>
              {col.links ? (
                <ul className="space-y-2">
                  {col.links.map(([href, label]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-xs text-foreground-300 transition-colors hover:text-foreground-200"
                        {...(href.startsWith('http') ||
                        href.startsWith('mailto')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-light text-foreground-300">
                  {col.content}
                </p>
              )}
            </div>
          ))}
        </div>
        <div
          style={{ marginTop: '64px' }}
          className="flex hidden gap-2 px-(--homepage-padding-inset) text-xs text-foreground-400 lg:flex"
        >
          <Link href="/terms" className="hover:text-foreground-300">
            {tFooter('terms')}
          </Link>
          <span>|</span>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground-300"
          >
            {tFooter('privacy')}
          </Link>
          <p>© 2026 {tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

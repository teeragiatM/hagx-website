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
    <footer className="border-t">
      {/* top */}
      <div className="mx-auto ui-margin ui-padding">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Link href="/" aria-label="HAGX">
              <img
                src="/images/hagx-logo.svg"
                alt="HAGX"
                width="80"
                height="20"
                className="h-5 w-20"
              />
            </Link>
            <p className="mt-6 max-w-xs text-xs font-light leading-6 text-white/30">
              {tFooter("tagline")}
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="https://instagram.com/hagx.co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/30 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://line.me/ti/p/hagx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LINE"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/30 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.365 9.89c.50 0 .906.406.906.906s-.406.906-.906.906h-2.724v1.538h2.724c.5 0 .906.406.906.906s-.406.906-.906.906H15.734a.907.907 0 0 1-.906-.906V9.89c0-.5.406-.906.906-.906h3.63zm-5.818 0c.5 0 .906.406.906.906v4.256c0 .5-.406.906-.906.906s-.906-.406-.906-.906V10.796c0-.5.406-.906.906-.906zm-2.178 0c.279 0 .54.129.706.347l2.572 3.483V10.796a.906.906 0 0 0-1.812 0v.906l-1.466-1.987a.904.904 0 0 0-1.612.565v4.256c0 .5.406.906.906.906s.906-.406.906-.906v-2.178l1.466 1.987a.906.906 0 0 0 1.612-.565V9.89c0-.5-.406-.906-.906-.906h-.372zM12 2C6.477 2 2 6.154 2 11.25c0 4.077 2.636 7.56 6.37 9.01.278.05.338-.12.338-.267v-1.167c-1.55.337-1.877-.748-1.877-.748-.253-.643-.618-.814-.618-.814-.505-.345.038-.338.038-.338.559.039.852.574.852.574.496.85 1.3.605 1.617.463.05-.36.194-.605.352-.744-1.236-.14-2.535-.618-2.535-2.752 0-.608.218-1.105.574-1.494-.057-.14-.249-.707.055-1.474 0 0 .468-.15 1.532.571.445-.124.922-.185 1.397-.188.475.003.952.064 1.397.188 1.064-.72 1.532-.571 1.532-.571.304.767.112 1.334.055 1.474.357.389.574.886.574 1.494 0 2.14-1.302 2.61-2.543 2.747.2.172.378.512.378 1.032v1.53c0 .149.06.32.342.266C19.363 18.81 22 15.327 22 11.25 22 6.154 17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="mb-5 text-[10px] font-light uppercase tracking-widest text-white/25">
                {col.heading}
              </p>
              {col.links ? (
                <ul className="space-y-3">
                  {col.links.map(([href, label]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-xs font-light text-white/40 transition-colors hover:text-white"
                        {...(href.startsWith("http") ||
                        href.startsWith("mailto")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-light leading-6 text-white/40">
                  {col.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="mx-auto max-w-[1500px] border-t border-white/[0.06] px-8 sm:px-12 lg:px-16" />

      {/* bottom */}
      <div className="ui-r-px-4 ui-r-py-2">
        <div className="flex flex-col justify-between gap-3 text-[10px] font-light text-white/20 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="transition-colors hover:text-white/50"
            >
              {tFooter("terms")}
            </Link>
            <span>|</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white/50"
            >
              {tFooter("privacy")}
            </Link>
          </div>
          <p>© 2026 {tFooter("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

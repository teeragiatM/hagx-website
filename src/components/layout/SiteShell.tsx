"use client";

import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const SHELL_EXCLUDED = ["/login", "/admin"];

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const excluded = SHELL_EXCLUDED.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (excluded) return <>{children}</>;

  return (
    <div className="group/layout flex w-full flex-col">
      <SiteNav />
      <main className="group-not-has-[section[data-hero]]/layout:pt-(--header-height) flex flex-1 flex-col min-h-[calc(100*var(--dvh))]">
        <div className="py-0 px-(--homepage-outer-padding) w-full mx-auto max-w-(--homepage-max-width)">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

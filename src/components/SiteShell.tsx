"use client";

import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const SHELL_EXCLUDED = ["/login", "/admin"];

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const excluded = SHELL_EXCLUDED.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (excluded) return <>{children}</>;

  return (
    <div className="Layout_container flex flex-col w-full">
      <SiteNav />
      <main className="Layout_content flex flex-1 flex-col">
        <div className="LayoutContent_root LayoutContent_homepage">
                  {children}

        </div>
        </main>
      <SiteFooter />
    </div>
  );
}

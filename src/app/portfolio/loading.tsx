"use client";

import { Preloader } from "@ui/Preloader";

export default function PortfolioLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Preloader.Logo />
    </div>
  );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import { Preloader } from '@ui/Preloader';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PortfolioForm from "./PortfolioForm";
import { PageSection } from '@layout';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Preloader.Logo />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen px-(--page-padding-inline) py-24">
      <PageSection className="px-(--homepage-padding-inset)">
        <div className="mb-10 border-b border-white/[0.06] pb-6">
          <p className="mb-1 text-xs font-light tracking-widest text-foreground-400 uppercase">
            Admin
          </p>
          <h1 className="text-2xl font-light text-foreground-100">
            Add Portfolio Item
          </h1>
        </div>
        <PortfolioForm />
      </PageSection>
    </div>
  );
}

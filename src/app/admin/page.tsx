"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.replace("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090807]">
        <p className="text-xs font-light tracking-widest text-foreground-400 uppercase">
          Loading…
        </p>
      </div>
    );
  }

  if (!user) return null;

  return <AdminDashboard email={user.email ?? ""} />;
}

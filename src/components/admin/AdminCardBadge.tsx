"use client";

import { useAuth } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  href: string;
  label?: string;
};

export default function AdminCardBadge({ href, label = "แก้ไข" }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(href); }}
      className="absolute top-2 right-2 z-50 flex items-center gap-1.5 border border-accent-500/60 bg-black/70 px-2.5 py-1 text-[9px] font-light tracking-widest text-accent-500 uppercase backdrop-blur-sm transition-colors hover:bg-accent-500 hover:text-white"
    >
      <Pencil className="h-2.5 w-2.5" strokeWidth={1.5} />
      {label}
    </button>
  );
}

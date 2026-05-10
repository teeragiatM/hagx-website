"use client";

import { useRouter } from "next/navigation";
import ModalShell from "@/components/ModalShell";
import { useI18n } from "@/i18n/useI18n";
import { projects, typeOptions } from "@/lib/projects";

export default function ProjectModal({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { t } = useI18n("portfolio");

  const p = projects.find((p) => p.slug === params.slug);
  if (!p) { router.back(); return null; }

  const typeLabel = typeOptions.find((opt) => opt.value === p.type)?.label ?? p.type;
  const tagged = projects.filter((r) => r.type === p.type && r.slug !== p.slug);

  return (
    <ModalShell
      eyebrow={typeLabel}
      title={p.title}
      details={[
        { label: t("modal.description"), value: p.desc },
        { label: t("modal.location"),    value: p.location },
        { label: t("modal.year"),        value: p.year },
        { label: t("modal.scope"),       value: p.scope },
        { label: t("modal.highlights"),  value: p.highlights.join(" · ") },
      ]}
      gallery={p.images.map((src) => ({ src, alt: p.title }))}
      tags={tagged.map((r) => ({ label: r.title, slug: r.slug, href: `/portfolio/${r.slug}` }))}
      tagsLabel={t("modal.same_type")}
      cta={{ href: "/contact", label: t("modal.ask_cta") }}
      closeLabel={t("modal.close")}
    />
  );
}

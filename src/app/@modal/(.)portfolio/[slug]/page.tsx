import { notFound } from "next/navigation";
import ModalShell from "@/components/ModalShell";
import { getPortfolioItemBySlug, getPortfolioItems } from "@/lib/getPortfolioItems";
import { typeOptions } from "@/lib/projects";

// Server Component — no "use client" needed; ModalShell handles all client state
export default async function ProjectModal({ params }: { params: { slug: string } }) {
  const [item, allItems] = await Promise.all([
    getPortfolioItemBySlug(params.slug, "th"),
    getPortfolioItems("th"),
  ]);

  if (!item) notFound();

  const typeLabel = typeOptions.find((t) => t.value === item.type)?.label ?? item.type;
  const tagged    = allItems
    .filter((r) => r.type === item.type && r.slug !== item.slug)
    .slice(0, 6);

  return (
    <ModalShell
      eyebrow={typeLabel}
      title={item.title}
      details={[
        { label: "Description", value: item.description          },
        { label: "Location",    value: item.location             },
        { label: "Year",        value: item.year                 },
        { label: "Scope",       value: item.scope                },
        { label: "Highlights",  value: item.highlights.join(" · ") },
      ]}
      gallery={item.gallery.map((src) => ({ src, alt: item.title }))}
      tags={tagged.map((r) => ({ label: r.title, slug: r.slug, href: `/portfolio/${r.slug}` }))}
      tagsLabel="งานประเภทเดียวกัน"
      cta={{ href: "/contact", label: "สอบถามโครงการลักษณะนี้" }}
      closeLabel="Close"
    />
  );
}

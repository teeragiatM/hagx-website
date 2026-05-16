import DetailPageTemplate from "@/components/DetailPageTemplate";
import {
  getPortfolioItemBySlug,
  getPortfolioItems,
  getPortfolioSlugs,
} from "@/lib/getPortfolioItems";
import { typeOptions } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  return getPortfolioSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug, "th");
  if (!item) return {};

  return {
    title: `${item.title} | HAGX Portfolio`,
    description: item.description,
    openGraph: {
      title: `${item.title} | HAGX`,
      description: item.description,
      images: [
        { url: item.cover_image, width: 800, height: 600, alt: item.title },
      ],
      type: "website",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, allItems] = await Promise.all([
    getPortfolioItemBySlug(slug, "th"),
    getPortfolioItems("th"),
  ]);

  if (!item) notFound();

  const typeLabel =
    typeOptions.find((t) => t.value === item.type)?.label ?? item.type;

  const related = allItems
    .filter((r) => r.type === item.type && r.slug !== item.slug)
    .slice(0, 3);

  return (
    <DetailPageTemplate
      backHref="/portfolio"
      backLabel="Projects"
      breadcrumb={typeLabel}
      coverImage={item.cover_image}
      eyebrow={typeLabel}
      title={item.title}
      body={<p className="max-w-2xl">{item.description}</p>}
      gallery={item.gallery.slice(1)}
      highlights={item.highlights}
      details={[
        { label: "Location", value: item.location },
        { label: "Year", value: item.year },
        {
          label: "Category",
          value:
            item.category === "installation"
              ? "Installation Work"
              : "Supply & Sales",
        },
        { label: "Scope", value: item.scope },
      ]}
      primaryAction={{ href: "/contact", label: "สอบถามโครงการลักษณะนี้" }}
      secondaryAction={{ href: "/portfolio", label: "← ดูผลงานทั้งหมด" }}
      related={related.map((r) => ({
        href: `/portfolio/${r.slug}`,
        image: r.cover_image,
        title: r.title,
        subtitle: `${r.location} / ${r.year}`,
      }))}
      relatedEyebrow="โครงการในประเภทเดียวกัน"
      relatedTitle="Related Projects"
      cta={{
        eyebrow: "Start a Project",
        title: "อยากทำโครงการลักษณะนี้?",
        description:
          "ส่งรายละเอียดโครงการให้ทีม HAGX ช่วยประเมินระบบ วัสดุ และแนวทางติดตั้งเบื้องต้น",
        primary: { href: "/contact", label: "ปรึกษาโครงการ" },
        secondary: { href: "/portfolio", label: "ดูผลงานอื่น" },
      }}
    />
  );
}

import { ArticleEditPanel } from "@admin";
import DetailPageTemplate from "@sections/DetailPageTemplate";
import { getArticleBySlug, getArticles } from "@/lib/supabase";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title_th} | HAGX Insights`,
    description: article.excerpt_th ?? undefined,
    openGraph: {
      title: `${article.title_th} | HAGX`,
      description: article.excerpt_th ?? undefined,
      images: article.cover_image
        ? [{ url: article.cover_image, width: 1200, height: 630, alt: article.title_th }]
        : [],
      type: "article",
    },
  };
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);

  if (!article) notFound();

  const subtitle = [
    article.author,
    article.reading_time ? `${article.reading_time} นาที` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const body = article.body_th ? (
    <pre className="whitespace-pre-wrap font-sans">{article.body_th}</pre>
  ) : null;

  const details = [
    article.category ? { label: "Category", value: article.category } : null,
    article.author ? { label: "Author", value: article.author } : null,
    article.reading_time
      ? { label: "Reading time", value: `${article.reading_time} นาที` }
      : null,
    article.tags && article.tags.length > 0
      ? { label: "Tags", value: article.tags.join(", ") }
      : null,
  ].filter((d): d is { label: string; value: string } => d !== null);

  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({
      href: `/insights/${a.slug}`,
      image: a.cover_image ?? "",
      title: a.title_th,
      subtitle: a.category ?? undefined,
    }));

  return (
    <>
      <DetailPageTemplate
        backHref="/insights"
        backLabel="Insights"
        coverImage={article.cover_image ?? undefined}
        eyebrow={article.category ?? undefined}
        title={article.title_th}
        subtitle={subtitle || undefined}
        body={body}
        gallery={article.gallery ?? []}
        details={details}
        primaryAction={{ href: "/contact", label: "ปรึกษาผู้เชี่ยวชาญ" }}
        secondaryAction={{ href: "/insights", label: "← บทความทั้งหมด" }}
        related={related}
        relatedEyebrow="บทความที่เกี่ยวข้อง"
        relatedTitle="อ่านเพิ่มเติม"
        cta={{
          eyebrow: "ปรึกษาผู้เชี่ยวชาญ",
          title: "มีคำถามเกี่ยวกับโครงการของคุณ?",
          description:
            "ทีม HAGX พร้อมให้คำปรึกษาด้านวัสดุ ระบบ และงบประมาณ — ไม่มีค่าใช้จ่าย",
          primary: { href: "/contact", label: "ปรึกษาผู้เชี่ยวชาญ" },
          secondary: { href: "/insights", label: "บทความทั้งหมด" },
        }}
      />
      <ArticleEditPanel article={article} />
    </>
  );
}

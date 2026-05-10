import { client, urlFor } from "@/lib/sanity";
import { postBySlugQuery, postsQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  author: string;
  categories: string[];
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts: Post[] = await client.fetch(postsQuery).catch(() => []);
  return posts.map((p) => ({ slug: p.slug.current }));
}

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-slate-600 leading-relaxed font-light mb-5">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-slate-200 pl-6 my-6 text-slate-500 italic font-light">
        {children}
      </blockquote>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post | null = await client
    .fetch(postBySlugQuery, { slug })
    .catch(() => null);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-slate-400 font-light hover:text-slate-900 transition-colors mb-12"
        >
          ← กลับ
        </Link>

        <div className="mb-8">
          {post.categories?.length > 0 && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-light mb-4">
              {post.categories.join(" · ")}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-light">
            {post.author && <span>{post.author}</span>}
            <span>·</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {post.mainImage && (
          <div className="relative aspect-[16/9] overflow-hidden mb-12">
            <Image
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div className="prose-custom">
          {post.body && <PortableText value={post.body} components={components} />}
        </div>
      </div>
    </main>
  );
}

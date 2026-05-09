import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage: object;
  author: string;
  categories: string[];
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(postsQuery).catch(() => []);

  return (
    <main className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-light mb-4">
            Insights
          </p>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
            บทความ
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-slate-400 font-light text-sm">
              ยังไม่มีบทความ — เพิ่มได้ที่ Sanity Studio
            </p>
            <a
              href="/studio"
              className="inline-block mt-6 text-xs tracking-[0.15em] uppercase font-light px-6 py-2.5 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
            >
              เปิด Studio
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
                <article>
                  {post.mainImage && (
                    <div className="relative aspect-[16/9] overflow-hidden mb-5">
                      <Image
                        src={urlFor(post.mainImage).width(800).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div>
                    {post.categories?.length > 0 && (
                      <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-light mb-2">
                        {post.categories[0]}
                      </p>
                    )}
                    <h2 className="text-base font-semibold text-slate-900 leading-snug mb-2 group-hover:text-slate-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-3 text-[10px] tracking-widest text-slate-300 font-light">
                      {new Date(post.publishedAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

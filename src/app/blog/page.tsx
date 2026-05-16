import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from 'next/link';

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
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-light tracking-[0.3em] text-slate-400 uppercase">
            Insights
          </p>
          <h1 className="text-5xl tracking-tight text-slate-900">บทความ</h1>
        </div>

        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm font-light text-slate-400">
              ยังไม่มีบทความ — เพิ่มได้ที่ Sanity Studio
            </p>
            <a
              href="/studio"
              className="mt-6 inline-block border border-background-100 px-6 py-2.5 text-xs font-light tracking-[0.15em] text-background-100 uppercase transition-all duration-200 hover:bg-background-100 hover:text-foreground-100"
            >
              เปิด Studio
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group"
              >
                <article>
                  {post.mainImage && (
                    <div className="relative mb-5 aspect-[16/9] overflow-hidden">
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
                      <p className="mb-2 text-[10px] font-light tracking-[0.25em] text-slate-400 uppercase">
                        {post.categories[0]}
                      </p>
                    )}
                    <h2 className="mb-2 text-base leading-snug font-semibold text-slate-900 transition-colors group-hover:text-slate-600">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="line-clamp-2 text-sm leading-relaxed font-light text-slate-500">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-3 text-[10px] font-light tracking-widest text-slate-300">
                      {new Date(post.publishedAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

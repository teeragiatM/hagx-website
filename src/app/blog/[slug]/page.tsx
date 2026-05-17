import { client, urlFor } from "@/lib/sanity";
import { postBySlugQuery, postsQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@layout/PageHero";

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
      <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-10 mb-3 text-lg font-semibold">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 leading-relaxed font-light text-foreground-200">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-2 border-border-100 pl-6 font-light text-foreground-300 italic">
        {children}
      </blockquote>
    ),
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await client
    .fetch(postBySlugQuery, { slug })
    .catch(() => null);

  if (!post) notFound();

  const eyebrow = post.categories?.length > 0
    ? post.categories.join(" · ")
    : undefined;

  const subtitle = [
    post.author,
    post.publishedAt &&
      new Date(post.publishedAt).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={post.title}
        subtitle={subtitle}
        align="left"
        variant="shadow"
        glow={false}
        minHeight="60vh"
        backgroundSlot={
          post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(1600).url()}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
          ) : undefined
        }
      />

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 text-[10px] font-light tracking-[0.2em] text-foreground-400 uppercase transition-colors hover:text-foreground-200"
        >
          ← กลับ
        </Link>

        <div className="prose-custom mt-10">
          {post.body && (
            <PortableText value={post.body} components={components} />
          )}
        </div>
      </div>
    </>
  );
}

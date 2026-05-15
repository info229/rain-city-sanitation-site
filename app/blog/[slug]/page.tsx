import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaGroup } from "@/components/cta-group";
import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} copy={post.description} />

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_0.22fr]">
          <article className="surface-card p-7 sm:p-10">
            <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
              <span>{post.publishedOn}</span>
              <span className="text-muted">{post.readTime}</span>
            </div>
            <p className="mt-5 text-base leading-8 text-muted">{post.excerpt}</p>

            <div className="mt-8 space-y-10">
              {post.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-extrabold text-ink">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-sm leading-8 text-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-2xl border border-line bg-surfaceStrong px-4 py-3">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-5">
            <div className="surface-card p-6">
              <h2 className="text-lg font-extrabold text-ink">Keep exploring</h2>
              <div className="mt-4 space-y-3">
                {blogPosts
                  .filter((entry) => entry.slug !== post.slug)
                  .slice(0, 3)
                  .map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/blog/${entry.slug}`}
                      className="block rounded-2xl border border-line bg-surfaceStrong px-4 py-4 text-sm font-semibold text-ink transition hover:border-brand/30 hover:text-brand-dark"
                    >
                      {entry.title}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-lg font-extrabold text-ink">Need a quote instead?</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                If you already know what needs to go, skip the reading and get a fast estimate or text photos for confirmation.
              </p>
              <div className="mt-5">
                <CtaGroup includeEstimate />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

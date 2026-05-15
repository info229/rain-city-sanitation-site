import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Junk Removal Tips",
  description:
    "Helpful junk removal articles, pricing guidance, and pickup tips for Seattle and the Eastside.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Junk removal tips, how-tos, and local pricing guidance"
        copy="Simple articles that help customers understand pricing, prep for pickup, and make faster decisions without digging through generic advice."
      />

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Articles"
            title="Clean, useful reads"
            copy="Built to answer the questions people usually ask before they text, call, or book a pickup."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.slug} className="surface-card p-7">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
                  <span>{post.category}</span>
                  <span className="text-muted">{post.readTime}</span>
                  <span className="text-muted">{post.publishedOn}</span>
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-ink">{post.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>
                <div className="mt-6">
                  <Link href={`/blog/${post.slug}`} className="cta-secondary">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

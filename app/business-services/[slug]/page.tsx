import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaGroup } from "@/components/cta-group";
import { PageHero } from "@/components/page-hero";
import { industryPages } from "@/lib/content";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return industryPages.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryPages.find((item) => item.slug === slug);

  if (!industry) {
    return {};
  }

  return {
    title: industry.name,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = industryPages.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }

  const peerPages = industryPages.filter((item) => item.slug !== industry.slug);

  return (
    <>
      <PageHero eyebrow="Business Services" title={industry.name} copy={industry.description} />

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="space-y-8">
            <article className="surface-card p-7 sm:p-8">
              <h2 className="text-3xl font-extrabold text-ink">Where we fit best</h2>
              <p className="mt-4 text-base leading-8 text-muted">{industry.intro}</p>
            </article>

            <article className="surface-card p-7 sm:p-8">
              <h2 className="text-3xl font-extrabold text-ink">What we offer</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {industry.valuePoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-line bg-surfaceStrong px-5 py-4 text-sm font-semibold leading-7 text-ink"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card p-7 sm:p-8">
              <h2 className="text-3xl font-extrabold text-ink">Common jobs</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {industry.commonJobs.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-line bg-surfaceStrong px-5 py-4 text-sm font-semibold leading-7 text-ink"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card p-7 sm:p-8">
              <h2 className="text-3xl font-extrabold text-ink">General pricing guidance</h2>
              <div className="mt-5 space-y-4">
                {industry.pricingGuidance.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-line bg-surfaceStrong px-5 py-4 text-sm leading-7 text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <section className="surface-card p-6">
              <h2 className="text-xl font-extrabold text-ink">How it works</h2>
              <div className="mt-4 space-y-3">
                {industry.process.map((step, index) => (
                  <div
                    key={`${industry.slug}-${index}`}
                    className="rounded-2xl border border-line bg-surfaceStrong px-4 py-4 text-sm leading-7 text-muted"
                  >
                    <span className="mr-2 font-bold text-brand-dark">0{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </section>

            {industry.priorClients.length > 0 ? (
              <section className="surface-card p-6">
                <h2 className="text-xl font-extrabold text-ink">Relevant prior clients</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {industry.priorClients.map((client) => (
                    <span
                      key={client}
                      className="rounded-full border border-line bg-surfaceStrong px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-muted"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="surface-card p-6">
              <h2 className="text-xl font-extrabold text-ink">{industry.ctaTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{industry.ctaCopy}</p>
              <div className="mt-5">
                <CtaGroup includeEstimate />
              </div>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-xl font-extrabold text-ink">Explore more industries</h2>
              <div className="mt-4 space-y-3">
                {peerPages.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/business-services/${item.slug}`}
                    className="block rounded-2xl border border-line bg-surfaceStrong px-4 py-4 text-sm font-semibold text-ink transition hover:border-brand/20 hover:text-brand-dark"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </>
  );
}

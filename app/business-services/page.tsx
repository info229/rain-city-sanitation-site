import type { Metadata } from "next";
import Link from "next/link";
import { CtaGroup } from "@/components/cta-group";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { industryPages } from "@/lib/content";
import { companyProof } from "@/lib/data";

export const metadata: Metadata = {
  title: "Business Services",
  description:
    "Business junk removal support for contractors, retail companies, real estate agents, property managers, and municipalities across Seattle and the Eastside.",
};

export default function BusinessServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Services"
        title="Targeted haul-away pages for the clients who need speed and clarity"
        copy="Built for contractors, real estate agents, retail companies, property managers, and municipalities that need a cleaner, faster junk removal partner."
      />

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Who We Help"
            title="Simple pages built around real job types"
            copy="Instead of listing everything on one page, these industry pages break down how we help, what we commonly remove, what pricing usually depends on, and why local service matters."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industryPages.map((industry) => (
              <article key={industry.slug} className="surface-card p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
                  {industry.shortLabel}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-ink">{industry.name}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{industry.description}</p>
                <div className="mt-6">
                  <Link href={`/business-services/${industry.slug}`} className="cta-secondary">
                    View page
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Pricing Approach"
              title="Competitive, simple, and easy to gauge"
              copy="Most business and commercial jobs are quoted by item mix, volume, access, and labor conditions. The goal is not to overwhelm people with line items. The goal is to make the pricing feel clear and fair fast."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Common pickups",
                copy:
                  "Single items, basic backroom junk, smaller overflow, and straightforward retail or listing-prep pickups can often be priced from photos.",
              },
              {
                title: "Larger cleanouts",
                copy:
                  "Bigger contractor, property, and multi-room cleanouts are usually scoped by load size, weight, labor, and actual access conditions.",
              },
              {
                title: "Special situations",
                copy:
                  "Special handling, heavy debris, teardown work, and unusual access are still priced clearly, just with a little more context before final confirmation.",
              },
            ].map((item) => (
              <article key={item.title} className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Recognizable Proof"
              title="Previous clients help the page feel real"
              copy="A clean industry page converts better when it shows recognizable experience, simple communication, and the ability to move quickly when cleanup is blocking the next step."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {companyProof.map((companyName, index) => (
              <div
                key={`${companyName}-${index}`}
                className="flex min-h-24 items-center justify-center rounded-[1.5rem] border border-line bg-surfaceStrong px-5 py-6 text-center text-sm font-bold uppercase tracking-[0.14em] text-muted"
              >
                {companyName}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-ink">Need a faster commercial quote?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            Send photos, the address, and a quick note about what needs to go. We can usually give
            a clean quote range without making the process feel heavy or corporate.
          </p>
          <div className="mt-8">
            <CtaGroup includeEstimate />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AreaChips } from "@/components/area-chips";
import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { CtaGroup } from "@/components/cta-group";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCards } from "@/components/testimonial-cards";
import { resourceLinks } from "@/lib/content";
import { company, companyProof, trustPoints } from "@/lib/data";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Retail Junk Removal Seattle",
  description:
    "Same-day and next-day retail junk removal across Seattle and the Eastside with fast quotes, fair pricing, and local crews.",
};

export default async function HomePage() {
  const { reviews, source, averageRating, totalRatings } = await getReviews();

  return (
    <>
      <section className="hero-grid overflow-hidden border-b border-line/70">
        <div className="container-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <span className="eyebrow border-brand/20 bg-white/80 text-brand-dark shadow-sm">
              Retail Junk Removal | Greater Seattle & Eastside
            </span>
            <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              Great Pricing. Fast Service. Zero Hassle. Book Now
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Same-day and next-day junk removal across Greater Seattle and the Eastside. Great
              pricing, fast response, and reliable local crews.
            </p>
            <div className="mt-8">
              <CtaGroup includeEstimate />
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-brand/10 bg-white/72 px-4 py-3 text-sm font-semibold text-brand-dark shadow-sm backdrop-blur"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <aside className="surface-card overflow-hidden border-white/10 bg-white/8 text-white shadow-lift">
            <div className="relative h-72">
              <Image
                src="/gallery-truck.jpg"
                alt="Rain City Sanitation truck and crew in action"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/65">
                  Local Crew. Real Work.
                </p>
                <h2 className="mt-4 text-3xl font-extrabold">The easiest way to get pricing</h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/82">
                  Send a few photos, tell us where the items are, and we will reply with a clear price
                  range and appointment options. No clunky booking flow. No call-center feel.
                </p>
              </div>
            </div>
            <div className="grid gap-0 border-t border-white/10 bg-brand-dark/90 sm:grid-cols-3">
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/55">Response</p>
                <p className="mt-2 text-lg font-bold">Fast local reply</p>
              </div>
              <div className="border-y border-white/10 p-5 sm:border-x sm:border-y-0">
                <p className="text-xs uppercase tracking-[0.14em] text-white/55">Scheduling</p>
                <p className="mt-2 text-lg font-bold">Same or next day</p>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/55">Pricing</p>
                <p className="mt-2 text-lg font-bold">Simple and fair</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-white py-5">
        <div className="container-shell flex flex-wrap items-center justify-center gap-3 text-center sm:gap-6">
          {["Local", "Fast Response", "Transparent Pricing", "Licensed & Insured"].map((item) => (
            <span key={item} className="text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Why Rain City"
              title="Cleaner, faster, and easier than the big national experience"
              copy="Customers choose us because the process is obvious. Local crews. Fast replies. Straightforward quotes. Real people who move quickly without making the job feel complicated."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["What you want", "Fast answers, a fair quote, and a crew that gets in and gets it done."],
              ["How we help", "Text-photo quotes, same-day availability, and full-service lifting and loading."],
              ["What customers notice", "Less friction, better communication, and simpler pricing than big corporate chains."],
              ["What that means", "You get your space back without wasting time on a messy booking process."],
            ].map(([title, copy]) => (
              <article key={title} className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Before & After"
            title="From cluttered to clear"
            copy="Real field photos help show the kind of work we handle every week, from bulky pickups to cleared, usable finished spaces."
          />
          <div className="mt-10">
            <BeforeAfterGallery />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell rounded-[2rem] border border-brand/15 bg-brand-soft/70 p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-dark">Fast estimate</p>
              <h2 className="mt-3 text-balance text-3xl font-extrabold text-ink sm:text-4xl">
                Try our instant quote tool
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                Add the items you need removed, answer a few quick questions, and get an estimated range in minutes. For the fastest confirmation, just text photos or call.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link className="cta-primary" href="/instant-quote">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Junk Removal Tips"
            title="Helpful articles without the fluff"
            copy="Simple, local advice on pricing, preparation, and faster pickups for Seattle and Eastside customers."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {resourceLinks.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="surface-card block p-6 transition hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-lift"
              >
                <h3 className="text-xl font-bold text-ink">{resource.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{resource.copy}</p>
                <p className="mt-5 text-sm font-bold text-brand-dark">Explore page</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Areas Served"
              title={`Built for ${company.serviceArea}`}
              copy="We regularly serve Seattle, Bellevue, Kirkland, Renton, Kent, Lynnwood, Redmond, Shoreline, Issaquah, Bothell, Sammamish, Woodinville, Kenmore, Mercer Island, Newcastle, and nearby communities. Local coverage helps us quote faster and schedule smarter."
            />
            <div className="mt-7">
              <Link href="/areas-we-serve" className="cta-secondary">
                Explore Service Areas
              </Link>
            </div>
          </div>
          <AreaChips />
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Reviews"
            title={source === "google" ? "Live Google reviews from Rain City clients" : "Real customer feedback from Rain City clients"}
            copy={
              source === "google"
                ? "Recent review feedback from your Google business listing, presented in a cleaner trust-focused layout."
                : "A few real customer experiences that reflect the kind of speed, communication, and pricing people expect from Rain City."
            }
          />
          <div className="mt-10">
            <TestimonialCards
              reviews={reviews}
              averageRating={averageRating}
              totalRatings={totalRatings}
              source={source}
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Trusted By"
              title="Companies we've worked with"
              copy="Recognizable commercial and retail relationships help show that the crew is trusted for both straightforward pickups and ongoing haul-away support."
            />
            <div className="mt-7">
              <Link href="/business-services" className="cta-secondary">
                Explore Business Services
              </Link>
            </div>
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

    </>
  );
}

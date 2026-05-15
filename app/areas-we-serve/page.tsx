import type { Metadata } from "next";
import { AreaChips } from "@/components/area-chips";
import { CtaGroup } from "@/components/cta-group";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Local junk removal service across Greater Seattle, Bellevue, Kirkland, Renton, Kent, Lynnwood, and nearby communities.",
};

export default function AreasWeServePage() {
  return (
    <>
      <PageHero
        eyebrow="Areas We Serve"
        title="Local junk removal across Greater Seattle and the Eastside"
        copy="Rain City Sanitation serves busy households, property managers, and businesses throughout Seattle and surrounding Eastside communities with quick scheduling and local crews."
      />

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Service Footprint"
              title="Coverage that feels local instead of generic"
              copy="We are positioned for efficient junk removal around Seattle, Bellevue, Kirkland, Renton, Kent, Lynnwood, Redmond, Shoreline, Issaquah, Bothell, Sammamish, Woodinville, Kenmore, Mercer Island, Newcastle, and nearby neighborhoods. That local coverage helps us move faster and communicate better than a remote dispatch model."
            />
          </div>
          <div className="surface-card p-7">
            <AreaChips />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Seattle",
              copy:
                "From dense neighborhoods and alley pickups to retail corridors and apartment turnovers, we help Seattle customers clear space fast without turning a quote into a drawn-out process.",
            },
            {
              title: "Eastside",
              copy:
                "Bellevue, Kirkland, Redmond, Issaquah, and nearby Eastside communities rely on responsive scheduling and clear pricing when bulky junk needs to disappear quickly.",
            },
            {
              title: "South & North End",
              copy:
                "Renton, Kent, Lynnwood, Shoreline, and surrounding areas are all within reach for same-day or next-day pickup depending on route availability and job size.",
            },
          ].map((area) => (
            <article key={area.title} className="surface-card p-7">
              <h2 className="text-2xl font-extrabold text-ink">{area.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{area.copy}</p>
            </article>
          ))}
        </div>
        <div className="container-shell mt-8 rounded-2xl border border-brand/20 bg-brand-soft p-6 text-sm leading-7 text-brand-dark">
          Need service just outside the core map? Contact us with your ZIP code. We regularly help nearby surrounding areas when scheduling lines up, especially around the broader Seattle metro and Eastside corridor.
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell surface-card p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-ink">Need a fast local quote?</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            Text photos and your address for the quickest response. We built the service around
            speed, clarity, and a more personal experience across {company.serviceArea}.
          </p>
          <div className="mt-8">
            <CtaGroup />
          </div>
        </div>
      </section>
    </>
  );
}

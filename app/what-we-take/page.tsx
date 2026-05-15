import type { Metadata } from "next";
import { CtaGroup } from "@/components/cta-group";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceGrid } from "@/components/service-grid";
import { restrictedItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "What We Take",
  description:
    "See the common junk removal categories Rain City Sanitation handles across Seattle and the Eastside.",
};

export default function WhatWeTakePage() {
  return (
    <>
      <PageHero
        eyebrow="What We Take"
        title="Common junk removal categories we haul every week"
        copy="From single furniture pieces to mixed cleanouts, we handle the bulky, awkward, and time-consuming stuff so customers do not have to."
      />

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Removal Categories"
            title="Built for everyday pickups and heavier specialty jobs"
            copy="A quick scan of the common categories we haul, from everyday furniture pickups to heavier specialty removals."
          />
          <div className="mt-10">
            <ServiceGrid />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Special Handling"
              title="Restricted items need approval first"
              copy="Some materials require special disposal rules or may need to be declined. Contact us before booking if your load includes anything in this list."
            />
            <div className="mt-8">
              <CtaGroup />
            </div>
          </div>
          <div className="surface-card p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {restrictedItems.map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-surfaceStrong px-4 py-3 text-sm font-semibold text-ink">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

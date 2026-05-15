import type { Metadata } from "next";
import { InstantEstimator } from "@/components/instant-estimator";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Instant Quote",
  description:
    "Build your pickup, answer a few quick questions, and get an instant junk removal estimate for Seattle and the Eastside.",
};

export default function InstantQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Instant Estimate"
        title="Build your pickup, answer a few quick questions, and see your estimate"
        copy="Add the items you need removed, move through a simple checkout flow, and get an estimated range. If your job is more specialized, call or text us and we will price it quickly."
        showCtas={false}
      />

      <section className="section-space">
        <div className="container-shell">
          <InstantEstimator />
        </div>
      </section>
    </>
  );
}

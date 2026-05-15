import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms governing use of the Rain City Sanitation website, estimates, scheduling, and service communication.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms of Service"
        copy="These terms describe how this website, pricing information, and service requests should be used."
        showCtas={false}
      />

      <section className="section-space">
        <div className="container-shell">
          <article className="surface-card space-y-8 p-7 sm:p-10">
            <section>
              <h2 className="text-2xl font-extrabold text-ink">Website use</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                This website is provided for informational and service-request purposes. By using
                the site, you agree to use it lawfully and not to interfere with its operation,
                attempt to access restricted areas, or submit false or misleading information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Estimates and pricing</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                Pricing shown on this website, including instant quote ranges, is provided as an
                estimate only. Final pricing may change based on actual volume, weight, access,
                material type, disassembly needs, specialty handling, taxes, and on-site conditions
                that were not fully visible during the estimate process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Scheduling and availability</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                Same-day and next-day service is subject to route availability, crew capacity, and
                job details. Submitting a request through the site does not guarantee a reserved
                appointment until the job is confirmed directly with {company.name}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Restricted and specialty items</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                Some materials require approval before service or may not be accepted at all,
                including hazardous materials, certain chemicals, biohazards, asbestos-containing
                materials, and pressurized tanks. Customers are responsible for identifying items
                that may require special handling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Content and accuracy</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                We aim to keep the website accurate and current, but we do not guarantee that all
                content, pricing examples, availability, or service descriptions are complete,
                error-free, or up to date at all times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Limitation of liability</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                To the maximum extent permitted by law, {company.name} is not liable for damages
                arising from use of this website, reliance on website estimates, temporary
                unavailability, or third-party services used to operate the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Changes to these terms</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                We may update these terms from time to time. Continued use of the website after
                changes are posted means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Contact us</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                Questions about these terms can be directed to {company.email} or {company.phoneDisplay}.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

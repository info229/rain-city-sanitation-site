import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Read Rain City Sanitation's accessibility commitment and how to contact the business if you need help using the website.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility Statement"
        copy="We want this website to be as clear and usable as possible for all visitors."
        showCtas={false}
      />

      <section className="section-space">
        <div className="container-shell">
          <article className="surface-card space-y-8 p-7 sm:p-10">
            <section>
              <h2 className="text-2xl font-extrabold text-ink">Our commitment</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                {company.name} aims to provide a website experience that is easy to navigate, easy
                to read, and accessible across modern devices and browsers. We continue improving
                the site as content and features evolve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Ongoing improvements</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                We work to support accessibility best practices such as readable text, clear link
                behavior, responsive layouts, keyboard-friendly interactions where possible, and
                descriptive content for important images and actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Need help?</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                If you have difficulty using this website, accessing any content, or requesting a
                quote online, contact us directly and we will do our best to help.
              </p>
              <p className="mt-4 text-sm leading-8 text-muted">
                Email: {company.email}
                <br />
                Phone: {company.phoneDisplay}
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Rain City Sanitation collects, uses, and protects customer information submitted through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        copy="This page explains what information we collect, how we use it, and how to contact us with questions about your data."
        showCtas={false}
      />

      <section className="section-space">
        <div className="container-shell">
          <article className="surface-card space-y-8 p-7 sm:p-10">
            <section>
              <h2 className="text-2xl font-extrabold text-ink">Information we collect</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                When you use this website, we may collect information you choose to provide, such
                as your name, phone number, email address, ZIP code, requested pickup date, quote
                details, and any information you send to us by text, email, or through the instant
                quote and estimate approval flow.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">How we use information</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                We use submitted information to respond to quote requests, confirm estimates,
                schedule service, communicate with customers, improve the website experience, and
                operate our business. We may also use website and device information for basic
                analytics, security, and fraud prevention.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">How information is shared</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                We do not sell personal information. We may share limited information with service
                providers that help us operate the site and respond to customers, including hosting,
                email delivery, reviews, analytics, and website infrastructure providers. We may
                also disclose information when required by law or when necessary to protect the
                business, customers, or the public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Cookies and analytics</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                This website may use cookies, logs, and similar technologies to understand traffic,
                improve performance, and help secure the site. If analytics or additional tracking
                tools are added later, this policy may be updated to reflect those tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Data security</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                We use reasonable administrative, technical, and operational safeguards to protect
                submitted information. No website or internet transmission is guaranteed to be fully
                secure, so customers should avoid sending highly sensitive information through web
                forms unless requested directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Your choices</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                You may contact us to ask questions about the information you submitted through this
                website or to request updates to your contact details. If you prefer not to use the
                website forms, you can contact us directly by phone or email instead.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-ink">Contact us</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                If you have questions about this Privacy Policy or how information is handled,
                contact {company.name} at {company.email} or {company.phoneDisplay}.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

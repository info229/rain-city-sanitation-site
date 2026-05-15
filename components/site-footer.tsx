import Link from "next/link";
import { company, navLinks, areas } from "@/lib/data";
import { resourceLinks } from "@/lib/content";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-brand-dark text-white">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-5">
          <Logo dark />
          <p className="max-w-md text-sm leading-7 text-white/72">
            {company.tagline} Retail junk removal across {company.serviceArea}. Fast quotes,
            straightforward pricing, and local crews that make haul-away feel easy.
          </p>
          {company.instagramHref ? (
            <div className="flex items-center gap-3 text-sm text-white/78">
              <span className="font-bold uppercase tracking-[0.14em] text-white/60">Social</span>
              <a
                href={company.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white transition hover:text-brand-soft"
              >
                Instagram
              </a>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <a className="cta-primary" href={company.phoneHref}>
              Call Now
            </a>
            <a className="cta-secondary border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-dark" href={company.textHref}>
              Text a Photo
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/70">
            Site Links
          </h2>
          <ul className="space-y-3 text-sm text-white/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/business-services" className="hover:text-white">
                Business Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/70">
            Resources
          </h2>
          <ul className="space-y-3 text-sm text-white/80">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/70">
              Policies
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">
            Service Area
          </h2>
          <div className="flex flex-wrap gap-2">
            {areas.slice(0, 8).map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/78"
              >
                {area}
              </span>
            ))}
          </div>
          <div className="space-y-1 text-sm text-white/75">
            <p>{company.phoneDisplay}</p>
            <p>{company.email}</p>
            <p>{company.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

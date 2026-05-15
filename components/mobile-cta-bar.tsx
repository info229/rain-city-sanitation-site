import { company } from "@/lib/data";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/96 p-3 shadow-lift backdrop-blur sm:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
        <a href={company.phoneHref} className="cta-primary px-3 py-2.5 text-xs">
          Call
        </a>
        <a href={company.textHref} className="cta-secondary px-3 py-2.5 text-xs">
          Text
        </a>
        <a href="/instant-quote" className="cta-secondary border-brand/20 bg-brand-soft px-3 py-2.5 text-xs text-brand-dark">
          Estimate
        </a>
      </div>
    </div>
  );
}

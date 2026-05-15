import Link from "next/link";
import { company } from "@/lib/data";

type CtaGroupProps = {
  centered?: boolean;
  includeEstimate?: boolean;
};

export function CtaGroup({ centered = false, includeEstimate = false }: CtaGroupProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
      <Link className="cta-primary" href="/instant-quote">
        {includeEstimate ? "Start Instant Estimate" : "Get My Estimate"}
      </Link>
      <a className="cta-secondary" href={company.phoneHref}>
        Call Now
      </a>
      <a className="cta-secondary" href={company.textHref}>
        Text a Photo
      </a>
    </div>
  );
}

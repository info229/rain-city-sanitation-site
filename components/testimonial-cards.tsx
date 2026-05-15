import type { Review } from "@/lib/reviews";

type TestimonialCardsProps = {
  reviews: Review[];
  averageRating: number;
  totalRatings?: number;
  source: "curated" | "google";
};

function renderStars(rating: number) {
  return "\u2605".repeat(Math.max(1, Math.min(5, Math.round(rating))));
}

export function TestimonialCards({
  reviews,
  averageRating,
  totalRatings,
  source,
}: TestimonialCardsProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[2rem] bg-brand-dark text-white shadow-lift">
          <div className="bg-[radial-gradient(circle_at_top_left,rgba(82,201,255,0.24),transparent_30%),linear-gradient(135deg,rgba(10,27,50,1),rgba(20,78,117,0.96))] p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/60">
              Trust Snapshot
            </p>
            <div className="mt-5 flex flex-wrap items-end gap-5">
              <div>
                <p className="text-5xl font-extrabold tracking-tight">
                  {averageRating.toFixed(1)}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                  Average rating
                </p>
              </div>
              <div className="pb-1">
                <p className="text-lg tracking-[0.2em] text-brand-accent" aria-hidden="true">
                  {renderStars(averageRating)}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  {source === "google"
                    ? `Live Google review content${totalRatings ? ` from ${totalRatings}+ ratings` : ""}.`
                    : "Curated Rain City testimonials while the live Google connection is being finalized."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              label: "What shows up",
              value: "Fast replies",
            },
            {
              label: "Customers mention",
              value: "Fair pricing",
            },
            {
              label: "Why it matters",
              value: "Local trust",
            },
          ].map((item) => (
            <div key={item.label} className="surface-card p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                {item.label}
              </p>
              <p className="mt-3 text-xl font-bold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <article
            key={`${review.author}-${review.quote.slice(0, 24)}`}
            className={`surface-card relative overflow-hidden p-7 ${
              index === 0 ? "border-brand/20 shadow-lift" : ""
            }`}
          >
            <div
              className="absolute right-6 top-5 text-6xl font-semibold leading-none text-brand/10"
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm tracking-[0.22em] text-brand">
                  {renderStars(review.rating)}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {review.rating}.0 / 5
                </p>
              </div>
              <p className="mt-6 text-lg leading-8 text-ink">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-7 border-t border-line pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">
                  {review.author}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {review.relativeTime ||
                    (source === "google" ? "Google review" : "Rain City testimonial")}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

type PricingCardProps = {
  title: string;
  price: string;
  note: string;
  featured?: boolean;
};

export function PricingCard({ title, price, note, featured = false }: PricingCardProps) {
  return (
    <article
      className={`surface-card h-full p-6 ${
        featured ? "border-brand/40 bg-gradient-to-br from-brand-dark to-brand text-white shadow-lift" : ""
      }`}
    >
      <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${featured ? "text-white/70" : "text-muted"}`}>
        Starting Range
      </p>
      <h3 className={`mt-3 text-xl font-bold ${featured ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-4 text-3xl font-extrabold ${featured ? "text-white" : "text-brand-dark"}`}>{price}</p>
      <p className={`mt-4 text-sm leading-7 ${featured ? "text-white/80" : "text-muted"}`}>{note}</p>
    </article>
  );
}

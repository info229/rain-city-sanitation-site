import { serviceCards } from "@/lib/data";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {serviceCards.map((card) => (
        <article key={card.title} className="surface-card p-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-xl font-bold text-brand-dark">
            {card.title.charAt(0)}
          </div>
          <h3 className="text-xl font-bold text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
        </article>
      ))}
    </div>
  );
}

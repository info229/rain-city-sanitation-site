import Image from "next/image";
import { galleryPlaceholders } from "@/lib/data";

export function BeforeAfterGallery() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {galleryPlaceholders.map((item, index) => (
        <article key={`${item.title}-${index}`} className="surface-card overflow-hidden">
          <div className="relative h-72 overflow-hidden">
            {"image" in item ? (
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
              {"tag" in item ? item.tag : "Project"}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">Field proof</p>
              <p className="mt-2 text-lg font-bold">{item.before}</p>
            </div>
          </div>
          <div className="border-t border-line px-5 py-5">
            <h3 className="text-base font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{item.after}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

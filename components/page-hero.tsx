import { CtaGroup } from "@/components/cta-group";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  showCtas?: boolean;
};

export function PageHero({ eyebrow, title, copy, showCtas = true }: PageHeroProps) {
  return (
    <section className="bg-brand-dark text-white">
      <div className="container-shell py-16 sm:py-20">
        <span className="eyebrow border-white/10 bg-white/10 text-white/80">{eyebrow}</span>
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{copy}</p>
        {showCtas ? (
          <div className="mt-8">
            <CtaGroup />
          </div>
        ) : null}
      </div>
    </section>
  );
}

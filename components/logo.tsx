import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  dark?: boolean;
};

export function Logo({ dark = false }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Rain City Sanitation home">
      <span className="relative flex h-14 w-16 items-center justify-center overflow-hidden">
        <Image
          src="/brand-logo.png"
          alt="Rain City Sanitation logo"
          width={64}
          height={56}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="flex flex-col">
        <span
          className={`text-sm font-extrabold uppercase tracking-[0.18em] ${
            dark ? "text-white/72" : "text-brand-dark"
          }`}
        >
          Rain City
        </span>
        <span className={`text-base font-semibold ${dark ? "text-white" : "text-ink"}`}>
          Sanitation
        </span>
      </span>
    </Link>
  );
}

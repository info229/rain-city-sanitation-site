import { areas } from "@/lib/data";

export function AreaChips() {
  return (
    <div className="flex flex-wrap gap-3">
      {areas.map((area) => (
        <span
          key={area}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm"
        >
          {area}
        </span>
      ))}
    </div>
  );
}

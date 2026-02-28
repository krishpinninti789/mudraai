import Link from "next/link";
import { Mudra } from "@/lib/mudras";

interface MudraCardProps {
  mudra: Mudra;
}

// Decorative icon per card based on category
const CategoryIcon = ({ category }: { category: string }) => {
  if (category === "Samyuta") {
    // scroll icon
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }
  if (category === "Nritta") {
    // music note
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    );
  }
  // Asamyuta — sparkle
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
};

export default function MudraCard({ mudra }: MudraCardProps) {
  return (
    <div className="bg-ivory rounded-2xl overflow-hidden border border-gold/30 flex flex-col group hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-1 transition-all duration-300">
      {/* Image / placeholder */}
      <div
        className="relative h-56 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${mudra.gradientFrom}, ${mudra.gradientTo})`,
        }}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #c9a84c 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>
        {/* Emoji icon as focal point */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl select-none opacity-70">
          {mudra.icon}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-5 py-4 text-darkbrown">
        {/* Name + category icon row */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-black uppercase tracking-tight leading-none">
            {mudra.name}
          </h3>
          <span className="text-gold mt-0.5 shrink-0">
            <CategoryIcon category={mudra.category} />
          </span>
        </div>

        {/* Symbolism tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {mudra.symbolism.map((s) => (
            <span
              key={s}
              className="border border-darkbrown/30 text-darkbrown/60 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-darkbrown/70 leading-relaxed line-clamp-3 mb-4 font-light">
          {mudra.description}
        </p>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-darkbrown/10">
          <span className="text-[9px] font-bold uppercase tracking-widest text-saffron">
            {mudra.category === "Samyuta"
              ? "Category: Samyuta Hasta"
              : mudra.category === "Nritta"
                ? "Category: Nritta Hasta"
                : mudra.region
                  ? `Region: ${mudra.region}`
                  : `Category: Asamyuta Hasta`}
          </span>
          <Link
            href={`/mudras/${mudra.id}`}
            className="text-[11px] font-black uppercase tracking-wider text-darkbrown hover:text-saffron transition-colors flex items-center gap-1"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

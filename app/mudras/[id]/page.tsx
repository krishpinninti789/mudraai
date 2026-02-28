import { notFound } from "next/navigation";
import Link from "next/link";
import { MUDRAS, getMudraById } from "@/lib/mudras";

interface Props {
  params: Promise<{ id: string }>;
}

// Static params for Next.js SSG
export async function generateStaticParams() {
  return MUDRAS.map((m) => ({ id: m.id }));
}

const BackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    className="w-3.5 h-3.5 shrink-0 mt-0.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default async function MudraDetailPage({ params }: Props) {
  const { id } = await params;
  const mudra = getMudraById(id);

  if (!mudra) notFound();

  // Find adjacent mudras for prev/next nav
  const idx = MUDRAS.findIndex((m) => m.id === id);
  const prevMudra = idx > 0 ? MUDRAS[idx - 1] : null;
  const nextMudra = idx < MUDRAS.length - 1 ? MUDRAS[idx + 1] : null;

  return (
    <div className="min-h-screen bg-maroon text-ivory">
      {/* ── Top navigation ── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <Link
          href="/mudras"
          className="inline-flex items-center gap-2 text-ivory/50 hover:text-ivory text-sm font-semibold transition-colors"
        >
          <BackIcon />
          The Library of Gestures
        </Link>
        <span className="text-ivory/20 text-xs uppercase tracking-widest font-semibold">
          {mudra.category} Hasta
        </span>
      </div>

      {/* ── Hero section ── */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: image / graphic */}
        <div
          className="relative rounded-3xl overflow-hidden h-80 md:h-120 border border-gold/30"
          style={{
            background: `linear-gradient(to bottom right, ${mudra.gradientFrom}, ${mudra.gradientTo})`,
          }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #c9a84c 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Emoji */}
          <div className="absolute inset-0 flex items-center justify-center text-9xl select-none opacity-60">
            {mudra.icon}
          </div>
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/50 border border-ivory/20 text-ivory text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {mudra.category} Hasta
            </span>
          </div>
        </div>

        {/* Right: meta */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold mb-3">
            Sanskrit Name
          </p>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-ivory mb-4 font-display">
            {mudra.name}
          </h1>

          {/* Symbolism pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mudra.symbolism.map((s) => (
              <span
                key={s}
                className="border border-gold/40 text-gold text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>

          <p className="text-ivory/70 leading-relaxed text-sm font-light mb-8">
            {mudra.meaning}
          </p>

          {/* Quick stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Region", value: mudra.region },
              { label: "Dance Form", value: mudra.form },
              { label: "Category", value: `${mudra.category} Hasta` },
              { label: "Usages", value: `${mudra.usage.length} contexts` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-ivory/5 border border-ivory/10 rounded-xl px-4 py-3"
              >
                <p className="text-[8px] uppercase tracking-widest text-ivory/30 font-semibold mb-1">
                  {label}
                </p>
                <p className="text-sm font-bold text-ivory leading-tight">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-ivory/10" />
      </div>

      {/* ── Detail sections ── */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Finger Position */}
        <div className="md:col-span-1 bg-ivory/5 border border-ivory/10 rounded-2xl p-6">
          <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-4">
            Finger Position
          </p>
          <p className="text-ivory/80 text-sm leading-relaxed font-light">
            {mudra.fingerPosition}
          </p>
        </div>

        {/* Usage Contexts */}
        <div className="md:col-span-2 bg-ivory/5 border border-ivory/10 rounded-2xl p-6">
          <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-4">
            Usage in Classical Dance
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mudra.usage.map((u) => (
              <li
                key={u}
                className="flex items-start gap-2 text-sm text-ivory/70 font-light"
              >
                <span className="text-gold mt-0.5">
                  <CheckIcon />
                </span>
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Description card ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-gold/10 border border-gold/30 rounded-2xl px-8 py-7">
          <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-3">
            About This Mudra
          </p>
          <p className="text-ivory/80 leading-relaxed text-base font-light">
            {mudra.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 items-center text-xs">
            <span className="text-ivory/30 uppercase tracking-widest font-semibold">
              Form: {mudra.form}
            </span>
            <span className="text-ivory/20">·</span>
            <span className="text-ivory/30 uppercase tracking-widest font-semibold">
              Region: {mudra.region}
            </span>
          </div>
        </div>
      </div>

      {/* ── Prev / Next navigation ── */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="w-full h-px bg-ivory/10 mb-8" />
        <div className="flex items-center justify-between gap-4">
          {prevMudra ? (
            <Link
              href={`/mudras/${prevMudra.id}`}
              className="group flex items-center gap-3 bg-ivory/5 border border-ivory/10 hover:border-gold/40 rounded-2xl px-6 py-4 transition-all"
            >
              <BackIcon />
              <div>
                <p className="text-[8px] uppercase tracking-widest text-ivory/30 font-semibold mb-0.5">
                  Previous
                </p>
                <p className="text-sm font-black uppercase tracking-wide text-ivory group-hover:text-gold transition-colors">
                  {prevMudra.name}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/mudras"
            className="text-[10px] font-bold uppercase tracking-widest text-ivory/30 hover:text-ivory transition-colors"
          >
            All Mudras
          </Link>

          {nextMudra ? (
            <Link
              href={`/mudras/${nextMudra.id}`}
              className="group flex items-center gap-3 bg-ivory/5 border border-ivory/10 hover:border-gold/40 rounded-2xl px-6 py-4 transition-all text-right"
            >
              <div>
                <p className="text-[8px] uppercase tracking-widest text-ivory/30 font-semibold mb-0.5">
                  Next
                </p>
                <p className="text-sm font-black uppercase tracking-wide text-ivory group-hover:text-gold transition-colors">
                  {nextMudra.name}
                </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

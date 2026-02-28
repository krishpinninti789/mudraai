"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MUDRAS, MudraCategory } from "@/lib/mudras";
import MudraCard from "./components/MudraCard";

type Filter = "All Mudras" | MudraCategory;

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

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

const FILTERS: Filter[] = ["All Mudras", "Asamyuta", "Samyuta"];

export default function MudrasPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All Mudras");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = MUDRAS;

    if (activeFilter !== "All Mudras") {
      result = result.filter((m) => m.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.symbolism.some((s) => s.toLowerCase().includes(q)) ||
          m.category.toLowerCase().includes(q) ||
          m.region.toLowerCase().includes(q),
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-maroon">
      {/* Nav back link */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ivory/50 hover:text-ivory text-sm font-semibold transition-colors"
        >
          <BackIcon />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-gold mb-4 font-display">
          The Library of Gestures
        </h1>
        {/* Gold underline */}
        <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
        <p className="text-ivory/70 max-w-xl mx-auto text-base leading-relaxed font-light">
          A comprehensive archival journey through the sacred language of hand
          gestures (Mudras) used in Indian classical dance, meditation, and
          spiritual practice.
        </p>
      </div>

      {/* Filter + Search bar */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                  activeFilter === f
                    ? "bg-saffron text-darkbrown border-saffron"
                    : "bg-transparent text-ivory border-ivory/30 hover:border-ivory/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex items-center">
            <span className="absolute left-4 text-ivory/40">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search heritage database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-5 py-2.5 rounded-full bg-transparent border border-ivory/30 text-ivory text-sm placeholder-ivory/30 focus:outline-none focus:border-gold w-72 transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-ivory/10 mt-6" />
      </div>

      {/* Card grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-ivory/30 text-xl font-light">
              No mudras found for &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <>
            <p className="text-ivory/30 text-xs uppercase tracking-widest font-semibold mb-6">
              {filtered.length} gesture{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((mudra) => (
                <MudraCard key={mudra.id} mudra={mudra} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

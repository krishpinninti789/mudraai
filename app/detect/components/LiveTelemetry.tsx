"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { MUDRAS } from "@/lib/mudras";

export interface SessionEntry {
  mudra: string;
  time: string;
}

interface LiveTelemetryProps {
  prediction: string;
  confidence: number;
  latency: number;
  sessionHistory: SessionEntry[];
  landmarks: { x: number; y: number; z: number }[] | null;
}

const BoltIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-5 h-5"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const BarChartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LiveTelemetry: React.FC<LiveTelemetryProps> = ({
  prediction,
  confidence,
  latency,
  sessionHistory,
  landmarks,
}) => {
  const router = useRouter();
  // Score is 0-1 mapped to 0-3 range (Static / Dynamic / Divine)
  const bhavaScore = confidence;
  const bhavaPercent = Math.min(bhavaScore * 100, 100);
  const matchedMudra = MUDRAS.find(
    (mudra) => mudra.name.toLowerCase() === prediction.toLowerCase(),
  );

  // Coordinate mesh: show first 6 landmark pairs (x,y)
  const meshCells = landmarks
    ? landmarks.slice(0, 6).map((lm) => ({
        x: lm.x.toFixed(2),
        y: lm.y.toFixed(2),
      }))
    : Array(6).fill({ x: "—", y: "—" });

  const getMudraHref = (name: string) => {
    const target = MUDRAS.find(
      (mudra) => mudra.name.toLowerCase() === name.toLowerCase(),
    );
    return target ? `/mudras/${target.id}` : "/mudras";
  };

  const handleNavigate = () => {
    router.push(getMudraHref(prediction));
  };

  return (
    <div className="flex flex-col min-h-0 bg-ivory text-darkbrown px-6 py-5 gap-5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-darkbrown/50">
          Live Telemetry
        </p>
        <span className="text-gold">
          <BarChartIcon />
        </span>
      </div>

      {/* Current Mudra */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-1">
          Current Mudra
        </p>
        <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-darkbrown">
          {prediction || "—"}
        </h2>
        {prediction && (
          <span className="mt-2 inline-block bg-darkbrown text-ivory text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
            Match Confirmed {(confidence * 100).toFixed(1)}%
          </span>
        )}
        {prediction && (
          <div className="mt-4">
            <button
              onClick={handleNavigate}
              className="inline-flex items-center justify-center rounded-full border border-darkbrown/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-darkbrown transition-colors hover:border-darkbrown hover:bg-darkbrown hover:text-ivory"
              aria-label={`Learn more about ${prediction}`}
            >
              Learn more
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-darkbrown/10" />

      {/* Frame Latency */}
      <div className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-darkbrown/10">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-1">
            Frame Latency
          </p>
          <p className="text-3xl font-black text-darkbrown leading-none">
            {latency.toFixed(1)}
            <span className="text-base font-normal text-darkbrown/50 ml-1">
              ms
            </span>
          </p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center text-gold">
          <BoltIcon />
        </div>
      </div>

      {/* Bhavas Score */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40">
            Bhavas Score
          </p>
          <span className="text-[9px] font-bold uppercase tracking-widest text-darkbrown/40 underline underline-offset-2">
            {bhavaPercent >= 80
              ? "Excellent Range"
              : bhavaPercent >= 50
                ? "Good Range"
                : "Learning Range"}
          </span>
        </div>
        <p className="text-4xl font-black text-darkbrown leading-none mb-3">
          {bhavaScore.toFixed(2)}
        </p>
        {/* Progress bar */}
        <div className="relative h-2 bg-darkbrown/10 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-darkbrown rounded-full transition-all duration-500"
            style={{ width: `${bhavaPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {["Static", "Dynamic", "Divine"].map((label) => (
            <p
              key={label}
              className="text-[8px] uppercase tracking-widest text-darkbrown/30 font-semibold"
            >
              {label}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-darkbrown/10" />

      {/* Coordinate Mesh Data */}
      {/* <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-3">
          Coordinate Mesh Data
        </p>
        <div className="grid grid-cols-3 gap-2">
          {meshCells.map((cell, i) => (
            <div
              key={i}
              className="bg-darkbrown/5 border border-darkbrown/10 rounded-lg px-3 py-2 text-center"
            >
              <p className="text-[8px] text-darkbrown/30 uppercase tracking-wider mb-0.5">
                #{i + 1}
              </p>
              <p className="text-[10px] font-mono font-bold text-darkbrown">
                {cell.x}
              </p>
              <p className="text-[10px] font-mono text-darkbrown/50">
                {cell.y}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="w-full h-px bg-darkbrown/10" />

      {/* Session History */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40">
            Session History
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {sessionHistory.length === 0 && (
            <p className="text-[10px] text-darkbrown/30 italic">
              No detections yet…
            </p>
          )}
          {sessionHistory.map((entry, i) => (
            <button
              key={i}
              type="button"
              onClick={() => router.push(getMudraHref(entry.mudra))}
              className="flex items-center justify-between border-b border-darkbrown/10 pb-2 text-left transition-colors hover:text-darkbrown"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-darkbrown">
                {entry.mudra}
              </p>
              <p className="text-[10px] font-mono text-darkbrown/40">
                {entry.time}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTelemetry;

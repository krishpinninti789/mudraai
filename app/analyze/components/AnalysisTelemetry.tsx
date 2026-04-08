"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { MUDRAS } from "@/lib/mudras";

export type AnalysisStatus =
  | "idle"
  | "loading"
  | "analyzing"
  | "done"
  | "error";

export interface ScoreEntry {
  name: string;
  score: number;
}

interface AnalysisTelemetryProps {
  status: AnalysisStatus;
  progress: number; // 0-100
  prediction: string;
  confidence: number;
  inferenceMs: number;
  allScores: ScoreEntry[];
  recentPredictions?: ScoreEntry[];
  landmarks: { x: number; y: number; z: number }[] | null;
  errorMsg?: string;
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

const ScanIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <polyline points="23 6 23 1 18 1" />
    <line x1="23" y1="1" x2="15" y2="9" />
    <polyline points="1 18 1 23 6 23" />
    <line x1="1" y1="23" x2="9" y2="15" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Step labels shown below the progress bar
const STEPS = [
  "Loading Models",
  "Detecting Hand",
  "Running Inference",
  "Complete",
];

const statusToStep: Record<AnalysisStatus, number> = {
  idle: -1,
  loading: 0,
  analyzing: 2,
  done: 3,
  error: -1,
};

const AnalysisTelemetry: React.FC<AnalysisTelemetryProps> = ({
  status,
  progress,
  prediction,
  confidence,
  inferenceMs,
  allScores,
  recentPredictions,
  landmarks,
  errorMsg,
}) => {
  const bhavaPercent = Math.min(confidence * 100, 100);
  const router = useRouter();
  const currentStep = statusToStep[status];
  const matchedMudra = MUDRAS.find(
    (mudra) => mudra.name.toLowerCase() === prediction.toLowerCase(),
  );

  const meshCells = landmarks
    ? landmarks
        .slice(0, 6)
        .map((lm) => ({ x: lm.x.toFixed(2), y: lm.y.toFixed(2) }))
    : Array(6).fill({ x: "—", y: "—" });

  const top3 = recentPredictions?.length
    ? recentPredictions.slice(0, 3)
    : [...allScores].sort((a, b) => b.score - a.score).slice(0, 3);

  const handleNavigate = () => {
    const learnMoreHref = matchedMudra
      ? `/mudras/${matchedMudra.id}`
      : "/mudras";
    router.push(learnMoreHref);
  };

  return (
    <div className="flex flex-col min-h-0 bg-ivory text-darkbrown px-6 py-5 gap-5 overflow-y-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-darkbrown/50">
          Analysis Results
        </p>
        <span
          className={`${status === "done" ? "text-gold" : "text-darkbrown/20"}`}
        >
          {status === "done" ? <CheckCircleIcon /> : <ScanIcon />}
        </span>
      </div>

      {/* ── IDLE state ── */}
      {status === "idle" && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-darkbrown/10 flex items-center justify-center text-3xl">
            🖐
          </div>
          <p className="text-darkbrown/40 text-sm font-light leading-relaxed max-w-xs">
            Upload an image of a hand gesture to begin analysis.
          </p>
        </div>
      )}

      {/* ── LOADING / ANALYZING state ── */}
      {(status === "loading" || status === "analyzing") && (
        <div className="flex flex-col gap-5">
          {/* Big animated label */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-1">
              Status
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight leading-none text-darkbrown animate-pulse">
              {status === "loading" ? "Loading…" : "Analysing…"}
            </h2>
          </div>

          {/* Progress bar */}
          <div className="relative h-2.5 bg-darkbrown/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-darkbrown rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-[9px] font-mono font-bold text-darkbrown/40 -mt-4">
            {Math.round(progress)}%
          </div>

          {/* Step indicators */}
          <div className="flex items-start gap-1.5">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div
                  className={`w-full h-1 rounded-full mb-1.5 transition-colors duration-500 ${
                    i <= currentStep ? "bg-darkbrown" : "bg-darkbrown/15"
                  }`}
                />
                <p
                  className={`text-[7px] uppercase tracking-wider font-bold text-center ${
                    i === currentStep
                      ? "text-darkbrown"
                      : i < currentStep
                        ? "text-darkbrown/50"
                        : "text-darkbrown/20"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ERROR state ── */}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-4">
          <p className="text-red-700 text-xs font-bold uppercase tracking-wide mb-1">
            Detection Failed
          </p>
          <p className="text-red-600 text-sm font-light">
            {errorMsg || "No hand detected in the image. Try a clearer photo."}
          </p>
        </div>
      )}

      {/* ── DONE state ── */}
      {status === "done" && (
        <>
          {/* Mudra name */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-1">
              Detected Mudra
            </p>
            <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-darkbrown">
              {prediction}
            </h2>
            <span className="mt-2 inline-block bg-darkbrown text-ivory text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Match Confirmed {(confidence * 100).toFixed(1)}%
            </span>
            <div className="mt-4">
              <button
                onClick={handleNavigate}
                className="inline-flex items-center justify-center rounded-full border border-darkbrown/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-darkbrown transition-colors hover:border-darkbrown hover:bg-darkbrown hover:text-ivory"
                aria-label={`Learn more about ${prediction}`}
              >
                Learn more
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-darkbrown/10" />

          {/* Inference time
          <div className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-darkbrown/10">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-1">
                Inference Time
              </p>
              <p className="text-3xl font-black text-darkbrown leading-none">
                {inferenceMs.toFixed(1)}
                <span className="text-base font-normal text-darkbrown/50 ml-1">
                  ms
                </span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center text-gold">
              <BoltIcon />
            </div>
          </div> */}

          {/* Bhavas score */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40">
                Confidence Score
              </p>
              <span className="text-[9px] font-bold uppercase tracking-widest text-darkbrown/40 underline underline-offset-2">
                {bhavaPercent >= 80
                  ? "Excellent"
                  : bhavaPercent >= 50
                    ? "Good"
                    : "Low"}
              </span>
            </div>
            <p className="text-4xl font-black text-darkbrown leading-none mb-3">
              {confidence.toFixed(2)}
            </p>
            <div className="relative h-2 bg-darkbrown/10 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-darkbrown rounded-full transition-all duration-700"
                style={{ width: `${bhavaPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              {["Static", "Dynamic", "Divine"].map((l) => (
                <p
                  key={l}
                  className="text-[8px] uppercase tracking-widest text-darkbrown/30 font-semibold"
                >
                  {l}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-darkbrown/10" />

          {/* Top-3 scores breakdown */}
          {top3.length > 0 && (
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-darkbrown/40 mb-3">
                {recentPredictions?.length
                  ? "Recent Predictions"
                  : "Top Predictions"}
              </p>
              <div className="flex flex-col gap-2.5">
                {top3.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <p
                        className={`text-xs font-bold uppercase tracking-wide ${i === 0 ? "text-darkbrown" : "text-darkbrown/50"}`}
                      >
                        {s.name}
                      </p>
                      <p className="text-[10px] font-mono text-darkbrown/40">
                        {(s.score * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="relative h-1 bg-darkbrown/10 rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${i === 0 ? "bg-darkbrown" : "bg-darkbrown/30"}`}
                        style={{ width: `${s.score * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* <div className="w-full h-px bg-darkbrown/10" /> */}
        </>
      )}
    </div>
  );
};

export default AnalysisTelemetry;

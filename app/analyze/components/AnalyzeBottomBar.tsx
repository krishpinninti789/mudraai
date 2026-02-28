"use client";

import React from "react";
import { AnalysisStatus } from "./AnalysisTelemetry";

interface AnalyzeBottomBarProps {
  fileName: string | null;
  fileSize: string | null;
  showMesh: boolean;
  onToggleMesh: () => void;
  status: AnalysisStatus;
  onClear: () => void;
  onReanalyze: () => void;
  onDownload: () => void;
}

const ImageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const AnalyzeBottomBar: React.FC<AnalyzeBottomBarProps> = ({
  fileName,
  fileSize,
  showMesh,
  onToggleMesh,
  status,
  onClear,
  onReanalyze,
  onDownload,
}) => {
  const isAnalyzing = status === "loading" || status === "analyzing";
  const hasDone = status === "done" || status === "error";

  return (
    <div className="bg-darkbrown shrink-0 px-3 md:px-6 border-t border-ivory/10">
      <div className="flex items-center gap-3 md:gap-8 h-auto md:h-16 py-2 md:py-0 flex-wrap md:flex-nowrap">
        {/* File info — hidden on smallest screens */}
        <div className="flex-col gap-0.5 min-w-0 hidden sm:flex">
          <p className="text-[8px] uppercase tracking-widest text-ivory/30 font-semibold">
            Source Image
          </p>
          <div className="flex items-center gap-2 bg-ivory/10 border border-ivory/20 rounded-lg px-3 md:px-4 py-2 text-ivory text-xs font-bold">
            <ImageIcon />
            <span className="truncate max-w-28 md:max-w-40">
              {fileName ?? "No file selected"}
            </span>
            {fileSize && (
              <span className="text-ivory/30 font-normal shrink-0 hidden md:inline">
                {fileSize}
              </span>
            )}
          </div>
        </div>

        {/* Overlay toggle */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[8px] uppercase tracking-widest text-ivory/30 font-semibold hidden sm:block">
            Overlays
          </p>
          <button
            onClick={onToggleMesh}
            className="flex items-center gap-2 bg-ivory/10 border border-ivory/20 rounded-lg px-3 md:px-4 py-2 text-ivory text-xs font-bold hover:bg-ivory/15 transition-colors"
          >
            <span
              className={`w-3 h-3 rounded-full transition-colors ${showMesh ? "bg-saffron" : "bg-ivory/30"}`}
            />
            <span className="hidden sm:inline">Skeleton Mesh</span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {hasDone && (
            <button
              onClick={onReanalyze}
              className="flex items-center gap-1.5 md:gap-2 bg-ivory/10 border border-ivory/20 rounded-xl px-3 md:px-5 py-2 md:py-2.5 text-ivory text-xs font-bold uppercase tracking-wider hover:bg-ivory/20 transition-colors"
            >
              <RefreshIcon />
              <span className="hidden sm:inline">Re-analyse</span>
            </button>
          )}

          {status !== "idle" && (
            <button
              onClick={onClear}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 md:gap-2 bg-ivory/10 border border-ivory/20 rounded-xl px-3 md:px-5 py-2 md:py-2.5 text-ivory text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <TrashIcon />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          {status === "done" && (
            <button
              onClick={onDownload}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-ivory/20 rounded-xl text-ivory hover:border-gold hover:text-gold transition-colors"
              title="Download annotated result"
            >
              <DownloadIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeBottomBar;

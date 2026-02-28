"use client";

import React from "react";

interface BottomBarProps {
  showMesh: boolean;
  onToggleMesh: () => void;
  isRecording: boolean;
  onToggleRecord: () => void;
}

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const ShareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const SaveIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    className="w-3 h-3"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const BottomBar: React.FC<BottomBarProps> = ({
  showMesh,
  onToggleMesh,
  isRecording,
  onToggleRecord,
}) => {
  return (
    <div className="bg-darkbrown shrink-0 px-3 md:px-6 border-t border-ivory/10">
      {/* ── Single row on desktop, two rows on mobile ── */}
      <div className="flex items-center gap-3 md:gap-8 h-auto md:h-16 py-2 md:py-0 flex-wrap md:flex-nowrap">
        {/* Camera Config — hide label on mobile, keep button */}
        <div className="flex-col gap-0.5 min-w-0 hidden sm:flex">
          <p className="text-[8px] uppercase tracking-widest text-ivory/30 font-semibold">
            Camera Configuration
          </p>
          <button className="flex items-center gap-2 bg-ivory/10 border border-ivory/20 rounded-lg px-4 py-2 text-ivory text-xs font-bold hover:bg-ivory/15 transition-colors">
            <CameraIcon />
            <span className="hidden md:inline">Logitech Brio 4K</span>
            <span className="ml-1 text-ivory/40 flex flex-col gap-0.5">
              <ChevronIcon />
              <span style={{ transform: "rotate(180deg)", display: "block" }}>
                <ChevronIcon />
              </span>
            </span>
          </button>
        </div>

        {/* Camera icon only on mobile */}
        <button className="sm:hidden w-9 h-9 flex items-center justify-center bg-ivory/10 border border-ivory/20 rounded-lg text-ivory">
          <CameraIcon />
        </button>

        {/* Overlays toggle */}
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
            <span className="hidden sm:inline">Mesh</span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Record Session */}
        <button
          onClick={onToggleRecord}
          className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
            isRecording
              ? "bg-red-500 text-white animate-pulse"
              : "bg-ivory text-darkbrown hover:bg-ivory/90"
          }`}
        >
          <span
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${isRecording ? "bg-white" : "bg-saffron"}`}
          />
          <span className="hidden sm:inline">
            {isRecording ? "Stop Recording" : "Record Session"}
          </span>
          <span className="sm:hidden">{isRecording ? "Stop" : "Record"}</span>
        </button>

        {/* Save / Share icons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-ivory/20 rounded-xl text-ivory hover:border-gold hover:text-gold transition-colors">
            <SaveIcon />
          </button>
          <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-ivory/20 rounded-xl text-ivory hover:border-gold hover:text-gold transition-colors">
            <ShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;

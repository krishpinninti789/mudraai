"use client";

import { CloudUpload, Video } from "lucide-react";
import { useRouter } from "next/navigation";

export function DetectionInterface() {
  const router = useRouter();
  return (
    <div className="lg:col-span-8 flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-saffron flex items-center gap-3">
          <span className="w-12 h-px bg-gold"></span>
          Live Detection Environment
        </h2>
        <div className="flex items-center space-x-2 px-4 py-1.5 bg-ivory rounded-full border border-gold shadow-sm">
          <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse"></span>
          <span className="text-[11px] text-darkbrown font-bold uppercase">
            System Active
          </span>
        </div>
      </div>

      {/* Video Feed Placeholder */}
      <div className="relative aspect-video bg-darkbrown rounded-2xl overflow-hidden border-4 border-gold shadow-2xl group">
        <img
          alt="Classical Dancer"
          className="w-full h-full object-cover opacity-60"
          src={"/mudrahand.png"}
        />
        {/* Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-0.5 bg-saffron/50 shadow-[0_0_15px_rgba(255,153,51,0.8)] animate-scan"></div>
          {/* Simulated Mesh Points */}
          <svg
            className="absolute inset-0 w-full h-full text-saffron/40"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="1" fill="currentColor" />
            <circle cx="45" cy="45" r="0.5" fill="currentColor" />
            <circle cx="55" cy="42" r="0.5" fill="currentColor" />
            <line
              x1="50"
              y1="50"
              x2="45"
              y2="45"
              stroke="currentColor"
              strokeWidth="0.1"
            />
            <line
              x1="50"
              y1="50"
              x2="55"
              y2="42"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          </svg>
        </div>

        <div className="absolute bottom-6 left-6">
          <div className="px-5 py-2.5 glass-panel rounded-full border border-gold text-xs font-bold uppercase tracking-widest flex items-center space-x-2 shadow-lg text-darkbrown">
            <Video className="w-4 h-4 text-saffron" />
            <span>Webcam Feed Active</span>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gold/40 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-gold/5 transition-all cursor-pointer group bg-maroon/20"
        onClick={() => router.push("/analyze")}
      >
        <CloudUpload className="w-12 h-12 text-gold group-hover:text-saffron mb-4 transition-colors" />
        <h3 className="text-sm font-bold uppercase tracking-widest mb-2 text-ivory">
          Analyze Image/Video
        </h3>
        <p className="text-xs text-gold/60 uppercase">
          Drag and drop or click to upload static mudra media
        </p>
      </div>
    </div>
  );
}

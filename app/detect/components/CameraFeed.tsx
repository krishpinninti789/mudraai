"use client";

import React, { RefObject } from "react";

interface CameraFeedProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  latency: number;
  fps: number;
  showMesh: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({
  videoRef,
  canvasRef,
  latency,
  fps,
  showMesh,
}) => {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gold bg-black">
      {/* Video feed */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
      />

      {/* Skeleton mesh canvas overlay */}
      {showMesh && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}

      {/* Top-left badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-black/70 border border-ivory/30 text-ivory text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
          {fps} FPS
        </span>
        <span className="bg-black/70 border border-saffron/50 text-saffron text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
          Latency: {latency}ms
        </span>
      </div>

      {/* Bottom-left active input label */}
      <div className="absolute bottom-4 left-4 bg-black/70 border border-ivory/20 rounded-md px-4 py-2">
        <p className="text-ivory/50 text-[9px] uppercase tracking-widest font-semibold mb-0.5">
          Active Input
        </p>
        <p className="text-ivory text-sm font-bold tracking-wider uppercase">
          Stage_Center_Primary
        </p>
      </div>
    </div>
  );
};

export default CameraFeed;

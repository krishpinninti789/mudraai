"use client";

import React, { RefObject, useRef } from "react";

interface ImagePanelProps {
  imageUrl: string | null;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  showMesh: boolean;
  isAnalyzing: boolean;
  onFileSelected: (file: File) => void;
  fileName: string | null;
}

const UploadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-12 h-12 text-ivory/30"
  >
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const ScanLineOverlay = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="animate-scan absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-saffron/70 to-transparent" />
  </div>
);

const ImagePanel: React.FC<ImagePanelProps> = ({
  imageUrl,
  canvasRef,
  showMesh,
  isAnalyzing,
  onFileSelected,
  fileName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) onFileSelected(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gold bg-black">
      {!imageUrl ? (
        /* ── Upload dropzone ── */
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-6 cursor-pointer group"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
        >
          {/* Dot-grid background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #c9a84c 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Gold corner accents */}
          <span className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-md" />
          <span className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-md" />
          <span className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-md" />
          <span className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-md" />

          <div className="relative flex flex-col items-center gap-4 z-10 group-hover:opacity-80 transition-opacity">
            <UploadIcon />
            <div className="text-center">
              <p className="text-ivory/70 text-sm font-semibold">
                Drop an image here
              </p>
              <p className="text-ivory/30 text-xs mt-1">
                or click to browse files
              </p>
            </div>
            <div className="border border-gold/40 text-gold text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full hover:bg-gold/10 transition-colors">
              Select Image
            </div>
            <p className="text-ivory/20 text-[9px] uppercase tracking-widest">
              Supported: JPG · PNG · WEBP
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      ) : (
        /* ── Image + overlay ── */
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Uploaded mudra"
            className="w-full h-full object-contain"
          />

          {/* Skeleton canvas */}
          {showMesh && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          )}

          {/* Scan line animation while analyzing */}
          {isAnalyzing && <ScanLineOverlay />}

          {/* Corner vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)]" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-black/70 border border-ivory/30 text-ivory text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
              Image Analysis
            </span>
            {isAnalyzing && (
              <span className="bg-saffron/20 border border-saffron/60 text-saffron text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md animate-pulse">
                Processing…
              </span>
            )}
          </div>

          {/* Bottom file label */}
          {fileName && (
            <div className="absolute bottom-4 left-4 bg-black/70 border border-ivory/20 rounded-md px-4 py-2">
              <p className="text-ivory/50 text-[9px] uppercase tracking-widest font-semibold mb-0.5">
                Source File
              </p>
              <p className="text-ivory text-sm font-bold tracking-wider truncate max-w-60">
                {fileName}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImagePanel;

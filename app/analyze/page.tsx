"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import ImagePanel from "./components/ImagePanel";
import AnalysisTelemetry, {
  AnalysisStatus,
  ScoreEntry,
} from "./components/AnalysisTelemetry";
import AnalyzeBottomBar from "./components/AnalyzeBottomBar";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const CLASS_NAMES = [
  "Alapadmam",
  "Chandrakala",
  "Chathurah",
  "Hamsaasya",
  "Kapitham",
  "Kartharimukam",
  "Mrugasheesha",
  "Shikaram",
  "Soochi",
  "Thamaraichooda",
];

export default function AnalyzePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageElRef = useRef<HTMLImageElement | null>(null);
  const fileBlobRef = useRef<Blob | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [showMesh, setShowMesh] = useState(true);

  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [inferenceMs, setInferenceMs] = useState(0);
  const [allScores, setAllScores] = useState<ScoreEntry[]>([]);
  const [recentPredictions, setRecentPredictions] = useState<ScoreEntry[]>([]);
  const [landmarks, setLandmarks] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ─────────────────────────────────────────────────────────────
  // Send image blob to backend API (same as detect page)
  // ─────────────────────────────────────────────────────────────

  const sendImageToBackend = useCallback(async (blob: Blob) => {
    setStatus("analyzing");
    setProgress(50);
    setErrorMsg("");

    const fd = new FormData();
    fd.append("file", blob, "image.jpg");

    const t0 = performance.now();

    try {
      const resp = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: fd,
      });

      const latencyMs = performance.now() - t0;
      setInferenceMs(latencyMs);

      let data: any = null;
      try {
        data = await resp.json();
      } catch {
        const text = await resp.text();
        data = { text };
      }

      const detectedMudra: string = data.predicted_class || "";
      const conf: number =
        typeof data.confidence === "number" ? data.confidence : 0;

      // If backend returns all_scores array [{ name, score }] use it,
      // otherwise build a synthetic scores list with just the top class
      const scores: ScoreEntry[] =
        Array.isArray(data.all_scores) && data.all_scores.length > 0
          ? data.all_scores
          : CLASS_NAMES.map((name) => ({
              name,
              score: name === detectedMudra ? conf : 0,
            }));

      // If backend returns landmarks array use it
      const lms =
        Array.isArray(data.landmarks) && data.landmarks.length > 0
          ? data.landmarks
          : null;

      setPrediction(detectedMudra);
      setConfidence(conf);
      setAllScores(scores);
      if (detectedMudra) {
        setRecentPredictions((prev) => {
          const next = [
            { name: detectedMudra, score: conf },
            ...prev.filter((entry) => entry.name !== detectedMudra),
          ];
          return next.slice(0, 3);
        });
      }
      setLandmarks(lms);
      setProgress(100);
      setStatus(detectedMudra ? "done" : "error");

      if (!detectedMudra) {
        setErrorMsg("No mudra detected. Try a clearer hand image.");
      }
    } catch (err) {
      console.error(err);
      setInferenceMs(performance.now() - t0);
      setStatus("error");
      setErrorMsg("Could not reach the backend. Is it running on port 8000?");
      setProgress(100);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Main Analysis — convert image file to blob then send
  // ─────────────────────────────────────────────────────────────

  const runAnalysis = useCallback(
    async (img: HTMLImageElement, blob: Blob) => {
      setStatus("loading");
      setProgress(20);

      // Convert the original file blob to jpeg if needed,
      // or just send the blob directly (backend handles it)
      await sendImageToBackend(blob);
    },
    [sendImageToBackend],
  );

  // ─────────────────────────────────────────────────────────────
  // File Handling
  // ─────────────────────────────────────────────────────────────

  const handleFileSelected = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileName(file.name);
      setFileSize(formatBytes(file.size));

      // Reset previous results
      setPrediction("");
      setConfidence(0);
      setInferenceMs(0);
      setAllScores([]);
      setRecentPredictions([]);
      setLandmarks(null);
      setErrorMsg("");

      // Keep blob ref for re-analysis
      fileBlobRef.current = file;

      const img = new Image();
      img.onload = () => {
        imageElRef.current = img;
        runAnalysis(img, file);
      };
      img.src = url;
    },
    [runAnalysis],
  );

  const handleClear = useCallback(() => {
    setImageUrl(null);
    setFileName(null);
    setFileSize(null);
    setStatus("idle");
    setPrediction("");
    setConfidence(0);
    setInferenceMs(0);
    setAllScores([]);
    setRecentPredictions([]);
    setLandmarks(null);
    setErrorMsg("");
    fileBlobRef.current = null;
    imageElRef.current = null;
  }, []);

  const handleReanalyze = useCallback(() => {
    if (imageElRef.current && fileBlobRef.current) {
      runAnalysis(imageElRef.current, fileBlobRef.current);
    }
  }, [runAnalysis]);

  const handleToggleMesh = useCallback(() => {
    setShowMesh((v) => !v);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // UI (unchanged)
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-darkbrown overflow-hidden">
      {/* ── Page header strip ── */}
      <div className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3 border-b border-ivory/10">
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/"
            className="text-ivory/40 hover:text-ivory text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            ← Home
          </Link>
          <span className="text-ivory/20">|</span>
          <Link
            href="/detect"
            className="text-ivory/40 hover:text-ivory text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            Live Detect
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-saffron" />
          <p className="text-ivory/50 text-[10px] font-bold uppercase tracking-widest hidden sm:block">
            Image Analysis Mode
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="flex-1 p-3 md:p-4 min-h-0">
          <div className="h-56 sm:h-72 md:h-full">
            <ImagePanel
              imageUrl={imageUrl}
              canvasRef={canvasRef}
              showMesh={showMesh}
              isAnalyzing={status === "loading" || status === "analyzing"}
              onFileSelected={handleFileSelected}
              fileName={fileName}
            />
          </div>
        </div>

        <div className="md:w-80 xl:w-96 md:border-l border-t md:border-t-0 border-ivory/10 overflow-y-auto max-h-64 md:max-h-none">
          <AnalysisTelemetry
            status={status}
            progress={progress}
            prediction={prediction}
            confidence={confidence}
            inferenceMs={inferenceMs}
            allScores={allScores}
            recentPredictions={recentPredictions}
            landmarks={landmarks}
            errorMsg={errorMsg}
          />
        </div>
      </div>

      <AnalyzeBottomBar
        fileName={fileName}
        fileSize={fileSize}
        showMesh={showMesh}
        onToggleMesh={handleToggleMesh}
        status={status}
        onClear={handleClear}
        onReanalyze={handleReanalyze}
        onDownload={() => {}}
      />
    </div>
  );
}

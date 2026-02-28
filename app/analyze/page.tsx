"use client";

import { useRef, useState, useCallback } from "react";
import * as ort from "onnxruntime-web";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import Link from "next/link";
import ImagePanel from "./components/ImagePanel";
import AnalysisTelemetry, {
  AnalysisStatus,
  ScoreEntry,
} from "./components/AnalysisTelemetry";
import AnalyzeBottomBar from "./components/AnalyzeBottomBar";

const HAND_CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [5, 9],
  [9, 13],
  [13, 17],
];

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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AnalyzePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageElRef = useRef<HTMLImageElement | null>(null);

  const sessionRef = useRef<ort.InferenceSession | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);

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
  const [landmarks, setLandmarks] = useState<
    { x: number; y: number; z: number }[] | null
  >(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ─────────────────────────────────────────────────────────────
  // CNN Preprocessing
  // ─────────────────────────────────────────────────────────────

  const preprocessImage = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, 224, 224);
    const { data } = imageData;

    const floatData = new Float32Array(1 * 3 * 224 * 224);
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];

    for (let i = 0; i < 224 * 224; i++) {
      const r = data[i * 4] / 255;
      const g = data[i * 4 + 1] / 255;
      const b = data[i * 4 + 2] / 255;

      floatData[i] = (r - mean[0]) / std[0];
      floatData[i + 224 * 224] = (g - mean[1]) / std[1];
      floatData[i + 2 * 224 * 224] = (b - mean[2]) / std[2];
    }

    return new ort.Tensor("float32", floatData, [1, 3, 224, 224]);
  };

  const cropHandFromImage = (
    imgEl: HTMLImageElement,
    lms: { x: number; y: number; z: number }[],
  ) => {
    const w = imgEl.naturalWidth;
    const h = imgEl.naturalHeight;

    const xs = lms.map((lm) => lm.x * w);
    const ys = lms.map((lm) => lm.y * h);

    let xmin = Math.min(...xs);
    let xmax = Math.max(...xs);
    let ymin = Math.min(...ys);
    let ymax = Math.max(...ys);

    const padding = 40;

    xmin = Math.max(0, xmin - padding);
    ymin = Math.max(0, ymin - padding);
    xmax = Math.min(w, xmax + padding);
    ymax = Math.min(h, ymax + padding);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 224;
    tempCanvas.height = 224;

    const ctx = tempCanvas.getContext("2d")!;
    ctx.drawImage(imgEl, xmin, ymin, xmax - xmin, ymax - ymin, 0, 0, 224, 224);

    return tempCanvas;
  };

  // ─────────────────────────────────────────────────────────────
  // Draw Skeleton
  // ─────────────────────────────────────────────────────────────

  const drawSkeleton = useCallback(
    (lms: { x: number; y: number; z: number }[], imgEl: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = imgEl.naturalWidth;
      canvas.height = imgEl.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;

      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 2;

      for (const [a, b] of HAND_CONNECTIONS) {
        ctx.beginPath();
        ctx.moveTo(lms[a].x * W, lms[a].y * H);
        ctx.lineTo(lms[b].x * W, lms[b].y * H);
        ctx.stroke();
      }

      for (const lm of lms) {
        ctx.beginPath();
        ctx.arc(lm.x * W, lm.y * H, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#4ade80";
        ctx.fill();
      }
    },
    [],
  );

  // ─────────────────────────────────────────────────────────────
  // Main Analysis
  // ─────────────────────────────────────────────────────────────

  const runAnalysis = useCallback(
    async (imgEl: HTMLImageElement) => {
      try {
        setStatus("loading");
        setProgress(20);

        if (!sessionRef.current) {
          sessionRef.current = await ort.InferenceSession.create(
            "/models/mudra_strong-new.onnx",
          );
        }

        if (!landmarkerRef.current) {
          const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
          );
          landmarkerRef.current = await HandLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              },
              numHands: 1,
              runningMode: "IMAGE",
            },
          );
        }

        setStatus("analyzing");
        setProgress(50);

        const results = landmarkerRef.current.detect(imgEl);

        if (!results.landmarks || results.landmarks.length === 0) {
          setStatus("error");
          setErrorMsg("No hand detected in image.");
          setProgress(100);
          return;
        }

        const lm = results.landmarks[0];
        setLandmarks(lm);

        const cropped = cropHandFromImage(imgEl, lm);
        const tensor = preprocessImage(cropped);

        const inputName = sessionRef.current.inputNames[0];
        const outputName = sessionRef.current.outputNames[0];

        const t0 = performance.now();
        const output = await sessionRef.current.run({ [inputName]: tensor });
        const scores = output[outputName].data as Float32Array;
        const elapsed = performance.now() - t0;

        const maxScore = Math.max(...scores);
        const classIndex = scores.indexOf(maxScore);

        setPrediction(CLASS_NAMES[classIndex]);
        setConfidence(maxScore);
        setInferenceMs(elapsed);
        setAllScores(
          CLASS_NAMES.map((name, i) => ({ name, score: scores[i] })),
        );

        if (showMesh) drawSkeleton(lm, imgEl);

        setProgress(100);
        setStatus("done");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setErrorMsg("Analysis failed.");
        setProgress(100);
      }
    },
    [drawSkeleton, showMesh],
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

      const img = new Image();
      img.onload = () => {
        imageElRef.current = img;
        runAnalysis(img);
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
    setLandmarks(null);
  }, []);

  const handleReanalyze = useCallback(() => {
    if (imageElRef.current) runAnalysis(imageElRef.current);
  }, [runAnalysis]);

  const handleToggleMesh = useCallback(() => {
    setShowMesh((v) => !v);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // UI (UNCHANGED)
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

      {/* ── Main content — stacked on mobile, side-by-side on md+ ── */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Image panel */}
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

        {/* Telemetry panel */}
        <div className="md:w-80 xl:w-96 md:border-l border-t md:border-t-0 border-ivory/10 overflow-y-auto max-h-64 md:max-h-none">
          <AnalysisTelemetry
            status={status}
            progress={progress}
            prediction={prediction}
            confidence={confidence}
            inferenceMs={inferenceMs}
            allScores={allScores}
            landmarks={landmarks}
            errorMsg={errorMsg}
          />
        </div>
      </div>

      {/* ── Bottom bar ── */}
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

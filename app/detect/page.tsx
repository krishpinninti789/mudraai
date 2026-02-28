"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as ort from "onnxruntime-web";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import CameraFeed from "./components/CameraFeed";
import LiveTelemetry, { SessionEntry } from "./components/LiveTelemetry";
import BottomBar from "./components/BottomBar";

// ─── MediaPipe hand connections (unchanged UI) ──────────────────────────────
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

export default function DetectPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [latency, setLatency] = useState(0);
  const [fps, setFps] = useState(0);
  const [showMesh, setShowMesh] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<SessionEntry[]>([]);
  const [currentLandmarks, setCurrentLandmarks] = useState<
    { x: number; y: number; z: number }[] | null
  >(null);

  const sessionRef = useRef<ort.InferenceSession | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const lastPredictionRef = useRef("");
  const frameCountRef = useRef(0);
  const fpsTimerRef = useRef(0);

  // ─── Preprocess to [1,3,224,224] tensor ───────────────────────────────────
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

  // ─── Crop hand region from video ─────────────────────────────────────────
  const cropHand = (
    video: HTMLVideoElement,
    landmarks: { x: number; y: number; z: number }[],
  ) => {
    const w = video.videoWidth;
    const h = video.videoHeight;

    const xs = landmarks.map((lm) => lm.x * w);
    const ys = landmarks.map((lm) => lm.y * h);

    let xmin = Math.min(...xs);
    let xmax = Math.max(...xs);
    let ymin = Math.min(...ys);
    let ymax = Math.max(...ys);

    const padding = 40;

    xmin = Math.max(0, xmin - padding);
    ymin = Math.max(0, ymin - padding);
    xmax = Math.min(w, xmax + padding);
    ymax = Math.min(h, ymax + padding);

    const cropWidth = xmax - xmin;
    const cropHeight = ymax - ymin;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 224;
    tempCanvas.height = 224;

    const ctx = tempCanvas.getContext("2d")!;
    ctx.drawImage(video, xmin, ymin, cropWidth, cropHeight, 0, 0, 224, 224);

    return tempCanvas;
  };

  // ─── CNN Inference ────────────────────────────────────────────────────────
  const runInference = useCallback(
    async (landmarks: { x: number; y: number; z: number }[]) => {
      if (!sessionRef.current || !videoRef.current) return;

      const t0 = performance.now();

      const cropped = cropHand(videoRef.current, landmarks);
      const tensor = preprocessImage(cropped);

      const inputName = sessionRef.current.inputNames[0];
      const outputName = sessionRef.current.outputNames[0];

      const output = await sessionRef.current.run({ [inputName]: tensor });
      const scores = output[outputName].data as Float32Array;

      const maxScore = Math.max(...scores);
      const classIndex = scores.indexOf(maxScore);
      const detectedMudra = CLASS_NAMES[classIndex];

      setLatency(performance.now() - t0);
      setPrediction(detectedMudra);
      setConfidence(maxScore);
      setCurrentLandmarks(landmarks);

      if (detectedMudra !== lastPredictionRef.current) {
        lastPredictionRef.current = detectedMudra;
        const timeStr = new Date().toLocaleTimeString();
        setSessionHistory((prev) =>
          [{ mudra: detectedMudra, time: timeStr }, ...prev].slice(0, 10),
        );
      }
    },
    [],
  );

  // ─── Draw skeleton (unchanged) ───────────────────────────────────────────
  const drawSkeleton = useCallback(
    (landmarks: { x: number; y: number; z: number }[]) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;

      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 2;

      for (const [a, b] of HAND_CONNECTIONS) {
        ctx.beginPath();
        ctx.moveTo(landmarks[a].x * W, landmarks[a].y * H);
        ctx.lineTo(landmarks[b].x * W, landmarks[b].y * H);
        ctx.stroke();
      }

      for (const lm of landmarks) {
        ctx.beginPath();
        ctx.arc(lm.x * W, lm.y * H, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#4ade80";
        ctx.fill();
      }
    },
    [],
  );

  // ─── Init + Loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    let animationId: number;

    const detectLoop = () => {
      if (videoRef.current && landmarkerRef.current) {
        const results = landmarkerRef.current.detectForVideo(
          videoRef.current,
          performance.now(),
        );

        frameCountRef.current += 1;
        const now = performance.now();
        if (now - fpsTimerRef.current >= 1000) {
          setFps(frameCountRef.current);
          frameCountRef.current = 0;
          fpsTimerRef.current = now;
        }

        if (results.landmarks && results.landmarks.length > 0) {
          const lm = results.landmarks[0];
          runInference(lm);
          if (showMesh) drawSkeleton(lm);
        }
      }

      animationId = requestAnimationFrame(detectLoop);
    };

    const init = async () => {
      sessionRef.current = await ort.InferenceSession.create(
        "/models/mudra_strong-new.onnx",
      );

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        numHands: 1,
        runningMode: "VIDEO",
      });

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      fpsTimerRef.current = performance.now();
      animationId = requestAnimationFrame(detectLoop);
    };

    init();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-darkbrown overflow-hidden">
      {/* Main content — side-by-side on md+, stacked on mobile */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Camera feed — full width mobile, flex-1 on desktop */}
        <div className="flex-1 p-3 md:p-4 min-h-0">
          <div className="h-56 sm:h-72 md:h-full">
            <CameraFeed
              videoRef={videoRef}
              canvasRef={canvasRef}
              latency={Math.round(latency)}
              fps={fps}
              showMesh={showMesh}
            />
          </div>
        </div>

        {/* Telemetry — full width below on mobile, fixed sidebar on desktop */}
        <div className="md:w-80 xl:w-96 md:border-l border-t md:border-t-0 border-ivory/10 overflow-y-auto max-h-64 md:max-h-none">
          <LiveTelemetry
            prediction={prediction}
            confidence={confidence}
            latency={latency}
            sessionHistory={sessionHistory}
            landmarks={currentLandmarks}
          />
        </div>
      </div>

      <BottomBar
        showMesh={showMesh}
        onToggleMesh={() => setShowMesh((v) => !v)}
        isRecording={isRecording}
        onToggleRecord={() => setIsRecording((v) => !v)}
      />
    </div>
  );
}

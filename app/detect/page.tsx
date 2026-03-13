'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import CameraFeed from './components/CameraFeed';
import LiveTelemetry, { SessionEntry } from './components/LiveTelemetry';
import BottomBar from './components/BottomBar';

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
  'Alapadmam',
  'Chandrakala',
  'Chathurah',
  'Hamsaasya',
  'Kapitham',
  'Kartharimukam',
  'Mrugasheesha',
  'Shikaram',
  'Soochi',
  'Thamaraichooda',
];

export default function DetectPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [latency, setLatency] = useState(0);
  const [fps, setFps] = useState(0);
  const [showMesh, setShowMesh] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<SessionEntry[]>([]);
  const [currentLandmarks, setCurrentLandmarks] = useState<
    { x: number; y: number; z: number }[] | null
  >(null);

  const sendIntervalRef = useRef<number | null>(null);
  const lastPredictionRef = useRef('');
  const frameCountRef = useRef(0);
  const fpsTimerRef = useRef(0);

  // (preprocess removed — frames are sent to backend as images)

  // ─── Crop hand region from video ─────────────────────────────────────────
  // We'll send the current video frame as a multipart FormData to the backend.
  const sendFrameToBackend = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    // draw current frame to an offscreen canvas
    const temp = document.createElement('canvas');
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    temp.width = w;
    temp.height = h;
    const ctx = temp.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);

    const t0 = performance.now();

    // convert to blob (jpeg)
    const blob: Blob | null = await new Promise((resolve) =>
      temp.toBlob((b) => resolve(b), 'image/jpeg', 0.85),
    );
    if (!blob) return;

    const fd = new FormData();
    fd.append('file', blob, 'frame.jpg');

    try {
      const resp = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: fd,
      });

      const latencyMs = performance.now() - t0;
      setLatency(latencyMs);

      let data: any = null;
      try {
        data = await resp.json();
      } catch (e) {
        // non-json response fallback
        const text = await resp.text();
        data = { text };
      }

      // Map backend response: { predicted_class, confidence }
      const detectedMudra = data.predicted_class || '';
      const conf = typeof data.confidence === 'number' ? data.confidence : 0;

      setPrediction(detectedMudra);
      setConfidence(conf);

      if (detectedMudra && detectedMudra !== lastPredictionRef.current) {
        lastPredictionRef.current = detectedMudra;
        const timeStr = new Date().toLocaleTimeString();
        setSessionHistory((prev) =>
          [{ mudra: detectedMudra, time: timeStr }, ...prev].slice(0, 10),
        );
      }
    } catch (err) {
      // keep silent; optionally set a UI error state later
      // console.error("frame send error", err);
    }
  }, []);

  // ─── Draw skeleton (unchanged) ───────────────────────────────────────────
  const drawSkeleton = useCallback(() => {}, []);

  // ─── Init + Loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true;

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (!active) return;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        // fps tracking
        fpsTimerRef.current = performance.now();

        // send a frame every 500ms (adjust as needed)
        const sendInterval = window.setInterval(async () => {
          frameCountRef.current += 1;
          const now = performance.now();
          if (now - fpsTimerRef.current >= 1000) {
            setFps(frameCountRef.current);
            frameCountRef.current = 0;
            fpsTimerRef.current = now;
          }

          await sendFrameToBackend();
        }, 500);
        sendIntervalRef.current = sendInterval as unknown as number;
      } catch (err) {
        // ignore errors for now
      }
    };

    init();

    return () => {
      active = false;
      if (sendIntervalRef.current)
        window.clearInterval(sendIntervalRef.current);
      const stream = videoRef.current?.srcObject as MediaStream | undefined;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [sendFrameToBackend, showMesh]);

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

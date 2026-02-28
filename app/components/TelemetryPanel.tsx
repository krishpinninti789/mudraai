"use client";

import { useState, useEffect } from "react";
import { History } from "lucide-react";
import { motion } from "framer-motion";
import type { TelemetryData, Mudra } from "@/lib/types";

const HISTORY: Mudra[] = [
  {
    id: "1",
    name: "Pataka",
    sanskritName: "Flag",
    meaning: "Victory",
    confidence: 94,
    timestamp: "14:22",
    imageUrl: "",
  },
  {
    id: "2",
    name: "Mayura",
    sanskritName: "Peacock",
    meaning: "Grace",
    confidence: 89,
    timestamp: "14:21",
    imageUrl: "",
  },
  {
    id: "3",
    name: "Shikhara",
    sanskritName: "Peak",
    meaning: "Strength",
    confidence: 91,
    timestamp: "14:21",
    imageUrl: "",
  },
];

export function TelemetryPanel() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    latency: 12,
    bhavasScore: "A+",
    confidence: 98.4,
    activeMudra: "ALAPADMA",
    meaning: "Lotus in Bloom",
  });

  // Simulate telemetry fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        latency: Math.floor(Math.random() * 5) + 10,
        confidence: Number((98 + Math.random()).toFixed(1)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:col-span-4 flex flex-col space-y-8">
      {/* Telemetry Card */}
      <div className="ivory-card p-8 rounded-2xl border-b-8 border-gold shadow-2xl">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-saffron mb-10 pb-2 border-b border-gold/20">
          Real-Time Telemetry
        </h2>
        <div className="space-y-10">
          <div>
            <span className="text-[10px] text-darkbrown/60 uppercase tracking-widest block mb-1 font-bold">
              Detected Gesture
            </span>
            <div className="text-5xl font-bold tracking-tighter text-darkbrown font-display">
              {telemetry.activeMudra}
            </div>
            <div className="text-xs text-saffron font-bold uppercase mt-2 italic flex items-center gap-2">
              <span className="w-4 h-px bg-saffron"></span> "{telemetry.meaning}
              "
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-darkbrown">
              <span>Confidence</span>
              <span className="text-saffron">{telemetry.confidence}%</span>
            </div>
            <div className="w-full h-2.5 bg-darkbrown/10 rounded-full overflow-hidden border border-gold/20 p-0.5">
              <motion.div
                className="h-full bg-saffron rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${telemetry.confidence}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-maroon/5 rounded-xl border border-gold/20">
              <span className="text-[9px] text-darkbrown/50 uppercase font-bold block mb-1">
                Latency
              </span>
              <span className="text-2xl font-bold text-darkbrown">
                {telemetry.latency}
                <span className="text-sm text-saffron ml-1">ms</span>
              </span>
            </div>
            <div className="p-5 bg-maroon/5 rounded-xl border border-gold/20">
              <span className="text-[9px] text-darkbrown/50 uppercase font-bold block mb-1">
                Bhavas Score
              </span>
              <span className="text-2xl font-bold text-darkbrown">
                {telemetry.bhavasScore}
              </span>
            </div>
          </div>

          <div className="pt-8 border-t border-gold/20">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-darkbrown/40">
              Coordinate Mesh
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-saffron/10 rounded-md border border-gold/10"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* History Panel */}
      <div className="ivory-card p-8 rounded-2xl border border-gold shadow-xl">
        <div className="flex items-center space-x-3 text-saffron mb-6">
          <History className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-widest text-darkbrown">
            Session History
          </span>
        </div>
        <div className="space-y-4">
          {HISTORY.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs p-3 hover:bg-gold/10 rounded-lg transition-colors cursor-pointer border-l-4 border-saffron bg-white/50"
            >
              <span className="text-darkbrown/60 font-medium">
                {item.timestamp}
              </span>
              <span className="font-bold text-darkbrown uppercase">
                {item.name}
              </span>
              <span className="text-green-600 font-black">
                {item.confidence}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

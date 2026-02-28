"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 mandala-pattern"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-saffron/20 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block py-2 px-4 rounded-full bg-ivory/10 border border-gold/40 text-saffron text-xs font-bold uppercase tracking-[0.2em] mb-8">
            Ancient Tradition • Modern Vision
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.85] tracking-tighter text-saffron">
            PRESERVING{" "}
            <span className="text-ivory italic block md:inline">HERITAGE</span>{" "}
            THROUGH AI.
          </h1>
          <p className="text-xl text-ivory/80 mb-12 leading-relaxed max-w-2xl font-light">
            Bridging the gap between 2000-year-old Bharatanatyam traditions and
            cutting-edge Computer Vision. Decoding classical hand gestures in
            real-time.
          </p>
          <div className="flex flex-wrap gap-6">
            <button
              className="bg-saffron text-darkbrown px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest flex items-center space-x-3 border-2 border-gold hover:scale-105 transition-transform shadow-2xl"
              onClick={() => router.push("/detect")}
            >
              <span>Start Real-time Detection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-transparent border-2 border-gold text-gold hover:bg-gold/10 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all">
              Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

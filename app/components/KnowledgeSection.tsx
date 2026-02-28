"use client";

import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function KnowledgeSection() {
  return (
    <section className="mt-32">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block py-2 px-4 rounded-full bg-saffron/10 border border-gold/40 text-saffron text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            Knowledge Discovery
          </div>
          <h2 className="text-5xl font-bold mb-8 tracking-tight text-ivory font-display leading-tight">
            The <span className="text-saffron italic">Alapadma</span> Essence
          </h2>
          <p className="text-ivory/70 text-lg leading-relaxed mb-10">
            The Alapadma mudra represents a fully bloomed lotus. In
            Bharatanatyam, it signifies beauty, the full moon, or spiritual
            opening. Our model identifies the intricate radial geometry of the
            fingers as they bloom from the palm center.
          </p>
          <div className="grid grid-cols-2 gap-10">
            <div className="border-l-2 border-gold pl-6">
              <h4 className="text-xs font-black uppercase text-saffron tracking-widest mb-2">
                Sanskrit Root
              </h4>
              <p className="text-md font-bold text-ivory">
                Ala (Full) + Padma (Lotus)
              </p>
            </div>
            <div className="border-l-2 border-gold pl-6">
              <h4 className="text-xs font-black uppercase text-saffron tracking-widest mb-2">
                Significance
              </h4>
              <p className="text-md font-bold text-ivory">
                Divinity & Celebration
              </p>
            </div>
          </div>
        </motion.div>

        <div className="ivory-card p-10 rounded-3xl border-2 border-gold relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 opacity-[0.05] pointer-events-none">
            <BookOpen className="w-64 h-64 text-darkbrown" />
          </div>
          <div className="relative z-10">
            <div className="text-xs font-black uppercase tracking-[0.4em] text-saffron mb-8">
              Expert Insights
            </div>
            <p className="text-xl leading-relaxed text-darkbrown mb-10 italic font-display">
              {
                '"Artificial intelligence doesn\'t just recognize gestures; it archives the spiritual language of our ancestors, ensuring the precision of the 2000-year-old Natya Shastra survives the digital age."'
              }
            </p>
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold shadow-lg">
                <img
                  alt="Dr. Ananya Iyer"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                />
              </div>
              <div>
                <div className="text-sm font-black uppercase text-darkbrown">
                  Dr. Ananya Iyer
                </div>
                <div className="text-[11px] text-saffron font-bold uppercase tracking-widest">
                  Digital Heritage Archivist
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

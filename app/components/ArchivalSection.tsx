"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const ARCHIVAL_CAPTURES = [
  {
    name: "Tripataka",
    url: "/tripataka.png",
  },
  {
    name: "Kartarimukha",
    url: "/kartarimukha.png",
  },
  {
    name: "Ardhachandra",
    url: "/ardhachandra.png",
  },
  {
    name: "Shikhara",
    url: "/shikara.png",
  },
  {
    name: "Kapittha",
    url: "/kapita.webp",
  },
];

export function ArchivalSection() {
  return (
    <section className="mt-32">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-ivory font-display">
          Archival <span className="text-saffron">Captures</span>
        </h2>
        <a
          href="#"
          className="text-xs font-black uppercase tracking-widest text-saffron hover:text-gold flex items-center gap-2 transition-colors"
        >
          Explore Library <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {ARCHIVAL_CAPTURES.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-gold shadow-lg hover:border-saffron transition-all"
          >
            <img
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={item.url}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 to-transparent opacity-80"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-[11px] font-black uppercase tracking-widest text-ivory">
                {item.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

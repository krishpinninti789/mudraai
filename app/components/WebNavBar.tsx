"use client";

import { useState } from "react";
import { Eye, Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 border-b border-gold/30 bg-ivory/95 text-darkbrown">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-saffron rounded-full flex items-center justify-center border-2 border-gold shadow-lg">
            <Eye className="text-maroon w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase font-display">
            MudraVision <span className="text-saffron">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {["Technique", "Library", "Research"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-saffron transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <button className="bg-saffron hover:bg-saffron/90 text-darkbrown px-6 py-2 rounded-full font-bold transition-all uppercase tracking-widest text-xs border-2 border-gold shadow-md">
            Launch App
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}

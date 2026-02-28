"use client";

import { Eye, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-40 border-t-2 border-gold pt-24 pb-12 relative bg-ivory text-darkbrown">
      <div className="absolute top-0 left-0 w-full h-4 mandala-pattern opacity-40"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center border-2 border-gold">
                <Eye className="text-saffron w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase font-display">
                MudraVision <span className="text-saffron">AI</span>
              </span>
            </div>
            <p className="text-darkbrown/70 max-w-md text-sm leading-relaxed font-medium">
              The intersection of machine learning and Indian classical dance.
              Dedicated to the digital preservation of intangible cultural
              heritage through advanced computer vision.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-saffron">
              Platform
            </h4>
            <ul className="space-y-4 text-xs font-bold text-darkbrown/60 uppercase">
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Real-time API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Dataset Access
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Research Papers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-saffron">
              Company
            </h4>
            <ul className="space-y-4 text-xs font-bold text-darkbrown/60 uppercase">
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/30 pt-12 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-darkbrown/50 font-bold uppercase">
            © 2024 MudraVision AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-8 md:mt-0">
            <a
              href="#"
              className="text-darkbrown/60 hover:text-saffron transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-darkbrown/60 hover:text-saffron transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-darkbrown/60 hover:text-saffron transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

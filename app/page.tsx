"use client";

import Hero from "./components/hero-section/Hero";
import Works from "./components/work-section/Works";
import Certificates from "./components/work-section/Certificates";
import About from "./components/about-section/About";
import Contact from "./components/contact+footer/Contact";
import Footer from "./components/contact+footer/Footer";
import { initialBlobityOptions } from "@/utils/blobity.config";
import useBlobity from "blobity/lib/react/useBlobity";

// Simple static background without dots or circles
const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>

          <radialGradient id="centerGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(100,100,100,0.08)" />
            <stop offset="50%" stopColor="rgba(60,60,60,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Noise texture for depth */}
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="turbulence" />
            <feColorMatrix in="turbulence" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 0.02" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Base layers */}
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#centerGlow)" />
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.3" />
      </svg>
    </div>
  );
};

export default function Home() {
  const blobity = useBlobity(initialBlobityOptions);

  return (
    <main className="overflow-x-hidden sm:overflow-x-visible">
      <BackgroundAnimation />
      <Hero />
      <Works />
      <Certificates />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

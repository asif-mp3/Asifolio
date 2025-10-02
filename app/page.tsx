"use client"

import { useState, useEffect } from "react"
import Hero from "./components/hero-section/Hero"
import Works from "./components/work-section/Works"
import Certificates from "./components/work-section/Certificates"
import About from "./components/about-section/About"
import Contact from "./components/contact+footer/Contact"
import Footer from "./components/contact+footer/Footer"
import { initialBlobityOptions } from "@/utils/blobity.config"
import useBlobity from "blobity/lib/react/useBlobity"
import { motion } from "framer-motion"

const BackgroundAnimation = () => {
  const [dots, setDots] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      range: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const generateDots = (
      count: number,
      offset: number,
      sizeRange: [number, number],
      range: number,
      lightness: number,
    ) =>
      [...Array(count)].map((_, i) => ({
        id: i + offset,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        color: `hsl(0, 0%, ${lightness}%)`,
        range,
        opacity: 0.15 + Math.random() * 0.25,
      }))

    // Reduced from 30 total dots to 12
    setDots([
      ...generateDots(8, 0, [2, 6], 3, 65), // Larger, slower moving dots
      ...generateDots(4, 8, [1, 3], 8, 70), // Smaller accent dots
    ])
  }, [])

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

          {/* Softer glow effect */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

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

        {/* Animated dots */}
        <g filter="url(#softGlow)">
          {dots.map((dot) => (
            <motion.circle
              key={dot.id}
              cx={`${dot.x}%`}
              cy={`${dot.y}%`}
              r={dot.size}
              fill={dot.color}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
                scale: [1, 1.3, 1],
                x: [`${dot.x}%`, `${dot.x + (Math.random() * dot.range * 2 - dot.range)}%`, `${dot.x}%`],
                y: [`${dot.y}%`, `${dot.y + (Math.random() * dot.range * 2 - dot.range)}%`, `${dot.y}%`],
              }}
              transition={{
                duration: 60 + Math.random() * 80,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        <motion.circle
          cx="20%"
          cy="30%"
          r="200"
          fill="rgba(80,80,80,0.03)"
          filter="url(#softGlow)"
          initial={{ opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 120,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="80%"
          cy="70%"
          r="250"
          fill="rgba(60,60,60,0.025)"
          filter="url(#softGlow)"
          initial={{ opacity: 0 }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.025, 0.04, 0.025],
          }}
          transition={{
            duration: 140,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

export default function Home() {
  const blobity = useBlobity(initialBlobityOptions)

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
  )
}

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

// const BackgroundAnimation = () => {
//   const [dots, setDots] = useState<
//     Array<{
//       id: number
//       x: number
//       y: number
//       size: number
//       color: string
//       range: number
//       opacity: number
//     }>
//   >([])

//   useEffect(() => {
//     const regularDots = [...Array(20)].map((_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 3 + 1,
//       color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
//       range: 2,
//       opacity: 0.1 + Math.random() * 0.5,
//     }))

//     const wideDots = [...Array(10)].map((_, i) => ({
//       id: i + 20,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 4 + 1,
//       color: `hsl(${Math.random() * 60 + 200}, 100%, 75%)`,
//       range: 10,
//       opacity: 0.1 + Math.random() * 0.5,
//     }))

//     setDots([...regularDots, ...wideDots])
//   }, [])

//   return (
//     <div className="fixed inset-0 z-0">
//       <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
//           </pattern>
//           <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
//             <stop offset="0%" stopColor="rgba(59,130,246,0.1)" />
//             <stop offset="100%" stopColor="rgba(59,130,246,0)" />
//           </radialGradient>
//           <filter id="glow">
//             <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
//             <feMerge>
//               <feMergeNode in="coloredBlur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//         <rect width="100%" height="100%" fill="url(#radialGradient)" />
//         <g filter="url(#glow)">
//           {dots.map((dot) => (
//             <motion.circle
//               key={dot.id}
//               cx={`${dot.x}%`}
//               cy={`${dot.y}%`}
//               r={dot.size}
//               fill={dot.color}
//               initial={{ opacity: dot.opacity }}
//               animate={{
//                 opacity: [dot.opacity, 0.5 + Math.random() * 0.5, dot.opacity],
//                 scale: [1, 1.5, 1],
//                 x: [`${dot.x}%`, `${dot.x + (Math.random() * dot.range * 2 - dot.range)}%`, `${dot.x}%`],
//                 y: [`${dot.y}%`, `${dot.y + (Math.random() * dot.range * 2 - dot.range)}%`, `${dot.y}%`],
//               }}
//               transition={{
//                 duration: Math.random() * 100 + 100,
//                 repeat: Number.POSITIVE_INFINITY,
//                 repeatType: "reverse",
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </g>
//       </svg>
//     </div>
//   )
// }

export default function Home() {
  const blobity = useBlobity(initialBlobityOptions)

  return (
    <main className="overflow-x-hidden sm:overflow-x-visible">
      {/* <BackgroundAnimation /> */}
      <Hero />
      <Works />
      <Certificates />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}


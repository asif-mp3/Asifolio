"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { HyperText } from "@/components/ui/hyper-text"

const roles = [
  "AWS Engineer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Data Science Enthusiast"
]

export default function Hero() {
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)

  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef })
  const { ref, inView } = useInView({ threshold: 0.4, rootMargin: "-100px 0px" })

  const handWaveAnimation = {
    rotate: [0, 15, -10, 15, -10, 15, -10, 15, -10, 15, 0],
    transition: { duration: 1.5, ease: "easeInOut" },
  }

  const animateIn1 = {
    opacity: [0, 1],
    y: ["1rem", "0px"],
    transition: { delay: 1.5, duration: 0.7, ease: "easeIn" },
  }

  const animateIn2 = {
    ...animateIn1,
    transition: { ...animateIn1.transition, delay: 2 },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "-15deg"])

  return (
    <div className="pt-24 md:pt-14">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        ref={ref}
        className="flex flex-col sm:flex-row h-dvh items-center gap-6 sm:justify-between"
        id="home"
      >
        {/* Text Section */}
        <div className="text sm:w-[60%]">
          <motion.div
            className="grid grid-cols-9 w-fit smm:flex gap-2 mb-2 xl:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <p className="text-white/60 text-xl smm:text-2xl mb-3 smm:mb-0 lg:text-3xl col-span-6">
              Hey, there
            </p>
            <motion.div
              animate={handWaveAnimation}
              style={{ transformOrigin: "bottom right" }}
              className="col-span-3"
            >
              <Image src="/hand-wave.svg" width={30} height={30} alt="hand-waving" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-[32px] smm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold"
            initial={{ opacity: 0 }}
            animate={animateIn1}
          >
            <p className="text-white/60 inline">I&apos;m </p>
            <span className="bg-linear-to-br bg-clip-text text-transparent from-[#7CC0C4] via-[#548FBA] to-[#3C84C7]">
              Mohamed Asif
            </span>
            <div className="h-16 mt-2 mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl smm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  {roles[currentRole]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={animateIn2}
            className="text-white/40 text-l smm:text-2xl lg:text-2xl xl:text-3xl mt-3 smm:mt-6"
          >
            Building expertise in data science and cloud.
          </motion.p>

          {/* Example HyperText usage */}
          <HyperText className="mt-4" duration={1200}>
            Hello from HyperText!
          </HyperText>
        </div>

        {/* Image Section */}
        <div className="relative p-4">
          <motion.div
            animate={{
              background: isImageHovered
                ? [
                    "radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,192,255,0.2) 50%, rgba(0,128,255,0.1) 100%)",
                    "radial-gradient(circle, rgba(0,224,255,0.3) 0%, rgba(0,160,255,0.2) 50%, rgba(0,96,255,0.1) 100%)",
                    "radial-gradient(circle, rgba(0,200,255,0.3) 0%, rgba(0,144,255,0.2) 50%, rgba(0,80,255,0.1) 100%)",
                  ]
                : [
                    "radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,192,255,0.05) 50%, rgba(0,128,255,0.025) 100%)",
                    "radial-gradient(circle, rgba(0,224,255,0.1) 0%, rgba(0,160,255,0.05) 50%, rgba(0,96,255,0.025) 100%)",
                    "radial-gradient(circle, rgba(0,200,255,0.1) 0%, rgba(0,144,255,0.05) 50%, rgba(0,80,255,0.025) 100%)",
                  ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              boxShadow: isImageHovered
                ? [
                    "0 0 30px rgba(0, 255, 255, 0.9)",
                    "0 0 50px rgba(0, 192, 255, 0.7)",
                    "0 0 70px rgba(0, 128, 255, 0.6)",
                    "0 0 40px rgba(0, 160, 255, 0.8)",
                  ]
                : [
                    "0 0 20px rgba(0, 255, 255, 0.5)",
                    "0 0 40px rgba(0, 192, 255, 0.3)",
                    "0 0 60px rgba(0, 128, 255, 0.2)",
                    "0 0 30px rgba(0, 160, 255, 0.4)",
                  ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-full overflow-hidden w-full max-w-[350px] mx-auto"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <Image
              src="/asifbest.jpg"
              alt="Profile"
              width={300}
              height={250}
              className="relative w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

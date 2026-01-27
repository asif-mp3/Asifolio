"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useView } from "@/contexts/ViewContext";
import { Icon } from "@iconify/react";
import { SparklesText } from "@/components/ui/sparkles-text";

// Ink particle positions (randomized but fixed for consistency)
const inkParticles = [
  { x: -40, y: 20, size: 6, delay: 0 },
  { x: 50, y: -30, size: 4, delay: 0.5 },
  { x: -30, y: -50, size: 5, delay: 1 },
  { x: 60, y: 40, size: 4, delay: 1.5 },
  { x: -55, y: -20, size: 3, delay: 2 },
  { x: 45, y: 60, size: 5, delay: 2.5 },
  { x: -20, y: 70, size: 4, delay: 3 },
  { x: 70, y: -10, size: 3, delay: 3.5 },
];

const roles = [
  "Cloud Engineer",
  "DevOps Enthusiast",
  "Full Stack Developer",
  "Problem Solver",
  "Backend Engineer",
];


export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showGreeting, setShowGreeting] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const { setSectionInView } = useView();
  const { ref, inView } = useInView({
    threshold: 0.4,
    rootMargin: "-100px 0px",
  });

  // Hide greeting after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 2000); // Disappear after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (x - centerX) / centerX * 8;
    const tiltY = (centerY - y) / centerY * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (inView) setSectionInView("home");
  }, [inView, setSectionInView]);

  // Typewriter effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center"
      id="home"
    >
      {/* Blackhole Video - Positioned at top */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-340px] left-0 w-full h-[800px] z-[1] object-cover"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Content - Two column layout */}
      <div className="relative z-[10] w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            {/* Greeting - shows first, disappears after waving */}
            <AnimatePresence>
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 h-auto py-8 sm:py-12"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 font-medium">Hey there</span>
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block"
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: 2,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "70% 70%" }}
                  >
                    👋
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main content - appears after greeting disappears */}
            {!showGreeting && (
              <div className="flex flex-col items-center lg:items-start">
                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0, duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
                >
                  <span className="text-gray-200">I&apos;m </span>
                  <SparklesText className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-300">
                    {"Mohamed Asif"}
                  </SparklesText>
                </motion.h1>

                {/* Role with Typewriter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="h-8 sm:h-10 mb-4 sm:mb-6 flex items-center"
                >
                  <span className="text-lg sm:text-xl md:text-2xl text-gray-300">
                    {displayText}
                    <span className="inline-block w-[2px] h-6 bg-blue-500 ml-1 animate-pulse" />
                  </span>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-gray-400 max-w-md mb-6 sm:mb-8 text-sm md:text-base"
                >
                  Building intelligent systems that bridge innovation and impact.
                  Specializing in cloud architecture, ML, and scalable solutions.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <motion.a
                    href="#work"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="button-primary flex items-center justify-center gap-2 text-white min-h-[48px] px-6 group"
                  >
                    View Projects
                    <Icon icon="ph:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 min-h-[48px] rounded-full border border-blue-500/50 text-white hover:bg-blue-500/10 hover:border-blue-500 transition-all flex items-center justify-center"
                  >
                    Contact Me
                  </motion.a>
                </motion.div>
              </div>
            )}
          </div>

          {/* Right - Floating Canvas Sketch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end order-1 lg:order-2 lg:pr-8 mt-12 sm:mt-8 lg:mt-0"
          >
            <div className="relative mx-auto lg:mx-0">
              {/* Ink Particles */}
              {inkParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-500/60"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `calc(50% + ${particle.x}px)`,
                    top: `calc(50% + ${particle.y}px)`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* 3D Tilt Card */}
                <motion.div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative cursor-pointer transition-transform duration-200 ease-out"
                >
                  {/* Outer glow */}
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-500/30 via-transparent to-indigo-500/30 blur-2xl" />

                  {/* Paper Card */}
                  <div className="relative w-[220px] h-[290px] sm:w-[260px] sm:h-[340px] md:w-[300px] md:h-[400px] bg-[#f5f0e6] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.2)] overflow-hidden">
                    {/* Corner Pins */}
                    <div className="absolute top-3 left-3 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm rotate-45 shadow-md z-10" />
                    <div className="absolute top-3 right-3 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm rotate-45 shadow-md z-10" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-sm rotate-45 shadow-md z-10" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-sm rotate-45 shadow-md z-10" />

                    {/* Inner frame border */}
                    <div className="absolute inset-4 border-2 border-gray-300/50 rounded-lg pointer-events-none" />

                    {/* Sketch Image */}
                    <div className="absolute inset-6 rounded-lg overflow-hidden">
                      <Image
                        src="/asif-vh.png"
                        alt="Mohamed Asif - Sketch"
                        fill
                        sizes="(max-width: 768px) 260px, 300px"
                        className="object-cover object-top"
                        priority
                      />
                    </div>

                    {/* Light sweep effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Paper texture overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-4 sm:mt-6 md:mt-8 text-center italic text-gray-400 text-xs sm:text-sm md:text-base max-w-[250px] sm:max-w-[300px] mx-auto"
              >
                <span className="text-blue-400/80">&ldquo;</span>
                <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-clip-text text-transparent">
                  The best thing about time is, it changes...
                </span>
                <span className="text-blue-400/80">&rdquo;</span>
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center mt-8 sm:mt-12 md:mt-16"
        >
          <span className="text-gray-500 text-xs mb-2">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon icon="ph:caret-down" className="text-blue-500 text-xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

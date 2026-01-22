"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useView } from "@/contexts/ViewContext";
import { Icon } from "@iconify/react";

const roles = [
  "Cloud Architect",
  "Full Stack Developer",
  "ML Engineer",
  "Problem Solver",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { setSectionInView } = useView();
  const { ref, inView } = useInView({
    threshold: 0.4,
    rootMargin: "-100px 0px",
  });

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
      <div className="relative z-[10] w-full max-w-6xl mx-auto px-6 pt-28 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400">
                Mohamed Asif
              </span>
            </motion.h1>

            {/* Role with Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-10 mb-6 flex items-center"
            >
              <span className="text-xl md:text-2xl text-gray-300">
                {displayText}
                <span className="inline-block w-[2px] h-6 bg-[#7042f8] ml-1 animate-pulse" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-400 max-w-md mb-8 text-sm md:text-base"
            >
              Building intelligent systems that bridge innovation and impact.
              Specializing in cloud architecture, ML, and scalable solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
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
                className="px-6 py-3 min-h-[48px] rounded-full border border-[#7042f8]/50 text-white hover:bg-[#7042f8]/10 hover:border-[#7042f8] transition-all flex items-center justify-center"
              >
                Contact Me
              </motion.a>
            </motion.div>

          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end order-1 lg:order-2 lg:pr-8"
          >
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-600/20 blur-2xl" />

              {/* Rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 rounded-full border border-dashed border-purple-500/30"
              />

              {/* Inner rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-purple-500/40"
              />

              {/* Image Container with gradient border */}
              <motion.div
                className="relative cursor-pointer group/image"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Gradient border effect - intensifies on hover */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-cyan-500 opacity-50 blur-sm group-hover/image:opacity-80 group-hover/image:blur-md transition-all duration-300" />

                {/* Main Image */}
                <div className="relative w-[220px] h-[280px] md:w-[280px] md:h-[350px] rounded-full overflow-hidden border-2 border-purple-500/50 group-hover/image:border-purple-400/70 shadow-2xl shadow-purple-500/30 group-hover/image:shadow-purple-500/50 transition-all duration-300">
                  <Image
                    src="/rise.png"
                    alt="Mohamed Asif"
                    fill
                    sizes="(max-width: 768px) 220px, 280px"
                    className="object-cover scale-110 object-top group-hover/image:scale-115 transition-transform duration-500"
                    priority
                  />
                  {/* Inner gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent group-hover/image:from-purple-900/10 transition-all duration-300" />
                </div>
              </motion.div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-6 text-center italic text-gray-400 text-sm md:text-base max-w-[280px]"
              >
                <span className="text-purple-400/80">"</span>
                <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-clip-text text-transparent">
                  The best thing about time is, it changes...
                </span>
                <span className="text-purple-400/80">"</span>
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center mt-16"
        >
          <span className="text-gray-500 text-xs mb-2">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon icon="ph:caret-down" className="text-[#7042f8] text-xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

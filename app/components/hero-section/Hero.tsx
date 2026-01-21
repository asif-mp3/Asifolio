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
      <div className="relative z-[10] w-full max-w-6xl mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
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
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#work"
                className="button-primary flex items-center justify-center gap-2 text-white"
              >
                View Projects
                <Icon icon="ph:arrow-right" />
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-full border border-[#7042f8]/50 text-white hover:bg-[#7042f8]/10 transition-all"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex gap-10 mt-10"
            >
              {[
                { value: "7+", label: "Projects" },
                { value: "8", label: "Certs" },
                { value: "1", label: "Patent" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Profile Image in Oval */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-purple-500/30 to-cyan-500/30 blur-3xl scale-110" />

              {/* Rotating border ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-[50%] border-2 border-dashed border-purple-500/30"
                style={{ width: "calc(100% + 24px)", height: "calc(100% + 24px)" }}
              />

              {/* Oval Image Container */}
              <div className="relative w-[220px] h-[280px] md:w-[280px] md:h-[360px] rounded-[50%] overflow-hidden border-4 border-[#7042f8]/40 shadow-2xl shadow-purple-500/20">
                <Image
                  src="/asifbest.jpg"
                  alt="Mohamed Asif"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating particles around image */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-400/70"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: i % 2 === 0 ? "-15px" : "calc(100% + 5px)",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
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

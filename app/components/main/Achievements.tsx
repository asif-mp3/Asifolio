"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const achievements = [
  {
    title: "Patent Published",
    description: "Smart Buoy System for Oil Spill Detection",
    detail: "Application No. 202541080926",
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    title: "SIH 2024 Finalist",
    description: "Smart India Hackathon National Finals",
    detail: "Ranked 38th out of 673 teams",
    color: "from-cyan-500/20 to-cyan-600/10",
    borderColor: "border-cyan-500/30",
  },
  {
    title: "Azure AI-900",
    description: "Microsoft Azure AI Fundamentals",
    detail: "Scored 91.8%",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    title: "97.3% Accuracy",
    description: "Oil Spill Detection CNN Model",
    detail: "Using Sentinel-1 SAR Imagery",
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
];

export default function Achievements() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Key Achievements
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Sticky Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                className={`relative p-5 rounded-lg bg-gradient-to-br ${item.color} border ${item.borderColor} backdrop-blur-sm cursor-default`}
                style={{
                  transformOrigin: "center center",
                }}
              >
                {/* Pin effect */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md" />

                <h3 className="text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  {item.description}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right - Lock Visual Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Animated rings */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-purple-500/10 blur-3xl" />

              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full border border-dashed border-purple-500/30"
              />

              {/* Inner content */}
              <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center group cursor-pointer">
                  <Image
                    src="/lock-top.png"
                    alt="Lock top"
                    width={50}
                    height={50}
                    className="w-[45px] md:w-[55px] translate-y-4 transition-all duration-300 group-hover:translate-y-8"
                  />
                  <Image
                    src="/lock-main.png"
                    alt="Lock main"
                    width={70}
                    height={70}
                    className="w-[65px] md:w-[80px] z-10"
                  />
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-400/60"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Text below */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-300 text-lg font-medium">
                Secured & Verified
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Building trust through innovation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

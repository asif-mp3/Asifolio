"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy, Award, Users, Cloud, X } from "lucide-react";
import { Globe } from "@/app/components/ui/Globe";
import GitHubCalendar from "@/app/components/ui/GitHubCalendar";

const achievements = [
  {
    title: "Patent Published",
    description: "Smart Buoy System for Oil Spill Detection",
    detail: "Application No. 202541080926",
    fullDetail: "Invented a smart buoy system that uses IoT sensors and satellite communication for early detection of oil spills in marine environments. The system provides real-time alerts and GPS coordinates for rapid response.",
    color: "bg-yellow-100",
    pinColor: "bg-red-500",
    rotation: -2,
    icon: Award,
  },
  {
    title: "SIH 2024 Finalist",
    description: "Smart India Hackathon National Finals",
    detail: "Ranked 38th out of 673 teams",
    fullDetail: "Competed in Smart India Hackathon 2024, India's largest hackathon. Our team developed an innovative solution and secured 38th position among 673 participating teams nationwide.",
    color: "bg-pink-100",
    pinColor: "bg-blue-500",
    rotation: 1.5,
    icon: Trophy,
  },
  {
    title: "Leadership & Soft Skills",
    description: "Team Collaboration & Communication",
    detail: "Co-Lead at Tamil Mandram",
    fullDetail: "Strong leadership and communication abilities demonstrated as Co-Lead at Arignar Anna Tamil Mandram, organizing cultural events and delivering stage presentations. Experienced in team collaboration, public speaking, and cross-functional coordination in hackathons and club activities.",
    color: "bg-green-100",
    pinColor: "bg-green-500",
    rotation: -1,
    icon: Users,
  },
  {
    title: "AWS SAA-C03",
    description: "Solutions Architect Associate",
    detail: "Amazon Web Services Certified",
    fullDetail: "Achieved AWS Solutions Architect Associate certification, validating expertise in designing resilient, high-performing, secure, and cost-optimized architectures on AWS cloud platform.",
    color: "bg-orange-100",
    pinColor: "bg-orange-500",
    rotation: 2,
    icon: Cloud,
  },
];

// Staggered entrance animation for cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const noteVariants = {
  hidden: {
    opacity: 0,
    y: -100,
    rotate: -10,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      mass: 0.8,
    },
  },
};

export default function Encryption() {
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-12">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Key Achievements
            </span>
          </h2>
          <p className="text-gray-400 text-center mt-4 max-w-2xl">
            Milestones and recognitions that highlight my journey in tech
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Sticky Notes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-6"
          >
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                variants={noteVariants}
                onClick={() => setExpandedNote(index)}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  y: -5,
                  zIndex: 10,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: 0.98 }}
                style={{ rotate: item.rotation }}
                className={`relative ${item.color} p-5 rounded-sm cursor-pointer group`}
              >
                {/* Paper texture overlay */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Push pin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                  <div className={`w-4 h-4 ${item.pinColor} rounded-full shadow-md`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/60 rounded-full" />
                  </div>
                  {/* Pin shadow */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-black/10 blur-[2px] rounded-full" />
                </div>

                {/* Folded corner effect */}
                <div
                  className="absolute bottom-0 right-0 w-6 h-6"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)`,
                  }}
                />

                {/* Shadow under the note */}
                <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/15 blur-md rounded-full -z-10" />

                {/* Content */}
                <div className="relative z-10 pt-2">
                  {/* Icon */}
                  <div className="mb-3">
                    <item.icon className="w-6 h-6 text-gray-700" />
                  </div>

                  <h3 className="text-base font-bold text-gray-800 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1.5 leading-snug">
                    {item.description}
                  </p>
                  <p className="text-gray-500 text-xs font-medium">
                    {item.detail}
                  </p>

                  {/* Click hint */}
                  <motion.p
                    className="text-gray-400 text-[10px] mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Click to read more
                  </motion.p>
                </div>

                {/* Tape strips for extra realism on some notes */}
                {index % 2 === 1 && (
                  <>
                    <div className="absolute -top-1 -left-2 w-8 h-3 bg-yellow-200/70 rotate-[-15deg] shadow-sm" />
                    <div className="absolute -top-1 -right-2 w-8 h-3 bg-yellow-200/70 rotate-[15deg] shadow-sm" />
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Interactive Globe & GitHub Calendar */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] flex items-center justify-center">
                {/* Outer orbital ring */}
                <motion.div
                  className="absolute w-[300px] h-[300px] md:w-[390px] md:h-[390px] rounded-full border border-purple-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                </motion.div>

                {/* Middle orbital ring */}
                <motion.div
                  className="absolute w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full border border-cyan-500/20"
                  style={{ transform: "rotateX(60deg)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                </motion.div>

                {/* Inner orbital ring */}
                <motion.div
                  className="absolute w-[220px] h-[220px] md:w-[290px] md:h-[290px] rounded-full border border-purple-400/15"
                  style={{ transform: "rotateY(60deg)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                </motion.div>

                {/* Globe container */}
                <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px]">
                  <Globe className="top-0" />
                </div>

                {/* Glow effect behind globe */}
                <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl -z-10" />
              </div>
            </motion.div>

            {/* GitHub Contribution Calendar */}
            <GitHubCalendar username="asif-mp3" />
          </div>
        </div>
      </div>

      {/* Expanded Note Modal */}
      {expandedNote !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setExpandedNote(null)}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10, y: 100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.5, rotate: 10, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative ${achievements[expandedNote].color} p-8 rounded-sm max-w-md w-full shadow-2xl`}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none rounded-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Push pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <div className={`w-6 h-6 ${achievements[expandedNote].pinColor} rounded-full shadow-lg`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full" />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setExpandedNote(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800/20 hover:bg-gray-800/40 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>

            {/* Folded corner */}
            <div
              className="absolute bottom-0 right-0 w-10 h-10"
              style={{
                background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full ${achievements[expandedNote].pinColor}/20 flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = achievements[expandedNote].icon;
                    return <IconComponent className="w-6 h-6 text-gray-700" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {achievements[expandedNote].title}
                </h3>
              </div>

              <p className="text-gray-700 text-lg mb-3">
                {achievements[expandedNote].description}
              </p>

              <p className="text-gray-600 mb-4">
                {achievements[expandedNote].fullDetail}
              </p>

              <div className="pt-4 border-t border-gray-300/50">
                <p className="text-gray-500 text-sm font-medium">
                  {achievements[expandedNote].detail}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

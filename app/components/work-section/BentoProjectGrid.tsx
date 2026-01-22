"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import BentoProjectCard from "./BentoProjectCard";

interface Project {
  title: string;
  gitLink: string;
  liveLink: string;
  about: string;
  stack: string[];
  img: string;
  showInfo?: boolean;
  infoMessage?: string;
}

interface BentoProjectGridProps {
  projects: Project[];
}

export default function BentoProjectGrid({ projects }: BentoProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* Bento Grid with explicit rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[320px]">
        {projects.map((project, index) => (
          <BentoProjectCard
            key={project.title}
            project={project}
            index={index}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#030014]/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0118] rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden border border-purple-500/20"
            >
              {/* Modal Header with Image */}
              <div className="relative h-36 md:h-44">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-[#0a0118]/60 to-transparent" />

                {/* Close button */}
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#0a0118]/80 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all text-white"
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* Title overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-11rem)]">
                {/* Full Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {selectedProject.about}
                </p>

                {/* Additional Info if available */}
                {selectedProject.infoMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <p className="text-purple-200 text-xs">
                      {selectedProject.infoMessage}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {selectedProject.gitLink && (
                    <motion.a
                      href={selectedProject.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white text-xs font-medium"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Source
                    </motion.a>
                  )}
                  {selectedProject.liveLink && (
                    <motion.a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition-all text-white text-xs font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

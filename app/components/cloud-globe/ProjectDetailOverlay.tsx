"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "./utils/projectData";

interface ProjectDetailOverlayProps {
  selectedIndex: number | null;
  onClose: () => void;
  nodeScreenPosition?: { x: number; y: number };
}

export default function ProjectDetailOverlay({
  selectedIndex,
  onClose,
  nodeScreenPosition,
}: ProjectDetailOverlayProps) {
  const project = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#030014]/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              x: nodeScreenPosition?.x ?? "50%",
              y: nodeScreenPosition?.y ?? "50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: nodeScreenPosition?.x ?? "50%",
              y: nodeScreenPosition?.y ?? "50%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0a0118]/95 backdrop-blur-xl rounded-2xl border border-[#2a0e61] shadow-2xl shadow-purple-500/20 overflow-hidden">
              {/* Header with close button */}
              <div className="relative">
                {/* Project Image */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-[#7c3aed]/20 to-[#22d3ee]/20">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 768px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent" />
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#030014]/80 backdrop-blur-sm border border-[#2a0e61] text-gray-400 hover:text-white hover:border-[#7c3aed] transition-colors"
                  aria-label="Close project details"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-4">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  {project.about}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm font-medium text-purple-200/80 bg-[#0a0118]/80 border border-[#2a0e61] rounded-md hover:border-[#7c3aed] hover:text-purple-100 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live
                  </motion.a>

                  {project.gitLink && (
                    <motion.a
                      href={project.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0a0118] border border-[#2a0e61] text-white font-semibold hover:border-[#7c3aed] hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </motion.a>
                  )}
                </div>

                {/* Special info message */}
                {project.showInfo && project.infoMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
                  >
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-purple-400">Highlight: </span>
                      {project.infoMessage}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

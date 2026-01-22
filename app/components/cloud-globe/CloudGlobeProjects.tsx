"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useView } from "@/contexts/ViewContext";
import { useReducedMotion } from "./hooks/useReducedMotion";
import CloudGlobeCanvas from "./CloudGlobeCanvas";
import ProjectDetailOverlay from "./ProjectDetailOverlay";
import { projects } from "./utils/projectData";

// Fallback static grid for reduced motion or loading state
function StaticProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.a
          key={project.id}
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group block p-4 rounded-xl bg-[#0a0118]/80 border border-[#2a0e61] hover:border-[#7c3aed] transition-colors"
        >
          <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">{project.about}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {project.stack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.a>
      ))}
    </div>
  );
}

// Loading skeleton
function GlobeLoadingSkeleton() {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="relative">
        {/* Animated loading sphere */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-48 h-48 rounded-full border-2 border-dashed border-purple-500/30"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-4 rounded-full border border-cyan-500/20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple-400 text-sm"
            >
              Loading Globe...
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CloudGlobeProjects() {
  const { setSectionInView } = useView();
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  // Update section view context
  useEffect(() => {
    if (inView) setSectionInView("work");
  }, [inView, setSectionInView]);

  // Client-side only rendering for Three.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle project selection
  const handleProjectSelect = useCallback((index: number) => {
    if (index === -1) {
      setSelectedProject(null);
    } else {
      setSelectedProject(index);
    }
  }, []);

  // Handle overlay close
  const handleCloseOverlay = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject !== null) {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedProject]);

  return (
    <section
      ref={ref}
      id="work"
      className="relative py-20 md:py-32"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Featured Projects
          </span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Explore my projects in an interactive 3D space. Drag to rotate, click to view details.
        </p>

        {/* Instructions */}
        {!prefersReducedMotion && isClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-500"
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#2a0e61]/50 flex items-center justify-center text-xs">↔</span>
              Drag to rotate
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#2a0e61]/50 flex items-center justify-center text-xs">⬤</span>
              Click node to view
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#2a0e61]/50 flex items-center justify-center text-xs">Tab</span>
              Keyboard nav
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Screen reader accessible project list */}
      <div className="sr-only" role="region" aria-label="Projects list">
        <h3>All Projects</h3>
        <ul>
          {projects.map((project, i) => (
            <li key={project.id}>
              <button
                onClick={() => handleProjectSelect(i)}
                aria-label={`${project.title}. ${project.about.slice(0, 100)}...`}
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      {prefersReducedMotion ? (
        // Static fallback for reduced motion preference
        <StaticProjectGrid />
      ) : isClient ? (
        // 3D Globe
        <Suspense fallback={<GlobeLoadingSkeleton />}>
          <CloudGlobeCanvas
            onProjectSelect={handleProjectSelect}
            selectedProject={selectedProject}
            isBlurred={selectedProject !== null}
          />
        </Suspense>
      ) : (
        // Server-side / initial render
        <GlobeLoadingSkeleton />
      )}

      {/* Project detail overlay */}
      <ProjectDetailOverlay
        selectedIndex={selectedProject}
        onClose={handleCloseOverlay}
      />
    </section>
  );
}

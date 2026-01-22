"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import { useView } from "@/contexts/ViewContext";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useGlobeInteraction } from "./hooks/useGlobeInteraction";
import { useAdaptiveQuality, getInitialQualitySettings } from "./hooks/useAdaptiveQuality";
import OrbitalRings from "./OrbitalRings";
import CertificateNodes from "./CertificateNodes";
import CertificateDetailOverlay from "./CertificateDetailOverlay";
import { certificates } from "./utils/certificateData";

// Fallback static grid for reduced motion or loading state
function StaticCertificateGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      {certificates.map((cert, index) => (
        <motion.a
          key={cert.id}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group block p-4 rounded-xl bg-[#0a0118]/80 border border-[#2a0e61] hover:border-[#7c3aed] transition-colors"
        >
          <h3 className="text-white font-semibold mb-2 text-sm group-hover:text-purple-300 transition-colors line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-purple-400 text-xs mb-2">{cert.issuer}</p>
          <p className="text-gray-400 text-xs line-clamp-2">{cert.description}</p>
        </motion.a>
      ))}
    </div>
  );
}

// Loading skeleton
function CertificateLoadingSkeleton() {
  return (
    <div className="w-full h-[550px] md:h-[650px] flex items-center justify-center">
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
              Loading Certificates...
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inner scene component with R3F context
function CertificateScene({
  onCertificateSelect,
  selectedCertificate,
  focusedNode,
}: {
  onCertificateSelect: (index: number) => void;
  selectedCertificate: number | null;
  focusedNode: number | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const { quality, settings } = useAdaptiveQuality("high");
  const { storeRotation, restoreRotation } = useGlobeInteraction(groupRef, {
    enabled: selectedCertificate === null,
  });

  // Handle node selection
  const handleNodeSelect = useCallback(
    (index: number) => {
      storeRotation();
      onCertificateSelect(index);
    },
    [onCertificateSelect, storeRotation]
  );

  // Restore rotation when closing detail view
  useEffect(() => {
    if (selectedCertificate === null) {
      restoreRotation();
    }
  }, [selectedCertificate, restoreRotation]);

  // Calculate opacity based on selection state
  const ringsOpacity = selectedCertificate !== null ? 0.15 : 0.6;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

      <group ref={groupRef}>
        <OrbitalRings
          opacity={ringsOpacity}
          visible={settings.shellCount > 0}
        />

        <CertificateNodes
          radius={4.0}
          hoveredNode={hoveredNode}
          selectedNode={selectedCertificate}
          focusedNode={focusedNode}
          onHover={setHoveredNode}
          onSelect={handleNodeSelect}
        />
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />

      {/* Key light */}
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />

      {/* Rim light for edge definition */}
      <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#22d3ee" />
    </>
  );
}

export default function OrbitalCertificates() {
  const { setSectionInView } = useView();
  const prefersReducedMotion = useReducedMotion();
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  const [focusedNode, setFocusedNode] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  // Update section view context
  useEffect(() => {
    if (inView) setSectionInView("certificates");
  }, [inView, setSectionInView]);

  // Client-side only rendering for Three.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle certificate selection
  const handleCertificateSelect = useCallback((index: number) => {
    if (index === -1) {
      setSelectedCertificate(null);
    } else {
      setSelectedCertificate(index);
    }
  }, []);

  // Handle overlay close
  const handleCloseOverlay = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCertificate !== null) {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedCertificate]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedCertificate !== null) return;

      if (e.key === "Tab") {
        e.preventDefault();
        const currentIndex = focusedNode ?? -1;
        let nextIndex: number;

        if (e.shiftKey) {
          nextIndex = currentIndex <= 0 ? certificates.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex >= certificates.length - 1 ? 0 : currentIndex + 1;
        }

        setFocusedNode(nextIndex);
      }

      if ((e.key === "Enter" || e.key === " ") && focusedNode !== null) {
        e.preventDefault();
        handleCertificateSelect(focusedNode);
      }
    },
    [focusedNode, selectedCertificate, handleCertificateSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Get initial quality settings
  const initialSettings = getInitialQualitySettings();

  return (
    <section
      ref={ref}
      id="certificates"
      className="relative py-16 md:py-24"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Certifications
          </span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto px-4">
          Industry-recognized certifications validating expertise in cloud computing, AI/ML, and software development
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
              Click to view
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#2a0e61]/50 flex items-center justify-center text-xs">Tab</span>
              Keyboard nav
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Screen reader accessible list */}
      <div className="sr-only" role="region" aria-label="Certificates list">
        <h3>All Certificates</h3>
        <ul>
          {certificates.map((cert, i) => (
            <li key={cert.id}>
              <button
                onClick={() => handleCertificateSelect(i)}
                aria-label={`${cert.title} from ${cert.issuer}. ${cert.description}`}
              >
                {cert.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      {prefersReducedMotion ? (
        // Static fallback for reduced motion preference
        <StaticCertificateGrid />
      ) : isClient ? (
        // 3D Orbital View
        <Suspense fallback={<CertificateLoadingSkeleton />}>
          <div
            className={`relative w-full h-[550px] md:h-[650px] transition-all duration-500 ${
              selectedCertificate !== null ? "blur-sm scale-95" : ""
            }`}
            tabIndex={0}
            role="application"
            aria-label="Interactive 3D certificate display. Use Tab to navigate between certificates, Enter to select."
          >
            <Canvas
              dpr={initialSettings.dpr}
              gl={{
                antialias: initialSettings.antialias,
                powerPreference: "high-performance",
                alpha: true,
              }}
              style={{ background: "transparent" }}
            >
              <CertificateScene
                onCertificateSelect={handleCertificateSelect}
                selectedCertificate={selectedCertificate}
                focusedNode={focusedNode}
              />
            </Canvas>
          </div>
        </Suspense>
      ) : (
        // Server-side / initial render
        <CertificateLoadingSkeleton />
      )}

      {/* Certificate detail overlay */}
      <CertificateDetailOverlay
        selectedIndex={selectedCertificate}
        onClose={handleCloseOverlay}
      />
    </section>
  );
}

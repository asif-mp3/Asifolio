"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import OrbitalRings from "./OrbitalRings";
import ProjectNodes from "./ProjectNodes";
import { useGlobeInteraction } from "./hooks/useGlobeInteraction";
import { useAdaptiveQuality, getInitialQualitySettings } from "./hooks/useAdaptiveQuality";
import { projects } from "./utils/projectData";
import { fibonacciSphere, getPositionAt, getSortedIndicesByTheta } from "./utils/sphericalDistribution";

interface CloudGlobeCanvasProps {
  onProjectSelect: (index: number) => void;
  selectedProject: number | null;
  isBlurred?: boolean;
}

// Inner component that has access to R3F context
function GlobeScene({
  onProjectSelect,
  selectedProject,
  focusedNode,
  onFocusChange,
}: {
  onProjectSelect: (index: number) => void;
  selectedProject: number | null;
  focusedNode: number | null;
  onFocusChange: (index: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const { quality, settings } = useAdaptiveQuality("high");
  const { storeRotation, restoreRotation, rotateToNode } = useGlobeInteraction(groupRef, {
    enabled: selectedProject === null,
  });

  // Node positions for rotation targeting
  const nodePositions = fibonacciSphere(projects.length, 2, 0.15);

  // Handle node selection
  const handleNodeSelect = useCallback(
    (index: number) => {
      storeRotation();
      onProjectSelect(index);
    },
    [onProjectSelect, storeRotation]
  );

  // Restore rotation when closing detail view
  useEffect(() => {
    if (selectedProject === null) {
      restoreRotation();
    }
  }, [selectedProject, restoreRotation]);

  // Rotate to focused node (keyboard navigation)
  useEffect(() => {
    if (focusedNode !== null && selectedProject === null) {
      const position = getPositionAt(nodePositions, focusedNode);
      rotateToNode(position, 300);
    }
  }, [focusedNode, selectedProject, nodePositions, rotateToNode]);

  // Calculate opacity based on selection state (keep cloud subtle)
  const cloudOpacity = selectedProject !== null ? 0.15 : 0.5;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

      <group ref={groupRef}>
        <OrbitalRings
          opacity={cloudOpacity}
          visible={settings.shellCount > 0}
        />

        <ProjectNodes
          radius={2.5}
          hoveredNode={hoveredNode}
          selectedNode={selectedProject}
          focusedNode={focusedNode}
          onHover={setHoveredNode}
          onSelect={handleNodeSelect}
        />
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />

      {/* Key light */}
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />

      {/* Rim light for edge definition */}
      <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#22d3ee" />
    </>
  );
}

export default function CloudGlobeCanvas({
  onProjectSelect,
  selectedProject,
  isBlurred = false,
}: CloudGlobeCanvasProps) {
  const [focusedNode, setFocusedNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get initial quality settings
  const initialSettings = getInitialQualitySettings();

  // Keyboard navigation
  const sortedIndices = getSortedIndicesByTheta(
    fibonacciSphere(projects.length, 2, 0.15),
    projects.length
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedProject !== null) {
        if (e.key === "Escape") {
          onProjectSelect(-1); // Signal to close
        }
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const currentSortedIndex = focusedNode !== null ? sortedIndices.indexOf(focusedNode) : -1;
        let nextSortedIndex: number;

        if (e.shiftKey) {
          nextSortedIndex =
            currentSortedIndex <= 0 ? sortedIndices.length - 1 : currentSortedIndex - 1;
        } else {
          nextSortedIndex =
            currentSortedIndex >= sortedIndices.length - 1 ? 0 : currentSortedIndex + 1;
        }

        setFocusedNode(sortedIndices[nextSortedIndex]);
      }

      if ((e.key === "Enter" || e.key === " ") && focusedNode !== null) {
        e.preventDefault();
        onProjectSelect(focusedNode);
      }
    },
    [focusedNode, selectedProject, sortedIndices, onProjectSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[500px] md:h-[600px] transition-all duration-500 ${
        isBlurred ? "blur-sm scale-95" : ""
      }`}
      tabIndex={0}
      role="application"
      aria-label="Interactive 3D project globe. Use Tab to navigate between projects, Enter to select."
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
        <GlobeScene
          onProjectSelect={onProjectSelect}
          selectedProject={selectedProject}
          focusedNode={focusedNode}
          onFocusChange={setFocusedNode}
        />
      </Canvas>
    </div>
  );
}

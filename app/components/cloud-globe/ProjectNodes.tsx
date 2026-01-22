"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import { projects } from "./utils/projectData";

interface ProjectNodesProps {
  radius?: number;
  hoveredNode: number | null;
  selectedNode: number | null;
  focusedNode: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
  visible?: boolean;
}

// Generate positions in an orbital pattern
function generateOrbitalPositions(count: number, baseRadius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    // Vary the radius slightly for depth
    const radiusVariation = 0.3 * Math.sin(i * 1.5);
    const r = baseRadius + radiusVariation;
    // Add slight Y variation for 3D feel
    const y = Math.sin(angle * 2) * 0.4;

    positions.push(new THREE.Vector3(
      Math.cos(angle) * r,
      y,
      Math.sin(angle) * r
    ));
  }

  return positions;
}

export default function ProjectNodes({
  radius = 2.5,
  hoveredNode,
  selectedNode,
  focusedNode,
  onHover,
  onSelect,
  visible = true,
}: ProjectNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Group | null)[]>([]);
  const scalesRef = useRef<number[]>(new Array(projects.length).fill(1));

  // Generate orbital positions
  const positions = useMemo(() => {
    return generateOrbitalPositions(projects.length, radius);
  }, [radius]);

  // Animate nodes
  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow orbital rotation of the entire group
    groupRef.current.rotation.y += 0.002;

    // Animate individual nodes
    nodesRef.current.forEach((node, index) => {
      if (!node) return;

      // Calculate target scale
      let targetScale = 1;
      if (selectedNode !== null && selectedNode !== index) {
        targetScale = 0;
      } else if (hoveredNode === index) {
        targetScale = 1.3;
      } else if (focusedNode === index) {
        targetScale = 1.15;
      }

      // Smooth interpolation
      scalesRef.current[index] = THREE.MathUtils.lerp(
        scalesRef.current[index],
        targetScale,
        0.1
      );

      node.scale.setScalar(scalesRef.current[index]);

      // Floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 2 + index) * 0.05;
      node.position.y = positions[index].y + floatY;

      // Face camera
      node.lookAt(state.camera.position);
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <group
          key={project.id}
          ref={(el) => { nodesRef.current[index] = el; }}
          position={[positions[index].x, positions[index].y, positions[index].z]}
        >
          {/* Project card using HTML */}
          <Html
            center
            distanceFactor={8}
            style={{
              transition: "all 0.3s ease",
              opacity: selectedNode !== null && selectedNode !== index ? 0 : 1,
            }}
          >
            <div
              onClick={() => onSelect(index)}
              onMouseEnter={() => {
                onHover(index);
                document.body.style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                onHover(null);
                document.body.style.cursor = "auto";
              }}
              className={`
                relative w-[120px] h-[120px] rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 transform
                ${hoveredNode === index ? "scale-110 shadow-2xl shadow-cyan-500/50" : "shadow-xl shadow-purple-500/30"}
                ${focusedNode === index ? "ring-2 ring-cyan-400" : ""}
              `}
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(34,211,238,0.2) 100%)",
                border: hoveredNode === index ? "2px solid #22d3ee" : "2px solid rgba(124,58,237,0.5)",
              }}
            >
              {/* Project Image */}
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover"
                draggable={false}
                sizes="120px"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 via-transparent to-transparent" />

              {/* Project title */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2">
                  {project.title.length > 30 ? project.title.slice(0, 30) + "..." : project.title}
                </p>
              </div>

              {/* Hover glow effect */}
              {hoveredNode === index && (
                <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none" />
              )}
            </div>
          </Html>
        </group>
      ))}

      {/* Tooltip for hovered node */}
      {hoveredNode !== null && selectedNode === null && (
        <Html
          position={[
            positions[hoveredNode].x,
            positions[hoveredNode].y + 1.2,
            positions[hoveredNode].z,
          ]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-[#0a0118]/95 backdrop-blur-md border border-[#7c3aed]/50 rounded-xl px-4 py-3 shadow-xl shadow-purple-500/30 max-w-[250px]">
            <p className="text-white text-sm font-semibold mb-2">
              {projects[hoveredNode].title}
            </p>
            <div className="flex flex-wrap gap-1">
              {projects[hoveredNode].stack.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

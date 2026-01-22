"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import { certificates } from "./utils/certificateData";
import { Award } from "lucide-react";

interface CertificateNodesProps {
  radius?: number;
  hoveredNode: number | null;
  selectedNode: number | null;
  focusedNode: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
  visible?: boolean;
}

// Generate positions in a clean circular pattern with good spacing
function generateOrbitalPositions(count: number, baseRadius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    // Keep radius consistent for clean circle
    const r = baseRadius;
    // Minimal Y variation for subtle 3D effect
    const y = Math.sin(angle * 2) * 0.3;

    positions.push(new THREE.Vector3(
      Math.cos(angle) * r,
      y,
      Math.sin(angle) * r
    ));
  }

  return positions;
}

export default function CertificateNodes({
  radius = 3.0,
  hoveredNode,
  selectedNode,
  focusedNode,
  onHover,
  onSelect,
  visible = true,
}: CertificateNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Group | null)[]>([]);
  const scalesRef = useRef<number[]>(new Array(certificates.length).fill(1));

  // Generate orbital positions
  const positions = useMemo(() => {
    return generateOrbitalPositions(certificates.length, radius);
  }, [radius]);

  // Animate nodes
  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow orbital rotation of the entire group
    groupRef.current.rotation.y += 0.0015;

    // Animate individual nodes
    nodesRef.current.forEach((node, index) => {
      if (!node) return;

      // Calculate target scale
      let targetScale = 1;
      if (selectedNode !== null && selectedNode !== index) {
        targetScale = 0;
      } else if (hoveredNode === index) {
        targetScale = 1.2;
      } else if (focusedNode === index) {
        targetScale = 1.1;
      }

      // Smooth interpolation
      scalesRef.current[index] = THREE.MathUtils.lerp(
        scalesRef.current[index],
        targetScale,
        0.1
      );

      node.scale.setScalar(scalesRef.current[index]);

      // Floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 1.5 + index * 0.8) * 0.08;
      node.position.y = positions[index].y + floatY;

      // Face camera
      node.lookAt(state.camera.position);
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {certificates.map((cert, index) => (
        <group
          key={cert.id}
          ref={(el) => { nodesRef.current[index] = el; }}
          position={[positions[index].x, positions[index].y, positions[index].z]}
        >
          {/* Compact certificate icon */}
          <Html
            center
            distanceFactor={15}
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
                relative w-[80px] h-[80px] rounded-xl overflow-hidden cursor-pointer
                transition-all duration-300 transform
                ${hoveredNode === index ? "scale-125 shadow-2xl shadow-cyan-500/60" : "shadow-lg shadow-purple-500/40"}
                ${focusedNode === index ? "ring-2 ring-cyan-400" : ""}
              `}
              style={{
                border: hoveredNode === index ? "2px solid #22d3ee" : "2px solid rgba(124,58,237,0.6)",
              }}
            >
              {/* Certificate Image */}
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover"
                draggable={false}
                sizes="80px"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent" />

              {/* Issuer icon badge */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                <div className="px-2 py-0.5 bg-[#0a0118]/90 backdrop-blur-sm rounded-full border border-purple-500/40">
                  <span className="text-[8px] text-purple-300 font-semibold whitespace-nowrap">
                    {cert.issuer.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Hover glow */}
              {hoveredNode === index && (
                <div className="absolute inset-0 bg-cyan-400/20 pointer-events-none" />
              )}
            </div>
          </Html>
        </group>
      ))}

      {/* Tooltip for hovered node */}
      {hoveredNode !== null && selectedNode === null && (
        <Html
          position={[
            positions[hoveredNode].x * 0.6,
            positions[hoveredNode].y + 1.2,
            positions[hoveredNode].z * 0.6,
          ]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-[#0a0118]/95 backdrop-blur-md border border-[#7c3aed]/50 rounded-lg px-3 py-2 shadow-xl shadow-purple-500/30 max-w-[220px]">
            <p className="text-white text-xs font-semibold mb-1 line-clamp-2">
              {certificates[hoveredNode].title}
            </p>
            <p className="text-purple-400 text-[10px]">
              {certificates[hoveredNode].issuer}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

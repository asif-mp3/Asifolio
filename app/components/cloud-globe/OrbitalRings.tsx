"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitalRingsProps {
  visible?: boolean;
  opacity?: number;
}

export default function OrbitalRings({ visible = true, opacity = 1 }: OrbitalRingsProps) {
  const ringsRef = useRef<THREE.Group>(null);

  // Animate rings rotation
  useFrame((state) => {
    if (!ringsRef.current) return;
    // Slow rotation
    ringsRef.current.rotation.y += 0.001;
  });

  if (!visible) return null;

  // Ring configurations - scaled for larger orbit
  const rings = [
    { inner: 2.0, outer: 2.06, tiltX: 0.2, tiltZ: 0.08, color: "#7c3aed", opacity: 0.5 },
    { inner: 2.6, outer: 2.66, tiltX: -0.15, tiltZ: 0.12, color: "#22d3ee", opacity: 0.35 },
    { inner: 3.2, outer: 3.26, tiltX: 0.1, tiltZ: -0.15, color: "#7c3aed", opacity: 0.4 },
    { inner: 3.8, outer: 3.86, tiltX: -0.08, tiltZ: 0.18, color: "#22d3ee", opacity: 0.25 },
  ];

  return (
    <group ref={ringsRef}>
      {/* Central glow orb */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.7 * opacity} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.15 * opacity} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.08 * opacity} />
      </mesh>

      {/* Orbital rings */}
      {rings.map((ring, index) => (
        <mesh
          key={index}
          rotation={[Math.PI / 2 + ring.tiltX, 0, ring.tiltZ]}
        >
          <ringGeometry args={[ring.inner, ring.outer, 128]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity * opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Dashed orbit paths - certificate orbit indicator */}
      {[2.3, 2.9, 3.5, 4.1].map((radius, index) => (
        <mesh
          key={`dashed-${index}`}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.1 * opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Ambient glow particles - larger spread */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={150}
            array={new Float32Array(
              Array.from({ length: 450 }, () => (Math.random() - 0.5) * 10)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7c3aed"
          size={0.025}
          transparent
          opacity={0.4 * opacity}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

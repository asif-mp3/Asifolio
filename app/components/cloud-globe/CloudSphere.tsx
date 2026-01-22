"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cloudVertexShader, cloudFragmentShader } from "./shaders/cloudShader";

interface CloudSphereProps {
  radius?: number;
  shellCount?: number;
  opacity?: number;
  visible?: boolean;
}

export default function CloudSphere({
  radius = 2,
  shellCount = 6,
  opacity = 1,
  visible = true,
}: CloudSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.ShaderMaterial[]>([]);

  // Shell radii from inner to outer
  const shellRadii = useMemo(() => {
    if (shellCount === 0) return [];
    const radii: number[] = [];
    for (let i = 0; i < shellCount; i++) {
      // Radii from 0.85 to 1.15 of base radius
      const t = i / (shellCount - 1);
      radii.push(radius * (0.85 + t * 0.3));
    }
    return radii;
  }, [radius, shellCount]);

  // Create shader materials for each shell
  const materials = useMemo(() => {
    return shellRadii.map((_, index) => {
      const material = new THREE.ShaderMaterial({
        vertexShader: cloudVertexShader,
        fragmentShader: cloudFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColorPurple: { value: new THREE.Color("#7c3aed") },
          uColorCyan: { value: new THREE.Color("#22d3ee") },
          uOpacity: { value: opacity },
          uShellIndex: { value: index },
          uTotalShells: { value: shellCount },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: index < shellCount / 2 ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      return material;
    });
  }, [shellRadii, shellCount, opacity]);

  // Store materials for animation
  materialsRef.current = materials;

  // Animate time uniform
  useFrame((state) => {
    materialsRef.current.forEach((material) => {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uOpacity.value = opacity;
    });
  });

  if (!visible || shellCount === 0) return null;

  return (
    <group ref={groupRef}>
      {shellRadii.map((shellRadius, index) => (
        <mesh key={index} renderOrder={index}>
          <sphereGeometry args={[shellRadius, 32, 32]} />
          <primitive object={materials[index]} attach="material" />
        </mesh>
      ))}

      {/* Inner glow point light */}
      <pointLight
        color="#7c3aed"
        intensity={0.5}
        distance={radius * 3}
        decay={2}
      />

      {/* Ambient fill */}
      <ambientLight color="#7c3aed" intensity={0.1} />
    </group>
  );
}

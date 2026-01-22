"use client";

import { useRef, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface GlobeInteractionConfig {
  autoRotateSpeed: number;
  dragSensitivity: number;
  inertiaDecay: number;
  parallaxStrength: number;
  maxVerticalAngle: number;
  enabled: boolean;
}

const defaultConfig: GlobeInteractionConfig = {
  autoRotateSpeed: 0.002,
  dragSensitivity: 0.005,
  inertiaDecay: 0.95,
  parallaxStrength: 0.02,
  maxVerticalAngle: Math.PI / 3,
  enabled: true,
};

export function useGlobeInteraction(
  groupRef: React.RefObject<THREE.Group>,
  config: Partial<GlobeInteractionConfig> = {}
) {
  const mergedConfig = { ...defaultConfig, ...config };

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });
  const storedRotation = useRef({ x: 0, y: 0 });

  const { gl } = useThree();

  // Pointer down handler
  const handlePointerDown = useCallback((e: PointerEvent) => {
    if (!mergedConfig.enabled) return;

    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };

    gl.domElement.style.cursor = "grabbing";
  }, [gl.domElement, mergedConfig.enabled]);

  // Pointer move handler
  const handlePointerMove = useCallback((e: PointerEvent) => {
    // Update mouse position for parallax (always)
    const rect = gl.domElement.getBoundingClientRect();
    mousePosition.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };

    if (!isDragging.current || !mergedConfig.enabled) return;

    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    velocity.current = {
      x: deltaX * mergedConfig.dragSensitivity,
      y: deltaY * mergedConfig.dragSensitivity,
    };

    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, [gl.domElement, mergedConfig.enabled, mergedConfig.dragSensitivity]);

  // Pointer up handler
  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    gl.domElement.style.cursor = "grab";
  }, [gl.domElement]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!mergedConfig.enabled || e.touches.length !== 1) return;

    isDragging.current = true;
    lastPointer.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    velocity.current = { x: 0, y: 0 };
  }, [mergedConfig.enabled]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current || !mergedConfig.enabled || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - lastPointer.current.x;
    const deltaY = e.touches[0].clientY - lastPointer.current.y;

    velocity.current = {
      x: deltaX * mergedConfig.dragSensitivity,
      y: deltaY * mergedConfig.dragSensitivity,
    };

    lastPointer.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, [mergedConfig.enabled, mergedConfig.dragSensitivity]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Setup event listeners
  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);

      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    gl.domElement,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Animation frame update
  useFrame(() => {
    if (!groupRef.current || !mergedConfig.enabled) return;

    if (isDragging.current) {
      // Apply velocity directly while dragging
      rotation.current.y += velocity.current.x;
      rotation.current.x += velocity.current.y;

      // Clamp vertical rotation
      rotation.current.x = THREE.MathUtils.clamp(
        rotation.current.x,
        -mergedConfig.maxVerticalAngle,
        mergedConfig.maxVerticalAngle
      );
    } else {
      // Apply inertia decay
      velocity.current.x *= mergedConfig.inertiaDecay;
      velocity.current.y *= mergedConfig.inertiaDecay;

      rotation.current.y += velocity.current.x;
      rotation.current.x += velocity.current.y;

      // Clamp vertical rotation
      rotation.current.x = THREE.MathUtils.clamp(
        rotation.current.x,
        -mergedConfig.maxVerticalAngle,
        mergedConfig.maxVerticalAngle
      );

      // Auto-rotate when velocity is low
      const velocityMagnitude = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
      if (velocityMagnitude < 0.001) {
        rotation.current.y += mergedConfig.autoRotateSpeed;
      }
    }

    // Apply parallax offset based on mouse position
    const parallaxX = mousePosition.current.y * mergedConfig.parallaxStrength;
    const parallaxY = mousePosition.current.x * mergedConfig.parallaxStrength;

    // Apply rotation to group
    groupRef.current.rotation.x = rotation.current.x + parallaxX;
    groupRef.current.rotation.y = rotation.current.y + parallaxY;
  });

  // Store and restore rotation (for detail view transitions)
  const storeRotation = useCallback(() => {
    storedRotation.current = { ...rotation.current };
  }, []);

  const restoreRotation = useCallback(() => {
    rotation.current = { ...storedRotation.current };
    velocity.current = { x: 0, y: 0 };
  }, []);

  // Rotate to show a specific node
  const rotateToNode = useCallback((position: THREE.Vector3, duration: number = 500) => {
    const targetY = Math.atan2(position.x, position.z);
    const targetX = Math.asin(position.y / position.length());

    // Animate to target (simple linear for now)
    const startY = rotation.current.y;
    const startX = rotation.current.x;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      rotation.current.y = startY + (targetY - startY) * eased;
      rotation.current.x = startX + (targetX - startX) * eased;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return {
    isDragging: isDragging.current,
    storeRotation,
    restoreRotation,
    rotateToNode,
  };
}

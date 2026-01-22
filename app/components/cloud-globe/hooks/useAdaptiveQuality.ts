"use client";

import { useState, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";

export type QualityLevel = "high" | "medium" | "low";

export interface QualitySettings {
  shellCount: number;
  nodeSegments: number;
  dpr: number;
  antialias: boolean;
  enableParticles: boolean;
}

const qualityPresets: Record<QualityLevel, QualitySettings> = {
  high: {
    shellCount: 6,
    nodeSegments: 16,
    dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2),
    antialias: true,
    enableParticles: true,
  },
  medium: {
    shellCount: 3,
    nodeSegments: 8,
    dpr: 1.5,
    antialias: true,
    enableParticles: true,
  },
  low: {
    shellCount: 0, // Disable cloud shells entirely
    nodeSegments: 4,
    dpr: 1,
    antialias: false,
    enableParticles: false,
  },
};

export function useAdaptiveQuality(initialQuality: QualityLevel = "high") {
  const [quality, setQuality] = useState<QualityLevel>(initialQuality);
  const frameTimesRef = useRef<number[]>([]);
  const lastCheckRef = useRef(0);
  const stableCountRef = useRef(0);

  // Sample FPS and adjust quality
  useFrame((state) => {
    const now = state.clock.getElapsedTime();
    const delta = state.clock.getDelta();

    // Store frame time
    frameTimesRef.current.push(delta);

    // Check every 2 seconds
    if (now - lastCheckRef.current < 2) return;
    lastCheckRef.current = now;

    // Need at least 30 samples
    if (frameTimesRef.current.length < 30) return;

    // Calculate average FPS
    const avgFrameTime =
      frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
    const fps = 1 / avgFrameTime;

    // Clear samples
    frameTimesRef.current = [];

    // Adjust quality based on FPS
    if (fps < 30 && quality !== "low") {
      setQuality("low");
      stableCountRef.current = 0;
    } else if (fps < 45 && quality === "high") {
      setQuality("medium");
      stableCountRef.current = 0;
    } else if (fps > 55 && quality !== "high") {
      // Only upgrade quality if stable for 3 consecutive checks
      stableCountRef.current++;
      if (stableCountRef.current >= 3) {
        setQuality(quality === "low" ? "medium" : "high");
        stableCountRef.current = 0;
      }
    } else {
      stableCountRef.current = 0;
    }
  });

  const getSettings = useCallback((): QualitySettings => {
    return qualityPresets[quality];
  }, [quality]);

  const forceQuality = useCallback((level: QualityLevel) => {
    setQuality(level);
    stableCountRef.current = 0;
  }, []);

  return {
    quality,
    settings: qualityPresets[quality],
    getSettings,
    forceQuality,
  };
}

// Static version for initial canvas setup (before R3F context is available)
export function getInitialQualitySettings(): QualitySettings {
  // Check if we're on a low-end device
  if (typeof window === "undefined") return qualityPresets.medium;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check for WebGL support level
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

  if (!gl) return qualityPresets.low;

  // Check GPU renderer for known low-end indicators
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
    const isLowEnd =
      renderer.includes("intel") ||
      renderer.includes("mali-4") ||
      renderer.includes("adreno 3") ||
      renderer.includes("powervr");

    if (isLowEnd) return qualityPresets.low;
  }

  if (isMobile) return qualityPresets.medium;

  return qualityPresets.high;
}

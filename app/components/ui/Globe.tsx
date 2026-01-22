"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.6,
  mapSamples: 16000,
  mapBrightness: 1.5,
  baseColor: [0.4, 0.3, 0.5],
  markerColor: [124 / 255, 58 / 255, 237 / 255],
  glowColor: [100 / 255, 80 / 255, 200 / 255],
  markers: [
    { location: [12.9716, 77.5946], size: 0.12 },
    { location: [13.0827, 80.2707], size: 0.12 },
    { location: [37.7749, -122.4194], size: 0.1 },
    { location: [47.6062, -122.3321], size: 0.1 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [35.6762, 139.6503], size: 0.08 },
    { location: [1.3521, 103.8198], size: 0.08 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerX = useRef(0);
  const phiRef = useRef(0);
  const velocityRef = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          // Apply velocity with friction when not dragging
          phiRef.current += velocityRef.current;
          velocityRef.current *= 0.95; // Friction

          // Add slow auto-rotation when velocity is very low
          if (Math.abs(velocityRef.current) < 0.001) {
            phiRef.current += 0.003;
          }
        }
        state.phi = phiRef.current;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    pointerX.current = e.clientX;
    velocityRef.current = 0;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  const onPointerMove = useCallback((clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerX.current;
      pointerX.current = clientX;

      // Update phi directly and track velocity
      const movement = delta * 0.01;
      phiRef.current += movement;
      velocityRef.current = movement;
    }
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] cursor-grab"
        )}
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onMouseMove={(e) => onPointerMove(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && onPointerMove(e.touches[0].clientX)
        }
      />
    </div>
  );
}

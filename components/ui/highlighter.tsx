"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "highlight" | "underline";
  color?: string;
  className?: string;
  delay?: number;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#3b82f6",
  className,
  delay = 0,
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  if (action === "underline") {
    return (
      <span
        ref={ref}
        className={cn("border-b-2 transition-colors duration-500", className)}
        style={{
          borderColor: shouldAnimate ? color : 'transparent',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone'
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn("px-1 -mx-1 rounded transition-colors duration-500", className)}
      style={{
        backgroundColor: shouldAnimate ? `${color}40` : 'transparent',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone'
      }}
    >
      {children}
    </span>
  );
}

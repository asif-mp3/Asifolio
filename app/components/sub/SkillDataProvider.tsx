"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react";

interface SkillDataProviderProps {
  icon: string;
  name: string;
  width?: number;
  height?: number;
  index: number;
}

export default function SkillDataProvider({
  icon,
  name,
  width = 40,
  height = 40,
  index,
}: SkillDataProviderProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="group relative flex flex-col items-center justify-center"
    >
      <div className="relative p-4 rounded-xl bg-[#0a0118]/50 border border-[#2a0e61] backdrop-blur-sm hover:border-[#7c3aed] transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
        <Icon
          icon={icon}
          width={width}
          height={height}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="mt-2 text-xs text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {name}
      </span>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  gitLink: string;
  liveLink: string;
  about: string;
  stack: string[];
  img: string;
  showInfo?: boolean;
  infoMessage?: string;
}

interface BentoProjectCardProps {
  project: Project;
  index: number;
  onCardClick: (project: Project) => void;
}

export default function BentoProjectCard({
  project,
  index,
  onCardClick,
}: BentoProjectCardProps) {
  // Define bento grid positions for 8 items
  const gridStyles: Record<number, string> = {
    0: "md:col-span-1 md:row-span-2", // Tall left
    1: "md:col-span-2 md:row-span-1", // Wide top right
    2: "md:col-span-1 md:row-span-1", // Standard
    3: "md:col-span-1 md:row-span-1", // Standard
    4: "md:col-span-1 md:row-span-1", // Standard
    5: "md:col-span-1 md:row-span-1", // Standard
    6: "md:col-span-1 md:row-span-1", // Standard
    7: "md:col-span-3 md:row-span-1", // Full width bottom
  };

  const isTall = index === 0;
  const isWide = index === 1 || index === 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onCardClick(project)}
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${gridStyles[index] || ""}`}
    >
      {/* Gradient border wrapper */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-cyan-500/30 p-[1px] group-hover:from-purple-500/60 group-hover:via-purple-400/40 group-hover:to-cyan-400/60 transition-all duration-500">
        <div className="absolute inset-[1px] rounded-xl bg-[#0a0118]" />
      </div>

      {/* Card content */}
      <div className="relative h-full rounded-xl overflow-hidden bg-[#0a0118]">
        {/* Inner glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
        </div>

        {/* Card layout changes based on variant */}
        <div className={`h-full flex ${isTall ? "flex-col" : isWide ? "flex-row" : "flex-col"}`}>
          {/* Image Section */}
          <div
            className={`relative overflow-hidden ${
              isTall
                ? "h-[50%] w-full"
                : isWide
                ? "w-[45%] h-full min-h-[200px]"
                : "h-[50%] w-full"
            }`}
          >
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className={`absolute inset-0 ${isWide ? "bg-gradient-to-r" : "bg-gradient-to-t"} from-[#0a0118] via-[#0a0118]/50 to-transparent`} />

            {/* Floating action buttons - always visible on mobile, hover on desktop */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200">
              {project.gitLink && (
                <motion.a
                  href={project.gitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all touch-target"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 text-white" />
                </motion.a>
              )}
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-purple-600/80 border border-purple-400/30 hover:bg-purple-500 transition-all touch-target"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </motion.a>
              )}
            </div>

            {/* Badge */}
            {project.showInfo && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] md:text-xs font-semibold">
                  Students Pick
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className={`flex-1 p-4 flex flex-col justify-between ${isWide ? "w-[60%]" : ""}`}>
            <div>
              <h3 className="font-bold text-white text-base md:text-lg mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                {project.title}
              </h3>
              <p className={`text-gray-400 text-sm leading-relaxed ${isTall ? "line-clamp-4" : "line-clamp-2"}`}>
                {project.about}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.stack.slice(0, isTall ? 4 : 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] md:text-xs font-medium text-purple-300/80 bg-purple-500/10 border border-purple-500/30 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > (isTall ? 4 : 3) && (
                <span className="px-2 py-0.5 text-[10px] md:text-xs text-gray-500">
                  +{project.stack.length - (isTall ? 4 : 3)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

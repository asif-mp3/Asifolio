"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Tag from "./Tag";
import { useInView } from "react-intersection-observer";
import TiltCard from "../ui/TiltCard";

// @ts-ignore
import "intersection-observer";

export default function FolioCard({
  title,
  img,
  gitLink,
  liveLink,
  about,
  stack,
}: {
  img: string;
  title: string;
  gitLink?: string;
  liveLink: string;
  about: string | React.ReactNode;
  stack: string[];
}) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: "-100px 0px",
    triggerOnce: true,
  });

  return (
    <TiltCard tiltIntensity={5}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7 }}
        className="relative w-full rounded-[20px] bg-[#0a0118]/60 backdrop-blur-lg grid grid-cols-1 items-start lg:grid-cols-12 gap-5 xl:gap-8 p-6 duration-500 transition-all border border-[#2a0e61] hover:border-[#7c3aed] cursor-pointer group overflow-hidden"
        data-no-blobity
        whileHover={{
          scale: 1.02,
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/10 via-transparent to-[#22d3ee]/10" />
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7c3aed]/20 to-[#22d3ee]/20 blur-xl" />
        </div>

        {/* Image Section */}
        <div className="relative w-full lg:col-span-5 rounded-[10px] overflow-hidden bg-gradient-to-br from-[#0a0118] to-[#1a0a2e] border border-[#2a0e61]/50 z-10">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <Image
              src={img || "/placeholder.svg"}
              fill
              alt={title}
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 lg:col-span-7 z-10">
          {/* Title & Actions */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200">
              {title}
            </h2>

            <div className="flex gap-3 md:gap-4 text-2xl sm:text-3xl xl:text-4xl flex-shrink-0">
              {/* Live Link */}
              <Link
                href={liveLink}
                className="rounded-full bg-gradient-to-br from-[#7c3aed] to-[#6366f1] p-3 hover:shadow-lg hover:shadow-purple-500/30 relative group/btn transition-all duration-300"
                target="_blank"
                aria-label="View Live Demo"
                data-blobity
                data-blobity-radius="34"
                data-blobity-magnetic="true"
              >
                <div className="absolute inset-0 rounded-full bg-purple-400/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-md -z-10" />
                <Icon
                  icon="line-md:external-link-rounded"
                  className="relative z-10 text-white group-hover/btn:text-purple-100 transition-colors"
                />
              </Link>

              {/* GitHub Link */}
              <Link
                href={gitLink ?? "#"}
                className="rounded-full bg-gradient-to-br from-[#1a0a2e] to-[#0a0118] border border-[#2a0e61] p-3 hover:border-[#7c3aed] relative group/btn transition-all duration-300"
                target="_blank"
                aria-label="View Github Repo"
                data-blobity
                data-blobity-radius="34"
                data-blobity-magnetic="true"
                {...(!gitLink && {
                  "data-blobity-tooltip": "Privately owned by Offset",
                })}
              >
                <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-md -z-10" />
                <Icon
                  icon="mingcute:github-line"
                  className={`relative z-10 text-white group-hover/btn:text-purple-200 transition-colors ${
                    !gitLink ? "opacity-30" : ""
                  }`}
                />
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div className="flex flex-col gap-3">
            {typeof about === "string" ? (
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-justify">
                {about}
              </p>
            ) : (
              about
            )}
          </div>

          {/* Tech Stack Tags */}
          <div className="flex gap-2 md:gap-3 flex-wrap mt-3">
            {stack.map((tech, index) => (
              <div
                key={index}
                className="hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200"
                data-no-blobity
              >
                <Tag>{tech}</Tag>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

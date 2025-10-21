"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import React from "react";

interface FolioCardProps {
  img: string;
  title: string;
  gitLink?: string;
  liveLink: string;
  about: string | React.ReactNode;
  stack: string[];
}

export default function FolioCard({
  img,
  title,
  gitLink,
  liveLink,
  about,
  stack,
}: FolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full flex flex-col lg:flex-row gap-4 items-start p-6 rounded-xl bg-white/5 hover:shadow-2xl cursor-pointer duration-300"
    >
      {/* Image Section */}
      <div className="flex-shrink-0 w-full lg:w-48 rounded-lg overflow-hidden bg-gray-800/50">
        <div className="relative w-full aspect-square">
          <Image
            src={img || "/placeholder.svg"}
            fill
            alt={title}
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-3">
        {/* Title & Links */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {title}
          </h3>
          <div className="flex gap-2 text-2xl sm:text-3xl">
            <Link
              href={liveLink}
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
              aria-label="View Live Demo"
            >
              <Icon icon="line-md:external-link-rounded" />
            </Link>
            {gitLink && (
              <Link
                href={gitLink}
                target="_blank"
                className="text-white/70 hover:text-white"
                aria-label="View GitHub Repo"
              >
                <Icon icon="mingcute:github-line" />
              </Link>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="text-white/80 text-sm sm:text-base">
          {typeof about === "string" ? <p>{about}</p> : about}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-2">
          {stack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

"use client"
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// @ts-ignore
import "intersection-observer"

export default function FolioCard({
  title,
  img,
  gitLink,
  liveLink,
  about,
  stack,
}: {
  img: string
  title: string
  gitLink?: string
  liveLink: string
  about: string | React.ReactNode
  stack: string[]
}) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: "-100px 0px",
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.7 }}
      className="w-full rounded-[20px] std-backdrop-blur bg-linear-to-r from-[#d9d9d91f] to-[#7373731f] flex gap-4 items-start p-6 duration-700 hover:shadow-2xl transition-shadow border border-white/5 cursor-pointer group"
      data-no-blobity
      whileHover={{ scale: 0.98, borderRadius: "24px" }}
    >
      {/* Image Section */}
      <div className="relative w-32 flex-shrink-0 rounded-[10px] overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 group">
        <div className="relative w-full aspect-square flex items-center justify-center">
          <Image
            src={img || "/placeholder.svg"}
            fill
            alt={title}
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3 flex-1">
        {/* Title & Actions */}
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h2>

          <div className="flex gap-3 md:gap-4 text-2xl sm:text-3xl xl:text-4xl flex-shrink-0">
            {/* Live Link */}
            <Link
              href={liveLink}
              className="rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-3 hover:shadow-lg relative group transition-all duration-300"
              target="_blank"
              aria-label="View Live Demo"
              data-blobity
              data-blobity-radius="34"
              data-blobity-magnetic="true"
            >
              <div className="absolute inset-0 rounded-full bg-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
              <Icon
                icon="line-md:external-link-rounded"
                className="relative z-10 text-white group-hover:text-blue-100 transition-colors"
              />
            </Link>

            {/* GitHub Link */}
            <Link
              href={gitLink ?? "#"}
              className="rounded-full bg-gradient-to-br from-slate-700 to-slate-800 p-3 relative group transition-all duration-300"
              target="_blank"
              aria-label="View Github Repo"
              data-blobity
              data-blobity-radius="34"
              data-blobity-magnetic="true"
              {...(!gitLink && { "data-blobity-tooltip": "Privately owned by Offset" })}
            >
              <div className="absolute inset-0 rounded-full bg-slate-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
              <Icon
                icon="mingcute:github-line"
                className={`relative z-10 text-white group-hover:text-slate-200 transition-colors ${
                  !gitLink ? "opacity-30" : ""
                }`}
              />
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-2">
          {typeof about === "string" ? (
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">{about}</p>
          ) : (
            about
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-1">
          {stack.map((tech, index) => (
            <span
              key={index}
              className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200 cursor-default"
              data-no-blobity
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

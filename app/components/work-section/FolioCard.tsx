"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "./Tag";

// @ts-ignore
import "intersection-observer";
import { useInView } from "react-intersection-observer";

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
  about: string;
  stack: string[];
}) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: "-100px 0px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`w-full rounded-[20px] std-backdrop-blur bg-linear-to-r from-[#d9d9d91f] to-[#7373731f] grid grid-cols-1 items-start lg:grid-cols-12 gap-5 xl:gap-8 p-6 duration-700 hover:shadow-2xl transition-shadow border border-white/5 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Image Section with Perfect Fit */}
      <div className="relative w-full lg:col-span-5 rounded-[10px] overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 group">
        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
          <Image
            src={img}
            fill
            alt={title}
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        </div>
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 lg:col-span-7">
        {/* Title and Action Buttons */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h2>
          
          <div className="flex gap-3 md:gap-4 text-2xl sm:text-3xl xl:text-4xl flex-shrink-0">
            <Link
              href={liveLink}
              className="rounded-full bg-icon-radial p-3 hover:bg-red"
              target="_blank"
              aria-label="View Github Repo"
              data-blobity-radius="34"
              data-blobity-magnetic="true"
            >
              <Icon icon="line-md:external-link-rounded" />
            </Link>
            <Link
              href={`${gitLink ? gitLink : "#"}`}
              className="rounded-full bg-icon-radial p-3"
              target="_blank"
              aria-label="View Live Demo"
              data-blobity-radius="34"
              data-blobity-magnetic="true"
              {...(!gitLink && {
                "data-blobity-tooltip": "Privately owned by Offset",
              })}
            >
              <Icon
                icon="mingcute:github-line"
                className={`${!gitLink && "opacity-30"}`}
              />
            </Link>
          </div>
        </div>

        {/* About Section with Justified Text */}
        <p className="text-base sm:text-lg text-white/80 leading-relaxed text-justify">
          {about}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {stack.map((tech, index) => (
            <div
              key={index}
              className="hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <Tag>{tech}</Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
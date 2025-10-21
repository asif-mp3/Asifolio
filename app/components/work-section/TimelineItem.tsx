"use client";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

// @ts-ignore
import "intersection-observer";

export default function TimelineItem({
  companyImg,
  jobTitle,
  company,
  jobType,
  duration,
  stuffIDid,
}: {
  companyImg: string;
  jobTitle: string;
  company: string;
  jobType: string;
  duration: string;
  stuffIDid: string[];
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-60px 0px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 relative duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Timeline Icon */}
      <div className="flex-shrink-0 mt-2">
        <Image
          src="/position-icon.svg"
          width={24}
          height={24}
          alt="current"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Company Logo and Title */}
        <div className="flex items-start gap-4">
          <Image
            src={companyImg}
            width={70}
            height={70}
            alt="company-image"
            className="flex-shrink-0"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold">{jobTitle}</h1>
            <p className="text-base sm:text-lg font-semibold text-white/80">
              {company} | {jobType}
            </p>
            <p className="text-sm sm:text-base text-white/60">{duration}</p>
          </div>
        </div>

        {/* Stuff I did */}
        <ul className="list-disc list-inside text-white/70 ml-2 mt-2">
          {stuffIDid.map((stuff, index) => (
            <li key={index}>{stuff}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

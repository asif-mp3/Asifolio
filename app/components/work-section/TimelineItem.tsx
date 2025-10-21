"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Timeline Icon */}
      <div className="flex-shrink-0 mt-2">
        <Image src="/position-icon.svg" width={24} height={24} alt="icon" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        {/* Company Logo + Text */}
        <div className="flex items-start gap-2">
          <Image src={companyImg} width={70} height={70} alt="logo" />
          <div className="flex flex-col gap-0">
            <h3 className="text-2xl font-bold text-white m-0">{jobTitle}</h3>
            <p className="text-white/80 font-semibold text-sm m-0">
              {company} | {jobType}
            </p>
            <p className="text-white/60 text-xs m-0">{duration}</p>
          </div>
        </div>

        {/* Bullet points */}
        <ul className="list-disc list-inside text-white/70 ml-0 mt-1 pl-5">
          {stuffIDid.map((item, i) => (
            <li key={i} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

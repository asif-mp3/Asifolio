"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

const CertificateCard = ({
  certificate,
  index,
}: {
  certificate: Certificate;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[420px] lg:w-[480px]"
    >
      <div className="group h-full flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#0f0520] to-[#0a0118] border border-white/5 hover:border-purple-500/30 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
        {/* Image Section */}
        <div className="relative overflow-hidden h-48 md:h-56">
          <Image
            src={certificate.image || "/placeholder.svg"}
            alt={certificate.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 340px, 480px"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-[#0a0118]/30 to-transparent" />

          {/* Issuer Badge */}
          <div className="absolute top-3 left-3">
            <div className="px-2.5 py-1 bg-[#0a0118]/80 backdrop-blur-sm text-white border border-white/10 rounded-full flex items-center gap-1.5 text-[10px] font-semibold">
              <Award className="w-3 h-3 text-purple-400" />
              <span className="text-gray-200 truncate max-w-[120px]">
                {certificate.issuer}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-4 flex flex-col">
          <h3 className="text-sm font-bold mb-2 text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300 min-h-[40px]">
            {certificate.title}
          </h3>

          <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
            {certificate.description}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-4">
            <Calendar className="w-3 h-3" />
            <time dateTime={certificate.date} className="font-medium">
              {format(new Date(certificate.date), "MMM d, yyyy")}
            </time>
          </div>

          {/* CTA Button */}
          <motion.a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="mt-auto w-full min-h-[44px] bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-600 hover:to-purple-500 text-white rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-300 border border-purple-400/20 touch-target"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Certificate</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default function CertificateCarousel({
  certificates,
}: CertificateCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setScrollWidth(containerRef.current.scrollWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [certificates]);

  const maxDrag = Math.min(0, -(scrollWidth - containerWidth - 32));

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.1}
          style={{ x: springX }}
          className="flex gap-5 md:gap-6 cursor-grab active:cursor-grabbing py-4 px-1"
        >
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.title}
              certificate={certificate}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#030014] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#030014] to-transparent pointer-events-none z-10" />

      {/* Swipe/drag hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-2"
      >
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-flex items-center gap-1"
        >
          <span className="hidden sm:inline">Drag</span>
          <span className="sm:hidden">Swipe</span>
          <span>to explore</span>
          <span className="text-purple-400">→</span>
        </motion.span>
      </motion.p>
    </div>
  );
}

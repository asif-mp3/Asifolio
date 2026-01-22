"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Calendar } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { certificates, type Certificate } from "./utils/certificateData";

interface CertificateDetailOverlayProps {
  selectedIndex: number | null;
  onClose: () => void;
}

export default function CertificateDetailOverlay({
  selectedIndex,
  onClose,
}: CertificateDetailOverlayProps) {
  const certificate = selectedIndex !== null ? certificates[selectedIndex] : null;

  return (
    <AnimatePresence>
      {certificate && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#030014]/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-2xl max-h-[85vh] overflow-y-auto"
            style={{ transform: "translate(-50%, -50%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0a0118]/95 backdrop-blur-xl rounded-2xl border border-[#2a0e61] shadow-2xl shadow-purple-500/20 overflow-hidden">
              {/* Header with close button */}
              <div className="relative">
                {/* Certificate Image */}
                <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#7c3aed]/20 to-[#22d3ee]/20">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 640px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent" />
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#030014]/80 backdrop-blur-sm border border-[#2a0e61] text-gray-400 hover:text-white hover:border-[#7c3aed] transition-colors"
                  aria-label="Close certificate details"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Issuer Badge */}
                <div className="absolute top-4 left-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-4 py-2 bg-[#0a0118]/80 backdrop-blur-md rounded-full flex items-center gap-2 border border-purple-500/30"
                  >
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-200 font-medium">
                      {certificate.issuer}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-4">
                  {certificate.title}
                </h2>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={certificate.date} className="text-sm font-medium">
                    Issued: {format(new Date(certificate.date), "MMMM d, yyyy")}
                  </time>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  {certificate.description}
                </p>

                {/* Action Button */}
                <motion.a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Certificate
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

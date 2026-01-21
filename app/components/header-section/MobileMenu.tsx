"use client";

import { useView } from "@/contexts/ViewContext";
import type React from "react";
import type { SetStateAction } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({
  onMenuOpen,
}: {
  onMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { sectionInView } = useView();

  return (
    <AnimatePresence>
      {/* Background overlay with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
        onClick={() => onMenuOpen(false)}
      />

      {/* Menu container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 sm:hidden left-1/2 transform -translate-x-1/2 top-20 rounded-2xl
                   bg-[#030014]/95 backdrop-blur-xl
                   max-w-[90%] w-full mx-auto px-6 py-8 border border-[#7042f8]/30 shadow-2xl shadow-[#7042f8]/10
                   max-h-[calc(100vh-6rem)] overflow-y-auto"
      >
        {/* Navigation Links */}
        <ul
          className="flex flex-col gap-5 text-white/25 mb-6"
          onClick={() => onMenuOpen(false)}
        >
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "skills", label: "Skills" },
            { id: "work", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`${
                sectionInView === item.id ? "text-[#7042f8]" : "text-gray-300"
              } w-fit transition-colors duration-200 hover:text-[#7042f8]`}
            >
              {item.label}
            </Link>
          ))}
        </ul>

        {/* Social & Contact Buttons */}
        <div className="flex justify-center gap-6 pt-4 border-t border-[#7042f8]/20">
          <Link
            className="p-3 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 hover:bg-[#7042f8]/20 hover:border-[#7042f8]/50 transition-all duration-300"
            target="_blank"
            href="https://www.linkedin.com/in/asif2107/"
            aria-label="LinkedIn"
          >
            <Icon icon="mdi:linkedin" className="text-xl text-white" />
          </Link>
          <Link
            className="p-3 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 hover:bg-[#7042f8]/20 hover:border-[#7042f8]/50 transition-all duration-300"
            target="_blank"
            href="https://github.com/asif-mp3"
            aria-label="GitHub"
          >
            <Icon icon="mdi:github" className="text-xl text-white" />
          </Link>
          <Link
            className="p-3 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 hover:bg-[#7042f8]/20 hover:border-[#7042f8]/50 transition-all duration-300"
            target="_blank"
            href="https://x.com/asifitee"
            aria-label="X (Twitter)"
          >
            <Icon icon="ri:twitter-x-fill" className="text-xl text-white" />
          </Link>
          <Link
            className="p-3 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 hover:bg-[#7042f8]/20 hover:border-[#7042f8]/50 transition-all duration-300"
            target="_blank"
            href="mailto:asifoned@gmail.com"
            aria-label="Email"
          >
            <Icon icon="ic:baseline-email" className="text-xl text-white" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

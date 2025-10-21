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
        className="fixed z-50 sm:hidden left-1/2 transform -translate-x-1/2 top-24 rounded-2xl 
                   bg-gradient-to-r from-[#d9d9d91f] to-[#7373731f] backdrop-blur-md
                   max-w-[90%] w-full mx-auto px-6 py-8 border border-white/10 shadow-2xl 
                   max-h-[calc(100vh-6rem)] overflow-y-auto"
      >
        {/* Navigation Links */}
        <ul
          className="flex flex-col gap-5 text-white/25 mb-6"
          onClick={() => onMenuOpen(false)}
        >
          {["home", "work", "certificates", "about", "contact"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className={`${
                sectionInView === section ? "text-white" : ""
              } w-fit transition-colors duration-200 hover:text-white/80`}
            >
              {section === "work" ? "Projects" : section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </ul>

        {/* Social & Contact Buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-lg 
                         bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500
                         transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl border-0"
              target="_blank"
              href="https://www.linkedin.com/in/asif2107/"
              aria-label="LinkedIn"
            >
              <Icon icon="hugeicons:linkedin-01" className="text-2xl text-white" />
            </Link>
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-lg 
                         bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700
                         transition-all duration-300 shadow-lg hover:shadow-slate-500/50 hover:shadow-xl border-0"
              target="_blank"
              href="https://github.com/asif-mp3"
              aria-label="GitHub"
            >
              <Icon icon="hugeicons:github" className="text-2xl text-white" />
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-lg 
                         bg-gradient-to-br from-black to-gray-900 hover:from-gray-800 hover:to-black
                         transition-all duration-300 shadow-lg hover:shadow-gray-700/50 hover:shadow-xl border-0"
              target="_blank"
              href="https://x.com/asifitee"
              aria-label="X (Twitter)"
            >
              <Icon icon="akar-icons:x-fill" className="text-2xl text-white" />
            </Link>
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-lg 
                         bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400
                         transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:shadow-xl border-0"
              target="_blank"
              href="mailto:asifoned@gmail.com"
              aria-label="Email"
            >
              <Icon icon="ic:baseline-email" className="text-2xl text-white" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

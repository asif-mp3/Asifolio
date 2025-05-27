import { useView } from "@/contexts/ViewContext";
import React, { SetStateAction } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

export default function MobileMenu({
  onMenuOpen,
}: {
  onMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { sectionInView } = useView();

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40 sm:hidden"
        onClick={() => onMenuOpen(false)}
      />
      
      {/* Menu content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 sm:hidden left-1/2 transform -translate-x-1/2 top-20 rounded-2xl bg-gradient-to-r from-[#d9d9d91f] to-[#7373731f] max-w-[90%] w-full mx-auto px-6 py-8 std-backdrop-blur border border-white/10 shadow-2xl"
      >
        <ul
          className="flex flex-col gap-5 text-white/25 mb-6"
          onClick={() => onMenuOpen(false)}
        >
          <Link
            href="#home"
            className={`${
              sectionInView === "home" && "text-white"
            } w-fit transition-colors duration-200 hover:text-white/80`}
          >
            Home
          </Link>
          <Link
            href="#work"
            className={`${
              sectionInView === "work" && "text-white"
            } w-fit transition-colors duration-200 hover:text-white/80`}
          >
            Projects
          </Link>
          <Link
            href="#certificates"
            className={`${
              sectionInView === "certificates" && "text-white"
            } w-fit transition-colors duration-200 hover:text-white/80`}
          >
            Certificates
          </Link>
          <Link
            href="#about"
            className={`${
              sectionInView === "about" && "text-white"
            } w-fit transition-colors duration-200 hover:text-white/80`}
          >
            About
          </Link>
          <Link
            href="#contact"
            className={`${
              sectionInView === "contact" && "text-white"
            } w-fit transition-colors duration-200 hover:text-white/80`}
          >
            Contact
          </Link>
        </ul>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-xl bg-gradient-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur transition-all duration-200 hover:from-[#d9d9d925] hover:to-[#7373732f] border border-white/5"
              target="_blank"
              href="https://www.linkedin.com/in/asif2107/"
            >
              <Icon icon="hugeicons:linkedin-01" className="text-2xl text-white/70 hover:text-white transition-colors" />
            </Link>
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-xl bg-gradient-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur transition-all duration-200 hover:from-[#d9d9d925] hover:to-[#7373732f] border border-white/5"
              target="_blank"
              href="https://github.com/asif-mp3"
            >
              <Icon icon="hugeicons:github" className="text-2xl text-white/70 hover:text-white transition-colors" />
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-xl bg-gradient-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur transition-all duration-200 hover:from-[#d9d9d925] hover:to-[#7373732f] border border-white/5"
              target="_blank"
              href="https://x.com/asifitee"
            >
              <Icon icon="akar-icons:x-fill" className="text-2xl text-white/70 hover:text-white transition-colors" />
            </Link>
            <Link
              className="p-4 flex-1 flex justify-center items-center rounded-xl bg-gradient-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur transition-all duration-200 hover:from-[#d9d9d925] hover:to-[#7373732f] border border-white/5"
              target="_blank"
              href="mailto:asifoned@gmail.com"
            >
              <Icon icon="ic:baseline-email" className="text-2xl text-white/70 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

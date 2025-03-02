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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-10 sm:hidden px-6 py-8 top-16 rounded-2xl bg-linear-to-r from-[#d9d9d91f] to-[#7373731f] max-w-[90%] w-full mt-4 std-backdrop-blur"
    >
      <ul
        className="flex flex-col gap-5 text-white/25 mb-6"
        onClick={() => onMenuOpen(false)}
      >
        <Link
          href="#home"
          className={`${sectionInView === "home" && "text-white"} w-fit`}
        >
          Home
        </Link>
        <Link
          href="#work"
          className={`${sectionInView === "work" && "text-white"} w-fit`}
        >
          Projects
        </Link>
        <Link
          href="#certificates"
          className={`${sectionInView === "certificates" && "text-white"} w-fit`}
        >
          Certificates
        </Link>
        <Link
          href="#about"
          className={`${sectionInView === "about" && "text-white"} w-fit`}
        >
          About
        </Link>
        <Link
          href="#contact"
          className={`${sectionInView === "contact" && "text-white"} w-fit`}
        >
          Contact
        </Link>
      </ul>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Link
            className="p-4 flex-1 flex justify-center items-center rounded-xl bg-linear-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur"
            target="_blank"
            href="https://www.linkedin.com/in/asif2107/"
          >
            <Icon icon="hugeicons:linkedin-01" className="text-2xl" />
          </Link>
          <Link
            className="p-4 flex-1 flex justify-center items-center rounded-xl bg-linear-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur"
            target="_blank"
            href="https://github.com/asif-mp3"
          >
            <Icon icon="hugeicons:github" className="text-2xl" />
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            className="p-4 flex-1 flex justify-center items-center rounded-xl bg-linear-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur"
            target="_blank"
            href="https://x.com/asifitee"
          >
            <Icon icon="akar-icons:x-fill" className="text-2xl" />
          </Link>
          <Link
            className="p-4 flex-1 flex justify-center items-center rounded-xl bg-linear-to-r from-[#d9d9d915] to-[#7373731f] std-backdrop-blur"
            target="_blank"
            href="mailto:asifoned@gmail.com"
          >
            <Icon icon="ic:baseline-email" className="text-2xl" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
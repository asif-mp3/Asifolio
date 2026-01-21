"use client";
import { useView } from "@/contexts/ViewContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const { sectionInView } = useView();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="fixed max-w-[90%] xl:max-w-[1223px] w-full z-10 select-none">
        <div className="flex justify-between items-center px-6 py-4 rounded-2xl bg-[#ffffff10] backdrop-blur-lg mt-4 sm:mt-8">
          <Image
            src="/ade-logo.svg"
            width={32}
            height={36}
            alt="logo"
            className="select-none cursor-pointer"
            onClick={handleLogoClick}
          />
          <Icon
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer flex sm:hidden text-2xl"
            icon={`${menuOpen ? "gg:close" : "lucide:menu"}`}
          />

          <ul className="hidden sm:flex gap-8 lg:gap-12 relative">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`relative z-10 transition-colors duration-300 ${
                  sectionInView === item.id
                    ? "text-white"
                    : "text-white/25 hover:text-white/50"
                }`}
              >
                {item.label}
                {sectionInView === item.id && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </ul>

          <div className="gap-5 text-xl hidden sm:flex">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/asif2107/"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon icon="hugeicons:linkedin-01" />
            </Link>
            <Link
              target="_blank"
              href="https://github.com/asif-mp3"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon icon="hugeicons:github" />
            </Link>
            <Link
              target="_blank"
              href="https://x.com/asifitee"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon icon="akar-icons:x-fill" />
            </Link>
            <Link
              target="_blank"
              href="mailto:asifoned@gmail.com"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon icon="ic:baseline-email" />
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onMenuOpen={setMenuOpen} />}
      </AnimatePresence>
    </>
  );
}

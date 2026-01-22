"use client";
import { useView } from "@/contexts/ViewContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certifications" },
  { id: "skills", label: "Skills" },
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
      {/* Fixed full-width header */}
      <div className="w-full h-[65px] fixed top-0 left-0 shadow-lg shadow-blue-900/30 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10">
        <div className="w-full h-full flex items-center justify-between m-auto max-w-[1400px]">
          {/* Logo only */}
          <Link href="#home" className="flex items-center" onClick={handleLogoClick}>
            <Image
              src="/ade-logo.svg"
              width={38}
              height={38}
              alt="logo"
              className="select-none cursor-pointer w-[38px] h-auto"
              draggable={false}
            />
          </Link>

          {/* Desktop Navigation - Elongated pill */}
          <div className="hidden md:flex h-full items-center flex-1 justify-center mx-6">
            <div className="flex items-center justify-center gap-6 lg:gap-8 xl:gap-10 border border-blue-500/20 bg-[#0300145e] px-8 lg:px-12 xl:px-16 py-3 rounded-full text-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`cursor-pointer transition-colors duration-300 text-sm lg:text-base font-medium whitespace-nowrap ${
                    sectionInView === item.id
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-blue-500"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex flex-row gap-5">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/asif2107/"
              className="text-white hover:text-blue-500 transition-colors duration-300"
            >
              <Icon icon="mdi:linkedin" className="h-6 w-6" />
            </Link>
            <Link
              target="_blank"
              href="https://github.com/asif-mp3"
              className="text-white hover:text-blue-500 transition-colors duration-300"
            >
              <Icon icon="mdi:github" className="h-6 w-6" />
            </Link>
            <Link
              target="_blank"
              href="https://x.com/asifitee"
              className="text-white hover:text-blue-500 transition-colors duration-300"
            >
              <Icon icon="ri:twitter-x-fill" className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button - 44px touch target */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/5 active:bg-white/10 transition-colors touch-target tap-scale"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <Icon
              className="text-2xl"
              icon={`${menuOpen ? "gg:close" : "lucide:menu"}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onMenuOpen={setMenuOpen} />}
      </AnimatePresence>
    </>
  );
}

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
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
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
      <div className="w-full h-[65px] fixed top-0 left-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10">
        <div className="w-full h-full flex items-center justify-between m-auto max-w-[1400px]">
          {/* Logo only */}
          <Link href="#home" className="flex items-center" onClick={handleLogoClick}>
            <Image
              src="/ade-logo.svg"
              width={38}
              height={38}
              alt="logo"
              className="select-none cursor-pointer"
              draggable={false}
            />
          </Link>

          {/* Desktop Navigation - Elongated pill */}
          <div className="hidden md:flex h-full items-center">
            <div className="flex items-center justify-center gap-8 lg:gap-10 border border-[#7042f838] bg-[#0300145e] px-10 lg:px-14 py-2.5 rounded-full text-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`cursor-pointer transition-colors duration-300 text-sm whitespace-nowrap ${
                    sectionInView === item.id
                      ? "text-[#b49bff]"
                      : "text-gray-300 hover:text-[#7042f8]"
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
              className="text-white hover:text-[#7042f8] transition-colors duration-300"
            >
              <Icon icon="mdi:linkedin" className="h-6 w-6" />
            </Link>
            <Link
              target="_blank"
              href="https://github.com/asif-mp3"
              className="text-white hover:text-[#7042f8] transition-colors duration-300"
            >
              <Icon icon="mdi:github" className="h-6 w-6" />
            </Link>
            <Link
              target="_blank"
              href="https://x.com/asifitee"
              className="text-white hover:text-[#7042f8] transition-colors duration-300"
            >
              <Icon icon="ri:twitter-x-fill" className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Icon
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer flex md:hidden text-2xl text-white"
            icon={`${menuOpen ? "gg:close" : "lucide:menu"}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onMenuOpen={setMenuOpen} />}
      </AnimatePresence>
    </>
  );
}

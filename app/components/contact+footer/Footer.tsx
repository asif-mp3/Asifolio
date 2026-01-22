"use client";

import { Icon } from "@iconify/react";
import React from "react";

const curYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative mt-10 py-6 px-4 md:px-8 lg:px-12 border-t border-[#2a0e61]/50"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-gray-500">
        <p className="flex items-center gap-1">
          <span>&copy;</span> {curYear} Mohamed Asif
        </p>
        <span className="hidden md:block">|</span>
        <p className="flex items-center gap-1">
          Built with
          <Icon icon="ph:heart-fill" className="text-purple-500 mx-1" />
          Next.js & Three.js
        </p>
      </div>
    </footer>
  );
}

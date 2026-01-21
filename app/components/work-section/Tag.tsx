import React from "react";

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="uppercase whitespace-nowrap bg-[#0a0118]/80 border border-[#2a0e61] px-2 py-[6px] md:py-[6px] md:px-3 rounded-md font-medium text-sm text-purple-200/80 hover:border-[#7c3aed] hover:text-purple-100 transition-colors duration-300">
      {children}
    </p>
  );
}

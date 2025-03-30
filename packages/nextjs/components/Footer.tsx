import React from "react";
import Image from "next/image";
import { SwitchTheme } from "~~/components/SwitchTheme";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-end items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <SwitchTheme className="pointer-events-auto" />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center items-center gap-4 text-sm w-full opacity-60">
          <div className="flex items-center gap-1">
            <div className="relative w-4 h-4 rounded-full overflow-hidden">
              <Image src="/IdeaPie.png" alt="IdeaPie Logo" fill className="object-cover" />
            </div>
            <span className="text-xs">IdeaPie © 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

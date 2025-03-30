import React from "react";
import Image from "next/image";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 pb-1.5 pt-2 px-1 mb-0 lg:mb-0 mt-auto">
      <div className="w-full">
        <div className="flex justify-center items-center gap-4 text-sm w-full opacity-60">
          <div className="flex items-center gap-1">
            <div className="relative w-4 h-4 rounded-full overflow-hidden">
              <Image src="/IdeaPie.png" alt="IdeaPie Logo" fill className="object-cover" />
            </div>
            <span className="text-xs">IdeaPie © 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">Built at ETH Hangzhou</span>
          </div>
        </div>
      </div>
    </div>
  );
};

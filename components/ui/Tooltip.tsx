"use client";

import React, { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1C1B19] text-white text-[11px] rounded-lg shadow-md whitespace-nowrap z-50 select-none pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E3DFD6] bg-white shadow-sm">
      <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
        <table className="w-full text-left text-sm border-collapse">
          {children}
        </table>
      </div>
    </div>
  );
}

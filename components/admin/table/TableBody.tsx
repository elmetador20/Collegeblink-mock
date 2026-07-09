"use client";

import React from "react";

interface TableBodyProps {
  children: React.ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-[#E3DFD6]">
      {children}
    </tbody>
  );
}

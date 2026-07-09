"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative max-w-sm flex-1">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#6B6660]/60" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#E3DFD6] bg-white pl-9 pr-4 py-2.5 text-sm text-[#1C1B19] placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]"
      />
    </div>
  );
}
export default SearchInput;

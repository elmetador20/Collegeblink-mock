"use client";

import React from "react";
import { College, mockColleges } from "@/mock/colleges";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, MapPin } from "lucide-react";

export function TopColleges() {
  // Sort colleges by average package descending and slice first 5
  const topColleges = [...mockColleges]
    .filter((c) => c.avgPackage !== null)
    .sort((a, b) => (b.avgPackage || 0) - (a.avgPackage || 0))
    .slice(0, 5);

  const getInitials = (name: string) => {
    return name
      .replace("Indian Institute of Technology", "IIT")
      .replace("National Institute of Technology", "NIT")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
  };

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Top Performing Colleges
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-1">
            Highest ranking and placement records
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-1">
        {topColleges.map((college, index) => (
          <div
            key={college.id}
            className="flex items-center justify-between gap-4 p-3 rounded-xl border border-[#E3DFD6]/45 dark:border-zinc-800/40 bg-zinc-50/20 dark:bg-zinc-900/10 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800/20 transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Rank indicator badge */}
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F3A5C]/5 dark:bg-zinc-800 text-[11px] font-bold text-[#1F3A5C] dark:text-zinc-300">
                {index === 0 ? (
                  <Trophy className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500/20" />
                ) : (
                  `#${index + 1}`
                )}
              </div>

              <Avatar className="h-9 w-9 border border-[#E3DFD6] dark:border-zinc-800 shrink-0 rounded-lg">
                <AvatarImage src={college.logo || undefined} alt={college.name} />
                <AvatarFallback className="bg-[#1F3A5C]/5 dark:bg-zinc-800 text-[#1F3A5C] dark:text-zinc-300 text-[10px] font-extrabold rounded-lg font-sans">
                  {getInitials(college.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1C1B19] dark:text-zinc-200 truncate">
                  {college.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#6B6660] dark:text-zinc-500">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">
                    {college.city}, {college.state}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-1">
              <div className="flex items-center gap-1 text-xs font-bold text-[#1C1B19] dark:text-zinc-200">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span>{college.avgPackage} LPA</span>
              </div>
              <span className="text-[9px] text-[#6B6660] dark:text-zinc-500 font-semibold uppercase tracking-wider">
                {college.placementRate}% Placed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InstituteFiltersProps {
  onFilterChange: (type: string, value: string) => void;
  activeFilters: Record<string, string>;
}

const filterOptions = [
  {
    id: "type",
    label: "Institute Type",
    options: ["Coaching", "Online Learning", "Professional", "Language School"],
  },
  {
    id: "exams",
    label: "Exams",
    options: ["JEE", "NEET", "CAT", "IBPS", "SSC", "CLAT"],
  },
  {
    id: "city",
    label: "City",
    options: ["Hyderabad", "Delhi", "Mumbai", "Bangalore", "Pune", "Chennai"],
  },
  {
    id: "fees",
    label: "Fees Range",
    options: ["Under 20k", "20k - 50k", "50k - 1L", "Above 1L"],
  },
  {
    id: "scholarship",
    label: "Scholarship",
    options: ["Available", "Not Available"],
  },
];

export function InstituteFilters({ onFilterChange, activeFilters }: InstituteFiltersProps) {
  return (
    <div className="w-full bg-background/80 backdrop-blur-md sticky top-16 z-40 border-b border-border/50 py-3 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Button variant="outline" className="rounded-full flex-shrink-0 border-primary text-primary hover:bg-primary/5">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            All Filters
          </Button>

          <div className="h-6 w-px bg-border/50 mx-2 flex-shrink-0" />

          {filterOptions.map((filter) => (
            <DropdownMenu key={filter.id}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`rounded-full flex-shrink-0 border-border/70 hover:border-primary/50 transition-all ${
                    activeFilters[filter.id] ? "bg-primary/5 border-primary text-primary" : ""
                  }`}
                >
                  {activeFilters[filter.id] || filter.label}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl border-border bg-card p-2 shadow-xl">
                {filter.options.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className="rounded-lg cursor-pointer hover:bg-primary/5 focus:bg-primary/5"
                    onClick={() => onFilterChange(filter.id, option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>
    </div>
  );
}

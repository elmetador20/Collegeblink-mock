"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { COURSES_DATA, Course } from "@/lib/data/courses";

export interface CourseFilterState {
  departments: string[];
  levels: string[];
  modes: string[];
}

interface CourseFiltersProps {
  filters: CourseFilterState;
  onChange: (filters: CourseFilterState) => void;
  onClear: () => void;
}

const DEPARTMENTS = Array.from(new Set(COURSES_DATA.map((c) => c.department))).sort();
const LEVELS: Course["level"][] = ["Undergraduate", "Postgraduate", "Doctoral"];
const MODES: Course["mode"][] = ["Full Time", "Part Time"];

export function CourseFilters({ filters, onChange, onClear }: CourseFiltersProps) {
  const toggleArray = (key: keyof CourseFilterState, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const activeCount = filters.departments.length + filters.levels.length + filters.modes.length;

  return (
    <div className="space-y-6 p-4 lg:p-0">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-foreground/60 hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Department</h4>
        <div className="space-y-2">
          {DEPARTMENTS.map((department) => (
            <label key={department} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.departments.includes(department)}
                onCheckedChange={() => toggleArray("departments", department)}
              />
              <span className="text-sm text-foreground/70">{department}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Level</h4>
        <div className="space-y-2">
          {LEVELS.map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.levels.includes(level)}
                onCheckedChange={() => toggleArray("levels", level)}
              />
              <span className="text-sm text-foreground/70">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Mode</h4>
        <div className="space-y-2">
          {MODES.map((mode) => (
            <label key={mode} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.modes.includes(mode)}
                onCheckedChange={() => toggleArray("modes", mode)}
              />
              <span className="text-sm text-foreground/70">{mode}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
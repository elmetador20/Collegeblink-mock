"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Globe, GraduationCap, Microscope, Briefcase, Scale, MoreHorizontal, BookOpen } from "lucide-react";

interface ExamFiltersProps {
  filters: {
    categories: string[];
    types: string[];
  };
  onChange: (filters: any) => void;
  onClear: () => void;
}

const CATEGORIES = [
  { id: "Engineering", label: "Engineering", icon: GraduationCap },
  { id: "Medical", label: "Medical", icon: Microscope },
  { id: "MBA", label: "MBA", icon: Briefcase },
  { id: "Law", label: "Law", icon: Scale },
  { id: "Language", label: "Language Proficiency", icon: BookOpen },
  { id: "Other", label: "Other Exams", icon: MoreHorizontal },
];

const TYPES = [
  { id: "Domestic", label: "Domestic (India)", icon: Globe },
  { id: "Abroad", label: "International (Abroad)", icon: Globe },
];

export function ExamFilters({ filters, onChange, onClear }: ExamFiltersProps) {
  const toggleCategory = (categoryId: string) => {
    const next = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    onChange({ ...filters, categories: next });
  };

  const toggleType = (typeId: string) => {
    const next = filters.types.includes(typeId)
      ? filters.types.filter((id) => id !== typeId)
      : [...filters.types, typeId];
    onChange({ ...filters, types: next });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 px-1">
          Exam Location
        </h3>
        <div className="space-y-2">
          {TYPES.map((type) => (
            <div
              key={type.id}
              className={cn(
                "group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer",
                filters.types.includes(type.id)
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-500"
                  : "bg-transparent border-transparent hover:bg-muted/50 text-muted-foreground"
              )}
              onClick={() => toggleType(type.id)}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  filters.types.includes(type.id) ? "bg-indigo-500/20" : "bg-muted/50"
                )}>
                  <type.icon className="h-4 w-4" />
                </div>
                <Label className="text-sm font-semibold cursor-pointer">{type.label}</Label>
              </div>
              <Checkbox
                checked={filters.types.includes(type.id)}
                className="rounded-md border-muted-foreground/30 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 px-1">
          Specialization
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={cn(
                "group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer",
                filters.categories.includes(cat.id)
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-500"
                  : "bg-transparent border-transparent hover:bg-muted/50 text-muted-foreground"
              )}
              onClick={() => toggleCategory(cat.id)}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  filters.categories.includes(cat.id) ? "bg-cyan-500/20" : "bg-muted/50"
                )}>
                  <cat.icon className="h-4 w-4" />
                </div>
                <Label className="text-sm font-semibold cursor-pointer">{cat.label}</Label>
              </div>
              <Checkbox
                checked={filters.categories.includes(cat.id)}
                className="rounded-md border-muted-foreground/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClear}
        className="w-full py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border/50 rounded-xl hover:border-border hover:bg-muted/30"
      >
        Reset All Filters
      </button>
    </div>
  );
}

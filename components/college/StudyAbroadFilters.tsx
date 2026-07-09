"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Search } from "lucide-react";

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Singapore", "Ireland", "New Zealand"];
const types = ["PUBLIC", "PRIVATE", "IVY LEAGUE", "RESEARCH", "TECHNICAL"];

interface Filters {
  search: string;
  countries: string[];
  types: string[];
  minFees?: number;
  maxFees?: number;
}

interface StudyAbroadFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}

export function StudyAbroadFilters({ filters, onChange, onClear }: StudyAbroadFiltersProps) {
  const toggleArray = (key: keyof Filters, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const activeCount = [
    ...filters.countries,
    ...filters.types,
    filters.minFees,
    filters.maxFees,
    filters.search,
  ].filter(Boolean).length;

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

      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <Input
          placeholder="Search institutions..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-10 bg-muted border-border text-foreground placeholder:text-foreground/40"
        />
      </div>

      
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Target Country</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/20">
          {countries.map((country) => (
            <label key={country} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.countries.includes(country)}
                onCheckedChange={() => toggleArray("countries", country)}
              />
              <span className="text-sm text-foreground/70">{country}</span>
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Institution Type</h4>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.types.includes(type)}
                onCheckedChange={() => toggleArray("types", type)}
              />
              <span className="text-sm text-foreground/70">{type}</span>
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Approx. Fees (Lakhs INR)</h4>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minFees || ""}
            onChange={(e) => onChange({ ...filters, minFees: e.target.value ? parseInt(e.target.value) : undefined })}
            className="bg-muted border-border text-foreground placeholder:text-foreground/40"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxFees || ""}
            onChange={(e) => onChange({ ...filters, maxFees: e.target.value ? parseInt(e.target.value) : undefined })}
            className="bg-muted border-border text-foreground placeholder:text-foreground/40"
          />
        </div>
      </div>
    </div>
  );
}

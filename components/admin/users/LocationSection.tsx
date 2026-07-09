"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

export function LocationSection({
  city,
  onCityChange,
  state,
  onStateChange,
  stream,
  onStreamChange,
}: {
  city: string;
  onCityChange: (v: string) => void;
  state: string;
  onStateChange: (v: string) => void;
  stream: string;
  onStreamChange: (v: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <MapPin className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Location & Academic Info
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Define geographic locations and core stream directions of the user
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field id="city" label="City">
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className={inputClass}
            placeholder="e.g. Pune"
          />
        </Field>

        <Field id="state" label="State">
          <input
            id="state"
            type="text"
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            className={inputClass}
            placeholder="e.g. Maharashtra"
          />
        </Field>

        <Field id="stream" label="Academic Stream">
          <select
            id="stream"
            value={stream}
            onChange={(e) => onStreamChange(e.target.value)}
            className={inputClass}
          >
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
            <option value="Management">Management</option>
            <option value="Humanities">Humanities</option>
            <option value="Commerce">Commerce</option>
            <option value="Law">Law</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { MapPin, Globe } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

export function LocationSection({
  form,
  update,
  isCityValid,
  isStateValid,
}: {
  form: any;
  update: (k: any, v: any) => void;
  isCityValid: boolean;
  isStateValid: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <MapPin className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Location & Address Information
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Geographic placement and coordinates details
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field id="city" label="City" required error={!isCityValid ? "City is required" : null}>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClass}
            placeholder="e.g. New Delhi"
          />
        </Field>

        <Field id="state" label="State" required error={!isStateValid ? "State is required" : null}>
          <input
            id="state"
            type="text"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            className={inputClass}
            placeholder="e.g. Delhi"
          />
        </Field>

        <Field id="country" label="Country">
          <input
            id="country"
            type="text"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            className={inputClass}
            placeholder="e.g. India"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field id="website" label="Website URL">
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="website"
              type="text"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="e.g. https://www.iitd.ac.in"
            />
          </div>
        </Field>

        <Field id="latitude" label="Latitude">
          <input
            id="latitude"
            type="text"
            value={form.latitude}
            onChange={(e) => update("latitude", e.target.value)}
            className={inputClass}
            placeholder="e.g. 28.5450"
          />
        </Field>

        <Field id="longitude" label="Longitude">
          <input
            id="longitude"
            type="text"
            value={form.longitude}
            onChange={(e) => update("longitude", e.target.value)}
            className={inputClass}
            placeholder="e.g. 77.1926"
          />
        </Field>
      </div>
    </div>
  );
}

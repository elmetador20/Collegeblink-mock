"use client";

import React from "react";
import { Award, DollarSign } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

export function DetailsSection({
  form,
  update,
}: {
  form: any;
  update: (k: any, v: any) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Award className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Academics & Placements
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            NIRF, NAAC ratings, seat capacities, fee structures, and salary statistics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field id="seats" label="Total Intake Seats">
          <input
            id="seats"
            type="number"
            value={form.seats}
            onChange={(e) => update("seats", e.target.value)}
            className={inputClass}
            placeholder="Intake count"
          />
        </Field>

        <Field id="placementRate" label="Placement Rate (%)">
          <input
            id="placementRate"
            type="number"
            step="any"
            value={form.placementRate}
            onChange={(e) => update("placementRate", e.target.value)}
            className={inputClass}
            placeholder="e.g. 98.5"
          />
        </Field>

        <Field id="campusSize" label="Campus Size">
          <input
            id="campusSize"
            type="text"
            value={form.campusSize}
            onChange={(e) => update("campusSize", e.target.value)}
            className={inputClass}
            placeholder="e.g. 320 Acres"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="avgPackage" label="Average Package (LPA)">
          <div className="relative">
            <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="avgPackage"
              type="number"
              step="any"
              value={form.avgPackage}
              onChange={(e) => update("avgPackage", e.target.value)}
              className={`${inputClass} pl-8`}
              placeholder="LPA"
            />
          </div>
        </Field>

        <Field id="highestPackage" label="Highest Package (LPA)">
          <div className="relative">
            <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="highestPackage"
              type="number"
              step="any"
              value={form.highestPackage}
              onChange={(e) => update("highestPackage", e.target.value)}
              className={`${inputClass} pl-8`}
              placeholder="LPA"
            />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="tuitionFees" label="Tuition Fees (Per Year)">
          <div className="relative">
            <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="tuitionFees"
              type="number"
              step="any"
              value={form.tuitionFees}
              onChange={(e) => update("tuitionFees", e.target.value)}
              className={`${inputClass} pl-8`}
              placeholder="e.g. 200000"
            />
          </div>
        </Field>

        <Field id="totalFees" label="Total Fees (Approx Course)">
          <div className="relative">
            <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="totalFees"
              type="number"
              step="any"
              value={form.totalFees}
              onChange={(e) => update("totalFees", e.target.value)}
              className={`${inputClass} pl-8`}
              placeholder="e.g. 800000"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}

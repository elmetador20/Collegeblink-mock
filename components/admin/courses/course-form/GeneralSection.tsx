"use client";

import React from "react";
import { GraduationCap, Clock, Link as LinkIcon, AlertCircle } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

export function GeneralSection({
  form,
  update,
  autoGenerateSlug,
  setAutoGenerateSlug,
  isNameValid,
  isDegreeValid,
  isDurationValid,
  isSlugValid,
}: {
  form: any;
  update: (k: any, v: any) => void;
  autoGenerateSlug: boolean;
  setAutoGenerateSlug: (b: boolean) => void;
  isNameValid: boolean;
  isDegreeValid: boolean;
  isDurationValid: boolean;
  isSlugValid: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <GraduationCap className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Course Essentials
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Specify academic name, degree levels, durations and route identifiers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="name" label="Course Name" required error={!isNameValid ? "Course name is required" : null}>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="e.g. Computer Science and Engineering"
          />
        </Field>

        <Field id="degree" label="Degree Level" required error={!isDegreeValid ? "Degree level is required" : null}>
          <input
            id="degree"
            type="text"
            list="degree-level-options"
            value={form.degree}
            onChange={(e) => update("degree", e.target.value)}
            className={inputClass}
            placeholder="e.g. B.Tech, MBA, M.Tech"
          />
          <datalist id="degree-level-options">
            <option value="B.Tech" />
            <option value="M.Tech" />
            <option value="MBA" />
            <option value="BBA" />
            <option value="B.Sc" />
            <option value="M.Sc" />
            <option value="B.A" />
            <option value="M.A" />
            <option value="B.Com" />
            <option value="MCA" />
          </datalist>
        </Field>

        <Field id="duration" label="Duration (years)" required error={!isDurationValid ? "Valid duration in years is required" : null}>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="duration"
              type="number"
              step="0.5"
              min="0.5"
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="e.g. 4"
            />
          </div>
        </Field>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
              Slug Path Identifier
            </label>
            <label className="flex items-center gap-1.5 text-xs text-[#6B6660] cursor-pointer">
              <input
                type="checkbox"
                checked={autoGenerateSlug}
                onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                className="rounded border-[#E3DFD6] text-[#1F3A5C] h-3.5 w-3.5"
              />
              Auto-generate
            </label>
          </div>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              id="slug"
              type="text"
              value={form.slug}
              onChange={(e) => {
                setAutoGenerateSlug(false);
                update("slug", e.target.value);
              }}
              className={`${inputClass} pl-10 font-mono`}
              placeholder="e.g. btech-computer-science-and-engineering"
            />
          </div>
          {form.slug && (
            <p className="text-[10px] text-[#6B6660] truncate">
              Preview slug URL: <span className="font-mono text-[#8C6422]">/courses/{form.slug}</span>
            </p>
          )}
          {!isSlugValid && form.slug.length > 0 && (
            <p className="text-[11px] text-[#A23B2E] font-medium flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Invalid slug format (lowercase letters, numbers, and hyphens only).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { textareaClass, TagListInput } from "@/components/admin/form-controls";

export function ProspectsSection({
  form,
  update,
}: {
  form: any;
  update: (k: any, v: any) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Sparkles className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Details & Career Prospects
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Compose description profiles and designate typical job placements
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="description" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
              Course Description
            </label>
            <span className="text-[10px] font-bold text-[#6B6660]">
              {form.description.length} / 500 Characters
            </span>
          </div>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value.slice(0, 500))}
            rows={4}
            className={textareaClass}
            placeholder="Overview statement summarizing what students learn in this curriculum..."
          />
        </div>

        <TagListInput
          label="Typical Career prospects & Placements"
          values={form.careerProspects}
          onChange={(v) => update("careerProspects", v)}
          placeholder="Type a career option (e.g. Software Architect, Product Lead) and press Enter"
        />
      </div>
    </div>
  );
}

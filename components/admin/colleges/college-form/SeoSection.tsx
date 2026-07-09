"use client";

import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { TagListInput } from "@/components/admin/form-controls";

export function SeoSection({
  form,
  update,
}: {
  form: any;
  update: (k: any, v: any) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <LinkIcon className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            SEO & Metadata Tags
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Keywords, entrance exams, accreditation badges, and facility lists
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <TagListInput
          label="Facilities"
          values={form.facilities}
          onChange={(v) => update("facilities", v)}
          placeholder="Type facility (e.g. WiFi, Library, Gym) and press Enter"
        />

        <TagListInput
          label="Highlights"
          values={form.highlights}
          onChange={(v) => update("highlights", v)}
          placeholder="Type highlight (e.g. 100% Placements, 50-acre Campus) and press Enter"
        />

        <TagListInput
          label="Accreditation badges"
          values={form.accreditation}
          onChange={(v) => update("accreditation", v)}
          placeholder="Type accreditation (e.g. NBA, AICTE) and press Enter"
        />

        <TagListInput
          label="Entrance exams accepted"
          values={form.entranceExams}
          onChange={(v) => update("entranceExams", v)}
          placeholder="Type entrance exam (e.g. JEE Main, GATE, CAT) and press Enter"
        />

        <TagListInput
          label="SEO Keywords & Tags"
          values={form.tags}
          onChange={(v) => update("tags", v)}
          placeholder="Type tag (e.g. engineering, mba, top-placement) and press Enter"
        />
      </div>
    </div>
  );
}

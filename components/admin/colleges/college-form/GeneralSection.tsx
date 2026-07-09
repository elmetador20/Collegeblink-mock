"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Field, inputClass, textareaClass, TagListInput } from "@/components/admin/form-controls";

export function GeneralSection({
  form,
  update,
  isNameValid,
  autoGenerateSlug,
  setAutoGenerateSlug,
  isSlugValid,
  isTypeValid,
}: {
  form: any;
  update: (k: any, v: any) => void;
  isNameValid: boolean;
  autoGenerateSlug: boolean;
  setAutoGenerateSlug: (b: boolean) => void;
  isSlugValid: boolean;
  isTypeValid: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Sparkles className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            General Information
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Basic identification, classification, and core rankings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="name" label="College Name" required error={!isNameValid ? "Name is required" : null}>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="e.g. IIT Delhi"
          />
        </Field>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
              Slug <span className="text-[#A23B2E]">*</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-[#6B6660] cursor-pointer">
              <input
                type="checkbox"
                checked={autoGenerateSlug}
                onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                className="rounded border-[#E3DFD6] text-[#1F3A5C] h-4 w-4 focus:ring-[#1F3A5C]/35 cursor-pointer"
              />
              Auto-generate
            </label>
          </div>
          <input
            id="slug"
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            disabled={autoGenerateSlug}
            className={`${inputClass} disabled:opacity-50`}
            placeholder="iit-delhi"
          />
          {!isSlugValid && (
            <p className="text-xs text-[#A23B2E] font-medium">Slug is required and must contain lowercase alphanumeric characters or hyphens.</p>
          )}
        </div>

        <Field id="type" label="College Type" required error={!isTypeValid ? "Type is required" : null}>
          <select
            id="type"
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
            className={inputClass}
          >
            <option value="">Select College Type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
            <option value="Autonomous">Autonomous</option>
          </select>
        </Field>

        <Field id="established" label="Established Year">
          <input
            id="established"
            type="number"
            value={form.established}
            onChange={(e) => update("established", e.target.value)}
            className={inputClass}
            placeholder="e.g. 1961"
          />
        </Field>

        <Field id="nirfRank" label="NIRF Ranking">
          <input
            id="nirfRank"
            type="number"
            value={form.nirfRank}
            onChange={(e) => update("nirfRank", e.target.value)}
            className={inputClass}
            placeholder="e.g. 2"
          />
        </Field>

        <Field id="naacRating" label="NAAC Rating">
          <input
            id="naacRating"
            type="text"
            value={form.naacRating}
            onChange={(e) => update("naacRating", e.target.value)}
            className={inputClass}
            placeholder="e.g. A++"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
            Accreditations
          </label>
          <TagListInput
            label="Accreditations"
            values={form.accreditation}
            onChange={(tags) => update("accreditation", tags)}
            placeholder="Add accreditation, press enter (e.g. NBA)"
          />
        </div>

        <div className="space-y-1.5">
          <TagListInput
            label="Entrance Exams"
            values={form.entranceExams}
            onChange={(tags) => update("entranceExams", tags)}
            placeholder="JEE Advanced, GATE, CEED, etc..."
          />
        </div>
      </div>
    </div>
  );
}

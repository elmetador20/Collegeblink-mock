"use client";

import React from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Field, inputClass, textareaClass } from "@/components/admin/form-controls";

interface EditorSectionProps {
  form: any;
  update: (k: any, v: any) => void;
  autoGenerateSlug: boolean;
  setAutoGenerateSlug: (val: boolean) => void;
  autoSaveStatus: string;
  lastSavedTime: string;
  isTitleValid: boolean;
  isSlugValid: boolean;
  isCategoryValid: boolean;
}

export function EditorSection({
  form,
  update,
  autoGenerateSlug,
  setAutoGenerateSlug,
  autoSaveStatus,
  lastSavedTime,
  isTitleValid,
  isSlugValid,
  isCategoryValid,
}: EditorSectionProps) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8C6422]" />
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Article Editor
          </h3>
        </div>
        {/* Auto Save Status Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-[#6B6660] dark:text-zinc-400">
          {autoSaveStatus === "saving" ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-[#8C6422]" />
              <span>Draft saving...</span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Saved locally {lastSavedTime ? `at ${lastSavedTime}` : ""}</span>
            </>
          )}
        </div>
      </div>

      <Field id="title" label="Article Title" required error={!isTitleValid ? "Title is required" : null}>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className={`${inputClass} text-base font-semibold`}
          placeholder="e.g. How to Choose the Best MBA College"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
              Slug URL route <span className="text-[#A23B2E]">*</span>
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
          <input
            id="slug"
            type="text"
            value={form.slug}
            onChange={(e) => {
              setAutoGenerateSlug(false);
              update("slug", e.target.value);
            }}
            className={`${inputClass} font-mono`}
            placeholder="auto-generated-slug-route"
          />
          {!isSlugValid && form.slug.length > 0 && (
            <p className="text-[11px] text-[#A23B2E] font-medium flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Invalid slug characters.
            </p>
          )}
        </div>

        <Field id="category" label="Category (e.g. Admissions, Rankings)" required error={!isCategoryValid ? "Category is required" : null}>
          <input
            id="category"
            type="text"
            list="blog-category-options"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
            placeholder="e.g. Prep Guides"
          />
          <datalist id="blog-category-options">
            <option value="Admissions" />
            <option value="Rankings" />
            <option value="Trends" />
            <option value="Campus Life" />
            <option value="Career" />
            <option value="Finance" />
          </datalist>
        </Field>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between">
          <label htmlFor="summary" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
            SEO Summary / Meta Description <span className="text-[#A23B2E]">*</span>
          </label>
          <span
            className={`text-[10px] font-bold ${
              form.summary.length >= 120 && form.summary.length <= 160
                ? "text-emerald-600"
                : "text-[#6B6660]"
            }`}
          >
            {form.summary.length} / 160 (Target 120-160 optimal)
          </span>
        </div>
        <textarea
          id="summary"
          value={form.summary}
          onChange={(e) => update("summary", e.target.value)}
          rows={3}
          className={textareaClass}
          placeholder="Provide a click-worthy description summarizing the blog article for search engines..."
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between">
          <label htmlFor="content" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
            Article Body (Markdown Supported) <span className="text-[#A23B2E]">*</span>
          </label>
          <span className="text-[10px] font-bold text-[#6B6660]">
            {form.content.length.toLocaleString()} characters
          </span>
        </div>
        <textarea
          id="content"
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={16}
          className={`${textareaClass} font-mono text-sm leading-relaxed`}
          placeholder="Use standard Markdown formatting for headings, bold text, links, lists..."
        />
      </div>
    </div>
  );
}

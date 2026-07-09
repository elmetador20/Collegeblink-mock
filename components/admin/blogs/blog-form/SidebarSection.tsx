"use client";

import React from "react";
import { Calendar, Save, Globe, Flame, Image as ImageIcon, X, Trash2 } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-controls";

interface SidebarSectionProps {
  form: any;
  update: (k: any, v: any) => void;
  publishStatus: "draft" | "published" | "scheduled";
  setPublishStatus: (val: "draft" | "published" | "scheduled") => void;
  scheduleDate: string;
  setScheduleDate: (val: string) => void;
  seoScore: number;
  submitting: boolean;
  isFormValid: boolean;
  mode: "create" | "edit";
  onCancel: () => void;
  onDeleteRequest: () => void;
}

export function SidebarSection({
  form,
  update,
  publishStatus,
  setPublishStatus,
  scheduleDate,
  setScheduleDate,
  seoScore,
  submitting,
  isFormValid,
  mode,
  onCancel,
  onDeleteRequest,
}: SidebarSectionProps) {
  return (
    <div className="space-y-6">
      {/* Publish Workflow Card */}
      <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-5">
        <h4 className="block text-xs font-bold text-[#1C1B19] dark:text-zinc-200 uppercase tracking-widest pb-3 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
          Publish Settings
        </h4>

        {/* Workflow Toggle */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#1C1B19] dark:text-zinc-200">Status Workflow</label>
          <div className="grid grid-cols-3 border border-[#E3DFD6] dark:border-zinc-800 rounded-lg p-0.5 bg-[#FAF8F4] dark:bg-zinc-900">
            {(["draft", "published", "scheduled"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setPublishStatus(st)}
                className={`text-[10px] uppercase font-bold py-1.5 rounded-md transition-all ${
                  publishStatus === st
                    ? "bg-[#1F3A5C] text-white shadow-sm"
                    : "text-[#6B6660] hover:text-[#1C1B19] dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Scheduled Date Picker */}
        {publishStatus === "scheduled" && (
          <div className="space-y-1.5 animate-fadeIn">
            <label htmlFor="scheduleDate" className="block text-xs font-semibold text-[#1C1B19] dark:text-zinc-200">
              Publish Date & Time
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
              <input
                id="scheduleDate"
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className={`${inputClass} pl-10 text-xs`}
              />
            </div>
          </div>
        )}

        <Field id="readTime" label="Reading Time (Estimate)">
          <input
            id="readTime"
            type="text"
            value={form.readTime}
            onChange={(e) => update("readTime", e.target.value)}
            className={inputClass}
            placeholder="e.g. 5 min read"
          />
        </Field>

        {/* Main Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60">
          <button
            type="submit"
            disabled={submitting || !isFormValid}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#1F3A5C] dark:bg-zinc-100 hover:bg-[#1F3A5C]/90 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 py-3 text-sm font-semibold shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Save className="h-4 w-4" />
            {submitting
              ? "Saving..."
              : publishStatus === "scheduled"
              ? "Schedule Post"
              : publishStatus === "draft"
              ? "Save Draft"
              : "Publish Post"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 py-3 text-sm font-semibold active:scale-95 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* SEO Score & Preview Card */}
      <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
          <h4 className="text-xs font-bold text-[#1C1B19] dark:text-zinc-200 uppercase tracking-widest">
            SEO Google Preview
          </h4>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold rounded-lg px-2 py-0.5 border ${
              seoScore >= 80
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                : seoScore >= 50
                ? "bg-amber-50 text-amber-700 border-amber-200/50"
                : "bg-red-50 text-red-700 border-red-200/50"
            }`}
          >
            <Flame className="h-3 w-3" />
            {seoScore}/100 Score
          </span>
        </div>

        {/* Google Search Mock UI */}
        <div className="p-3 border border-[#E3DFD6] dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <Globe className="h-3 w-3 text-emerald-600" />
            <span>https://collegeblink.com/blogs/{form.slug || "your-route"}</span>
          </div>
          <h5 className="text-xs font-semibold text-blue-800 dark:text-blue-400 hover:underline leading-snug line-clamp-1">
            {form.title || "Your Post Title Will Go Here"}
          </h5>
          <p className="text-[10px] text-[#6B6660] dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {form.summary || "Add a summary to preview how this blog post will display inside organic search rankings..."}
          </p>
        </div>
      </div>

      {/* Featured Image & Preview */}
      <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-4">
        <h4 className="block text-xs font-bold text-[#1C1B19] dark:text-zinc-200 uppercase tracking-widest pb-3 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
          Featured Image
        </h4>

        <Field id="image" label="Cover Image URL Link">
          <input
            id="image"
            type="url"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            className={inputClass}
            placeholder="https://images.unsplash.com/..."
          />
        </Field>

        {form.image ? (
          <div className="relative rounded-lg overflow-hidden border border-[#E3DFD6] dark:border-zinc-800 aspect-video bg-[#FAF8F4] group">
            <img src={form.image} alt="Featured cover" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => update("image", "")}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-[#A23B2E] shadow transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="border border-dashed border-[#E3DFD6] dark:border-zinc-800 rounded-lg aspect-video flex flex-col items-center justify-center text-center p-4 bg-zinc-50/50 dark:bg-zinc-900/30">
            <ImageIcon className="h-6 w-6 text-[#6B6660]/40 mb-1.5" />
            <p className="text-[10px] font-semibold text-[#6B6660]">No cover image linked</p>
          </div>
        )}
      </div>

      {/* Delete Block (Edit mode) */}
      {mode === "edit" && (
        <button
          type="button"
          onClick={onDeleteRequest}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-red-200 hover:bg-red-50 dark:border-rose-900/30 dark:hover:bg-rose-950/20 py-3 text-sm font-semibold text-[#A23B2E] transition-all shadow-sm active:scale-95"
        >
          <Trash2 className="h-4 w-4" />
          Delete Article
        </button>
      )}
    </div>
  );
}

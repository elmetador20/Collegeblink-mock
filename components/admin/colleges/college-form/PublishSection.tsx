"use client";

import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function PublishSection({
  form,
  update,
  submitting,
  isFormValid,
  isNameValid,
  isSlugValid,
  isTypeValid,
  isCityValid,
  isStateValid,
  mode,
  onCancel,
}: {
  form: any;
  update: (k: any, v: any) => void;
  submitting: boolean;
  isFormValid: boolean;
  isNameValid: boolean;
  isSlugValid: boolean;
  isTypeValid: boolean;
  isCityValid: boolean;
  isStateValid: boolean;
  mode: "create" | "edit";
  onCancel: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <CheckCircle2 className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Publishing Settings
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Verification status and draft visibility
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="verified"
          type="checkbox"
          checked={form.verified}
          onChange={(e) => update("verified", e.target.checked)}
          className="h-4.5 w-4.5 rounded border-[#E3DFD6] text-[#1F3A5C] focus:ring-[#1F3A5C]/35 cursor-pointer mt-0.5"
        />
        <div>
          <label htmlFor="verified" className="block text-xs font-bold text-[#1C1B19] dark:text-zinc-200 uppercase tracking-wider cursor-pointer">
            Mark as Verified
          </label>
          <p className="text-xs text-[#6B6660] dark:text-zinc-500 mt-1 leading-normal">
            Verified colleges display a check badge, rank higher in recommendations, and support instant reviews prediction.
          </p>
        </div>
      </div>

      {/* Validation summary warnings */}
      {!isFormValid && (
        <div className="p-3.5 rounded-xl border border-red-200/50 bg-red-50/50 dark:bg-rose-950/10 dark:border-rose-900/30 text-xs text-[#A23B2E] space-y-1">
          <p className="font-bold flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            Required fields missing or invalid:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            {!isNameValid && <li>College Name is blank.</li>}
            {!isSlugValid && <li>Slug must be provided and contain only lowercase alphanumeric/hyphen characters.</li>}
            {!isTypeValid && <li>College Type is blank.</li>}
            {!isCityValid && <li>City location is blank.</li>}
            {!isStateValid && <li>State location is blank.</li>}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <button
          type="submit"
          disabled={submitting || !isFormValid}
          className="rounded-xl bg-[#1F3A5C] dark:bg-zinc-100 hover:bg-[#1F3A5C]/90 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-6 py-3 text-sm font-semibold shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {submitting ? "Saving changes..." : mode === "create" ? "Add College" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 px-6 py-3 text-sm font-semibold active:scale-95 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

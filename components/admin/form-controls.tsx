"use client";

import { useState, type KeyboardEvent } from "react";

export const inputClass =
  "w-full rounded-md border border-[#E3DFD6] bg-white px-3 py-2 text-sm text-[#1C1B19] placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/30 focus:border-[#1F3A5C]";

export const textareaClass = `${inputClass} resize-y`;

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#1C1B19]">
        {label}
        {required && <span className="text-[#A23B2E] font-bold"> *</span>}
      </label>
      <div className="relative">
        {children}
      </div>
      {error ? (
        <p className="text-[12px] font-medium text-[#A23B2E]">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-[#6B6660] leading-normal">{hint}</p>
      ) : null}
    </div>
  );
}

export function TagListInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const next = draft.trim();
    if (next && !values.includes(next)) {
      onChange([...values, next]);
    }
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    }
    if (e.key === "Backspace" && draft === "" && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#1C1B19]">{label}</label>
      <div className="flex flex-wrap gap-1.5 rounded-md border border-[#E3DFD6] bg-white px-3 py-2 focus-within:border-[#1F3A5C] focus-within:ring-2 focus-within:ring-[#1F3A5C]/30">
        {values.map((value, index) => (
          <span
            key={value + index}
            className="inline-flex items-center gap-1 rounded-full bg-[#1F3A5C]/[0.08] px-2.5 py-1 text-xs text-[#1F3A5C]"
          >
            {value}
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label={`Remove ${value}`}
              className="text-[#1F3A5C]/60 hover:text-[#1F3A5C]"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={values.length === 0 ? placeholder : ""}
          className="min-w-[120px] flex-1 border-none py-0.5 text-sm outline-none"
        />
      </div>
    </div>
  );
}
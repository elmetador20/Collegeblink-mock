"use client";

import React from "react";
import { ImageIcon, UploadCloud, Link as LinkIcon, X } from "lucide-react";
import { Field, inputClass, textareaClass } from "@/components/admin/form-controls";

export function MediaSection({
  form,
  update,
  dragActiveLogo,
  setDragActiveLogo,
  dragActiveCover,
  setDragActiveCover,
  fileInputLogoRef,
  fileInputCoverRef,
  processImageFile,
}: {
  form: any;
  update: (k: any, v: any) => void;
  dragActiveLogo: boolean;
  setDragActiveLogo: (b: boolean) => void;
  dragActiveCover: boolean;
  setDragActiveCover: (b: boolean) => void;
  fileInputLogoRef: React.RefObject<HTMLInputElement | null>;
  fileInputCoverRef: React.RefObject<HTMLInputElement | null>;
  processImageFile: (file: File, target: "logo" | "coverImage") => void;
}) {
  const handleDrag = (e: React.DragEvent, target: "logo" | "coverImage", isActive: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (target === "logo") setDragActiveLogo(isActive);
    else setDragActiveCover(isActive);
  };

  const handleDrop = (e: React.DragEvent, target: "logo" | "coverImage") => {
    e.preventDefault();
    e.stopPropagation();
    if (target === "logo") setDragActiveLogo(false);
    else setDragActiveCover(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0], target);
    }
  };

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <ImageIcon className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Media & Content
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Upload logo, cover artwork, and compose textual descriptions
          </p>
        </div>
      </div>

      {/* Logo Section */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
          College Logo
        </label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            onDragOver={(e) => handleDrag(e, "logo", true)}
            onDragLeave={(e) => handleDrag(e, "logo", false)}
            onDrop={(e) => handleDrop(e, "logo")}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              dragActiveLogo
                ? "border-[#1F3A5C] bg-[#1F3A5C]/5"
                : "border-[#E3DFD6] dark:border-zinc-800 hover:border-[#1F3A5C]/40"
            }`}
            onClick={() => fileInputLogoRef.current?.click()}
          >
            <UploadCloud className="h-8 w-8 text-[#6B6660] mb-2" />
            <p className="text-xs font-semibold text-[#1C1B19] dark:text-zinc-300">
              Drag & drop logo file here, or click to browse
            </p>
            <p className="text-[10px] text-[#6B6660] mt-1">PNG, JPG, SVG up to 4MB</p>
            <input
              ref={fileInputLogoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && processImageFile(e.target.files[0], "logo")}
            />
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <Field id="logo" label="Logo URL link">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
                <input
                  id="logo"
                  type="url"
                  value={form.logo}
                  onChange={(e) => update("logo", e.target.value)}
                  className={`${inputClass} pl-10`}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </Field>

            {form.logo && (
              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/40">
                <div className="h-10 w-10 shrink-0 border border-[#E3DFD6] dark:border-zinc-700 bg-white rounded flex items-center justify-center overflow-hidden">
                  <img src={form.logo} alt="Logo preview" className="max-h-full max-w-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase text-[#6B6660] tracking-wider">Logo preview</p>
                  <p className="text-xs text-[#1C1B19] dark:text-zinc-300 truncate font-mono mt-0.5">{form.logo}</p>
                </div>
                <button
                  type="button"
                  onClick={() => update("logo", "")}
                  className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-[#A23B2E]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image Section */}
      <div className="space-y-3 pt-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <label className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
          Cover Artwork
        </label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            onDragOver={(e) => handleDrag(e, "coverImage", true)}
            onDragLeave={(e) => handleDrag(e, "coverImage", false)}
            onDrop={(e) => handleDrop(e, "coverImage")}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              dragActiveCover
                ? "border-[#1F3A5C] bg-[#1F3A5C]/5"
                : "border-[#E3DFD6] dark:border-zinc-800 hover:border-[#1F3A5C]/40"
            }`}
            onClick={() => fileInputCoverRef.current?.click()}
          >
            <UploadCloud className="h-8 w-8 text-[#6B6660] mb-2" />
            <p className="text-xs font-semibold text-[#1C1B19] dark:text-zinc-300">
              Drag & drop cover file here, or click to browse
            </p>
            <p className="text-[10px] text-[#6B6660] mt-1">PNG, JPG up to 4MB</p>
            <input
              ref={fileInputCoverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && processImageFile(e.target.files[0], "coverImage")}
            />
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <Field id="coverImage" label="Cover Image URL link">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
                <input
                  id="coverImage"
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => update("coverImage", e.target.value)}
                  className={`${inputClass} pl-10`}
                  placeholder="https://example.com/cover.png"
                />
              </div>
            </Field>

            {form.coverImage && (
              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/40">
                <div className="h-10 w-16 shrink-0 border border-[#E3DFD6] dark:border-zinc-700 bg-white rounded overflow-hidden">
                  <img src={form.coverImage} alt="Cover preview" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase text-[#6B6660] tracking-wider">Cover preview</p>
                  <p className="text-xs text-[#1C1B19] dark:text-zinc-300 truncate font-mono mt-0.5">{form.coverImage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => update("coverImage", "")}
                  className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-[#A23B2E]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Descriptions */}
      <div className="space-y-4 pt-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="description" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
              Short Description
            </label>
            <span className={`text-[10px] font-bold ${form.description.length > 160 ? "text-amber-600" : "text-[#6B6660]"}`}>
              {form.description.length} / 160 Characters
            </span>
          </div>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={2}
            className={textareaClass}
            placeholder="Recommended SEO description summary..."
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="about" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
              About / Overview Profile
            </label>
            <span className="text-[10px] font-bold text-[#6B6660]">
              {form.about.length} / 1000 Characters
            </span>
          </div>
          <textarea
            id="about"
            value={form.about}
            onChange={(e) => update("about", e.target.value)}
            rows={5}
            className={textareaClass}
            placeholder="Detailed HTML overview text displayed on profile pages..."
          />
        </div>
      </div>
    </div>
  );
}

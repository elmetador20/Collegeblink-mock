"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Trash2, X, AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { GeneralSection } from "./GeneralSection";
import { ProspectsSection } from "./ProspectsSection";
import { CollegesSection } from "./CollegesSection";

interface CourseFormValues {
  name: string;
  degree: string;
  duration: string;
  description: string;
  slug: string;
  careerProspects: string[];
}

function toFormState(data?: any): CourseFormValues {
  return {
    name: data?.name ?? "",
    degree: data?.degree ?? "",
    duration: data?.duration?.toString() ?? "",
    description: data?.description ?? "",
    slug: data?.slug ?? "",
    careerProspects: data?.careerProspects ?? [],
  };
}

function toFloatOrNull(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function slugify(name: string, degree: string): string {
  const base = `${degree} ${name}`;
  return base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CourseForm({
  mode,
  courseId,
  initialData,
}: {
  mode: "create" | "edit";
  courseId?: string;
  initialData?: any;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CourseFormValues>(() => toFormState(initialData));
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(mode === "create");
  const [submitting, setSubmitting] = useState(false);

  // Colleges selector state
  const [colleges, setColleges] = useState<any[]>([]);
  const [loadingColleges, setLoadingColleges] = useState(true);
  const [selectedColleges, setSelectedColleges] = useState<string[]>(() => {
    return initialData?.colleges?.map((c: any) => c.collegeId) || [];
  });
  const [collegeSearch, setCollegeSearch] = useState("");

  // Delete modal state (for edit mode delete option)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load colleges list
  useEffect(() => {
    async function loadColleges() {
      try {
        const res = await fetch("/api/admin/colleges?limit=1000");
        if (res.ok) {
          const body = await res.json();
          setColleges(body.data || []);
        } else {
          // Fallback basic colleges list if request fails or offline
          setColleges([
            { id: "col_1", name: "Indian Institute of Technology Delhi", city: "New Delhi", state: "Delhi" },
            { id: "col_2", name: "Indian Institute of Technology Bombay", city: "Mumbai", state: "Maharashtra" },
            { id: "col_3", name: "BITS Pilani", city: "Pilani", state: "Rajasthan" },
            { id: "col_4", name: "Delhi University", city: "New Delhi", state: "Delhi" },
            { id: "col_5", name: "Vellore Institute of Technology", city: "Vellore", state: "Tamil Nadu" },
          ]);
        }
      } catch (err) {
        console.error("Colleges fetch failure", err);
      } finally {
        setLoadingColleges(false);
      }
    }
    loadColleges();
  }, []);

  // Update a form field value
  const update = <K extends keyof CourseFormValues>(key: K, value: CourseFormValues[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if ((key === "name" || key === "degree") && autoGenerateSlug) {
        next.slug = slugify(next.name, next.degree);
      }
      return next;
    });
  };

  // Keep slug synced with auto-generator
  useEffect(() => {
    if (autoGenerateSlug && (form.name || form.degree)) {
      update("slug", slugify(form.name, form.degree));
    }
  }, [autoGenerateSlug]);

  // Validation
  const isNameValid = form.name.trim().length > 0;
  const isDegreeValid = form.degree.trim().length > 0;
  const isDurationValid = form.duration.trim().length > 0 && !isNaN(Number(form.duration)) && Number(form.duration) > 0;
  const isSlugValid = form.slug.trim().length === 0 || /^[a-z0-9-]+$/.test(form.slug);

  const isFormValid = isNameValid && isDegreeValid && isDurationValid && isSlugValid;

  // Filtered colleges list based on search string
  const filteredColleges = colleges.filter((col) =>
    col.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    col.city.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    col.state.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  // Toggle college selection
  const handleToggleCollege = (cId: string) => {
    setSelectedColleges((prev) =>
      prev.includes(cId) ? prev.filter((x) => x !== cId) : [...prev, cId]
    );
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields and correct errors.");
      return;
    }

    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      degree: form.degree.trim(),
      duration: toFloatOrNull(form.duration),
      description: form.description.trim() || null,
      careerProspects: form.careerProspects,
      collegeIds: selectedColleges,
      slug: form.slug.trim() || undefined,
    };

    try {
      const url = mode === "create" ? "/api/admin/courses" : `/api/admin/courses/${courseId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save error occurred.");
      }

      toast.success(mode === "create" ? "Course created successfully" : "Course updated successfully");
      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save the course profile.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Mode deletion
  const handleDeleteCourse = async () => {
    if (!courseId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete course.");
      }

      toast.success("Course deleted successfully");
      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete course.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      <GeneralSection
        form={form}
        update={update}
        autoGenerateSlug={autoGenerateSlug}
        setAutoGenerateSlug={setAutoGenerateSlug}
        isNameValid={isNameValid}
        isDegreeValid={isDegreeValid}
        isDurationValid={isDurationValid}
        isSlugValid={isSlugValid}
      />

      <ProspectsSection
        form={form}
        update={update}
      />

      <CollegesSection
        colleges={colleges}
        loadingColleges={loadingColleges}
        selectedColleges={selectedColleges}
        setSelectedColleges={setSelectedColleges}
        collegeSearch={collegeSearch}
        setCollegeSearch={setCollegeSearch}
        filteredColleges={filteredColleges}
        handleToggleCollege={handleToggleCollege}
      />

      {/* Validation Warning Box */}
      {!isFormValid && (
        <div className="p-3.5 rounded-xl border border-red-200/50 bg-red-50/50 dark:bg-rose-950/10 dark:border-rose-900/30 text-xs text-[#A23B2E] space-y-1">
          <p className="font-bold flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            Required fields missing or invalid:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            {!isNameValid && <li>Course Name is empty.</li>}
            {!isDegreeValid && <li>Degree Level is empty.</li>}
            {!isDurationValid && <li>Course Duration must be a positive number.</li>}
            {!isSlugValid && <li>Slug must only contain alphanumeric/hyphen characters.</li>}
          </ul>
        </div>
      )}

      {/* Action Footer Buttons */}
      <div className="flex items-center justify-between border-t border-[#E3DFD6] dark:border-zinc-800 pt-6">
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting || !isFormValid}
            className="rounded-xl bg-[#1F3A5C] dark:bg-zinc-100 hover:bg-[#1F3A5C]/90 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-6 py-3 text-sm font-semibold shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? "Saving changes..." : mode === "create" ? "Add Course" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/courses")}
            className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 px-6 py-3 text-sm font-semibold active:scale-95 transition-all"
          >
            Cancel
          </button>
        </div>

        {mode === "edit" && (
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-red-200 hover:bg-red-50 dark:border-rose-900/30 dark:hover:bg-rose-950/20 px-5 py-3 text-sm font-semibold text-[#A23B2E] transition-all shadow-sm active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
            Delete Course
          </button>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1C1B19]/30 backdrop-blur-[1.5px]" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl z-10">
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4 rounded-md text-[#6B6660] hover:text-[#1C1B19] dark:hover:text-white p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-rose-950/20 border border-red-100 dark:border-rose-900/30 text-[#A23B2E]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1C1B19] dark:text-zinc-100">Delete Course?</h3>
                <p className="mt-2 text-sm text-[#6B6660] dark:text-zinc-400 leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-[#1C1B19] dark:text-zinc-200">"{form.name}"</span>? This will permanently discard this course record and unbind it from all colleges.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E3DFD6] dark:border-zinc-800 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCourse}
                disabled={deleting}
                className="rounded-lg bg-[#A23B2E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A23B2E]/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
